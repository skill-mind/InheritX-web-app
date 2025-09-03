"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const summaryCards = [
  {
    label: "Total Portfolio Value",
    value: 8,
    sub: "24% ",
    subRight: "(24h/7d)",
    subIcon: <span className="text-[#0DA314] ml-1">↑</span>,
  },
  {
    label: "Tokens Count",
    value: 12,
    sub: "12 Assets Across",
    subRight: "4 Chains",
  },
  {
    label: "NFTs Count",
    value: 5,
    sub: "",
    avatars: [
      "/assets/icons/nft1.svg",
      "/assets/icons/nft2.svg",
      "/assets/icons/nft3.svg",
      "/assets/icons/nft4.svg",
    ],
  },
  {
    label: "Recent Swaps",
    value: "+ $1,250",
    sub: "This Month",
    subRight: "⌄",
  },
];

const lineData = {
  labels: ["0", "1", "2", "3", "4", "5", "6", "7"],
  datasets: [
    {
      label: "Value",
      data: [50, 80, 65, 70, 85, 20, 30, 80],
      borderColor: "#33C5E0",
      backgroundColor: "#33C5E0",
      tension: 0.4,
      pointBackgroundColor: "#33C5E0",
      pointBorderColor: "#161E22",
      pointRadius: 5,
      fill: false,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { color: "#222C32" },
      ticks: { color: "#92A5A8" },
    },
    y: {
      grid: { color: "#222C32" },
      ticks: { color: "#92A5A8" },
      min: 0,
      max: 100,
    },
  },
};

const doughnutData = {
  labels: ["ETH", "NFTs", "Real World Asset"],
  datasets: [
    {
      data: [10, 30, 60],
      backgroundColor: ["#F87171", "#A78BFA", "#FDBA74"],
      borderWidth: 0,
    },
  ],
};

const doughnutOptions = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
};

const assetTable = [
  {
    asset: "ETH",
    icon: "/assets/icons/eth.svg",
    balance: 2.45,
    price: "$3,200",
    value: "$7,840",
  },
  {
    asset: "ETH",
    icon: "/assets/icons/eth.svg",
    balance: 2.45,
    price: "$3,200",
    value: "$7,840",
  },
  {
    asset: "ETH",
    icon: "/assets/icons/eth.svg",
    balance: 2.45,
    price: "$3,200",
    value: "$7,840",
  },
  {
    asset: "ETH",
    icon: "/assets/icons/eth.svg",
    balance: 2.45,
    price: "$3,200",
    value: "$7,840",
  },
];

