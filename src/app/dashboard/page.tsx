"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

const summaryCards = [
	{
		label: "Active Plans",
		value: 0,
		action: "Create Plan",
		actionLink: "#",
	},
	{
		label: "To Withraw",
		value: 0,
		action: "Withraw Asset",
		actionLink: "#",
	},
	{
		label: "Total Plans Created",
		value: 0,
		action: "Total Plans",
		actionLink: "#",
	},
	{
		label: "Pending Claims",
		value: 0,
		action: "View Claims",
		actionLink: "#",
	},
];

const activityTabs = [
	"All",
	"Created Plans",
	"Swaps",
	"Inactivity Alert",
	"Guardians",
];

export default function DashboardHome() {
	const router = useRouter();

	return (
		<main className="flex flex-col gap-6 p-2 md:p-8 w-full mb-[10rem]">
			<section className="mb-4">
				<h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF] mb-1">
					Good morning, EBUBE
				</h2>
				<p className="text-[12px] md:text-[14px] text-[#92A5A8]">
					Monitor, protect, and manage the platform.
				</p>
			</section>
			<section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				{summaryCards.map((card) => (
					<div
						key={card.label}
						className="bg-[#182024] w-full h-[212px] rounded-xl py-[32px] px-[20px] flex flex-col items-center shadow-md"
					>
						<span className="text-3xl md:text-4xl font-semibold text-[#FCFFFF] mb-2">
							{card.value}
						</span>
						<span className="text-[12px] text-[#92A5A8] mb-4 text-center">
							{card.label}
						</span>
						<button
							className="w-fit text-[14px] p-[14px] font-medium rounded-[24px] border border-[#33C5E03D] bg-[#33C5E014] text-[#33C5E0] transition-all duration-200 hover:bg-[#33C5E0] hover:text-[#161E22] hover:scale-105 focus:outline-none"
							onClick={() => {
								if (card.action === "Set Guardian") {
									router.push("/dashboard/guardian");
								} else if (card.action === "Create Plan" || card.action === "Total Plans") {
									router.push("/dashboard/plans");
								} else if (card.action === "Withraw Asset" || card.action === "View Claims") {
									router.push("/dashboard/claim");
								}
							}}
						>
							<Image
								src="/assets/icons/arrowdown.svg"
								alt="arrowdown icon"
								width={11.5}
								height={11.5}
								className="inline-block mr-4 rotate-[270deg]"
							/>
							{card.action}
						</button>
					</div>
				))}
			</section>
			<section className=" md:p-6 flex flex-col gap-4 bg-transparent">
				<div className="flex flex-row md:items-center justify-between gap-2 mb-2 w-full">
					<span className="text-[#BFC6C8] font-medium text-[14px]">
						RECENT ACTIVITIES
					</span>
					<button className="flex items-center text-[12px] font-normal gap-1 text-[#92A5A8] hover:underline">
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
				<div className="flex flex-wrap gap-y-1 gap-x-1.5-2 mb-4">
					{activityTabs.map((tab) => (
						<button
							key={tab}
							className="px-4 py-1 text-sm font-normal text-[#BFC6C8] transition-colors"
						>
							{tab}
						</button>
					))}
				</div>
				<div className="flex flex-col bg-[#182024] rounded-[24px] py-[48px] px-[24px] min-h-[376px] items-center justify-center flex-1">
					<span className="text-[#FCFFFF] mb-4 text-center text-[18px] font-normal">
						No activity yet.
					</span>
					<span className="text-[#99A9A2] text-[12px] text-center font-normal mb-[2rem]">
						Add Beneficiaries, Add Guardians or Create Plans to get started
					</span>
					<button
						className="w-[171px] h-[52px] rounded-[24px] px-6 py-2 border border-[#33C5E03D] text-cyan-400 hover:bg-cyan-900/30 transition-colors"
						onClick={() => router.push("/dashboard/plans")}
					>
						+ &nbsp;&nbsp;Create Plan
					</button>
				</div>
			</section>
		</main>
	);
}
