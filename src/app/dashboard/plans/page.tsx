/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeletePlanModal from "./DeletePlanModal";
import FilterModal from "./FilterModal";
import ViewPlanDetailsModal from "./ViewPlanDetailsModal";
import {
  useAddressCreatedPlans,
  useContractFetch,
  usePlanDetails,
} from "@/hooks/useBlockchain";
import { InheritXAbi } from "@/abi/abi";

const tabs = ["Plans"];

// Component to fetch and display distribution method for each plan
const PlanDistributionCell = ({ planId }: { planId: number }) => {
  const { transaction: planDetails } = usePlanDetails(planId);

  const showDistribution = (method: number | string | undefined): string => {
    if (method === undefined || method === null) return "Not specified";
    const methodNum = typeof method === "string" ? parseInt(method) : method;
    switch (methodNum) {
      case 0:
        return "Lump Sum (All at once)";
      case 1:
        return "Quarterly";
      case 2:
        return "Yearly";
      case 3:
        return "Monthly";
      default:
        return "Unknown";
    }
  };

  return (
    <span className="bg-[#232B2F] text-[#BFC6C8] text-[12px] px-3 py-1 rounded-[16px] border border-[#425558]">
      {planDetails && planDetails.length > 0
        ? showDistribution(planDetails[0]?.distribution_method)
        : "Loading..."}
    </span>
  );
};

// const activities = [
//   {
//     activity: "Plan #001 Created (3 Beneficiaries, Inactivity Trigger Set)",
//     timestamp: "12th August, 2025",
//   },
//   { activity: "Guardian Added To Plan #002", timestamp: "12th August, 2025" },
//   {
//     activity: "Plan #001 Status Changed To Active",
//     timestamp: "12th August, 2025",
//   },
//   { activity: "1 NFC Converted", timestamp: "12th August, 2025" },
// ];

const PlansPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeActionsIdx, setActiveActionsIdx] = useState<number | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const router = useRouter();
  const { readData: planSummary } = useContractFetch(
    InheritXAbi,
    "get_plan_summary",
    [2]
  );

  const [plansData, setPlansData] = useState<any[]>([]);

  console.log("planSummary data xxxxxxxxx", planSummary);

  const { transaction: getCreatedPlan } = useAddressCreatedPlans();

  console.log("transaction XXXXXXXXXXXXXXX", getCreatedPlan);

  const handleDelete = (idx: number) => {
    setDeleteIdx(idx);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteIdx !== null) {
      setPlansData(plansData.filter((_: any, i: number) => i !== deleteIdx));
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

  const handleViewPlan = (planId: number) => {
    setSelectedPlanId(planId);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedPlanId(null);
  };

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <section className="mb-0 flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
            Plans
          </h2>
          <p className="text-[12px] md:text-[14px] text-[#92A5A8]">
            Create and manage your inheritance plans
          </p>
        </div>
        <div>
          <button
            className="border border-[#33C5E03D] p-[14px] rounded-[24px] text-[#33C5E0] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer"
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
                className={`px-4 py-1 text-sm font-medium  transition-colors cursor-pointer ${
                  idx === activeTab
                    ? "text-cyan-400 bg-[#1C252A] py-[12px] rounded-b-[24px] px-[18px] w-fit h-[48px] flex items-center"
                    : "text-[#BFC6C8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            className="flex cursor-pointer items-center text-[12px] font-normal gap-1 text-[#92A5A8] hover:underline"
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
        {activeTab == 0 ? (
          getCreatedPlan?.length == 0 ? (
            <div className="flex flex-col bg-[#182024] rounded-[24px] py-[64px] px-[24px] min-h-[320px] items-center justify-center flex-1">
              <span className="text-[#FCFFFF] mb-2 text-center text-[16px] md:text-[18px] font-normal">
                You haven’t created any inheritance plans yet.
              </span>
              <span className="text-[#99A9A2] text-[12px] font-normal mb-8 text-center">
                Secure your digital legacy by creating your first plan.
              </span>
              <button
                onClick={() => router.push("/dashboard/plans/create")}
                className="flex items-center gap-2 w-fit text-[14px] px-6 py-3 font-medium rounded-[24px] border border-[#33C5E03D] bg-[#33C5E014] text-[#33C5E0] hover:bg-cyan-900/30 transition-colors"
              >
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
            <div className="flex flex-col bg-[#182024] rounded-[24px] py-[32px] px-[8px] md:px-[24px] min-h-[320px] w-full overflow-x-auto">
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
                  {getCreatedPlan
                    ?.filter((plan: any) =>
                      filter == "All" ? true : plan.status == filter
                    )
                    .map((plan: any, idx: number) => (
                      <tr
                        key={idx}
                        className="border-t border-[#232B36] text-[#FCFFFF] text-[15px]"
                      >
                        <td className="py-4 px-2 min-w-[160px]">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold flex items-center gap-2">
                              <span className="text-[#425558] text-[14px] w-4 inline-block">
                                {plan.plan_id}
                              </span>
                              {plan.plan_name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-2 min-w-[120px]">
                          {/* <div className="flex items-center gap-2">
                              <span>{plan.assets.value}</span>
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
                          </div> */}
                          <span>{plan.plan_asset_amount}</span>{" "}
                          <span>{plan.plan_asset_type}</span>
                        </td>
                        <td className="hidden sm:table-cell py-4 px-2 min-w-[80px]">
                          {plan.plan_beneficiary_count}
                        </td>
                        {/* Hide on mobile: Trigger and Status */}
                        <td className="hidden sm:table-cell py-4 px-2 min-w-[160px]">
                          <PlanDistributionCell planId={plan.plan_id} />
                        </td>
                        <td className="hidden sm:table-cell py-4 px-2 min-w-[100px]">
                          <span
                            className={
                              plan.plan_status == "Active"
                                ? "bg-[#1C252A] text-[#33C5E0] px-3 py-1 rounded-[16px] text- [12px] font-semibold border border-[#33C5E0]"
                                : plan.status == "COMPLETED"
                                ? "bg-[#1C252A] text-[#0DA314] px-3 py-1 rounded-[16px] text-[12px] font-semibold border border-[#0DA314]"
                                : plan.status == "PENDING"
                                ? "bg-[#1C252A] text-[#EAB308] px-3 py-1 rounded-[16px] text-[12px] font-semibold border border-[#EAB308]"
                                : "bg-[#232B2F] text-[#92A5A8] px-3 py-1 rounded-[16px] text-[12px] font-semibold border border-[#425558]"
                            }
                          >
                            {plan.plan_status}
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
                              className="p-2 rounded-full hover:bg-[#232B2F] focus:outline-none"
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
                            {/* {activeActionsIdx === idx && (
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
                            )} */}
                          </div>
                          {/* Desktop: show buttons inline */}
                          <div className="hidden sm:flex gap-2 items-center">
                            <button
                              onClick={() => handleViewPlan(plan.plan_id)}
                              className="bg-[#33C5E0] cursor-pointer text-[#161E22] px-4 py-2 rounded-[16px] text-[12px] font-semibold hover:bg-cyan-400"
                            >
                              VIEW
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
          <div className="flex flex-col bg-[#182024] rounded-[24px] py-[32px] px-[12px] md:px-[24px] min-h-[320px] w-full overflow-x-auto">
            <table className="w-full min-w-[900px]">
              {/* <thead>
                <tr className="text-left text-[#92A5A8] text-[14px] font-normal">
                  <th className="py-3 px-2">Activity</th>
                  <th className="py-3 px-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-[#232B36] text-[#FCFFFF] text-[15px]"
                  >
                    <td className="py-4 px-2">{item.activity}</td>
                    <td className="py-4 px-2 text-[#92A5A8] text-[13px]">
                      {item.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        )}
      </section>
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
      <ViewPlanDetailsModal
        isOpen={showViewModal}
        onClose={closeViewModal}
        planId={selectedPlanId || 0}
      />
    </main>
  );
};

export default PlansPage;
