import React from "react";
import Image from "next/image";

interface PlatformTransaction {
  id: number;
  transactionId: string;
  user: string;
  userId: string;
  type: string;
  assetAmount: string;
  asset: string;
  method: string;
  methodDesc: string;
  status: string;
  date: string;
}

interface Props {
  transactions: PlatformTransaction[];
}

const PlatformTransactionTable: React.FC<Props> = ({ transactions }) => (
  <div className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[8px] sm:px-[16px] md:px-[24px]">
    {/* Desktop Table */}
    <div className="w-full overflow-x-auto">
      <table className="min-w-[600px] w-full text-left hidden md:table">
        <thead>
          <tr className="text-[#92A5A8] text-[14px] font-normal border-b border-[#1C252A]">
            <th className="py-3 px-2">Transaction ID</th>
            <th className="py-3 px-2">User ID</th>
            <th className="py-3 px-2">Type</th>
            <th className="py-3 px-2">Asset</th>
            <th className="py-3 px-2">Method</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2 text-right">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, idx) => (
            <tr key={txn.id} className="border-b border-[#1C252A] text-[#FCFFFF] text-[15px]">
              <td className="py-4 px-2 font-normal">
                <div className="flex flex-col">
                  <span className="flex items-center gap-2">
                    <span className="text-[#425558] text-[14px] w-4 inline-block">{idx + 1}.</span>
                    <span className="font-normal text-[14px] text-[#FCFFFF]">{txn.transactionId}</span>
                  </span>
                  <span className="text-[#92A5A8] text-[12px] ml-[1.5rem]">{txn.date}</span>
                </div>
              </td>
              <td className="py-4 px-2">
                <div className="flex flex-col">
                  <span className="font-normal text-[#FCFFFF] text-[14px]">{txn.user}</span>
                  <span className="text-[#92A5A8] text-[12px]">{txn.userId}</span>
                </div>
              </td>
              <td className="py-4 px-2 text-[12px] text-[#92A5A8] font-normal">{txn.type}</td>
              <td className="py-4 px-2">
                <div className="flex flex-col">
                  <span className="font-normal text-[14px] text-[#FCFFFF]">{txn.assetAmount}</span>
                  <span className="text-[#92A5A8] text-[12px]">{txn.asset}</span>
                </div>
              </td>
              <td className="py-4 px-2">
                <div className="flex flex-col">
                  <span className="font-normal text-[14px] text-[#FCFFFF]">{txn.method}</span>
                  <span className="text-[#92A5A8] text-[12px]">{txn.methodDesc}</span>
                </div>
              </td>
              <td className="py-4 px-2">
                <span className="bg-[#1C2518] border border-[#2E3513] rounded-[24px] flex items-center justify-center w-[81px] h-[21px] text-[#B9B604] text-[12px] font-semibold px-4 py-1">{txn.status}</span>
              </td>
              <td className="py-4 px-2 text-right">
                <span className="text-[#BFC6C8] text-[20px] font-bold cursor-pointer">
                  <Image
                    src="/assets/icons/more.svg"
                    alt="more icon"
                    width={2.25}
                    height={14}
                    className="inline-block"
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Mobile Cards */}
    <div className="md:hidden flex flex-col gap-3">
      {transactions.map((txn, idx) => (
        <div key={txn.id} className="bg-[#1C252A] rounded-[16px] px-3 py-3 flex flex-col gap-2 text-[13px] text-[#FCFFFF] shadow-sm border border-[#232B2F]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#425558] text-[13px] w-4 inline-block">{idx + 1}.</span>
              <span className="font-semibold">{txn.transactionId}</span>
            </div>
            <span className="text-[#92A5A8] text-[12px]">{txn.date}</span>
            <span className="text-[#BFC6C8] text-[20px] font-bold cursor-pointer">
              <Image
                src="/assets/icons/more.svg"
                alt="more icon"
                width={2.25}
                height={14}
                className="inline-block"
              />
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#92A5A8]">User:</span>
            <span>{txn.user} <span className="text-[#92A5A8] text-[11px]">({txn.userId})</span></span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#92A5A8]">Type:</span>
            <span>{txn.type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#92A5A8]">Asset:</span>
            <span>{txn.assetAmount} <span className="text-[#92A5A8] text-[11px]">{txn.asset}</span></span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#92A5A8]">Method:</span>
            <span>{txn.method} <span className="text-[#92A5A8] text-[11px]">{txn.methodDesc}</span></span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#92A5A8]">Status:</span>
            <span className="bg-[#1C2518] border border-[#2E3513] rounded-[16px] flex items-center justify-center px-3 py-1 text-[#B9B604] text-[12px] font-semibold">{txn.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PlatformTransactionTable;
