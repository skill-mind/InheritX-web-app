"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SuccessModal from "../SuccessModal";
import { useCreatePlan } from "@/contexts/CreatePlanContext";
import { useAccount } from "@starknet-react/core";
import { truncateAddress } from "@/lib/utils";
import { CallData, PaymasterDetails } from "starknet";
import { myProvider } from "@/lib/utils";
import { INHERITX_CONTRACT_ADDRESS } from "@/constant/ca_address";

const PreviewPageContent = () => {
  const router = useRouter();
  const { formData, createPlan } = useCreatePlan();
  const { account } = useAccount();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);

  // Edit button handlers
  const handleEditPlan = () => router.push("/dashboard/plans/create");
  const handleEditAssets = () =>
    router.push("/dashboard/plans/create/asset-allocation");
  const handleEditRules = () => router.push("/dashboard/plans/create/rules");
  // const handleEditLegal = () =>
  //   router.push("/dashboard/plans/create/rules-verification");

  // Get selected beneficiaries
  const selectedBeneficiaries = formData.beneficiaries.filter((b) =>
    formData.selectedBeneficiaries.includes(b.id)
  );

  // Calculate asset percentages
  // const totalAssetAmount = formData.assets.reduce(
  //   (sum, asset) => sum + asset.amount,
  //   0
  // );
  // const assetsWithPercentages = formData.assets.map((asset) => ({
  //   type: "Token",
  //   label: asset.label,
  //   amount: asset.amount,
  //   percent:
  //     totalAssetAmount > 0
  //       ? Math.round((asset.amount / totalAssetAmount) * 100)
  //       : 0,
  // }));

  const handleCreatePlan = async () => {
    if (!account) {
      console.error("Please connect your wallet to continue");
      return;
    }

    try {
      setIsCreatingPlan(true);

      // First, prepare the form data and get contract parameters
      const contractParams = await createPlan();

      if (contractParams) {
        console.log("Using contract parameters:", contractParams);

        const inheritXCall = {
          contractAddress: INHERITX_CONTRACT_ADDRESS,
          entrypoint: "create_inheritance_plan",
          calldata: CallData.compile(contractParams),
        };

        // Execute the transaction directly using account.execute
        const result = await account.execute(inheritXCall);

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

        // Wait for transaction to be confirmed
        const status = await myProvider.waitForTransaction(
          result?.transaction_hash as string
        );
        console.log("Transaction submitted:", result);

        if (status.isSuccess()) {
          console.log("Success! 🎉 Your inheritance plan has been created.");
          setShowSuccess(true);
        } else {
          console.error("Transaction failed");
        }
      } else {
        console.log("No contract parameters available");
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Error creating plan:", error);
    } finally {
      setIsCreatingPlan(false);
    }
  };

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 mb-2">
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
          </button>
          <h2 className="text-lg md:text-2xl font-medium text-[#92A5A8]">
            Create New Plan
            <span className="text-[#FCFFFF] font-normal text-[14px] ml-2 mb-[4px]">
              | Preview
            </span>
          </h2>
        </div>
        <div>
          <button className="border border-[#33C5E03D] p-[14px] rounded-[24px] text-[#33C5E0] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer">
            <Image
              src="/assets/icons/plus.svg"
              alt="plus icon"
              width={14}
              height={14}
              className="inline-block mr-2"
            />
            <span>Save As Draft</span>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8">
        {/* Progress Steps */}
        <div className="flex flex-row items-center justify-between w-full mb-2">
          {[1, 2, 3, 4].map((step, idx) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step <= 5
                    ? "border-cyan-400 bg-[#161E22]"
                    : "border-[#232B36] bg-[#232B36]"
                }`}
              >
                {step < 5 ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M5 12l5 5 9-9"
                      stroke="#33C5E0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className={`text-[15px] font-semibold text-cyan-400`}>
                    {step}
                  </span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step === 5 ? "text-cyan-400" : "text-[#BFC6C8]"
                }`}
              >
                {
                  ["Basic Information", "Asset Allocation", "Rules", "Preview"][
                    idx
                  ]
                }
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[#BFC6C8] text-[15px] mb-4">
          Review Your Plan Before Finalizing
        </p>
        {/* Plan Summary */}
        <section className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">
                Plan Summary
              </h3>
              <button
                className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22]"
                onClick={handleEditPlan}
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={16}
                  height={16}
                />
                Edit Plan
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
              <div>
                <span className="font-semibold text-[#FCFFFF]">PLAN NAME:</span>{" "}
                {formData.planName}
              </div>
              <div>
                <span className="font-semibold text-[#FCFFFF]">
                  DESCRIPTION:
                </span>{" "}
                {formData.planDescription}
              </div>
              <div>
                <span className="font-semibold text-[#FCFFFF]">
                  BENEFICIARIES:
                </span>{" "}
                {selectedBeneficiaries.length > 0
                  ? selectedBeneficiaries.length
                  : formData.beneficiaries.length}{" "}
                selected
              </div>
              {(selectedBeneficiaries.length > 0
                ? selectedBeneficiaries
                : formData.beneficiaries
              ).map((b, idx) => (
                <div key={idx} className="ml-4">
                  <span className="inline-flex items-center gap-2">
                    <Image
                      src="/assets/images/beneficiary1.svg"
                      alt={b.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    {b.name} ({b.relationship}) - {b.email}
                    {b.address && (
                      <span className="text-[#33C5E0]">
                        - {truncateAddress(b.address)}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Assets */}
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">Assets</h3>
              <button
                className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22]"
                onClick={handleEditAssets}
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={16}
                  height={16}
                />
                Edit Assets
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
              {formData.assets.length > 0 ? (
                formData.assets.map((asset, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="font-semibold text-[#FCFFFF]">ASSET:</span>
                    <span>{asset.label}</span>
                    <span className="ml-auto">Amount: {asset.amount}</span>
                  </div>
                ))
              ) : formData.assetAmount > 0 ? (
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-[#FCFFFF]">
                    ASSET TYPE:
                  </span>
                  <span>
                    {formData.assetType === 0
                      ? "STRK"
                      : formData.assetType === 1
                      ? "USDT"
                      : formData.assetType === 2
                      ? "USDC"
                      : "NFT"}
                  </span>
                  <span className="ml-auto">
                    Amount: {formData.assetAmount}
                  </span>
                </div>
              ) : (
                <div className="text-[#BFC6C8]">No assets added yet</div>
              )}
            </div>
          </div>
          {/* Rules & Conditions */}
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">
                Rules & Conditions
              </h3>
              <button
                className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22]"
                onClick={handleEditRules}
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={16}
                  height={16}
                />
                Edit Rules
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
              <div>
                <span className="font-semibold text-[#FCFFFF]">
                  CLAIM CODE:
                </span>{" "}
                {formData.claimCode}
              </div>
              <div>
                <span className="font-semibold text-[#FCFFFF]">
                  DISTRIBUTION:
                </span>{" "}
                {formData.disbursementType || "Not specified"}
                {formData.lumpDate &&
                  formData.disbursementType === "Lump Sum (All At Once)" && (
                    <span className="ml-2 text-[#33C5E0]">
                      - {formData.lumpDate}
                    </span>
                  )}
                {formData.percentages[formData.disbursementType] &&
                  formData.disbursementType !== "Lump Sum (All At Once)" && (
                    <span className="ml-2 text-[#33C5E0]">
                      - {formData.percentages[formData.disbursementType]}% per
                      period
                    </span>
                  )}
              </div>
              {formData.note && (
                <div>
                  <span className="font-semibold text-[#FCFFFF]">NOTE:</span>{" "}
                  {formData.note}
                </div>
              )}
            </div>
          </div>
          {/* Legal Settings */}
          {/* <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">
                Legal Settings
              </h3>
              <button
                className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22]"
                onClick={handleEditLegal}
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={16}
                  height={16}
                />
                Edit Legal
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-6">
                {formData.legalFiles.length === 0 ? (
                  <div className="text-[#BFC6C8]">
                    No legal documents uploaded
                  </div>
                ) : (
                  formData.legalFiles.map((file, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-[120px] h-[120px] bg-[#232B36] rounded-[12px] flex items-center justify-center overflow-hidden">
                        {file.type.startsWith("image/") ? (
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={120}
                            height={120}
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <Image
                            src="/assets/icons/file.svg"
                            alt={file.name}
                            width={40}
                            height={40}
                          />
                        )}
                      </div>
                      <span className="text-[#BFC6C8] text-xs mt-2 text-center max-w-[120px] truncate">
                        {file.name}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6">
                <h4 className="text-[#FCFFFF] text-[15px] font-semibold mb-2">
                  Assigned Trustees
                </h4>
                {formData.trustees.length === 0 ? (
                  <div className="text-[#BFC6C8]">No trustees assigned</div>
                ) : (
                  formData.trustees.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 text-[#33C5E0]"
                    >
                      <span>{t.name}</span>
                      <span>{t.phone}</span>
                      <span>{t.email}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button className="bg-[#1C252A] border-none text-[#33C5E0] px-8 py-3 rounded-t-[8px] rounded-b-[24px] font-medium md:w-[243px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors">
              SAVE AS DRAFT
            </button>
            <button
              className={`bg-[#33C5E0] text-[#161E22] px-8 py-3 rounded-t-[8px] rounded-b-[24px] font-medium text-[14px] md:min-w-[243px] hover:bg-[#33C5E0]/90 transition-colors flex items-center justify-center gap-2 ${
                isCreatingPlan ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleCreatePlan}
              disabled={isCreatingPlan}
            >
              {isCreatingPlan ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#161E22]"></div>
                  CREATING PLAN...
                </>
              ) : (
                <>
                  SAVE & PUBLISH PLAN
                  <Image
                    src="/assets/icons/grey_arrowdown.svg"
                    alt="arrow icon"
                    width={18}
                    height={18}
                    className="inline-block"
                  />
                </>
              )}
            </button>
          </div>
        </section>
      </div>
      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onContinue={() => {
          setShowSuccess(false);
          router.push("/dashboard/plans");
        }}
      />
    </main>
  );
};

export default PreviewPageContent;
