"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ClaimPlanModal from "./ClaimPlanModal";

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

const summaryCards = [
  {
    label: "Tokens",
    value: 0,
    action: "Withraw Token",
    actionLink: "#",
  },
  {
    label: "NFT",
    value: 0,
    action: "Withraw NFT",
    actionLink: "#",
  },
  {
    label: "Assets",
    value: 0,
    action: "Withraw Asset",
    actionLink: "#",
  },
  {
    label: "Pending Inheritance",
    value: 0,
    action: "View Claims",
    actionLink: "#",
  },
];

const ClaimPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const [showClaimModal, setShowClaimModal] = useState(false);

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
      {/* Summary Cards Section */}
      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="bg-[#182024] w-full h-[212px] rounded-xl py-[32px] px-[20px] flex flex-col items-center shadow-md"
          >
            <span className="text-3xl md:text-4xl font-semibold text-[#FCFFFF] mb-2">
              {card.value}
            </span>
            <span className="text-[12px] text-[#92A5A8] mb-4 text-center">
              {card.label}
            </span>
            <button
              className="w-fit text-[14px] p-[14px] cursor-pointer font-medium rounded-[24px] border border-[#33C5E03D] bg-[#33C5E014] text-[#33C5E0] transition-all duration-200 hover:bg-[#33C5E0] hover:text-[#161E22] hover:scale-105 focus:outline-none"
              onClick={() => {
                if (card.action === "Set Guardian") {
                  router.push("/dashboard/guardian");
                } else if (
                  card.action === "Create Plan" ||
                  card.action === "Total Plans"
                ) {
                  router.push("/dashboard/plans");
                } else if (
                  card.action === "Withraw Asset" ||
                  card.action === "View Claims"
                ) {
                  router.push("/dashboard/claim");
                }
              }}
            >
              <Image
                src="/assets/icons/arrowdown.svg"
                alt="arrowdown icon"
                width={11.5}
                height={11.5}
                className="inline-block mr-4 rotate-[270deg]"
              />
              {card.action}
            </button>
          </div>
        ))}
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
                      <button
                        className="w-full cursor-pointer text-[12px] md:w-[160px] py-2 rounded-full bg-[#33C5E0] text-[#161E22] font-semibold hover:bg-cyan-400 transition-colors"
                        onClick={() => setShowClaimModal(true)}
                      >
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
                    <tr
                      key={idx}
                      className="border-none text-[#FCFFFF] text-[12px] md:text-[14px]"
                    >
                      <td className="py-4 px-2">
                        <span className="text-[12px] md:text-[14px]">
                          {idx + 1}. {item.activity}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-[#92A5A8] text-[11px] md:text-[13px]">
                        {item.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
      <ClaimPlanModal open={showClaimModal} onClose={() => setShowClaimModal(false)} />
    </main>
  );
};

export default ClaimPage;
