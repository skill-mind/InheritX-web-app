"use client";

import Image from "next/image";

interface MessageUserSuccessModalProps {
  isOpen: boolean;
  userFullName: string;
  onClose: () => void;
  onNext: () => void;
}

export default function MessageUserSuccessModal({
  isOpen,
  userFullName,
  onClose,
  onNext,
}: MessageUserSuccessModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/90 backdrop-blur-[6px]">
      <div className="relative flex flex-col items-center justify-between h-[534px] w-[844px] max-w-2xl mx-4 md:mx-0 rounded-[24px] bg-[#161E22] border border-[#2A3338] p-8 md:p-12 shadow-xl gap-8">
        <div className="text-center w-full">
          <span className="text-[16px] md:text-[18px] text-[#FCFFFF] font-normal">
            Message sent to <span className="text-[#33C5E0] font-semibold">"{userFullName}"</span> successfully!
          </span>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="relative flex items-center justify-center">
            <span className="flex items-center justify-center w-[180px] h-[180px] rounded-[20px] bg-white/10">
              {/* Replace with your success icon/image if available */}
              <Image
                src="/assets/images/success.svg"
                alt="success"
                width={120}
                height={120}
                className="rounded-[12px]"
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
