"use client";

import React, { useState } from "react";
import Image from "next/image";

const inactivityOptions = ["3 Months", "6 Months", "1 Year", "1 Month"];

const InactivityPage = () => {
  const [selected, setSelected] = useState("6 Months");
  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full max-w-2xl">
      <section className="mb-2">
        <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
          Inactivity Set-up
        </h2>
        <p className="text-[12px] md:text-[14px] text-[#92A5A8]">
          Define the condition under which your inheritance plans kicks in.
        </p>
      </section>
      <form className="flex flex-col gap-6 w-full">
        <div>
          <label className="block text-[#FCFFFF] text-[12px] mb-2">
            Inactivity Duration
          </label>
          <div className="flex flex-col gap-3">
            {inactivityOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="inactivity"
                  value={option}
                  checked={selected === option}
                  onChange={() => setSelected(option)}
                  className="accent-cyan-400 w-4 h-[40px] rounded-[12px] border border-[#1C252A] py-[8px] px-[16px]"
                />
                <span className="text-[#BFC6C8] text-[14px]">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[#FCFFFF] text-[12px] mb-2">
            Beneficiary Name
          </label>
          <input
            type="text"
            value="Juliet Johnson"
            readOnly
            className="w-full bg-[#181F28] border border-[#1C252A] rounded-[12px] px-4 py-3 text-[#425558] placeholder:text-[14px] placeholder:text-[#425558] text-[14px] outline-none"
          />
        </div>
        <div>
          <label className="block text-[#FCFFFF] text-[12px] mb-2">
            Beneficiary Email
          </label>
          <input
            type="email"
            placeholder="e.g. thejulietjohnson@gmail.com"
            className="w-full bg-[#181F28] border border-[#1C252A] rounded-[12px] px-4 py-3 text-[#425558] placeholder:text-[14px] placeholder:text-[#425558] text-[14px] outline-none"
          />
        </div>
        <div>
          <label className="block text-[#FCFFFF] text-[12px] mb-2">
            Claim Code
          </label>
          <input
            type="text"
            value="123456"
            readOnly
            className="w-full bg-[#181F28] border border-[#1C252A] rounded-[12px] px-4 py-3 text-[#425558] placeholder:text-[14px] placeholder:text-[#425558] text-[14px] outline-none"
          />
        </div>
        <span className="border border-none mb-[-1rem] text-[#33C5E0] text-[12px]">
          Claim Code Mechanism
        </span>

        <div className="bg-[#182F32] border border-[#33C5E03D] rounded-lg p-4 text-[#33C5E0] text-[12px]">
          The code would be sent to the email of your beneficiary if you are
          inactive for a set period of time. With the claim code, your
          beneficiary would be able to claim the assets from the inheritance
          plans you have set.
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 w-fit text-[14px] px-8 py-3 font-medium rounded-[16px] bg-[#1C252A] h-[60px] rounded-t-[8px] rounded-b-[24px] justify-center text-[#FCFFFF] border border-[#232B36] hover:bg-cyan-900/30 transition-colors mt-2"
        >
          <span>SAVE SETTINGS</span>
          <Image
            src="/assets/icons/white_arrowdown.svg"
            alt="arrow right icon"
            width={13.5}
            height={13.5}
            className="inline-block rotate-[270px]"
          />
        </button>
      </form>
    </main>
  );
};

export default InactivityPage;
