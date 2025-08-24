"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const pathname = usePathname();

  const navItems = [
    { name: "HOME", href: "/", icon: "/assets/icons/home.svg" },
    { name: "HOW IT WORKS", href: "/how-it-works" },
    { name: "FAQS", href: "/faqs", icon: "/assets/icons/question.svg" },
    { name: "CONTACT", href: "/contact", icon: "/assets/icons/contact.svg" },
  ];

  return (
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
              className="bg-[#161E22] w-fit text-[#33C5E0] flex items-center space-x-[2rem] rounded-l-full rounded-br-3xl hover:bg-slate-700 px-6 py-4 text-sm font-medium border-[0.6px] border-[#33C5E03D] hover:border-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20"
              onClick={() => setShowWalletModal((prev) => !prev)}
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
            {/* Wallet Modal */}
            {showWalletModal && (
              <div
                className="absolute right-[0%] top-full mt-4 w-[370px] bg-[#161E22] rounded-[24px] border border-[#232B2F] shadow-2xl z-[999] p-8 flex flex-col items-center"
                style={{
                  boxShadow:
                    "0 8px 32px rgba(17,23,26,0.7), 0 1.5px 12px rgba(27,37,42,0.7)",
                }}
              >
                <h2 className="text-[#FCFFFF] text-[24px] font-bold mb-2 text-center">
                  Connect Wallet
                </h2>
                <p className="text-[#92A5A8] text-[14px] mb-6 text-center">
                  Connect your wallet to get started withInheritX
                </p>
                <div className="flex flex-col gap-4 w-[210px] mb-6">
                  <button
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all duration-200 ${
                      selectedWallet === "BRAAVOS"
                        ? "bg-slate-800 border-cyan-400 border"
                        : "bg-transparent border border-[#232B2F]"
                    }`}
                    onClick={() => setSelectedWallet("BRAAVOS")}
                  >
                    <span className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center mr-2">
                      {selectedWallet === "BRAAVOS" && (
                        <span className="w-2 h-2 bg-cyan-400 rounded-full block"></span>
                      )}
                    </span>
                    <span className="text-[#92A5A8] text-[12px]">BRAAVOS</span>
                  </button>
                  <button
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all duration-200 ${
                      selectedWallet === "ARGENT_WEB"
                        ? "bg-slate-800 border-cyan-400 border"
                        : "bg-transparent border border-[#232B2F]"
                    }`}
                    onClick={() => setSelectedWallet("ARGENT_WEB")}
                  >
                    <span className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center mr-2">
                      {selectedWallet === "ARGENT_WEB" && (
                        <span className="w-2 h-2 bg-cyan-400 rounded-full block"></span>
                      )}
                    </span>
                    <span className="text-[#92A5A8] text-[12px]">
                      ARGENT (WEB)
                    </span>
                  </button>
                  <button
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all duration-200 ${
                      selectedWallet === "ARGENT_MOBILE"
                        ? "bg-slate-800 border-cyan-400 border"
                        : "bg-transparent border border-[#232B2F]"
                    }`}
                    onClick={() => setSelectedWallet("ARGENT_MOBILE")}
                  >
                    <span className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center mr-2">
                      {selectedWallet === "ARGENT_MOBILE" && (
                        <span className="w-2 h-2 bg-cyan-400 rounded-full block"></span>
                      )}
                    </span>
                    <span className="text-[#92A5A8] text-[12px]">
                      ARGENT (MOBILE)
                    </span>
                  </button>
                </div>
                <button
                  className="w-full bg-[#33C5E0] hover:bg-cyan-400 text-[#161E22] px-4 py-3 rounded-lg text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                  onClick={() => setShowWalletModal(false)}
                >
                  <Image
                    src="/assets/icons/UserCircleCheck.svg"
                    alt="connect icon"
                    width={20}
                    height={20}
                  />
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - always visible, row at bottom */}
      <div className="fixed top-[670%] md:hidden bottom-0 left-0 w-full z-50` bg-amber-400">
        <div className="w-full flex justify-center items-center bg-transparent border-slate-700 z-50 py-2">
          <div className="flex flex-row justify-center items-center w-full">
            {navItems
              .filter((item) => item.name !== "HOW IT WORKS")
              .map((item) => (
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
                      className="h-[14px] w-[13px] mb-1"
                      width={24}
                      height={24}
                    />
                  )}
                  <span>{item.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
