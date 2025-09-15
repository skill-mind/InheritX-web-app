"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Headphones } from "lucide-react";

import "../faqs/faqs.css";

const steps = [
  {
    id: 1,
    title: "Step 1: Go to Inheritance Plans",
    desc: "Navigate to the 'Inheritance Plans' section on your dashboard.",
  },
  {
    id: 2,
    title: "Step 2: Select Plan Type",
    desc: "Choose the type of plan you want to create:\n- Single Beneficiary Plan — one person receives the assets.\n- Multiple Beneficiary Plan — split assets across several people with chosen percentages.",
  },
  {
    id: 3,
    title: "Step 3: Add Beneficiaries",
    desc: "Enter names, contact details, and wallet addresses for each beneficiary.",
  },
  {
    id: 4,
    title: "Step 4: Define Rules & Conditions",
    desc: "Set rules such as conditions for release (e.g., claim code or disbursement settings).",
  },
  {
    id: 5,
    title: "Step 5: Save & Activate",
    desc: "Review all details and confirm. Your inheritance plan is now active and will work based on the conditions you've set.",
  },
];

const claimsSteps = [
  {
    id: 1,
    title: "Step 1: Initiate a Claim",
    desc: 'Go to the Claims section and click "New Claim." Enter your details and select the inheritance plan you\'re claiming from.',
  },
  {
    id: 2,
    title: "Step 2: Provide Required Documents",
    desc: "Upload identity verification and any documents requested by the plan (e.g., death certificate, legal proof).",
  },
  {
    id: 3,
    title: "Step 3: Submit for Review",
    desc: "Double-check your entries and submit. The system logs your request and notifies the plan owner or guardians.",
  },
  {
    id: 4,
    title: "Step 4: Verification & Approval",
    desc: "The platform verifies your information. You'll receive updates on your claim status (Pending → Under Review → Approved/Rejected).",
  },
  {
    id: 5,
    title: "Step 5: Receive Assets",
    desc: "Once approved, assets are automatically transferred to the wallet or account specified in the inheritance plan.",
  },
];

