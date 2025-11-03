"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Types for the plan prop
interface Beneficiary {
  name: string;
  email: string;
  avatar: string;
  link: string;
}

interface Plan {
  name: string;
  description: string;
  beneficiary: Beneficiary;
  assets: string;
  wallet: string;
  executeOn: string;
  rules?: {
    claimCode: string;
    trigger: string;
    distribution: string;
    escalation: string;
  };
  legalDocs?: { label: string; src: string }[];
  trustee?: {
    name: string;
    phone: string;
    email: string;
  };
  notes?: string;
}

interface InheritancePlanModalProps {
  open: boolean;
  onClose: () => void;
  plan: Plan;
}

const defaultRules = {
  claimCode: "126507",
  trigger:
    "If beneficiary is under 18, their share is held in trust until thet turn 18.",
  distribution: "Yearly Release of Funds(disbursement)",
  escalation:
    "If my daughter is unable to receive it, let her brother receive it on her behalf.",
};
const defaultLegalDocs = [
  { label: "ID - Front PNG", src: "/assets/images/doc.svg" },
  { label: "ID - Back PNG", src: "/assets/images/doc.svg" },
  { label: "Selfie", src: "/assets/images/faceid.svg" },
];
const defaultTrustee = {
  name: "John Doe",
  phone: "+234 812 3456 678",
  email: "Johndoe@gmail.com",
};

