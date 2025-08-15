import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="w-full min-h-[150vh] relative">
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
                  Think of it as planting a tree: your roots are the assets
                  you've built, and we make sure the branches grow to those you
                  care about most.
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
        <div className="space-y-12 lg:space-y-16">
          {/* Section Header */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-slate-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                How It Works
              </h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Here's how your legacy flows
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center border-2 border-cyan-400">
                  <span className="text-2xl font-bold text-cyan-400">1</span>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Plant the Roots
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Add Your Assets And Choose Your Beneficiaries.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center border-2 border-cyan-400">
                  <span className="text-2xl font-bold text-cyan-400">2</span>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Grow the Branches
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Set Clear Rules For Who Gets What And When.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center border-2 border-cyan-400">
                  <span className="text-2xl font-bold text-cyan-400">3</span>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Watch It Bloom
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We Handle The Rest — Ensuring Smooth, Secure Transfers.
              </p>
            </div>
          </div>

          {/* Connecting Lines for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px">
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="absolute top-0 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Why This Works Section */}
        <div className="flex items-end flex-col absolute bottom-0 right-0">
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
          <div className="pt-4">
            <button className="group bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center">
              <span>GET STARTED</span>
              <img src="/assets/icons/arrowup.svg" alt="arrow up icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
