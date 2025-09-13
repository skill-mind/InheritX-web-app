"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import NotificationModal from "./NotificationModal";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { truncateAddress } from "@/lib/utils";
import { connect } from "starknetkit";
import { useEffect, useState } from "react";
import ConnectWalletModal from "@/components/connect-wallet";

export default function AdminHeader() {
  const router = useRouter();
  const [showNotifModal, setShowNotifModal] = React.useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Debug logging
  console.log("Dashboard Header - Wallet Status:", { address, isConnected });

  const handleWalletClick = () => {
    if (isConnected && address) {
      // If connected, disconnect immediately
      disconnect();
    } else {
      // If not connected, show wallet modal
      setShowWalletModal(true);
    }
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 w-full bg-[#161E22]/80 backdrop-blur-md  flex justify-center border-b border-[#1C252A] h-[92px] md:h-[124px]">
      <header className="w-full bg-transparent max-w-[110rem] mx-auto my-auto h-[60px] flex items-center justify-between px-6 py-4 border-none">
        {/* logo */}
        <div>
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/icons/logo.svg"
              className="h-[48px] w-[48px]"
              alt="logo"
              width={48}
              height={48}
            />
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-4 #1C252A">
          <button
            className="px-4 py-2 bg-[#259BA6] hover:bg-[#1E7F88] text-white rounded-md transition-colors duration-200"
            onClick={handleWalletClick}
          >
            {isConnected && address
              ? `Disconnect (${truncateAddress(address)})`
              : "Connect Wallet"}
          </button>

          {/* KYC Verification */}
          <div
            className="md:flex items-center hidden space-x-4 bg-[#33C5E014] w-[183px] h-[60px] rounded-[24px] px-[20px] py-[8px] border-none transition-colors duration-200 hover:bg-[#33C5E033] cursor-pointer group"
            onClick={() => router.push("/dashboard/kyc")}
            tabIndex={0}
            role="button"
            aria-label="Go to KYC Verification"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                router.push("/dashboard/kyc");
            }}
          >
            <Image
              src="/assets/icons/kyc.svg"
              alt="KYC badge"
              width={30}
              height={30}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <p className="flex flex-col">
              <span className="text-[12px] font-medium group-hover:text-[#33C5E0] transition-colors duration-200">
                KYC Verification
              </span>
              <span className="text-[10px] text-[#33C5E0] group-hover:underline transition-all duration-200">
                Action Required
              </span>
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 w-[134px] h-[48px] rounded-l-[24px] rounded-r-[8px] py-[12px] px-[12px] bg-[#1C252A] rounded-x-[24px] rounded-y-[8px] transition-all duration-200 hover:bg-[#232D33] cursor-pointer group">
            <Image
              src="/assets/icons/avatar.svg"
              alt="User avatar"
              width={24}
              height={24}
              className="rounded-full group-hover:ring-2 group-hover:ring-[#33C5E0] transition-all duration-200"
            />
            <span className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium bg-transparent group-hover:text-[#33C5E0] transition-colors duration-200">
              {isConnected && address
                ? truncateAddress(address)
                : "Not Connected"}
            </span>
          </div>

          {/* More */}
          <div
            className={`bg-[#1C252A] h-[48px] w-[48px] md:h-[60px] md:w-[60px] rounded-[8px] flex items-center justify-center transition-all duration-200 hover:bg-[#232D33] cursor-pointer group border-2 ${
              showNotifModal
                ? "border-[#33C5E0] bg-[#232D33]"
                : "border-transparent"
            }`}
            onClick={() => setShowNotifModal((v) => !v)}
          >
            <Image
              src="/assets/icons/more.svg"
              alt="more icon"
              width={2.5}
              height={15}
              className={`rounded-full group-hover:scale-125 group-hover:rotate-90 transition-all duration-200 ${
                showNotifModal ? "scale-125 rotate-90" : ""
              }`}
            />
          </div>
        </div>
      </header>
      <NotificationModal
        open={showNotifModal}
        onClose={() => setShowNotifModal(false)}
      />

      <ConnectWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
    </section>
  );
}