const kycSteps = [
  {
    id: 1,
    title: "Step 1: Open KYC Section",
    desc: 'Go to the "KYC Verification" (Know Your Customer) pop up from your dashboard.',
  },
  {
    id: 2,
    title: "Step 2: Fill Out Personal Information",
    desc: "Enter your full name, date of birth, contact details, and any other requested personal info.",
  },
  {
    id: 3,
    title: "Step 3: Upload Required Documents",
    desc: "Provide the necessary identification documents (e.g., ID card, passport, or driver's license).",
  },
  {
    id: 4,
    title: "Step 4: Submit for Verification",
    desc: 'Review all entered information, confirm it\'s correct, and click "Submit."',
  },
  {
    id: 5,
    title: "Step 5: Wait for Approval",
    desc: "Your KYC request will be reviewed. You'll be notified when it's approved, unlocking features that require verification.",
  },
];

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"plans" | "claims" | "kyc">(
    "plans"
  );

  const renderSteps = (
    items: { id: number; title: string; desc: string }[]
  ) => (
    <div className="space-y-6">
      {items.map((s) => (
        <div
          key={s.id}
          className="faqs-box rounded-l-[8px] rounded-r-[48px] p-6 text-white max-w-[880px] reveal stagger-child"
          data-step={s.id}
          style={{ transitionDelay: `${s.id * 120}ms` }}
        >
          <h3 className="text-[#FCFFFF] font-normal text-[14px] md:text-[18px] mb-3">
            {s.title}
          </h3>
          <p className="text-[#92A5A8] text-[12px] md:text-[14px] whitespace-pre-line">
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const run = () => {
      try {
        const els = Array.from(
          document.querySelectorAll(".reveal")
        ) as HTMLElement[];
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
          el.style.willChange = "transform, opacity";
          obs.observe(el);
          const rect = el.getBoundingClientRect();
          const step = parseInt(el.getAttribute("data-step") || String(i));
          if (rect.top < window.innerHeight * 0.9) {
            setTimeout(
              () => el.classList.add("reveal-active"),
              60 * (step + 1)
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

    return () => window.removeEventListener("DOMContentLoaded", run);
  }, []);

  return (
    <div className="w-full min-h-screen relative mt-[5rem] mb-[20rem]">
      {/* Desktop - Background Particles (reuse FAQ assets) */}
      <Image
        src="/assets/images/faq_tree.svg"
        alt="background vector"
        width={1920}
        height={400}
        className="absolute right-0 top-0 z-0 w-full h-auto pointer-events-none select-none hidden md:block"
      />

      <Image
        src="/assets/images/small_tree_left.svg"
        alt="background vector"
        width={200}
        height={200}
        className="absolute left-0 top-[115%] z-0 h-auto pointer-events-none select-none hidden md:block"
      />

      <Image
        src="/assets/images/small_tree_right.svg"
        alt="background vector"
        width={200}
        height={200}
        className="absolute right-0 top-[115%] z-0 h-auto pointer-events-none select-none hidden md:block"
      />

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - content */}
          <div className="flex-1">
            <h1
              className="text-[24px] md:text-[32px] font-bold text-[#FCFFFF] mb-2 reveal"
              data-step={0}
              style={{ transitionDelay: `80ms` }}
            >
              How To Use InheritX
            </h1>
            <p
              className="text-[12px] md:text-[14px] text-[#92A5A8] max-w-2xl mb-6 reveal"
              data-step={1}
              style={{ transitionDelay: `160ms` }}
            >
              Follow these steps to get the most out of your digital inheritance
              platform.
            </p>

            {/* Tabs */}
            <div
              className="flex items-center gap-4 how-tabs mb-8 reveal"
              data-step={2}
              style={{ transitionDelay: `220ms` }}
              role="tablist"
              aria-label="How to use tabs"
            >
              <button
                onClick={() => setActiveTab("plans")}
                aria-selected={activeTab === "plans"}
                role="tab"
                className={`px-4 py-2 rounded-md text-[13px] transition-all duration-150 cursor-pointer ${
                  activeTab === "plans"
                    ? "bg-[#1C252A] text-[#33C5E0] border border-[#1C252A] rounded-b-[24px] py-[12px] px-[32px]"
                    : "text-[#92A5A8]"
                }`}
              >
                Inheritance Plan Types
              </button>

              <button
                onClick={() => setActiveTab("claims")}
                aria-selected={activeTab === "claims"}
                role="tab"
                className={`px-4 py-2 rounded-md text-[13px] transition-all duration-150 cursor-pointer ${
                  activeTab === "claims"
                    ? "bg-[#1C252A] text-[#33C5E0] border border-[#1C252A] rounded-b-[24px] py-[12px] px-[32px]"
                    : "text-[#92A5A8]"
                }`}
              >
                Claims
              </button>

              <button
                onClick={() => setActiveTab("kyc")}
                aria-selected={activeTab === "kyc"}
                role="tab"
                className={`px-4 py-2 rounded-md text-[13px] transition-all duration-150 cursor-pointer ${
                  activeTab === "kyc"
                    ? "bg-[#1C252A] text-[#33C5E0] border border-[#1C252A] rounded-b-[24px] py-[12px] px-[32px]"
                    : "text-[#92A5A8]"
                }`}
              >
                KYC
              </button>
            </div>

            {/* Steps list (render based on active tab) */}
            {activeTab === "plans" && renderSteps(steps)}
            {activeTab === "claims" && renderSteps(claimsSteps)}
            {activeTab === "kyc" && renderSteps(kycSteps)}

            {/* Launch button */}
            <div className="pt-6">
              <button className="group cursor-pointer bg-[#33C5E0] hover:bg-cyan-300 space-x-4 text-[#161E22] text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center">
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

          {/* Right column - Contact support small card */}
          <div
            className="w-full lg:w-[320px] flex-shrink-0 reveal"
            data-step={999}
            style={{ transitionDelay: `260ms` }}
          >
            <div
              className="how-contact rounded-md p-6 flex items-center gap-3 text-[#92A5A8] text-[14px] justify-center reveal"
              data-step={1000}
              style={{ transitionDelay: `300ms` }}
            >
              <Headphones className="w-[18px] h-[18px] text-[#92A5A8]" />
              <span className="font-medium">Contact Support</span>
            </div>
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
        .stagger-child {
          transition-property: opacity, transform;
        }
        .faqs-box.reveal,
        .how-contact.reveal {
          will-change: transform, opacity;
        }
        /* subtle hover for tab buttons */
        .how-tabs button[aria-selected="true"] {
          box-shadow: 0 10px 30px rgba(51, 197, 224, 0.06);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
