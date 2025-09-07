"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface Beneficiary {
  id: number;
  name: string;
  relationship: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
}

const CreatePlanPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<number[]>([
    1, 2,
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [form, setForm] = useState({ name: "", relationship: "", email: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  // Validation
  const isPlanNameValid = planName.trim().length > 0;
  const isDescriptionValid = description.trim().length > 0;
  const isFormValid = isPlanNameValid && isDescriptionValid && selectedBeneficiaries.length > 0;

  const handleAddBeneficiary = () => {
    if (form.name && form.relationship && form.email) {
      setBeneficiaries([
        ...beneficiaries,
        {
          ...form,
          id: beneficiaries.length > 0
            ? beneficiaries[beneficiaries.length - 1].id + 1
            : 1,
        },
      ]);
      setForm({ name: "", relationship: "", email: "" });
      setShowSuccess(true);
      setSuccessName(form.name);
      setShowAddForm(false);
    }
  };

  React.useEffect(() => {
    const name = searchParams.get("name");
    const relationship = searchParams.get("relationship");
    const email = searchParams.get("email");
    if (name && relationship && email) {
      setBeneficiaries((prev) => {
        // Prevent duplicate add if already present
        if (prev.some(b => b.name === name && b.email === email)) return prev;
        return [
          ...prev,
          {
            id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
            name,
            relationship,
            email,
          },
        ];
      });
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 mb-2">
          <button className="text-[#BFC6C8] cursor-pointer text-[15px] flex items-center gap-2" onClick={() => router.push("/dashboard/plans")}> 
            <Image
              src="/assets/icons/back.svg"
              alt="back"
              width={18}
              height={15}
            />
          </button>
          <h2 className="text-lg md:text-2xl font-medium text-[#92A5A8]">
            Create New Plan{" "}
            <span className="text-[#FCFFFF] font-normal text-[14px] ml-2 mb-[4px]">
              | Basic Information
            </span>
          </h2>
        </div>
        <div>
          <button
            className="border border-[#33C5E03D] p-[14px] rounded-[24px] text-[#33C5E0] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer"
            onClick={() => {}}
          >
            <Image
              src="/assets/icons/plus.svg"
              alt="plus icon"
              width={14}
              height={14}
              className="inline-block mr-2"
            />
            <span>Save As Draft</span>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-8">
        {/* Progress Steps */}
        <div className="flex flex-row items-center justify-between w-full mb-2">
          {[1, 2, 3, 4, 5].map((step, idx) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step === 1
                    ? "border-cyan-400 bg-[#161E22]"
                    : "border-[#232B36] bg-[#232B36]"
                }`}
              >
                <span
                  className={`text-[15px] font-semibold ${
                    step === 1 ? "text-cyan-400" : "text-[#BFC6C8]"
                  }`}
                >
                  {step}
                </span>
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step === 1 ? "text-cyan-400" : "text-[#BFC6C8]"
                }`}
              >
                {
                  [
                    "Basic Information",
                    "Asset Allocation",
                    "Rules",
                    "Verification",
                    "Preview",
                  ][idx]
                }
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[#BFC6C8] text-[15px] mb-4">
          Please carefully fill out this form to create a new inheritance plan
        </p>
        {/* Form */}
        <form className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
          <div>
            <label className="block text-[#FCFFFF] text-[13px] mb-2">
              Plan Name
            </label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Graduation Inheritance"
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[13px] mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Text"
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none min-h-[60px]"
            />
          </div>
          <div>
            <label className="block text-[#FCFFFF] text-[13px] mb-2">
              Select Beneficiary
            </label>
            <div className="flex flex-row flex-wrap gap-6 items-stretch">
              {beneficiaries.map((b, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col items-center bg-[#182024] border border-[#2A3338] rounded-[24px] h-[298px] p-0 min-w-[240px] max-w-[260px] w-full transition-all ${
                    selectedBeneficiaries.includes(b.id)
                      ? "ring-2 ring-[#2A3338]"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedBeneficiaries((prev) =>
                      prev.includes(b.id)
                        ? prev.filter((id) => id !== b.id)
                        : [...prev, b.id]
                    );
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={b.avatar ?? "/assets/icons/default-avatar.svg"}
                    alt={b.name}
                    width={70}
                    height={70}
                    className="h-[50%] w-full mb-2"
                  />
                  <div className="w-full py-[8px] px-[16px] flex flex-col items-start justify-around h-[50%]">
                    <span className="text-[#FCFFFF] font-medium text-[14px] mb-1">
                      {b.name}
                    </span>
                    <span className="text-[#BFC6C8] text-[10px] mb-1">
                      <Image
                        src="/assets/icons/phone.svg"
                        alt="phone"
                        width={15.62}
                        height={15.62}
                        className="inline-block mr-2"
                      />
                      <span>{b.phone}</span>
                    </span>
                    <span className="text-[#33C5E0] text-[10px] underline mb-1 cursor-pointer">
                      <Image
                        src="/assets/icons/at.svg"
                        alt="email"
                        width={15.62}
                        height={15.62}
                        className="inline-block mr-2"
                      />
                      <span>{b.email}</span>
                    </span>
                    <span className="text-[#BFC6C8] text-[10px] mb-1">
                      <Image
                        src="/assets/icons/wallet.svg"
                        alt="location"
                        width={15.62}
                        height={15.62}
                        className="inline-block mr-2"
                      />
                      <span>{b.address}</span>
                    </span>
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 p-1"
                      aria-label="Edit Beneficiary"
                    >
                      <Image
                        src="/assets/icons/edit.svg"
                        alt="edit"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center bg-transparent border border-[#33C5E03D] rounded-[18px] w-[144px] h-[144px] hover:bg-[#33C5E014] transition-colors">
                <button
                  type="button"
                  className="flex flex-col items-center justify-center"
                  onClick={() => router.push("/dashboard/plans/create/beneficiary")}
                >
                  <Image
                    src="/assets/icons/plus.svg"
                    alt="add"
                    width={28}
                    height={28}
                  />
                  <span className="text-[#33C5E0] text-[14px] mt-2">
                    Add Beneficiary
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              disabled={!isFormValid}
              className={`bg-[#33C5E0] text-[#161E22] px-8 py-3 font-medium rounded-[16px] h-[56px] rounded-t-[8px] rounded-b-[24px] flex items-center gap-2 border border-[#232B36] transition-colors hover:bg-[#33C5E0]/90 disabled:bg-[#1C252A] disabled:text-[#FCFFFF] disabled:cursor-not-allowed`}
              onClick={() => {
                if (isFormValid) router.push("/dashboard/plans/create/asset-allocation");
              }}
            >
              NEXT
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="#161E22"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* Validation messages */}
          {!isPlanNameValid && (
            <span className="text-red-500 text-xs mt-1">Plan name is required</span>
          )}
          {!isDescriptionValid && (
            <span className="text-red-500 text-xs mt-1">Description is required</span>
          )}
          {selectedBeneficiaries.length === 0 && (
            <span className="text-red-500 text-xs mt-1">Select at least one beneficiary</span>
          )}
        </form>
      </div>
    </main>
  );
};

export default CreatePlanPage;
