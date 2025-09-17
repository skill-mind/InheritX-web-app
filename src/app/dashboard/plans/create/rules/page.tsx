"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCreatePlan } from "@/contexts/CreatePlanContext";

const disbursementOptions = [
  "Lump Sum (All At Once)",
  "Quarterly Release Of Funds (Disbursement)",
  "Yearly Release Of Funds (Disbursement)",
  "Monthly Release Of Funds (Disbursement)",
];

const RulesPageContent = () => {
  const router = useRouter();
  const { formData, updateFormData, getDistributionMethodFromString } =
    useCreatePlan();
  const [showDisbursementDropdown, setShowDisbursementDropdown] =
    useState(false);

  const isFormValid =
    /^\d{6}$/.test(formData.claimCode.trim()) &&
    formData.disbursementType &&
    ((formData.disbursementType === "Lump Sum (All At Once)" &&
      formData.lumpDate.trim().length > 0) ||
      (formData.disbursementType !== "Lump Sum (All At Once)" &&
        formData.percentages[formData.disbursementType] &&
        !isNaN(Number(formData.percentages[formData.disbursementType])) &&
        Number(formData.percentages[formData.disbursementType]) > 0 &&
        Number(formData.percentages[formData.disbursementType]) <= 100));

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
              | Rules & Conditions
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
                  step <= 3
                    ? "border-cyan-400 bg-[#161E22]"
                    : "border-[#232B36] bg-[#232B36]"
                }`}
              >
                {step < 3 ? (
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
                  <span
                    className={`text-[15px] font-semibold ${
                      step === 3 ? "text-cyan-400" : "text-[#BFC6C8]"
                    }`}
                  >
                    {step}
                  </span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step === 3 ? "text-cyan-400" : "text-[#BFC6C8]"
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
          Set the Rules for Your Plan
        </p>
        <form className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
          <div>
            <label className="block text-[#FCFFFF] text-[13px] md:text-[16px] mb-2">
              Claim Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="\\d{6}"
              value={formData.claimCode}
              onChange={(e) => {
                // Allow only digits
                const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
                updateFormData({ claimCode: digitsOnly.slice(0, 6) });
              }}
              placeholder="6-digit code your beneficiary will use to claim"
              className={`w-full bg-[#161E22] border rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none ${
                /^\d{6}$/.test(formData.claimCode)
                  ? "border-[#232B36]"
                  : "border-red-600"
              }`}
            />
            <div className="mt-2 text-xs">
              <span
                className={`${
                  /^\d{6}$/.test(formData.claimCode)
                    ? "text-[#425558]"
                    : "text-red-500"
                }`}
              >
                Claim code must be 6 digits long.
              </span>
            </div>
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[13px] md:text-[16px] mb-2">
              Distribution Method
            </label>
            <div className="relative w-full">
              <button
                type="button"
                className="flex items-center justify-between w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none"
                onClick={() => setShowDisbursementDropdown((v) => !v)}
              >
                <span>
                  {formData.disbursementType || "Select distribution method"}
                </span>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="#BFC6C8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {showDisbursementDropdown && (
                <ul className="absolute left-0 top-full mt-2 w-full bg-[#161E22] border border-[#33C5E03D] rounded-[18px] shadow-lg z-10">
                  {disbursementOptions.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        className="flex items-center gap-2 w-full px-4 py-3 text-[#FCFFFF] hover:bg-[#33C5E014] text-[15px]"
                        onClick={() => {
                          updateFormData({
                            disbursementType: option,
                            distributionMethod:
                              getDistributionMethodFromString(option),
                          });
                          setShowDisbursementDropdown(false);
                        }}
                      >
                        <span className="w-4 h-4 rounded-full border border-[#33C5E0] flex items-center justify-center mr-2">
                          {formData.disbursementType === option && (
                            <span className="w-2 h-2 rounded-full bg-[#33C5E0] block" />
                          )}
                        </span>
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Lump Sum Date Input */}
              {formData.disbursementType === "Lump Sum (All At Once)" && (
                <div className="mt-4 flex flex-col gap-2">
                  <label className="text-[#BFC6C8] text-[13px] mb-1">
                    Input Lump Sum distribution date
                  </label>
                  <input
                    type="date"
                    value={formData.lumpDate}
                    onChange={(e) =>
                      updateFormData({ lumpDate: e.target.value })
                    }
                    className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none text-center"
                  />
                  <span className="text-[#BFC6C8] text-xs mt-2">
                    DD/MM/YYYY
                  </span>
                </div>
              )}

              {/* Percentage input for recurring disbursement types */}
              {formData.disbursementType &&
                formData.disbursementType !== "Lump Sum (All At Once)" && (
                  <div className="mt-4 flex flex-col gap-2">
                    <label className="text-[#BFC6C8] text-[13px] mb-1">
                      Percentage per {formData.disbursementType.split(" ")[0]}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={
                        formData.percentages[formData.disbursementType] || ""
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        updateFormData({
                          percentages: {
                            ...formData.percentages,
                            [formData.disbursementType]: val,
                          },
                        });
                      }}
                      placeholder="Enter percentage (1-100%)"
                      className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none"
                    />
                    <span className="text-[#425558] text-xs">
                      This is the percentage of the total inheritance to be
                      received{" "}
                      {formData.disbursementType.split(" ")[0].toLowerCase()}.
                    </span>
                    {formData.percentages[formData.disbursementType] &&
                      (Number(formData.percentages[formData.disbursementType]) <
                        1 ||
                        Number(
                          formData.percentages[formData.disbursementType]
                        ) > 100) && (
                        <span className="text-red-500 text-xs mt-1">
                          Enter a valid percentage (1-100)
                        </span>
                      )}
                  </div>
                )}
            </div>
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[13px] md:text-[16px] mb-2">
              Additional Note
            </label>
            <input
              type="text"
              value={formData.note}
              onChange={(e) => updateFormData({ note: e.target.value })}
              placeholder="e.g Release funds monthly for upkeep of the property."
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none"
            />
          </div>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              disabled={!isFormValid || !formData.note}
              className={`bg-[#33C5E0] w-[243px] text-[#161E22] text-center px-8 py-3 justify-center font-medium rounded-[16px] h-[56px] rounded-t-[8px] rounded-b-[24px] flex items-center gap-2 border border-[#232B36] text-[14px] transition-colors hover:bg-[#33C5E0]/90 disabled:bg-[#1C252A] disabled:text-[#425558] disabled:cursor-not-allowed`}
              onClick={() => {
                if (isFormValid && formData.note)
                  router.push("/dashboard/plans/create/preview");
              }}
            >
              PREVIEW
              <Image
                src="/assets/icons/grey_arrowdown.svg"
                alt="arrow icon"
                width={13.5}
                height={13.5}
                className="inline-block"
              />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RulesPageContent;
