"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Type for asset
interface Asset {
  label: string;
  icon: string;
  amount: number;
}

const assetOptions: Omit<Asset, "amount">[] = [
  { label: "ETH", icon: "/assets/icons/eth.svg" },
  { label: "NFT", icon: "/assets/icons/nft1.svg" },
  { label: "STRK", icon: "/assets/icons/strk.svg" },
  { label: "USDC", icon: "/assets/icons/usdc.png" },
  { label: "USDT", icon: "/assets/icons/usdt.png" },
];

const PieChart = dynamic(
  () => import("react-minimal-pie-chart").then((mod) => mod.PieChart),
  { ssr: false }
);

const AssetAllocationPage = () => {
  const router = useRouter();
  const [selectedAsset, setSelectedAsset] = useState<Omit<Asset, "amount">>(
    assetOptions[0]
  );
  const [amount, setAmount] = useState<string>("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Calculate total for percentage
  const totalAmount = assets.reduce((sum, a) => sum + a.amount, 0);

  const handleAddAsset = () => {
    if (
      !selectedAsset ||
      !amount ||
      isNaN(Number(amount)) ||
      Number(amount) <= 0 ||
      assets.some((a) => a.label === selectedAsset.label)
    )
      return;
    setAssets([...assets, { ...selectedAsset, amount: Number(amount) }]);
    setAmount("");
    setDropdownOpen(false);
  };

  const isFormValid =
    selectedAsset && amount && !isNaN(Number(amount)) && Number(amount) > 0;

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 mb-2">
          <button
            className="text-[#BFC6C8] cursor-pointer text-[15px] flex items-center gap-2 hover-raise clickable"
            onClick={() => router.back()}
          >
            <Image
              src="/assets/icons/back.svg"
              alt="back"
              width={18}
              height={15}
            />
          </button>
          <h2 className="text-lg md:text-2xl font-medium text-[#92A5A8]">
            Create New Plan
            <span className="text-[#FCFFFF] font-normal text-[14px] ml-2 mb-[4px]">
              | Asset Allocation
            </span>
          </h2>
        </div>
        <div>
          <button className="border border-[#33C5E03D] p-[14px] rounded-[24px] text-[#33C5E0] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer hover-raise clickable">
            <Image
              src="/assets/icons/plus.svg"
              alt="plus icon"
              width={14}
              height={14}
              className="inline-block mr-2"
            />
            <span>Save As Draft</span>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8">
        {/* Progress Steps */}
        <div className="flex flex-row items-center justify-between w-full mb-2">
          {[1, 2, 3, 4, 5].map((step, idx) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step === 2
                    ? "border-cyan-400 bg-[#161E22]"
                    : "border-[#232B36] bg-[#232B36]"
                }`}
              >
                <span
                  className={`text-[15px] font-semibold ${
                    step === 2 ? "text-cyan-400" : "text-[#BFC6C8]"
                  }`}
                >
                  {step}
                </span>
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step === 2 ? "text-cyan-400" : "text-[#BFC6C8]"
                }`}
              >
                {
                  [
                    "Basic Information",
                    "Asset Allocation",
                    "Rules",
                    "Verification",
                    "Preview",
                  ][idx]
                }
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[#BFC6C8] text-[15px] mb-4">
          Choose the assets you want to pass on
        </p>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Asset Form */}
          <div className="flex-1 bg-[#161E22] border border-[#232B36] rounded-[24px] p-6 flex flex-col gap-6 min-w-[280px]">
            {/* Asset input row */}
            <div className="flex flex-row items-center gap-4 mb-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-[#BFC6C8] text-xs mb-1">Asset</label>
                <div className="relative">
                  <button
                    className="flex items-center w-full bg-[#182024] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none justify-between hover-raise clickable"
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                  >
                    <span className="flex items-center gap-2">
                      <Image
                        src={selectedAsset.icon}
                        alt={selectedAsset.label}
                        width={24}
                        height={24}
                      />
                      {selectedAsset.label
                        ? selectedAsset.label
                        : "Select An Asset"}
                    </span>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="#BFC6C8"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-full bg-[#182024] border border-[#232B36] rounded-[12px] shadow-lg z-10">
                      {assetOptions.map((option) => (
                        <button
                          key={option.label}
                          className="flex items-center gap-2 w-full px-4 py-2 text-[#FCFFFF] hover:bg-[#232B36] text-[15px] cursor-pointer"
                          onClick={() => {
                            setSelectedAsset(option);
                            setDropdownOpen(false);
                          }}
                        >
                          <Image
                            src={option.icon}
                            alt={option.label}
                            width={20}
                            height={20}
                          />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-[#BFC6C8] text-xs mb-1">Amount</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#182024] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none input-transition"
                    placeholder="0.00"
                  />
                  <button
                    type="button"
                    className="bg-[#232B36] text-[#FCFFFF] px-3 py-1 rounded-full text-xs font-medium hover-raise clickable"
                    onClick={() => setAmount("100")}
                  >
                    MAX
                  </button>
                </div>
                <span className="text-[#BFC6C8] text-xs mt-1">
                  ${amount ? parseFloat(amount).toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="flex flex-col gap-2 w-1/4">
                <label className="text-[#BFC6C8] text-xs mb-1">%</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={
                      amount && totalAmount + Number(amount) > 0
                        ? (
                            (Number(amount) / (totalAmount + Number(amount))) *
                            100
                          ).toFixed(0)
                        : 0
                    }
                    readOnly
                    className="w-full bg-[#182024] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] text-[15px] outline-none input-transition"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className={`flex cursor-pointer items-center justify-end self-end gap-2 w-full md:w-fit text-[15px] px-8 py-3 font-medium p-[14px] h-[56px] rounded-[24px] float-end border border-[#33C5E03D] transition-colors bg-[#1C252A] text-[#33C5E0] hover:text-[#1C252A] hover:bg-[#33C5E0]/90 ${
                !isFormValid ||
                assets.some((a) => a.label === selectedAsset.label)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleAddAsset}
              disabled={
                !isFormValid ||
                assets.some((a) => a.label === selectedAsset.label)
              }
            >
              <Image
                src="/assets/icons/plus.svg"
                alt="add asset"
                width={18}
                height={18}
              />
              Add Assets
            </button>
            {/* List of added assets */}
            {assets.length > 0 && (
              <div className="mt-6 flex flex-col gap-4">
                {assets.map((a, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row items-center gap-4 bg-[#182024] border border-[#232B36] rounded-[16px] px-4 py-3 hover-raise clickable"
                  >
                    <div className="flex items-center gap-2 w-1/3">
                      <Image
                        src={a.icon}
                        alt={a.label}
                        width={24}
                        height={24}
                      />
                      <span className="text-[#FCFFFF] text-[15px] font-medium">
                        {a.label}
                      </span>
                    </div>
                    <div className="w-1/3 text-[#FCFFFF] text-[15px] font-medium">
                      {a.amount}
                    </div>
                    <div className="w-1/3 text-[#33C5E0] text-[15px] font-medium">
                      {totalAmount > 0
                        ? ((a.amount / totalAmount) * 100).toFixed(0)
                        : 0}
                      %
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Asset Summary & Chart */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-[#161E22] border border-[#232B36] rounded-[24px] p-6 flex flex-col items-center justify-center shadow-[inset_4px_4px_10px_rgba(21,28,31,0.9),inset_-4px_-4px_8px_rgba(27,36,41,0.9)] w-full max-w-[320px] min-h-[220px]">
              <span className="text-[#FCFFFF] text-[16px] font-medium mb-2">
                Total asset pool value
              </span>
              <span className="text-[#BFC6C8] text-xs mb-4">
                Sum Of All Asset Values
              </span>
              {assets.length === 0 ? (
                <span className="text-[#BFC6C8] text-[16px]">
                  No Assets Yet
                </span>
              ) : (
                <PieChart
                  data={assets.map((a) => ({
                    title: a.label,
                    value: a.amount,
                    color:
                      a.label === "ETH"
                        ? "#33C5E0"
                        : a.label === "NFT"
                        ? "#B97AFF"
                        : a.label === "Real World Asset"
                        ? "#FF9F43"
                        : a.label === "BTC"
                        ? "#F7931A"
                        : a.label === "USDT"
                        ? "#26A17B"
                        : a.label === "USDC"
                        ? "#2775CA"
                        : "#BFC6C8",
                  }))}
                  lineWidth={30}
                  paddingAngle={3}
                  rounded
                  animate
                  label={({ dataEntry }) =>
                    `${String(dataEntry.title ?? "")} ${(
                      (Number(dataEntry.value) / (totalAmount || 1)) *
                      100
                    ).toFixed(0)}%`
                  }
                  labelStyle={{
                    fontSize: "6px",
                    fontWeight: "bold",
                    fill: "#FCFFFF",
                  }}
                  style={{ height: 180 }}
                />
              )}
              {assets.length > 0 && (
                <div className="flex flex-row flex-wrap gap-2 mt-4 justify-center items-center">
                  {assets.map((a, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-xs text-[#FCFFFF] card-hover clickable"
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-1"
                        style={{
                          backgroundColor:
                            a.label === "ETH"
                              ? "#33C5E0"
                              : a.label === "NFT"
                              ? "#B97AFF"
                              : a.label === "Real World Asset"
                              ? "#FF9F43"
                              : a.label === "BTC"
                              ? "#F7931A"
                              : a.label === "USDT"
                              ? "#26A17B"
                              : a.label === "USDC"
                              ? "#2775CA"
                              : "#BFC6C8",
                        }}
                      ></span>
                      {a.label} {totalAmount > 0
                        ? ((a.amount / totalAmount) * 100).toFixed(0)
                        : 0}
                      %
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-start mt-8">
          <button
            type="button"
            className={`bg-[#33C5E0] w-[243px] text-[#161E22] text-center px-8 py-3 font-medium rounded-[16px] h-[56px] rounded-t-[8px] rounded-b-[24px] flex items-center justify-center gap-2 border border-[#232B36] text-[14px] transition-colors hover:bg-[#33C5E0]/90 disabled:bg-[#1C252A] disabled:text-[#425558] disabled:cursor-not-allowed hover-raise clickable`}
            disabled={assets.length === 0}
            onClick={() => {
              if (assets.length > 0)
                router.push("/dashboard/plans/create/rules");
            }}
          >
            NEXT
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
      <style jsx>{`
        .hover-raise { transition: transform 220ms ease, box-shadow 220ms ease; }
        .hover-raise:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,0.12); }
        .card-hover { transition: transform 200ms ease, box-shadow 200ms ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.06); }
        .clickable { cursor: pointer; }
        .input-transition { transition: box-shadow 180ms ease, border-color 180ms ease; }
        .input-transition:focus { box-shadow: 0 8px 20px rgba(51,197,224,0.08); border-color: #33C5E0; outline: none; }
      `}</style>
    </main>
  );
};

export default AssetAllocationPage;
