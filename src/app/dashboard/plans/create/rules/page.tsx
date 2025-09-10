"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const disbursementOptions = [
  "Quarterly Release Of Funds (Disbursement)",
  "Yearly Release Of Funds (Disbursement)",
  "Monthly Release Of Funds (Disbursement)"
];

const RulesPage = () => {
  const router = useRouter();
  const [claimCode, setClaimCode] = useState("");
  const [distribution, setDistribution] = useState<string>("");
  const [note, setNote] = useState("");
  const [showDisbursementDropdown, setShowDisbursementDropdown] = useState(false);
  const [disbursementType, setDisbursementType] = useState("");
  const [showLumpDropdown, setShowLumpDropdown] = useState(false);
  const [lumpDate, setLumpDate] = useState("");
  const [percentages, setPercentages] = useState<{ [key: string]: string }>({});

  const isFormValid = claimCode.trim().length > 0 &&
    ((distribution === "lump" && lumpDate.trim().length > 0) ||
      (distribution === "recurring" && disbursementType && percentages[disbursementType] && !isNaN(Number(percentages[disbursementType])) && Number(percentages[disbursementType]) > 0 && Number(percentages[disbursementType]) <= 100));

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 mb-2">
          <button className="text-[#BFC6C8] cursor-pointer text-[15px] flex items-center gap-2" onClick={() => router.back()}>
            <Image
              src="/assets/icons/back.svg"
              alt="back"
              width={18}
              height={15}
            />
          </button>
          <h2 className="text-lg md:text-2xl font-medium text-[#92A5A8]">
            Create New Plan
            <span className="text-[#FCFFFF] font-normal text-[14px] ml-2 mb-[4px]">| Rules & Conditions</span>
          </h2>
        </div>
        <div>
          <button className="border border-[#33C5E03D] p-[14px] rounded-[24px] text-[#33C5E0] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer">
            <Image src="/assets/icons/plus.svg" alt="plus icon" width={14} height={14} className="inline-block mr-2" />
            <span>Save As Draft</span>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8">
        {/* Progress Steps */}
        <div className="flex flex-row items-center justify-between w-full mb-2">
          {[1, 2, 3, 4, 5].map((step, idx) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step <= 3
                    ? "border-cyan-400 bg-[#161E22]"
                    : "border-[#232B36] bg-[#232B36]"
                }`}
              >
                {step < 3 ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5 9-9" stroke="#33C5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <span className={`text-[15px] font-semibold ${step === 3 ? "text-cyan-400" : "text-[#BFC6C8]"}`}>{step}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step === 3 ? "text-cyan-400" : "text-[#BFC6C8]"
                }`}
              >
                {
                  [
                    "Basic Information",
                    "Asset Allocation",
                    "Rules",
                    "Verification",
                    "Preview",
                  ][idx]
                }
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[#BFC6C8] text-[15px] mb-4">Set the Rules for Your Plan</p>
        <form className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
          <div>
            <label className="block text-[#FCFFFF] text-[13px] md:text-[16px] mb-2">Claim Code</label>
            <input
              type="text"
              value={claimCode}
              onChange={(e) => setClaimCode(e.target.value)}
              placeholder="This is the code that your beneficiary would use to access the inheritance"
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[13px] md:text-[16px] mb-2">Distribution Method</label>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer relative">
                <input
                  type="radio"
                  name="distribution"
                  value="lump"
                  checked={distribution === "lump"}
                  onChange={() => { setDistribution("lump"); setShowLumpDropdown(true); setShowDisbursementDropdown(false); }}
                  className="form-radio accent-[#33C5E0] w-4 h-4"
                />
                <span className="text-[#BFC6C8] text-[12px] md:text-[14px]">Lump Sum (All At Once)</span>
                {distribution === "lump" && (
                  <div className="relative w-full mt-4">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none"
                      onClick={() => setShowLumpDropdown((v) => !v)}
                    >
                      <span>{lumpDate ? lumpDate : "Input Lump Sum distribution date"}</span>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" stroke="#BFC6C8" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    {showLumpDropdown && (
                      <div className="absolute left-0 top-full mt-2 w-full bg-[#161E22] border border-[#33C5E03D] rounded-[18px] shadow-lg z-10 p-6 flex flex-col items-center">
                        <label className="text-[#BFC6C8] text-[15px] mb-2">Input Lump Sum distribution date</label>
                        <input
                          type="date"
                          value={lumpDate}
                          onChange={e => { setLumpDate(e.target.value); setShowLumpDropdown(false); }}
                          className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none text-center"
                        />
                        <span className="text-[#BFC6C8] text-xs mt-2">DD/MM/YYYY</span>
                      </div>
                    )}
                  </div>
                )}
              </label>
              <label className="flex items-center gap-3 cursor-pointer relative">
                <input
                  type="radio"
                  name="distribution"
                  value="recurring"
                  checked={distribution === "recurring"}
                  onChange={() => { setDistribution("recurring"); setShowDisbursementDropdown(true); }}
                  className="form-radio accent-[#33C5E0] w-4 h-4"
                />
                <span className="text-[#BFC6C8] text-[12px] md:text-[14px]">Disbursement (Recurring Payments)</span>
                {distribution === "recurring" && (
                  <div className="relative w-full mt-4">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none"
                      onClick={() => setShowDisbursementDropdown((v) => !v)}
                    >
                      <span>{disbursementType || "Disbursement"}</span>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" stroke="#BFC6C8" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    {showDisbursementDropdown && (
                      <ul className="absolute left-0 top-full mt-2 w-full bg-[#161E22] border border-[#33C5E03D] rounded-[18px] shadow-lg z-10">
                        {disbursementOptions.map((option) => (
                          <li key={option}>
                            <button
                              type="button"
                              className="flex items-center gap-2 w-full px-4 py-3 text-[#FCFFFF] hover:bg-[#33C5E014] text-[15px]"
                              onClick={() => { setDisbursementType(option); setShowDisbursementDropdown(false); }}
                            >
                              <span className="w-4 h-4 rounded-full border border-[#33C5E0] flex items-center justify-center mr-2">
                                {disbursementType === option && <span className="w-2 h-2 rounded-full bg-[#33C5E0] block" />}
                              </span>
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* Percentage input for selected disbursement type */}
                    {disbursementType && (
                      <div className="mt-4 flex flex-col gap-2">
                        <label className="text-[#BFC6C8] text-[13px] mb-1">Percentage per {disbursementType.split(' ')[0]}</label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={percentages[disbursementType] || ""}
                          onChange={e => {
                            const val = e.target.value;
                            setPercentages(prev => ({ ...prev, [disbursementType]: val }));
                          }}
                          placeholder="Enter percentage (1-100%)"
                          className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none"
                        />
                        <span className="text-[#425558] text-xs">This is the percentage of the total inheritance to be received {disbursementType.split(' ')[0].toLowerCase()}.</span>
                        {percentages[disbursementType] && (Number(percentages[disbursementType]) < 1 || Number(percentages[disbursementType]) > 100) && (
                          <span className="text-red-500 text-xs mt-1">Enter a valid percentage (1-100)</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </label>
            </div>
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[13px] md:text-[16px] mb-2">Additional Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g Release funds monthly for upkeep of the property."
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none"
            />
          </div>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              disabled={!isFormValid}
              className={`bg-[#33C5E0] w-[243px] text-[#161E22] text-center px-8 py-3 justify-center font-medium rounded-[16px] h-[56px] rounded-t-[8px] rounded-b-[24px] flex items-center gap-2 border border-[#232B36] text-[14px] transition-colors hover:bg-[#33C5E0]/90 disabled:bg-[#1C252A] disabled:text-[#425558] disabled:cursor-not-allowed`}
              onClick={() => {
                if (isFormValid) router.push("/dashboard/plans/create/rules-verification");
              }}
            >
              NEXT
              <Image src="/assets/icons/grey_arrowdown.svg" alt="arrow icon" width={13.5} height={13.5} className="inline-block" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RulesPage;
