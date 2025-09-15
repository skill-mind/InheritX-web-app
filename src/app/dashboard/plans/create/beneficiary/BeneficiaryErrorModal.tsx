"use client";

import React from "react";
import Image from "next/image";

interface BeneficiaryErrorModalProps {
  open: boolean;
  onCancel: () => void;
  onRetry: () => void;
}

const BeneficiaryErrorModal: React.FC<BeneficiaryErrorModalProps> = ({ open, onCancel, onRetry }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/80">
      <div className="bg-[#161E22] rounded-[32px] shadow-lg p-8 w-[95vw] max-w-[540px] flex flex-col items-center justify-center border border-[#232B36]">
        <h3 className="text-[#FCFFFF] text-[18px] md:text-[22px] font-medium mb-8 text-center">
          Oops! Looks like something went wrong. Try again
        </h3>
        <div className="flex items-center justify-center mb-8">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[180px] h-[180px] rounded-full bg-red-700/10" />
            <div className="absolute w-[140px] h-[140px] rounded-full bg-red-700/20" />
            <div className="absolute w-[100px] h-[100px] rounded-full bg-red-600/40" />
            <div className="relative w-[80px] h-[80px] rounded-full bg-red-500 flex items-center justify-center">
              <Image src="/assets/icons/oops.svg" alt="error" width={48} height={48} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
          <button
            className="bg-[#1C252A] text-[#FCFFFF] px-8 py-3 rounded-[24px] font-medium text-[15px] w-full"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[#33C5E0] text-[#161E22] px-8 py-3 rounded-[24px] font-medium text-[15px] w-full"
            onClick={onRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryErrorModal;
