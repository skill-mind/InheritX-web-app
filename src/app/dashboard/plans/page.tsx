import React from "react";
import Image from "next/image";

const tabs = ["Plans", "Activities"];

const PlansPage = () => {
  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <section className="mb-0">
        <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
          Plans
        </h2>
        <p className="text-[12px] md:text-[14px] text-[#92A5A8]">
          Create and manage your inheritance plans
        </p>
      </section>
      <section className="bg-transparent p-0 md:p-2 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2 border-t border-t-[#1C252A]">
          <div className="flex gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-4 py-1 text-sm font-medium  transition-colors ${
                  idx === 0
                    ? "text-cyan-400 bg-[#1C252A] py-[12px] rounded-b-[24px] px-[18px] w-[70px] h-[48px] flex items-center"
                    : "text-[#BFC6C8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center text-[12px] font-normal gap-1 text-[#92A5A8] hover:underline">
            <Image
              src="/assets/icons/filter.svg"
              alt="filter icon"
              width={14}
              height={14}
              className="inline-block"
            />
            <span> Filter</span>
          </button>
        </div>
        <div className="flex flex-col bg-[#182024] rounded-[24px] py-[64px] px-[24px] min-h-[320px] items-center justify-center flex-1">
          <span className="text-[#FCFFFF] mb-2 text-center text-[18px] font-normal">
            You haven’t created any inheritance plans yet.
          </span>
          <span className="text-[#99A9A2] text-[12px] font-normal mb-8 text-center">
            Secure your digital legacy by creating your first plan.
          </span>
          <button className="flex items-center gap-2 w-fit text-[14px] px-6 py-3 font-medium rounded-[24px] border border-[#33C5E03D] bg-[#33C5E014] text-[#33C5E0] hover:bg-cyan-900/30 transition-colors">
            <Image
              src="/assets/icons/arrowdown.svg"
              alt="arrowdown icon"
              width={14}
              height={14}
              className="inline-block rotate-[270deg]"
            />
            Create Plan
          </button>
        </div>
      </section>
    </main>
  );
};

export default PlansPage;
