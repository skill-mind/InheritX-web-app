"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <section className="sticky top-0 z-50 w-full bg-[#161E22]/80 backdrop-blur-md  flex justify-center border-b border-[#1C252A] h-[124px]">
      <header className="w-full max-w-[110rem] mx-auto my-auto h-[60px] flex items-center justify-between px-6 py-4 bg-transparent border-none">
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
          {/* Search Bar */}
          <div className="flex items-center bg-transparent rounded-[24px] px-[20px] py-[8px] w-[320px] h-[60px] border border-[#2A3338] mr-[4rem]">
            <Search className="text-gray-400 mr-2 w-[20px] h-[20px]" />
            <input
              type="text"
              placeholder="Search user, ticket ID, plans, & admins..."
              className="bg-transparent outline-none text-[12px] text-sm text-[#92A5A8] w-full"
            />
          </div>

          {/* KYC Verification */}
          <div className="flex items-center space-x-4 bg-[#33C5E014] w-[183px] h-[60px] rounded-[24px] px-[20px] py-[8px] border-none ">
            <Image
              src="/assets/icons/kyc.svg"
              alt="KYC badge"
              width={30}
              height={30}
            />
            <p className="flex flex-col">
              <span className="text-[12px] font-medium">KYC Verified</span>
              <span className="text-[10px] text-[#33C5E0]">
                Action Required
              </span>
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 w-[182px] h-[60px] rounded-l-[24px] rounded-r-[8px] py-[14px] px-[20px] bg-[#1C252A] rounded-x-[24px] rounded-y-[8px] ">
            <Image
              src="/assets/icons/avatar.svg"
              alt="User avatar"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-[#92A5A8] text-[14px] font-medium bg-transparent">
              0x231f...5678
            </span>
          </div>

          {/* More */}
          <div className="bg-[#1C252A] h-[60px] w-[60px] rounded-[8px] flex items-center justify-center">
            <Image
              src="/assets/icons/more.svg"
              alt="more icon"
              width={2.25}
              height={15}
              className="rounded-full"
            />
          </div>
        </div>
      </header>
    </section>
  );
}
