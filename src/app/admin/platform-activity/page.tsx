"use client";

import React, { useState } from "react";
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

const stats = [
  {
    label: "Total Plans Created",
    value: "8.6k",
    sub: "24% ",
    subRight: "(24h/7d)",
    subIcon: <span className="text-[#0DA314] ml-1">↑</span>,
  },
  {
    label: "Total Dispute Resolved",
    value: "3.12k",
    sub: "12 New Disputes",
    subRight: "Opened",
  },
  {
    label: "KYC Count",
    value: "9.3k",
    sub: "12 New Requests",
    subRight: "Created",
  },
  {
    label: "Swaps Done",
    value: "104.7k",
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
  labels: ["ETH", "STRK", "Real World Asset"],
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

const Page = () => {
  const [hasData] = useState(true); // Toggle to false to see empty state
  const [activeRange, setActiveRange] = useState("1H");
  const ranges = ["1H", "1D", "1W", "1M", "1Y"];

  return (
    <section className="w-full px-2 sm:px-4 md:px-8 lg:px-0 mb-[10rem]">
      <h1 className="text-[20px] sm:text-[24px] font-medium mb-2 mt-6 text-[#FCFFFF]">
        Good morning, EBUBE
      </h1>
      <p className="text-[#92A5A8] text-[13px] sm:text-[14px] font-normal mb-6">
        Monitor, protect, and manage the platform.
      </p>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#182024] w-full rounded-[24px] py-8 px-4 flex flex-col gap-2 items-center justify-center min-h-[140px] shadow-sm transition-all duration-200 cursor-pointer hover:shadow-[0_0_16px_0_#33C5E0] hover:bg-[#1C252A] active:scale-[0.98]"
          >
            <span className="text-[32px] sm:text-[36px] font-semibold text-[#FCFFFF]">
              {stat.value}
            </span>
            <span className="text-[#92A5A8] text-[13px] sm:text-[14px] font-normal text-center mb-2">
              {stat.label}
            </span>
            <div className="flex w-full justify-between items-center mt-2 bg-[#1C252A] h-[60px] rounded-[24px] border border-[#2A3338] py-[14px] px-[20px] transition-all duration-150 cursor-pointer hover:border-[#33C5E0] hover:bg-[#222] active:scale-[0.98]">
              <span className="text-[#0DA314] text-[12px] font-normal flex items-center">
                {stat.sub} {stat.subIcon}
              </span>
              <span
                className={`text-[#33C5E0] text-[12px] font-semibold ${
                  stat.subRight === "Opened"
                    ? "border border-[#33C5E0] rounded-[16px] px-3 py-1 ml-2 bg-[#161E22] cursor-pointer hover:bg-[#33C5E0] hover:text-[#161E22] transition-all duration-150"
                    : ""
                }`}
              >
                {stat.subRight}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Chart & Insights */}
      <h2 className="text-[#FCFFFF] text-[14px] font-medium mb-[1.5rem] border-b border-b-[#33C5E014] pb-2">
        CHART & INSIGHTS
      </h2>
      <div className="bg-[#182024] rounded-[24px] p-6 min-h-[260px] flex flex-col mb-8">
        {hasData ? (
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Line Chart */}
            <div className="flex-1 min-w-[220px]">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[#92A5A8] text-[13px]">(Value)</span>
                <div className="flex gap-2 ml-auto">
                  {ranges.map((r) => (
                    <button
                      key={r}
                      className={`text-[12px] px-3 py-1 rounded-full border transition-all duration-150 cursor-pointer select-none
                        ${
                          activeRange === r
                            ? "bg-[#161E22] text-[#33C5E0] border-[#33C5E0] shadow-[0_0_8px_0_#33C5E0]"
                            : "bg-transparent text-[#92A5A8] border-[#222C32] hover:text-[#33C5E0] hover:border-[#33C5E0] hover:bg-[#222] active:scale-[0.97]"
                        }
                      `}
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
            <div className="flex-1 max-w-[340px] mx-auto flex flex-col items-center">
              <h3 className="text-[#FCFFFF] text-[14px] font-medium mb-2 text-center">
                Total asset pool value
              </h3>
              <span className="text-[#92A5A8] text-[12px] mb-2 text-center">
                Sum Of All Asset Values
              </span>
              <div className="w-[180px] h-[180px] mx-auto transition-all duration-200 cursor-pointer hover:scale-[1.04] active:scale-[0.98]">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-150">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#F87171]"></span>
                  <span className="text-[#BFC6C8] text-[12px]">ETH</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-150">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#A78BFA]"></span>
                  <span className="text-[#BFC6C8] text-[12px]">STRK</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-150">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#FDBA74]"></span>
                  <span className="text-[#BFC6C8] text-[12px]">
                    Real World Asset
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center min-h-[180px]">
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-[#FCFFFF] text-[16px] font-medium mb-2 text-center">
                No activity record yet
              </span>
              <span className="text-[#99A9A2] text-[12px] font-normal text-center">
                When people start using InheritX, charts will appear
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
