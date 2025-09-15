"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const steps = [
  { label: "Personal Information" },
  { label: "ID Upload" },
  { label: "Selfie Verification" },
  { label: "Review" },
];

export default function KYCIdUploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((f) => URL.createObjectURL(f)));
  }

  function handleUploadClick() {
    inputRef.current?.click();
  }

  function handleContinue() {
    // TODO: Save file, go to next step
    router.push("/dashboard/kyc/selfie-verification");
  }

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full overflow-x-hidden max-w-full min-h-screen bg-transparent">
      <div className="flex items-center gap-4 mb-2">
        <button
          className="text-[#BFC6C8] text-[15px] flex items-center gap-2"
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
            <div key={step.label} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  idx === 1
                    ? "border-cyan-400 bg-[#161E22]"
                    : idx < 1
                    ? "border-cyan-400 bg-[#33C5E0]"
                    : "border-[#232B36] bg-[#232B36]"
                }`}
              >
                {idx < 1 ? (
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
                ) : (
                  <span
                    className={`text-[15px] font-semibold ${
                      idx === 1 ? "text-cyan-400" : "text-[#BFC6C8]"
                    }`}
                  >
                    {idx + 1}
                  </span>
                )}
              </div>
              {idx < steps.length - 1 && <div className="kyc-step-bar" />}
              <div
                className={`mt-2 text-xs font-medium ${
                  idx === 1 ? "text-cyan-400" : "text-[#BFC6C8]"
                }`}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[#BFC6C8] text-[15px] mb-4">
          Upload your government issued ID card to continue
        </p>
        <form
          className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="block text-[#FCFFFF] text-[13px] mb-2">
            Upload ID{" "}
            <span className="text-[#92A5A8] text-xs">
              (e.g Passport, Driver&apos;s License or National ID)
            </span>
            <div className="mt-4 w-full flex justify-center">
              <div className="border-2 border-dashed border-[#33C5E0] rounded-[16px] w-full max-w-xl min-h-[220px] flex flex-col items-center justify-center bg-[#161E22] p-6 relative">
                {previews.length > 0 ? (
                  <div className="flex flex-row flex-wrap gap-4 justify-center items-center w-full">
                    {previews.map((src, idx) => (
                      <div key={idx} className="flex-shrink-0">
                        <Image
                          src={src}
                          alt={`ID Preview ${idx + 1}`}
                          width={260}
                          height={160}
                          className="object-contain rounded-[12px]"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[#425558] text-[15px] mb-4 text-center">
                    Upload pictures of your government issued ID card
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  ref={inputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-2 rounded-[12px] border border-[#33C5E0] text-[#33C5E0] bg-[#10171d] hover:bg-[#181f25] transition-colors mt-4"
                  onClick={handleUploadClick}
                >
                  <svg width="20" height="20" fill="none">
                    <path
                      d="M10 14V6M10 6L7 9M10 6l3 3"
                      stroke="#33C5E0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="3"
                      y="3"
                      width="14"
                      height="14"
                      rx="7"
                      stroke="#33C5E0"
                      strokeWidth="2"
                    />
                  </svg>
                  Upload File
                </button>
              </div>
            </div>
          </label>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              className="bg-[#33C5E0] w-[243px] text-[#161E22] text-center px-8 py-3 font-medium rounded-[16px] h-[56px] rounded-t-[8px] rounded-b-[24px] flex items-center gap-2 border border-[#232B36] text-[14px] transition-colors hover:bg-[#33C5E0]/90 disabled:bg-[#1C252A] disabled:text-[#425558] disabled:cursor-not-allowed"
              disabled={files.length === 0}
              onClick={handleContinue}
            >
              CONTINUE
              <Image
                src="/assets/icons/grey_arrowdown.svg"
                alt="arrow icon"
                width={13.5}
                height={13.5}
                className="inline-block"
              />
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .kyc-step-bar {
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: #181f25;
          z-index: -1;
        }
        @media (max-width: 600px) {
          .kyc-step-bar {
            top: 16px;
          }
          .border-dashed {
            min-height: 160px;
            padding: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
