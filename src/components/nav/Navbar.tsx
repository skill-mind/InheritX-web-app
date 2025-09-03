"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { connect } from "starknetkit";

const Navbar = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "HOME", href: "/", icon: "/assets/icons/home.svg" },
    { name: "HOW IT WORKS", href: "/how-it-works" },
    { name: "FAQS", href: "/faqs", icon: "/assets/icons/question.svg" },
    { name: "CONTACT", href: "/contact", icon: "/assets/icons/contact.svg" },
  ];

  const handleConnectWallet = async () => {
    try {
      const { wallet } = await connect({
        modalMode: "alwaysAsk",
        dappName: "InheritX - Securin...",
      });
      if (wallet) {
        setShowWalletModal(false);
        // Redirect to asset-owner dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      // Optionally handle error
      setShowWalletModal(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[124px] flex flex-col items-center justify-center backdrop-blur-sm z-[9999]">
        <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center w-1/2 justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
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

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                        pathname === item.href
                          ? "text-cyan-400 font-bold"
                          : "text-gray-300 hover:text-cyan-400"
                      } `}
                    >
                      {item.name}
                      <span
                        className={`absolute inset-x-0 -bottom-1 w-1/3 ml-[13px] h-1 bg-cyan-400 transform ${
                          pathname === item.href ? "scale-x-100" : "scale-x-0"
                        } group-hover:scale-x-100 transition-transform duration-200 origin-left`}
                      ></span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Connect Wallet Button - Desktop */}
            <div className="flex items-center justify-end space-x-4 z-50 w-full relative">
              <button
                className="bg-[#161E22] w-fit text-[#33C5E0] flex items-center space-x-[1rem] rounded-l-full rounded-br-3xl hover:bg-slate-700 px-4 pr-0 md:px-6 py-4 text-sm font-medium border-[0.6px] border-[#33C5E03D] hover:border-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20"
                onClick={handleConnectWallet}
              >
                <span className="text-[#FCFFFF] md:text-[#33C5E0] font-medium">
                  Connect Wallet
                </span>

                {/* Mobile icon only */}
                <Image
                  src="/assets/icons/white_arrowdown.svg"
                  alt="arrowdown_icon_mobile"
                  className="h-[.7rem] md:hidden"
                  width={16}
                  height={16}
                />

                {/* Desktop icon only */}
                <Image
                  src="/assets/icons/arrowdown.svg"
                  alt="arrowdown_icon_desktop"
                  className="h-[.7rem] hidden md:inline-block"
                  width={16}
                  height={16}
                />
              </button>
              <div className="bg-[#161E22] h-[40px] w-[8px] rounded-[12px] border-[0.6px] border-[#33C5E03D]"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - always visible, row at bottom */}
      <div className="fixed bottom-0 md:hidden left-0 w-full z-50">
        <div className="w-full flex justify-center items-center bg-transparent border-slate-700 z-50 py-2">
          <div className="flex flex-row justify-center items-center w-full">
            {navItems
              .filter((item) => item.name !== "HOW IT WORKS")
              .map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col space-y-1 item-center justify-center"
                >
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`mx-2 flex flex-col bg-[#182024] rounded-t-[24px] rounded-b-[4px] items-center text-[#BFC6C8] text-[12px] w-[116px] h-[46px] hover:text-cyan-400 hover:bg-slate-700 px-3 py-2 text-base font-semibold rounded-md transition-colors duration-200 ${
                      pathname === item.href
                        ? "text-[#33C5E0] font-bold bg-slate-700"
                        : ""
                    }`}
                  >
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt={`${item.name} icon`}
                        className="h-[16px] w-[16px] mb-1"
                        width={24}
                        height={24}
                      />
                    )}
                    <span>{item.name}</span>
                  </Link>
                  <div className="bg-[#182024] h-[8px] w-[80px] rounded-[12px] mx-auto"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
