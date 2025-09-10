"use client";
import React, { useState } from "react";
import ClaimSuccessModal from "./ClaimSuccessModal";
import ClaimErrorModal from "./ClaimErrorModal";

interface ClaimPlanModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ClaimPlanModal({ open, onClose }: ClaimPlanModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<{ name?: string; email?: string; code?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  if (!open) return null;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";
    if (code.some((c) => !c)) newErrors.code = "Claim code is required";
    else if (code.join("").length !== 6) newErrors.code = "Claim code must be 6 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCodeChange = (idx: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[idx] = value;
      setCode(newCode);
      // Auto-focus next input
      if (value && idx < 5) {
        const next = document.getElementById(`claim-code-${idx + 1}`);
        if (next) (next as HTMLInputElement).focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate success or error (replace with real API logic)
      const isSuccess = true; // Change to false to test error modal
      if (isSuccess) {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22CC] bg-opacity-60">
        <div className="bg-[#161E22] rounded-[24px] shadow-xl w-full md:w-[536px] max-w-[620px] mx-4 p-6 md:p-10 flex flex-col items-center border border-[#2A3338] relative">
          <button
            className="absolute top-4 right-4 text-[#BFC6C8] text-xl font-bold hover:text-[#33C5E0]"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-[22px] md:text-[24px] font-medium text-[#FCFFFF] mb-2 text-center">Claim Plan</h2>
          <p className="text-[#92A5A8] text-[14px] mb-6 text-center">Input your details to claim your inheritance</p>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-[#FCFFFF] text-[13px] mb-1">Beneficiary Name</label>
              <input
                type="text"
                className="bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#BFC6C8] placeholder-[#39494F] focus:border-[#33C5E0] outline-none w-full"
                placeholder="Enter the name of your beneficiary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#FCFFFF] text-[13px] mb-1">Beneficiary Email</label>
              <input
                type="email"
                className="bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#BFC6C8] placeholder-[#39494F] focus:border-[#33C5E0] outline-none w-full"
                placeholder="Enter the email of your beneficiary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[#FCFFFF] text-[13px] mb-1">Input Claim Code</label>
              <div className="flex gap-3 justify-center">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`claim-code-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-12 h-12 md:w-14 md:h-14 bg-[#161E22] border border-[#232B36] rounded-[12px] flex items-center justify-center text-[#BFC6C8] text-2xl text-center focus:border-[#33C5E0] outline-none"
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                  />
                ))}
              </div>
              {errors.code && <span className="text-red-500 text-xs mt-1 text-center">{errors.code}</span>}
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer mt-6 py-3 rounded-t-[8px] rounded-b-[24px] bg-[#1C252A] text-[#FCFFFF] font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors"
            >
              CLAIM INHERITANCE
              <span className="ml-2">&#8594;</span>
            </button>
          </form>
        </div>
      </div>
      <ClaimSuccessModal
        open={showSuccess}
        onCancel={() => {
          setShowSuccess(false);
          onClose();
        }}
        onContinue={() => {
          setShowSuccess(false);
          onClose();
        }}
      />
      <ClaimErrorModal
        open={showError}
        onCancel={() => setShowError(false)}
        onContinue={() => setShowError(false)}
      />
    </>
  );
}
