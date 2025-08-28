"use client";

import Image from "next/image";
import { useState } from "react";
import MessageUserModal from "./tab/user-verification-modals/MessageUserModal";
import MessageUserSuccessModal from "./tab/user-verification-modals/MessageUserSuccessModal";

export interface Document {
  src: string;
  label: string;
}

export interface UserVerificationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  user: {
    fullName: string;
    username: string;
    email: string;
    dateSubmitted: string;
    verificationType: string;
    status: string;
    documents: Document[];
    activityHistory: { text: string; date: string }[];
    notes: string;
  };
}

export default function UserVerificationRequestModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
  user,
}: UserVerificationRequestModalProps) {
  const [expandedDocIdx, setExpandedDocIdx] = useState<number | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);
  if (!isOpen) return null;

  // Expanded document modal
  const renderExpandedDoc = () => {
    if (expandedDocIdx === null) return null;
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#161E22]/90 backdrop-blur-[6px]">
        <div className="relative w-full max-w-3xl mx-4 md:mx-0 rounded-[24px] bg-[#161E22] border border-[#2A3338] p-6 shadow-xl flex flex-col items-center">
          {/* Header */}
          <div className="flex items-center w-full mb-4 justify-between">
            <span className="flex items-center text-[#92A5A8] text-[14px] font-medium cursor-pointer" onClick={() => setExpandedDocIdx(null)}>
              <Image src="/assets/icons/arrowback.svg" alt="back Icon" width={15} height={12.5} className="inline-block mr-2" />
              <span>{user.documents[expandedDocIdx].label}</span>
            </span>
            <button onClick={() => setExpandedDocIdx(null)} className="text-[#BFC6C8] hover:text-[#33C5E0] text-2xl font-bold absolute top-4 right-6 md:static">&times;</button>
          </div>
          {/* Expanded Image */}
          <div className="flex items-center justify-center w-full mb-6 relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#222C32] p-2 text-white hover:bg-[#33C5E0] w-[46px] h-[48px] rounded-l-[24px] rounded-r-[8px] flex items-center justify-center"
              onClick={() => setExpandedDocIdx((prev) => prev! > 0 ? prev! - 1 : user.documents.length - 1)}
            >
              <Image src="/assets/icons/arrowback.svg" alt="prev" width={18} height={15} />
            </button>
            <div className="mx-auto">
              <Image src={user.documents[expandedDocIdx].src} alt={user.documents[expandedDocIdx].label} width={600} height={400} className="object-contain max-h-[60vh] rounded-[12px]" />
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1C252A] rounded-full p-2 text-white hover:bg-[#33C5E0] w-[46px] h-[48px] rounded-r-[24px] rounded-l-[8px] flex items-center justify-center"
              onClick={() => setExpandedDocIdx((prev) => prev! < user.documents.length - 1 ? prev! + 1 : 0)}
            >
              <Image src="/assets/icons/arrowforward.svg" alt="next" width={18} height={15} />
            </button>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-2 w-full justify-center">
            {user.documents.map((doc, idx) => (
              <div key={idx} className={`flex flex-col items-center w-[90px] md:w-[110px] cursor-pointer ${idx === expandedDocIdx ? 'ring-2 ring-[#33C5E0]' : ''}`} onClick={() => setExpandedDocIdx(idx)}>
                <div className="w-[90px] h-[60px] md:w-[110px] md:h-[70px] rounded-[8px] overflow-hidden border border-[#222C32] bg-[#181F24] flex items-center justify-center">
                  <Image src={doc.src} alt={doc.label} width={120} height={120} className="object-contain" />
                </div>
                <span className="text-[#FCFFFF] text-[11px] mt-1 text-center truncate w-full">{doc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-[#161E22]/80 backdrop-blur-[6px] transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Modal content */}
      <div className="relative w-full max-w-2xl mx-4 md:mx-0 md:w-[700px] rounded-[24px] bg-[#161E22] border border-[#2A3338] p-6 md:p-10 shadow-xl z-10 flex flex-col gap-6 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span
            onClick={onClose}
            className="text-[#92A5A8] text-[14px] font-medium flex items-center"
          >
            <Image
              src="/assets/icons/back.svg"
              alt="back Icon"
              width={15}
              height={12.5}
              className="inline-block mr-2"
            />
            <span>USER VERIFICATION REQUEST</span>
          </span>
          <div className="w-fit flex items-center justify-center h-[26px] text-[#92A5A8] text-[12px] bg-[#2A3338] border border-[#39494F] rounded-[24px] py-[6px] px-[10px]">
            LOW PRIORITY
          </div>
        </div>
        {/* Request Summary */}
        <div>
          <div className="flex items-center justify-between mb-[3rem]">
            <h2 className="text-[#FCFFFF] text-[16px] font-medium">
              Request Summary
            </h2>
            <div className="flex items-center text-[#92A5A8] text-[12px]">
              <span className="">Issued</span>
              <div className="bg-[#2A3338] w-[4px] h-[16px] rounded-[12px] mr-2 ml-2"></div>
              <div>July 15th, 2025 11:59PM</div>
            </div>
          </div>
          <div className="flex flex-col gap-x-8 gap-y-4 text-[14px]">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
              <span className="text-[12px] text-[#92A5A8]">FULL NAME</span>
              <span className="text-[#FCFFFF] font-normal">
                {user.fullName}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
              <span className="text-[12px] text-[#92A5A8]">USERNAME</span>
              <span className="text-[#FCFFFF] font-normal lowercase">
                
                @{user.username}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
              <span className="text-[12px] text-[#92A5A8]">EMAIL</span>
              <a
                href={`mailto:${user.email}`}
                className="text-[#92A5A8] text-[14px] underline font-medium"
              >
                {user.email}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
              <span className="text-[12px] text-[#92A5A8]">DATE SUBMITTED</span>
              <span className="text-[#FCFFFF] font-normal">
                {user.dateSubmitted}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
              <span className="text-[12px] text-[#92A5A8]">
                VERIFICATION TYPE
              </span>
              <span className="text-[#FCFFFF] font-normal">
                {user.verificationType}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px] mb-[2rem]">
              <span className="text-[12px] text-[#92A5A8]">CURRENT STATUS</span>
              <span className="text-[#F6C768] font-medium">{user.status}</span>
            </div>
          </div>
        </div>
        {/* Attached Documents */}
        <div className="mb-[2rem]">
          <span className="text-[#BFC6C8] text-[14px] font-normal mb-2 block">
            Attached Documents
          </span>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {user.documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center w-[90px] md:w-[110px] cursor-pointer"
                onClick={() => setExpandedDocIdx(idx)}
              >
                <div className="w-[90px] h-[60px] md:w-[110px] md:h-[70px] rounded-[8px] overflow-hidden border border-[#222C32] bg-[#181F24] flex items-center justify-center">
                  <Image
                    src={doc.src}
                    alt={doc.label}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <span className="text-[#FCFFFF] text-[11px] mt-1 text-center truncate w-full">
                  {doc.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {renderExpandedDoc()}
        {/* Activity History */}
        <div className="mb-[2rem]">
          <span className="text-[#BFC6C8] text-[14px] font-normal mb-2 block">
            Activity History
          </span>
          <div className="bg-[#182024] rounded-[12px] py-[16px] px-[24px] flex flex-col gap-1 text-[13px]">
            {user.activityHistory.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-y-4 justify-between"
              >
                <span className="text-[#92A5A8]">{item.text}</span>
                <span className="text-[#92A5A8]">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Notes */}
        <div>
          <span className="text-[#92A5A8] text-[14px] font-normal mb-2 block">
            Notes
          </span>
          <div className="bg-[#182024] rounded-[12px] py-[16px] px-[24px] text-[13px] text-[#BFC6C8] min-h-[40px]">
            {user.notes}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-2">
          <button
            className="flex-1 bg-[#222C32] text-[#FCFFFF] hover:bg-[#1C252A] rounded-full py-3 font-medium text-[14px] border border-[#222C32]"
            onClick={() => setShowMessageModal(true)}
          >
            <Image
              src="/assets/icons/message.svg"
              alt="message icon"
              width={16}
              height={16}
              className="inline-block mr-2"
            />
            <span> Message User</span>
          </button>
          <button
            className="flex-1 bg-[#222C32] text-[#F87171] hover:bg-[#1C252A] rounded-full py-3 font-medium text-[14px] border border-[#222C32]"
            onClick={onReject}
          >
            <Image
              src="/assets/icons/prohibit.svg"
              alt="prohitbit icon"
              width={16}
              height={16}
              className="inline-block mr-2"
            />
            <span> Reject KYC</span>
          </button>
          <button
            className="flex-1 bg-[#33C5E0] text-[#161E22] hover:bg-cyan-600 rounded-full py-3 font-semibold text-[15px] border border-[#33C5E0]"
            onClick={onApprove}
          >
            <Image
              src="/assets/icons/profile_check.svg"
              alt="profile_check icon"
              width={16}
              height={16}
              className="inline-block mr-2"
            />
            <span> Approve KYC</span>
          </button>
        </div>
        <MessageUserModal
          isOpen={showMessageModal}
          userFullName={user.fullName}
          onClose={() => setShowMessageModal(false)}
          onSend={(subject, message) => {
            setShowMessageModal(false);
            setShowMessageSuccess(true);
          }}
        />
        <MessageUserSuccessModal
          isOpen={showMessageSuccess}
          userFullName={user.fullName}
          onClose={() => setShowMessageSuccess(false)}
          onNext={() => setShowMessageSuccess(false)}
        />
      </div>
    </div>
  );
}
