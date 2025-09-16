"use client";

import React, { useState, useEffect } from "react";
import "./guidelines.css";
import Image from "next/image";

const GuidelinesPage = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    privacy: true, // Privacy Policy expanded by default
    code: false,
    terms: false,
  });

  useEffect(() => {
    const run = () => {
      try {
        const els = Array.from(document.querySelectorAll('.reveal'));
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) entry.target.classList.add('reveal-active');
            });
          },
          { threshold: 0.12 }
        );

        els.forEach((el, i) => {
          (el as HTMLElement).style.willChange = 'transform, opacity';
          obs.observe(el);
          const rect = el.getBoundingClientRect();
          const step = parseInt(el.getAttribute('data-step') || String(i));
          if (rect.top < window.innerHeight * 0.9) {
            setTimeout(() => el.classList.add('reveal-active'), 60 * (step + 1));
          }
        });
      } catch (e) {
        console.error(e)
      }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') run();
    else window.addEventListener('DOMContentLoaded', run);
  }, []);

  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen max-w-[110rem] mx-auto text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 mt-[8rem] mb-[20rem]">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-[24px] md:text-[32px] text-[#FCFFFF] font-semibold mb-4 reveal" data-step={0}>
            Guidelines
          </h1>
          <p className="text-[#92A5A8] text-base md:text-[14px] reveal" data-step={1}>
            Here are some frequently asked questions about InheritX
          </p>
        </div>

        {/* Guidelines Cards */}
        <div className="space-y-6 sm:space-y-8">
          {/* Privacy Policy Card */}
          <div className="bg-transparent border-none rounded-lg flex flex-col reveal hover-raise" data-step={2}>
            <button
              className="flex items-center justify-between space-x-4 w-full focus:outline-none"
              onClick={() => toggleSection("privacy")}
              aria-expanded={expanded.privacy}
              aria-controls="privacy-content"
            >
              {/* Only show left bar if expanded */}
              {expanded.privacy ? (
                <div className="bg-[#1C252A] h-[8px] w-[32px] rounded-[4px] transition-all duration-200" />
              ) : (
                <div className="w-[32px] h-[8px]" />
              )}
              <div className="flex items-center justify-between w-full border-b border-[#232D33] py-4">
                <h2 className="text-[18px] md:text-[24px] font-medium text-[#FCFFFF]">
                  Privacy Policy
                </h2>
                <Image
                  src="/assets/icons/arrowdown.svg"
                  alt="arrow down icon"
                  width={13.5}
                  height={13.5}
                  className={`inline-block transition-transform duration-200 ${
                    expanded.privacy ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </div>
            </button>
            <div
              id="privacy-content"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expanded.privacy ? "max-h-[2000px] py-6" : "max-h-0 py-0"
              }`}
            >
              {/* Data Collection and Usage Card */}
              <div className="guidelines-box">
                <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[14px] md:text-[18px] text-[#FCFFFF] font-medium">
                      Data Collection and Usage
                    </h2>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium mb-4 tracking-wider uppercase">
                        PERSONAL INFORMATION
                      </h3>
                      <div className="space-y-3">
                        <h4 className="text-[#FCFFFF] text-sm sm:text-base font-medium">
                          We Collect:
                        </h4>
                        <ul className="space-y-2 text-[#FCFFFF] text-sm">
                          <li>• Legal Name And Contact Information</li>
                          <li>• Government-Issued Identification</li>
                          <li>• Cryptocurrency Wallet Addresses</li>
                          <li>• Beneficiary Information</li>
                          <li>• Communication Preferences</li>
                        </ul>
                      </div>
                    </div>

                    {/* Technical Data */}
                    <div>
                      <h3 className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium mb-4 tracking-wider uppercase">
                        TECHNICAL DATA
                      </h3>
                      <div className="space-y-3">
                        <h4 className="text-white text-sm sm:text-base font-medium">
                          We Record:
                        </h4>
                        <ul className="space-y-2 text-[#FCFFFF]  text-sm">
                          <li>• Device Information</li>
                          <li>• IP Address</li>
                          <li>• Browser Type And Version</li>
                          <li>• Session Information</li>
                          <li>• System Logs</li>
                        </ul>
                      </div>
                    </div>

                    {/* Usage Data */}
                    <div className="lg:col-span-2">
                      <h3 className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium mb-4 tracking-wider uppercase">
                        USAGE DATA
                      </h3>
                      <div className="space-y-3">
                        <h4 className="text-white text-sm sm:text-base font-medium">
                          We Monitor:
                        </h4>
                        <ul className="space-y-2 text-[#FCFFFF]  text-sm">
                          <li>• Platform Interaction Patterns</li>
                          <li>• Security Event Logs</li>
                          <li>• Transaction History</li>
                          <li>• Smart Contract Interactions</li>
                          <li>• Feature Utilization Metrics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C252A] h-[4px] w-[95%] mx-auto"></div>

                {/* Data Protection Card */}
                <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[14px] md:text-[18px] text-[#FCFFFF] font-medium">
                      Data Protection
                    </h2>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Security Measures */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-4 tracking-wider uppercase">
                        SECURITY MEASURES
                      </h3>
                      <ul className="space-y-2 text-[#FCFFFF]  text-sm">
                        <li>• End-To-End Encryption For All Sensitive Data</li>
                        <li>
                          • Regular Security Audits And Penetration Testing
                        </li>
                        <li>• Zero-Knowledge Proof Implementation</li>
                        <li>• Secure Key Management Systems</li>
                        <li>• Regular Backup And Recovery Testing</li>
                      </ul>
                    </div>

                    {/* Storage and Retention */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-4 tracking-wider uppercase">
                        STORAGE AND RETENTION
                      </h3>
                      <ul className="space-y-2 text-[#FCFFFF] text-sm">
                        <li>• Encrypted Storage On Distributed Systems</li>
                        <li>• Regular Data Minimization Reviews</li>
                        <li>• Compliance With Retention Regulations</li>
                        <li>• Secure Data Destruction Protocols</li>
                        <li>• Backup Maintenance Procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C252A] h-[4px] w-[95%] mx-auto"></div>

                {/* User Rights and Controls Card */}
                <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[14px] md:text-[18px] text-[#FCFFFF] font-medium">
                      User Rights and Controls
                    </h2>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Access Rights */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-4 tracking-wider uppercase">
                        ACCESS RIGHTS
                      </h3>
                      <div className="space-y-3">
                        <h4 className="text-white text-sm sm:text-base font-medium">
                          Users May:
                        </h4>
                        <ul className="space-y-2 text-[#FCFFFF]  text-sm">
                          <li>• Request Data Copies</li>
                          <li>• Correct Personal Information</li>
                          <li>• Delete Account Data</li>
                          <li>• Export Transaction History</li>
                          <li>• Review Security Logs</li>
                        </ul>
                      </div>
                    </div>

                    {/* Privacy Controls */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-4 tracking-wider uppercase">
                        PRIVACY CONTROLS
                      </h3>
                      <div className="space-y-3">
                        <h4 className="text-white text-sm sm:text-base font-medium">
                          Users Manage:
                        </h4>
                        <ul className="space-y-2 text-[#FCFFFF]  text-sm">
                          <li>• Marketing Settings</li>
                          <li>• Communication Preferences</li>
                          <li>• Data Sharing Options</li>
                          <li>• Authentication Methods</li>
                          <li>• Activity Notifications</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C252A] h-[4px] w-[95%] mx-auto"></div>

                {/* Third-Party Sharing Card */}
                <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[14px] md:text-[18px] text-[#FCFFFF] font-medium">
                      Third-Party Sharing
                    </h2>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Service Providers */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-4 tracking-wider uppercase">
                        SERVICE PROVIDERS
                      </h3>
                      <div className="space-y-3">
                        <h4 className="text-white text-sm sm:text-base font-medium">
                          Limited Sharing With:
                        </h4>
                        <ul className="space-y-2 text-[#FCFFFF]  text-sm">
                          <li>• Identity Verification Services</li>
                          <li>• Blockchain Infrastructure Partners</li>
                          <li>• Legal Compliance Partners</li>
                          <li>• Third-Party Infrastructure Providers</li>
                          <li>• Customer Support Systems</li>
                        </ul>
                      </div>
                    </div>

                    {/* Legal Requirements */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-4 tracking-wider uppercase">
                        LEGAL REQUIREMENTS
                      </h3>
                      <div className="space-y-3">
                        <h4 className="text-white text-sm sm:text-base font-medium">
                          Data Shared For:
                        </h4>
                        <ul className="space-y-2 text-[#FCFFFF] text-sm">
                          <li>• Regulatory Compliance</li>
                          <li>• Anti-Money Laundering</li>
                          <li>• Law Enforcement Requests</li>
                          <li>• Court Orders</li>
                          <li>• Fraud Prevention</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code of Ethics Card (separate) */}
          <div className="bg-transparent border-none rounded-lg flex flex-col reveal hover-raise" data-step={3}>
            <button
              className="flex items-center justify-between space-x-4 w-full focus:outline-none"
              onClick={() => toggleSection("code")}
              aria-expanded={expanded.code}
              aria-controls="code-content"
            >
              {expanded.code ? (
                <div className="bg-[#1C252A] h-[8px] w-[32px] rounded-[4px] transition-all duration-200" />
              ) : (
                <div className="w-[32px] h-[8px]" />
              )}
              <div className="flex items-center justify-between w-full border-b border-[#232D33] py-4">
                <h2 className="text-[18px] md:text-[24px] font-medium text-[#FCFFFF]">
                  Code of Ethics
                </h2>
                <Image
                  src="/assets/icons/arrowdown.svg"
                  alt="arrow down icon"
                  width={13.5}
                  height={13.5}
                  className={`inline-block transition-transform duration-200 ${
                    expanded.code ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </div>
            </button>
            <div
              id="code-content"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expanded.code ? "max-h-[2000px] py-6" : "max-h-0 py-0"
              }`}
            >
              <div className="guidelines-box">
                <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                  {/* All content below uses text-[#FCFFFF] and text-sm for consistency */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-8">
                    Core Principles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* TRANSPARENCY */}
                    <div>
                      <h3 className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium mb-2 tracking-wider uppercase">
                        TRANSPARENCY
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        We Are Committed To Open And Honest Communication By:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Clearly Communicating All Processes.</li>
                        <li>Providing Regular Updates On Platform Status.</li>
                        <li>Maintaining Open Documentation Of Procedures.</li>
                        <li>Ensuring Honest Reporting Of Incidents.</li>
                        <li>Offering Accessible Support Channels.</li>
                      </ul>
                    </div>
                    {/* SECURITY */}
                    <div>
                      <h3 className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium mb-2 tracking-wider uppercase">
                        SECURITY
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        We Prioritize The Safety Of User Assets Through:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Regular Security Assessments And Audits.</li>
                        <li>Proactive Threat Monitoring.</li>
                        <li>Immediate Response To Security Incidents.</li>
                        <li>Continuous System Updates And Enhancements.</li>
                        <li>Educating Users On Best Security Practices.</li>
                      </ul>
                    </div>
                    {/* PRIVACY */}
                    <div>
                      <h3 className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium mb-2 tracking-wider uppercase">
                        PRIVACY
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        We Protect User Data By:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Enforcing Strict Data Protection Policies.</li>
                        <li>
                          Minimizing Data Collection To Essential Information.
                        </li>
                        <li>Ensuring Secure Data Transmission.</li>
                        <li>Conducting Regular Privacy Audits.</li>
                        <li>Giving Users Control Over Their Personal Data.</li>
                      </ul>
                    </div>
                    {/* INNOVATION */}
                    <div>
                      <h3 className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium mb-2 tracking-wider uppercase">
                        INNOVATION
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        We Continuously Improve Our Platform By:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Advancing Blockchain And Security Technology.</li>
                        <li>Enhancing The User Experience.</li>
                        <li>Developing New Features For Better Usability.</li>
                        <li>Strengthening Security Measures.</li>
                        <li>Leading The Industry In Responsible Innovation.</li>
                      </ul>
                    </div>
                    {/* COMMUNITY ENGAGEMENT */}
                    <div className="md:col-span-2">
                      <h3 className="text-[#92A5A8] text-[12px] md:text-[14px] font-medium mb-2 tracking-wider uppercase">
                        COMMUNITY ENGAGEMENT
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        We Foster An Ethical And Responsible User Community By:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Encouraging Active Participation And Feedback.</li>
                        <li>Upholding Fair Treatment For All Users.</li>
                        <li>Maintaining Open Lines Of Communication.</li>
                        <li>
                          Supporting Users Through Education And Assistance.
                        </li>
                        <li>Promoting Ethical Digital Asset Management.</li>
                      </ul>
                    </div>
                  </div>

                  {/* User & Platform Responsibilities */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-8 mt-12">
                    User & Platform Responsibilities
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* USER RESPONSIBILITIES */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        USER RESPONSIBILITIES
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        To Maintain Platform Integrity, Users Must:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Provide Accurate And Truthful Information.</li>
                        <li>Follow Security Best Practices.</li>
                        <li>
                          Report Suspicious Activities Or Vulnerabilities.
                        </li>
                        <li>Respect Platform Rules And Policies.</li>
                        <li>
                          Engage With The Platform And Community Ethically.
                        </li>
                      </ul>
                    </div>
                    {/* PLATFORM RESPONSIBILITIES */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        PLATFORM RESPONSIBILITIES
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        As A Responsible Service Provider, We Commit To:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Keeping Users Informed Through Regular Updates.</li>
                        <li>
                          Incorporating User Feedback To Improve Services.
                        </li>
                        <li>Ensuring Transparency In All Decision-Making.</li>
                        <li>Offering Fair And Unbiased Dispute Resolution.</li>
                        <li>Providing Reliable Community Support.</li>
                      </ul>
                    </div>
                  </div>

                  {/* User Rights and Controls */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-8 mt-12">
                    User Rights and Controls
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* ACCESS RIGHTS */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        ACCESS RIGHTS
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">Users Can:</p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Request Data Copies</li>
                        <li>Correct Personal Information</li>
                        <li>Delete Account Data</li>
                        <li>Export Transaction History</li>
                        <li>Review Security Logs</li>
                      </ul>
                    </div>
                    {/* PRIVACY CONTROLS */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        PRIVACY CONTROLS
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        Users Manage:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Visibility Settings</li>
                        <li>Communication Preferences</li>
                        <li>Data Sharing Options</li>
                        <li>Authentication Methods</li>
                        <li>Activity Notifications</li>
                      </ul>
                    </div>
                  </div>

                  {/* Compliance Framework */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-8 mt-12">
                    Compliance Framework
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* LEGAL ADHERENCE */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        LEGAL ADHERENCE
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        We Ensure Full Compliance With Regulatory Standards By:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Following All Applicable Laws And Regulations.</li>
                        <li>Maintaining Necessary Legal Documentation.</li>
                        <li>Keeping Licenses And Certifications Up To Date.</li>
                        <li>
                          Conducting Regular Audits And Compliance Checks.
                        </li>
                        <li>Updating Policies In Response To Legal Changes.</li>
                      </ul>
                    </div>
                    {/* ETHICAL STANDARDS */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        ETHICAL STANDARDS
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        We Uphold The Highest Professional And Ethical Standards
                        By:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Maintaining Integrity In All Operations.</li>
                        <li>Treating All Users Fairly And Equally.</li>
                        <li>Ensuring Equal Access To Platform Features.</li>
                        <li>Communicating Honestly And Transparently.</li>
                        <li>
                          Innovating Responsibly With User Security In Mind.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Card (separate) */}
          <div className="bg-transparent border-none rounded-lg flex flex-col reveal hover-raise" data-step={4}>
            <button
              className="flex items-center justify-between space-x-4 w-full focus:outline-none"
              onClick={() => toggleSection("terms")}
              aria-expanded={expanded.terms}
              aria-controls="terms-content"
            >
              {expanded.terms ? (
                <div className="bg-[#1C252A] h-[8px] w-[32px] rounded-[4px] transition-all duration-200" />
              ) : (
                <div className="w-[32px] h-[8px]" />
              )}
              <div className="flex items-center justify-between w-full border-b border-[#232D33] py-4">
                <h2 className="text-[18px] md:text-[24px] font-medium text-[#FCFFFF]">
                  Terms and Conditions
                </h2>
                <Image
                  src="/assets/icons/arrowdown.svg"
                  alt="arrow down icon"
                  width={13.5}
                  height={13.5}
                  className={`inline-block transition-transform duration-200 ${
                    expanded.terms ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </div>
            </button>
            <div
              id="terms-content"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expanded.terms ? "max-h-[2000px] py-6" : "max-h-0 py-0"
              }`}
            >
              <div className="guidelines-box">
                <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                  {/* All content below uses text-[#FCFFFF] and text-sm for consistency */}
                  {/* Account Creation */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-6">
                    Account Creation
                  </h2>
                  <p className="mb-2 text-[#FCFFFF] text-sm">
                    Users Must Provide Accurate And Complete Information When
                    Creating An Account On Our Platform. This Includes:
                  </p>
                  <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1 mb-2">
                    <li>
                      Legal Name, Current Address, And Valid Contact Information
                    </li>
                    <li>Verifiable Identification Documents When Requested</li>
                    <li>Regular Updates To Maintain Information Accuracy</li>
                    <li>
                      Agreement Not To Impersonate Others Or Create Accounts For
                      Unauthorized Purposes
                    </li>
                  </ul>
                  <p className="mb-6 text-[#FCFFFF] text-sm">
                    The Platform Reserves The Right To Verify User Information
                    At Any Time And May Suspend Or Terminate Accounts Containing
                    False Or Misleading Information.
                  </p>

                  <div className="bg-[#1C252A] h-[2px] w-[95%] mx-auto my-8"></div>

                  {/* Usage Rules */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-6">
                    Usage Rules
                  </h2>
                  <p className="mb-2 text-[#FCFFFF] text-sm">
                    Users Agree To Comply With The Following Platform
                    Guidelines:
                  </p>
                  <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1 mb-2">
                    <li>
                      Adhere To All Applicable Laws And Regulations Regarding
                      Digital Asset Transactions
                    </li>
                    <li>
                      Maintain Appropriate Licenses And Permissions For Trading
                      Activities
                    </li>
                    <li>
                      Follow Platform-Specific Trading Rules And Limitations
                    </li>
                    <li>
                      Respect Intellectual Property Rights And Third-Party
                      Rights
                    </li>
                    <li>
                      Refrain From Manipulative Or Deceptive Trading Practices
                    </li>
                    <li>
                      Comply With Anti-Money Laundering (AML) And
                      Know-Your-Customer (KYC) Requirements
                    </li>
                  </ul>

                  <div className="bg-[#1C252A] h-[2px] w-[95%] mx-auto my-8"></div>

                  {/* Security Responsibilities */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-6">
                    Security Responsibilities
                  </h2>
                  <p className="mb-2 text-[#FCFFFF] text-sm">
                    Users Acknowledge And Accept The Following Security
                    Obligations:
                  </p>
                  <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1 mb-2">
                    <li>
                      Maintaining The Confidentiality Of Authentication
                      Credentials
                    </li>
                    <li>
                      Using Strong, Unique Passwords And Enabling Two-Factor
                      Authentication
                    </li>
                    <li>Regular Monitoring Of Account Activity</li>
                    <li>
                      Immediate Reporting Of Unauthorized Access Or Suspicious
                      Activities
                    </li>
                    <li>Keeping Security Software And Systems Up To Date</li>
                  </ul>
                  <p className="mb-2 text-[#FCFFFF] text-sm">
                    Following Recommended Security Practices Provided By The
                    Platform
                  </p>
                  <p className="mb-6 text-[#FCFFFF] text-sm">
                    The Platform Reserves The Right To Implement Additional
                    Security Measures As Needed.
                  </p>

                  <div className="bg-[#1C252A] h-[2px] w-[95%] mx-auto my-8"></div>

                  {/* Liability */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-6">
                    Liability
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Platform Liability Limitations */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        PLATFORM LIABILITY LIMITATIONS
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        The Platform&apos;s Liability Is Limited In The
                        Following Circumstances:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Loss Of Digital Assets Due To Market Volatility</li>
                        <li>
                          Technical Issues Beyond The Platform&apos;s Reasonable
                          Control
                        </li>
                        <li>Third-Party Service Provider Failures</li>
                        <li>User Error Or Negligence</li>
                        <li>Force Majeure Events</li>
                      </ul>
                    </div>
                    {/* User Liability */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        USER LIABILITY
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        Users Are Liable For:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>
                          Losses Resulting From Compromised Account Credentials
                        </li>
                        <li>Unauthorized Transactions From Their Account</li>
                        <li>Violations Of Platform Rules And Guidelines</li>
                        <li>
                          Any Fraudulent Or Illegal Activities Conducted Through
                          Their Account
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#1C252A] h-[2px] w-[95%] mx-auto my-8"></div>

                  {/* Dispute Resolution */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-6">
                    Dispute Resolution
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Resolution Process */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        RESOLUTION PROCESS
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        Disputes Will Be Resolved Through The Following Process:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Initial Review By Platform Support Team</li>
                        <li>
                          Internal Investigation Of Relevant Transaction Data
                        </li>
                        <li>Mediation Between Involved Parties</li>
                        <li>Final Determination By Platform Administration</li>
                        <li>Option For Third-Party Arbitration If Necessary</li>
                      </ul>
                    </div>
                    {/* Time Limits */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        TIME LIMITS
                      </h3>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>
                          Disputes Must Be Filed Within 30 Days Of The Incident
                        </li>
                        <li>
                          Platform Will Acknowledge Disputes Within 2 Business
                          Days
                        </li>
                        <li>
                          Initial Response Provided Within 5 Business Days
                        </li>
                        <li>Resolution Target Within 30 Days Of Filing</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#1C252A] h-[2px] w-[95%] mx-auto my-8"></div>

                  {/* Service Termination */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-6">
                    Service Termination
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Platform-Initiated Termination */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        PLATFORM-INITIATED TERMINATION
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        The Platform May Terminate Or Suspend Services For:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>Violation Of Terms And Conditions</li>
                        <li>Suspicious Or Fraudulent Activity</li>
                        <li>Extended Period Of Account Inactivity</li>
                        <li>Regulatory Or Legal Requirements</li>
                        <li>Platform Maintenance Or Upgrades</li>
                        <li>
                          Business Decisions Affecting Service Availability
                        </li>
                      </ul>
                    </div>
                    {/* Effect of Termination */}
                    <div>
                      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 tracking-wider uppercase">
                        EFFECT OF TERMINATION
                      </h3>
                      <p className="mb-2 text-[#FCFFFF] text-sm">
                        Upon Termination:
                      </p>
                      <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1">
                        <li>
                          Access To Services Will Be Immediately Suspended
                        </li>
                        <li>
                          Pending Transactions May Be Completed Or Cancelled
                        </li>
                        <li>User Data Will Be Retained As Required By Law</li>
                        <li>Certain Obligations Survive Termination</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#1C252A] h-[2px] w-[95%] mx-auto my-8"></div>

                  {/* Modification of Terms */}
                  <h2 className="text-[20px] md:text-[24px] text-[#FCFFFF] font-semibold mb-6">
                    Modification of Terms
                  </h2>
                  <p className="mb-2 text-[#FCFFFF] text-sm">
                    The Platform Reserves The Right To Modify These Terms And
                    Conditions At Any Time. Users Will Be Notified Of
                    Significant Changes Through:
                  </p>
                  <ul className="list-disc pl-6 text-[#FCFFFF] text-sm space-y-1 mb-2">
                    <li>Email Notifications</li>
                    <li>Platform Announcements</li>
                    <li>Website Updates</li>
                  </ul>
                  <p className="mb-2 text-[#FCFFFF] text-sm">
                    Continued Use Of The Platform After Modifications
                    Constitutes Acceptance Of Updated Terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Launch App Button */}
          <div className="pt-4 mt-[1rem] reveal" data-step={5}>
            <button className="group cursor-pointer bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center hover-raise">
               <span>LAUNCH APP</span>
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
+      <style jsx>{`
+        .reveal { opacity: 0; transform: translateY(18px); transition: opacity 520ms cubic-bezier(.2,.9,.3,1), transform 520ms cubic-bezier(.2,.9,.3,1); }
+        .reveal.reveal-active { opacity: 1; transform: translateY(0); }
+        .hover-raise { transition: transform 260ms ease, box-shadow 260ms ease; }
+        .hover-raise:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,0.28); }
+      `}</style>
     </div>
   );
 };

 export default GuidelinesPage;
