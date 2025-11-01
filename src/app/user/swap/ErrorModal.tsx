import React from "react";
import Image from "next/image";

interface ErrorModalProps {
  onCancel: () => void;
  onContinue: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ onCancel, onContinue }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/90 backdrop-blur-[6px]">
    <div className="relative flex flex-col items-center justify-between h-auto min-h-[400px] w-full max-w-2xl mx-4 md:mx-0 rounded-[24px] bg-[#161E22] border border-[#2A3338] p-8 md:p-12 shadow-xl gap-8">
      <div className="text-center w-full">
        <span className="text-[16px] md:text-[18px] text-[#FCFFFF] font-normal">
          Oops! Looks like something went wrong. Try again
        </span>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-[220px] h-[220px] rounded-full bg-[#2B1C1C] opacity-40"></span>
          <span className="absolute w-[170px] h-[170px] rounded-full bg-[#2B1C1C] opacity-60"></span>
          <span className="absolute w-[120px] h-[120px] rounded-full bg-[#2B1C1C] opacity-80"></span>
          <span className="flex items-center justify-center w-[120px] h-[120px] rounded-full z-10 bg-[#FF2D2D]">
            <Image
              src="/assets/icons/oops.svg"
              alt="error"
              width={60}
              height={60}
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
        <button
          className="flex-1 bg-[#222C32] text-[#FCFFFF] hover:bg-[#1C252A] rounded-full py-3 font-medium text-[16px] border border-[#222C32]"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="flex-1 bg-[#33C5E0] text-[#161E22] hover:bg-cyan-600 rounded-full py-3 font-semibold text-[16px] border border-[#33C5E0]"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);

export default ErrorModal;
