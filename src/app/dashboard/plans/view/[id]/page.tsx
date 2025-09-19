"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { usePlanDetails } from "@/hooks/useBlockchain";
import { truncateAddress } from "@/lib/utils";

const ViewPageContent = () => {
  const router = useRouter();
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [isEditingPlan, setisEditingPlan] = useState(false);
  const params = useParams();

  const planId = params?.id ? Number(params.id) : 0;
  const { transaction } = usePlanDetails(planId);

  console.log("TRANSACTION TTTTTTTTTTTTTTTTTT", transaction);
  // console.log("TRANSACTION TTTTTTTTTTTTTTTTTT", transaction[0]?.plan_name);
  console.log(params.id);

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

  // Edit button handlers
  const handleEditPlan = () => router.push("/dashboard/plans/create");
  const handleEditAssets = () =>
    router.push("/dashboard/plans/create/asset-allocation");
  const handleEditRules = () => router.push("/dashboard/plans/create/rules");
  // const handleEditLegal = () =>
  //   router.push("/dashboard/plans/create/rules-verification");

  if (!planDetails) {
    return (
      <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
        <div className="flex items-center">
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
            <h2 className="text-lg md:text-xl font-medium text-[#92A5A8]">
              View Plan
              <span className="text-[#FCFFFF] border-1 rounded-full px-2 py-1 font-normal text-[14px] ml-2 mb-[4px]">
                {params.id}
              </span>
            </h2>
          </div>
        </div>
        <p className="text-center mt-8 text-[#BFC6C8] text-[15px]">
          No plan details found.
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <div className="flex items-center">
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
          <h2 className="text-lg md:text-xl font-medium text-[#92A5A8]">
            View Plan
            <span className="text-[#FCFFFF] border-1 rounded-full px-2 py-1 font-normal text-[14px] ml-2 mb-[4px]">
              {params.id}
            </span>
          </h2>
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
              <div className="grid grid-cols-2 space-x-2 items-center">
                <span className="font-semibold text-[#92A5A8]">PLAN NAME:</span>{" "}
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
                  {planDetails?.beneficiary_name} (
                  {planDetails?.beneficiary_relationship}) -{" "}
                  {planDetails?.beneficiary_email}
                </span>
              </div>
            </div>
          </div>

          {/* Assets */}
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#92A5A8] text-lg font-medium">Assets</h3>
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
              {planDetails ? (
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-[#BFC6C8]">
                    ASSET TYPE:
                  </span>
                  <span className="text-[#FCFFFF] capitalize">
                    {planDetails?.asset_type?.toString() || "Unknown"}
                  </span>
                  <span className="ml-auto text-[#FCFFFF]">
                    Amount:{" "}
                    <span className="font-semibold capitalize">
                      {planDetails.asset_amount}
                    </span>
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
              <h3 className="text-[#BFC6C8] text-lg font-medium">
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button className="bg-[#1C252A] border-none text-[#33C5E0] px-8 py-3 rounded-t-[8px] rounded-b-[24px] font-medium md:w-[243px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors cursor-pointer">
              SAVE
            </button>

            <button
              className={`bg-[#33C5E0] text-[#161E22] px-8 py-3 rounded-t-[8px] rounded-b-[24px] font-medium text-[14px] md:min-w-[243px] hover:bg-[#33C5E0]/90 transition-colors cursor-pointer flex items-center justify-center gap-2`}
            >
              SAVE & PUBLISH PLAN
              <Image
                src="/assets/icons/grey_arrowdown.svg"
                alt="arrow icon"
                width={18}
                height={18}
                className="inline-block"
              />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ViewPageContent;
