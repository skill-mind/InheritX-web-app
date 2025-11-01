import React from "react";
import Image from "next/image";

interface InactivityErrorModalProps {
  onCancel: () => void;
  onRetry: () => void;
}

const InactivityErrorModal: React.FC<InactivityErrorModalProps> = ({ onCancel, onRetry }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#161E22] rounded-2xl p-8 w-full max-w-lg flex flex-col items-center shadow-lg relative">
        <div className="text-center w-full">
          <p className="text-white text-lg font-medium mb-8">Oops! Looks like something went wrong. Try again</p>
        </div>
        <div className="flex flex-col items-center mb-10">
          <div className="relative flex items-center justify-center">
            <div className="rounded-full bg-[#2B0B0B] w-48 h-48 flex items-center justify-center">
              <div className="rounded-full bg-[#E53935] w-32 h-32 flex items-center justify-center">
                <Image src="/assets/images/oops.svg" alt="error" width={80} height={80} />
              </div>
            </div>
            {/* Fallback: If no SVG, use emoji */}
            {/* <span className="absolute text-[64px]">😞</span> */}
          </div>
        </div>
        <div className="flex w-full gap-4 mt-2">
          <button
            className="flex-1 cursor-pointer bg-[#232B36] text-white py-3 rounded-full font-medium text-base transition-colors hover:bg-[#232B36]/80"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 cursor-pointer bg-[#33C5E0] text-[#161E22] py-3 rounded-full font-medium text-base transition-colors hover:bg-cyan-400"
            onClick={onRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default InactivityErrorModal;
