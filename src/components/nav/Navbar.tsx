"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "HOME", href: "/", icon: "/assets/icons/home.svg" },
    { name: "HOW IT WORKS", href: "/how-it-works" },
    { name: "FAQS", href: "/faqs", icon: "/assets/icons/faq.svg" },
    { name: "CONTACT", href: "/contact", icon: "/assets/icons/contact.svg" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[124px] flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center w-1/2 justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img
                  src="/assets/icons/logo.svg"
                  className="h-[48px] w-[48px]"
                  alt="logo"
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
                    className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 relative group ${pathname === item.href ? 'text-cyan-400 font-bold' : 'text-gray-300 hover:text-cyan-400'} `}
                  >
                    {item.name}
                    <span className={`absolute inset-x-0 -bottom-1 w-1/3 ml-[13px] h-1 bg-cyan-400 transform ${pathname === item.href ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-200 origin-left`}></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Connect Wallet Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4 z-50">
            <button className="bg-[#161E22] text-[#33C5E0] flex items-center space-x-[2rem] rounded-l-full rounded-br-3xl hover:bg-slate-700 px-6 py-4 text-sm font-medium border-[0.6px] border-[#33C5E03D] hover:border-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20">
                <span>Connect Wallet</span>
                <img
                  src="/assets/icons/arrowdown.svg"
                  alt="arrowdown_icon"
                  className="inline-block ml-2 h-[.7rem]"
                />
            </button>
            <div className="bg-[#161E22] h-[40px] w-[8px] rounded-[12px] border-[0.6px] border-[#33C5E03D]"></div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - always visible, row at bottom */}
      <div className="md:hidden w-full bg-amber-400">
        <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-transparent border-slate-700 z-50 py-2">
          <div className="flex flex-row justify-center items-center w-full">
            {navItems.filter(item => item.name !== "HOW IT WORKS").map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`mx-2 flex flex-col items-center text-gray-300 hover:text-cyan-400 hover:bg-slate-700 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${pathname === item.href ? 'text-cyan-400 font-bold bg-slate-700' : ''}`}
              >
                {item.icon && (
                  <img src={item.icon} alt={`${item.name} icon`} className="h-6 w-6 mb-1" />
                )}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        {/* Connect Wallet Button - Mobile at top */}
        <div className="flex justify-end items-center w-full px-4 pt-2">
          <button className="bg-[#161E22] hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-sm font-medium border border-slate-600 hover:border-cyan-400 transition-all duration-200 flex items-center space-x-4 justify-center">
            <span>Connect Wallet</span>
            <img src="/assets/icons/arrowdown.svg" alt="arrowdown_icon" className="inline-block h-[.5rem]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
