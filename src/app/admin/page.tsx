"use client";

import Image from "next/image";
import { useState } from "react";
import UserVerificationTable from "./components/tab/UserVerificationTable";
import RecentActivities from "./components/tab/RecentActivities";
import SupportTicketTable from "./components/tab/SupportTicketTable";
import InheritancePlanTable from "./components/tab/InheritancePlanTable";
import PlatformTransactionTable from "./components/tab/PlatformTransactionTable";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");

  const activities = [
    { id: 1, title: "User Verification", newCount: 2 },
    { id: 2, title: "Support Ticket", newCount: 1 },
    { id: 3, title: "Inheritance Plan", newCount: 0 },
    { id: 4, title: "Platform Transaction", newCount: 5 },
  ];

  // User verification mock data
  const userVerifications = [
    { id: 1, username: "Dolly Creed", type: "Biometric", status: "PENDING", timestamp: "Aug 12" },
    { id: 2, username: "Dolly Creed", type: "Biometric", status: "PENDING", timestamp: "Aug 12" },
    { id: 3, username: "Dolly Creed", type: "Biometric", status: "PENDING", timestamp: "Aug 12" },
    { id: 4, username: "Dolly Creed", type: "Biometric", status: "PENDING", timestamp: "Aug 12" },
  ];

  // Support ticket mock data (simple list)
  const supportTickets = [
    { id: 1, title: "Plan Claim Issue", user: "Ahmed King", status: "OPEN" },
    { id: 2, title: "Plan Claim Issue", user: "Ahmed King", status: "OPEN" },
    { id: 3, title: "Plan Claim Issue", user: "Ahmed King", status: "OPEN" },
    { id: 4, title: "Plan Claim Issue", user: "Ahmed King", status: "OPEN" },
  ];

  // Inheritance plan mock data (detailed table)
  const inheritancePlans = [
    {
      id: 1,
      ticketId: "C-402",
      issue: "Plan Claim Issue",
      plan: "Landed Property",
      user: "Ahmed King",
      priority: "HIGH",
      status: "OPEN",
      docIcon: "/assets/icons/file.svg",
      planId: "P-1001",
      creator: "Ahmed King",
      beneficiaries: ["Dolly Creed"],
      creationDate: "2024-01-01",
      claimDate: "2024-06-01",
    },
    {
      id: 2,
      ticketId: "C-402",
      issue: "Plan Claim Issue",
      plan: "Landed Property",
      user: "Ahmed King",
      priority: "HIGH",
      status: "OPEN",
      docIcon: "/assets/icons/file.svg",
      planId: "P-1002",
      creator: "Ahmed King",
      beneficiaries: ["Dolly Creed"],
      creationDate: "2024-01-02",
      claimDate: "2024-06-02",
    },
    {
      id: 3,
      ticketId: "C-402",
      issue: "Plan Claim Issue",
      plan: "Landed Property",
      user: "Ahmed King",
      priority: "HIGH",
      status: "OPEN",
      docIcon: "/assets/icons/file.svg",
      planId: "P-1003",
      creator: "Ahmed King",
      beneficiaries: ["Dolly Creed"],
      creationDate: "2024-01-03",
      claimDate: "2024-06-03",
    },
    {
      id: 4,
      ticketId: "C-402",
      issue: "Plan Claim Issue",
      plan: "Landed Property",
      user: "Ahmed King",
      priority: "HIGH",
      status: "OPEN",
      docIcon: "/assets/icons/file.svg",
      planId: "P-1004",
      creator: "Ahmed King",
      beneficiaries: ["Dolly Creed"],
      creationDate: "2024-01-04",
      claimDate: "2024-06-04",
    },
  ];

  // Platform transaction mock data
  const platformTransactions = [
    {
      id: 1,
      transactionId: "TXN-982347",
      user: "Chika Obi",
      userId: "U-2045",
      type: "Deposit",
      assetAmount: "500.00",
      asset: "USDT",
      method: "Bank Transfer",
      methodDesc: "Wallet Top-Up",
      status: "PENDING",
      date: "12th Sep, 2026",
    },
    {
      id: 2,
      transactionId: "TXN-982347",
      user: "Chika Obi",
      userId: "U-2045",
      type: "Deposit",
      assetAmount: "500.00",
      asset: "USDT",
      method: "Bank Transfer",
      methodDesc: "Wallet Top-Up",
      status: "PENDING",
      date: "12th Sep, 2026",
    },
    {
      id: 3,
      transactionId: "TXN-982347",
      user: "Chika Obi",
      userId: "U-2045",
      type: "Deposit",
      assetAmount: "500.00",
      asset: "USDT",
      method: "Bank Transfer",
      methodDesc: "Wallet Top-Up",
      status: "PENDING",
      date: "12th Sep, 2026",
    },
    {
      id: 4,
      transactionId: "TXN-982347",
      user: "Chika Obi",
      userId: "U-2045",
      type: "Deposit",
      assetAmount: "500.00",
      asset: "USDT",
      method: "Bank Transfer",
      methodDesc: "Wallet Top-Up",
      status: "PENDING",
      date: "12th Sep, 2026",
    },
  ];

  // Filter activities based on activeTab
  const filteredActivities =
    activeTab === "All"
      ? activities
      : activities.filter((a) =>
          a.title.toLowerCase().includes(activeTab.toLowerCase())
        );

  return (
    <section className="flex items-start gap-4 justify-between">
      <div className="w-[80%]">
        <h1 className="text-[24px] font-medium mb-2">Good morning, EBUBE</h1>
        <p className="text-[#92A5A8] text-[14px] font-normal mb-6">
          Monitor, protect, and manage the platform.
        </p>

        {/* Action buttons */}
        <div className="flex space-x-4 mb-8">
          <button className="bg-[#33C5E0] space-x-4 hover:bg-cyan-600 text-[#161E22] text-[14px] font-medium px-[24px] py-[14px] w-[208px] h-[60px] rounded-[24px]">
            <Image
              src="/assets/icons/arrowup.svg"
              alt="Arrowup Icon"
              width={13.5}
              height={13.5}
              className="inline-block mr-2"
            />
            <span>Approve KYC</span>
          </button>
          <button className="bg-[#33C5E014] space-x-4 hover:bg-cyan-600 hover:text-[#161E22] text-[#33C5E0] text-[14px] font-medium px-[24px] py-[14px] w-[208px] h-[60px] rounded-[24px]">
            <Image
              src="/assets/icons/arrowdown.svg"
              alt="ArrowUp Icon"
              width={13.5}
              height={13.5}
              className="inline-block mr-2 rotate-[270deg]"
            />
            <span>Create Ticket</span>
          </button>
          <button className="bg-[#33C5E014] space-x-4 hover:bg-cyan-600 hover:text-[#161E22] text-[#33C5E0] text-[14px] font-medium px-[24px] py-[14px] w-[208px] h-[60px] rounded-[24px]">
            <Image
              src="/assets/icons/arrowdown.svg"
              alt="Arrowup Icon"
              width={13.5}
              height={13.5}
              className="inline-block mr-2 rotate-[270deg]"
            />
            <span>Assign Dispute</span>
          </button>
        </div>

        {/* Recent Activities */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] text-[#BFC6C8] font-medium">
              RECENT ACTIVITIES
            </h2>
            <h3>
              <Image
                src="/assets/icons/filter.svg"
                alt="filter icon"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
              <span className="text-[#92A5A8] text-[12px] font-normal">
                Filter
              </span>
            </h3>
          </div>
          {/* Tabs */}
          <ul className="flex items-center space-x-6 border-t border-[#1C252A] mt-[.7rem] text-[#BFC6C8] text-[14px] px-6">
            {[
              "All",
              "User Verification",
              "Support Ticket",
              "Inheritance Plan",
              "Platform Transaction",
            ].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer h-[48px] rounded-b-[20px] flex items-center justify-center py-[12px] px-[16px] ${
                  activeTab === tab ? "text-[#33C5E0] bg-[#1C252A] border border-[#1C252A] font-semibold" : ""
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
          {/* Tab Content */}
          {activeTab === "User Verification" ? (
            <UserVerificationTable users={userVerifications} />
          ) : activeTab === "Support Ticket" ? (
            <SupportTicketTable tickets={inheritancePlans} />
          ) : activeTab === "Inheritance Plan" ? (
            <InheritancePlanTable plans={inheritancePlans} />
          ) : activeTab === "Platform Transaction" ? (
            <PlatformTransactionTable transactions={platformTransactions} />
          ) : (
            <RecentActivities activities={filteredActivities} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-[200px] rounded-[8px] py-[32px] px-[20px] bg-[#182024] h-[132px] flex flex-col gap-2 items-center justify-center">
          <span className="text-[36px] font-semibold text-[#FCFFFF]">0</span>
          <span className="text-[#92A5A8] text-[12px] font-normal">
            Total Verified User
          </span>
        </div>
        <div className="w-[200px] rounded-[8px] py-[32px] px-[20px] bg-[#182024] h-[132px] flex flex-col gap-2 items-center justify-center">
          <span className="text-[36px] font-semibold text-[#FCFFFF]">0</span>
          <span className="text-[#92A5A8] text-[12px] font-normal">
            Total Inheritance Span
          </span>
        </div>
        <div className="w-[200px] rounded-[8px] py-[32px] px-[20px] bg-[#182024] h-[132px] flex flex-col gap-2 items-center justify-center">
          <span className="text-[36px] font-semibold text-[#FCFFFF]">0</span>
          <span className="text-[#92A5A8] text-[12px] font-normal">
            Open Disputes
          </span>
        </div>
      </div>
    </section>
  );
}
