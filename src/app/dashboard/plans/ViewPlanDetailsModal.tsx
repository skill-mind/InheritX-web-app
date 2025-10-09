"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlanDetails } from "@/hooks/useBlockchain";
import {
  truncateAddress,
  getAssetTypeString,
  formatAssetAmount,
} from "@/lib/utils";

interface ViewPlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: number;
}

const ViewPlanDetailsModal: React.FC<ViewPlanDetailsModalProps> = ({
  isOpen,
  onClose,
  planId,
}) => {
  const router = useRouter();
  const { transaction } = usePlanDetails(planId);

  console.log("TRANSACTION TTTTTTTTTTTTTTTTTT", transaction);
  console.log(planId);

  const planDetails =
    transaction && transaction.length > 0 ? transaction[0] : undefined;

  function showDistribution(dist: number): string | undefined {
    if (dist == 0) {
      return "Lump Sum (All at once)";
    } else if (dist == 1) {
      return "Quartely Release of Funds (Disbursement)";
    } else if (dist == 2) {
      return "Yearly Release of Funds (Disbursement)";
    } else if (dist == 3) {
      return "Monthly Release of Funds (Disbursement)";
    }
  }

  // Edit button handler - navigates to edit page
  const handleEditPlan = () => {
    router.push(`/dashboard/plans/edit/${planId}`);
    onClose();
  };

  if (!isOpen) return null;

  if (!planDetails) {
    return (
      <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-[#FCFFFF]">View Plan</h2>
            <button
              onClick={onClose}
              className="text-[#BFC6C8] hover:text-[#FCFFFF]"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p className="text-center text-[#BFC6C8] text-[15px]">
            No plan details found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0000006a] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-medium text-[#FCFFFF]">
            View Plan
            <span className="text-[#33C5E0] border-1 rounded-full px-2 py-1 font-normal text-[14px] ml-2 mb-[4px]">
              {planId}
            </span>
          </h2>
          {/* <button
            onClick={onClose}
            className="text-[#BFC6C8] hover:text-[#FCFFFF] p-2"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button> */}
        </div>

        <div className="w-full flex flex-col gap-6">
          {/* Progress Steps */}
          <div className="flex flex-row items-center justify-between w-full mb-2">
            {[1, 2, 3, 4].map((step, idx) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step <= 4
                      ? "border-cyan-400 bg-[#161E22]"
                      : "border-[#232B36] bg-[#232B36]"
                  }`}
                >
                  {step < 4 ? (
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
                    step === 4 ? "text-cyan-400" : "text-[#BFC6C8]"
                  }`}
                >
                  {
                    [
                      "Basic Information",
                      "Asset Allocation",
                      "Rules",
                      "Preview",
                    ][idx]
                  }
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-[#BFC6C8] text-[15px] mb-4">
            Review Your Plan Before Finalizing
          </p>

          {/* Plan Summary */}
          <section className="flex flex-col gap-6 w-full">
            <div className="bg-[#1C252A] border border-[#232B36] rounded-[18px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#FCFFFF] text-lg font-medium">
                  Plan Summary
                </h3>
              </div>
              <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
                <div className="grid grid-cols-2 space-x-2 items-center">
                  <span className="font-semibold text-[#92A5A8]">
                    PLAN NAME:
                  </span>{" "}
                  <span className="text-[#FCFFFF] capitalize">
                    {planDetails?.plan_name}
                  </span>
                </div>

                <div className="grid grid-cols-2 space-x-2 items-center">
                  <span className="font-semibold text-[#92A5A8]">
                    DESCRIPTION:
                  </span>{" "}
                  <span className="text-[#FCFFFF] capitalize">
                    {planDetails?.plan_description || "No description"}
                  </span>
                </div>
                <div className="grid grid-cols-2 space-x-2 items-center">
                  <span className="font-semibold text-[#92A5A8]">
                    BENEFICIARIES:
                  </span>{" "}
                  <span className="text-[#FCFFFF] capitalize">
                    {planDetails?.beneficiary_count ?? 0} selected
                  </span>
                </div>

                <div className="ml-4">
                  <span className="inline-flex items-center gap-2 text-[#FCFFFF]">
                    <Image
                      src="/assets/images/beneficiary1.svg"
                      alt="beneficiary"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </span>

                  <div className="mt-3 flex flex-col gap-2">
                    {Array.isArray(planDetails?.beneficiaries) &&
                    planDetails.beneficiaries.length > 0 ? (
                      planDetails.beneficiaries.map((beneficiary, idx) => (
                        <div
                          key={`${beneficiary.beneficiary_email ?? idx}`}
                          className="flex items-center justify-between bg-[#182024] border border-[#232B36] rounded-[12px] p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#232B36] text-[#BFC6C8] text-xs flex items-center justify-center">
                              {(beneficiary.beneficiary_name || "?")
                                .toString()
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[#FCFFFF] font-medium">
                                {beneficiary.beneficiary_name} (
                                {beneficiary.beneficiary_relationship})
                              </span>
                              <span className="text-[#92A5A8] text-sm">
                                {beneficiary.beneficiary_email}
                              </span>
                            </div>
                          </div>
                          <span
                            className={
                              beneficiary?.has_claimed
                                ? "text-[#0DA314] text-xs bg-[#1C252A] px-2 py-1 rounded-full border border-[#0DA314]"
                                : "text-[#EAB308] text-xs bg-[#1C252A] px-2 py-1 rounded-full border border-[#EAB308]"
                            }
                          >
                            {beneficiary?.has_claimed ? "Claimed" : "Pending"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-[#BFC6C8] text-[14px]">
                        No beneficiaries added yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Assets */}
            <div className="bg-[#1C252A] border border-[#232B36] rounded-[18px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#92A5A8] text-lg font-medium">Assets</h3>
              </div>
              <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
                {planDetails ? (
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-[#BFC6C8]">
                      ASSET TYPE:
                    </span>
                    <span className="text-[#FCFFFF] capitalize">
                      {planDetails?.asset_type !== undefined
                        ? getAssetTypeString(Number(planDetails.asset_type))
                        : "Unknown"}
                    </span>
                    <span className="ml-auto text-[#FCFFFF]">
                      Amount:{" "}
                      <span className="font-semibold capitalize">
                        {formatAssetAmount(
                          Number(planDetails.asset_amount),
                          Number(planDetails.asset_type)
                        )}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="text-[#BFC6C8]">No assets added yet</div>
                )}
              </div>
            </div>

            {/* Rules & Conditions */}
            <div className="bg-[#1C252A] border border-[#232B36] rounded-[18px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#BFC6C8] text-lg font-medium">
                  Rules & Conditions
                </h3>
              </div>
              <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
                <div className="grid grid-cols-2 space-x-2 items-center">
                  <span className="font-semibold text-[#BFC6C8]">
                    CLAIM CODE:
                  </span>{" "}
                  <span className="text-[#FCFFFF] capitalize">
                    {planDetails?.claim_code_hash || "Not specified"}
                  </span>
                </div>

                <div className="grid grid-cols-2 space-x-2 items-center">
                  <span className="font-semibold text-[#BFC6C8]">
                    DISTRIBUTION:
                  </span>{" "}
                  <span className="text-[#FCFFFF] capitalize">
                    {showDistribution(planDetails?.distribution_method) ??
                      "Not specified"}
                  </span>
                </div>
                {planDetails?.additional_note && (
                  <div className="grid grid-cols-2 space-x-2 items-center">
                    <span className="font-semibold text-[#BFC6C8]">NOTE:</span>{" "}
                    <span className="text-[#FCFFFF] capitalize">
                      {planDetails.additional_note}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-2 space-x-2 items-center">
                  <span className="font-semibold text-[#BFC6C8]">
                    CREATED AT:
                  </span>{" "}
                  <span className="text-[#FCFFFF] capitalize">
                    {planDetails?.created_at}
                  </span>
                </div>

                <div className="grid grid-cols-2 space-x-2 items-center">
                  <span className="font-semibold text-[#BFC6C8]">
                    OWNER WALLET ADDRESS:
                  </span>{" "}
                  <span className="text-[#FCFFFF]">
                    {truncateAddress(planDetails?.owner)}
                  </span>
                </div>

                <div className="grid grid-cols-2 space-x-2 items-center">
                  <span className="font-semibold text-[#BFC6C8]">
                    EXECUTION DATE:
                  </span>{" "}
                  <span className="text-[#FCFFFF]">
                    {planDetails?.lump_sum_date
                      ? new Date(
                          planDetails?.lump_sum_date * 1000
                        ).toLocaleDateString()
                      : "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
              <button
                onClick={onClose}
                className="bg-[#1C252A] border border-[#33C5E0] text-[#33C5E0] px-8 py-3 rounded-t-[8px] rounded-b-[24px] font-medium md:w-[243px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors cursor-pointer"
              >
                CLOSE
              </button>

              <button
                onClick={handleEditPlan}
                className="bg-[#33C5E0] text-[#161E22] px-8 py-3 rounded-t-[8px] rounded-b-[24px] font-medium text-[14px] md:min-w-[243px] hover:bg-[#33C5E0]/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                EDIT PLAN
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit icon"
                  width={16}
                  height={16}
                  className="inline-block"
                />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ViewPlanDetailsModal;
