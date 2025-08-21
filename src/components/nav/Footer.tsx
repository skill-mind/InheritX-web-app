import React from "react";
import Image from "next/image";

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
  const quickLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "FAQS", href: "/faqs" },
    { label: "GUIDELINES", href: "/guidelines" },
    { label: "SUPPORT", href: "/support" },
  ];

  const defaultSocialIcons = [
    { icon: <Image src="/assets/icons/github.svg" alt="GitHub" width={24} height={24} />, href: "https://github.com/", label: "GitHub" },
    { icon: <Image src="/assets/icons/x.svg" alt="X (Twitter)" width={24} height={24} />, href: "https://x.com/", label: "X (Twitter)" },
    { icon: <Image src="/assets/icons/send.svg" alt="Email" width={24} height={24} />, href: "mailto:support@inheritx.io", label: "Email" },
  ];

  const iconsToRender =
    socialIcons.length > 0 ? socialIcons : defaultSocialIcons;

  return (
    <footer className="bg-[#182024] rounded-[60px] py-12 px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto mt-[10rem] mb-[5rem]">
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
                  <a
                    href={link.href}
                    className="text-[#FCFFFF] text-sm font-semibold underline hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                  {index < quickLinks.length - 1 && (
                    <span className="mx-2 w-[8px] h-[8px] bg-[#2A3338] inline-block"></span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Logo Section */}
          <div className="order-1 lg:order-2 flex justify-center">
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
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                  >
                    {social.icon}
                  </a>
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
          <p className="text-gray-400 text-sm text-center">
            Copyright © InheritX {new Date().getFullYear()}, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
