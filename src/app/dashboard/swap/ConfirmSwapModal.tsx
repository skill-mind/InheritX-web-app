import React from "react";
import Image from "next/image";

interface ConfirmSwapModalProps {
  fromToken: { symbol: string; name: string; icon: string };
  toToken: { symbol: string; name: string; icon: string };
  fromAmount: string;
  toAmount: string;
  price: number;
  minSum: string;
  tradingFee: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmSwapModal: React.FC<ConfirmSwapModalProps> = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  price,
  minSum,
  tradingFee,
  onCancel,
  onConfirm,
}) => (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center" style={{background: '#161E22CC', backdropFilter: 'blur(8px)'}}>
    <div className="w-full max-w-[480px] mx-2 sm:mx-0 bg-[#161E22] rounded-2xl shadow-2xl p-6 relative flex flex-col" style={{minWidth: '320px'}}>
      <button
        className="absolute left-6 top-6 text-[#BFC6C8] text-lg font-bold"
        onClick={onCancel}
        aria-label="Back"
      >
        <span className="text-2xl">←</span>
      </button>
      <h3 className="text-[#BFC6C8] text-[15px] font-medium mb-6 text-center">CONFIRM SWAP</h3>
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-[#232B36] rounded-full px-4 py-3 min-w-[120px] w-full sm:w-auto">
            <Image src={fromToken.icon} alt={fromToken.symbol} width={24} height={24} />
            <span className="text-[#FCFFFF] font-semibold text-[16px]">{fromToken.symbol}</span>
            <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={16} height={16} />
          </div>
          <div className="text-[#FCFFFF] text-[22px] font-bold">{fromAmount}</div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-[#232B36] rounded-full px-4 py-3 min-w-[120px] w-full sm:w-auto">
            <Image src={toToken.icon} alt={toToken.symbol} width={24} height={24} />
            <span className="text-[#FCFFFF] font-semibold text-[16px]">{toToken.symbol}</span>
            <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={16} height={16} />
          </div>
          <div className="text-[#FCFFFF] text-[22px] font-bold">${toAmount}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-[#BFC6C8] text-xs font-semibold">SLIPPAGE TOLERANCE</span>
        <span className="text-[#FCFFFF] text-xs">Output is estimated. You will receive at least {toAmount || "0.00"} {toToken.symbol}.</span>
      </div>
      <div className="bg-[#232B36] rounded-xl p-4 mb-6">
        <div className="flex flex-col gap-2 text-[#FCFFFF] text-xs">
          <div className="flex justify-between"><span>PRICE</span><span>{price} {toToken.symbol}</span></div>
          <div className="flex justify-between"><span>MINIMUM SUM</span><span>{minSum} {toToken.symbol}</span></div>
          <div className="flex justify-between"><span>PRICE IMPACT</span><span>--</span></div>
          <div className="flex justify-between"><span>TRADING FEE</span><span>{tradingFee} {toToken.symbol}</span></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full mt-auto">
        <button
          className="w-full py-3 rounded-[24px] bg-[#232B36] text-[#BFC6C8] font-medium text-[15px]"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="w-full py-3 rounded-[24px] bg-[#33C5E0] text-[#161E22] font-medium text-[15px]"
          onClick={onConfirm}
        >
          Confirm Swap
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmSwapModal;
