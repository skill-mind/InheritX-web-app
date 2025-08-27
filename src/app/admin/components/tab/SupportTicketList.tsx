import React from "react";

interface SupportTicket {
  id: number;
  title: string;
  user: string;
  status: string;
}

interface Props {
  tickets: SupportTicket[];
}

const SupportTicketList: React.FC<Props> = ({ tickets }) => (
  <ul className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[24px] space-y-4">
    {tickets.map((ticket, index) => (
      <li
        key={ticket.id}
        className="flex items-center justify-between border-b border-[#1C252A] pb-10"
      >
        <div className="flex items-center space-x-2">
          <span className="text-[#425558] text-[14px]">{index + 1}.</span>
          <span className="font-normal text-[#FCFFFF]">{ticket.title}</span>
          <span className="text-[#BFC6C8] text-[12px]">({ticket.user})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#232B2F] text-[#BFC6C8] text-[13px] font-semibold px-4 py-1 rounded-[16px]">{ticket.status}</span>
          <button className="bg-[#33C5E014] w-[88px] h-[34px] text-[#33C5E0] text-[12px] px-4 py-1 rounded-[24px] hover:bg-cyan-400 hover:text-white transition">
            VIEW
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default SupportTicketList;
