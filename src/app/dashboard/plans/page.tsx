"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeletePlanModal from "./DeletePlanModal";
import FilterModal from "./FilterModal";

const tabs = ["Plans", "Activities"];

const activities = [
  {
    activity: "Plan #001 Created (3 Beneficiaries, Inactivity Trigger Set)",
    timestamp: "12th August, 2025",
  },
  { activity: "Guardian Added To Plan #002", timestamp: "12th August, 2025" },
  {
    activity: "Plan #001 Status Changed To Active",
    timestamp: "12th August, 2025",
  },
  { activity: "1 NFC Converted", timestamp: "12th August, 2025" },
];

const plans = [
  {
    name: "Plan Name",
    id: "Unique ID",
    assets: { label: "2 ETH" },
    beneficiary: 3,
    trigger: "INACTIVITY (6 MONTHS)",
    status: "ACTIVE",
  },
  {
    name: "Plan Name",
    id: "Unique ID",
    assets: {
      label: "7 NFTs",
      avatars: [
        "/assets/icons/nft1.svg",
        "/assets/icons/nft2.svg",
        "/assets/icons/nft3.svg",
      ],
      extra: 3,
    },
    beneficiary: 1,
    trigger: "TIME-LOCKED",
    status: "COMPLETED",
  },
  {
    name: "Plan Name",
    id: "Unique ID",
    assets: { label: "1 NFT", avatars: ["/assets/icons/nft1.svg"] },
    beneficiary: 2,
    trigger: "INACTIVITY (6 MONTHS)",
    status: "PENDING",
  },
  {
    name: "Plan Name",
    id: "Unique ID",
    assets: { label: "1 BTC" },
    beneficiary: 1,
    trigger: "INACTIVITY (6 MONTHS)",
    status: "EXPIRED",
  },
];

const PlansPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeActionsIdx, setActiveActionsIdx] = useState<number | null>(null);
  const [plansData, setPlansData] = useState(plans);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const router = useRouter();

  useEffect(() => {
    // Observe all elements with the .reveal class and add the reveal-active class
    // when they intersect. Re-run this whenever the active tab changes so newly
    // mounted tab content (like the Activities table) gets observed and revealed.
    let obs: IntersectionObserver | null = null;
    const run = () => {
      try {
        const els = Array.from(document.querySelectorAll(".reveal"));
        if (obs) obs.disconnect();
        obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting)
                (entry.target as HTMLElement).classList.add("reveal-active");
            });
          },
          { threshold: 0.12 }
        );

        els.forEach((el, i) => {
          (el as HTMLElement).style.willChange = "transform, opacity";
          obs!.observe(el);
          const rect = el.getBoundingClientRect();
          const step = parseInt(el.getAttribute("data-step") || String(i));
          if (rect.top < window.innerHeight * 0.9) {
            setTimeout(
              () => (el as HTMLElement).classList.add("reveal-active"),
              60 * (step + 1)
            );
          }
        });
      } catch (e) {
        /* ignore */
      }
    };

    // Run now and whenever activeTab changes so newly mounted elements get observed
    run();

    return () => {
      if (obs) obs.disconnect();
    };
  }, [activeTab]);

  const handleEdit = (idx: number) => {
    // Navigate to edit page with plan id
    router.push(`/dashboard/plans/create?id=${plansData[idx].id}&edit=true`);
  };

  const handleView = (idx: number) => {
    router.push(`/dashboard/plans/create/preview?id=${plansData[idx].id}`);
  };

  const handleDelete = (idx: number) => {
    setDeleteIdx(idx);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteIdx !== null) {
      setPlansData(plansData.filter((_, i) => i !== deleteIdx));
      setShowDeleteModal(false);
      setDeleteIdx(null);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIdx(null);
  };

  const handleApplyFilter = (selected: string) => {
    setFilter(selected);
    setShowFilterModal(false);
  };

  return (
    <main className="flex flex-col gap-6 p-0 md:p-8 w-full">
      <section className="mb-0 flex flex-col md:flex-row items-start gap-[1rem] md:items-center justify-between">
        <div>
          <h2
            className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1 reveal"
            data-step={0}
          >
            Plans
          </h2>
          <p
            className="text-[12px] md:text-[14px] text-[#92A5A8] reveal"
            data-step={1}
          >
            Create and manage your inheritance plans
          </p>
        </div>
        <div>
          <button
            className="border border-[#33C5E03D] p-[14px] rounded-[24px] text-[#33C5E0] text-[12px] md:text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer reveal hover-raise"
            data-step={2}
            onClick={() => router.push("/dashboard/plans/create")}
          >
            <Image
              src="/assets/icons/plus.svg"
              alt="plus icon"
              width={14}
              height={14}
              className="inline-block mr-2"
            />
            <span>Create New Plan</span>
          </button>
        </div>
      </section>
      <section className="bg-transparent p-0 md:p-2 flex flex-col gap-4">
        <div className="flex flex-row md:items-center justify-between gap-2 mb-2 border-t border-t-[#1C252A]">
          <div className="flex gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-1 text-sm font-medium  transition-colors cursor-pointer reveal hover-raise ${
                  idx === activeTab
                    ? "text-cyan-400 bg-[#1C252A] py-[12px] rounded-b-[24px] px-[18px] w-fit h-[48px] flex items-center"
                    : "text-[#BFC6C8]"
                }`}
                data-step={3 + idx}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            className="flex cursor-pointer items-center text-[12px] font-normal gap-1 text-[#92A5A8] hover:underline reveal hover-raise"
            data-step={5}
            onClick={() => setShowFilterModal(true)}
          >
            <Image
              src="/assets/icons/filter.svg"
              alt="filter icon"
              width={14}
              height={14}
              className="inline-block"
            />
            <span> Filter</span>
          </button>
        </div>
        {activeTab === 0 ? (
          plansData.length === 0 ? (
            <div className="flex flex-col bg-[#182024] rounded-[24px] py-[64px] px-[24px] min-h-[320px] items-center justify-center flex-1">
              <span className="text-[#FCFFFF] mb-2 text-center text-[16px] md:text-[18px] font-normal">
                You haven’t created any inheritance plans yet.
              </span>
              <span className="text-[#99A9A2] text-[12px] font-normal mb-8 text-center">
                Secure your digital legacy by creating your first plan.
              </span>
              <button className="flex items-center gap-2 w-fit text-[14px] px-6 py-3 font-medium rounded-[24px] border border-[#33C5E03D] bg-[#33C5E014] text-[#33C5E0] hover:bg-cyan-900/30 transition-colors">
                <Image
                  src="/assets/icons/arrowdown.svg"
                  alt="arrowdown icon"
                  width={14}
                  height={14}
                  className="inline-block rotate-[270deg]"
                />
                Create Plan
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col bg-[#182024] rounded-[24px] py-[32px] px-[8px] md:px-[24px] min-h-[320px] w-full overflow-x-auto reveal hover-raise"
              data-step={6}
            >
              <table className="w-full md:min-w-[900px]">
                <thead>
                  <tr className="text-left text-[#92A5A8] text-[14px] font-normal">
                    <th className="py-3 px-2">Plan Name/ ID</th>
                    <th className="py-3 px-2">Assets</th>
                    <th className="hidden sm:table-cell py-3 px-2">
                      Beneficiary
                    </th>
                    <th className="hidden sm:table-cell py-3 px-2">Trigger</th>
                    <th className="hidden sm:table-cell py-3 px-2">Status</th>
                    <th className="py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plansData
                    .filter((plan) =>
                      filter === "All" ? true : plan.status === filter
                    )
                    .map((plan, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-[#232B36] text-[#FCFFFF] text-[15px] hover:bg-[#1B2326] transition-colors"
                      >
                        <td className="py-4 px-2 min-w-[160px]">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold flex items-center gap-2">
                              <span className="text-[#425558] text-[14px] w-4 inline-block">
                                {idx + 1}.
                              </span>
                              {plan.name}
                            </span>
                            <span className="text-[#92A5A8] text-[12px]">
                              {plan.id}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-2 min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <span>{plan.assets.label}</span>
                            {plan.assets.avatars && (
                              <div className="flex -space-x-2">
                                {plan.assets.avatars.map((src, i) => (
                                  <Image
                                    key={i}
                                    src={src}
                                    alt="nft"
                                    width={24}
                                    height={24}
                                    className="rounded-full border-2 border-[#232B36] bg-[#232B36]"
                                  />
                                ))}
                                {plan.assets.extra && (
                                  <span className="ml-2 bg-[#1C252A] text-[#BFC6C8] text-[12px] px-2 py-0.5 rounded-full border border-[#425558]">
                                    {plan.assets.extra}+
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell py-4 px-2 min-w-[80px]">
                          {plan.beneficiary}
                        </td>
                        {/* Hide on mobile: Trigger and Status */}
                        <td className="hidden sm:table-cell py-4 px-2 min-w-[160px]">
                          <span className="bg-[#232B2F] text-[#BFC6C8] text-[12px] px-3 py-1 rounded-[16px] border border-[#425558]">
                            {plan.trigger}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell py-4 px-2 min-w-[100px]">
                          <span
                            className={
                              plan.status === "ACTIVE"
                                ? "bg-[#1C252A] text-[#33C5E0] px-3 py-1 rounded-[16px] text-[12px] font-semibold border border-[#33C5E0]"
                                : plan.status === "COMPLETED"
                                ? "bg-[#1C252A] text-[#0DA314] px-3 py-1 rounded-[16px] text-[12px] font-semibold border border-[#0DA314]"
                                : plan.status === "PENDING"
                                ? "bg-[#1C252A] text-[#EAB308] px-3 py-1 rounded-[16px] text-[12px] font-semibold border border-[#EAB308]"
                                : "bg-[#232B2F] text-[#92A5A8] px-3 py-1 rounded-[16px] text-[12px] font-semibold border border-[#425558]"
                            }
                          >
                            {plan.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 min-w-[80px] relative">
                          {/* Mobile: show more icon, on click show actions */}
                          <div className="flex sm:hidden items-center justify-center">
                            <button
                              aria-label="Show actions"
                              onClick={() =>
                                setActiveActionsIdx(
                                  activeActionsIdx === idx ? null : idx
                                )
                              }
                              className="p-2 rounded-full hover:bg-[#232B2F] focus:outline-none cursor-pointer hover-raise"
                            >
                              <svg
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="5" r="1.5" fill="#BFC6C8" />
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="1.5"
                                  fill="#BFC6C8"
                                />
                                <circle
                                  cx="12"
                                  cy="19"
                                  r="1.5"
                                  fill="#BFC6C8"
                                />
                              </svg>
                            </button>
                            {activeActionsIdx === idx && (
                              <div className="absolute z-10 top-10 right-0 bg-[#232B2F] border border-[#425558] rounded-xl shadow-lg flex flex-col w-32 animate-fade-in">
                                <button
                                  className="bg-[#232B2F] border-b cursor-pointer border-[#425558] text-[#BFC6C8] px-4 py-2 rounded-t-xl text-[12px] font-medium hover:bg-[#232B2F]/80 w-full text-left"
                                  onClick={() => handleEdit(idx)}
                                >
                                  EDIT
                                </button>
                                <button
                                  className="bg-[#33C5E0] cursor-pointer text-[#161E22] px-4 py-2 text-[12px] font-semibold hover:bg-cyan-400 w-full text-left"
                                  onClick={() => handleView(idx)}
                                >
                                  VIEW
                                </button>
                                <button
                                  className="bg-[#E53E3E] cursor-pointer text-[#FCFFFF] px-4 py-2 rounded-b-xl text-[12px] font-semibold hover:bg-red-700 w-full text-left"
                                  onClick={() => handleDelete(idx)}
                                >
                                  DELETE
                                </button>
                              </div>
                            )}
                          </div>
                          {/* Desktop: show buttons inline */}
                          <div className="hidden sm:flex gap-2 items-center">
                            <button
                              className="bg-[#232B2F] cursor-pointer border border-[#425558] text-[#BFC6C8] px-4 py-2 rounded-[16px] text-[12px] font-medium hover:bg-[#232B2F]/80 hover-raise"
                              onClick={() => handleEdit(idx)}
                            >
                              EDIT
                            </button>
                            <button
                              className="bg-[#33C5E0] cursor-pointer text-[#161E22] px-4 py-2 rounded-[16px] text-[12px] font-semibold hover:bg-cyan-400 hover-raise"
                              onClick={() => handleView(idx)}
                            >
                              VIEW
                            </button>
                            <button
                              className="p-2 rounded-full hover:bg-[#E53E3E] cursor-pointer hover-raise"
                              onClick={() => handleDelete(idx)}
                            >
                              <svg
                                width="18"
                                height="18"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V7H6V19Z"
                                  stroke="#BFC6C8"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7"
                                  stroke="#BFC6C8"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div
            className="flex flex-col bg-[#182024] rounded-[24px] py-[32px] px-[12px] md:px-[24px] min-h-[320px] w-full overflow-x-auto reveal hover-raise"
            data-step={7}
          >
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="text-left text-[#92A5A8] text-[14px] font-normal">
                  <th className="py-3 px-2">Activity</th>
                  <th className="py-3 px-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-[#232B36] text-[#FCFFFF] text-[15px] hover:bg-[#1B2326] transition-colors"
                  >
                    <td className="py-4 px-2">{item.activity}</td>
                    <td className="py-4 px-2 text-[#92A5A8] text-[13px]">
                      {item.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
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
        .hover-raise {
          transition: transform 220ms ease, box-shadow 220ms ease;
        }
        .hover-raise:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
        }
      `}</style>
      <DeletePlanModal
        open={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        planName={deleteIdx !== null ? plansData[deleteIdx]?.name : undefined}
      />
      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilter}
        currentFilter={filter}
      />
    </main>
  );
};

export default PlansPage;
