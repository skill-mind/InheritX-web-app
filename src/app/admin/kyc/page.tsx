"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import KYCVerificationModal from "../components/KYCVerificationModal";

const ACCENT = "#33C5E0";
const BG = "#182024";
type Status = "pending" | "approved" | "rejected";

const STATUS_COLORS: Record<Status, string> = {
  pending: "bg-[#1C2518] text-[12px] text-[#B9B604] border border-[#2E3513]",
  approved: "bg-green-900/30 text-green-300 border border-green-700/30",
  rejected: "bg-red-900/30 text-red-300 border border-red-700/30",
};

const mockData: {
  id: number;
  username: string;
  verificationType: string;
  status: Status;
  timestamp: string;
}[] = [
  {
    id: 1,
    username: "Dolly Creed",
    verificationType: "Biometric",
    status: "pending",
    timestamp: "Aug 12",
  },
  {
    id: 2,
    username: "Liam Carter",
    verificationType: "Document",
    status: "approved",
    timestamp: "Aug 10",
  },
  {
    id: 3,
    username: "Sophia Rossi",
    verificationType: "Biometric",
    status: "rejected",
    timestamp: "Aug 09",
  },
  {
    id: 4,
    username: "Noah Patel",
    verificationType: "Document",
    status: "pending",
    timestamp: "Aug 11",
  },
  {
    id: 5,
    username: "Maya Okoye",
    verificationType: "Biometric",
    status: "approved",
    timestamp: "Aug 08",
  },
  {
    id: 6,
    username: "Lucas Silva",
    verificationType: "Document",
    status: "rejected",
    timestamp: "Aug 07",
  },
  {
    id: 7,
    username: "Ethan Kim",
    verificationType: "Biometric",
    status: "pending",
    timestamp: "Aug 13",
  },
  {
    id: 8,
    username: "Ava Morgan",
    verificationType: "Document",
    status: "approved",
    timestamp: "Aug 06",
  },
  {
    id: 9,
    username: "Dolly Creed",
    verificationType: "Biometric",
    status: "rejected",
    timestamp: "Aug 05",
  },
  {
    id: 10,
    username: "Liam Carter",
    verificationType: "Document",
    status: "pending",
    timestamp: "Aug 14",
  },
];

const summaryCards = [
  { label: "Total Inheritance Plans", value: 0 },
  { label: "Total Claims", value: 0 },
  { label: "Unanswered Support Tickets", value: 0 },
];

const tabs = ["Pending", "Rejected", "Approved"];

export default function KycAdminPage() {
  const [activeTab, setActiveTab] = useState("Pending");
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<{
    id: number;
    username: string;
    verificationType: string;
    status: Status;
    timestamp: string;
  } | null>(null);

  // Helper to map row to modal user prop
  function getModalUser(row: typeof mockData[0] | null) {
    if (!row) return null;
    return {
      fullName: row.username + " Smith", // dummy full name
      username: row.username,
      email: row.username.replace(/\s+/g, "").toLowerCase() + "@example.com",
      dateSubmitted: row.timestamp,
      verificationType: row.verificationType,
      status: row.status,
      documents: [
        { src: "/assets/images/beneficiary1.svg", label: "ID Front" },
        { src: "/assets/images/beneficiary2.svg", label: "ID Back" },
        { src: "/assets/images/beneficiary_main.png", label: "Selfie" },
      ],
      activityHistory: [
        { text: "Submitted KYC", date: row.timestamp },
        { text: "Document Uploaded", date: row.timestamp },
      ],
      notes: "No additional notes."
    };
  }

  // Filter data by tab (mock only supports pending)
  const filtered = mockData.filter((d) => {
    if (activeTab === "Pending") return d.status === "pending";
    if (activeTab === "Rejected") return d.status === "rejected";
    if (activeTab === "Approved") return d.status === "approved";
    return true;
  });

  return (
    <main className="min-h-screen w-full flex flex-col justify-between lg:flex-row gap-6">
      {/* Main content */}
      <section className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <button
            className="text-slate-300 text-lg mr-2"
            aria-label="Back"
            onClick={() => router.push("/admin/dashboard")}
          >
            <Image
              src="/assets/icons/back.svg"
              alt="back arrow"
              width={20}
              height={20}
            />
          </button>
          <h1 className="text-[#BFC6C8] text-[13px] sm:text-[14px] font-medium">
            APPROVE KYC REQUESTS
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
              className={`text-sm cursor-pointer font-normal py-[12px] px-[16px] focus:outline-none transition-all ${
                activeTab === tab
                  ? "bg-[#1C252A] text-cyan-300 border-b-2 border-[#1C252A] rounded-b-[20px]"
                  : "text-slate-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        {/* Table */}
        <div className="bg-[#182024] border-none rounded-[24px] p-[8px] md:p-[24px] backdrop-blur-md shadow-sm border overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-[#92A5A8] text-[14px] font-normal">
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Verification Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-2 text-right"> </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr
                  key={row.id}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="py-3 px-4 text-[#FCFFFF] text-sm font-normal">
                    {idx + 1}. {row.username}
                  </td>
                  <td className="py-3 px-4 text-[#FCFFFF] text-sm">
                    {row.verificationType}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        STATUS_COLORS[row.status]
                      }`}
                    >
                      {row.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#FCFFFF] font-normal text-sm">
                    {row.timestamp}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-[24px] text-[12px] font-semibold bg-[#33C5E014] text-[#BFC6C8] border border-[#33C5E03D] hover:bg-[#2a3a44] transition">
                        REJECT
                      </button>
                      <button
                        className="px-4 py-2 rounded-[24px] text-[12px] font-semibold"
                        style={{ background: ACCENT, color: BG }}
                        onClick={() => { setSelectedRow(row); setModalOpen(true); }}
                      >
                        APPROVE
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button className="text-slate-400 hover:text-white">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Sidebar summary cards */}
      <aside className="w-full lg:w-64 flex flex-row items-end lg:flex-col gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className=" bg-[#182024] w-[200px] h-[132px] backdrop-blur-md rounded-[8px] border border-none py-[32px] px-[20px] flex flex-col items-center justify-center "
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
      {/* KYC Verification Modal */}
      {modalOpen && getModalUser(selectedRow) && (
        <KYCVerificationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onApprove={() => setModalOpen(false)}
          onReject={() => setModalOpen(false)}
          user={getModalUser(selectedRow)!}
        />
      )}
    </main>
  );
}
