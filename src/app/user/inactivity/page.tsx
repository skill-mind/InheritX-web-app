"use client";

import React, { useState } from "react";
import Image from "next/image";
import InactivitySuccessModal from "./InactivitySuccessModal";
import InactivityErrorModal from "./InactivityErrorModal";

const inactivityOptions = ["3 Months", "6 Months", "1 Year", "1 Month"];

const InactivityPage = () => {
  const [selected, setSelected] = useState("6 Months");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryEmail, setBeneficiaryEmail] = useState("");
  const [claimCode, setClaimCode] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, code: false });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Simple validation
  const isEmailValid = beneficiaryEmail.match(/^\S+@\S+\.\S+$/);
  const isNameValid = beneficiaryName.trim().length > 0;
  const isCodeValid = claimCode.trim().length > 0;
  const isFormValid = isNameValid && isEmailValid && isCodeValid;

  // Save settings handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSaving(true);
    try {
      // Simulate API call (replace with real API logic)
      await new Promise((resolve, reject) => setTimeout(() => {
        // Simulate error 50% of the time for demo
        if (Math.random() < 0.5) {
          resolve(true);
        } else {
          reject(new Error("Save failed"));
        }
      }, 1000));
      setShowSuccess(true);
    } catch {
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  // After success modal, show summary
  const handleSuccessContinue = () => {
    setShowSuccess(false);
    setShowSummary(true);
  };

  // Edit settings handler
  const handleEdit = () => {
    setShowSummary(false);
  };

  // Retry handler for error modal
  const handleRetry = () => {
    setShowError(false);
    // Optionally, re-attempt save or let user re-submit
  };

  // Cancel handler for error modal
  const handleCancelError = () => {
    setShowError(false);
  };

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full max-w-2xl">
      <section className="mb-2">
        <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
          Inactivity Set-up
        </h2>
        <p className="text-[12px] md:text-[14px] text-[#92A5A8]">
          Define the condition under which your inheritance plans kicks in.
        </p>
      </section>
      {showSummary ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white text-lg font-semibold">Plan Summary</span>
            <button
              className="flex bg-[#33C5E014] items-center gap-2 px-5 py-2 rounded-full border border-[#33C5E03D] text-[#33C5E0] hover:bg-[#33C5E014] font-medium text-[12px] transition-colors transition-transform duration-150 hover:scale-105 cursor-pointer"
              onClick={handleEdit}
            >
              <Image src="/assets/icons/edit.svg" alt="edit" width={15} height={15} />
              EDIT SETTING
            </button>
          </div>
          <div className="bg-[#182024] rounded-[16px] p-6 w-full max-w-xl">
            <table className="w-full text-left">
              <tbody>
                <tr className="border-b border-[#232B36]">
                  <td className="py-3 pr-4 text-[#92A5A8] text-xs font-semibold uppercase">Beneficiary Name</td>
                  <td className="py-3 text-[#FCFFFF] text-sm">{beneficiaryName}</td>
                </tr>
                <tr className="border-b border-[#232B36]">
                  <td className="py-3 pr-4 text-[#92A5A8] text-xs font-semibold uppercase">Beneficiary Email</td>
                  <td className="py-3 text-[#33C5E0] text-sm underline cursor-pointer transition-colors duration-150 hover:text-[#4FE27A]">{beneficiaryEmail}</td>
                </tr>
                <tr className="border-b border-[#232B36]">
                  <td className="py-3 pr-4 text-[#92A5A8] text-xs font-semibold uppercase">Claim Code</td>
                  <td className="py-3 text-[#FCFFFF] text-sm">{claimCode}</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-[#92A5A8] text-xs font-semibold uppercase">Inactivity Duration</td>
                  <td className="py-3 text-[#FCFFFF] text-sm">{selected}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSave}>
          <div>
            <label className="block text-[#FCFFFF] text-[12px] mb-2">
              Inactivity Duration
            </label>
            <div className="flex flex-col gap-3">
              {inactivityOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 cursor-pointer transition-colors duration-150 hover:bg-[#1C252A] rounded-md px-2 py-1"
                >
                  <input
                    type="radio"
                    name="inactivity"
                    value={option}
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                    className="accent-cyan-400 w-4 h-[40px] rounded-[12px] border border-[#1C252A] py-[8px] px-[16px] transition-transform duration-150 cursor-pointer"
                  />
                  <span className="text-[#BFC6C8] text-[14px]">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[12px] mb-2">
              Beneficiary Name
            </label>
            <input
              type="text"
              value={beneficiaryName}
              onChange={e => setBeneficiaryName(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, name: true }))}
              placeholder="e.g. Juliet Johnson"
              className={`w-full bg-[#181F28] border border-[#1C252A] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[14px] placeholder:text-[#425558] text-[14px] outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(51,197,224,0.08)] ${touched.name && !isNameValid ? 'border-red-500' : ''}`}
            />
            {touched.name && !isNameValid && <span className="text-red-500 text-xs">Name is required</span>}
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[12px] mb-2">
              Beneficiary Email
            </label>
            <input
              type="email"
              value={beneficiaryEmail}
              onChange={e => setBeneficiaryEmail(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              placeholder="e.g. thejulietjohnson@gmail.com"
              className={`w-full bg-[#181F28] border border-[#1C252A] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[14px] placeholder:text-[#425558] text-[14px] outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(51,197,224,0.08)] ${touched.email && !isEmailValid ? 'border-red-500' : ''}`}
            />
            {touched.email && !isEmailValid && <span className="text-red-500 text-xs">Enter a valid email</span>}
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[12px] mb-2">
              Claim Code
            </label>
            <input
              type="text"
              value={claimCode}
              onChange={e => setClaimCode(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, code: true }))}
              placeholder="e.g. 123456"
              className={`w-full bg-[#181F28] border border-[#1C252A] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[14px] placeholder:text-[#425558] text-[14px] outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(51,197,224,0.08)] ${touched.code && !isCodeValid ? 'border-red-500' : ''}`}
            />
            {touched.code && !isCodeValid && <span className="text-red-500 text-xs">Claim code is required</span>}
          </div>
          <span className="border border-none mb-[-1rem] text-[#33C5E0] text-[12px]">
            Claim Code Mechanism
          </span>
          <div className="bg-[#182F32] border border-[#33C5E03D] rounded-lg p-4 text-[#33C5E0] text-[12px] transition-shadow duration-150 hover:shadow-md cursor-default">
            The code would be sent to the email of your beneficiary if you are
            inactive for a set period of time. With the claim code, your
            beneficiary would be able to claim the assets from the inheritance
            plans you have set.
          </div>
          <button
            type="submit"
            disabled={!isFormValid || isSaving}
            className={`flex items-center gap-2 w-fit text-[14px] px-8 py-3 font-medium rounded-[16px] h-[60px] rounded-t-[8px] rounded-b-[24px] justify-center border border-[#232B36] transition-colors mt-2 transition-transform duration-150 ${isFormValid ? 'bg-[#33C5E0] text-[#161E22] hover:scale-105 cursor-pointer' : 'bg-[#1C252A] text-[#FCFFFF] hover:bg-cyan-900/30'} ${isSaving ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <span>{isSaving ? 'Saving...' : 'SAVE SETTINGS'}</span>
            <Image
              src={isFormValid ? "/assets/icons/arrowup.svg" : "/assets/icons/white_arrowdown.svg"}
              alt="arrow icon"
              width={13.5}
              height={13.5}
              className={isFormValid ? "inline-block rotate-0 transition-transform duration-150" : "inline-block rotate-[270px] transition-transform duration-150"}
            />
          </button>
        </form>
      )}
      {showSuccess && (
        <InactivitySuccessModal
          onCancel={() => setShowSuccess(false)}
          onContinue={handleSuccessContinue}
        />
      )}
      {showError && (
        <InactivityErrorModal
          onCancel={handleCancelError}
          onRetry={handleRetry}
        />
      )}
    </main>
  );
};

export default InactivityPage;
