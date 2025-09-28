import React, { useState } from "react";
import Image from "next/image";
import DisputeModal, { DisputeTicket } from "../../disputes/DisputeModal";

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

const SupportTicketTable: React.FC<Props> = ({ tickets }) => {
  const [actionOpenIdx, setActionOpenIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'Open' | 'Pending' | 'Resolved' | 'Closed'>('Open');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<DisputeTicket | null>(null);

  // Filter tickets by status for the selected tab
  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'Open') return ticket.status.toLowerCase() === 'open';
    if (activeTab === 'Pending') return ticket.status.toLowerCase() === 'pending';
    if (activeTab === 'Resolved') return ticket.status.toLowerCase() === 'resolved';
    if (activeTab === 'Closed') return ticket.status.toLowerCase() === 'closed';
    return true;
  });

  // Helper to convert SupportTicket to DisputeTicket
  const toDisputeTicket = (ticket: SupportTicket): DisputeTicket => ({
    id: String(ticket.ticketId),
    issue: ticket.issue,
    plan: ticket.plan,
    user: ticket.user,
    priority: ticket.priority,
    status: ticket.status,
    timestamp: ticket.timestamp || "",
  });

  return (
    <div className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[8px] sm:px-[16px] md:px-[24px] overflow-x-auto">
      {/* Dispute Modal */}
      <DisputeModal open={modalOpen} ticket={selectedTicket} onClose={() => setModalOpen(false)} />
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-[#1C252A]">
        {['Open', 'Pending', 'Resolved', 'Closed'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 text-[15px] font-medium focus:outline-none transition-all duration-150 rounded-t-[12px] -mb-px cursor-pointer ${
              activeTab === tab
                ? 'text-[#33C5E0] bg-[#161E22] border-b-2 border-[#33C5E0]'
                : 'text-[#BFC6C8] bg-transparent'
            }`}
            onClick={() => setActiveTab(tab as 'Open' | 'Pending' | 'Resolved' | 'Closed')}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Desktop Table */}
      <table className="w-full text-left hidden md:table">
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
                height={15}
                className="inline-block ml-2 align-middle"
              />
            </th>
            <th className="py-3 px-2 text-right">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket, idx) => (
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
                <span
                  className={
                    ticket.status.toLowerCase() === "pending"
                      ? "bg-[#1C2518] border border-[#2E3513] text-[#B9B604] text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                      : ticket.status.toLowerCase() === "resolved"
                      ? "bg-[#1B311C] border border-[#1E3F1F] text-[#0DA314] text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                      : ticket.status.toLowerCase() === "closed"
                      ? "bg-[#2A3338] border border-[#39494F] text-[#92A5A8] text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                      : ticket.status.toLowerCase() === "open"
                      ? "bg-[#232B2F] border border-[#425558] text-[#33C5E0] text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                      : "text-[12px] font-semibold px-4 py-1 rounded-[16px]"
                  }
                >
                  {ticket.status}
                </span>
              </td>
              <td className="py-4 px-2">
                <div className="flex gap-2">
                  {activeTab !== 'Closed' && (
                    <button className="bg-[#33C5E0] text-[#161E22] px-5 py-2 rounded-[16px] text-[12px] text-nowrap font-semibold hover:bg-cyan-400 cursor-pointer transition-all duration-150"
                      onClick={() => { setSelectedTicket(toDisputeTicket(ticket)); setModalOpen(true); }}>
                      RESOLVE DISPUTE
                    </button>
                  )}
                </div>
              </td>
              <td className="py-4 px-2 text-right">
                <span className="text-[#BFC6C8] text-[20px] font-bold cursor-pointer">
                  <Image
                    src="/assets/icons/more.svg"
                    alt="more icon"
                    width={2.25}
                    height={15}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile Table */}
      <div className="md:hidden flex flex-col gap-3">
        {filteredTickets.map((ticket, idx) => (
          <div
            key={ticket.id}
            className="bg-[#1C252A] rounded-[16px] px-3 py-3 flex flex-col gap-2 text-[13px] text-[#FCFFFF] shadow-sm border border-[#232B2F]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#425558] text-[13px] w-4 inline-block">
                  {idx + 1}.
                </span>
                <span className="font-semibold">{ticket.ticketId}</span>
              </div>
              <button
                className="p-2 rounded-full hover:bg-[#222C32]"
                onClick={() => setActionOpenIdx(actionOpenIdx === idx ? null : idx)}
                aria-label="Show actions"
              >
                <Image
                  src="/assets/icons/more.svg"
                  alt="actions"
                  width={2.25}
                  height={15}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">Plan:</span>
              <span className="flex items-center gap-1">
                {ticket.plan}{" "}
                {ticket.docIcon && (
                  <Image
                    src={ticket.docIcon}
                    alt="doc icon"
                    width={16}
                    height={16}
                  />
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">User:</span>
              <span>{ticket.user}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">Priority:</span>
              <span className="text-[#CE0D0D] font-bold">{ticket.priority}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">Status:</span>
              <span
                className={
                  ticket.status.toLowerCase() === "pending"
                    ? "bg-[#1C2518] border border-[#2E3513] text-[#B9B604] text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                    : ticket.status.toLowerCase() === "resolved"
                    ? "bg-[#1B311C] border border-[#1E3F1F] text-[#0DA314] text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                    : ticket.status.toLowerCase() === "closed"
                    ? "bg-[#2A3338] border border-[#39494F] text-[#92A5A8] text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                    : ticket.status.toLowerCase() === "open"
                    ? "bg-[#232B2F] border border-[#425558] text-[#33C5E0] text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                    : "text-[12px] font-semibold px-3 py-1 rounded-[16px]"
                }
              >
                {ticket.status}
              </span>
            </div>
            {/* Always show RESOLVE DISPUTE on mobile if not closed */}
            {activeTab !== 'Closed' && (
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-[#33C5E0] text-[#161E22] py-2 rounded-[16px] text-[12px] font-semibold hover:bg-cyan-400 cursor-pointer transition-all duration-150"
                  onClick={() => { setSelectedTicket(toDisputeTicket(ticket)); setModalOpen(true); }}>
                  RESOLVE DISPUTE
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportTicketTable;
