import React, { useState } from "react";
import Image from "next/image";

interface InheritancePlan {
  id: number;
  planId: string;
  creator: string;
  status: string;
  beneficiaries: number;
  creationDate: string;
  claimDate: string;
}

interface Props {
  plans: InheritancePlan[];
}

const InheritancePlanTable: React.FC<Props> = ({ plans }) => {
  const [actionOpenIdx, setActionOpenIdx] = useState<number | null>(null);

  return (
    <div className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[8px] sm:px-[16px] md:px-[24px] overflow-x-auto">
      {/* Desktop Table */}
      <table className="w-full text-left hidden md:table">
        <thead>
          <tr className="text-[#92A5A8] text-[14px] font-normal border-b border-[#1C252A]">
            <th className="py-3 px-2">Plan/Creator</th>
            <th className="py-3 px-2">Plan Status</th>
            <th className="py-3 px-2">Beneficiaries</th>
            <th className="py-3 px-2">Creation Date</th>
            <th className="py-3 px-2">Claim Date</th>
            <th className="py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, idx) => (
            <tr key={plan.id} className="border-b border-[#1C252A] text-[#FCFFFF] text-[15px]">
              <td className="py-4 px-2 font-normal">
                <div className="flex flex-col">
                  <span className="flex items-center gap-2">
                    <span className="text-[#425558] text-[14px] w-4 inline-block">{idx + 1}.</span>
                    <span className="font-semibold text-[14px] text-[#FCFFFF]">{plan.planId}</span>
                  </span>
                  <span className="text-[#92A5A8] text-[12px] ml-[1.4rem]">{plan.creator}</span>
                </div>
              </td>
              <td className="py-4 px-2">
                <span className="bg-[#1B311C] text-[#3ED16B] text-[12px] w-[70px] h-[26px] flex items-center justify-center font-semibold px-6 py-1 rounded-[16px] border border-[#1E3F1F]">{plan.status}</span>
              </td>
              <td className="py-4 px-2 font-normal text-[14px] text-[#BFC6C8]">{plan.beneficiaries}</td>
              <td className="py-4 px-2 text-[#92A5A8] text-[14px]">{plan.creationDate}</td>
              <td className="py-4 px-2 text-[#FCFFFF] text-[14px]">{plan.claimDate}</td>
              <td className="py-4 px-2 text-center">
                <span className="text-[#BFC6C8] text-[20px] font-bold cursor-pointer">
                  <Image
                    src="/assets/icons/more.svg"
                    alt="more icon"
                    width={2.25}
                    height={15}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile Table */}
      <div className="md:hidden flex flex-col gap-3">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className="bg-[#1C252A] rounded-[16px] px-3 py-3 flex flex-col gap-2 text-[13px] text-[#FCFFFF] shadow-sm border border-[#232B2F]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#425558] text-[13px] w-4 inline-block">{idx + 1}.</span>
                <span className="font-semibold">{plan.planId}</span>
              </div>
              <button
                className="p-2 rounded-full hover:bg-[#222C32]"
                onClick={() => setActionOpenIdx(actionOpenIdx === idx ? null : idx)}
                aria-label="Show actions"
              >
                <Image src="/assets/icons/more.svg" alt="actions" width={2.25} height={15} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">Creator:</span>
              <span>{plan.creator}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">Status:</span>
              <span className="bg-[#1B311C] text-[#3ED16B] text-[12px] font-semibold px-3 py-1 rounded-[16px] border border-[#1E3F1F]">{plan.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">Beneficiaries:</span>
              <span>{plan.beneficiaries}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">Created:</span>
              <span>{plan.creationDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#92A5A8]">Claim Date:</span>
              <span>{plan.claimDate}</span>
            </div>
            {actionOpenIdx === idx && (
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-[#232B2F] border border-[#425558] text-[#BFC6C8] py-2 rounded-[16px] text-[12px] font-medium hover:bg-[#232B2F]/80">
                  VIEW
                </button>
                <button className="flex-1 bg-[#33C5E0] text-[#161E22] py-2 rounded-[16px] text-[12px] font-semibold hover:bg-cyan-400">
                  APPROVE
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InheritancePlanTable;
