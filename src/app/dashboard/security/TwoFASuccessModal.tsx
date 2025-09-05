"use client";

import React from "react";
import Image from "next/image";

interface TwoFASuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const TwoFASuccessModal: React.FC<TwoFASuccessModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22CC] backdrop-blur-sm">
      <div className="bg-[#161E22] border border-[#2A3338] rounded-2xl p-8 md:p-12 w-full max-w-3xl flex flex-col items-center shadow-xl relative mx-2">
        <h2 className="text-center text-white text-lg md:text-xl font-medium mb-10 mt-2">Two-Factor Authentication successful</h2>
        <div className="flex flex-col items-center mb-10">
          <div className="rounded-full bg-transparent bg-opacity-20 flex items-center justify-center w-48 h-48 mb-2">
            <div className="rounded-full bg-transparent flex items-center justify-center w-32 h-32">
              <Image src="/assets/icons/green_check.svg" alt="success" width={80} height={80} className="z-50" />
            </div>
          </div>
        </div>
        <button
          className="w-full md:w-[340px] bg-[#33C5E0] text-[#161E22] py-3 rounded-full font-medium text-base transition-colors hover:bg-[#33C5E0]/90"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TwoFASuccessModal;
