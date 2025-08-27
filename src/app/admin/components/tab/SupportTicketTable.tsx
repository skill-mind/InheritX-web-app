import React from "react";
import Image from "next/image";

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

interface Props {
  tickets: SupportTicket[];
}

const SupportTicketTable: React.FC<Props> = ({ tickets }) => (
  <div className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[24px]">
    <table className="w-full text-left">
      <thead>
        <tr className="text-[#92A5A8] text-[14px] font-normal border-b border-[#1C252A]">
          <th className="py-3 px-2">Ticket ID</th>
          <th className="py-3 px-2">User/Plan Involved</th>
          <th className="py-3 px-2">Priority</th>
          <th className="py-3 px-2">Status</th>
          <th className="py-3 px-2 w-[8rem]">
            <span>Action</span>
            <Image
              src="/assets/icons/more.svg"
              alt="more icon"
              width={2.25}
              height={14}
              className="inline-block ml-2"
            />
          </th>
          <th className="py-3 px-2 text-right">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket, idx) => (
          <tr
            key={ticket.id}
            className="border-b border-[#1C252A] text-[#FCFFFF] text-[15px]"
          >
            <td className="py-4 px-2 font-normal">
              <div className="flex flex-col">
                <span className="flex items-center gap-2">
                  <span className="text-[#425558] text-[14px] w-4 inline-block">
                    {idx + 1}.
                  </span>
                  <span className="font-semibold text-[14px] text-[#FCFFFF]">
                    {ticket.ticketId}
                  </span>
                </span>
                <span className="text-[#92A5A8] text-[12px] ml-[1.5rem]">
                  {ticket.issue}
                </span>
              </div>
            </td>
            <td className="py-4 px-2">
              <div className="flex items-center gap-2 mb-0">
                <span className="font-normal text-[14px] text-[#FCFFFF]">
                  {ticket.plan}
                </span>
                {ticket.docIcon && (
                  <Image
                    src={ticket.docIcon}
                    alt="doc icon"
                    width={18}
                    height={18}
                  />
                )}
              </div>
              <span className="text-[#92A5A8] text-[10px] mt-0">
                {ticket.user}
              </span>
            </td>
            <td className="py-4 px-2">
              <span className="text-[#CE0D0D] font-bold text-[12px]">
                {ticket.priority}
              </span>
            </td>
            <td className="py-4 px-2">
              <span className="bg-[#2A3338] text-[#92A5A8] text-[12px] font-semibold px-4 py-1 rounded-[16px]">
                {ticket.status}
              </span>
            </td>
            <td className="py-4 px-2">
              <div className="flex gap-2">
                <button className="bg-[#232B2F] border border-[#425558] text-[#BFC6C8] px-5 py-2 rounded-[16px] text-[12px] font-medium hover:bg-[#232B2F]/80">
                  ESCALATE
                </button>
                <button className="bg-[#33C5E0] text-[#161E22] px-5 py-2 rounded-[16px] text-[12px] font-semibold hover:bg-cyan-400">
                  APPROVE
                </button>
              </div>
            </td>
            <td className="py-4 px-2 text-right">
              <span className="text-[#BFC6C8] text-[20px] font-bold cursor-pointer">
                <Image
                  src="/assets/icons/more.svg"
                  alt="more icon"
                  width={2.25}
                  height={14}
                />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SupportTicketTable;
