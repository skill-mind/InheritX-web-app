"use client";

import Image from "next/image";

interface UserVerificationSuccessModalProps {
  isOpen: boolean;
  userFullName: string;
  onClose: () => void;
  onNext: () => void;
}

export default function UserVerificationSuccessModal({
  isOpen,
  userFullName,
  onClose,
  onNext,
}: UserVerificationSuccessModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/90 backdrop-blur-[6px]">
      <div className="relative flex flex-col items-center justify-between h-[534px] w-[844px] max-w-2xl mx-4 md:mx-0 rounded-[24px] bg-[#161E22] border border-[#2A3338] p-8 md:p-12 shadow-xl gap-8">
        <div className="text-center w-full">
          <span className="text-[14px] md:text-[16px] text-[#FCFFFF] font-normal">
            KYC for{" "}
            <span className="text-[#33C5E0] font-semibold">&quot;{userFullName}&quot;</span>{" "}
            successfully{" "}
            <span className="text-[#FCFFFF] font-bold">APPROVED!</span>
          </span>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-[220px] h-[220px] rounded-full bg-[#1C2B1C] opacity-40"></span>
            <span className="absolute w-[170px] h-[170px] rounded-full bg-[#1C2B1C] opacity-60"></span>
            <span className="absolute w-[120px] h-[120px] rounded-full bg-[#1C2B1C] opacity-80"></span>
            <span className="flex items-center justify-center w-[120px] h-[120px] rounded-full z-10">
              <Image
                src="/assets/images/success.svg"
                alt="success"
                width={266}
                height={266}
              />
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
          <button
            className="flex-1 bg-[#222C32] text-[#FCFFFF] hover:bg-[#1C252A] rounded-full py-3 font-medium text-[16px] border border-[#222C32]"
            onClick={onClose}
          >
            Go Back Home
          </button>
          <button
            className="flex-1 bg-[#33C5E0] text-[#161E22] hover:bg-cyan-600 rounded-full py-3 font-semibold text-[16px] border border-[#33C5E0]"
            onClick={onNext}
          >
            Next Request
          </button>
        </div>
      </div>
    </div>
  );
}
