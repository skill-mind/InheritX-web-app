import React from "react";
import Image from "next/image";

const summaryCards = [
  {
    label: "Total Portfolio Value",
    value: 0,
    sub: "No Asset Count Yet",
    action: null,
  },
  {
    label: "Tokens Count",
    value: 0,
    sub: "No Asset Count Yet",
    action: null,
  },
  {
    label: "NFT Count",
    value: 0,
    sub: "No Asset Count Yet",
    action: null,
  },
  {
    label: "Recent Swaps",
    value: 0,
    sub: "This Month",
    action: (
      <button className="flex items-center gap-1 rounded-full border border-[#232B36] bg-[#232B36] px-3 py-1 text-[13px] text-[#BFC6C8]">
        This Month
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path
            d="M8 10l4 4 4-4"
            stroke="#BFC6C8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ),
  },
];

const PortfolioPage = () => {
  return (
    <main className="flex w-full flex-col gap-6 p-4 md:p-8">
      <section className="mb-2">
        <h2 className="mb-1 text-lg font-medium text-[#FCFFFF] md:text-2xl">
          Portfolio
        </h2>
        <p className="text-[12px] text-[#92A5A8] font-normal md:text-[14px]">
          This is the stats of your assets so far
        </p>
      </section>
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="min-w-[220px] flex flex-col items-center rounded-xl bg-[#182024] p-6 shadow-md"
          >
            <span className="mb-2 text-3xl font-bold text-white md:text-4xl">
              {card.value}
            </span>
            <span className="mb-4 text-[12px] font-normal text-center text-[#92A5A8]">
              {card.label}
            </span>
            {card.action ? (
              card.action
            ) : (
              <span className="w-full rounded-[24px] py-[14px] px-[20px] border border-[#232B36] bg-[#232B36] text-center text-[12px] text-[#92A5A8]">
                {card.sub}
              </span>
            )}
          </div>
        ))}
      </section>
      <section className="mb-2">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[#FCFFFF] text-[14px] font-medium">
            CHART & INSIGHTS
          </span>
          <button className="flex items-center gap-1 border-none bg-transparent outline-none">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M19 9l-7 7-7-7"
                stroke="#BFC6C8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 min-h-[220px] rounded-[24px] bg-[#182024] py-[64px] px-[24px]">
          <span className="mb-2 text-center text-[18px] font-normal text-[#FCFFFF]">
            No assets found.
          </span>
          <span className="mb-8 text-center text-[12px] font-normal text-[#99A9A2]">
            Connect your wallet or add assets to get started.
          </span>
          <button className="flex items-center gap-2 rounded-[24px] border border-[#33C5E03D] bg-[#33C5E014] px-6 py-3 text-[14px] font-medium text-[#33C5E0] hover:bg-cyan-900/30 transition-colors">
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
      </section>
    </main>
  );
};

export default PortfolioPage;
