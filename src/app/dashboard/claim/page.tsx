import React from "react";
import Image from "next/image";

const tabs = ["Claims", "Activities"];

const ClaimPage = () => {
  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <section className="">
        <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
          Claim Plan
        </h2>
        <p className="text-[12px] md:text-[14px] text-[#92A5A8]">
          Claim your inheritance plan
        </p>
      </section>
      <section className="bg-transparent p-0 md:p-2 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2 border-t border-t-[#1C252A]">
          <div className="flex gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-4 py-1 text-sm font-medium transition-colors ${
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
        <div className="flex flex-col bg-[#182024] rounded-[24px] py-[32px] px-[12px] md:px-[24px] min-h-[224px] items-center justify-center flex-1 w-full overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-left text-[#92A5A8] text-[14px] font-normal">
                <th className="py-3 px-2">Plan Name/ ID</th>
                <th className="py-3 px-2">Assets</th>
                <th className="py-3 px-2">Beneficiary</th>
                <th className="py-3 px-2">Trigger</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#232B36] text-[#FCFFFF] text-[14px]">
                <td className="py-4 px-2">
                  <div className="flex flex-col">
                    <span className="font-normal text-[14px]">Plan Name</span>
                    <span className="text-[#92A5A8] text-[10px]">
                      Unique ID
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">2 ETH</td>
                <td className="py-4 px-2">3</td>
                <td className="py-4 px-2">
                  <span className="bg-[#2A3338] w-fit h-[26px] flex items-center justify-center text-[#BFC6C8] text-[12px] px-3 py-1 rounded-full border border-[#39494F]">
                    INACTIVITY (6 MONTHS)
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className="bg-[#33C5E014] border border-[#33C5E03D] rounded-[24px] text-cyan-400 text-[12px] px-3 py-1">
                    ACTIVE
                  </span>
                </td>
                <td className="py-4 px-2">
                  <button className="w-full text-[12px] md:w-[160px] py-2 rounded-full bg-[#33C5E0] text-[#161E22] font-semibold hover:bg-cyan-400 transition-colors">
                    CLAIM PLAN
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ClaimPage;
