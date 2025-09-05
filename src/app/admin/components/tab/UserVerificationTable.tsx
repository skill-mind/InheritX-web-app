import React, { useState } from "react";
import Image from "next/image";

interface UserVerification {
  id: number;
  username: string;
  type: string;
  status: string;
  timestamp: string;
}

interface Props {
  users: UserVerification[];
  onApproveClick: (user: UserVerification) => void;
  onRejectClick?: (user: UserVerification) => void;
}

const UserVerificationTable: React.FC<Props> = ({
  users,
  onApproveClick,
  onRejectClick,
}) => {
  const [actionOpenIdx, setActionOpenIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'Pending' | 'Rejected' | 'Approved'>('Pending');

  // Filter users by status for the selected tab
  const filteredUsers = users.filter(user => {
    if (activeTab === 'Pending') return user.status.toLowerCase() === 'pending';
    if (activeTab === 'Rejected') return user.status.toLowerCase() === 'rejected';
    if (activeTab === 'Approved') return user.status.toLowerCase() === 'approved';
    return true;
  });

  return (
    <div className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[8px] sm:px-[16px] md:px-[24px] overflow-x-auto">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-[#1C252A]">
        {['Pending', 'Rejected', 'Approved'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 text-[15px] font-medium focus:outline-none transition-all duration-150 rounded-t-[12px] -mb-px ${
              activeTab === tab
                ? 'text-[#33C5E0] bg-[#161E22] border-b-2 border-[#33C5E0]'
                : 'text-[#BFC6C8] bg-transparent'
            }`}
            onClick={() => setActiveTab(tab as 'Pending' | 'Rejected' | 'Approved')}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Desktop Table */}
      <table className="w-full text-left hidden md:table">
        <thead>
          <tr className="text-[#92A5A8] text-[14px] font-medium border-b border-[#1C252A]">
            <th className="py-3 px-2">Username</th>
            <th className="py-3 px-2">Verification Type</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Timestamp</th>
            <th className="py-3 px-2 w-[8rem]">
              <span>Action</span>
              <Image
                src="/assets/icons/more.svg"
                alt="more icon"
                width={2.25}
                height={15}
                className="inline-block ml-2 align-middle"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, idx) => (
            <tr
              key={user.id}
              className="border-b border-[#1C252A] text-[#FCFFFF] text-[14px]"
            >
              <td className="py-4 px-2 font-normal flex items-center gap-2">
                <span className="text-[#425558] text-[14px] w-4 inline-block">
                  {idx + 1}.
                </span>{" "}
                {user.username}
              </td>
              <td className="py-4 px-2">{user.type}</td>
              <td className="py-4 px-2">
                <span
                  className={
                    user.status.toLowerCase() === "approved"
                      ? "bg-[#1B311C] border border-[#1E3F1F] text-[#0DA314] text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                      : user.status.toLowerCase() === "pending"
                      ? "bg-[#1C2518] border border-[#2E3513] text-[#B9B604] text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                      : user.status.toLowerCase() === "rejected"
                      ? "bg-[#2A0D12] border border-[#4D0814] text-[#CE0D0D] text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                      : "text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                  }
                >
                  {user.status}
                </span>
              </td>
              <td className="py-4 px-2">{user.timestamp}</td>
              <td className="py-4 px-2">
                <div className="flex gap-2">
                  <button
                    className="bg-[#33C5E014] border border-[#33C5E03D] text-[#BFC6C8] px-5 py-2 rounded-[16px] text-[12px] font-medium hover:bg-[#232B2F]/80"
                    onClick={() => {
                      if (onRejectClick) onRejectClick(user);
                    }}
                  >
                    REJECT
                  </button>
                  <button
                    className="bg-[#33C5E0] text-[#161E22] px-5 py-2 rounded-[16px] text-[12px] font-semibold hover:bg-cyan-400"
                    onClick={() => onApproveClick(user)}
                  >
                    APPROVE
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile Table */}
      <table className="w-full max-w-screen text-left md:hidden overflow-x-scroll">
        <thead>
          <tr className="text-[#92A5A8] text-[13px] font-medium border-b border-[#1C252A]">
            <th className="py-3 px-2">Username</th>
            <th className="py-3 px-2">Ver. Type</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, idx) => (
            <tr
              key={user.id}
              className="border-b border-[#1C252A] text-[#FCFFFF] text-[13px]"
            >
              <td className="py-3 px-2 font-normal flex items-center gap-2">
                <span className="text-[#425558] text-[13px] w-4 inline-block">
                  {idx + 1}.
                </span>{" "}
                {user.username}
              </td>
              <td className="py-3 px-2">{user.type}</td>
              <td className="py-3 px-2">
                <span
                  className={
                    user.status.toLowerCase() === "approved"
                      ? "bg-[#1B311C] border border-[#1E3F1F] text-[#0DA314] text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                      : user.status.toLowerCase() === "pending"
                      ? "bg-[#1C2518] border border-[#2E3513] text-[#B9B604] text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                      : user.status.toLowerCase() === "rejected"
                      ? "bg-[#2A0D12] border border-[#4D0814] text-[#CE0D0D] text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                      : "text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                  }
                >
                  {user.status}
                </span>
              </td>
              <td className="py-3 px-2 text-center relative">
                <button
                  className="p-2 rounded-full hover:bg-[#222C32]"
                  onClick={() =>
                    setActionOpenIdx(actionOpenIdx === idx ? null : idx)
                  }
                  aria-label="Show actions"
                >
                  <Image
                    src="/assets/icons/more.svg"
                    alt="actions"
                    width={2.25}
                    height={15}
                  />
                </button>
                {actionOpenIdx === idx && (
                  <div className="absolute z-10 left-1/2 -translate-x-1/2 top-10 bg-[#222C32] border border-[#2E3513] rounded-[12px] shadow-lg flex flex-col min-w-[120px]">
                    <button
                      className="w-full text-left px-4 py-2 text-[#F87171] hover:bg-[#232B2F] text-[13px]"
                      onClick={() => {
                        if (onRejectClick) onRejectClick(user);
                        setActionOpenIdx(null);
                      }}
                    >
                      REJECT
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-[#33C5E0] hover:bg-[#232B2F] text-[13px]"
                      onClick={() => {
                        onApproveClick(user);
                        setActionOpenIdx(null);
                      }}
                    >
                      APPROVE
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserVerificationTable;
