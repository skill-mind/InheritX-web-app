import React from "react";
import Image from "next/image";
import "./benefits.css";

// Reusable BenefitCard component
interface BenefitCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="text-center">
      <div className="w-[80px] h-[80px] rounded-full mx-auto mb-6 bg-transparent border border-[#2A3338] flex items-center justify-center">
        {icon || <div className="w-[24px] h-[24px] bg-[#D9D9D9] rounded"></div>}
      </div>
      <h3 className="text-[16px] md:text-[18px] font-medium text-[#FCFFFF] mb-4">
        {title}
      </h3>
      <p className="text-[#92A5A8] text-[14px] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const Benefits = () => {
  const benefitsData = [
    {
      title: "Easy to Use",
      description:
        "No Confusing Legal Jargon — Just Clear Steps Anyone Can Follow.",
    },
    {
      title: "Secure & Private",
      description:
        "Your Data And Assets Are Protected With Top-Level Encryption.",
    },
    {
      title: "Custom Plans",
      description: "Set Your Rules For Who Gets What, And When.",
    },
    {
      title: "Stress-Free Transfers",
      description:
        "We Handle The Details So Your Legacy Reaches The Right Hands.",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="bg-[#1C252A] mx-auto p-12 w-fit rounded-[48px] mb-4">
        {/* Header Section */}
        <div className="text-left mb-4 max-w-4xl mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-bold text-[#FCFFFF] mb-2">
            Benefits Of InheritX
          </h2>
          <p className="text-[10px] md:text-[14px] text-[#92A5A8] max-w-2xl">
            Here&apos;s why you should choose us
          </p>
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto mb-2">
          <p className="text-[18px] text-[#FCFFFF] leading-relaxed mb-8 text-left sm:text-left">
            Inherit X helps you plan and share your assets with the right people, at the right time. We make inheritance simple, secure, and stress-free — without unnecessary delays or complications.
          </p>
          <p className="text-[18px] text-gray-300 leading-relaxed text-center sm:text-left">
            Think of it as planting a tree: your roots are the assets you&apos;ve built, and we make sure the branches grow to those you care about most.
          </p>
        </div>
      </div>

      <div className="bg-[#1C252A] w-[400px] h-[12px] rounded-[12px] mx-auto mb-10"></div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
        {benefitsData.map((benefit, index) => (
          <div key={index} className="benefits-shadow p-[40px]">
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
            />
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mx-auto flex items-center justify-center">
        <button className="group bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center">
          <span>CREATE YOUR PLAN</span>
          <Image
            src="/assets/icons/arrowup.svg"
            alt="arrow up icon"
            width={12}
            height={12}
          />
        </button>
      </div>
    </div>
  );
};

export default Benefits;
