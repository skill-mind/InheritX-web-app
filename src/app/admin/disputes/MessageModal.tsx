"use client";

import React, { useState } from "react";
import Image from "next/image";
import MessageSuccessModal from "./MessageSuccessModal";

interface MessageModalProps {
  open: boolean;
  recipient: string;
  onClose: () => void;
  onSend: (subject: string, message: string) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ open, recipient, onClose, onSend }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});
  const [successOpen, setSuccessOpen] = useState(false);

  if (!open && !successOpen) return null;

  function validate() {
    const errs: { subject?: string; message?: string } = {};
    if (!subject.trim()) errs.subject = "Subject is required.";
    if (!message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSend(subject, message);
      setSubject("");
      setMessage("");
      setErrors({});
      setSuccessOpen(true);
    }
  }

  function handleHome() {
    setSuccessOpen(false);
    onClose();
  }

  function handleNext() {
    setSuccessOpen(false);
    onClose();
    // Optionally trigger next request logic
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161E22]/80 backdrop-blur-[6px]">
          <form className="relative w-full max-w-xl mx-4 md:mx-0 md:w-[600px] rounded-[24px] bg-[#161E22] border border-[#2A3338] p-6 md:p-10 shadow-xl z-10 flex flex-col gap-6 max-h-[95vh] overflow-y-auto" onSubmit={handleSend}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <button type="button" onClick={onClose} className="text-[#92A5A8] text-[14px] font-medium flex items-center cursor-pointer">
                <span className="mr-2">
                    <Image src="/assets/icons/back.svg" alt="back" width={15} height={12.5} />
                </span>
                <span>MESSAGE &quot;{recipient.toUpperCase()}&quot;</span>
              </button>
            </div>
            {/* Subject */}
            <div>
              <label className="block text-[#BFC6C8] text-sm mb-2">Subject</label>
              <input
                type="text"
                className={`w-full rounded-[12px] bg-[#182024] text-[#FCFFFF] px-4 py-3 text-[15px] border-none outline-none placeholder:text-[#92A5A8] ${errors.subject ? "border border-red-500" : ""}`}
                placeholder="Input A Subject For This Message"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
              {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
            </div>
            {/* Message */}
            <div>
              <label className="block text-[#BFC6C8] text-sm mb-2">Message</label>
              <textarea
                className={`w-full rounded-[12px] bg-[#182024] text-[#FCFFFF] px-4 py-3 text-[15px] border-none outline-none min-h-[120px] resize-none placeholder:text-[#92A5A8] ${errors.message ? "border border-red-500" : ""}`}
                placeholder="Text"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
            </div>
            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-2">
              <button type="button" className="flex-1 cursor-pointer bg-[#222C32] text-[#FCFFFF] hover:bg-[#1C252A] rounded-full py-3 font-medium text-[15px] border border-[#222C32]" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="flex-1 cursor-pointer bg-[#33C5E0] text-[#161E22] hover:bg-cyan-600 rounded-full py-3 font-semibold text-[15px] border border-[#33C5E0]">
                Send Message
              </button>
            </div>
          </form>
        </div>
      )}
      <MessageSuccessModal
        open={successOpen}
        recipient={recipient}
        onHome={handleHome}
        onNext={handleNext}
      />
    </>
  );
};

export default MessageModal;
