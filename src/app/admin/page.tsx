"use client";

import Image from "next/image";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");

  const activities = [
    { id: 1, title: "User Verification", newCount: 2 },
    { id: 2, title: "Support Ticket", newCount: 1 },
    { id: 3, title: "Inheritance Plan", newCount: 0 },
    { id: 4, title: "Platform Transaction", newCount: 5 },
  ];

  // Filter activities based on activeTab
  const filteredActivities =
    activeTab === "All"
      ? activities
      : activities.filter((a) =>
          a.title.toLowerCase().includes(activeTab.toLowerCase())
        );

  return (
    <section className="flex items-start gap-4 justify-between">
      <div className="w-[80%]">
        <h1 className="text-[24px] font-medium mb-2">Good morning, EBUBE</h1>
        <p className="text-[#92A5A8] text-[14px] font-normal mb-6">
          Monitor, protect, and manage the platform.
        </p>

        {/* Action buttons */}
        <div className="flex space-x-4 mb-8">
          <button className="bg-[#33C5E0] space-x-4 hover:bg-cyan-600 text-[#161E22] text-[14px] font-medium px-[24px] py-[14px] w-[208px] h-[60px] rounded-[24px]">
            <Image
              src="/assets/icons/arrowup.svg"
              alt="Arrowup Icon"
              width={13.5}
              height={13.5}
              className="inline-block mr-2"
            />
            <span>Approve KYC</span>
          </button>
          <button className="bg-[#33C5E014] space-x-4 hover:bg-cyan-600 hover:text-[#161E22] text-[#33C5E0] text-[14px] font-medium px-[24px] py-[14px] w-[208px] h-[60px] rounded-[24px]">
            <Image
              src="/assets/icons/arrowdown.svg"
              alt="ArrowUp Icon"
              width={13.5}
              height={13.5}
              className="inline-block mr-2 rotate-[270deg]"
            />
            <span>Create Ticket</span>
          </button>
          <button className="bg-[#33C5E014] space-x-4 hover:bg-cyan-600 hover:text-[#161E22] text-[#33C5E0] text-[14px] font-medium px-[24px] py-[14px] w-[208px] h-[60px] rounded-[24px]">
            <Image
              src="/assets/icons/arrowdown.svg"
              alt="Arrowup Icon"
              width={13.5}
              height={13.5}
              className="inline-block mr-2 rotate-[270deg]"
            />
            <span>Assign Dispute</span>
          </button>
        </div>

        {/* Recent Activities */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] text-[#BFC6C8] font-medium">
              RECENT ACTIVITIES
            </h2>
            <h3>
              <Image
                src="/assets/icons/filter.svg"
                alt="filter icon"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
              <span className="text-[#92A5A8] text-[12px] font-normal">
                Filter
              </span>
            </h3>
          </div>
          {/* Tabs */}
          <ul className="flex items-center space-x-6 border-t border-[#1C252A] mt-[.7rem] text-[#BFC6C8] text-[14px] px-6">
            {[
              "All",
              "User Verification",
              "Support Ticket",
              "Inheritance Plan",
              "Platform Transaction",
            ].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer h-[48px] rounded-b-[20px] flex items-center justify-center py-[12px] px-[16px] ${
                  activeTab === tab ? "text-[#33C5E0] bg-[#1C252A] border border-[#1C252A] font-semibold" : ""
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
          {/* Activities or Empty State */}
          {filteredActivities.length > 0 ? (
            <ul className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[24px] space-y-4">
              {filteredActivities.map((activity, index) => (
                <li
                  key={activity.id}
                  className="flex items-center justify-between border-b border-[#1C252A] pb-10"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[#425558] text-[14px]">
                      {index + 1}.
                    </span>
                    <span className="font-normal text-[#FCFFFF]">
                      {activity.title}
                    </span>
                    {activity.newCount > 0 && (
                      <span className="text-[#33C5E0] text-[12px]">
                        ({activity.newCount} New)
                      </span>
                    )}
                  </div>
                  <button className="bg-[#33C5E014] w-[88px] h-[34px] text-[#33C5E0] text-[12px] px-4 py-1 rounded-[24px] hover:bg-cyan-400 hover:text-white transition">
                    VIEW
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-[#182024] flex flex-col items-center justify-center mt-[2rem] w-full border border-none min-h-[376px] rounded-[24px] py-[48px] px-[24px] text-center text-gray-400">
              <span className="text-[#F0FFF9] text-[18px] font-normal">
                No activity yet.
              </span>
              <p className="mt-[.5rem] text-[#99A9A2] text-[12px] font-normal">
                Once users start creating plans or submitting KYC, you’ll see
                them here.
              </p>
              <button className="mt-[3rem] flex items-center space-x-4 w-[225px] h-[52px] py-[14px] px-[24px] bg-[#1C252A] rounded-[24px] text-[#33C5E0] text-[14px] font-medium border border-[#33C5E03D] hover:scale-105 duration-500 cursor-pointer">
                <Image
                  src="/assets/icons/arrowdown.svg"
                  alt="Arrowup Icon"
                  width={13.5}
                  height={13.5}
                  className="inline-block mr-2 rotate-[270deg]"
                />
                <span>View Platform Stats</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-[200px] rounded-[8px] py-[32px] px-[20px] bg-[#182024] h-[132px] flex flex-col gap-2 items-center justify-center">
          <span className="text-[36px] font-semibold text-[#FCFFFF]">0</span>
          <span className="text-[#92A5A8] text-[12px] font-normal">
            Total Verified User
          </span>
        </div>
        <div className="w-[200px] rounded-[8px] py-[32px] px-[20px] bg-[#182024] h-[132px] flex flex-col gap-2 items-center justify-center">
          <span className="text-[36px] font-semibold text-[#FCFFFF]">0</span>
          <span className="text-[#92A5A8] text-[12px] font-normal">
            Total Inheritance Span
          </span>
        </div>
        <div className="w-[200px] rounded-[8px] py-[32px] px-[20px] bg-[#182024] h-[132px] flex flex-col gap-2 items-center justify-center">
          <span className="text-[36px] font-semibold text-[#FCFFFF]">0</span>
          <span className="text-[#92A5A8] text-[12px] font-normal">
            Open Disputes
          </span>
        </div>
      </div>
    </section>
  );
}
