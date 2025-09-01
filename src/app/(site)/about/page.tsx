import React from "react";
import Image from "next/image";
import { Headphones } from "lucide-react";

import "./about.css";

const AboutPage = () => {
  return (
    <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 mt-[8rem] mb-[20rem]">
      {/* Desktop - Hero Bacground Particles */}
      <Image
        src="/assets/images/about_page_tree_right.svg"
        alt="background vector"
        fill={false}
        width={1920}
        height={400}
        className="absolute right-0 top-0 z-0 h-auto pointer-events-none select-none hidden md:block"
      />

      {/* Desktop - Benefit-Section Bacground Particles */}
      <Image
        src="/assets/images/about_page_tree_left.svg"
        alt="background vector"
        fill={false}
        width={400}
        height={400}
        className="absolute left-0 top-0 z-0 h-auto pointer-events-none select-none hidden md:block"
      />

      {/* Desktop -  Page-Bottom-Section Bacground Particles */}
      <Image
        src="/assets/images/small_tree_left.svg"
        alt="background vector"
        fill={false}
        width={200}
        height={200}
        className="absolute left-0 top-[130%] z-0 h-auto pointer-events-none select-none hidden md:block"
      />

      <Image
        src="/assets/images/small_tree_right.svg"
        alt="background vector"
        fill={false}
        width={200}
        height={200}
        className="absolute right-0 top-[130%] z-0 h-auto pointer-events-none select-none hidden md:block"
      />
      <div className="max-w-6xl mx-auto">
        {/* About InheritX Section */}
        <div className="mb-12">
          <h1 className="text-xl md:text-[32px] text-[#FCFFFF] font-bold mb-2">
            About InheritX
          </h1>
          <div className="space-y-4 sm:space-y-6 text-[#92A5A8] text-[12px] md:text-[14px] leading-relaxed max-w-[716px]">
            <p>
              InheritX is a cutting-edge blockchain platform dedicated to
              revolutionizing how digital assets are secured and passed down. We
              combine security, transparency, and decentralization to ensure
              your crypto and NFTs remain protected across generations. <br />
              Founded by a team of blockchain experts at Salt Mind, InheritX was
              created to bridge the gap between traditional estate planning and
              the digital economy. We provide a secure, decentralized solution
              that ensures digital assets are protected, preserved, and passed
              on with efficiency and transparency.
            </p>
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-6">
          {/* Our Vision */}
          <div className="bg-[#1C252A] rounded-[48px] p-[48px] sm:p-8 flex flex-col item-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-[24px] text-[#FCFFFF] font-medium mb-2">
              Our Vision
            </h2>
            <p className="text-sm sm:text-[14px] text-[#92A5A8] mb-4 sm:mb-6 tracking-wider">
              To Make Digital Inheritance Seamless, Secure, & Automated.{" "}
            </p>
            <p className="text-base sm:text-[16px] text-[#FCFFFF] leading-[28px]">
              We envision a world where passing down cryptocurrencies and NFTs
              is automated, secure, and effortless. By leveraging cutting-edge
              blockchain technology, we aim to be the trusted partner for
              individuals, families, and businesses in digital estate planning.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-[#1C252A] rounded-[48px] p-[48px] sm:p-8 flex flex-col item-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-[24px] text-[#FCFFFF] font-medium mb-2">
              Our Mission
            </h2>
            <p className="text-sm sm:text-[14px] text-[#92A5A8] mb-4 sm:mb-6 tracking-wider">
              To Secure Digital Wealth for Generations
            </p>
            <p className="text-base sm:text-[16px] text-[#FCFFFF] leading-[28px]">
              We believe digital assets deserve the same trust, security, and
              transparency as traditional assets. InheritX is dedicated to
              building a decentralized inheritance platform that empowers users
              to protect and transfer their digital wealth with confidence.
            </p>
          </div>
        </div>

        <div className="bg-[#1C252A] h-[12px] w-full rounded-[12px] mb-12"></div>

        {/* Core Values Section */}
        <div className="about-box rounded-[8px] rounded-r-[48px] py-[32px] px-[48px] mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-[18px] font-medium mb-6 sm:mb-8 text-[#33C5E0]">
            Our Core Values
          </h2>
          <p className="text-[#92A5A8] text-base md:text-[14px] leading-relaxed max-w-5xl">
            At InheritX, we uphold security, transparency, innovation,
            user-centricity, and convenience as core values. We prioritize
            robust security measures, ensure clear and verifiable processes,
            embrace cutting-edge blockchain advancements, and design intuitive
            experiences—all while adhering to the highest legal standards.
          </p>
        </div>

        {/* Launch App Button */}
        <div className="pt-4">
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

        {/* Contact Support */}
        <div className="flex absolute right-[10%] top-[65%] items-center gap-3 text-[#92A5A8] text-[14px] bg-[#182024] hover:text-white transition-colors duration-200 cursor-pointer group">
          <Headphones className="w-[16px] h-[16px] group-hover:text-cyan-400 transition-colors duration-200" />
          <span className="text-[14px] font-medium">Contact Support</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
