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
    distribution: string;
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
  distribution: "Yearly Release of funds (disbursement)",
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

  const rules = plan.rules || defaultRules;
  const legalDocs = plan.legalDocs || defaultLegalDocs;
  const trustee = plan.trustee || defaultTrustee;
  const notes =
    plan.notes || "Release funds monthly for upkeep of the property.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <main className="flex flex-col gap-6 p-2 md:p-8 w-full max-w-2xl bg-[#10181B] rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#FCFFFF] text-lg cursor-pointer hover-raise clickable button-focus"
          aria-label="Close modal"
        >
          <Image
            src="/assets/icons/x.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF]">
            Claim Plan
          </h2>
          <span className="text-[#92A5A8] text-[12px] md:text-[14px] ml-2">
            To transfer inheritance to your wallet, click on the &apos;Withdraw&apos;
            button
          </span>
        </div>
        <section className="bg-transparent">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full items-center mb-2">
              <span className="text-[16px] md:text-[18px] font-medium text-[#FCFFFF]">
                Plan Summary
              </span>
              <button
                className="px-6 py-2 rounded-[24px] bg-[#33C5E014] border border-[#33C5E03D] text-[#33C5E0] text-[12px] font-semibold hover:bg-cyan-400 hover:text-black cursor-pointer transition-colors hover-raise clickable"
                onClick={onClose}
              >
                CLOSE
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
              className="w-full flex justify-between items-center px-4 py-4 text-[#33C5E0] text-[14px] font-normal focus:outline-none hover-raise clickable button-focus"
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
                  <div className="bg-[#182024] rounded-[12px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover-raise clickable">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/assets/icons/eth.svg"
                        alt="ETH"
                        width={20}
                        height={20}
                      />
                      <span className="font-normal text-[#FCFFFF] text-[14px]">
                        ETH
                      </span>
                    </div>
                    <div className="flex flex-col items-start md:items-center gap-1">
                      <span className="text-[#FCFFFF] text-[15px] font-bold">2</span>
                      <span className="text-[#92A5A8] text-[13px]">
                        $4,257.62
                      </span>
                    </div>
                    <span className="text-[#FCFFFF] font-normal text-[14px]">
                      10%
                    </span>
                    <button
                      className="cursor-pointer px-6 py-2 rounded-[24px] bg-[#33C5E0] text-[#161E22] text-[13px] font-semibold hover:bg-cyan-400 transition-colors hover-raise clickable"
                      onClick={onClose}
                    >
                      WITHDRAW
                    </button>
                  </div>
                </div>
                {/* NFTs */}
                <div>
                  <div className="text-[#92A5A8] text-[12px] font-normal mb-2">
                    NFTs
                  </div>
                  <div className="bg-[#182024] rounded-[12px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover-raise clickable">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/assets/icons/nft1.svg"
                        alt="Monkey Art"
                        width={20}
                        height={20}
                      />
                      <span className="font-normal text-[#FCFFFF] text-[14px]">
                        Monkey Art
                      </span>
                    </div>
                    <div className="flex flex-col items-start md:items-center gap-1">
                      <span className="text-[#FCFFFF] text-[15px] font-bold">3</span>
                      <span className="text-[#92A5A8] text-[13px]">$850.00</span>
                    </div>
                    <span className="text-[#FCFFFF] font-normal text-[14px]">
                      30%
                    </span>
                    <button
                      className="cursor-pointer px-6 py-2 rounded-[24px] bg-[#33C5E0] text-[#161E22] text-[13px] font-semibold hover:bg-cyan-400 transition-colors hover-raise clickable"
                      onClick={onClose}
                    >
                      WITHDRAW
                    </button>
                  </div>
                </div>
                {/* RWA */}
                <div>
                  <div className="text-[#92A5A8] text-[12px] font-normal mb-2">
                    RWA
                  </div>
                  <div className="bg-[#182024] rounded-[12px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover-raise clickable">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/assets/icons/rwa.svg"
                        alt="Real World Asset"
                        width={20}
                        height={20}
                      />
                      <span className="font-normal text-[#FCFFFF] text-[14px]">
                        Real World Asset
                      </span>
                      <span className="text-[#92A5A8] text-[13px] ml-2">
                        Mercedes-Benz S-Class
                      </span>
                    </div>
                    <div className="flex flex-col items-start md:items-center gap-1">
                      <span className="text-[#FCFFFF] text-[15px] font-bold">1</span>
                      <span className="text-[#92A5A8] text-[13px]">$17,750</span>
                    </div>
                    <span className="text-[#FCFFFF] font-normal text-[14px]">
                      60%
                    </span>
                    <button
                      className="cursor-pointer px-6 py-2 rounded-[24px] bg-[#33C5E0] text-[#161E22] text-[13px] font-semibold hover:bg-cyan-400 transition-colors hover-raise clickable"
                      onClick={onClose}
                    >
                      WITHDRAW
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Rules & Conditions */}
          <div className="bg-[#161E22] rounded-[16px]">
            <button
              className="w-full flex justify-between items-center px-4 py-4 text-[#33C5E0] text-[14px] font-normal focus:outline-none hover-raise clickable button-focus"
              onClick={() =>
                setOpenSection(openSection === "rules" ? null : "rules")
              }
            >
              Rules & Conditions
              <span>{openSection === "rules" ? "▲" : "▼"}</span>
            </button>
            {openSection === "rules" && (
              <div className="px-4 pb-4 flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-[12px] text-[#92A5A8]">
                    CLAIM CODE:
                  </span>
                  <span className="text-[#FCFFFF] text-[12px] font-normal">
                    {rules.claimCode}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-[12px] text-[#92A5A8]">
                    DISTRIBUTION:
                  </span>
                  <span className="text-[#FCFFFF] text-[12px] font-normal">
                    {rules.distribution}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Legal Settings */}
          <div className="bg-[#161E22] rounded-[16px]">
            <button
              className="w-full flex justify-between items-center px-4 py-4 text-[#33C5E0] text-[14px] font-normal focus:outline-none hover-raise clickable button-focus"
              onClick={() =>
                setOpenSection(openSection === "legal" ? null : "legal")
              }
            >
              Legal Settings
              <span>{openSection === "legal" ? "▲" : "▼"}</span>
            </button>
            {openSection === "legal" && (
              <div className="px-4 pb-4 flex flex-col gap-4">
                <div className="flex gap-4 flex-wrap">
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
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[#92A5A8] text-[12px] font-semibold">
                      Name: {trustee.name}
                    </span>
                    <span className="text-[#FCFFFF] font-normal text-[14px]">
                      Phone No: {trustee.phone}
                    </span>
                    <span className="text-[#92A5A8] text-[12px] font-semibold">
                      Email:{" "}
                      <a
                        href={`mailto:${trustee.email}`}
                        className="text-[#33C5E0] underline"
                      >
                        {trustee.email}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Notes */}
          <div className="bg-[#161E22] rounded-[16px]">
            <button
              className="w-full flex justify-between items-center px-4 py-4 text-[#33C5E0] text-[14px] font-normal focus:outline-none hover-raise clickable button-focus"
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
