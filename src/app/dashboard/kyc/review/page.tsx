"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { KYCModal } from "./KYCModal";

const steps = [
  { label: "Personal Information" },
  { label: "ID Upload" },
  { label: "Selfie Verification" },
  { label: "Review" },
];

// Dummy data for preview
const initialKycData = {
  fullName: "John Doe",
  email: "johndoe@gmail.com",
  dob: "05/08/1999",
  address: "No. 9, gwari avenue, barnawa, kaduna",
  documents: [
    {
      src: "/assets/images/id-front.png",
      label: "ID - Front PNG",
    },
    {
      src: "/assets/images/id-back.png",
      label: "ID - Back PNG",
    },
    {
      src: "/assets/images/selfie.png",
      label: "Selfie",
    },
  ],
};

export default function KYCReviewPage() {
  const router = useRouter();
  const [kycData, setKycData] = useState(initialKycData);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    setKycData(initialKycData);
  }, []);

  function handleEditInfo() {
    router.push("/dashboard/kyc");
  }

  async function handleSubmitKYC() {
    // Simulate KYC submission
    try {
      // await submitKYC(kycData); // Replace with real API
      setModalType("success");
    } catch (e) {
      setModalType("error");
      console.log(e);
    }
  }

  function handleModalClose() {
    setModalType(null);
  }

  function handleModalContinue() {
    setModalType(null);
    if (modalType === "success") {
      router.push("/dashboard"); // Or wherever you want to go next
    }
  }

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full overflow-x-hidden max-w-full min-h-screen bg-transparent">
      <div className="flex items-center gap-4 mb-2">
        <button
          className="text-[#BFC6C8] text-[15px] flex items-center gap-2 cursor-pointer transition-all duration-150 ease-out hover:scale-105 active:scale-95"
          onClick={() => router.back()}
        >
          <Image
            src="/assets/icons/back.svg"
            alt="back"
            width={18}
            height={15}
          />
        </button>
        <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF]">
          KYC{" "}
          <span className="text-[#92A5A8] font-normal text-[14px] ml-2 mb-[4px]">
            | Please Verify Your Identity
          </span>
        </h2>
      </div>
      <div className="w-full flex flex-col gap-8 max-w-full">
        {/* Progress Steps */}
        <div className="flex flex-row items-center justify-between w-full mb-2 max-w-full overflow-x-auto">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex flex-col items-center flex-1 group cursor-pointer">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-150 ease-out transform ${
                  idx === 3
                    ? "border-cyan-400 bg-[#161E22]"
                    : "border-cyan-400 bg-[#33C5E0]"
                } group-hover:scale-105`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#33C5E0" />
                  <path
                    d="M6 10.5L9 13.5L14 8.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {idx < steps.length - 1 && <div className="kyc-step-bar" />}
              <div
                className={`mt-2 text-xs font-medium transition-colors duration-150 ${
                  idx === 3 ? "text-cyan-400" : "text-[#BFC6C8]"
                } group-hover:text-white`}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-[#FCFFFF] mb-2">
            KYC Summary{" "}
            <span className="text-[#92A5A8] text-sm font-normal">
              Check and confirm your details before submitting it
            </span>
          </h3>
          <div className="bg-[#161E22] rounded-[16px] p-6 mb-6">
            <table className="w-full text-left text-[#FCFFFF] text-[15px]">
              <tbody>
                <tr>
                  <td className="py-2 pr-6 text-[#92A5A8] font-medium">
                    FULL NAME
                  </td>
                  <td className="py-2">{kycData.fullName}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6 text-[#92A5A8] font-medium">
                    EMAIL
                  </td>
                  <td className="py-2">{kycData.email}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6 text-[#92A5A8] font-medium">
                    DATE OF BIRTH
                  </td>
                  <td className="py-2">{kycData.dob}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6 text-[#92A5A8] font-medium">
                    ADDRESS
                  </td>
                  <td className="py-2">{kycData.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <h4 className="text-[#FCFFFF] text-[15px] font-medium mb-2">
              Uploaded Documents
            </h4>
            <div className="flex flex-row flex-wrap gap-4 items-center bg-transparent">
              {kycData.documents.map((doc, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div tabIndex={0} role="button" className="w-[120px] h-[80px] bg-[#232B36] rounded-[12px] flex items-center justify-center overflow-hidden mb-2 transition-all duration-150 ease-out hover:scale-105 hover:shadow-md cursor-pointer">
                    <Image
                      src={doc.src}
                      alt={doc.label}
                      width={120}
                      height={80}
                      className="object-cover rounded-[12px]"
                    />
                  </div>
                  <span className="text-[#92A5A8] text-xs text-center">
                    {doc.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-8">
            <button
              type="button"
              className="bg-[#1C252A] text-[#33C5E0] border-none rounded-t-[8px] rounded-b-[24px] px-8 py-3 md:px-[48px] font-medium h-[56px] flex items-center gap-2 text-[14px] transition-all duration-150 ease-out hover:bg-[#232B36] hover:scale-105 active:scale-95 cursor-pointer"
              onClick={handleEditInfo}
            >
              EDIT INFO
              <Image
                src="/assets/icons/edit.svg"
                alt="edit icon"
                width={16}
                height={16}
                className="inline-block"
              />
            </button>
            <button
              type="button"
              className="bg-[#33C5E0] text-[#161E22] border-none rounded-t-[8px] rounded-b-[24px] px-8 py-3 md:px-[48px] font-medium h-[56px] flex items-center gap-2 text-[14px] transition-all duration-150 ease-out hover:bg-[#33C5E0]/90 hover:scale-105 active:scale-95 cursor-pointer"
              onClick={handleSubmitKYC}
            >
              SUBMIT KYC
              <Image
                src="/assets/icons/grey_arrowdown.svg"
                alt="arrow icon"
                width={13.5}
                height={13.5}
                className="inline-block"
              />
            </button>
          </div>
        </div>
      </div>
      <KYCModal
        type={modalType === "success" ? "success" : "error"}
        open={modalType !== null}
        onClose={handleModalClose}
        onContinue={handleModalContinue}
      />
      {/* <style jsx>{`
        .kyc-step-bar {
          flex: 1 1 auto;
          height: 2px;
          background: #181f25;
          margin: 10px 8px;
          border-radius: 2px;
          align-self: center;
          transition: background .15s ease, transform .15s ease;
        }
        @media (max-width: 600px) {
          .kyc-step-bar {
            margin-top: 8px;
          }
          .bg-[#161E22] {
            padding: 1rem !important;
          }
          .flex-row {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .w-[120px] {
            width: 90px !important;
          }
          .h-[80px] {
            height: 60px !important;
          }
          .px-8 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style> */}
    </main>
  );
}
