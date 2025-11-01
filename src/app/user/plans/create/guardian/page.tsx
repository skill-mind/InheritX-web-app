"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GuardianSuccessModal from "./GuardianSuccessModal";
import GuardianErrorModal from "./GuardianErrorModal";

const GuardianPage = () => {
  const router = useRouter();
  const [step] = useState(1);
  const [form, setForm] = useState({ name: "", email: "" });
  const [touched, setTouched] = useState({ name: false, email: false });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Validation
  const isNameValid = form.name.trim().length > 0;
  const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
  const isFormValid = isNameValid && isEmailValid;

  // Progress bar style
  const progressPercent = step === 1 ? 0 : 100;

  // Simulate submit
  const handleAddGuardian = () => {
    if (!isFormValid) return;
    // Simulate error if name is 'error', else success
    if (form.name.trim().toLowerCase() === "error") {
      setShowError(true);
    } else {
      setShowSuccess(true);
    }
  };

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full min-h-screen bg-[#161E22]">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-4">
          <button className="text-[#BFC6C8] cursor-pointer text-[15px] flex items-center gap-2" onClick={() => router.back()}>
            <Image
              src="/assets/icons/back.svg"
              alt="back"
              width={18}
              height={15}
            />
          </button>
          <h2 className="text-lg md:text-2xl font-medium text-[#92A5A8]">
            Add Guardian
            <span className="text-[#FCFFFF] font-normal text-[14px] ml-2 mb-[4px]">| Please Fill This Form Out Carefully</span>
          </h2>
        </div>
        <button className="border border-[#33C5E03D] px-6 py-3 rounded-[24px] text-[#33C5E0] text-[15px] flex items-center gap-2 hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer">
          <Image src="/assets/icons/plus.svg" alt="plus" width={18} height={18} />
          <span>Add Beneficiary</span>
        </button>
      </div>
      {/* Progress Bar */}
      <div className="w-full flex items-center justify-between mb-8">
        <div className="flex items-center w-full">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === 1 ? "border-cyan-400 bg-[#161E22]" : "border-cyan-400 bg-cyan-400"}`}>
            {step === 1 ? (
              <span className="text-cyan-400 text-[18px] font-semibold">1</span>
            ) : (
              <Image src="/assets/icons/green_check.svg" alt="check" width={24} height={24} />
            )}
          </div>
          <div className="flex-1 h-2 mx-2 rounded-full bg-[#232B36] relative">
            <div className="absolute top-0 left-0 h-2 rounded-full bg-[#33C5E0]" style={{ width: `${progressPercent}%`, transition: "width 0.3s" }} />
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === 2 ? "border-cyan-400 bg-[#161E22]" : "border-[#232B36] bg-[#232B36]"}`}>
            <span className={`text-[18px] font-semibold ${step === 2 ? "text-cyan-400" : "text-[#BFC6C8]"}`}>2</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mb-2">
        <span className={`text-cyan-400 text-[15px] font-medium ml-2`}>Guardian Details</span>
        <span className={`text-[#BFC6C8] text-[15px] font-medium mr-2`}>Verification</span>
      </div>
      <p className="text-center text-[#BFC6C8] text-[15px] mb-4">Please fill this form out carefully</p>
      {/* Form */}
      <form className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
        <div>
          <label className="block text-[#FCFFFF] text-[15px] mb-2">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            onBlur={() => setTouched({ ...touched, name: true })}
            placeholder="John Doe"
            className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[16px] outline-none"
          />
          {!isNameValid && touched.name && (
            <span className="text-red-500 text-xs mt-1">Full name is required</span>
          )}
        </div>
        <div>
          <label className="block text-[#FCFFFF] text-[15px] mb-2">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            onBlur={() => setTouched({ ...touched, email: true })}
            placeholder="johndoe@gmail.com"
            className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[16px] outline-none"
          />
          {!isEmailValid && touched.email && (
            <span className="text-red-500 text-xs mt-1">Enter a valid email address</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-8 w-full">
          <button
            type="button"
            className="bg-[#1C252A] text-[#FCFFFF] px-8 py-3 rounded-b-[24px] rounded-t-[8px] font-medium text-[15px] w-full flex items-center justify-center gap-2 border border-[#232B36]"
            onClick={() => {}}
          >
            SAVE AS DRAFT
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="#33C5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            disabled={!isFormValid}
            className={`bg-[#33C5E0] text-[#161E22] px-8 py-3 rounded-b-[24px] rounded-t-[8px] font-medium text-[15px] w-full flex items-center justify-center gap-2 border border-[#232B36] transition-colors hover:bg-[#33C5E0]/90 disabled:bg-[#1C252A] disabled:text-[#FCFFFF] disabled:cursor-not-allowed`}
            onClick={handleAddGuardian}
          >
            {step === 1 ? "ADD GUARDIAN" : "ADD BENEFICIARY"}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="#161E22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
      <GuardianSuccessModal
        open={showSuccess}
        name={form.name}
        onHome={() => { setShowSuccess(false); router.push("/user"); }}
        onNext={() => { setShowSuccess(false); setForm({ name: "", email: "" }); setTouched({ name: false, email: false }); }}
      />
      <GuardianErrorModal
        open={showError}
        onCancel={() => setShowError(false)}
        onRetry={() => setShowError(false)}
      />
    </main>
  );
};

export default GuardianPage;
