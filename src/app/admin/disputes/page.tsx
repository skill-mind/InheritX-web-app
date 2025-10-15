"use client";

import React, { useState } from "react";
import Image from "next/image";
import DisputeModal, { DisputeTicket } from "./DisputeModal";

const ACCENT = "#33C5E0";
const BG = "#182024";
const PRIORITY_COLORS = {
  HIGH: "text-[#F87171]",
  MEDIUM: "text-yellow-400",
  LOW: "text-green-400",
};
const STATUS_COLORS = {
  OPEN: "bg-[#232e36] text-[#BFC6C8] border border-[#232e36]",
  PENDING: "bg-yellow-900/30 text-yellow-300 border border-yellow-700/30",
  RESOLVED: "bg-green-900/30 text-green-300 border border-green-700/30",
  CLOSED: "bg-red-900/30 text-red-300 border border-red-700/30",
};

const mockData = Array.from({ length: 6 }).map(() => ({
  id: `C-402`,
  issue: "Plan Claim Issue",
  plan: "Landed Property Plan",
  user: "Ahmed King",
  priority: "HIGH",
  status: "OPEN",
  timestamp: "Sep 19, 2025",
}));

const summaryCards = [
  { label: "Total Inheritance Plans", value: 0 },
  { label: "Total Claims", value: 0 },
  { label: "Unanswered Support Tickets", value: 0 },
];

const tabs = ["Open", "Pending", "Resolved", "Closed"];

export default function DisputesPage() {
  const [activeTab, setActiveTab] = useState("Open");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<DisputeTicket | null>(null);

  // Filter data by tab (mock only supports open)
  const filtered = mockData.filter((d) => {
    if (activeTab === "Open") return d.status === "OPEN";
    if (activeTab === "Pending") return d.status === "PENDING";
    if (activeTab === "Resolved") return d.status === "RESOLVED";
    if (activeTab === "Closed") return d.status === "CLOSED";
    return true;
  });

  return (
    <main className="min-h-screen w-full bg-transparent flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <section className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <button className="text-slate-300 text-lg mr-2" aria-label="Back">
            <Image
              src="/assets/icons/back.svg"
              alt="back arrow"
              width={20}
              height={20}
            />
          </button>
          <h1 className="text-[#BFC6C8] text-[13px] sm:text-[14px] font-medium">
            SUPPORT TICKETS
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1 text-slate-300 text-sm">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>
        {/* Tabs */}
        <nav className="flex gap-2 border-t border-[#1C252A] mb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-sm cursor-pointer font-normal py-[12px] px-[16px] focus:outline-none transition-all duration-150 select-none
              ${
                activeTab === tab
                  ? "bg-[#1C252A] text-cyan-300 border-b-2 border-[#1C252A] rounded-b-[20px] shadow-[0_0_8px_0_#33C5E0]"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-[#222] hover:shadow-[0_0_8px_0_#33C5E0] active:scale-[0.97]"
              }
            `}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        {/* Table */}
        <div className="bg-[#182024] border-none rounded-[24px] p-[8px] md:p-[24px] backdrop-blur-md shadow-sm border overflow-x-auto">
          <table className="min-w-full w-full text-left">
            <thead>
              <tr className="text-[#92A5A8] text-[14px] font-normal">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">User/Plan Involved</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 hidden md:table-cell">Status</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-2 text-right"> </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr key={idx} className="border-b border-white/10 last:border-b-0 transition-all duration-150 cursor-pointer hover:bg-[#1C252A] hover:shadow-[0_0_8px_0_#33C5E0] active:scale-[0.99]">
                  <td className="py-3 px-4 text-[#FCFFFF] text-sm font-normal">
                    {idx + 1}. {row.id}
                    <div className="text-[#92A5A8] text-xs">{row.issue}</div>
                  </td>
                  <td className="py-3 px-4 text-[#FCFFFF] text-sm">
                    {row.plan}
                    <div className="text-[#92A5A8] text-xs flex items-center gap-1">
                      {row.user}
                      <Image
                        src="/assets/icons/file.svg"
                        alt="doc"
                        width={16}
                        height={16}
                        className="cursor-pointer hover:scale-110 transition-all duration-150"
                      />
                    </div>
                  </td>
                  <td className={`py-3 px-4 font-semibold text-xs`}>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 cursor-default inline-block ${STATUS_COLORS[row.status?.toUpperCase() as keyof typeof STATUS_COLORS] || ''} ${PRIORITY_COLORS[row.priority?.toUpperCase() as keyof typeof PRIORITY_COLORS] || ''}`}
                    >
                      {row.priority}
                    </span>
                  </td>
                  {/* Status column: hidden on mobile */}
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 cursor-default`}
                    >
                      {row.status}
                    </span>
                  </td>
                  {/* Action column: desktop shows button, mobile shows More icon */}
                  <td className="py-3 px-4">
                    <button
                      className="px-4 py-2 rounded-[24px] text-[12px] font-semibold transition-all duration-150 cursor-pointer hover:shadow-[0_0_8px_0_#33C5E0] hover:bg-[#33C5E0] hover:text-[#161E22] active:scale-[0.98] hidden md:inline-block"
                      style={{ background: ACCENT, color: BG }}
                      onClick={() => { setSelectedTicket(row); setModalOpen(true); }}
                    >
                      RESOLVE DISPUTE
                    </button>
                    <button
                      className="text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer flex md:hidden items-center justify-center w-8 h-8 rounded-full hover:bg-[#232B2F]"
                      aria-label="More actions"
                      onClick={() => { setSelectedTicket(row); setModalOpen(true); }}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="5" cy="12" r="2" fill="currentColor" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                        <circle cx="19" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </button>
                  </td>
                  {/* Empty cell for spacing/alignment */}
                  <td className="py-3 px-2 text-right"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Sidebar summary cards */}
      <aside className="w-full lg:w-64 hidden lg:flex flex-row items-end lg:flex-col gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="bg-[#182024] w-[200px] h-[132px] backdrop-blur-md rounded-[8px] border border-none py-[32px] px-[20px] flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:shadow-[0_0_16px_0_#33C5E0] hover:bg-[#1C252A] active:scale-[0.98]"
          >
            <div className="text-4xl font-semibold text-[#FCFFFF] mb-2">
              {card.value}
            </div>
            <div className="text-[#92A5A8] text-center text-[12px] font-normal">
              {card.label}
            </div>
          </div>
        ))}
      </aside>
      {/* Dispute Modal */}
      <DisputeModal open={modalOpen} ticket={selectedTicket} onClose={() => setModalOpen(false)} />
    </main>
  );
}
