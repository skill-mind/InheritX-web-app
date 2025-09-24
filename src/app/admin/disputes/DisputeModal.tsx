"use client";

import React, { useState } from "react";
import Image from "next/image";
import MessageModal from "./MessageModal";

export type DisputeTicket = {
  id: string;
  issue: string;
  plan: string;
  user: string;
  priority: string;
  status: string;
  timestamp: string;
};

interface DisputeModalProps {
  open: boolean;
  ticket: DisputeTicket | null;
  onClose: () => void;
}

const documents = [
  { src: "/assets/images/doc.svg", label: "ID - Front PNG" },
  { src: "/assets/images/doc.svg", label: "ID - Back PNG" },
  { src: "/assets/images/doc.svg", label: "Selfie" },
  { src: "/assets/images/doc.svg", label: "Image.PNG" },
  { src: "/assets/images/doc.svg", label: "Image.PNG" },
  { src: "/assets/images/doc.svg", label: "Image.PNG" },
];
const thread = [
  { sender: "Admin", avatar: "/assets/icons/x.svg", text: "We have checked and found nothing wrong with the transaction", role: "admin" },
  { sender: "Reporter", avatar: "/assets/icons/avatar.svg", text: "I think this is a fraudulent withdrawal case. Please check again", role: "reporter" },
];
const notes = "No suspicious activity detected in last 30 days.";

