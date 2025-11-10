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

export default function KYCSelfiePage() {
  const router = useRouter();
  const [selfie, setSelfie] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);

  async function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreaming(true);
        }
      } catch (err) {
        alert("Unable to access camera. Please check your device permissions.");
        console.error(err);
      }
    }
  }

  async function handleCapture() {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setSelfie(canvasRef.current.toDataURL("image/png"));
      stopCamera();
    }
  }

  function stopCamera() {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setStreaming(false);
    }
  }

  function handleContinue() {
    router.push("/user/kyc/review");
  }

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full overflow-x-hidden max-w-full min-h-screen bg-transparent">
      <div className="flex items-center gap-4 mb-2">
        <button
          className="text-[#BFC6C8] text-[15px] flex items-center gap-2 cursor-pointer transition-colors duration-150 hover:text-white"
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
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition duration-150 transform ${
                  idx === 2
                    ? "border-cyan-400 bg-[#161E22]"
                    : idx < 2
                    ? "border-cyan-400 bg-[#33C5E0]"
                    : "border-[#232B36] bg-[#232B36]"
                } hover:scale-105 cursor-pointer`}
              >
                {idx < 2 ? (
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
                    className={`text-[15px] font-semibold transition-colors duration-150 ${
                      idx === 2 ? "text-cyan-400" : "text-[#BFC6C8]"
                    }`}
                  >
                    {idx + 1}
                  </span>
                )}
              </div>
              {idx < steps.length - 1 && <div className="kyc-step-bar" />}
              <div
                className={`mt-2 text-xs font-medium transition-colors duration-150 ${
                  idx === 2 ? "text-cyan-400" : "text-[#BFC6C8]"
                }`}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[#BFC6C8] text-[15px] mb-4">
          Take a selfie to confirm you&apos;re the rightful owner of this ID.
        </p>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-center text-[#FCFFFF] text-[17px] mb-2">
            Position your face within the frame{" "}
            <span className="text-[#92A5A8] text-xs">
              (e.g Passport, Driver&apos;s License or National ID)
            </span>
          </p>
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="border-2 border-dashed border-[#33C5E0] rounded-[50%] w-[220px] h-[320px] flex items-center justify-center bg-[#161E22] relative transition duration-150 hover:shadow-md">
              {!selfie ? (
                streaming ? (
                  <video
                    ref={videoRef}
                    width={180}
                    height={240}
                    autoPlay
                    playsInline
                    className="rounded-[50%] object-cover cursor-pointer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#425558] text-[15px]">
                    Camera Preview
                  </div>
                )
              ) : (
                <Image
                  src={selfie}
                  alt="Selfie Preview"
                  width={180}
                  height={240}
                  className="rounded-[50%] object-cover cursor-pointer"
                />
              )}
              <canvas
                ref={canvasRef}
                width={320}
                height={400}
                className="hidden"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2 rounded-[12px] border border-[#33C5E0] text-[#33C5E0] bg-[#10171d] transition duration-150 hover:bg-[#181f25] hover:scale-105 cursor-pointer mt-6"
              onClick={streaming ? handleCapture : startCamera}
            >
              <svg width="20" height="20" fill="none">
                <path
                  d="M4 7V6a2 2 0 012-2h8a2 2 0 012 2v1"
                  stroke="#33C5E0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="4"
                  y="7"
                  width="12"
                  height="9"
                  rx="2"
                  stroke="#33C5E0"
                  strokeWidth="2"
                />
                <circle
                  cx="10"
                  cy="11.5"
                  r="2"
                  stroke="#33C5E0"
                  strokeWidth="2"
                />
              </svg>
              {streaming ? "Capture Image" : "Capture Image"}
            </button>
          </div>
        </div>
        <div className="flex justify-start mt-8">
          <button
            type="button"
            className="bg-[#33C5E0] w-[243px] text-[#161E22] text-center px-8 py-3 font-medium rounded-[16px] h-[56px] rounded-t-[8px] rounded-b-[24px] flex items-center gap-2 border border-[#232B36] text-[14px] transition duration-150 hover:bg-[#33C5E0]/90 hover:scale-105 cursor-pointer"
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
      </div>
      {/* <style jsx>{`
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
          .rounded-[50%] {
            width: 140px !important;
            height: 180px !important;
          }
        }
      `}</style> */}
    </main>
  );
}
