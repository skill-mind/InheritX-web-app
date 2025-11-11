"use client";

import React from "react";

// interface Beneficiary {
//   name: string;
//   relationship: string;
//   email: string;
// }

interface BeneficiarySuccessModalProps {
  open: boolean;
  name: string;
  onClose: () => void;
  onNext: () => void;
}

const BeneficiarySuccessModal: React.FC<BeneficiarySuccessModalProps> = ({ open, name, onClose, onNext }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/80">
      <div className="bg-[#161E22] rounded-[32px] shadow-lg p-8 w-[90vw] max-w-[480px] flex flex-col gap-10 items-center justify-center">
        <h3 className="text-[#FCFFFF] text-[18px] md:text-[22px] font-medium mb-8 text-center">
          Beneficiary <span className="text-[#33C5E0]">&apos;{name}&apos;</span> added successfully
        </h3>
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-green-700 opacity-20" />
            <div className="absolute inset-4 rounded-full bg-green-700 opacity-30" />
            <div className="absolute inset-8 rounded-full bg-green-600 opacity-40" />
            <div className="absolute inset-12 rounded-full bg-green-500 opacity-100 flex items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="#22C55E" />
                <path d="M18 32l8 8 16-16" stroke="#161E22" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
          <button
            className="bg-[#1C252A] text-[#FCFFFF] px-8 py-3 rounded-[24px] font-medium text-[15px] w-full md:w-1/2 cursor-pointer"
            onClick={onClose}
          >
            Go Back Home
          </button>
          <button
            className="bg-[#33C5E0] text-[#161E22] px-8 py-3 rounded-[24px] font-medium text-[15px] w-full md:w-1/2 cursor-pointer"
            onClick={onNext}
          >
            Next Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiarySuccessModal;
