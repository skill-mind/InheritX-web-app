"use client";

import React from "react";
import Image from "next/image";

interface MessageSuccessModalProps {
  open: boolean;
  recipient: string;
  onHome: () => void;
  onNext: () => void;
}

const MessageSuccessModal: React.FC<MessageSuccessModalProps> = ({ open, recipient, onHome, onNext }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/80 backdrop-blur-[6px]">
      <div className="relative w-full max-w-xl mx-4 md:mx-0 md:w-[600px] rounded-[24px] bg-[#161E22] border border-[#2A3338] p-6 md:p-10 shadow-xl z-10 flex flex-col items-center gap-8 max-h-[95vh] overflow-y-auto">
        <div className="text-center w-full">
          <div className="text-[#FCFFFF] text-lg md:text-xl font-medium mb-4">
            Message sent to <span className="text-[#33C5E0] underline">"{recipient}"</span> successfully!
          </div>
          <div className="flex justify-center mb-6">
            <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-[20px] bg-[#222C32] flex items-center justify-center">
              {/* Placeholder for image or animation */}
              <Image src="/assets/images/success.svg" alt="success" width={120} height={120} className="object-contain" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
          <button className="flex-1 cursor-pointer bg-[#222C32] text-[#FCFFFF] hover:bg-[#1C252A] rounded-full py-3 font-medium text-[15px] border border-[#222C32]" onClick={onHome}>
            Go Back Home
          </button>
          <button className="flex-1 cursor-pointer bg-[#33C5E0] text-[#161E22] hover:bg-cyan-600 rounded-full py-3 font-semibold text-[15px] border border-[#33C5E0]" onClick={onNext}>
            Next Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageSuccessModal;
