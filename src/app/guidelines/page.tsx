import React, { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => (
  <div className="border border-gray-700 rounded-lg mb-4">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-800/30 transition-colors duration-200"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
      <svg
        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
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
    </button>
    {isOpen && <div className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</div>}
  </div>
);

const GuidelinesPage = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    "privacy-policy": false,
    "data-collection": false,
    "data-protection": false,
    "user-rights": false,
    "third-party": false,
    "code-of-ethics": false,
    "terms-conditions": false,
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Guidelines
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            Here are some frequently asked questions about InheritX
          </p>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-4">
          {/* Privacy Policy */}
          <CollapsibleSection
            title="Privacy Policy"
            isOpen={openSections["privacy-policy"]}
            onToggle={() => toggleSection("privacy-policy")}
          >
            <div className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                At InheritX, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy outlines how we collect, use, and safeguard your data
                when you use our platform.
              </p>
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  Information We Collect
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                  <li>
                    Personal identification information (name, email, wallet
                    addresses)
                  </li>
                  <li>Account credentials and authentication data</li>
                  <li>Transaction history and blockchain interactions</li>
                  <li>Device information and usage analytics</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          {/* Data Collection and Usage */}
          <CollapsibleSection
            title="Data Collection and Usage"
            isOpen={openSections["data-collection"]}
            onToggle={() => toggleSection("data-collection")}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-gray-300">
              {/* Personal Information */}
              <div>
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  PERSONAL INFORMATION
                </h3>
                <div className="space-y-2">
                  <h4 className="text-white text-sm sm:text-base font-medium">
                    We Collect:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Legal Name And Contact Information</li>
                    <li>Government-Issued Identification</li>
                    <li>Cryptocurrency Wallet Addresses</li>
                    <li>Beneficiary Information</li>
                    <li>Communication Preferences</li>
                  </ul>
                </div>
              </div>

              {/* Technical Data */}
              <div>
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  TECHNICAL DATA
                </h3>
                <div className="space-y-2">
                  <h4 className="text-white text-sm sm:text-base font-medium">
                    We Record:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Device Information</li>
                    <li>IP Address</li>
                    <li>Browser Type And Version</li>
                    <li>Session Information</li>
                    <li>System Logs</li>
                  </ul>
                </div>
              </div>

              {/* Usage Data */}
              <div className="lg:col-span-2">
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  USAGE DATA
                </h3>
                <div className="space-y-2">
                  <h4 className="text-white text-sm sm:text-base font-medium">
                    We Monitor:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4 grid grid-cols-1 sm:grid-cols-2 gap-1">
                    <li>Platform Interaction Patterns</li>
                    <li>Security Event Logs</li>
                    <li>Transaction History</li>
                    <li>Smart Contract Interactions</li>
                    <li>Feature Utilization Metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Data Protection */}
          <CollapsibleSection
            title="Data Protection"
            isOpen={openSections["data-protection"]}
            onToggle={() => toggleSection("data-protection")}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-gray-300">
              {/* Security Measures */}
              <div>
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  SECURITY MEASURES
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>End-To-End Encryption For All Sensitive Data</li>
                  <li>Regular Security Audits And Penetration Testing</li>
                  <li>Zero-Knowledge Proof Implementation</li>
                  <li>Secure Key Management Systems</li>
                  <li>Regular Backup And Recovery Testing</li>
                </ul>
              </div>

              {/* Storage and Retention */}
              <div>
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  STORAGE AND RETENTION
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Encrypted Storage On Distributed Systems</li>
                  <li>Regular Data Minimization Reviews</li>
                  <li>Compliance With Retention Regulations</li>
                  <li>Secure Data Destruction Protocols</li>
                  <li>Backup Maintenance Procedures</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          {/* User Rights and Controls */}
          <CollapsibleSection
            title="User Rights and Controls"
            isOpen={openSections["user-rights"]}
            onToggle={() => toggleSection("user-rights")}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-gray-300">
              {/* Access Rights */}
              <div>
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  ACCESS RIGHTS
                </h3>
                <div className="space-y-2">
                  <h4 className="text-white text-sm sm:text-base font-medium">
                    Users May:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Request Data Copies</li>
                    <li>Correct Personal Information</li>
                    <li>Delete Account Data</li>
                    <li>Export Transaction History</li>
                    <li>Review Security Logs</li>
                  </ul>
                </div>
              </div>

              {/* Privacy Controls */}
              <div>
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  PRIVACY CONTROLS
                </h3>
                <div className="space-y-2">
                  <h4 className="text-white text-sm sm:text-base font-medium">
                    Users Manage:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Marketing Settings</li>
                    <li>Communication Preferences</li>
                    <li>Data Sharing Options</li>
                    <li>Authentication Methods</li>
                    <li>Activity Notifications</li>
                  </ul>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Third-Party Sharing */}
          <CollapsibleSection
            title="Third-Party Sharing"
            isOpen={openSections["third-party"]}
            onToggle={() => toggleSection("third-party")}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-gray-300">
              {/* Service Providers */}
              <div>
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  SERVICE PROVIDERS
                </h3>
                <div className="space-y-2">
                  <h4 className="text-white text-sm sm:text-base font-medium">
                    Limited Sharing With:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Identity Verification Services</li>
                    <li>Blockchain Infrastructure Partners</li>
                    <li>Legal Compliance Partners</li>
                    <li>Third-Party Infrastructure Providers</li>
                    <li>Customer Support Systems</li>
                  </ul>
                </div>
              </div>

              {/* Legal Requirements */}
              <div>
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  LEGAL REQUIREMENTS
                </h3>
                <div className="space-y-2">
                  <h4 className="text-white text-sm sm:text-base font-medium">
                    Data Shared For:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Regulatory Compliance</li>
                    <li>Anti-Money Laundering</li>
                    <li>Law Enforcement Requests</li>
                    <li>Court Orders</li>
                    <li>Fraud Prevention</li>
                  </ul>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Code of Ethics */}
          <CollapsibleSection
            title="Code of Ethics"
            isOpen={openSections["code-of-ethics"]}
            onToggle={() => toggleSection("code-of-ethics")}
          >
            <div className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                InheritX is committed to maintaining the highest ethical
                standards in all our operations. Our Code of Ethics guides our
                interactions with users, partners, and the broader community.
              </p>
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  Core Principles
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                  <li>Transparency in all operations and communications</li>
                  <li>Security-first approach to protect user assets</li>
                  <li>Respect for user privacy and data rights</li>
                  <li>Fair and equal treatment of all users</li>
                  <li>Continuous improvement and innovation</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          {/* Terms and Conditions */}
          <CollapsibleSection
            title="Terms and Conditions"
            isOpen={openSections["terms-conditions"]}
            onToggle={() => toggleSection("terms-conditions")}
          >
            <div className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                By using InheritX, you agree to be bound by these Terms and
                Conditions. Please read them carefully as they contain important
                information about your rights and obligations.
              </p>
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  Key Terms
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                  <li>User responsibilities and acceptable use policies</li>
                  <li>Service availability and maintenance schedules</li>
                  <li>Fee structure and payment terms</li>
                  <li>Limitation of liability and disclaimers</li>
                  <li>Dispute resolution procedures</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Contact Support Link */}
        <div className="mt-12 sm:mt-16 flex justify-end">
          <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm">Contact Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;
