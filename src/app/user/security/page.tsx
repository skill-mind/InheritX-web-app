"use client";

import React, { useState } from "react";
import Image from "next/image";
import TwoFAModal from "./TwoFAModal";
import TwoFASuccessModal from "./TwoFASuccessModal";
import FingerprintModal from "./FingerprintModal";
import FaceIDModal from "./FaceIDModal";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 group cursor-pointer ${
        checked ? "bg-cyan-400" : "bg-[#232B36]"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        } group-hover:scale-105`}
      />
    </button>
  );
}

const SecurityPage = () => {
  const [twoFA, setTwoFA] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [show2FASuccess, setShow2FASuccess] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  const [faceID, setFaceID] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [showFingerprintModal, setShowFingerprintModal] = useState(false);
  const [showFaceIDModal, setShowFaceIDModal] = useState(false);

  // Example QR code and manual key (replace with real values from backend)
  const qrCodeUrl = "/assets/images/qr_placeholder.svg"; // Place a real QR code image here
  const manualKey = "123456789098";

  const handle2FAToggle = (checked: boolean) => {
    if (checked) {
      setShow2FAModal(true);
    } else {
      setTwoFA(false);
    }
  };

  const handle2FAContinue = () => {
    setShow2FAModal(false);
    setShow2FASuccess(true);
  };

  const handle2FAModalClose = () => {
    setShow2FAModal(false);
    setTwoFA(false);
  };

  const handle2FASuccessClose = () => {
    setShow2FASuccess(false);
    setTwoFA(true);
  };

  const handleFingerprintToggle = (checked: boolean) => {
    if (checked) {
      setShowFingerprintModal(true);
    } else {
      setFingerprint(false);
    }
  };

  const handleFingerprintContinue = () => {
    setShowFingerprintModal(false);
    setFingerprint(true);
  };

  const handleFingerprintModalClose = () => {
    setShowFingerprintModal(false);
    setFingerprint(false);
  };

  const handleFaceIDToggle = (checked: boolean) => {
    if (checked) {
      setShowFaceIDModal(true);
    } else {
      setFaceID(false);
    }
  };

  const handleFaceIDContinue = () => {
    setShowFaceIDModal(false);
    setFaceID(true);
  };

  const handleFaceIDModalClose = () => {
    setShowFaceIDModal(false);
    setFaceID(false);
  };

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full max-w-3xl">
      <section className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
            Security
          </h2>
          <p className="text-[12px] md:text-[14px] text-[#92A5A8]">
            Manage how you protect your account
          </p>
        </div>
        <div className="flex flex-col gap-3 items-end">
          <span className="bg-[#0C220D] font-semibold border border-[#1E3F1F] rounded-[24px] text-[#0DA314] text-xs px-[12px] py-[6px] flex items-center">
            <Image
              src="/assets/icons/green_check.svg"
              alt="green check icon"
              width={21}
              height={21}
              className="inline-block mr-2"
            />
            <span>ACCOUNT IS SECURED</span>
          </span>
          <span className="text-[#92A5A8] font-normal text-[13px]">
            Your account is secured. Add 2FA?
          </span>
        </div>
      </section>
      <div className="flex flex-col gap-6">
        <div className="mb-4">
          <div className="text-[#FCFFFF] text-[18px] font-medium mb-5">
            Two-Factor Authentication
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#BFC6C8] font-normal text-[14px] ml-[1rem] cursor-default">
              Enable Two-Factor Authentication
            </span>
            <Toggle checked={twoFA} onChange={handle2FAToggle} />
          </div>
        </div>
        <div className="mb-4">
          <div className="text-[#FCFFFF] text-[18px] font-medium mb-2 flex items-center gap-2">
            Device Management{" "}
            <span className="text-[#FCFFFF] text-xs font-normal ml-[1rem]">
              You are logged in on 2 devices
            </span>
          </div>
          <div className="bg-[#182024] rounded-xl py-[16px] px-[24px] flex flex-col gap-3 transition-shadow duration-150 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="bg-transparent text-[12px] text-[#92A5A8] text-xs px-3 py-1 rounded-full mr-2">
                DESKTOP
              </span>
              <span className="text-[#FCFFFF] text-[14px] font-normal flex-1 ml-4">
                Mac M1
              </span>
              <button className="bg-[#1C252A] border border-[#2A3338] py-[8px] px-[16px] text-[#BFC6C8] text-xs rounded-[24px] text-[12px] font-semibold ml-2 transition-transform duration-150 hover:scale-105 cursor-pointer">
                LOG OUT
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="bg-transparent text-[12px] text-[#92A5A8] text-xs px-3 py-1 rounded-full mr-2">
                MOBILE
              </span>
              <span className="text-[#FCFFFF] text-[14px] font-normal flex-1 ml-4">
                Samsung S21 FE
              </span>
              <button className="bg-[#1C252A] border border-[#2A3338] py-[8px] px-[16px] text-[#BFC6C8] text-xs rounded-[24px] text-[12px] font-semibold ml-2 transition-transform duration-150 hover:scale-105 cursor-pointer">
                LOG OUT
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-[#FCFFFF] font-medium mb-2 text-[18px]">
            Biometric Authentication
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#BFC6C8] text-[14px] border border-[#1C252A] px-3 py-2 rounded-md cursor-pointer transition-colors duration-150 hover:bg-[#1C252A]">
              Enable Fingerprint
            </span>
            <Toggle checked={fingerprint} onChange={handleFingerprintToggle} />
          </div>
          <div className="flex items-center justify-between mt-[2rem]">
            <span className="text-[#BFC6C8] text-[14px] border border-[#1C252A] px-3 py-2 rounded-md cursor-pointer transition-colors duration-150 hover:bg-[#1C252A]">
              Enable Face ID
            </span>
            <Toggle checked={faceID} onChange={handleFaceIDToggle} />
          </div>
        </div>
        <div className="mb-4">
          <div className="text-[#FCFFFF] font-medium mb-2 text-[18px]">
            Security Alerts{" "}
            <span className="text-[#92A5A8] text-xs font-normal ml-4">
              Get notified of suspicious activity
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#BFC6C8] text-[14px] cursor-default">Notify by email</span>
            <Toggle checked={emailAlert} onChange={setEmailAlert} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <button className="flex items-center gap-2 w-fit text-[14px] px-8 py-3 font-medium rounded-t-[8px] rounded-b-[24px] bg-[#1C252A] h-[48px]  text-[#33C5E0] border border-[#232B36] hover:bg-cyan-900/30 transition duration-150 hover:scale-105 cursor-pointer focus:outline-none mt-2">
            SAVE SETTINGS
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M5 12h14m-7-7l7 7-7 7"
                stroke="#33C5E0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="bg-[#1C252A] w-[80px] h-[8px] rounded-[12px]"></div>
        </div>
      </div>
      <TwoFAModal
        open={show2FAModal}
        onClose={handle2FAModalClose}
        qrCodeUrl={qrCodeUrl}
        manualKey={manualKey}
        onContinue={handle2FAContinue}
      />
      <TwoFASuccessModal
        open={show2FASuccess}
        onClose={handle2FASuccessClose}
      />
      <FingerprintModal
        open={showFingerprintModal}
        onClose={handleFingerprintModalClose}
        onContinue={handleFingerprintContinue}
      />
      <FaceIDModal
        open={showFaceIDModal}
        onClose={handleFaceIDModalClose}
        onContinue={handleFaceIDContinue}
      />
    </main>
  );
};

export default SecurityPage;
