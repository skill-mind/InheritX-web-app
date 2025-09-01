"use client";

import React, { useState } from "react";
import Image from "next/image";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
        checked ? "bg-cyan-400" : "bg-[#232B36]"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const SecurityPage = () => {
  const [twoFA, setTwoFA] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  const [faceID, setFaceID] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

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
            <span className="text-[#BFC6C8] font-normal text-[14px] ml-[1rem]">
              Enable Two-Factor Authentication
            </span>
            <Toggle checked={twoFA} onChange={setTwoFA} />
          </div>
        </div>
        <div className="mb-4">
          <div className="text-[#FCFFFF] text-[18px] font-medium mb-2 flex items-center gap-2">
            Device Management{" "}
            <span className="text-[#FCFFFF] text-xs font-normal ml-[1rem]">
              You are logged in on 2 devices
            </span>
          </div>
          <div className="bg-[#182024] rounded-xl py-[16px] px-[24px] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="bg-transparent text-[12px] text-[#92A5A8] text-xs px-3 py-1 rounded-full mr-2">
                DESKTOP
              </span>
              <span className="text-[#FCFFFF] text-[14px] font-normal flex-1 ml-4">
                Mac M1
              </span>
              <button className="bg-[#1C252A] border border-[#2A3338] py-[8px] px-[16px] text-[#BFC6C8] text-xs rounded-[24px] text-[12px] font-semibold ml-2">
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
              <button className="bg-[#1C252A] border border-[#2A3338] py-[8px] px-[16px] text-[#BFC6C8] text-xs rounded-[24px] text-[12px] font-semibold ml-2">
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
            <span className="text-[#BFC6C8] text-[14px] border border-[#1C252A]">
              Enable Fingerprint
            </span>
            <Toggle checked={fingerprint} onChange={setFingerprint} />
          </div>
          <div className="flex items-center justify-between mt-[2rem]">
            <span className="text-[#BFC6C8] text-[14px] border border-[#1C252A]">
              Enable Face ID
            </span>
            <Toggle checked={faceID} onChange={setFaceID} />
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
            <span className="text-[#BFC6C8] text-[14px]">Notify by email</span>
            <Toggle checked={emailAlert} onChange={setEmailAlert} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <button className="flex items-center gap-2 w-fit text-[14px] px-8 py-3 font-medium rounded-t-[8px] rounded-b-[24px] bg-[#1C252A] h-[48px]  text-[#33C5E0] border border-[#232B36] hover:bg-cyan-900/30 transition-colors mt-2">
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
    </main>
  );
};

export default SecurityPage;
