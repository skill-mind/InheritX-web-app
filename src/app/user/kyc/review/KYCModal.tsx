import React from "react";

export function KYCModal({ type, open, onClose, onContinue }: {
  type: "success" | "error",
  open: boolean,
  onClose: () => void,
  onContinue: () => void,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-[#10171d] rounded-[32px] max-w-lg w-full mx-4 p-8 flex flex-col items-center shadow-xl border border-[#232B36]">
        <div className="mb-[5rem] mt-2 text-center text-[18px] text-[#FCFFFF] font-medium">
          {type === "success"
            ? "Your KYC submission is successful"
            : "Oops! Looks like something went wrong. Try again"}
        </div>
        <div className="mb-8 flex items-center justify-center">
          {type === "success" ? (
            <div className="relative flex items-center justify-center">
              <div className="absolute rounded-full bg-[#0F3C1C] opacity-30 w-[160px] h-[160px]" />
              <div className="absolute rounded-full bg-[#0F3C1C] opacity-50 w-[120px] h-[120px]" />
              <div className="absolute rounded-full bg-[#0F3C1C] opacity-80 w-[80px] h-[80px]" />
              <div className="relative rounded-full bg-[#00C853] w-[60px] h-[60px] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M10 17L15 22L22 13" stroke="#10171d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <div className="absolute rounded-full bg-[#3C0F1C] opacity-30 w-[160px] h-[160px]" />
              <div className="absolute rounded-full bg-[#3C0F1C] opacity-50 w-[120px] h-[120px]" />
              <div className="absolute rounded-full bg-[#3C0F1C] opacity-80 w-[80px] h-[80px]" />
              <div className="relative rounded-full bg-[#FF1744] w-[60px] h-[60px] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#FF1744"/><path d="M12 20C12 20 14 18 16 18C18 18 20 20 20 20" stroke="#10171d" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="13" r="2" fill="#10171d"/><circle cx="20" cy="13" r="2" fill="#10171d"/></svg>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-4 w-full mt-[5rem]">
          <button
            className="flex-1 bg-[#181f25] cursor-pointer text-[#FCFFFF] rounded-[16px] py-3 font-medium text-[16px] transition-colors hover:bg-[#232B36]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-[#33C5E0] cursor-pointer text-[#10171d] rounded-[16px] py-3 font-medium text-[16px] transition-colors hover:bg-[#33C5E0]/90"
            onClick={onContinue}
          >
            {type === "success" ? "Continue" : "Try Again"}
          </button>
        </div>
      </div>
    </div>
  );
}
