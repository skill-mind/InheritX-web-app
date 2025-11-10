"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  ShieldCheck,
  Repeat,
  BarChart2,
  Activity,
  Lock,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[250px] h-fit bg-[#161E22] rounded-t-[8px] rounded-b-[48px] py-[40px] px-[14px] border-r border-gray-800 p-6 flex-col shadow-[inset_4px_4px_10px_rgba(17,23,26,0.9),inset_-4px_-4px_8px_rgba(27,37,42,0.9)]">
        <nav className="flex flex-col text-[12px] gap-2">
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
                pathname === "/user" ? "bg-[#33C5E0]" : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/user"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname === "/user"
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <Home className="w-[16px] h-[16px] mr-3" /> HOME
            </Link>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
                pathname.startsWith("/user/plans")
                  ? "bg-[#33C5E0]"
                  : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/user/plans"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/user/plans")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <FileText className="w-[16px] h-[16px] mr-3" /> PLANS
            </Link>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
                pathname.startsWith("/user/claim")
                  ? "bg-[#33C5E0]"
                  : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/user/claim"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/user/claim")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <ShieldCheck className="w-[16px] h-[16px] mr-3" /> CLAIM
            </Link>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
                pathname.startsWith("/user/swap")
                  ? "bg-[#33C5E0]"
                  : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/user/swap"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/user/swap")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <Repeat className="w-[16px] h-[16px] mr-3" /> SWAP
            </Link>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
                pathname.startsWith("/user/portfolio")
                  ? "bg-[#33C5E0]"
                  : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/user/portfolio"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/user/portfolio")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <BarChart2 className="w-[16px] h-[16px] mr-3" /> PORTFOLIO
            </Link>
          </div>
          {/* <div className="flex items-center space-x-2 w-full">
            <div
              className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
                pathname.startsWith("/user/inactivity")
                  ? "bg-[#33C5E0]"
                  : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/user/inactivity"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/user/inactivity")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <Activity className="w-[16px] h-[16px] mr-3" /> INACTIVITY
            </Link>
          </div> */}
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
                pathname.startsWith("/user/security")
                  ? "bg-[#33C5E0]"
                  : "bg-transparent"
              }`}
            ></div>
            <Link
              href="/user/security"
              className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
                pathname.startsWith("/user/security")
                  ? "bg-[#1C252A] text-[#33C5E0]"
                  : "text-[#92A5A8] hover:text-cyan-400"
              }`}
            >
              <Lock className="w-[16px] h-[16px] mr-3" /> SECURITY
            </Link>
          </div>
        </nav>
      </aside>
      {/* Mobile Bottom Navbar */}
      <nav className="fixed md:hidden p-[16px] bottom-0 left-0 right-0 z-50 bg-[#161E22] border-t border-[#33C5E014] text-[12px] flex overflow-x-auto scrollbar-hide justify-start items-center">
        <div className="flex min-w-max w-full">
          <Link
            href="/user"
            className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 min-w-[80px] ${
              pathname === "/user" ? "bg-[#1C252A]" : ""
            }`}
          >
            <Home
              className={`w-[15px] h-[15px] mb-2 ${
                pathname === "/user" ? "text-cyan-400" : "text-[#BFC6C8]"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                pathname === "/user" ? "text-cyan-400" : "text-[#BFC6C8]"
              }`}
            >
              HOME
            </span>
          </Link>
          <Link
            href="/user/plans"
            className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 min-w-[80px] ${
              pathname.startsWith("/user/plans") ? "bg-[#1C252A]" : ""
            }`}
          >
            <ShieldCheck
              className={`w-[15px] h-[15px] mb-2 ${
                pathname.startsWith("/user/plans")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                pathname.startsWith("/user/plans")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            >
              PLANS
            </span>
          </Link>
          <Link
            href="/user/claim"
            className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 min-w-[80px] ${
              pathname.startsWith("/user/claim") ? "bg-[#1C252A]" : ""
            }`}
          >
            <ShieldCheck
              className={`w-[15px] h-[15px] mb-2 ${
                pathname.startsWith("/user/claim")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                pathname.startsWith("/user/claim")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            >
              CLAIM
            </span>
          </Link>
          <Link
            href="/user/swap"
            className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 min-w-[80px] ${
              pathname.startsWith("/user/swap") ? "bg-[#1C252A]" : ""
            }`}
          >
            <Repeat
              className={`w-[15px] h-[15px] mb-2 ${
                pathname.startsWith("/user/swap")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                pathname.startsWith("/user/swap")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            >
              SWAP
            </span>
          </Link>
          <Link
            href="/user/portfolio"
            className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 min-w-[80px] ${
              pathname.startsWith("/user/portfolio") ? "bg-[#1C252A]" : ""
            }`}
          >
            <BarChart2
              className={`w-[15px] h-[15px] mb-2 ${
                pathname.startsWith("/user/portfolio")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                pathname.startsWith("/user/portfolio")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            >
              PORTFOLIO
            </span>
          </Link>
          <Link
            href="/user/inactivity"
            className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 min-w-[80px] ${
              pathname.startsWith("/user/inactivity") ? "bg-[#1C252A]" : ""
            }`}
          >
            <Activity
              className={`w-[15px] h-[15px] mb-2 ${
                pathname.startsWith("/user/inactivity")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                pathname.startsWith("/user/inactivity")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            >
              INACTIVITY
            </span>
          </Link>
          <Link
            href="/user/security"
            className={`flex flex-col items-center flex-1 py-2 rounded-t-[16px] rounded-b-[4px] transition-all duration-200 min-w-[80px] ${
              pathname.startsWith("/user/security") ? "bg-[#1C252A]" : ""
            }`}
          >
            <Lock
              className={`w-[15px] h-[15px] mb-2 ${
                pathname.startsWith("/user/security")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                pathname.startsWith("/user/security")
                  ? "text-cyan-400"
                  : "text-[#BFC6C8]"
              }`}
            >
              SECURITY
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
