"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowUpRight, Headphones } from "lucide-react";

import Image from "next/image";

import "./faqs.css";

// FAQ Item Interface
interface FAQItem {
  id: number;
  question: string;
  answer?: string;
  isExpandable?: boolean;
}

// FAQ Item Component Props
interface FAQItemProps {
  faq: FAQItem;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}

// Reusable FAQ Item Component
const FAQItemComponent: React.FC<FAQItemProps> = ({
  faq,
  isExpanded,
  onToggle,
}) => {
  const handleClick = () => {
    if (faq.isExpandable) {
      onToggle(faq.id);
    }
  };

  return (
    <div className="border-b border-gray-700 last:border-b-0 p-[32px] bg-transparent max-w-[883px]">
      <button
        onClick={handleClick}
        className="w-full py-6 px-0 flex items-center justify-between text-left transition-colors duration-200 group"
        aria-expanded={isExpanded}
      >
        <span className="text-[#FCFFFF] text-[14px] md:text-[18px] font-medium flex-1">
          {faq.question}
        </span>

        {faq.isExpandable ? (
          <ChevronDown
            className={`w-6 h-6 text-cyan-400 transition-transform duration-200 flex-shrink-0 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        ) : (
          <ArrowUpRight className="w-6 h-6 text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 flex-shrink-0" />
        )}
      </button>

      {faq.isExpandable && faq.answer && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "pb-6" : "max-h-0"
          }`}
        >
          <p className="text-[#92A5A8] text-[12px] md:text-[14px] leading-relaxed">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
};

// FAQ Data
const faqData: FAQItem[] = [
  {
    id: 1,
    question: "1. What is Inherit X?",
    answer:
      "Inherit X Is A Secure Online Platform That Helps You Plan And Share Your Assets With Your Chosen Beneficiaries — Simply And Stress-Free.",
    isExpandable: true,
  },
  {
    id: 2,
    question: "2. How is this different from traditional inheritance planning?",
    answer:
      "We Remove The Paperwork Headaches, Legal Jargon, And Long Delays By Making The Process Digital, Clear, And Accessible To Anyone.",
    isExpandable: true,
  },
  {
    id: 3,
    question: "3. IS MY INFORMATION SAFE?",
    isExpandable: false,
  },
  {
    id: 4,
    question: "4. CAN I CHANGE MY PLAN LATER?",
    isExpandable: false,
  },
  {
    id: 5,
    question: "5. DO I NEED A LAWYER TO USE INHERIT X?",
    isExpandable: false,
  },
  {
    id: 6,
    question: "6. HOW DO BENEFICIARIES GET NOTIFIED?",
    isExpandable: false,
  },
  {
    id: 7,
    question: "7. WHAT DOES IT COST?",
    isExpandable: false,
  },
];

// Main FAQs Page Component
export default function FAQsPage() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set([1, 2])
  );

  // Handle FAQ item toggle
  const handleToggle = (id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full min-h-screen relative mt-[5rem]">
      {/* Main Content Container */}
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-[24px] md:text-[32px] font-bold text-[#FCFFFF] mb-2">
            FAQs
          </h1>
          <p className="text-[12px] md:text-[14px] text-[#92A5A8] max-w-2xl">
            Here are some frequently asked questions about InheritX
          </p>
        </div>

        {/* FAQ Items Container */}
        <div className=" max-w-[883px]">
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="faqs-box rounded-l-[8px] rounded-r-[48px]">
                <FAQItemComponent
                  key={faq.id}
                  faq={faq}
                  isExpanded={expandedItems.has(faq.id)}
                  onToggle={handleToggle}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Launch App Button */}
          <div className="pt-4">
            <button className="group bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center">
              <span>LAUNCH APP</span>
              <Image
                src="/assets/icons/arrowup.svg"
                alt="arrow up icon"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Contact Support */}
          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer group">
            <Headphones className="w-6 h-6 group-hover:text-cyan-400 transition-colors duration-200" />
            <span className="text-lg font-medium">Contact Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
