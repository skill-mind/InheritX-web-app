import React from "react";
import "./guidelines.css";
import Image from "next/image";

const GuidelinesPage = () => {
  return (
    <div className="min-h-screen max-w-[110rem] mx-auto text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 mt-[8rem] mb-[20rem]">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-[24px] md:text-[32px] text-[#FCFFFF] font-semibold mb-4">
            Guidelines
          </h1>
          <p className="text-[#92A5A8] text-base md:text-[14px]">
            Here are some frequently asked questions about InheritX
          </p>
        </div>

        {/* Guidelines Cards */}
        <div className="space-y-6 sm:space-y-8">
          {/* Privacy Policy Card */}
          <div className="bg-transparent border-none rounded-lg flex items-center justify-between space-x-4">
            <div className="bg-[#1C252A] h-[8px] w-[32px] rounded-[4px]"></div>
            <div className="flex items-center justify-between w-full">
              <h2 className="text-[18px] md:text-[24px] font-medium">
                Privacy Policy
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
          </div>

          {/* Data Collection and Usage Card */}
          <div className="guidelines-box">
            <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[14px] md:text-[18px] text-[#FCFFFF] font-medium">
                  Data Collection and Usage
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
                    <li>• Regular Security Audits And Penetration Testing</li>
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

            {/* Code of Ethics Card */}
            {/* <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] md:text-[18px] text-[#FCFFFF] font-medium">
                  Code of Ethics
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
            </div> */}

            {/* Terms and Conditions Card */}
            {/* <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] md:text-[18px] text-[#FCFFFF] font-medium">
                  Terms and Conditions
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
            </div> */}
          </div>
        </div>

        {/* Launch App Button */}
        <div className="pt-4 mt-[1rem]">
          <button className="group bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center">
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
  );
};

export default GuidelinesPage;
