"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { usePlanDetails } from "@/hooks/useBlockchain";
import { getAssetTypeString, formatAssetAmount } from "@/lib/utils";

const EditPlanPage = () => {
  const router = useRouter();
  const params = useParams();
  const planId = params?.id ? Number(params.id) : 0;
  const { transaction } = usePlanDetails(planId);

  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [newDate, setNewDate] = useState("");

  const planDetails =
    transaction && transaction.length > 0 ? transaction[0] : undefined;

  const tabs = [
    { id: 0, name: "Edit Assets", icon: "/assets/icons/wallet.svg" },
    { id: 1, name: "Extend Date", icon: "/assets/icons/ticket.svg" },
    { id: 2, name: "Edit Percentages", icon: "/assets/icons/uptrend.svg" },
    { id: 3, name: "Manage Beneficiaries", icon: "/assets/icons/user.svg" },
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving changes...");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    router.back();
  };

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
            className="bg-[#33C5E0] text-[#161E22] px-4 py-2 rounded-[16px] text-[14px] font-semibold hover:bg-cyan-400 cursor-pointer"
          >
            Save Changes
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
                  <select className="w-full bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none">
                    <option value="USDC">USDC</option>
                    <option value="BTC">STRK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#BFC6C8] text-[14px] font-medium mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                  />
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
                  <div
                    // disabled
                    className="w-full bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#BFC6C8] cursor-not-allowed"
                  >
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
                    disabled={planDetails?.lump_sum_date ? false : true}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      const today = new Date().toISOString().split("T")[0];

                      // Always update the form data to allow typing
                      setNewDate(selectedDate);

                      // Only show error if the date is complete and in the past
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
                    onBlur={(e) => {
                      const selectedDate = e.target.value;
                      const today = new Date().toISOString().split("T")[0];

                      // Only validate and reset if the date is complete and in the past
                      if (
                        selectedDate &&
                        selectedDate.length === 10 &&
                        selectedDate < today
                      ) {
                        setNewDate("");
                        setDateError(false);
                      }
                    }}
                    className={`w-full bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#BFC6C8]  outline-none text-center ${
                      dateError ? "border-red-500" : "border-[#232B36]"
                    }`}
                  />
                  <div className="mt-2 text-xs">
                    <span
                      className={`${
                        dateError ? "text-red-500" : "text-[#425558]"
                      }`}
                    >
                      {dateError
                        ? "Please select a future date"
                        : "Select a future date for distribution"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-4">
                <h4 className="text-[#FCFFFF] font-medium mb-2">Note</h4>
                <p className="text-[#BFC6C8] text-[14px]">
                  This will only apply to lump sum distributions. Other
                  distribution methods will not be affected.
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
                        className="w-24 bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      />
                      <span className="text-[#BFC6C8]">%</span>
                    </div>
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
                        className="w-24 bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      />
                      <span className="text-[#BFC6C8]">%</span>
                    </div>
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
                        className="w-24 bg-[#232B36] border border-[#425558] rounded-[12px] px-4 py-3 text-[#FCFFFF] focus:border-[#33C5E0] focus:outline-none"
                      />
                      <span className="text-[#BFC6C8]">%</span>
                    </div>
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
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-6">
              <h3 className="text-[#FCFFFF] text-lg font-medium">
                Manage Beneficiaries
              </h3>
              <div className="space-y-4">
                <div className="bg-[#232B36] border border-[#425558] rounded-[12px] p-4">
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
                        {Array.isArray(planDetails?.beneficiaries) &&
                        planDetails.beneficiaries.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {planDetails.beneficiaries.map(
                              (beneficiary, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C252A] border border-[#2A3338] text-[#BFC6C8] text-[13px]"
                                >
                                  <span className="text-[#FCFFFF] font-medium">
                                    {beneficiary.beneficiary_name}
                                  </span>
                                  <span className="text-[#92A5A8]">
                                    ({beneficiary.beneficiary_relationship})
                                  </span>
                                  <span className="text-[#6F8488] hidden sm:inline">
                                    · {beneficiary.beneficiary_email}
                                  </span>
                                </span>
                              )
                            )}
                          </div>
                        ) : (
                          <span className="text-[#BFC6C8] text-[14px]">
                            No beneficiaries added yet
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-[#33C5E0] hover:text-cyan-400 p-2">
                        <Image
                          src="/assets/icons/edit.svg"
                          alt="edit"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button className="text-[#E53E3E] hover:text-red-400 p-2">
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
                <button className="w-full border-2 border-dashed border-[#425558] rounded-[12px] p-4 text-[#BFC6C8] hover:border-[#33C5E0] hover:text-[#33C5E0] transition-colors">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default EditPlanPage;
