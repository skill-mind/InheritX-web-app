"use client";

import React, { useState } from "react";
import Image from "next/image";

const tabs = ["Claims", "Activities"];

const activities = [
  {
    activity: "Plan #001 Created (3 Beneficiaries, Inactivity Trigger Set)",
    timestamp: "12th August, 2025",
  },
  {
    activity: "Guardian Added To Plan #002",
    timestamp: "12th August, 2025",
  },
  {
    activity: "Plan #001 Status Changed To Active",
    timestamp: "12th August, 2025",
  },
  {
    activity: "1 NFC Converted",
    timestamp: "12th August, 2025",
  },
];

const ClaimPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="flex flex-col gap-6 p-2 md:p-8 w-full">
      <section className="">
        <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
          Claim Plan
        </h2>
        <p className="text-[12px] md:text-[14px] text-[#92A5A8]">
          Claim your inheritance plan
        </p>
      </section>
      <section className="bg-transparent p-0 md:p-2 flex flex-col gap-4">
        <div className="flex flex-row md:items-center justify-between gap-2 mb-2 border-t border-t-[#1C252A]">
          <div className="flex gap-2 w-full md:w-auto">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-1 text-sm cursor-pointer font-medium transition-colors focus:outline-none whitespace-nowrap ${
                  activeTab === idx
                    ? "text-cyan-400 bg-[#1C252A] py-[12px] rounded-b-[24px] px-[18px] h-[48px] flex items-center"
                    : "text-[#BFC6C8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center text-[12px] font-normal gap-1 text-[#92A5A8] hover:underline w-fit md:w-auto">
            <Image
              src="/assets/icons/filter.svg"
              alt="filter icon"
              width={14}
              height={14}
              className="inline-block"
            />
            <span> Filter</span>
          </button>
        </div>
        {activeTab === 0 ? (
          <div className="flex flex-col bg-[#182024] rounded-[24px] py-[16px] md:py-[32px] px-[6px] xs:px-[8px] sm:px-[12px] md:px-[24px] min-h-[224px] items-center justify-center flex-1 w-full overflow-x-auto">
            <div className="w-full">
              <table className="w-full min-w-[600px] md:min-w-[800px]">
                <thead>
                  <tr className="text-left text-[#92A5A8] text-[12px] md:text-[14px] font-normal">
                    <th className="py-3 px-2">Plan Name/ ID</th>
                    <th className="py-3 px-2">Assets</th>
                    <th className="py-3 px-2">Beneficiary</th>
                    <th className="py-3 px-2">Trigger</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#232B36] text-[#FCFFFF] text-[12px] md:text-[14px]">
                    <td className="py-4 px-2">
                      <div className="flex flex-col">
                        <span className="font-normal text-[12px] md:text-[14px]">
                          Plan Name
                        </span>
                        <span className="text-[#92A5A8] text-[10px]">
                          Unique ID
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">2 ETH</td>
                    <td className="py-4 px-2">3</td>
                    <td className="py-4 px-2">
                      <span className="bg-[#2A3338] w-fit h-[26px] flex items-center justify-center text-[#BFC6C8] text-[10px] md:text-[12px] px-3 py-1 rounded-full border border-[#39494F]">
                        INACTIVITY (6 MONTHS)
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="bg-[#33C5E014] border border-[#33C5E03D] rounded-[24px] text-cyan-400 text-[10px] md:text-[12px] px-3 py-1">
                        ACTIVE
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <button className="w-full text-[12px] md:w-[160px] py-2 rounded-full bg-[#33C5E0] text-[#161E22] font-semibold hover:bg-cyan-400 transition-colors">
                        CLAIM PLAN
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col bg-[#182024] rounded-[24px] py-[32px] px-[6px] xs:px-[8px] sm:px-[12px] md:px-[24px] min-h-[224px] w-full overflow-x-auto">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[400px] md:min-w-[600px]">
                <thead>
                  <tr className="text-left text-[#92A5A8] text-[12px] md:text-[14px] font-normal">
                    <th className="py-3 px-2">Activity</th>
                    <th className="py-3 px-2">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((item, idx) => (
                    <tr key={idx} className="border-none text-[#FCFFFF] text-[12px] md:text-[14px]">
                      <td className="py-4 px-2">
                        <span className="text-[12px] md:text-[14px]">{idx + 1}. {item.activity}</span>
                      </td>
                      <td className="py-4 px-2 text-[#92A5A8] text-[11px] md:text-[13px]">{item.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ClaimPage;
