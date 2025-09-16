"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ConfirmSwapModal from "./ConfirmSwapModal";
import SuccessModal from "./SuccessModal";

const TOKENS = [
  { symbol: "ETH", name: "Ethereum", icon: "/assets/icons/eth.svg" },
  { symbol: "STRK", name: "Starknet", icon: "/assets/icons/strk.svg" },
  { symbol: "USDC", name: "USD Coin", icon: "/assets/icons/usdc.svg" },
  { symbol: "USDT", name: "Tether", icon: "/assets/icons/usdt.png" },
];

const SwapPage = () => {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[2]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Prevent selecting same token for both
  const availableFromTokens = TOKENS.filter((t) => t.symbol !== toToken.symbol);
  const availableToTokens = TOKENS.filter((t) => t.symbol !== fromToken.symbol);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        fromRef.current &&
        !(fromRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        setShowFromDropdown(false);
      }
      if (
        toRef.current &&
        !(toRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        setShowToDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSwapActive =
    fromToken.symbol !== toToken.symbol &&
    fromAmount &&
    toAmount &&
    parseFloat(fromAmount) > 0 &&
    parseFloat(toAmount) > 0;

  // Example values for modal (replace with real logic as needed)
  const price = parseFloat(toAmount) || 0;
  const minSum = price ? (price - 19).toFixed(2) : "0.00"; // Example slippage
  const tradingFee = price ? (price * 0.00000338).toFixed(8) : "0.00000000";

  return (
    <main className="flex flex-col gap-8 p-2 md:p-8 w-full">
      <section className="mb-2">
        <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
          Swap
        </h2>
        <p className="text-[12px] font-normal md:text-[14px] text-[#92A5A8]">
          Seamlessly swap your assets at the best available rate
        </p>
      </section>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Swap Form */}
        <div className="flex-1 max-w-full lg:max-w-[420px] relative rounded-2xl p-2 sm:p-4 md:p-6 flex flex-col gap-2">
          <div className="bg-[#182024] p-4 sm:p-6 rounded-[24px]">
            <div>
              <span className="text-[#92A5A8] text-[13px] flex items-center justify-between">
                <span> Swap From:</span>
                <span className="text-[#92A5A8] text-xs">
                  Bal: 0{" "}
                  <span className="ml-2 text-cyan-400 cursor-pointer w-[46px] h-[23px] text-[10px] rounded-[12px] bg-[#33C5E014] border border-[#33C5E03D] py-[4px] px-[12px] hover-raise clickable button-focus">
                    MAX
                  </span>
                </span>
              </span>
              <div className="flex items-center justify-between bg-transparent rounded-xl py-3 mt-2">
                <div
                  className="flex items-center gap-2 bg-[#1C252A] p-[12px] rounded-[24px] cursor-pointer relative hover-raise clickable button-focus"
                  onClick={() => setShowFromDropdown((v) => !v)}
                  ref={fromRef}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={fromToken.icon}
                      alt={fromToken.symbol}
                      width={20}
                      height={20}
                    />
                    <span className="text-[#FCFFFF] font-medium">
                      {fromToken.symbol}
                    </span>
                  </div>
                  <Image
                    src="/assets/icons/dropdown.svg"
                    alt="dropdown icon"
                    width={11.5}
                    height={11.5}
                    className="inline-block"
                  />
                  {showFromDropdown && (
                    <div className="absolute left-0 top-full mt-2 bg-[#232B36] rounded-xl shadow-lg z-50 min-w-[160px] border border-[#33C5E03D]">
                      {availableFromTokens.map((token) => (
                        <button
                          key={token.symbol}
                          className={`flex items-center gap-2 p-2 w-full text-left hover:bg-[#182024] text-[#FCFFFF] text-[12px] ${
                            fromToken.symbol === token.symbol
                              ? "bg-[#1C252A]"
                              : ""
                          } hover-raise clickable`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFromToken(token);
                            setShowFromDropdown(false);
                            if (token.symbol === toToken.symbol) {
                              setToToken(
                                TOKENS.find((t) => t.symbol !== token.symbol) ||
                                  TOKENS[0]
                              );
                            }
                          }}
                        >
                          <Image
                            src={token.icon}
                            alt={token.symbol}
                            width={15}
                            height={15}
                          />
                          <span>
                            {token.name} ({token.symbol})
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="text-2xl text-[#92A5A8] font-semibold text-[32px] bg-transparent outline-none w-[120px] text-right px-2"
                />
              </div>
              <div className="flex items-end justify-end">
                <span className="text-[#92A5A8] text-xs mr-[1rem]">
                  ≈ $0.00
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-2 absolute left-1/2 -translate-x-1/2 top-[10rem] lg:static lg:translate-x-0">
            <div className="bg-[#232B36] rounded-full p-2 flex items-center justify-center hover-raise clickable button-focus">
              <Image
                src="/assets/icons/swap.svg"
                alt="swap"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="bg-[#182024] p-4 sm:p-6 rounded-[24px]">
            <div>
              <span className="text-[#92A5A8] text-[13px] flex items-center justify-between">
                <span> Swap To:</span>
                <span className="text-[#92A5A8] text-xs">Bal: 0</span>
              </span>
              <div className="flex items-center justify-between bg-transparent rounded-xl py-3 mt-2">
                <div
                  className="flex items-center gap-2 bg-[#1C252A] p-[12px] rounded-[24px] cursor-pointer relative hover-raise clickable button-focus"
                  onClick={() => setShowToDropdown((v) => !v)}
                  ref={toRef}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={toToken.icon}
                      alt={toToken.symbol}
                      width={20}
                      height={20}
                    />
                    <span className="text-[#FCFFFF] font-medium">
                      {toToken.symbol}
                    </span>
                  </div>
                  <Image
                    src="/assets/icons/dropdown.svg"
                    alt="dropdown icon"
                    width={11.5}
                    height={11.5}
                    className="inline-block"
                  />
                  {showToDropdown && (
                    <div className="absolute left-0 top-full mt-2 bg-[#232B36] rounded-xl shadow-lg z-50 min-w-[160px] border border-[#33C5E03D]">
                      {availableToTokens.map((token) => (
                        <button
                          key={token.symbol}
                          className={`flex items-center gap-2 p-2 w-full text-left hover:bg-[#182024] text-[#FCFFFF] text-[12px] ${
                            toToken.symbol === token.symbol
                              ? "bg-[#1C252A]"
                              : ""
                          } hover-raise clickable`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setToToken(token);
                            setShowToDropdown(false);
                            if (token.symbol === fromToken.symbol) {
                              setFromToken(
                                TOKENS.find((t) => t.symbol !== token.symbol) ||
                                  TOKENS[0]
                              );
                            }
                          }}
                        >
                          <Image
                            src={token.icon}
                            alt={token.symbol}
                            width={15}
                            height={15}
                          />
                          <span>
                            {token.name} ({token.symbol})
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0.00"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="text-2xl text-[#92A5A8] font-semibold text-[32px] bg-transparent outline-none w-[120px] text-right px-2"
                />
              </div>
              <div className="flex items-end justify-end">
                <span className="text-[#92A5A8] text-xs mr-[1rem]">
                  ≈ $0.00
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-2 mb-4">
            <span className="text-[#92A5A8] font-normal text-xs">
              Gas Fee: $0.00
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className={`w-full py-3 cursor-pointer rounded-t-[8px] rounded-b-[24px] font-medium text-[14px] flex items-center justify-center gap-2 mt-2 transition-all duration-200
                ${
                  isSwapActive
                    ? "bg-[#33C5E0] text-[#161E22]"
                    : "bg-[#232B36] text-[#33C5E0]"
                }
              `}
              disabled={!isSwapActive}
              onClick={() => isSwapActive && setShowConfirmModal(true)}
              aria-disabled={!isSwapActive}
            >
              <Image
                src={
                  isSwapActive
                    ? "/assets/icons/swap_dark.svg"
                    : "/assets/icons/swap_cyan.svg"
                }
                alt="swap"
                width={20}
                height={20}
              />
              SWAP ASSET
            </button>
            <div
              className={`w-[80px] h-[8px] rounded-[12px] mt-2 transition-all duration-200 ${
                isSwapActive ? "bg-[#33C5E0]" : "bg-[#1C252A]"
              }`}
            ></div>
          </div>
        </div>
        {/* Asset Rate Slippage */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="bg-[#33C5E014] border border-[#33C5E014] rounded-t-2xl py-3 px-2 sm:px-6 text-center text-[#33C5E0] font-medium text-[14px] tracking-wide">
            ASSET RATE SLIPPAGE
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-transparent rounded-b-2xl p-2 sm:p-4">
            {[0.24, 0.24, -0.24].map((rate, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-between gap-2 bg-[#182024] rounded-[16px] py-[20px] px-[12px] min-h-[118px] min-w-0 w-full sm:min-w-[180px] hover-raise clickable"
              >
                <div className="flex items-center w-full gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/icons/eth.svg"
                      alt="ETH"
                      width={20}
                      height={20}
                    />
                    <span className="text-[#FCFFFF] text-[14px] font-semibold">
                      ETH
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/icons/uptrend.svg"
                      alt="uptrend icon"
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                    <span
                      className={`text-[12px] ${
                        rate > 0 ? "text-[#BFC6C8]" : "text-red-400"
                      }`}
                    >
                      {rate > 0 ? "+" : ""}
                      {rate}%
                    </span>
                  </div>
                </div>
                <span className="text-[#BFC6C8] font-medium text-[14px]">
                  1 Eth = 1000 USDC
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center text-center text-cyan-400 text-[12px] font-normal rounded-b-[24px] mt-2 bg-[#182024] w-full h-[48px] border-t border-[#33C5E014]">
            You Will Receive At Least 1790 USDC (If The Price Doesn&apos;t Move
            More Than 0.5%).
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="mt-8">
        <h3 className="text-[#BFC6C8] text-[15px] font-medium mb-4">
          Recent transactions
        </h3>
        <div className="flex flex-col bg-[#182024] rounded-[24px] py-[64px] px-4 sm:px-[24px] min-h-[220px] items-center justify-center flex-1">
          <span className="text-[#FCFFFF] mb-2 text-center text-[18px] font-normal">
            You don’t have an activity record yet.
          </span>
          <span className="text-[#99A9A2] text-[12px] font-normal mb-8 text-center">
            Swap assets and add to a plan to see your transaction history
          </span>
          <button className="flex items-center gap-2 w-fit text-[14px] px-6 py-3 font-medium rounded-[24px] border border-[#33C5E03D] bg-[#33C5E014] text-[#33C5E0] hover:bg-cyan-900/30 transition-colors hover-raise clickable button-focus">
            <Image
              src="/assets/icons/arrowdown.svg"
              alt="arrowdown icon"
              width={14}
              height={14}
              className="inline-block rotate-[270deg]"
            />
            Swap Assets
          </button>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmSwapModal
          fromToken={fromToken}
          toToken={toToken}
          fromAmount={fromAmount}
          toAmount={toAmount}
          price={price}
          minSum={minSum}
          tradingFee={tradingFee}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => {
            setShowConfirmModal(false);
            setShowSuccessModal(true);
          }}
        />
      )}
      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          onCancel={() => setShowSuccessModal(false)}
          onContinue={() => setShowSuccessModal(false)}
        />
      )}
      <style jsx>{`
        .hover-raise { transition: transform .16s cubic-bezier(.2,.9,.2,1), box-shadow .16s ease; }
        .hover-raise:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(3,10,14,0.36); }
        .clickable { cursor: pointer; }
        .button-focus:focus-visible { outline: 2px solid rgba(51,197,224,0.12); outline-offset: 2px; border-radius: 8px; }
      `}</style>
    </main>
  );
};

export default SwapPage;