const PortfolioPage = () => {
  const [hasData] = useState(true); // Toggle to false to see empty state
  const [activeRange, setActiveRange] = useState("1H");
  const ranges = ["1H", "1D", "1W", "1M", "1Y"];

  return (
    <main className="flex w-full flex-col gap-6 p-4 md:p-8 max-w-full overflow-x-hidden">
      <section className="mb-2 w-full max-w-full">
        <h2 className="mb-1 text-lg font-medium text-[#FCFFFF] md:text-2xl">
          Portfolio
        </h2>
        <p className="text-[12px] text-[#92A5A8] font-normal md:text-[14px]">
          This is the stats of your assets so far
        </p>
      </section>
      {/* Stat Cards */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-full">
        {summaryCards.map((card, idx) => (
          <div
            key={card.label}
            className="md:min-w-[220px] w-full flex flex-col items-center rounded-xl bg-[#182024] p-6 shadow-md max-w-full"
          >
            <span className="mb-2 text-3xl font-bold text-white md:text-4xl">
              {card.value}
            </span>
            <span className="mb-4 text-[12px] font-normal text-center text-[#92A5A8]">
              {card.label}
            </span>
            {/* Card content rendering logic */}
            {card.avatars ? (
              <div className="flex items-center gap-1 w-full justify-center mb-2">
                {card.avatars.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="rounded-full border-2 border-[#232B36] bg-[#232B36]"
                  />
                ))}
                {card.label === "NFTs Count" && (
                  <span className="ml-2 text-[#BFC6C8] text-[13px]">-</span>
                )}
              </div>
            ) : null}
            {card.subRight ? (
              <div className="flex w-full justify-between items-center mt-2 bg-[#1C252A] h-[60px] rounded-[24px] border border-[#2A3338] py-[14px] px-[20px]">
                <span className="text-[#0DA314] text-[12px] font-normal flex items-center">
                  {card.sub} {card.subIcon}
                </span>
                <span
                  className={`text-[#33C5E0] text-[12px] font-semibold ${
                    card.subRight === "4 Chains" ? "border border-[#33C5E0] rounded-[16px] px-3 py-1 ml-2" : ""
                  }`}
                >
                  {card.subRight}
                </span>
              </div>
            ) : (
              <span className="w-full rounded-[24px] py-[14px] px-[20px] border border-[#232B36] bg-[#232B36] text-center text-[12px] text-[#92A5A8]">
                {card.sub}
              </span>
            )}
          </div>
        ))}
      </section>
      {/* Chart & Insights */}
      <section className="mb-8 w-full max-w-full">
        <h2 className="text-[#FCFFFF] text-[14px] font-medium mb-[1.5rem] border-b border-b-[#33C5E014] pb-2">
          CHART & INSIGHTS
        </h2>
        <div className="bg-[#182024] rounded-[24px] p-4 sm:p-6 min-h-[260px] flex flex-col lg:flex-row gap-8 w-full max-w-full overflow-x-auto">
          {/* Line Chart */}
          <div className="flex-1 min-w-0 w-full max-w-full">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[#92A5A8] text-[13px]">(Value)</span>
              <div className="flex gap-2 ml-auto">
                {ranges.map((r) => (
                  <button
                    key={r}
                    className={`text-[12px] px-3 py-1 rounded-full border transition-all duration-150 ${
                      activeRange === r
                        ? "bg-[#161E22] text-[#33C5E0] border-[#33C5E0]"
                        : "bg-transparent text-[#92A5A8] border-[#222C32]"
                    }`}
                    onClick={() => setActiveRange(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full h-[220px]">
              <Line data={lineData} options={lineOptions} />
            </div>
            <div className="flex justify-between mt-2 text-[#92A5A8] text-[12px]">
              <span>(Days)</span>
              <span></span>
            </div>
          </div>
          {/* Doughnut Chart */}
          <div className="flex-1 max-w-[340px] mx-auto flex flex-col items-center w-full">
            <h3 className="text-[#FCFFFF] text-[14px] font-medium mb-2 text-center">
              Total asset pool value
            </h3>
            <span className="text-[#92A5A8] text-[12px] mb-2 text-center">
              Sum Of All Asset Values
            </span>
            <div className="w-[180px] h-[180px] mx-auto">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#F87171]"></span>
                <span className="text-[#BFC6C8] text-[12px]">ETH</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#A78BFA]"></span>
                <span className="text-[#BFC6C8] text-[12px]">NFTs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#FDBA74]"></span>
                <span className="text-[#BFC6C8] text-[12px]">Real World Asset</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Asset Table */}
      <section className="w-full max-w-full">
        <h2 className="text-[#FCFFFF] text-[14px] font-medium mb-[1.5rem] border-b border-b-[#33C5E014] pb-2">
          ASSET TABLE
        </h2>
        <div className="bg-[#182024] w-full rounded-[24px] p-2 sm:p-6 min-h-[220px] flex flex-col mb-8 overflow-x-auto max-w-full">
          <table className="w-full min-w-[340px] sm:min-w-[600px] text-left max-w-full">
            <thead>
              <tr className="text-[#92A5A8] text-[13px] font-normal border-b border-[#1C252A]">
                <th className="py-2 sm:py-3 px-1 sm:px-2">Assets</th>
                <th className="py-2 sm:py-3 px-1 sm:px-2">Balance</th>
                <th className="py-2 sm:py-3 px-1 sm:px-2">Value</th>
                <th className="py-2 sm:py-3 px-1 sm:px-2">Action</th>
                <th className="hidden sm:table-cell py-2 sm:py-3 px-1 sm:px-2">Price ($ USD)</th>
              </tr>
            </thead>
            <tbody>
              {assetTable.map((row, idx) => {
                const [showActions, setShowActions] = useState(false);
                return (
                  <tr
                    key={idx}
                    className="border-b border-[#1C252A] text-[#FCFFFF] text-[13px] sm:text-[14px]"
                  >
                    <td className="py-3 sm:py-4 px-1 sm:px-2 font-normal flex items-center gap-2 min-w-[120px]">
                      <span className="text-[#425558] text-[13px] sm:text-[14px] w-4 inline-block">
                        {idx + 1}.
                      </span>
                      <Image src={row.icon} alt={row.asset} width={24} height={24} />
                      {row.asset}
                    </td>
                    <td className="py-3 sm:py-4 px-1 sm:px-2 min-w-[80px]">{row.balance}</td>
                    <td className="py-3 sm:py-4 px-1 sm:px-2 min-w-[100px]">{row.value}</td>
                    {/* Action column: mobile shows more icon, desktop shows buttons */}
                    <td className="py-3 sm:py-4 px-1 sm:px-2 min-w-[60px] relative">
                      {/* Mobile: show more icon, on click show actions */}
                      <div className="flex sm:hidden items-center justify-center">
                        <button
                          aria-label="Show actions"
                          onClick={() => setShowActions((v) => !v)}
                          className="p-2 rounded-full hover:bg-[#232B2F] focus:outline-none"
                        >
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="5" r="1.5" fill="#BFC6C8" />
                            <circle cx="12" cy="12" r="1.5" fill="#BFC6C8" />
                            <circle cx="12" cy="19" r="1.5" fill="#BFC6C8" />
                          </svg>
                        </button>
                        {showActions && (
                          <div className="absolute z-10 top-10 right-0 bg-[#232B2F] border border-[#425558] rounded-xl shadow-lg flex flex-col w-36 animate-fade-in">
                            <button className="bg-[#33C5E0] text-[#161E22] px-4 py-2 rounded-t-xl text-[12px] font-semibold hover:bg-cyan-400 w-full text-left">
                              SWAP
                            </button>
                            <button className="bg-[#232B2F] border-t border-[#425558] text-[#BFC6C8] px-4 py-2 rounded-b-xl text-[12px] font-medium hover:bg-[#232B2F]/80 w-full text-left">
                              ADD TO PLAN
                            </button>
                          </div>
                        )}
                      </div>
                      {/* Desktop: show buttons inline */}
                      <div className="hidden sm:flex gap-2">
                        <button className="bg-[#33C5E0] text-[#161E22] px-4 sm:px-5 py-2 rounded-[16px] text-[12px] font-semibold hover:bg-cyan-400 w-full sm:w-auto">
                          SWAP
                        </button>
                        <button className="bg-[#232B2F] border border-[#425558] text-[#BFC6C8] px-4 sm:px-5 py-2 rounded-[16px] text-[12px] font-medium hover:bg-[#232B2F]/80 w-full sm:w-auto">
                          ADD TO PLAN
                        </button>
                      </div>
                    </td>
                    {/* Price column: only show on desktop */}
                    <td className="hidden sm:table-cell py-3 sm:py-4 px-1 sm:px-2 min-w-[100px]">{row.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
