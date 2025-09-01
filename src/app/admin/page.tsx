"use client";

import Image from "next/image";
import { useState } from "react";
import UserVerificationTable from "./components/tab/UserVerificationTable";
import RecentActivities from "./components/tab/RecentActivities";
import SupportTicketTable from "./components/tab/SupportTicketTable";
import InheritancePlanTable from "./components/tab/InheritancePlanTable";
import PlatformTransactionTable from "./components/tab/PlatformTransactionTable";
import UserVerificationRequestModal from "./components/KYCVerificationModal";
import UserVerificationSuccessModal from "./components/UserVerificationSuccessModal";

// Type for user verification
// interface UserVerification {
//   id: number;
//   username: string;
//   type: string;
//   status: string;
//   timestamp: string;
//   fullName: string;
//   email: string;
//   dateSubmitted: string;
//   verificationType: string;
//   documents: { src: string; label: string }[];
//   activityHistory: { text: string; date: string }[];
//   notes: string;
// }

// Types for tables
interface UserVerificationTableRow {
  id: number;
  username: string;
  type: string;
  status: string;
  timestamp: string;
}
interface UserVerificationModalProfile {
  fullName: string;
  username: string;
  email: string;
  dateSubmitted: string;
  verificationType: string;
  status: string;
  documents: { src: string; label: string }[];
  activityHistory: { text: string; date: string }[];
  notes: string;
}
interface SupportTicket {
  id: number;
  ticketId: string;
  issue: string;
  plan: string;
  user: string;
  priority: string;
  status: string;
  docIcon?: string;
  timestamp?: string;
}
interface InheritancePlan {
  id: number;
  planId: string;
  creator: string;
  status: string;
  beneficiaries: number;
  creationDate: string;
  claimDate: string;
}
interface PlatformTransaction {
  id: number;
  transactionId: string;
  user: string;
  userId: string;
  type: string;
  assetAmount: string;
  asset: string;
  method: string;
  methodDesc: string;
  status: string;
  date: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [showUserVerificationModal, setShowUserVerificationModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<UserVerificationModalProfile | null>(null);

  const activities = [
    { id: 1, title: "User Verification", newCount: 2 },
    { id: 2, title: "Support Ticket", newCount: 1 },
    { id: 3, title: "Inheritance Plan", newCount: 0 },
    { id: 4, title: "Platform Transaction", newCount: 5 },
  ];

  // Full user profiles for modal
  const userVerificationProfiles: UserVerificationModalProfile[] = [
    {
      fullName: "Dolly Creed",
      username: "Dolly Creed",
      email: "dollycreed@email.com",
      dateSubmitted: "12 Aug 2025, 3:47 PM",
      verificationType: "Biometric",
      status: "PENDING",
      documents: [
        { src: "/assets/images/doc.svg", label: "ID - Front PNG" },
        { src: "/assets/images/doc.svg", label: "ID - Back PNG" },
        { src: "/assets/images/doc.svg", label: "Selfie" },
        { src: "/assets/images/doc.svg", label: "ImagePNG" },
        { src: "/assets/images/doc.svg", label: "Image.PNG" },
        { src: "/assets/images/doc.svg", label: "Image.PNG" },
      ],
      activityHistory: [
        { text: "User submitted verification request.", date: "12 Aug 2025" },
        { text: "Automated document check passed.", date: "13 Aug 2025" },
      ],
      notes: "No suspicious activity detected in last 30 days.",
    },
    // ...add more profiles as needed...
  ];
  // Table rows for UserVerificationTable
  const userVerifications: UserVerificationTableRow[] =
    userVerificationProfiles.map((u, idx) => ({
      id: idx + 1,
      username: u.username,
      type: u.verificationType,
      status: u.status,
      timestamp: u.dateSubmitted,
    }));

  // Inheritance plan mock data (detailed table)
  const inheritancePlans: InheritancePlan[] = [
    {
      id: 1,
      planId: "P-1001",
      creator: "Ahmed King",
      status: "OPEN",
      beneficiaries: 1,
      creationDate: "2024-01-01",
      claimDate: "2024-06-01",
    },
    {
      id: 2,
      planId: "P-1002",
      creator: "Jane Smith",
      status: "ACTIVE",
      beneficiaries: 2,
      creationDate: "2024-02-15",
      claimDate: "2024-07-15",
    },
    {
      id: 3,
      planId: "P-1003",
      creator: "Alice Johnson",
      status: "PENDING",
      beneficiaries: 3,
      creationDate: "2024-03-10",
      claimDate: "2024-08-10",
    },
  ];

  // Platform transaction mock data
  const platformTransactions: PlatformTransaction[] = [
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
      transactionId: "TXN-982348",
      user: "John Doe",
      userId: "U-2046",
      type: "Withdrawal",
      assetAmount: "200.00",
      asset: "BTC",
      method: "Crypto Wallet",
      methodDesc: "Withdrawal to external wallet",
      status: "COMPLETED",
      date: "13th Sep, 2026",
    },
    {
      id: 3,
      transactionId: "TXN-982349",
      user: "Jane Smith",
      userId: "U-2047",
      type: "Transfer",
      assetAmount: "300.00",
      asset: "ETH",
      method: "Internal Transfer",
      methodDesc: "Transfer between internal accounts",
      status: "FAILED",
      date: "14th Sep, 2026",
    },
  ];

