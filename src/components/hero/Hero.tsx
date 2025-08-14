import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-top mt-[20rem] min-h-screen px-6 sm:px-8 lg:px-12 w-full max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="space-y-8">
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-semibold text-[#FCFFFF] leading-tight">
                From Your Hands, To
                <br />
                <span className="text-white">Theirs — </span>
                <span className="bg-[#FCFFFF] bg-clip-text text-transparent">
                  Without A Hitch.
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-300 max-w-md leading-relaxed">
                InheritX helps your wealth flow naturally to the people
                who matter most.
              </p>
              
              {/* CTA Button */}
              <div className="pt-4">
                <button className="group bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center">
                  <span>START NOW</span>
                  <img src="/assets/icons/arrowup.svg" alt="arrow up icon" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Visual Area - Removed particles */}
          <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end">
            {/* Content removed, space reserved for your background image */}
          </div>
        </div>
      </div>
      
      {/* Bottom Contact Support */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium">Contact Support</span>
      </div>

      <button className='absolute top-2/3 right-0 p-4 flex items-center space-x-4 h-[48px] w-[200px] bg-[#182024] rounded-l-[24px] rounded-r-[8px] hover:border-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20'>
        <img src="/assets/icons/contact.svg" alt="contact icon" />
        <span className='text-[#92A5A8]'>Contact Support</span>
      </button>
      
    </div>
  );
};

export default Hero;