const DisputeModal: React.FC<DisputeModalProps> = ({ open, ticket, onClose }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<number | null>(null);
  if (!open || !ticket) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/80 backdrop-blur-[6px]">
      <div className="relative w-full max-w-2xl mx-4 md:mx-0 md:w-[700px] rounded-[24px] bg-[#161E22] border border-[#2A3338] p-6 md:p-10 shadow-xl z-10 flex flex-col gap-6 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span onClick={onClose} className="text-[#92A5A8] text-[14px] font-medium flex items-center cursor-pointer">
            <Image src="/assets/icons/back.svg" alt="back Icon" width={15} height={12.5} className="inline-block mr-2" />
            <span>SUPPORT TICKETS</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-900/30 text-yellow-300 border border-yellow-700/30">PENDING</span>
            <button className="hidden sm:flex items-center gap-1 text-slate-300 text-sm">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
              Filter
            </button>
          </div>
        </div>
        {/* Request Summary */}
        <div>
          <h2 className="text-[#FCFFFF] text-[16px] font-medium mb-6">Request Summary</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px] mb-6">
            <span className="text-[12px] text-[#92A5A8]">TICKET ID</span>
            <span className="text-[#FCFFFF] font-normal">#{ticket.id}</span>
            <span className="text-[12px] text-[#92A5A8]">REPORTER</span>
            <span className="text-[#33C5E0] underline cursor-pointer">Shally poppy</span>
            <span className="text-[12px] text-[#92A5A8]">CATEGORY</span>
            <span className="text-[#FCFFFF] font-normal">Fraud</span>
            <span className="text-[12px] text-[#92A5A8]">PRIORITY</span>
            <span className="text-[#F87171] font-semibold">Low</span>
            <span className="text-[12px] text-[#92A5A8]">STATUS</span>
            <span className="text-[#F6C768] font-medium">Open</span>
            <span className="text-[12px] text-[#92A5A8]">ASSIGNED TO</span>
            <span className="text-[#FCFFFF] font-normal">Ebube</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#92A5A8] text-[13px]">Submitted</span>
            <span className="text-[#FCFFFF] text-[13px]">July 15th, 2025 11:59PM</span>
          </div>
        </div>
        {/* Sections */}
        <div className="flex flex-col gap-2">
          {/* Attached Documents */}
          <button className="w-full flex justify-between items-center py-3 px-4 bg-[#182024] rounded-[12px] text-[#BFC6C8] text-[14px] font-normal" onClick={() => setExpanded(expanded === "docs" ? null : "docs")}>Attached Documents <span className="ml-2"><Image src="/assets/icons/dropdown.svg" alt="dropdown" width={11} height={6} className={`transition-transform duration-200 ${expanded === "docs" ? "rotate-180" : "rotate-0"}`} /></span></button>
          {expanded === "docs" && (
            <div className="flex flex-wrap gap-3 mt-3 mb-2">
              {activeDoc !== null ? (
                <div className="w-full flex flex-col items-center mb-6">
                  <div className="w-[320px] h-[200px] rounded-[12px] overflow-hidden border border-[#33C5E0] bg-[#181F24] flex items-center justify-center relative mb-2 shadow-[0_0_24px_0_#33C5E0]">
                    <Image src={documents[activeDoc].src} alt={documents[activeDoc].label} width={320} height={200} className="object-contain" />
                    <button className="absolute top-2 right-2 text-[#33C5E0] bg-[#161E22] rounded-full px-2 py-1 text-xs font-bold shadow" onClick={() => setActiveDoc(null)}>
                      Close
                    </button>
                  </div>
                  <span className="text-[#FCFFFF] text-[13px] mt-1 text-center font-semibold">{documents[activeDoc].label}</span>
                  <div className="flex gap-2 mt-4">
                    {documents.map((doc, idx) => (
                      <button key={idx} className={`w-[60px] h-[40px] rounded-[6px] overflow-hidden border ${activeDoc === idx ? 'border-[#33C5E0]' : 'border-[#222C32]'} bg-[#181F24] flex items-center justify-center relative transition-all duration-150 cursor-pointer hover:scale-105`} onClick={() => setActiveDoc(idx)}>
                        <Image src={doc.src} alt={doc.label} width={60} height={40} className="object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                documents.map((doc, idx) => (
                  <div key={idx} className="flex flex-col items-center w-[110px] cursor-pointer" onClick={() => setActiveDoc(idx)}>
                    <div className="w-[110px] h-[70px] rounded-[8px] overflow-hidden border border-[#222C32] bg-[#181F24] flex items-center justify-center relative hover:border-[#33C5E0] transition-all duration-150">
                      <Image src={doc.src} alt={doc.label} width={110} height={70} className="object-contain" />
                      <span className="absolute bottom-2 right-2 text-[#33C5E0] text-xs">↗</span>
                    </div>
                    <span className="text-[#FCFFFF] text-[11px] mt-1 text-center truncate w-full">{doc.label}</span>
                  </div>
                ))
              )}
            </div>
          )}
          {/* Conversation Thread */}
          <button className="w-full flex justify-between items-center py-3 px-4 bg-[#182024] rounded-[12px] text-[#BFC6C8] text-[14px] font-normal" onClick={() => setExpanded(expanded === "thread" ? null : "thread")}>Conversation Thread <span className="ml-2"><Image src="/assets/icons/dropdown.svg" alt="dropdown" width={11} height={6} className={`transition-transform duration-200 ${expanded === "thread" ? "rotate-180" : "rotate-0"}`} /></span></button>
          {expanded === "thread" && (
            <div className="bg-[#182024] rounded-[12px] py-4 px-2 md:px-6 flex flex-col gap-4 mt-3 mb-2">
              {thread.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "admin" ? "justify-start" : "justify-end"}`}>
                  <div className={`flex items-center gap-3 ${msg.role === "admin" ? "bg-[#19232A]" : "bg-[#0F212E] border border-[#33C5E0]"} rounded-[12px] px-4 py-3 max-w-[80%]`}>
                    <Image src={msg.avatar} alt={msg.sender} width={32} height={32} className="rounded-full" />
                    <div>
                      <div className="text-[#BFC6C8] text-xs font-medium mb-1 flex items-center gap-1">
                        {msg.sender}
                        <span className="ml-2 text-[#92A5A8] text-xs">{msg.role === "admin" ? "Admin" : "Reporter"}</span>
                      </div>
                      <div className="text-[#FCFFFF] text-sm">{msg.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Notes */}
          <button className="w-full flex justify-between items-center py-3 px-4 bg-[#182024] rounded-[12px] text-[#BFC6C8] text-[14px] font-normal" onClick={() => setExpanded(expanded === "notes" ? null : "notes")}>Notes <span className="ml-2"><Image src="/assets/icons/dropdown.svg" alt="dropdown" width={11} height={6} className={`transition-transform duration-200 ${expanded === "notes" ? "rotate-180" : "rotate-0"}`} /></span></button>
          {expanded === "notes" && (
            <div className="bg-[#182024] rounded-[12px] py-4 px-2 md:px-6 mt-3 mb-2 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#BFC6C8] text-[13px]">{notes}</span>
                <button className="text-[#BFC6C8] text-xs flex items-center gap-1"><Image src="/assets/icons/edit.svg" alt="edit" width={16} height={16} />Edit Note</button>
              </div>
              <textarea className="w-full bg-[#161E22] rounded-[8px] p-2 text-[#FCFFFF] text-sm resize-none min-h-[40px]" defaultValue={notes} />
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-2">
          <button className="flex-1 cursor-pointer bg-[#222C32] text-[#FCFFFF] hover:bg-[#1C252A] rounded-full py-3 font-medium text-[14px] border border-[#222C32] flex items-center justify-center" onClick={() => setMessageOpen(true)}>
            <Image src="/assets/icons/message.svg" alt="message icon" width={16} height={16} className="inline-block mr-2" />
            <span>Message</span>
          </button>
          <button className="flex-1 cursor-pointer bg-[#33C5E0] text-[#161E22] hover:bg-cyan-600 rounded-full py-3 font-semibold text-[15px] border border-[#33C5E0] flex items-center justify-center" onClick={onClose}>
            <span className="mr-2">&#10005;</span> Close
          </button>
        </div>
        {/* Message Modal */}
        <MessageModal
          open={messageOpen}
          recipient={ticket?.user || "User"}
          onClose={() => setMessageOpen(false)}
          onSend={(subject, message) => {
            setMessageOpen(false);
            // You can add a toast or success modal here
          }}
        />
      </div>
    </div>
  );
};

export default DisputeModal;