const InheritancePlanModal: React.FC<InheritancePlanModalProps> = ({
  open,
  onClose,
  plan,
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  if (!open) return null;

  const rules = {
    claimCode: plan.rules?.claimCode || defaultRules.claimCode,
    trigger: plan.rules?.trigger || defaultRules.trigger,
    distribution: plan.rules?.distribution || defaultRules.distribution,
    escalation: plan.rules?.escalation || defaultRules.escalation,
  };
  const legalDocs = plan.legalDocs || defaultLegalDocs;
  const trustee = plan.trustee || defaultTrustee;
  const notes =
    plan.notes || "Release funds monthly for upkeep of the property.";

  return (
    <div className="fixed inset-0 z-[9999] flex items-start md:items-center justify-center bg-[#161E22]/80 bg-opacity-60">
      <main className="flex flex-col gap-6 p-2 md:p-8 w-full max-w-2xl bg-[#161E22] border border-[#2A3338] rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#232B2F] scrollbar-track-transparent mt-0 md:mt-0">
        <div className="flex items-center justify-between m-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={onClose}
              className="focus:outline-none cursor-pointer"
            >
              <Image
                src="/assets/icons/arrowback.svg"
                alt="back icon"
                width={15}
                height={12.5}
              />
            </button>
            <h2 className="font-medium text-[14px] text-[#92A5A8]">
              INHERITANCE PLANS
            </h2>
          </div>
          <div className="w-[70px] h-[26px] rounded-[24px] border border-[#1E3F1F] bg-[#1B311C] text-[12px] text-[#0DA314] font-semibold flex items-center justify-center">
            Active
          </div>
        </div>
        <section className="bg-transparent">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2 m-4">
              <span className="text-[16px] md:text-[18px] font-medium text-[#FCFFFF]">
                Plan Summary
              </span>
              <button
                className="px-6 py-2 rounded-[24px] bg-[#182024] border border-[#1C252A] text-[#425558] text-[12px] font-semibold hover:bg-cyan-400 hover:text-black cursor-pointer transition-colors hover-raise clickable"
                onClick={onClose}
              >
                VIEW CLAIM
              </button>
            </div>
            <div className="bg-[#161E22] rounded-[16px] p-4 md:p-6 w-full text-[13px] md:text-[15px] text-[#FCFFFF]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div className="font-semibold text-[#92A5A8] text-[12px]">
                  PLAN NAME
                </div>
                <div className="text-[#FCFFFF] text-[14px] font-normal">
                  {plan.name}
                </div>
                <div className="font-semibold text-[#92A5A8] text-[12px]">
                  DESCRIPTION
                </div>
                <div className="text-[#FCFFFF] text-[14px] font-normal">
                  {plan.description}
                </div>
                <div className="font-semibold text-[#92A5A8] text-[12px]">
                  BENEFICIARY
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={plan.beneficiary.avatar}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <Link
                    href={plan.beneficiary.link}
                    className="text-[#33C5E0] underline"
                  >
                    {plan.beneficiary.name}
                  </Link>
                </div>
                <div className="font-semibold text-[#92A5A8] text-[12px]">
                  ASSETS
                </div>
                <div className="text-[#FCFFFF] text-[14px] font-normal">
                  {plan.assets}
                </div>
                <div className="font-semibold text-[#92A5A8] text-[12px]">
                  EMAIL
                </div>
                <div>
                  <a
                    href={`mailto:${plan.beneficiary.email}`}
                    className="text-[#33C5E0] underline"
                  >
                    {plan.beneficiary.email}
                  </a>
                </div>
                <div className="font-semibold text-[#92A5A8] text-[12px]">
                  WALLET ADDRESS
                </div>
                <div className="text-[#FCFFFF] text-[14px] font-normal">
                  {plan.wallet}
                </div>
                <div className="font-semibold text-[#92A5A8] text-[12px]">
                  EXECUTE ON
                </div>
                <div className="text-[#FCFFFF] text-[14px] font-normal">
                  {plan.executeOn}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Expandable Sections */}
        <section className="w-full flex flex-col gap-4 mt-4">
          {/* Assets */}
          <div className="bg-[#161E22] rounded-[16px]">
            <button
              className="w-full flex justify-between items-center px-4 py-4 text-[#BFC6C8] text-[14px] font-normal focus:outline-none clickable button-focus"
              onClick={() =>
                setOpenSection(openSection === "assets" ? null : "assets")
              }
            >
              Assets
              <span>{openSection === "assets" ? "▲" : "▼"}</span>
            </button>
            {openSection === "assets" && (
              <div className="px-4 pb-4 flex flex-col gap-6">
                {/* Tokens */}
                <div>
                  <div className="text-[#92A5A8] text-[12px] font-normal mb-2">
                    Tokens
                  </div>
                  <div className="bg-transparent rounded-[12px] p-2 flex flex-col md:flex-row items-stretch justify-between gap-4 clickable">
                    {/* 1st col: Dropdown */}
                    <div className="w-[55%] flex items-center gap-3 min-w-0 bg-[#182024] rounded-[12px] p-2">
                      <button className="flex items-center gap-2 bg-transparent px-2 py-1 rounded-[8px] border-none focus:outline-none justify-between w-full">
                        <span className="flex items-center gap-2 min-w-0">
                          <Image
                            src="/assets/icons/eth.svg"
                            alt="ETH"
                            width={24}
                            height={24}
                          />
                          <span className="font-normal text-[#FCFFFF] text-[14px] truncate">
                            ETH
                          </span>
                        </span>
                        <span className="ml-2 text-[#BFC6C8] text-[16px]">
                          <img src="/assets/icons/grey_dropdown.svg" alt="" />
                        </span>
                      </button>
                    </div>
                    {/* 2nd col: Amount */}
                    <div className="w-[40%] flex items-start justify-between md:items-center gap-2 min-w-[100px] bg-[#182024] rounded-[12px] p-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#FCFFFF] text-[14px] font-semibold">
                          2
                        </span>
                        <span className="text-[#92A5A8] text-[10px] font-normal">
                          $4,257.62
                        </span>
                      </div>

                      <button className="flex items-center justify-center bg-[#33C5E014] w-[46px] h-[23px] rounded-[12px] px-4 py-1 border border-[#33C5E03D] text-[#33C5E0] text-[10px] font-normal hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors">
                        MAX
                      </button>
                    </div>
                    {/* 3rd col: Percentage */}
                    <div className="w-[5%] flex items-center justify-end min-w-[80px] bg-[#182024] rounded-[12px] p-2">
                      <span className="text-[#FCFFFF] font-normal text-[14px]">
                        10%
                      </span>
                    </div>
                  </div>
                </div>
                {/* NFTs */}
                <div>
                  <div className="text-[#92A5A8] text-[12px] font-normal mb-2">
                    NFTs
                  </div>
                  <div className="bg-transparent rounded-[12px] p-2 flex flex-col md:flex-row items-stretch justify-between gap-4 clickable">
                    {/* 1st col: Dropdown */}
                    <div className="w-[55%] flex items-center gap-3 min-w-0 bg-[#182024] rounded-[12px] p-2">
                      <button className="flex items-center gap-2 bg-transparent px-2 py-1 rounded-[8px] border-none focus:outline-none w-full justify-between">
                        <span className="flex items-center gap-2 min-w-0">
                          <Image
                            src="/assets/icons/nft1.svg"
                            alt="Monkey Art"
                            width={24}
                            height={24}
                          />
                          <span className="font-normal text-[#FCFFFF] text-[14px] truncate">
                            Monkey Art
                          </span>
                        </span>
                        <span className="ml-2 text-[#BFC6C8] text-[16px]">
                          <img src="/assets/icons/grey_dropdown.svg" alt="" />
                        </span>
                      </button>
                    </div>
                    {/* 2nd col: Amount */}
                    <div className="w-[40%] flex items-start justify-between md:items-center gap-2 min-w-[100px] bg-[#182024] rounded-[12px] p-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#FCFFFF] text-[14px] font-semibold">
                          3
                        </span>
                        <span className="text-[#92A5A8] text-[10px] font-normal">
                          $690.13
                        </span>
                      </div>

                      <button className="flex items-center justify-center bg-[#33C5E014] w-[46px] h-[23px] rounded-[12px] px-4 py-1 border border-[#33C5E03D] text-[#33C5E0] text-[10px] font-normal hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors">
                        MAX
                      </button>
                    </div>
                    {/* 3rd col: Percentage */}
                    <div className="w-[5%] flex items-center justify-end min-w-[80px] bg-[#182024] rounded-[12px] p-2">
                      <span className="text-[#FCFFFF] font-normal text-[14px]">
                        30%
                      </span>
                    </div>
                  </div>
                </div>
                {/* RWA */}
                <div>
                  <div className="text-[#92A5A8] text-[12px] font-normal mb-2">
                    RWA
                  </div>
                  <div className="bg-transparent rounded-[12px] p-2 flex flex-col md:flex-row items-stretch justify-between gap-4 clickable">
                    {/* 1st col: Dropdown */}
                    <div className="w-[55%] flex items-center gap-3 min-w-0 bg-[#182024] rounded-[12px] p-2">
                      <button className="flex items-center gap-2 bg-transparent px-2 py-1 rounded-[8px] border-none focus:outline-none w-full justify-between">
                        <span className="flex items-center gap-2 min-w-0">
                          <Image
                            src="/assets/icons/rwa.svg"
                            alt="Real World Asset"
                            width={24}
                            height={24}
                          />
                          <div className="flex flex-col items-start gap-0">
                          <span className="font-normal text-[#FCFFFF] text-[14px] truncate">
                            Real World Asset
                          </span>
                          <span className="text-[#92A5A8] text-[13px] truncate">
                            Mercedes-Benz S-Class
                          </span>
                          </div>
                        </span>
                        <span className="ml-2 text-[#BFC6C8] text-[16px]">
                          <img src="/assets/icons/grey_dropdown.svg" alt="" />
                        </span>
                      </button>
                    </div>
                    {/* 2nd col: Amount */}
                    <div className="w-[40%] flex items-start justify-between md:items-center gap-2 min-w-[100px] bg-[#182024] rounded-[12px] p-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#FCFFFF] text-[14px] font-semibold">
                          1
                        </span>
                        <span className="text-[#92A5A8] text-[10px] font-normal">
                          $117,750
                        </span>
                      </div>

                      <button className="flex items-center justify-center bg-[#33C5E014] w-[46px] h-[23px] rounded-[12px] px-4 py-1 border border-[#33C5E03D] text-[#33C5E0] text-[10px] font-normal hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors">
                        MAX
                      </button>
                    </div>
                    {/* 3rd col: Percentage */}
                    <div className="w-[5%] flex items-center justify-end bg-[#182024] rounded-[12px] p-2">
                      <span className="text-[#FCFFFF] font-normal text-[14px]">
                        60%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Rules & Conditions */}
          <div className="bg-[#161E22] rounded-[16px]">
            <button
              className="w-full flex justify-between items-center px-4 py-4 text-[#BFC6C8] text-[14px] font-normal focus:outline-none hover-raise clickable button-focus"
              onClick={() =>
                setOpenSection(openSection === "rules" ? null : "rules")
              }
            >
              Rules & Conditions
              <span>{openSection === "rules" ? "▲" : "▼"}</span>
            </button>
            {openSection === "rules" && (
              <div className="pb-4 flex flex-col gap-4 bg-[#182024] py-[16px] px-[24px] rounded-[12px] ml-[1rem]">
                <div className="flex flex-row items-center gap-2">
                  <span className="font-semibold text-[12px] text-[#92A5A8] w-[120px]">
                    TRIGGER
                  </span>
                  <span className="text-[#FCFFFF] text-[12px] font-normal flex-1">
                    {rules.trigger}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="font-semibold text-[12px] text-[#92A5A8] w-[120px]">
                    DISTRIBUTION
                  </span>
                  <span className="text-[#FCFFFF] text-[12px] font-normal flex-1">
                    {rules.distribution}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="font-semibold text-[12px] text-[#92A5A8] w-[120px]">
                    ESCALATION
                  </span>
                  <span className="text-[#FCFFFF] text-[12px] font-normal flex-1">
                    {rules.escalation}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Legal Settings */}
          <div className="bg-[#161E22] rounded-[16px]">
            <button
              className="w-full flex justify-between items-center px-4 py-4 text-[#BFC6C8] text-[14px] font-normal focus:outline-none hover-raise clickable button-focus"
              onClick={() =>
                setOpenSection(openSection === "legal" ? null : "legal")
              }
            >
              Legal Settings
              <span>{openSection === "legal" ? "▲" : "▼"}</span>
            </button>
            {openSection === "legal" && (
              <div className="px-4 pb-4 flex flex-col gap-4 ml-[1rem]">
                <span className="text-[14px] text-[#FCFFFF]">
                  Attached Documents
                </span>
                <div className="flex gap-4 flex-wrap bg-[#182024] py-[16px] px-[24px] rounded-[12px]">
                  {legalDocs.map((doc, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <Image
                        src={doc.src}
                        alt={doc.label}
                        width={80}
                        height={80}
                        className="rounded-[8px]"
                      />
                      <span className="text-[#BFC6C8] text-[12px]">
                        {doc.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <span className="font-normal text-[14px] text-[#FCFFFF] mb-4">
                    Assigned Trustee:
                  </span>
                  <div className="flex flex-col gap-2 mt-2 bg-[#182024] py-[16px] px-[24px] rounded-[12px]">
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-[#92A5A8] text-[12px] font-semibold w-[120px]">
                        Name
                      </span>
                      <span className="text-[#FCFFFF] text-[14px] font-normal flex-1">
                        {trustee.name}
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-[#92A5A8] text-[12px] font-semibold w-[120px]">
                        Phone Number
                      </span>
                      <span className="text-[#FCFFFF] text-[14px] font-normal flex-1">
                        {trustee.phone}
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-[#92A5A8] text-[12px] font-semibold w-[120px]">
                        Email
                      </span>
                      <a
                        href={`mailto:${trustee.email}`}
                        className="text-[#33C5E0] underline text-[14px] font-normal flex-1"
                      >
                        {trustee.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Notes */}
          <div className="bg-[#161E22] rounded-[16px]">
            <button
              className="w-full flex justify-between items-center px-4 py-4 text-[#BFC6C8] text-[14px] font-normal focus:outline-none hover-raise clickable button-focus"
              onClick={() =>
                setOpenSection(openSection === "notes" ? null : "notes")
              }
            >
              Notes
              <span>{openSection === "notes" ? "▲" : "▼"}</span>
            </button>
            {openSection === "notes" && (
              <div className="px-4 pb-4">
                <span className="text-[#FCFFFF] text-[14px] font-normal">
                  {notes}
                </span>
              </div>
            )}
          </div>
        </section>
        <style jsx>{`
          .hover-raise {
            transition: transform 0.16s cubic-bezier(0.2, 0.9, 0.2, 1),
              box-shadow 0.16s ease;
          }
          .hover-raise:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(3, 10, 14, 0.36);
          }
          .image-tile {
            transition: transform 0.18s ease, box-shadow 0.18s ease;
          }
          .image-tile:hover {
            transform: scale(1.03);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
          }
          .clickable {
            cursor: pointer;
          }
          .button-focus:focus-visible {
            outline: 2px solid rgba(51, 197, 224, 0.12);
            outline-offset: 2px;
            border-radius: 8px;
          }
        `}</style>
      </main>
    </div>
  );
};

export default InheritancePlanModal;
