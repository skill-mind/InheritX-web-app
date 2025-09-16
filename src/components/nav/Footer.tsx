"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Link from "next/link";

// Props interface for the Footer component
interface FooterProps {
  logo?: React.ReactNode;
  socialIcons?: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
}

const Footer: React.FC<FooterProps> = ({ logo, socialIcons = [] }) => {
  const pathname = usePathname();
  const quickLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "FAQS", href: "/faqs" },
    { label: "GUIDELINES", href: "/guidelines" },
    { label: "SUPPORT", href: "/contact" },
  ];

  const defaultSocialIcons = [
    
     {
  icon: (
    <a 
      href="https://github.com/skill-mind/InheritX-web-app" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Image
        src="/assets/icons/github.svg"
        alt="GitHub"
        width={24}
        height={24}
      />
    </a>
  ),
  href: "https://github.com/skill-mind/InheritX-web-app",
  label: "GitHub",
},
{
  icon: (
    <a 
      href="https://x.com/projectInheritX" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Image
        src="/assets/icons/x.svg"
        alt="X (Twitter)"
        width={24}
        height={24}
      />
    </a>
  ),
  href: "https://x.com/projectInheritX",
  label: "X (Twitter)",
},

    {
      icon: (
         <a 
      href="https://t.me" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Image
        src="/assets/icons/send.svg"
        alt="Telegram"
        width={24}
        height={24}
      />
    </a>
      ),
      href: "https://t.me",
      label: "Telegram",
    },
  ];

  const iconsToRender =
    socialIcons.length > 0 ? socialIcons : defaultSocialIcons;

  const copyrightLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Code of Ethics", href: "/code-ethics" },
  ];

  return (
    <footer className="bg-[#182024] rounded-[32px] md:rounded-[60px] py-12 px-4 sm:px-6 lg:px-8 w-[80%] max-w-[100rem] mx-auto mt-[10rem] mb-[10rem]">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-4">
          {/* Quick Links Section */}
          <div className="order-2 lg:order-1">
            <h3 className="text-[#92A5A8] text-[14px] font-medium mb-4 text-center lg:text-left">
              Quick Links
            </h3>
            <nav className="flex flex-wrap justify-center lg:justify-start gap-0 items-center">
              {quickLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    scroll={false}
                    className={`text-sm font-semibold underline hover:text-cyan-400 transition-colors duration-200 text-[#FCFFFF] ${
                      pathname === link.href ? "!text-[#33C5E0]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                  {index < quickLinks.length - 1 && (
                    <span className="mx-2 w-[8px] h-[8px] bg-[#2A3338] inline-block"></span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Logo Section */}
          <div className="order-1 lg:order-2 flex justify-center hover:scale-95 duration-500">
            {logo || (
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/icons/logo.svg"
                  className="h-[93px] w-[93px]"
                  alt="logo"
                  width={93}
                  height={93}
                />
              </Link>
            )}
          </div>

          {/* Social Links Section */}
          <div className="order-3 lg:order-3">
            <h3 className="text-[#92A5A8] text-sm font-medium mb-4 text-center lg:text-right">
              Social Links
            </h3>
            <div className="flex justify-center lg:justify-end gap-2 items-center">
              {iconsToRender.map((social, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                  >
                    {social.icon}
                  </Link>
                  {index < iconsToRender.length - 1 && (
                    <span className="mx-1 w-[8px] h-[8px] bg-[#2A3338]"></span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <ul className="flex items-center justify-center space-x-4 text-[#92A5A8] text-[12px] mb-[2rem]">
            {copyrightLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex items-center px-2 py-1 rounded transition-all duration-200 transform hover:text-[#33C5E0] hover:scale-105 hover:underline ${
                    pathname === link.href
                      ? "text-[#33C5E0] font-semibold scale-105"
                      : "text-[#92A5A8]"
                  }`}
                  prefetch={false}
                  scroll={false}
                  passHref
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-gray-400 text-sm text-center">
            Copyright © InheritX{" "}
            {typeof window !== "undefined" ? new Date().getFullYear() : "2025"},
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
