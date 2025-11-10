"use client";

import React from "react";
import Image from "next/image";

interface FingerprintModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const FingerprintModal: React.FC<FingerprintModalProps> = ({ open, onClose, onContinue }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22CC] backdrop-blur-sm">
      <div className="bg-[#161E22] border border-[#2A3338] rounded-2xl p-8 md:p-12 w-full max-w-3xl flex flex-col items-center shadow-xl relative mx-2">
        <div className="w-full flex items-center gap-2 mb-6 mt-2">
          <button
            onClick={onClose}
            className="text-[#BFC6C8] text-[15px] flex items-center gap-3"
          >
            <Image src="/assets/icons/back.svg" alt="back" width={15} height={12.5} />
            <span className="font-medium text-[#92A5A8] text-[14px]">BIOMETRIC AUTHENTICATION</span>
          </button>
        </div>
        <h2 className="text-xl md:text-2xl font-medium text-[#FCFFFF] mb-2 mt-2 text-center">Enable Fingerprint Unlock</h2>
        <p className="text-[#92A5A8] text-[13px] md:text-[15px] text-center mb-8 font-normal">Rest your finger on the print scanner to record your fingerprint</p>
        <div className="flex flex-col items-center mb-10">
          <div className="bg-white rounded-xl p-3 md:p-4 mb-2 flex items-center justify-center border-2 border-[#33C5E0]">
            <Image src="/assets/images/fingerprint.svg" alt="fingerprint" width={200} height={200} className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] object-contain" />
          </div>
        </div>
        <button
          className="w-full cursor-pointer md:w-[340px] bg-[#33C5E0] text-[#161E22] py-3 rounded-full font-medium text-base transition-colors hover:bg-[#33C5E0]/90"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FingerprintModal;
