import React from "react";
import Image from "next/image";
import "./about.css";

const About = () => {
  return (
    <div className="w-full min-h-[150vh] relative">
      <Image
        src="/assets/images/about_tree_left.svg"
        alt="background vector"
        width={400}
        height={400}
        className="absolute left-0 top-[24%] z-0 h-auto pointer-events-none select-none hidden md:block"
      />
      <div className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 max-w-[100rem] mx-auto">
        {/* What Is InheritX Section */}
        <div className="mb-20 lg:mb-32">
          <div className="grid grid-cols-1 gap-12 items-start max-w-3xl mx-auto">
            {/* Left Content */}
            <div className="space-y-6  w-full">
              <h2 className="text-xl lg:text-[32px] font-bold text-[#FCFFFF] leading-tight">
                What Is InheritX?
              </h2>
              <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p className="text-[#92A5A8] text-[14px] font-medium">
                  Without mincing words,
                </p>
                <p className="text-[#FCFFFF] text-[18px]">
                  InheritX helps you plan and share your assets with the right
                  people, at the right time. We make inheritance simple, secure,
                  and stress-free — without unnecessary delays or complications.
                </p>
                <p className="text-[#FCFFFF] text-[18px]">
                  Think of it as planting a tree: your roots are the assets you&apos;ve built, and we make sure the branches grow to those you care about most.
                </p>
              </div>
            </div>

            {/* Right side - Reserved for background elements */}
            <div className="hidden lg:block">
              {/* Space reserved for your background particles */}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full flex justify-center items-center my-8">
          {/* Desktop steps image */}
          <Image
            src="/assets/images/steps.svg"
            alt="steps"
            width={800}
            height={200}
            className="hidden md:block w-full"
          />
          {/* Mobile steps image */}
          <Image
            src="/assets/images/steps_mobile.svg"
            alt="steps mobile"
            width={320}
            height={200}
            className="block md:hidden w-full max-w-xs"
          />
        </div>

        {/* Why This Works Section */}
        <div className="hidden md:flex items-end flex-col absolute bottom-0 right-0">
          <div className="about-shadow w-fit p-10 mt-20 lg:mt-32 space-y-2">
            <h3 className="text-[18px] font-medium text-[#FCFFFF]">
              Why this works:
            </h3>

            <div className="space-y-4 text-[#92A5A8] text-[14px] rounded-[48px]">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base sm:text-lg leading-relaxed">
                  <span className="font-medium">Starts With Purpose</span> —
                  Helping Your Legacy Reach The People Who Matter Sets An
                  Emotional Tone.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base sm:text-lg leading-relaxed">
                  <span className="font-medium">One Short Paragraph</span> —
                  Easy To Scan.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base sm:text-lg leading-relaxed">
                  <span className=" font-medium">Metaphor Works</span> —
                  Connects To Your Tree Concept In A Natural Way.
                </p>
              </div>
            </div>
          </div>
          {/* CTA Button */}
          <div className="pt-4 mr-12">
            <button className="group bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center">
              <span>GET STARTED</span>
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
    </div>
  );
};

export default About;
