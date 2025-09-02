"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <section className="sticky top-0 z-50 w-full bg-[#161E22]/80 backdrop-blur-md  flex justify-center border-b border-[#1C252A] h-[92px] md:h-[124px]">
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
          <div className="hidden md:flex items-center bg-transparent rounded-[24px] px-[20px] py-[8px] w-[320px] h-[60px] border border-[#2A3338] mr-[4rem] transition-shadow duration-200 focus-within:shadow-lg hover:shadow-md hover:border-[#33C5E0]">
            <Search className="text-gray-400 mr-2 w-[20px] h-[20px] group-hover:text-[#33C5E0] transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search user, ticket ID, plans, & admins..."
              className="bg-transparent outline-none text-[12px] text-sm text-[#92A5A8] w-full placeholder-[#92A5A8] focus:placeholder-[#33C5E0] transition-colors duration-200"
            />
          </div>

          {/* KYC Verification */}
          <div className="md:flex items-center hidden space-x-4 bg-[#33C5E014] w-[183px] h-[60px] rounded-[24px] px-[20px] py-[8px] border-none transition-colors duration-200 hover:bg-[#33C5E033] cursor-pointer group">
            <Image
              src="/assets/icons/kyc.svg"
              alt="KYC badge"
              width={30}
              height={30}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <p className="flex flex-col">
              <span className="text-[12px] font-medium group-hover:text-[#33C5E0] transition-colors duration-200">
                KYC Verified
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
              0x231f...5678
            </span>
          </div>

          {/* More */}
          <div className="bg-[#1C252A] h-[48px] w-[48px] md:h-[60px] md:w-[60px] rounded-[8px] flex items-center justify-center transition-all duration-200 hover:bg-[#232D33] cursor-pointer group">
            <Image
              src="/assets/icons/more.svg"
              alt="more icon"
              width={2.5}
              height={15}
              className="rounded-full group-hover:scale-125 group-hover:rotate-90 transition-all duration-200"
            />
          </div>
        </div>
      </header>
    </section>
  );
}
