import React from "react";
import Image from "next/image";

const SwapPage = () => {
  return (
    <main className="flex flex-col gap-8 p-4 md:p-8 w-full">
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
        <div className="flex-1 max-w-[420px] relative rounded-2xl p-6 flex flex-col gap-2">
          <div className="bg-[#182024] p-[24px] rounded-[24px]">
            <div>
              <span className="text-[#92A5A8] text-[13px] flex items-center justify-between">
                <span> Swap From:</span>
                <span className="text-[#92A5A8] text-xs">
                  Bal: 0{" "}
                  <span className="ml-2 text-cyan-400 cursor-pointer w-[46px] h-[23px] text-[10px] rounded-[12px] bg-[#33C5E014] border border-[#33C5E03D] py-[4px] px-[12px]">
                    MAX
                  </span>
                </span>
              </span>
              <div className="flex items-center justify-between bg-transparent rounded-xl py-3 mt-2">
                <div className="flex items-center gap-2 bg-[#1C252A] p-[12px] rounded-[24px]">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/icons/eth.svg"
                      alt="ETH"
                      width={20}
                      height={20}
                    />
                    <span className="text-[#FCFFFF] font-medium">ETH</span>
                  </div>
                  <Image
                    src="/assets/icons/dropdown.svg"
                    alt="dropdown icon"
                    width={11.5}
                    height={11.5}
                    className="inline-block"
                  />
                </div>
                <span className="text-2xl text-[#92A5A8] font-semibold text-[32px]">
                  $&nbsp;0.00
                </span>
              </div>
              <div className="flex items-end justify-end">
                <span className="text-[#92A5A8] text-xs mr-[1rem]">
                  ≈ $0.00
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-2 absolute right-[50%] top-[10rem]">
            <div className="bg-[#232B36] rounded-full p-2 flex items-center justify-center">
              <Image
                src="/assets/icons/swap.svg"
                alt="swap"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="bg-[#182024] p-[24px] rounded-[24px]">
            <div>
              <span className="text-[#92A5A8] text-[13px] flex items-center justify-between">
                <span> Swap To:</span>
                <span className="text-[#92A5A8] text-xs">
                  Bal: 0
                </span>
              </span>
              <div className="flex items-center justify-between bg-transparent rounded-xl py-3 mt-2">
                <div className="flex items-center gap-2 bg-[#1C252A] p-[12px] rounded-[24px]">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/icons/usdc.svg"
                      alt="ETH"
                      width={20}
                      height={20}
                    />
                    <span className="text-[#FCFFFF] font-medium">USDC</span>
                  </div>
                  <Image
                    src="/assets/icons/dropdown.svg"
                    alt="dropdown icon"
                    width={11.5}
                    height={11.5}
                    className="inline-block"
                  />
                </div>
                <span className="text-2xl text-[#92A5A8] font-semibold text-[32px]">
                  $&nbsp;0.00
                </span>
              </div>
              <div className="flex items-end justify-end">
                <span className="text-[#92A5A8] text-xs mr-[1rem]">
                  ≈ $0.00
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-2 mb-4">
            <span className="text-[#92A5A8] font-normal text-xs">Gas Fee: $0.00</span>
          </div>
          <button className="w-full py-3 rounded-full bg-[#232B36] text-[#33C5E0] font-medium text-[14px] flex items-center justify-center gap-2 mt-2">
            <Image
              src="/assets/icons/swap_cyan.svg"
              alt="swap"
              width={20}
              height={20}
            />
            SWAP ASSET
          </button>
        </div>
        {/* Asset Rate Slippage */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-[#33C5E014] border border-[#33C5E014] rounded-t-2xl py-3 px-6 text-center text-[#33C5E0] font-medium text-[14px] tracking-wide">
            ASSET RATE SLIPPAGE
          </div>
          <div className="flex gap-4 justify-between bg-transparent rounded-b-2xl p-4">
            {[0.24, 0.24, -0.24].map((rate, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-between gap-2 bg-[#182024] rounded-[16px] py-[20px] px-[16px] min-h-[118px] min-w-[180px]"
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
            You Will Receive At Least 1790 USDC (If The Price Doesn't Move More
            Than 0.5%).
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="mt-8">
        <h3 className="text-[#BFC6C8] text-[15px] font-medium mb-4">
          Recent transactions
        </h3>
        <div className="flex flex-col bg-[#182024] rounded-[24px] py-[64px] px-[24px] min-h-[220px] items-center justify-center flex-1">
          <span className="text-[#FCFFFF] mb-2 text-center text-[18px] font-normal">
            You don’t have an activity record yet.
          </span>
          <span className="text-[#99A9A2] text-[12px] font-normal mb-8 text-center">
            Swap assets and add to a plan to see your transaction history
          </span>
          <button className="flex items-center gap-2 w-fit text-[14px] px-6 py-3 font-medium rounded-[24px] border border-[#33C5E03D] bg-[#33C5E014] text-[#33C5E0] hover:bg-cyan-900/30 transition-colors">
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
    </main>
  );
};

export default SwapPage;
