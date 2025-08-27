import React from "react";
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

const InheritancePlanTable: React.FC<Props> = ({ plans }) => (
  <div className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[24px]">
    <table className="w-full text-left">
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
                  <span className="font-semibold text-[14px] text-[#FCFFFF]">C-402</span>
                </span>
                <span className="text-[#92A5A8] text-[12px] ml-[1.4rem]">Alice Johnson</span>
              </div>
            </td>
            <td className="py-4 px-2">
              <span className="bg-[#1B311C] text-[#3ED16B] text-[12px] w-[70px] h-[26px] flex items-center justify-center font-semibold px-6 py-1 rounded-[16px] border border-[#1E3F1F]">ACTIVE</span>
            </td>
            <td className="py-4 px-2 font-normal text-[14px] text-[#BFC6C8]">2</td>
            <td className="py-4 px-2 text-[#92A5A8] text-[14px]">12th Sep, 2026</td>
            <td className="py-4 px-2 text-[#FCFFFF] text-[14px]">12th Sep, 2026</td>
            <td className="py-4 px-2 text-center">
              <span className="text-[#BFC6C8] text-[20px] font-bold cursor-pointer">
                <Image
                  src="/assets/icons/more.svg"
                  alt="more icon"
                  width={2.25}
                  height={14}
                />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default InheritancePlanTable;
