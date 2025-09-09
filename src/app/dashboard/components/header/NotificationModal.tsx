import React from "react";
import Image from "next/image";
import { disconnect } from "starknetkit";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

const notifications = [
  {
    message: "The plan 'For my babygirl' was successfully created",
    time: "Just Now",
  },
  {
    message: "The plan 'For my babygirl' was successfully created",
    time: "3 Days Ago",
  },
  {
    message: "The plan 'For my babygirl' was successfully created",
    time: "1 Week Ago",
  },
];

const NotificationModal: React.FC<NotificationModalProps> = ({
  open}) => {
  if (!open) return null;

  const handleDisconnect = async () => {
    try {
      await disconnect();
      window.location.href = "/";
    } catch (err) {
      console.error("Wallet disconnect failed", err);
    }
  };

  return (
    <div className="fixed w-full float-end inset-0 z-50 flex items-center justify-end bg-red-400 right-0 mt-[16rem] bg-opacity-40">
      <div className="bg-[#182C31] right-0 rounded-[24px] shadow-lg p-2 w-full max-w-[400px] md:max-w-[420px] flex flex-col items-center border border-[#33C5E03D] relative">
        <div className="w-full mb-4">
          {notifications.map((notif, idx) => (
            <div
              key={idx}
              className="w-full cursor-pointer bg-[#33C5E014] rounded-[16px] px-4 py-3 mb-3 flex flex-col gap-1 hover:scale-95 duration-500"
            >
              <h2 className="flex items-center justify-between">
                <span className="text-[#FCFFFF] text-[12px] font-semibold ">
                  {" "}
                  New Notification
                </span>
                <span className="text-[#92A5A8] text-[10px] font-medium mt-1">
                  {notif.time}
                </span>
              </h2>
              <span className="text-[#92A5A8] text-[10px]">
                {notif.message}
              </span>
            </div>
          ))}
        </div>
        <button
          className="w-full mt-2 px-6 py-3 cursor-pointer rounded-b-[24px] rounded-t-[8px] bg-[#33C5E014] text-[#33C5E0] text-[13px] font-medium border-none flex items-center justify-center gap-2 hover:bg-[#33C5E0] hover:text-[#161E22] transition-colors"
          onClick={handleDisconnect}
        >
          DISCONNECT WALLET
          <Image
            src="/assets/icons/grey_arrowdown.svg"
            alt="arrow"
            width={18}
            height={18}
            className="ml-2"
          />
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
