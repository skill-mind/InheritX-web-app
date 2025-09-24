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
import "./hide-scrollbar.css";
import { useRouter } from "next/navigation";

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
  claimSummary: {
    name: string;
    email: string;
    claimCode: string;
  };
  // --- Modal fields ---
  planName: string;
  description: string;
  beneficiary: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  assets: Array<{
    type: string;
    name: string;
    icon: string;
    amount: number;
    value: string;
    percent: number;
    description?: string;
  }>;
  email: string;
  walletAddress: string;
  executeOn: string;
  rules: {
    trigger: string;
    distribution: string;
    escalation: string;
  };
  documents: Array<{ label: string; url: string }>;
  trustee: {
    name: string;
    phone: string;
    email: string;
  };
  notes: string;
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [showUserVerificationModal, setShowUserVerificationModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<UserVerificationModalProfile | null>(null);
  // Set the first button (Approve KYC) as active by default
  const [activeAction, setActiveAction] = useState("Approve KYC");

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
    {
      fullName: "John Doe",
      username: "John Doe",
      email: "john.doe@email.com",
      dateSubmitted: "10 Aug 2025, 1:15 PM",
      verificationType: "Document",
      status: "APPROVED",
      documents: [
        { src: "/assets/images/doc.svg", label: "Passport" },
        { src: "/assets/images/doc.svg", label: "Utility Bill" },
      ],
      activityHistory: [
        { text: "User submitted verification request.", date: "10 Aug 2025" },
        { text: "Admin approved verification.", date: "11 Aug 2025" },
      ],
      notes: "Verified successfully.",
    },
    {
      fullName: "Jane Smith",
      username: "Jane Smith",
      email: "jane.smith@email.com",
      dateSubmitted: "09 Aug 2025, 11:00 AM",
      verificationType: "Biometric",
      status: "REJECTED",
      documents: [
        { src: "/assets/images/doc.svg", label: "ID - Front PNG" },
        { src: "/assets/images/doc.svg", label: "ID - Back PNG" },
      ],
      activityHistory: [
        { text: "User submitted verification request.", date: "09 Aug 2025" },
        { text: "Admin rejected verification.", date: "10 Aug 2025" },
      ],
      notes: "Document mismatch detected.",
    },
    {
      fullName: "Alice Johnson",
      username: "Alice Johnson",
      email: "alice.j@email.com",
      dateSubmitted: "08 Aug 2025, 9:30 AM",
      verificationType: "Document",
      status: "PENDING",
      documents: [{ src: "/assets/images/doc.svg", label: "Driver's License" }],
      activityHistory: [
        { text: "User submitted verification request.", date: "08 Aug 2025" },
      ],
      notes: "Awaiting review.",
    },
    {
      fullName: "Michael Brown",
      username: "Michael Brown",
      email: "michael.b@email.com",
      dateSubmitted: "07 Aug 2025, 2:00 PM",
      verificationType: "Biometric",
      status: "APPROVED",
      documents: [{ src: "/assets/images/doc.svg", label: "ID Card" }],
      activityHistory: [
        { text: "User submitted verification request.", date: "07 Aug 2025" },
        { text: "Admin approved verification.", date: "08 Aug 2025" },
      ],
      notes: "Verified successfully.",
    },
    {
      fullName: "Sarah Lee",
      username: "Sarah Lee",
      email: "sarah.lee@email.com",
      dateSubmitted: "06 Aug 2025, 4:45 PM",
      verificationType: "Document",
      status: "REJECTED",
      documents: [{ src: "/assets/images/doc.svg", label: "Passport" }],
      activityHistory: [
        { text: "User submitted verification request.", date: "06 Aug 2025" },
        { text: "Admin rejected verification.", date: "07 Aug 2025" },
      ],
      notes: "Blurry document image.",
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
      claimSummary: {
        name: "Juliet Johnson",
        email: "thejulietjohnson@gmail.com",
        claimCode: "123456",
      },
      // --- Modal fields ---
      planName: "My first daughter",
      description: "This is an inheritance for my babygirl. My first daughter.",
      beneficiary: {
        name: "Juliet Johnson",
        avatar: "/assets/icons/avatar.svg",
        email: "thejulietjohnson@gmail.com",
        phone: "+234 812 3456 789",
      },
      assets: [
        {
          type: "token",
          name: "ETH",
          icon: "/assets/icons/eth.svg",
          amount: 2,
          value: "$4,257.62",
          percent: 10,
        },
        {
          type: "nft",
          name: "Monkey Art",
          icon: "/assets/icons/nft1.svg",
          amount: 3,
          value: "$690.13",
          percent: 30,
        },
        {
          type: "rwa",
          name: "Real World Asset",
          icon: "/assets/icons/rwa.svg",
          amount: 1,
          value: "$117,750",
          percent: 60,
          description: "Mercedes-Benz S-Class",
        },
      ],
      email: "thejulietjohnson@gmail.com",
      walletAddress: "0xajoer....apro",
      executeOn: "16/04/2027",
      rules: {
        trigger:
          "If beneficiary is under 18, their share is held in trust until they turn 18.",
        distribution: "Yearly Release of Funds (disbursement)",
        escalation:
          "If my daughter is unable to receive it, let her brother receive it on her behalf.",
      },
      documents: [
        { label: "ID - Front PNG", url: "/assets/images/doc.svg" },
        { label: "ID - Back PNG", url: "/assets/images/doc.svg" },
        { label: "Selfie", url: "/assets/images/doc.svg" },
      ],
      trustee: {
        name: "John Doe",
        phone: "+234 812 3455 678",
        email: "Johndoe@gmail.com",
      },
      notes: "Release funds monthly for upkeep of the property.",
    },
    {
      id: 2,
      planId: "P-1002",
      creator: "Jane Smith",
      status: "ACTIVE",
      beneficiaries: 2,
      creationDate: "2024-02-15",
      claimDate: "2024-07-15",
      claimSummary: {
        name: "John Doe",
        email: "john.doe@email.com",
        claimCode: "654321",
      },
      // --- Modal fields ---
      planName: "Education Plan",
      description: "Funds for the educational expenses of my children.",
      beneficiary: {
        name: "John Doe",
        avatar: "/assets/icons/avatar.svg",
        email: "john.doe@email.com",
        phone: "+234 812 3456 780",
      },
      assets: [
        {
          type: "token",
          name: "USDT",
          icon: "/assets/icons/usdt.svg",
          amount: 500,
          value: "$500,000",
          percent: 100,
        },
      ],
      email: "john.doe@email.com",
      walletAddress: "0xjohnsmi....apro",
      executeOn: "01/01/2030",
      rules: {
        trigger: "Release funds when the beneficiary turns 18.",
        distribution: "Lump sum payment",
        escalation: "If John Doe is unavailable, Jane Doe receives the funds.",
      },
      documents: [
        { label: "Birth Certificate", url: "/assets/images/doc.svg" },
        { label: "School Admission Letter", url: "/assets/images/doc.svg" },
      ],
      trustee: {
        name: "Mary Jane",
        phone: "+234 812 3455 679",
        email: "maryjane@gmail.com",
      },
      notes: "Ensure funds are used for educational purposes only.",
    },
    {
      id: 3,
      planId: "P-1003",
      creator: "Alice Johnson",
      status: "PENDING",
      beneficiaries: 3,
      creationDate: "2024-03-10",
      claimDate: "2024-08-10",
      claimSummary: {
        name: "Alice Johnson",
        email: "alice.j@email.com",
        claimCode: "987654",
      },
      // --- Modal fields ---
      planName: "Business Investment",
      description: "Investment for the startup of my business.",
      beneficiary: {
        name: "Alice Johnson",
        avatar: "/assets/icons/avatar.svg",
        email: "alice.j@email.com",
        phone: "+234 812 3456 781",
      },
      assets: [
        {
          type: "token",
          name: "BTC",
          icon: "/assets/icons/btc.svg",
          amount: 1,
          value: "$30,000",
          percent: 50,
        },
        {
          type: "rwa",
          name: "Business Equipment",
          icon: "/assets/icons/rwa.svg",
          amount: 1,
          value: "$30,000",
          percent: 50,
          description: "Equipment for the business",
        },
      ],
      email: "alice.j@email.com",
      walletAddress: "0xalicejo....apro",
      executeOn: "10/03/2025",
      rules: {
        trigger:
          "Release 50% of funds on approval, remaining 50% after 1 year.",
        distribution: "50% upfront, 50% after 1 year",
        escalation:
          "If Alice Johnson is unable to manage, appoint Bob Johnson as manager.",
      },
      documents: [
        { label: "Business Plan", url: "/assets/images/doc.svg" },
        { label: "ID - Front PNG", url: "/assets/images/doc.svg" },
        { label: "ID - Back PNG", url: "/assets/images/doc.svg" },
      ],
      trustee: {
        name: "John Smith",
        phone: "+234 812 3455 680",
        email: "johnsmith@gmail.com",
      },
      notes: "Monitor business progress quarterly.",
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
    {
      id: 4,
      ticketId: "C-405",
      issue: "Account Locked",
      plan: "Crypto Wallet",
      user: "Jane Smith",
      priority: "HIGH",
      status: "CLOSED",
      docIcon: "/assets/icons/file.svg",
      timestamp: "2024-01-04",
    },
    {
      id: 5,
      ticketId: "C-406",
      issue: "Missing Payment",
      plan: "Life Insurance",
      user: "Alice Johnson",
      priority: "MEDIUM",
      status: "OPEN",
      docIcon: "/assets/icons/file.svg",
      timestamp: "2024-01-05",
    },
    {
      id: 6,
      ticketId: "C-407",
      issue: "Incorrect Beneficiary",
      plan: "Estate Plan",
      user: "Michael Brown",
      priority: "LOW",
      status: "PENDING",
      docIcon: "/assets/icons/file.svg",
      timestamp: "2024-01-06",
    },
    {
      id: 7,
      ticketId: "C-408",
      issue: "Delayed Claim Approval",
      plan: "Retirement Fund",
      user: "Sarah Lee",
      priority: "HIGH",
      status: "RESOLVED",
      docIcon: "/assets/icons/file.svg",
      timestamp: "2024-01-07",
    },
    {
      id: 8,
      ticketId: "C-409",
      issue: "Unrecognized Transaction",
      plan: "Crypto Wallet",
      user: "Ahmed King",
      priority: "MEDIUM",
      status: "CLOSED",
      docIcon: "/assets/icons/file.svg",
      timestamp: "2024-01-08",
    },
  ];

  // Filter activities based on activeTab
  const filteredActivities =
    activeTab === "All"
      ? activities
      : activities.filter((a) =>
          a.title.toLowerCase().includes(activeTab.toLowerCase())
        );

  const handleActionClick = (label: string) => {
    setActiveAction(label);
    if (label === "Approve KYC") {
      router.push("/admin/kyc");
    } else if (label === "Create Ticket") {
      router.push("/admin/platform-activity");
    } else if (label === "Assign Dispute") {
      router.push("/admin/disputes");
    }
  };

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

        {/* Stat Cards: show above action buttons on mobile only */}
        <div className="block lg:hidden mb-4 w-full">
          <div className="grid grid-cols-2 mb-[4rem] gap-2 w-full justify-between">
            {[
              "Total Verified User",
              "Total Inheritance Span",
              "Open Disputes",
            ].map((label, idx) => (
              <div
                key={label}
                className="flex-1 rounded-[8px] py-[24px] sm:py-[32px] px-[10px] sm:px-[20px] bg-[#182024] h-[100px] sm:h-[132px] flex flex-col gap-2 items-center justify-center min-w-[110px] transition-all duration-200 cursor-pointer hover:shadow-[0_0_16px_0_#33C5E0] hover:bg-[#1C252A] active:scale-[0.98]"
              >
                <span className="text-[28px] sm:text-[36px] font-semibold text-[#FCFFFF]">
                  0
                </span>
                <span className="text-[#92A5A8] text-[11px] sm:text-[12px] font-normal text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-[4rem]">
          {[
            {
              label: "Approve KYC",
              icon: "/assets/icons/arrowdown.svg",
              activeIcon: "/assets/icons/arrowup.svg",
              mobileIcon: "/assets/icons/shield.svg",
            },
            {
              label: "Create Ticket",
              icon: "/assets/icons/arrowdown.svg",
              activeIcon: "/assets/icons/arrowup.svg",
              mobileIcon: "/assets/icons/ticket.svg",
            },
            {
              label: "Assign Dispute",
              icon: "/assets/icons/arrowdown.svg",
              activeIcon: "/assets/icons/arrowup.svg",
              mobileIcon: "/assets/icons/user.svg",
            },
          ].map((btn) => (
            <div key={btn.label} className="flex flex-col items-center">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 w-[114px] h-[60px] sm:w-[208px] sm:h-[60px] rounded-[24px] border border-[#33C5E03D] py-[14px] px-[14px] sm:px-[24px] font-medium text-[14px] transition-all duration-200 cursor-pointer
                  ${
                    activeAction === btn.label
                      ? "bg-[#33C5E0] text-[#161E22] shadow-[0_0_16px_0_#33C5E0]"
                      : "bg-[#33C5E014] text-[#33C5E0] hover:bg-[#33C5E0] hover:text-[#161E22] hover:shadow-[0_0_16px_0_#33C5E0] focus:bg-[#33C5E0] focus:text-[#161E22] active:bg-[#33C5E0] active:text-[#161E22] active:scale-[0.98]"
                  }
                `}
                onClick={() => handleActionClick(btn.label)}
              >
                {/* Mobile: show only icon, Desktop: show arrow + text */}
                <span className="sm:hidden flex items-center justify-center w-full">
                  <Image
                    src={btn.mobileIcon}
                    alt={btn.label + " icon"}
                    width={20}
                    height={20}
                  />
                </span>
                <>
                  <Image
                    src={activeAction === btn.label ? btn.activeIcon : btn.icon}
                    alt="action icon"
                    width={13.5}
                    height={13.5}
                    className={`hidden sm:inline-block mr-2 ${
                      activeAction === btn.label
                        ? "rotate-0"
                        : "rotate-[270deg]"
                    }`}
                  />
                  <span className="hidden sm:inline-block">{btn.label}</span>
                </>
              </button>
              {/* Mobile: text below button */}
              <span className="text-[13px] sm:hidden font-medium text-center text-[#33C5E0] mt-1">
                {btn.label}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div>
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-0">
            <h2 className="text-[13px] sm:text-[14px] text-[#BFC6C8] font-medium">
              RECENT ACTIVITIES
            </h2>
            <h3 className="cursor-pointer hover:text-[#33C5E0] transition-colors duration-150">
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
          <ul className="flex max-w-[400px] md:max-w-full flex-nowrap items-center border-t border-[#1C252A] mt-[.7rem] text-[#BFC6C8] text-[13px] sm:text-[14px] px-2 sm:px-6 overflow-x-auto gap-x-2 sm:gap-x-6 hide-scrollbar">
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
                className={`cursor-pointer h-[40px] sm:h-[48px] rounded-b-[16px] sm:rounded-b-[20px] flex items-center justify-center py-[8px] sm:py-[12px] px-[10px] sm:px-[16px] whitespace-nowrap transition-all duration-150 select-none
                  ${
                    activeTab === tab
                      ? "text-[#33C5E0] bg-[#1C252A] border border-[#1C252A] font-semibold shadow-[0_0_8px_0_#33C5E0]"
                      : "hover:text-[#33C5E0] hover:bg-[#222] hover:shadow-[0_0_8px_0_#33C5E0] active:scale-[0.97]"
                  }
                `}
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
      <div className="hidden lg:flex flex-row lg:flex-col gap-2 w-full lg:w-auto justify-between lg:justify-start">
        {["Total Verified User", "Total Inheritance Span", "Open Disputes"].map(
          (label, idx) => (
            <div
              key={label}
              className="flex-1 lg:w-[200px] rounded-[8px] py-[24px] sm:py-[32px] px-[10px] sm:px-[20px] bg-[#182024] h-[100px] sm:h-[132px] flex flex-col gap-2 items-center justify-center min-w-[110px] transition-all duration-200 cursor-pointer hover:shadow-[0_0_16px_0_#33C5E0] hover:bg-[#1C252A] active:scale-[0.98]"
            >
              <span className="text-[28px] sm:text-[36px] font-semibold text-[#FCFFFF]">
                0
              </span>
              <span className="text-[#92A5A8] text-[11px] sm:text-[12px] font-normal text-center">
                {label}
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
}