  // Support ticket mock data
  const supportTickets: SupportTicket[] = [
    {
      id: 1,
      ticketId: "C-402",
      issue: "Plan Claim Issue",
      plan: "Landed Property",
      user: "Ahmed King",
      priority: "HIGH",
      status: "OPEN",
      docIcon: "/assets/icons/file.svg",
      timestamp: "2024-01-01",
    },
    {
      id: 2,
      ticketId: "C-403",
      issue: "Document Verification Delay",
      plan: "House Insurance",
      user: "Dolly Creed",
      priority: "MEDIUM",
      status: "PENDING",
      docIcon: "/assets/icons/file.svg",
      timestamp: "2024-01-02",
    },
    {
      id: 3,
      ticketId: "C-404",
      issue: "Funds Transfer Failure",
      plan: "Car Insurance",
      user: "John Doe",
      priority: "LOW",
      status: "RESOLVED",
      docIcon: "/assets/icons/file.svg",
      timestamp: "2024-01-03",
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
    <section className="flex flex-col lg:flex-row items-start gap-4 justify-between w-full px-2 sm:px-4 md:px-8 lg:px-0 mb-[10rem]">
      {/* User Verification Success Modal */}
      <UserVerificationSuccessModal
        isOpen={showSuccessModal}
        userFullName={selectedUser?.fullName || ""}
        onClose={() => setShowSuccessModal(false)}
        onNext={() => {
          setShowSuccessModal(false);
          // Optionally, load next request here
        }}
      />
      {/* User Verification Request Modal */}
      <UserVerificationRequestModal
        isOpen={showUserVerificationModal}
        onClose={() => setShowUserVerificationModal(false)}
        onApprove={() => {
          setShowUserVerificationModal(false);
          setShowSuccessModal(true);
        }}
        onReject={() => setShowUserVerificationModal(false)}
        user={selectedUser || userVerificationProfiles[0]}
      />

      <div className="w-full lg:w-[80%] mb-6 lg:mb-0">
        <h1 className="text-[20px] sm:text-[24px] font-medium mb-2">
          Good morning, EBUBE
        </h1>
        <p className="text-[#92A5A8] text-[13px] sm:text-[14px] font-normal mb-6">
          Monitor, protect, and manage the platform.
        </p>

        {/* Recent Activities */}
        <div>
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-0">
            <h2 className="text-[13px] sm:text-[14px] text-[#BFC6C8] font-medium">
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
          <ul className="flex flex-wrap items-center border-t border-[#1C252A] mt-[.7rem] text-[#BFC6C8] text-[13px] sm:text-[14px] px-2 sm:px-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[#222] gap-x-2 sm:gap-x-6">
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
                className={`cursor-pointer h-[40px] sm:h-[48px] rounded-b-[16px] sm:rounded-b-[20px] flex items-center justify-center py-[8px] sm:py-[12px] px-[10px] sm:px-[16px] whitespace-nowrap transition-all duration-150 ${
                  activeTab === tab
                    ? "text-[#33C5E0] bg-[#1C252A] border border-[#1C252A] font-semibold"
                    : ""
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
          {/* Tab Content */}
          <div className="w-full overflow-x-auto mt-2">
            {activeTab === "User Verification" ? (
              <UserVerificationTable
                users={userVerifications}
                onApproveClick={(user) => {
                  const profile = userVerificationProfiles.find(
                    (u) => u.username === user.username
                  );
                  setSelectedUser(profile || userVerificationProfiles[0]);
                  setShowUserVerificationModal(true);
                }}
                onRejectClick={() => {}}
              />
            ) : activeTab === "Support Ticket" ? (
              <SupportTicketTable tickets={supportTickets} />
            ) : activeTab === "Inheritance Plan" ? (
              <InheritancePlanTable plans={inheritancePlans} />
            ) : activeTab === "Platform Transaction" ? (
              <PlatformTransactionTable transactions={platformTransactions} />
            ) : (
              <RecentActivities activities={filteredActivities} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto justify-between lg:justify-start">
        <div className="flex-1 lg:w-[200px] rounded-[8px] py-[24px] sm:py-[32px] px-[10px] sm:px-[20px] bg-[#182024] h-[100px] sm:h-[132px] flex flex-col gap-2 items-center justify-center min-w-[110px]">
          <span className="text-[28px] sm:text-[36px] font-semibold text-[#FCFFFF]">
            0
          </span>
          <span className="text-[#92A5A8] text-[11px] sm:text-[12px] font-normal text-center">
            Total Verified User
          </span>
        </div>
        <div className="flex-1 lg:w-[200px] rounded-[8px] py-[24px] sm:py-[32px] px-[10px] sm:px-[20px] bg-[#182024] h-[100px] sm:h-[132px] flex flex-col gap-2 items-center justify-center min-w-[110px]">
          <span className="text-[28px] sm:text-[36px] font-semibold text-[#FCFFFF]">
            0
          </span>
          <span className="text-[#92A5A8] text-[11px] sm:text-[12px] font-normal text-center">
            Total Inheritance Span
          </span>
        </div>
        <div className="flex-1 lg:w-[200px] rounded-[8px] py-[24px] sm:py-[32px] px-[10px] sm:px-[20px] bg-[#182024] h-[100px] sm:h-[132px] flex flex-col gap-2 items-center justify-center min-w-[110px]">
          <span className="text-[28px] sm:text-[36px] font-semibold text-[#FCFFFF]">
            0
          </span>
          <span className="text-[#92A5A8] text-[11px] sm:text-[12px] font-normal text-center">
            Open Disputes
          </span>
        </div>
      </div>
    </section>
  );
}
