import React from "react";
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

const UserVerificationTable: React.FC<Props> = ({ users, onApproveClick, onRejectClick }) => (
  <div className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[24px]">
    <table className="w-full text-left">
      <thead>
        <tr className="text-[#92A5A8] text-[14px] font-medium border-b border-[#1C252A]">
          <th className="py-3 px-2">Username</th>
          <th className="py-3 px-2">Verification Type</th>
          <th className="py-3 px-2">Status</th>
          <th className="py-3 px-2">Timestamp</th>
          <th className="py-3 px-2 w-[8rem]">
            <span>Action</span>
            <Image
              src="assets/icons/more.svg"
              alt="more icon"
              width={2.25}
              height={14}
              className="inline-block ml-30"
            />
          </th>
          <th className="py-3 px-2 text-right">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
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
              <span className="bg-[#1C2518] border border-[#2E3513] text-[#B9B604] text-[12px] font-semibold px-4 py-1 rounded-[16px]">
                {user.status}
              </span>
            </td>
            <td className="py-4 px-2">{user.timestamp}</td>
            <td className="py-4 px-2">
              <div className="flex gap-2">
                <button
                  className="bg-[#33C5E014] border border-[#33C5E03D] text-[#BFC6C8] px-5 py-2 rounded-[16px] text-[12px] font-medium hover:bg-[#232B2F]/80"
                  onClick={() => onRejectClick && onRejectClick(user)}
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
  </div>
);

export default UserVerificationTable;
