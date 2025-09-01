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

        <div className="bg-transparent border-none rounded-lg flex items-center justify-between space-x-4 mb-[2rem]">
          <div className="bg-[#1C252A] h-[8px] w-[32px] rounded-[4px]"></div>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-[18px] md:text-[24px] font-medium">
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
        </div>

        {/* Guidelines Cards */}
        <div className="space-y-6 sm:space-y-8">
          {/* Terms and Conditions Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Account Creation */}
            <div className="guidelines-box">
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h2 className="text-[18px] md:text-[24px] font-medium mb-4">
                  Account Creation
                </h2>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  Users must provide accurate and complete information when
                  creating an account on our platform. This includes:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>
                    Legal name, current address, and valid contact information
                  </li>
                  <li>Verifiable identification documents when requested</li>
                  <li>Regular updates to maintain information accuracy</li>
                  <li>
                    Agreement not to impersonate others or create accounts for
                    unauthorized purposes
                  </li>
                </ul>
                <p className="text-[#FCFFFF] text-sm">
                  The platform reserves the right to verify user information at
                  any time and may suspend or terminate accounts containing
                  false or misleading information.
                </p>
              </div>
            </div>

            {/* Usage Rules */}
            <div className="guidelines-box">
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h2 className="text-[18px] md:text-[24px] font-medium mb-4">
                  Usage Rules
                </h2>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  Users agree to comply with the following platform guidelines:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>
                    Adhere to all applicable laws and regulations regarding
                    digital asset transactions
                  </li>
                  <li>
                    Maintain appropriate licenses and permissions for trading
                    activities
                  </li>
                  <li>
                    Follow platform-specific trading rules and limitations
                  </li>
                  <li>
                    Respect intellectual property rights and third-party rights
                  </li>
                  <li>
                    Refrain from manipulative or deceptive trading practices
                  </li>
                  <li>
                    Comply with anti-money laundering (AML) and
                    know-your-customer (KYC) requirements
                  </li>
                </ul>
              </div>
            </div>

            {/* Security Responsibilities */}
            <div className="guidelines-box">
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h2 className="text-[18px] md:text-[24px] font-medium mb-4">
                  Security Responsibilities
                </h2>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  Users acknowledge and accept the following security
                  obligations:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>
                    Maintaining the confidentiality of authentication
                    credentials
                  </li>
                  <li>
                    Using strong, unique passwords and enabling two-factor
                    authentication
                  </li>
                  <li>Regular monitoring of account activity</li>
                  <li>
                    Immediate reporting of unauthorized access or suspicious
                    activities
                  </li>
                  <li>Keeping security software and systems up to date</li>
                </ul>
                <p className="text-[#FCFFFF] text-sm">
                  Following recommended security practices provided by the
                  platform. The platform reserves the right to implement
                  additional security measures as needed.
                </p>
              </div>
            </div>

            {/* Liability */}
            <div className="guidelines-box grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h2 className="text-[18px] md:text-[24px] font-medium mb-4">
                  Liability
                </h2>
                <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2">
                  Platform Liability Limitations
                </h3>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  The platform's liability is limited in the following
                  circumstances:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>Loss of digital assets due to market volatility</li>
                  <li>
                    Technical issues beyond the platform's reasonable control
                  </li>
                  <li>Third-party service provider failures</li>
                  <li>User error or negligence</li>
                  <li>Force majeure events</li>
                </ul>
              </div>
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2">
                  User Liability
                </h3>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  Users are liable for:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>Losses resulting from compromised account credentials</li>
                  <li>Unauthorized transactions from their account</li>
                  <li>Violations of platform rules and guidelines</li>
                  <li>
                    Any fraudulent or illegal activities conducted through their
                    account
                  </li>
                </ul>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="guidelines-box grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h2 className="text-[18px] md:text-[24px] font-medium mb-4">
                  Dispute Resolution
                </h2>
                <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2">
                  Resolution Process
                </h3>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  Disputes will be resolved through the following process:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>Initial review by platform support team</li>
                  <li>Internal investigation of relevant transaction data</li>
                  <li>Mediation between involved parties</li>
                  <li>Final determination by platform administration</li>
                  <li>Option for third-party arbitration if necessary</li>
                </ul>
              </div>
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2">
                  Time Limits
                </h3>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>Disputes must be filed within 30 days of the incident</li>
                  <li>
                    Platform will acknowledge disputes within 2 business days
                  </li>
                  <li>Initial response provided within 5 business days</li>
                  <li>Resolution target within 30 days of filing</li>
                </ul>
              </div>
            </div>

            {/* Service Termination */}
            <div className="guidelines-box grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h2 className="text-[18px] md:text-[24px] font-medium mb-4">
                  Service Termination
                </h2>
                <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2">
                  Platform-Initiated Termination
                </h3>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  The platform may terminate or suspend services for:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>Violation of terms and conditions</li>
                  <li>Suspicious or fraudulent activity</li>
                  <li>Extended period of account inactivity</li>
                  <li>Regulatory or legal requirements</li>
                  <li>Platform maintenance or upgrades</li>
                  <li>Business decisions affecting service availability</li>
                </ul>
                <h3 className="text-[#92A5A8] text-[14px] font-medium mt-6 mb-2">
                  Effect of Termination
                </h3>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>Access to services will be immediately suspended</li>
                  <li>Pending transactions may be completed or cancelled</li>
                  <li>User data will be retained as required by law</li>
                  <li>Certain obligations survive termination</li>
                </ul>
              </div>
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2">
                  Platform-Initiated Termination
                </h3>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  The platform may terminate or suspend services for:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>Violation of terms and conditions</li>
                  <li>Suspicious or fraudulent activity</li>
                  <li>Extended period of account inactivity</li>
                  <li>Regulatory or legal requirements</li>
                  <li>Platform maintenance or upgrades</li>
                  <li>Business decisions affecting service availability</li>
                </ul>
              </div>
            </div>

            {/* Modification of Terms */}
            <div className="guidelines-box">
              <div className="bg-transparent border-none rounded-lg p-6 sm:p-8">
                <h2 className="text-[18px] md:text-[24px] font-medium mb-4">
                  Modification of Terms
                </h2>
                <p className="text-[#FCFFFF] text-sm mb-2">
                  The platform reserves the right to modify these terms and
                  conditions at any time. Users will be notified of significant
                  changes through:
                </p>
                <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                  <li>Email notifications</li>
                  <li>Platform announcements</li>
                  <li>Website updates</li>
                </ul>
                <p className="text-[#FCFFFF] text-sm">
                  Continued use of the platform after modifications constitutes
                  acceptance of updated terms.
                </p>
              </div>
            </div>
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
