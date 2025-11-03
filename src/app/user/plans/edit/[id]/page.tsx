"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { usePlanDetails } from "@/hooks/useBlockchain";
import { getAssetTypeString, formatAssetAmount, myProvider } from "@/lib/utils";
import { useAccount, useContract } from "@starknet-react/core";
import { cairo, byteArray, CallData } from "starknet";
import { InheritXAbi } from "@/abi/abi";
import { INHERITX_CONTRACT_ADDRESS } from "@/constant/ca_address";
import { toast } from "react-hot-toast";
import { EditFormData, BeneficiaryInput } from "@/types/edit";

const EditPlanPage = () => {
  const router = useRouter();
  const params = useParams();
  const planId = params?.id ? Number(params.id) : 0;
  const { transaction } = usePlanDetails(planId);
  const { account } = useAccount();

  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [newDate, setNewDate] = useState("");

  // Edit form state
  const [editFormData, setEditFormData] = useState<EditFormData>({
    newBeneficiaries: [],
    newMonthlyPercentage: 0,
    newYearlyPercentage: 0,
    newQuarterlyPercentage: 0,
    newDate: 0,
    newAmount: 0,
  });

  // Beneficiary management state
  const [showBeneficiaryForm, setShowBeneficiaryForm] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] =
    useState<BeneficiaryInput | null>(null);
  const [newBeneficiary, setNewBeneficiary] = useState<BeneficiaryInput>({
    name: "",
    email: "",
    relationship: "",
  });

  // Contract integration
  const { contract } = useContract({
    abi: InheritXAbi,
    address: INHERITX_CONTRACT_ADDRESS,
  });

  const planDetails =
    transaction && transaction.length > 0 ? transaction[0] : undefined;

  // Initialize form data when plan details are loaded
  useEffect(() => {
    if (planDetails) {
      // Initialize beneficiaries from existing plan
      const existingBeneficiaries: BeneficiaryInput[] =
        planDetails.beneficiaries?.map(
          (beneficiary: {
            beneficiary_name?: string;
            beneficiary_email?: string;
            beneficiary_relationship?: string;
          }) => ({
            name: beneficiary.beneficiary_name || "",
            email: beneficiary.beneficiary_email || "",
            relationship: beneficiary.beneficiary_relationship || "",
          })
        ) || [];

      // Convert asset amount from smallest unit to human-readable format
      // const decimals = 18;
      // const currentAmount = planDetails.asset_amount
      //   ? Number(planDetails.asset_amount) / Math.pow(10, decimals)
      //   : 0;

      setEditFormData({
        newBeneficiaries: existingBeneficiaries,
        newMonthlyPercentage: planDetails.monthly_percentage || 0,
        newYearlyPercentage: planDetails.yearly_percentage || 0,
        newQuarterlyPercentage: planDetails.quarterly_percentage || 0,
        newDate: planDetails.lump_sum_date || 0,
        newAmount: 0, // Always start with 0 as default
      });
    }
  }, [planDetails]);

  const tabs = [
    { id: 0, name: "Edit Assets", icon: "/assets/icons/wallet.svg" },
    { id: 1, name: "Extend Date", icon: "/assets/icons/ticket.svg" },
    { id: 2, name: "Edit Percentages", icon: "/assets/icons/uptrend.svg" },
    { id: 3, name: "Manage Beneficiaries", icon: "/assets/icons/user.svg" },
  ];

  // Helper functions for beneficiary management
  const addBeneficiary = () => {
    if (
      newBeneficiary.name &&
      newBeneficiary.email &&
      newBeneficiary.relationship
    ) {
      setEditFormData((prev) => ({
        ...prev,
        newBeneficiaries: [...prev.newBeneficiaries, { ...newBeneficiary }],
      }));
      setNewBeneficiary({ name: "", email: "", relationship: "" });
      setShowBeneficiaryForm(false);
    }
  };

  const editBeneficiary = (
    index: number,
    updatedBeneficiary: BeneficiaryInput
  ) => {
    setEditFormData((prev) => ({
      ...prev,
      newBeneficiaries: prev.newBeneficiaries.map((beneficiary, i) =>
        i === index ? updatedBeneficiary : beneficiary
      ),
    }));
    setEditingBeneficiary(null);
  };

  const removeBeneficiary = (index: number) => {
    setEditFormData((prev) => ({
      ...prev,
      newBeneficiaries: prev.newBeneficiaries.filter((_, i) => i !== index),
    }));
  };

  const startEditingBeneficiary = (
    beneficiary: BeneficiaryInput,
    index: number
  ) => {
    setEditingBeneficiary({ ...beneficiary, index } as BeneficiaryInput & {
      index: number;
    });
  };

  const cancelBeneficiaryEdit = () => {
    setEditingBeneficiary(null);
    setNewBeneficiary({ name: "", email: "", relationship: "" });
    setShowBeneficiaryForm(false);
  };

  const handleSave = async () => {
    if (!account || !contract) {
      console.error("Account or contract not available");
      return;
    }

    try {
      setIsEditing(true);

      // Prepare contract parameters
      const contractBeneficiaries = editFormData.newBeneficiaries.map(
        (beneficiary) => ({
          name: byteArray.byteArrayFromString(beneficiary.name),
          email: byteArray.byteArrayFromString(beneficiary.email),
          relationship: byteArray.byteArrayFromString(beneficiary.relationship),
        })
      );

      // Convert asset amount to proper format (assuming 18 decimals for STRK)
      const decimals = 18;
      const assetAmountInSmallestUnit = BigInt(
        Math.floor(editFormData.newAmount * Math.pow(10, decimals))
      );

      // Determine which percentage to use based on original distribution method
      let monthlyPercentage = 0;
      let yearlyPercentage = 0;
      let quarterlyPercentage = 0;
      let lumpSumDate = editFormData.newDate;

      switch (planDetails?.distribution_method) {
        case 1: // Quarterly
          quarterlyPercentage = editFormData.newQuarterlyPercentage;
          monthlyPercentage = 0;
          yearlyPercentage = 0;
          lumpSumDate = 0;
          break;
        case 2: // Yearly
          yearlyPercentage = editFormData.newYearlyPercentage;
          monthlyPercentage = 0;
          quarterlyPercentage = 0;
          lumpSumDate = 0;
          break;
        case 3: // Monthly
          monthlyPercentage = editFormData.newMonthlyPercentage;
          yearlyPercentage = 0;
          quarterlyPercentage = 0;
          lumpSumDate = 0;
          break;
        case 0: // Lump Sum
        default:
          monthlyPercentage = 0;
          yearlyPercentage = 0;
          quarterlyPercentage = 0;
          // lumpSumDate is already set above
          break;
      }

      console.log("Edit plan parameters:", {
        plan_id: cairo.uint256(planId),
        new_beneficiaries: contractBeneficiaries,
        new_monthly_percentage: monthlyPercentage,
        new_yearly_percentage: yearlyPercentage,
        new_quarterly_percentage: quarterlyPercentage,
        new_date: lumpSumDate,
        new_amount: cairo.uint256(assetAmountInSmallestUnit),
      });

      // Call the edit_plan function
      // await contract.edit_plan(
      //   cairo.uint256(planId),
      //   contractBeneficiaries,
      //   monthlyPercentage,
      //   yearlyPercentage,
      //   quarterlyPercentage,
      //   lumpSumDate,
      //   cairo.uint256(assetAmountInSmallestUnit)
      // );

      const editPlanCall = {
        contractAddress: INHERITX_CONTRACT_ADDRESS,
        entrypoint: "edit_plan",
        calldata: CallData.compile([
          cairo.uint256(planId),
          contractBeneficiaries,
          monthlyPercentage,
          yearlyPercentage,
          quarterlyPercentage,
          lumpSumDate,
          cairo.uint256(assetAmountInSmallestUnit),
        ]),
      };

      // Execute the transaction directly using account.execute
      const result = await account.execute(editPlanCall);

      // const multicallData = [inheritXCall];

      // const feeDetails: PaymasterDetails = {
      //   feeMode: {
      //     mode: "sponsored",
      //   },
      // };

      // const feeEstimation = await account?.estimatePaymasterTransactionFee(
      //   [...multicallData],
      //   feeDetails
      // );

      // const result = await account?.executePaymasterTransaction(
      //   [inheritXCall],
      //   feeDetails,
      //   feeEstimation?.suggested_max_fee_in_gas_token
      // );

      const status = await myProvider.waitForTransaction(
        result?.transaction_hash as string
      );

      console.log("Plan edited successfully!", status);
      toast.success("Plan edited successfully!");

      setIsEditing(false);
      router.back();
    } catch (error) {
      console.error("Error editing plan:", error);
      toast.error("Error editing plan!");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    router.back();
  };

  // const newFormDataAmount = formatAssetAmount(
  //   Number(editFormData.newAmount),
  //   Number(planDetails?.asset_type)
  // );

  if (!planDetails) {
    return (
      <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
        <div className="flex items-center">
          <button
            className="text-[#BFC6C8] cursor-pointer text-[15px] flex items-center gap-2"
            onClick={() => router.back()}
          >
            <Image
              src="/assets/icons/back.svg"
              alt="back"
              width={18}
              height={15}
            />
            Back
          </button>
        </div>
        <p className="text-center  mt-8 text-[#BFC6C8] text-[15px]">
          No plan details found.
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="text-[#BFC6C8] cursor-pointer text-[15px] flex items-center gap-2"
            onClick={() => router.back()}
          >
            <Image
              src="/assets/icons/back.svg"
              alt="back"
              width={18}
              height={15}
            />
            Back
          </button>
          <h2 className="text-lg cursor-pointer md:text-xl font-medium text-[#FCFFFF]">
            Edit Plan
            <span className="text-[#33C5E0] border-1 rounded-full px-2 py-1 font-normal text-[14px] ml-2 mb-[4px]">
              {planId}
            </span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="bg-[#1C252A] border border-[#33C5E0] text-[#33C5E0] px-4 py-2 rounded-[16px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isEditing}
            className={`px-4 py-2 rounded-[16px] text-[14px] font-semibold transition-colors ${
              isEditing
                ? "bg-[#232B36] text-[#92A5A8] cursor-not-allowed"
                : "bg-[#33C5E0] text-[#161E22] hover:bg-cyan-400 cursor-pointer"
            }`}
          >
            {isEditing ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Plan Overview */}
      <div className="bg-[#1C252A] border border-[#232B36] rounded-[18px] p-6">
        <h3 className="text-[#FCFFFF] text-lg font-medium mb-4">
          Plan Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#BFC6C8] text-[15px]">
          <div>
            <span className="font-semibold text-[#92A5A8]">PLAN NAME:</span>
            <p className="text-[#FCFFFF] capitalize">
              {planDetails?.plan_name}
            </p>
          </div>
          <div>
            <span className="font-semibold text-[#92A5A8]">
              CURRENT ASSETS:
            </span>
            <p className="text-[#FCFFFF]">
              {planDetails?.asset_amount !== undefined
                ? formatAssetAmount(
                    Number(planDetails.asset_amount),
                    Number(planDetails.asset_type)
                  )
                : "0"}{" "}
              {planDetails?.asset_type !== undefined
                ? getAssetTypeString(Number(planDetails.asset_type))
                : "Unknown"}
            </p>
          </div>
          <div>
            <span className="font-semibold text-[#92A5A8]">BENEFICIARIES:</span>
            <p className="text-[#FCFFFF]">
              {planDetails?.beneficiary_count} selected
            </p>
          </div>
        </div>
      </div>

      {/* Edit Tabs */}
      <div className="bg-[#1C252A] border border-[#232B36] rounded-[18px] p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-[16px] text-[14px] font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#33C5E0] text-[#161E22]"
                  : "bg-[#232B36] text-[#BFC6C8] hover:bg-[#33C5E0] hover:text-[#161E22]"
              }`}
            >
              <Image src={tab.icon} alt={tab.name} width={16} height={16} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 0 && (
            <div className="space-y-6">
              <h3 className="text-[#FCFFFF] text-lg font-medium">
                Edit Assets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                    Asset Type
                  </label>
                  <select
                    className="w-full bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                    disabled
                    value={planDetails?.asset_type || ""}
                  >
                    <option value={planDetails?.asset_type || ""}>
                      {planDetails?.asset_type !== undefined
                        ? getAssetTypeString(Number(planDetails.asset_type))
                        : "Unknown"}
                    </option>
                  </select>
                  <p className="text-[#92A5A8] text-xs mt-1">
                    Asset type cannot be changed after plan creation
                  </p>
                </div>
                <div>
                  <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                    Top Up Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount to top up (e.g., 45)"
                    value={editFormData.newAmount || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        newAmount: Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                  />
                  <p className="text-[#92A5A8] text-xs mt-1">
                    This amount will be added to your current balance (e.g., 45)
                  </p>
                </div>
              </div>
              <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-4">
                <h4 className="text-[#FCFFFF] font-medium mb-2">
                  Current Assets
                </h4>
                <p className="text-[#BFC6C8] text-[14px]">
                  {planDetails?.asset_amount !== undefined
                    ? formatAssetAmount(
                        Number(planDetails.asset_amount),
                        Number(planDetails.asset_type)
                      )
                    : "0"}{" "}
                  {planDetails?.asset_type !== undefined
                    ? getAssetTypeString(Number(planDetails.asset_type))
                    : "Unknown"}
                </p>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-6">
              <h3 className="text-[#FCFFFF] text-lg font-medium">
                Extend Date (Lump Sum)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                    Current Release Date
                  </label>
                  <div className="w-full bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#BFC6C8]">
                    {planDetails?.lump_sum_date
                      ? new Date(
                          planDetails?.lump_sum_date * 1000
                        ).toLocaleDateString()
                      : "Not specified"}
                  </div>
                </div>
                <div>
                  <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                    New Release Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={newDate}
                    disabled={planDetails?.distribution_method !== 0}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      const today = new Date().toISOString().split("T")[0];

                      setNewDate(selectedDate);

                      // Update edit form data
                      if (selectedDate) {
                        const timestamp = Math.floor(
                          new Date(selectedDate).getTime() / 1000
                        );
                        setEditFormData((prev) => ({
                          ...prev,
                          newDate: timestamp,
                        }));
                      }

                      if (selectedDate && selectedDate.length === 10) {
                        if (selectedDate < today) {
                          setDateError(true);
                        } else {
                          setDateError(false);
                        }
                      } else {
                        setDateError(false);
                      }
                    }}
                    className={`w-full bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none ${
                      dateError ? "border-red-500" : ""
                    } ${
                      planDetails?.distribution_method !== 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  <div className="mt-2 text-xs">
                    <span
                      className={dateError ? "text-red-500" : "text-[#425558]"}
                    >
                      {dateError
                        ? "Please select a future date"
                        : planDetails?.distribution_method !== 0
                        ? "Only available for lump sum distributions"
                        : "Select a future date for distribution"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-4">
                <h4 className="text-[#FCFFFF] font-medium mb-2">Note</h4>
                <p className="text-[#BFC6C8] text-[14px]">
                  {planDetails?.distribution_method === 0
                    ? "This will update the lump sum distribution date."
                    : "Date editing is only available for lump sum distributions. Your plan uses a different distribution method."}
                </p>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-6">
              <h3 className="text-[#FCFFFF] text-lg font-medium">
                Edit Percentages
              </h3>
              <div className="space-y-4">
                {planDetails?.distribution_method === 1 && (
                  <div>
                    <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                      Quarterly Distribution Percentage
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="100"
                        value={editFormData.newQuarterlyPercentage || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            newQuarterlyPercentage: Number(e.target.value) || 0,
                          }))
                        }
                        className="w-24 bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      />
                      <span className="text-[#BFC6C8]">%</span>
                    </div>
                    <p className="text-[#92A5A8] text-xs mt-1">
                      Current: {planDetails?.quarterly_percentage || 0}%
                    </p>
                  </div>
                )}

                {planDetails?.distribution_method === 2 && (
                  <div>
                    <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                      Yearly Distribution Percentage
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="100"
                        value={editFormData.newYearlyPercentage || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            newYearlyPercentage: Number(e.target.value) || 0,
                          }))
                        }
                        className="w-24 bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      />
                      <span className="text-[#BFC6C8]">%</span>
                    </div>
                    <p className="text-[#92A5A8] text-xs mt-1">
                      Current: {planDetails?.yearly_percentage || 0}%
                    </p>
                  </div>
                )}

                {planDetails?.distribution_method === 3 && (
                  <div>
                    <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                      Monthly Distribution Percentage
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="100"
                        value={editFormData.newMonthlyPercentage || ""}
                        onChange={(e) =>
                          setEditFormData((prev) => ({
                            ...prev,
                            newMonthlyPercentage: Number(e.target.value) || 0,
                          }))
                        }
                        className="w-24 bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      />
                      <span className="text-[#BFC6C8]">%</span>
                    </div>
                    <p className="text-[#92A5A8] text-xs mt-1">
                      Current: {planDetails?.monthly_percentage || 0}%
                    </p>
                  </div>
                )}

                {planDetails?.distribution_method === 0 && (
                  <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-4">
                    <h4 className="text-[#FCFFFF] font-medium mb-2">
                      Lump Sum Distribution
                    </h4>
                    <p className="text-[#BFC6C8] text-[14px]">
                      Lump sum distributions don&apos;t use percentages. All
                      funds are distributed at once on the specified date.
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-4">
                <h4 className="text-[#FCFFFF] font-medium mb-2">
                  Current Distribution Method
                </h4>
                <p className="text-[#BFC6C8] text-[14px]">
                  {planDetails?.distribution_method === 0
                    ? "Lump Sum (All at once)"
                    : planDetails?.distribution_method === 1
                    ? "Quarterly Release of Funds"
                    : planDetails?.distribution_method === 2
                    ? "Yearly Release of Funds"
                    : planDetails?.distribution_method === 3
                    ? "Monthly Release of Funds"
                    : "Not specified"}
                </p>
                {planDetails?.distribution_method !== 0 && (
                  <p className="text-[#92A5A8] text-xs mt-2">
                    You can only edit the percentage for your selected
                    distribution method.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-6">
              <h3 className="text-[#FCFFFF] text-lg font-medium">
                Manage Beneficiaries
              </h3>

              {/* Current Beneficiaries */}
              <div className="space-y-3">
                <h4 className="text-[#BFC6C8] text-[14px] font-medium">
                  Current Beneficiaries ({editFormData.newBeneficiaries.length})
                </h4>
                {editFormData.newBeneficiaries.map((beneficiary, idx) => (
                  <div
                    key={idx}
                    className="bg-[#232B36] border border-[#425558] rounded-[12px] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/assets/images/beneficiary1.svg"
                          alt="beneficiary"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#FCFFFF] font-medium text-[15px]">
                              {beneficiary.name}
                            </span>
                            <span className="text-[#92A5A8] text-[13px]">
                              ({beneficiary.relationship})
                            </span>
                          </div>
                          <p className="text-[#6F8488] text-[13px] mt-1">
                            {beneficiary.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            startEditingBeneficiary(beneficiary, idx)
                          }
                          className="text-[#33C5E0] hover:text-cyan-400 p-2 cursor-pointer"
                        >
                          <Image
                            src="/assets/icons/edit.svg"
                            alt="edit"
                            width={16}
                            height={16}
                          />
                        </button>
                        <button
                          onClick={() => removeBeneficiary(idx)}
                          className="text-[#E53E3E] hover:text-red-400 p-2 cursor-pointer"
                        >
                          <Image
                            src="/assets/icons/x.svg"
                            alt="remove"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {editFormData.newBeneficiaries.length === 0 && (
                  <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-8 text-center">
                    <p className="text-[#BFC6C8] text-[14px]">
                      No beneficiaries added yet. Click &quot;Add New
                      Beneficiary&quot; to get started.
                    </p>
                  </div>
                )}
              </div>

              {/* Add/Edit Beneficiary Form */}
              {(showBeneficiaryForm || editingBeneficiary) && (
                <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-6">
                  <h4 className="text-[#FCFFFF] font-medium mb-4">
                    {editingBeneficiary
                      ? "Edit Beneficiary"
                      : "Add New Beneficiary"}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={editingBeneficiary?.name || newBeneficiary.name}
                        onChange={(e) => {
                          if (editingBeneficiary) {
                            setEditingBeneficiary((prev) =>
                              prev ? { ...prev, name: e.target.value } : null
                            );
                          } else {
                            setNewBeneficiary((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                          }
                        }}
                        className="w-full bg-[#1C252A] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={
                          editingBeneficiary?.email || newBeneficiary.email
                        }
                        onChange={(e) => {
                          if (editingBeneficiary) {
                            setEditingBeneficiary((prev) =>
                              prev ? { ...prev, email: e.target.value } : null
                            );
                          } else {
                            setNewBeneficiary((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }));
                          }
                        }}
                        className="w-full bg-[#1C252A] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                        Relationship
                      </label>
                      <select
                        value={
                          editingBeneficiary?.relationship ||
                          newBeneficiary.relationship
                        }
                        onChange={(e) => {
                          if (editingBeneficiary) {
                            setEditingBeneficiary((prev) =>
                              prev
                                ? { ...prev, relationship: e.target.value }
                                : null
                            );
                          } else {
                            setNewBeneficiary((prev) => ({
                              ...prev,
                              relationship: e.target.value,
                            }));
                          }
                        }}
                        className="w-full bg-[#1C252A] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      >
                        <option value="">Select relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => {
                          if (editingBeneficiary) {
                            editBeneficiary(
                              (
                                editingBeneficiary as BeneficiaryInput & {
                                  index: number;
                                }
                              ).index,
                              editingBeneficiary
                            );
                          } else {
                            addBeneficiary();
                          }
                        }}
                        className="bg-[#33C5E0] text-[#161E22] px-4 py-2 rounded-[12px] text-[14px] font-medium hover:bg-cyan-400 transition-colors cursor-pointer"
                      >
                        {editingBeneficiary
                          ? "Update Beneficiary"
                          : "Add Beneficiary"}
                      </button>
                      <button
                        onClick={cancelBeneficiaryEdit}
                        className="bg-[#232B36] border border-[#425558] text-[#BFC6C8] px-4 py-2 rounded-[12px] text-[14px] hover:border-[#33C5E0] hover:text-[#33C5E0] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Beneficiary Button */}
              {!showBeneficiaryForm && !editingBeneficiary && (
                <button
                  onClick={() => setShowBeneficiaryForm(true)}
                  className="w-full border-2 border-dashed border-[#425558] rounded-[12px] p-4 text-[#BFC6C8] hover:border-[#33C5E0] hover:text-[#33C5E0] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src="/assets/icons/plus.svg"
                      alt="add"
                      width={16}
                      height={16}
                    />
                    Add New Beneficiary
                  </div>
                </button>
              )}

              {/* Note */}
              <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-4">
                <h4 className="text-[#FCFFFF] font-medium mb-2">Note</h4>
                <p className="text-[#BFC6C8] text-[14px]">
                  When you save changes, the entire beneficiary list will be
                  replaced with your new list. Make sure to include all
                  beneficiaries you want to keep.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default EditPlanPage;
