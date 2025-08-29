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
    <aside className="w-[250px] h-fit bg-[#161E22] rounded-t-[8px] rounded-b-[48px] py-[40px] px-[14px] border-r border-gray-800 p-6 flex flex-col shadow-[inset_4px_4px_10px_rgba(17,23,26,0.9),inset_-4px_-4px_8px_rgba(27,37,42,0.9)]">
      <nav className="flex flex-col text-[12px] gap-2">
        <div className="flex items-center space-x-2 w-full">
          <div
            className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
              pathname === "/dashboard" ? "bg-[#33C5E0]" : "bg-transparent"
            }`}
          ></div>
          <Link
            href="/dashboard"
            className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
              pathname === "/dashboard"
                ? "bg-[#1C252A] text-[#33C5E0]"
                : "text-[#92A5A8] hover:text-cyan-400"
            }`}
          >
            <Home className="w-[16px] h-[16px] mr-3" /> Home
          </Link>
        </div>
        <div className="flex items-center space-x-2 w-full">
          <div
            className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
              pathname.startsWith("/dashboard/plans") ? "bg-[#33C5E0]" : "bg-transparent"
            }`}
          ></div>
          <Link
            href="/dashboard/plans"
            className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
              pathname.startsWith("/dashboard/plans")
                ? "bg-[#1C252A] text-[#33C5E0]"
                : "text-[#92A5A8] hover:text-cyan-400"
            }`}
          >
            <FileText className="w-[16px] h-[16px] mr-3" /> Plans
          </Link>
        </div>
        <div className="flex items-center space-x-2 w-full">
          <div
            className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
              pathname.startsWith("/dashboard/claim") ? "bg-[#33C5E0]" : "bg-transparent"
            }`}
          ></div>
          <Link
            href="/dashboard/claim"
            className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
              pathname.startsWith("/dashboard/claim")
                ? "bg-[#1C252A] text-[#33C5E0]"
                : "text-[#92A5A8] hover:text-cyan-400"
            }`}
          >
            <ShieldCheck className="w-[16px] h-[16px] mr-3" /> Claim Plan
          </Link>
        </div>
        <div className="flex items-center space-x-2 w-full">
          <div
            className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
              pathname.startsWith("/dashboard/swap") ? "bg-[#33C5E0]" : "bg-transparent"
            }`}
          ></div>
          <Link
            href="/dashboard/swap"
            className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
              pathname.startsWith("/dashboard/swap")
                ? "bg-[#1C252A] text-[#33C5E0]"
                : "text-[#92A5A8] hover:text-cyan-400"
            }`}
          >
            <Repeat className="w-[16px] h-[16px] mr-3" /> Swap
          </Link>
        </div>
        <div className="flex items-center space-x-2 w-full">
          <div
            className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
              pathname.startsWith("/dashboard/portfolio") ? "bg-[#33C5E0]" : "bg-transparent"
            }`}
          ></div>
          <Link
            href="/dashboard/portfolio"
            className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
              pathname.startsWith("/dashboard/portfolio")
                ? "bg-[#1C252A] text-[#33C5E0]"
                : "text-[#92A5A8] hover:text-cyan-400"
            }`}
          >
            <BarChart2 className="w-[16px] h-[16px] mr-3" /> Portfolio
          </Link>
        </div>
        <div className="flex items-center space-x-2 w-full">
          <div
            className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
              pathname.startsWith("/dashboard/inactivity") ? "bg-[#33C5E0]" : "bg-transparent"
            }`}
          ></div>
          <Link
            href="/dashboard/inactivity"
            className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
              pathname.startsWith("/dashboard/inactivity")
                ? "bg-[#1C252A] text-[#33C5E0]"
                : "text-[#92A5A8] hover:text-cyan-400"
            }`}
          >
            <Activity className="w-[16px] h-[16px] mr-3" /> Inactivity
          </Link>
        </div>
        <div className="flex items-center space-x-2 w-full">
          <div
            className={`bg-transparent w-[6px] h-[32px] rounded-[12px] ${
              pathname.startsWith("/dashboard/security") ? "bg-[#33C5E0]" : "bg-transparent"
            }`}
          ></div>
          <Link
            href="/dashboard/security"
            className={`flex w-full items-center justify-start pl-[3rem] h-[54px] rounded-r-[16px] rounded-l-[4px] ${
              pathname.startsWith("/dashboard/security")
                ? "bg-[#1C252A] text-[#33C5E0]"
                : "text-[#92A5A8] hover:text-cyan-400"
            }`}
          >
            <Lock className="w-[16px] h-[16px] mr-3" /> Security
          </Link>
        </div>
      </nav>
    </aside>
  );
}
