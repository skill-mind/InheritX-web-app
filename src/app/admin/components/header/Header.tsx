"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import NotificationModal from "./NotificationModal";
import { useAccount } from "@starknet-react/core";
import { truncateAddress } from "@/lib/utils";
// import ConnectWalletModal from "@/components/connect-wallet";

export default function AdminHeader() {
  const router = useRouter();
  const [showNotifModal, setShowNotifModal] = React.useState(false);
  const { address, isConnected, account } = useAccount();

  // Debug logging
  console.log("Dashboard Header - Wallet Status:", {
    address,
    isConnected,
    account,
  });

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
          {/* Right side */}
          <div className="flex items-center space-x-2 min-w-[134px] h-[48px] rounded-l-[24px] rounded-r-[8px] py-[12px] px-[12px] bg-[#1C252A] rounded-x-[24px] rounded-y-[8px] transition-all duration-200 hover:bg-[#232D33] cursor-pointer group">
            <Image
              src="/assets/icons/avatar.svg"
              alt="User avatar"
              width={24}
              height={24}
              className="rounded-full group-hover:ring-2 group-hover:ring-[#33C5E0] transition-all duration-200"
            />
            <span className="text-[#92A5A8] text-[12px] md:text-[14px] text-nowrap font-medium bg-transparent group-hover:text-[#33C5E0] transition-colors duration-200">
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

      {/* <ConnectWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      /> */}
    </section>
  );
}
