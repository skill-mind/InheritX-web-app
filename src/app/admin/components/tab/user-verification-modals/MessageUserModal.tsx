"use client";

import { useState } from "react";
import Image from "next/image";

interface MessageUserModalProps {
  isOpen: boolean;
  userFullName: string;
  onClose: () => void;
  onSend: (subject: string, message: string) => void;
}

export default function MessageUserModal({
  isOpen,
  userFullName,
  onClose,
  onSend,
}: MessageUserModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const subjectError = touched && subject.trim() === "";
  const messageError = touched && message.trim() === "";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/90 backdrop-blur-[6px]">
      <div className="relative w-[812px] h-[510px] mx-4 md:mx-0 rounded-[24px] bg-[#161E22] border border-[#2A3338] p-8 md:p-12 shadow-xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center mb-2">
          <button onClick={onClose} className="mr-2">
            <Image src="/assets/icons/back.svg" alt="back" width={18} height={15} />
          </button>
          <span className="text-[#92A5A8] text-[14px] font-medium">
            MESSAGE "{userFullName.toUpperCase()}"
          </span>
        </div>
        {/* Form */}
        <form
          className="flex flex-col gap-6"
          onSubmit={e => {
            e.preventDefault();
            setTouched(true);
            if (subject.trim() && message.trim()) {
              onSend(subject, message);
              setSubject("");
              setMessage("");
              setTouched(false);
            }
          }}
        >
          <div>
            <label className="block text-[#92A5A8] text-[12px] mb-1">Subject</label>
            <input
              className={`w-full bg-transparent border border-[#2A3338] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] focus:outline-none focus:border-[#33C5E0] ${subjectError ? 'border-[#F87171]' : ''}`}
              value={subject}
              onChange={e => setSubject(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Enter subject"
            />
            {subjectError && <span className="text-[#F87171] text-[12px]">Subject is required</span>}
          </div>
          <div>
            <label className="block text-[#92A5A8] text-[14px] mb-1">Message</label>
            <textarea
              className={`w-full bg-transparent border border-[#2A3338] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] min-h-[100px] focus:outline-none focus:border-[#33C5E0] ${messageError ? 'border-[#F87171]' : ''}`}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Enter your message"
            />
            {messageError && <span className="text-[#F87171] text-[12px]">Message is required</span>}
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
            <button
              type="button"
              className="flex-1 bg-[#222C32] text-[#FCFFFF] hover:bg-[#1C252A] rounded-full py-3 font-medium text-[16px] border border-[#222C32]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#33C5E0] text-[#161E22] hover:bg-cyan-600 rounded-full py-3 font-semibold text-[16px] border border-[#33C5E0] disabled:opacity-60"
              disabled={!subject.trim() || !message.trim()}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
