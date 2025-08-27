import React from "react";
import Image from "next/image";

interface Activity {
  id: number;
  title: string;
  newCount: number;
}

interface Props {
  activities: Activity[];
}

const RecentActivities: React.FC<Props> = ({ activities }) =>
  activities.length > 0 ? (
    <div className="bg-[#182024] mt-[2rem] w-full min-h-[376px] rounded-[24px] py-[24px] px-[24px]">
      {/* Header row for columns */}
      <div className="flex items-center justify-between border-b border-[#1C252A] pb-4 mb-4">
        <span className="text-[#99A9A2] text-[14px] font-medium">
          All Activities
        </span>
        <span className="text-[#99A9A2] text-[14px] font-medium">Action</span>
      </div>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li
            key={activity.id}
            className="flex items-center justify-between  border-[#1C252A] pb-10"
          >
            <div className="flex items-center space-x-2">
              <span className="text-[#425558] text-[14px]">{index + 1}.</span>
              <span className="font-normal text-[#FCFFFF]">{activity.title}</span>
              {activity.newCount > 0 && (
                <span className="text-[#33C5E0] text-[12px]">
                  ({activity.newCount} New)
                </span>
              )}
            </div>
            <button className="bg-[#33C5E014] w-[88px] h-[34px] text-[#33C5E0] border border-[#33C5E03D] text-[12px] px-4 py-1 rounded-[24px] hover:bg-cyan-400 hover:text-white transition">
              VIEW
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="bg-[#182024] flex flex-col items-center justify-center mt-[2rem] w-full border border-none min-h-[376px] rounded-[24px] py-[48px] px-[24px] text-center text-gray-400">
      <span className="text-[#F0FFF9] text-[18px] font-normal">
        No activity yet.
      </span>
      <p className="mt-[.5rem] text-[#99A9A2] text-[12px] font-normal">
        Once users start creating plans or submitting KYC, you’ll see them here.
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
  );

export default RecentActivities;
