"use client";
import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { connect } from "starknetkit";

const Hero = () => {
  const router = useRouter();

  const handleConnectWallet = async () => {
    try {
      const { wallet } = await connect({
        modalMode: "alwaysAsk",
        dappName: "InheritX - Securin...",
      });
      if (wallet) {
        // navigate to centralized unlock transition route which will redirect after animation
        router.push(`/unlock?next=${encodeURIComponent("/user")}`);
      }
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-top mt-[25rem] md:mt-[20rem] md:min-h-screen px-6 sm:px-8 lg:px-12 w-full max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="space-y-8">
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-semibold text-[#FCFFFF] leading-tight">
                From Your Hands, To Theirs — Without A Hitch.
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-300 max-w-md leading-relaxed">
                InheritX helps your wealth flow naturally to the people who
                matter most.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleConnectWallet}
                  className="group cursor-pointer w-[244px] justify-center text-center  h-[60px] bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-semibold px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center"
                >
                  <span>START NOW</span>
                  <Image
                    src="/assets/icons/arrowup.svg"
                    alt="arrow up icon"
                    width={12}
                    height={12}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual Area - Removed particles */}
          <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end">
            {/* Content removed, space reserved for your background image */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
