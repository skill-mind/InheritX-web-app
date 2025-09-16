"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import useEnsureConnected from "@/hooks/useEnsureConnected";

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
    <div className="border-b border-gray-700 last:border-b-0 p-[32px] bg-transparent max-w-[883px] cursor-pointer">
      <button
        onClick={handleClick}
        className="w-full py-6 px-0 flex items-center justify-between text-left transition-colors duration-200 group"
        aria-expanded={isExpanded}
      >
        <span className="text-[#FCFFFF] text-[14px] md:text-[18px] font-medium flex-1">
          {faq.question}
        </span>
        {faq.isExpandable ? (
          <Image
            src="/assets/icons/arrowdown.svg"
            alt="arrow down icon"
            width={14}
            height={14}
            className={`transition-transform duration-200 flex-shrink-0 cursor-pointer ${
              isExpanded ? "-rotate-90" : "rotate-0"
            }`}
          />
        ) : (
          <Image
            src="/assets/icons/arrowdown.svg"
            alt="arrow down icon"
            width={24}
            height={24}
            className="transition-transform duration-200 flex-shrink-0 rotate-0 opacity-50 cursor-pointer"
          />
        )}
      </button>
      {faq.isExpandable && faq.answer && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "pb-6" : "max-h-0"
          }`}
        >
          {faq.id === 7 ? (
            <div
              className="text-[#92A5A8] text-[12px] md:text-[14px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: faq.answer as string }}
            />
          ) : (
            <p className="text-[#92A5A8] text-[12px] md:text-[14px] leading-relaxed">
              {faq.answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// FAQ Data
const faqData: FAQItem[] = [
  {
    id: 1,
    question: "1. What is InheritX?",
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
    question: "3. Is my Information safe?",
    answer:
      "Yes. We use bank-level encryption and strict privacy controls so only you and your chosen beneficiaries can access your details.",
    isExpandable: true,
  },
  {
    id: 4,
    question: "4. Can I change my Plan later?",
    answer:
      "Absolutely. You can update your assets, beneficiaries, or rules anytime from your account.",
    isExpandable: true,
  },
  {
    id: 5,
    question: "5. Do I need a Lawyer to use InheritX?",
    answer:
      "Not necessarily. Our platform is designed so you can do it yourself — but you can involve a lawyer if you prefer.",
    isExpandable: true,
  },
  {
    id: 6,
    question: "6. How do Beneficiaries get notified?",
    answer:
      "Once your plan is triggered, we securely inform each beneficiary and guide them through receiving what’s theirs.",
    isExpandable: true,
  },
  {
    id: 7,
    question: "7. What types of Inheritance Plans can I create?",
    answer: `<span>You Can Choose Between Two Types Of Inheritance Plans:</span><ul class='list-disc pl-6 mt-2'><li><b>Standard Plan</b> – You Set Up A One-Time Transfer Of Assets To Your Chosen Beneficiaries. Once Triggered, All Designated Assets Are Released At Once.</li><li><b>Monthly Disbursement Plan</b> – Instead Of A One-Time Release, You Can Schedule Periodic (E.G., Monthly) Transfers To Your Beneficiaries. This Ensures Steady, Ongoing Support Rather Than A Single Payout.</li></ul>`,
    isExpandable: true,
  },
];

// Main FAQs Page Component
export default function FAQsPage() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set([1, 2])
  );
  const ensureConnectedAndNavigate = useEnsureConnected();
  const [launching, setLaunching] = useState(false);

  const handleLaunch = async () => {
    try {
      setLaunching(true);
      await ensureConnectedAndNavigate();
    } finally {
      setLaunching(false);
    }
  };

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

  useEffect(() => {
    const run = () => {
      try {
        const els = Array.from(document.querySelectorAll(".reveal"));
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting)
                entry.target.classList.add("reveal-active");
            });
          },
          { threshold: 0.12 }
        );
        els.forEach((el, i) => {
          obs.observe(el);
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.9) {
            setTimeout(() => el.classList.add("reveal-active"), 60 * (i + 1));
          }
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    )
      run();
    else window.addEventListener("DOMContentLoaded", run);
  }, []);

  return (
    <div className="w-full min-h-screen relative mt-[5rem] mb-[20rem]">
      {/* Desktop - Faq Bacground Particles */}
      <Image
        src="/assets/images/faq_tree.svg"
        alt="background vector"
        fill={false}
        width={1920}
        height={400}
        className="absolute right-0 top-0 z-0 w-full h-auto pointer-events-none select-none hidden md:block"
      />

      {/* Desktop -  Page-Bottom-Section Bacground Particles */}
      <Image
        src="/assets/images/small_tree_left.svg"
        alt="background vector"
        fill={false}
        width={200}
        height={200}
        className="absolute left-0 top-[115%] z-0 h-auto pointer-events-none select-none hidden md:block"
      />

      <Image
        src="/assets/images/small_tree_right.svg"
        alt="background vector"
        fill={false}
        width={200}
        height={200}
        className="absolute right-0 top-[115%] z-0 h-auto pointer-events-none select-none hidden md:block"
      />

      {/* Main Content Container */}
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header Section */}
        <div className="mb-4">
          <h1
            className="text-[24px] md:text-[32px] font-bold text-[#FCFFFF] mb-2 reveal"
            data-step={0}
            style={{ transitionDelay: "80ms" }}
          >
            FAQs
          </h1>
          <p
            className="text-[12px] md:text-[14px] text-[#92A5A8] max-w-2xl reveal"
            data-step={1}
            style={{ transitionDelay: "160ms" }}
          >
            Here are some frequently asked questions about InheritX
          </p>
        </div>

        {/* FAQ Items Container */}
        <div className=" max-w-[883px]">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="faqs-box rounded-l-[8px] rounded-r-[48px] reveal"
                data-step={index + 2}
                style={{ transitionDelay: `${index * 80 + 200}ms` }}
              >
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
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-8 reveal"
          data-step={999}
          style={{ transitionDelay: "360ms" }}
        >
          {/* Launch App Button */}
          <div className="pt-4">
            <button
              onClick={handleLaunch}
              disabled={launching}
              className="group cursor-pointer bg-[#33C5E0] disabled:opacity-60 hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center"
            >
              <span>{launching ? "Connecting..." : "LAUNCH APP"}</span>
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

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 520ms cubic-bezier(0.2, 0.9, 0.3, 1),
            transform 520ms cubic-bezier(0.2, 0.9, 0.3, 1);
        }
        .reveal.reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .faqs-box.reveal {
          will-change: transform, opacity;
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `(${() => {
            const run = () => {
              try {
                const els = Array.from(document.querySelectorAll(".reveal"));
                const obs = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting)
                        entry.target.classList.add("reveal-active");
                    });
                  },
                  { threshold: 0.12 }
                );
                els.forEach((el, i) => {
                  obs.observe(el);
                  const rect = el.getBoundingClientRect();
                  if (rect.top < window.innerHeight * 0.9) {
                    setTimeout(
                      () => el.classList.add("reveal-active"),
                      60 * (i + 1)
                    );
                  }
                });
              } catch (e) {
                console.error(e);
              }
            };
            if (
              document.readyState === "complete" ||
              document.readyState === "interactive"
            )
              run();
            else window.addEventListener("DOMContentLoaded", run);
          }})();`,
        }}
      />
    </div>
  );
}
