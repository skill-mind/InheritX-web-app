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
        </div>

        {/* Core Principles */}
        <div className="space-y-6 sm:space-y-8 guidelines-box p-4 md:py-[32px] md:px-[48px]">
          <h2 className="text-[16px] md:text-[18px] font-medium mb-6">
            Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Transparency */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Transparency
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                We are committed to open and honest communication by:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Clearly communicating all processes.</li>
                <li>Providing regular updates on platform status.</li>
                <li>Maintaining open documentation of procedures.</li>
                <li>Ensuring honest reporting of incidents.</li>
                <li>Offering accessible support channels.</li>
              </ul>
            </div>
            {/* Security */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Security
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                We prioritize the safety of user assets through:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Regular security assessments and audits.</li>
                <li>Proactive threat monitoring.</li>
                <li>Immediate response to security incidents.</li>
                <li>Continuous system updates and enhancements.</li>
                <li>Educating users on best security practices.</li>
              </ul>
            </div>
            {/* Privacy */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Privacy
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                We protect user data by:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Enforcing strict data protection policies.</li>
                <li>Minimizing data collection to essential information.</li>
                <li>Ensuring secure data transmission.</li>
                <li>Conducting regular privacy audits.</li>
                <li>Giving users control over their personal data.</li>
              </ul>
            </div>
            {/* Innovation */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Innovation
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                We continuously improve our platform by:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Advancing blockchain and security technology.</li>
                <li>Enhancing the user experience.</li>
                <li>Developing new features for better usability.</li>
                <li>Strengthening security measures.</li>
                <li>Leading the industry in responsible innovation.</li>
              </ul>
            </div>
            {/* Community Engagement */}
            <div className="md:col-span-2">
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Community Engagement
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                We foster an ethical and responsible user community by:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Encouraging active participation and feedback.</li>
                <li>Upholding fair treatment for all users.</li>
                <li>Maintaining open lines of communication.</li>
                <li>Supporting users through education and assistance.</li>
                <li>Promoting ethical digital asset management.</li>
              </ul>
            </div>
          </div>

          {/* User & Platform Responsibilities */}
          <h2 className="text-[16px] md:text-[18px] font-medium mt-12 mb-6">
            User & Platform Responsibilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Responsibilities */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                User Responsibilities
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                To maintain platform integrity, users must:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Provide accurate and truthful information.</li>
                <li>Follow security best practices.</li>
                <li>Report suspicious activities or vulnerabilities.</li>
                <li>Respect platform rules and policies.</li>
                <li>Engage with the platform and community ethically.</li>
              </ul>
            </div>
            {/* Platform Responsibilities */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Platform Responsibilities
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                As a responsible service provider, we commit to:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Keeping users informed through regular updates.</li>
                <li>Incorporating user feedback to improve services.</li>
                <li>Ensuring transparency in all decision-making.</li>
                <li>Offering fair and unbiased dispute resolution.</li>
                <li>Providing reliable community support.</li>
              </ul>
            </div>
          </div>

          {/* User Rights and Controls */}
          <h2 className="text-[16px] md:text-[18px] font-medium mt-12 mb-6">
            User Rights and Controls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Access Rights */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Access Rights
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">Users can:</p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Request data copies</li>
                <li>Correct personal information</li>
                <li>Delete account data</li>
                <li>Export transaction history</li>
                <li>Review security logs</li>
              </ul>
            </div>
            {/* Privacy Controls */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Privacy Controls
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">Users manage:</p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Visibility settings</li>
                <li>Communication preferences</li>
                <li>Data sharing options</li>
                <li>Authentication methods</li>
                <li>Activity notifications</li>
              </ul>
            </div>
          </div>

          {/* Compliance Framework */}
          <h2 className="text-[16px] md:text-[18px] font-medium mt-12 mb-6">
            Compliance Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Legal Adherence */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Legal Adherence
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                We ensure full compliance with regulatory standards by:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Following all applicable laws and regulations.</li>
                <li>Maintaining necessary legal documentation.</li>
                <li>Keeping licenses and certifications up to date.</li>
                <li>Conducting regular audits and compliance checks.</li>
                <li>Updating policies in response to legal changes.</li>
              </ul>
            </div>
            {/* Ethical Standards */}
            <div>
              <h3 className="text-[#92A5A8] text-[14px] font-medium mb-2 uppercase">
                Ethical Standards
              </h3>
              <p className="text-[#FCFFFF] text-sm mb-2">
                We uphold the highest professional and ethical standards by:
              </p>
              <ul className="list-disc pl-6 text-[#FCFFFF] text-sm mb-2">
                <li>Maintaining integrity in all operations.</li>
                <li>Treating all users fairly and equally.</li>
                <li>Ensuring equal access to platform features.</li>
                <li>Communicating honestly and transparently.</li>
                <li>Innovating responsibly with user security in mind.</li>
              </ul>
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
