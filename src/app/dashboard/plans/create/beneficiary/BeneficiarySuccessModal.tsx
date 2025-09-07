"use client";

import React from "react";
import Image from "next/image";

interface BeneficiarySuccessModalProps {
  open: boolean;
  name: string;
  onHome: () => void;
  onNext: () => void;
}

const BeneficiarySuccessModal: React.FC<BeneficiarySuccessModalProps> = ({ open, name, onHome, onNext }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/80">
      <div className="bg-[#161E22] rounded-[32px] shadow-lg p-8 w-[95vw] max-w-[540px] flex flex-col items-center justify-center border border-[#232B36]">
        <h3 className="text-[#FCFFFF] text-[18px] md:text-[22px] font-medium mb-8 text-center">
          Beneficiary <span className="text-cyan-400">'{name}'</span> added successfully
        </h3>
        <div className="flex items-center justify-center mb-8">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[180px] h-[180px] rounded-full bg-green-700/10" />
            <div className="absolute w-[140px] h-[140px] rounded-full bg-green-700/20" />
            <div className="absolute w-[100px] h-[100px] rounded-full bg-green-600/40" />
            <div className="relative w-[80px] h-[80px] rounded-full bg-green-500 flex items-center justify-center">
              <Image src="/assets/icons/green_check.svg" alt="success" width={48} height={48} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
          <button
            className="bg-[#1C252A] text-[#FCFFFF] px-8 py-3 rounded-[24px] font-medium text-[15px] w-full"
            onClick={onHome}
          >
            Go Back Home
          </button>
          <button
            className="bg-[#33C5E0] text-[#161E22] px-8 py-3 rounded-[24px] font-medium text-[15px] w-full"
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
