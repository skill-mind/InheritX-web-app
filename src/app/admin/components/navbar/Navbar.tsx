"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, ShieldCheck, FileCheck } from "lucide-react";

export default function AdminSidebar({ modalOpen = false }: { modalOpen?: boolean } = {}) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[250px] h-[368px] bg-[#161E22] rounded-t-[8px] rounded-b-[48px] py-[40px] px-[14px] border-r border-gray-800 p-6 flex-col shadow-[inset_4px_4px_10px_rgba(17,23,26,0.9),inset_-4px_-4px_8px_rgba(27,37,42,0.9)]">
        <nav className="flex flex-col text-[12px]">
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`w-[6px] h-[32px] rounded-[12px] ${
                pathname === "/admin" ? "bg-[#1C252A]" : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/admin"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname === "/admin"
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <Home className="w-[16px] h-[16px] mr-3" /> Home
            </Link>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`w-[6px] h-[32px] rounded-[12px] ${
                pathname === "/admin/platform-activity"
                  ? "bg-[#1C252A]"
                  : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/admin/platform-activity"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/admin/platform-activity")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <Activity className="w-[16px] h-[16px] mr-3" /> Platform Activity
            </Link>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`w-[6px] h-[32px] rounded-[12px] ${
                pathname === "/admin/disputes" ? "bg-[#1C252A]" : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/admin/disputes"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/admin/disputes")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <ShieldCheck className="w-[16px] h-[16px] mr-3" /> Dispute
              Resolution
            </Link>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`w-[6px] h-[32px] rounded-[12px] ${
                pathname === "/admin/kyc" ? "bg-[#1C252A]" : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/admin/kyc"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/admin/kyc")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <FileCheck className="w-[16px] h-[16px] mr-3" /> KYC Oversight
            </Link>
          </div>
        </nav>
      </aside>
      {/* Mobile Bottom Navbar */}
      <nav className="fixed md:hidden p-[16px] bottom-0 left-0 right-0 z-50 bg-[#161E22] border-t border-[#33C5E014] text-[12px] flex justify-around items-center transition-opacity duration-200">
        <Link
          href="/admin"
          className={`flex cursor-pointer flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 hover:bg-[#232B2F] hover:text-cyan-400 group ${
            pathname === "/admin" ? "bg-[#1C252A] text-cyan-400" : "text-[#BFC6C8]"
          }`}
        >
          <Home
            className={`w-[20px] h-[20px] mb-1 group-hover:text-cyan-400 transition-colors duration-200 ${
              pathname === "/admin" ? "text-cyan-400" : "text-[#BFC6C8]"
            }`}
          />
          <span
            className={`text-xs font-semibold group-hover:text-cyan-400 transition-colors duration-200 ${
              pathname === "/admin" ? "text-cyan-400" : "text-[#BFC6C8]"
            }`}
          >
            HOME
          </span>
        </Link>
        <Link
          href="/admin/kyc"
          className={`flex cursor-pointer flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 hover:bg-[#232B2F] hover:text-cyan-400 group ${
            pathname.startsWith("/admin/kyc") ? "bg-[#1C252A] text-cyan-400" : "text-[#BFC6C8]"
          }`}
        >
          <FileCheck
            className={`w-[20px] h-[20px] mb-1 group-hover:text-cyan-400 transition-colors duration-200 ${
              pathname.startsWith("/admin/kyc")
                ? "text-cyan-400"
                : "text-[#BFC6C8]"
            }`}
          />
          <span
            className={`text-xs font-semibold group-hover:text-cyan-400 transition-colors duration-200 ${
              pathname.startsWith("/admin/kyc")
                ? "text-cyan-400"
                : "text-[#BFC6C8]"
            }`}
          >
            KYC
          </span>
        </Link>
        <Link
          href="/admin/disputes"
          className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 hover:bg-[#232B2F] hover:text-cyan-400 group ${
            pathname.startsWith("/admin/disputes") ? "bg-[#1C252A] text-cyan-400" : "text-[#BFC6C8]"
          }`}
        >
          <ShieldCheck
            className={`w-[20px] h-[20px] mb-1 group-hover:text-cyan-400 transition-colors duration-200 ${
              pathname.startsWith("/admin/disputes")
                ? "text-cyan-400"
                : "text-[#BFC6C8]"
            }`}
          />
          <span
            className={`text-xs font-semibold group-hover:text-cyan-400 transition-colors duration-200 ${
              pathname.startsWith("/admin/disputes")
                ? "text-cyan-400"
                : "text-[#BFC6C8]"
            }`}
          >
            DISPUTE
          </span>
        </Link>
        <Link
          href="/admin/platform-activity"
          className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 hover:bg-[#232B2F] hover:text-cyan-400 group ${
            pathname.startsWith("/admin/platform-activity")
              ? "bg-[#1C252A] text-cyan-400"
              : "text-[#BFC6C8]"
          }`}
        >
          <Activity
            className={`w-[20px] h-[20px] mb-1 group-hover:text-cyan-400 transition-colors duration-200 ${
              pathname.startsWith("/admin/platform-activity")
                ? "text-cyan-400"
                : "text-[#BFC6C8]"
            }`}
          />
          <span
            className={`text-xs font-semibold group-hover:text-cyan-400 transition-colors duration-200 ${
              pathname.startsWith("/admin/platform-activity")
                ? "text-cyan-400"
                : "text-[#BFC6C8]"
            }`}
          >
            ACTIVITY
          </span>
        </Link>
      </nav>
    </>
  );
}
