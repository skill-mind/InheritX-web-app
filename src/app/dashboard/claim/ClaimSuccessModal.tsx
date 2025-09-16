"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface ClaimSuccessModalProps {
  open: boolean;
  onCancel: () => void;
  onContinue: () => void;
}

export default function ClaimSuccessModal({ open, onCancel, onContinue }: ClaimSuccessModalProps) {
  const router = useRouter();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22CC] bg-opacity-60">
      <div className="bg-[#161E22] rounded-[24px] shadow-xl w-full md:w-[536px] max-w-[620px] mx-4 p-6 md:p-10 flex flex-col items-center border border-[#2A3338] relative">
        <h2 className="text-[18px] md:text-[20px] font-medium text-[#FCFFFF] mb-[5rem] text-center">Inheritance claimed is Successful</h2>
        <div className="flex items-center justify-center mb-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[180px] h-[180px] rounded-full bg-green-900 opacity-20" />
            <div className="absolute w-[140px] h-[140px] rounded-full bg-green-900 opacity-30" />
            <div className="absolute w-[100px] h-[100px] rounded-full bg-green-900 opacity-40" />
            <div className="relative w-[70px] h-[70px] rounded-full bg-green-500 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#161E22" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4 mt-[5rem]">
          <button
            className="flex-1 cursor-pointer py-3 rounded-[24px] bg-[#1C252A] text-[#FCFFFF] font-medium text-[15px] hover:bg-[#232B36] transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 cursor-pointer py-3 rounded-[24px] bg-[#33C5E0] text-[#161E22] font-medium text-[15px] hover:bg-cyan-400 transition-colors"
            onClick={() => {
              setTimeout(() => router.push("/dashboard/claim"), 100);
              onContinue();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
