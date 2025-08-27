"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, ShieldCheck, FileCheck } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[250px] h-[368px] bg-[#161E22] rounded-t-[8px] rounded-b-[48px] py-[40px] px-[14px] border-r border-gray-800 p-6 flex flex-col shadow-[inset_4px_4px_10px_rgba(17,23,26,0.9),inset_-4px_-4px_8px_rgba(27,37,42,0.9)]">
      <nav className="flex flex-col text-[12px]">
        <div className="flex items-center space-x-2 w-full">
          <div className="bg-[#1C252A] w-[6px] h-[32px] rounded-[12px]"></div>
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
        <Link
          href="/admin/platform-activity"
          className={`flex items-center justify-start pl-[3rem] h-[54px] ${
            pathname.startsWith("/admin/platform-activity")
              ? "bg-[#1C252A] text-[#33C5E0]"
              : "text-[#92A5A8] hover:text-cyan-400"
          }`}
        >
          <Activity className="w-[16px] h-[16px] mr-3" /> Platform Activity
        </Link>
        <Link
          href="/admin/disputes"
          className={`flex items-center justify-start pl-[3rem] h-[54px] ${
            pathname.startsWith("/admin/disputes")
              ? "bg-[#1C252A] text-[#33C5E0]"
              : "text-[#92A5A8] hover:text-cyan-400"
          }`}
        >
          <ShieldCheck className="w-[16px] h-[16px] mr-3" /> Dispute Resolution
        </Link>
        <Link
          href="/admin/kyc"
          className={`flex items-center justify-start pl-[3rem] h-[54px] ${
            pathname.startsWith("/admin/kyc")
              ? "bg-[#1C252A] text-[#33C5E0]"
              : "text-[#92A5A8] hover:text-cyan-400"
          }`}
        >
          <FileCheck className="w-[16px] h-[16px] mr-3" /> KYC Oversight
        </Link>
      </nav>
    </aside>
  );
}
