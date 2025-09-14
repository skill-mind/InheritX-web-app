"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SuccessModal from "../SuccessModal";

// Replace dummy previewData with props or context in real integration
interface Beneficiary {
  name: string;
  email: string;
  avatar: string;
  wallet: string;
  tag: string;
}
interface Asset {
  type: string;
  label: string;
  amount: number;
  percent: number;
}
interface Rule {
  claimCode: string;
  distribution: string;
}
interface LegalFile {
  name: string;
  url: string;
}
interface Trustee {
  name: string;
  phone: string;
  email: string;
}
interface PlanPreviewData {
  planName: string;
  description: string;
  beneficiary: Beneficiary;
  executionDate: string;
  assets: Asset[];
  rules: Rule;
  legalFiles: LegalFile[];
  trustees: Trustee[];
  note: string;
}

const PreviewPage = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  // Edit button handlers
  const handleEditPlan = () => router.push("/dashboard/plans/create");
  const handleEditAssets = () => router.push("/dashboard/plans/create/asset-allocation");
  const handleEditRules = () => router.push("/dashboard/plans/create/rules");
  const handleEditLegal = () => router.push("/dashboard/plans/create/rules-verification");
  const handleEditNotes = () => router.push("/dashboard/plans/create/rules");

  // Dummy data for preview (replace with actual state/context in integration)
  const previewData: PlanPreviewData = {
    planName: "My first daughter",
    description: "This is an inheritance for my baby girl. My first daughter",
    beneficiary: {
      name: "Juliet Johnson",
      email: "thejulietjohnson@gmail.com",
      avatar: "/assets/images/beneficiary2.svg",
      wallet: "0xajoe...Apro",
      tag: "Daughter"
    },
    executionDate: "18/04/2027",
    assets: [
      { type: "Token", label: "ETH", amount: 2, percent: 10 },
      { type: "NFT", label: "Monkey Art", amount: 3, percent: 30 },
      { type: "RWA", label: "Real World Asset", amount: 1, percent: 60 }
    ],
    rules: {
      claimCode: "120507",
      distribution: "Yearly Release of Funds (disbursement)"
    },
    legalFiles: [
      { name: "ID - Front PNG", url: "/assets/images/doc.svg" },
      { name: "ID - Back PNG", url: "/assets/images/doc.svg" },
      { name: "Selfie", url: "/assets/images/doc.svg" }
    ],
    trustees: [
      { name: "John Doe", phone: "+234 812 3455 678", email: "johndoe@gmail.com" }
    ],
    note: "Release funds monthly for upkeep of the property."
  };

  // Use previewData for now
  const data = previewData;

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 mb-2">
          <button className="text-[#BFC6C8] cursor-pointer text-[15px] flex items-center gap-2 hover-raise" onClick={() => router.back()}>
            <Image
              src="/assets/icons/back.svg"
              alt="back"
              width={18}
              height={15}
            />
          </button>
          <h2 className="text-lg md:text-2xl font-medium text-[#92A5A8]">
            Create New Plan
            <span className="text-[#FCFFFF] font-normal text-[14px] ml-2 mb-[4px]">| Preview</span>
          </h2>
        </div>
        <div>
          <button className="border border-[#33C5E03D] p-[14px] rounded-[24px] text-[#33C5E0] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer hover-raise clickable">
            <Image src="/assets/icons/plus.svg" alt="plus icon" width={14} height={14} className="inline-block mr-2" />
            <span>Save As Draft</span>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8">
        {/* Progress Steps */}
        <div className="flex flex-row items-center justify-between w-full mb-2">
          {[1, 2, 3, 4, 5].map((step, idx) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step <= 5 ? "border-cyan-400 bg-[#161E22]" : "border-[#232B36] bg-[#232B36]"} transition-shadow duration-300`}
              >
                {step < 5 ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5 9-9" stroke="#33C5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <span className={`text-[15px] font-semibold text-cyan-400`}>{step}</span>
                )}
              </div>
              <span className={`mt-2 text-xs font-medium ${step === 5 ? "text-cyan-400" : "text-[#BFC6C8]"}`}>
                {[
                  "Basic Information",
                  "Asset Allocation",
                  "Rules",
                  "Verification",
                  "Preview",
                ][idx]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[#BFC6C8] text-[15px] mb-4">Review Your Plan Before Finalizing</p>
        {/* Plan Summary */}
        <section className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4 transition-transform duration-300 hover:shadow-hover-lg group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">Plan Summary</h3>
              <button className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] hover-raise clickable" onClick={handleEditPlan}>
                <Image src="/assets/icons/edit.svg" alt="edit" width={16} height={16} />
                Edit Plan
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
              <div><span className="font-semibold text-[#FCFFFF]">PLAN NAME:</span> {data.planName}</div>
              <div><span className="font-semibold text-[#FCFFFF]">DESCRIPTION:</span> {data.description}</div>
              <div><span className="font-semibold text-[#FCFFFF]">BENEFICIARY:</span> <span className="inline-flex items-center gap-2"><Image src={data.beneficiary.avatar} alt={data.beneficiary.name} width={24} height={24} className="rounded-full" />{data.beneficiary.name}</span></div>
              <div><span className="font-semibold text-[#FCFFFF]">EMAIL:</span> {data.beneficiary.email}</div>
              <div><span className="font-semibold text-[#FCFFFF]">WALLET ADDRESS:</span> {data.beneficiary.wallet}</div>
              <div><span className="font-semibold text-[#FCFFFF]">EXECUTION DATE:</span> {data.executionDate}</div>
            </div>
          </div>
          {/* Assets */}
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4 transition-transform duration-300 hover:shadow-hover-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">Assets</h3>
              <button className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] hover-raise clickable" onClick={handleEditAssets}>
                <Image src="/assets/icons/edit.svg" alt="edit" width={16} height={16} />
                Edit Assets
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
              {data.assets.map((a, idx) => (
                <div key={idx} className="flex items-center gap-4 hover-raise clickable px-2 py-2 rounded-md">
                  <span className="font-semibold text-[#FCFFFF]">{a.type}:</span>
                  <span>{a.label}</span>
                  <span className="ml-auto">Amount: {a.amount}</span>
                  <span>%: {a.percent}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Rules & Conditions */}
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4 transition-transform duration-300 hover:shadow-hover-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">Rules & Conditions</h3>
              <button className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] hover-raise clickable" onClick={handleEditRules}>
                <Image src="/assets/icons/edit.svg" alt="edit" width={16} height={16} />
                Edit Rules
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[#BFC6C8] text-[15px]">
              <div><span className="font-semibold text-[#FCFFFF]">CLAIM CODE:</span> {data.rules.claimCode}</div>
              <div><span className="font-semibold text-[#FCFFFF]">DISTRIBUTION:</span> {data.rules.distribution}</div>
            </div>
          </div>
          {/* Legal Settings */}
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4 transition-transform duration-300 hover:shadow-hover-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">Legal Settings</h3>
              <button className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] hover-raise clickable" onClick={handleEditLegal}>
                <Image src="/assets/icons/edit.svg" alt="edit" width={16} height={16} />
                Edit Legal
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-6">
                {data.legalFiles.map((file, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-[120px] h-[120px] bg-[#232B36] rounded-[12px] flex items-center justify-center overflow-hidden image-tile clickable">
                      <Image src={file.url} alt={file.name} width={120} height={120} className="object-cover" />
                    </div>
                    <span className="text-[#BFC6C8] text-xs mt-2 text-center max-w-[120px] truncate">{file.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-[#FCFFFF] text-[15px] font-semibold mb-2">Assigned Trustees</h4>
                {data.trustees.map((t, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 text-[#33C5E0] hover-raise clickable">
                    <span>{t.name}</span>
                    <span>{t.phone}</span>
                    <span>{t.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Notes */}
          <div className="bg-[#161E22] border border-[#232B36] rounded-[18px] p-6 mb-4 transition-transform duration-300 hover:shadow-hover-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FCFFFF] text-lg font-medium">Notes</h3>
              <button className="flex items-center gap-2 text-[#33C5E0] border border-[#33C5E03D] px-4 py-2 rounded-[24px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] hover-raise clickable" onClick={handleEditNotes}>
                <Image src="/assets/icons/edit.svg" alt="edit" width={16} height={16} />
                Edit Notes
              </button>
            </div>
            <div className="text-[#BFC6C8] text-[15px]">{data.note}</div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button className="bg-[#1C252A] border-none text-[#33C5E0] px-8 py-3 rounded-t-[8px] rounded-b-[24px] font-medium md:w-[243px] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors hover-raise clickable">SAVE AS DRAFT</button>
            <button className="bg-[#33C5E0] text-[#161E22] px-8 py-3 rounded-t-[8px] rounded-b-[24px] font-medium text-[14px] md:min-w-[243px] hover:bg-[#33C5E0]/90 transition-colors hover-raise clickable" onClick={() => setShowSuccess(true)}>
              SAVE & PUBLISH PLAN <Image src="/assets/icons/grey_arrowdown.svg" alt="arrow icon" width={18} height={18} className="inline-block ml-2" />
            </button>
          </div>
        </section>
      </div>
      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onContinue={() => { setShowSuccess(false); router.push("/dashboard/plans"); }}
      />

      <style jsx>{`
        .hover-raise {
          transition: transform .18s cubic-bezier(.2,.9,.2,1), box-shadow .18s ease, background-color .12s ease;
        }
        .hover-raise:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 30px rgba(17,24,28,0.45);
        }
        .card-hover {
          transition: transform .16s ease, box-shadow .16s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(12,18,20,0.35);
        }
        .image-tile {
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .image-tile:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(0,0,0,0.35);
        }
        .clickable { cursor: pointer; }
        .button-focus:focus-visible { outline: 2px solid rgba(51,197,224,0.25); outline-offset: 2px; border-radius: 8px; }
      `}</style>
    </main>
  );
};

export default PreviewPage;
