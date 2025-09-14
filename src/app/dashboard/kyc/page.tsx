"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const steps = [
  { label: "Personal Information" },
  { label: "ID Upload" },
  { label: "Selfie Verification" },
  { label: "Review" },
];

const initialForm = {
  fullName: "",
  email: "",
  dob: "",
  address: "",
};

function validate(form: typeof initialForm) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  return (
    form.fullName.trim().length > 0 &&
    emailRegex.test(form.email) &&
    dateRegex.test(form.dob) &&
    form.address.trim().length > 0
  );
}

const KYCPage = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState<{
    [K in keyof typeof initialForm]?: boolean;
  }>({});

  const isValid = validate(form);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 w-full overflow-x-hidden max-w-full">
      <div className="flex items-center gap-4 mb-2">
        <button className="text-[#BFC6C8] text-[15px] flex items-center gap-2 cursor-pointer transition-colors duration-150 hover:text-white">
          <Image
            src="/assets/icons/back.svg"
            alt="back"
            width={18}
            height={15}
          />
        </button>
        <h2 className="text-lg md:text-2xl font-medium text-[#FCFFFF]">
          KYC{" "}
          <span className="text-[#92A5A8] font-normal text-[14px] ml-2 mb-[4px]">
            | Please Verify Your Identity
          </span>
        </h2>
      </div>
      <div className="w-full flex flex-col gap-8 max-w-full">
        {/* Progress Steps */}
        <div className="flex flex-row items-center justify-between w-full mb-2 max-w-full overflow-x-auto">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition duration-150 transform ${
                  idx === 0
                    ? "border-cyan-400 bg-[#161E22]"
                    : "border-[#232B36] bg-[#232B36]"
                } hover:scale-105 cursor-pointer`}
              >
                <span
                  className={`text-[15px] font-semibold transition-colors duration-150 ${
                    idx === 0 ? "text-cyan-400" : "text-[#BFC6C8]"
                  }`}
                >
                  {idx + 1}
                </span>
              </div>
              {idx < steps.length - 1 && <div className="kyc-step-bar" />}
              <div
                className={`mt-2 text-xs font-medium transition-colors duration-150 ${
                  idx === 0 ? "text-cyan-400" : "text-[#BFC6C8]"
                }`}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[#BFC6C8] text-[15px] mb-4">
          For your security and to meet compliance requirements, we need to
          verify your identity.
          <br />
          This only takes a few minutes.
        </p>
        <form
          className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
          autoComplete="off"
        >
          <label className="block text-[#FCFFFF] text-[13px] mb-2">
            Full Name
            <input
              type="text"
              name="fullName"
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none transition duration-150 focus:shadow-[0_0_0_6px_rgba(51,197,224,0.06)] focus:border-[#33C5E0]"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
            />
            {touched.fullName && !form.fullName.trim() && (
              <span className="kyc-error">Full Name is required</span>
            )}
          </label>
          <label className="block text-[#FCFFFF] text-[13px] mb-2">
            Email
            <input
              type="email"
              name="email"
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none transition duration-150 focus:shadow-[0_0_0_6px_rgba(51,197,224,0.06)] focus:border-[#33C5E0]"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="johndoe@gmail.com"
            />
            {touched.email &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                <span className="kyc-error">Enter a valid email</span>
              )}
          </label>
          <label className="block text-[#FCFFFF] text-[13px] mb-2">
            Date of birth
            <input
              type="text"
              name="dob"
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none transition duration-150 focus:shadow-[0_0_0_6px_rgba(51,197,224,0.06)] focus:border-[#33C5E0]"
              value={form.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="MM/DD/YYYY"
              maxLength={10}
            />
            {touched.dob &&
              !/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(
                form.dob
              ) && <span className="kyc-error">Enter date as MM/DD/YYYY</span>}
          </label>
          <label className="block text-[#FCFFFF] text-[13px] mb-2">
            Address
            <input
              type="text"
              name="address"
              className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none transition duration-150 focus:shadow-[0_0_0_6px_rgba(51,197,224,0.06)] focus:border-[#33C5E0]"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="No. 9, Gwari Avenue, Barnawa, Kaduna"
            />
            {touched.address && !form.address.trim() && (
              <span className="kyc-error">Address is required</span>
            )}
          </label>
          <div className="flex justify-start mt-8">
            <button
              type="button"
              className={`bg-[#33C5E0] w-[243px] text-[#161E22] text-center px-8 py-3 font-medium rounded-[16px] h-[56px] rounded-t-[8px] rounded-b-[24px] flex items-center gap-2 border border-[#232B36] text-[14px] transition duration-150 hover:bg-[#33C5E0]/90 hover:scale-105 ${!isValid ? 'disabled:bg-[#1C252A] disabled:text-[#425558] disabled:cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={!isValid}
              onClick={() => router.push("/dashboard/kyc/id-upload")}
            >
              CONTINUE
              <Image
                src="/assets/icons/grey_arrowdown.svg"
                alt="arrow icon"
                width={13.5}
                height={13.5}
                className="inline-block"
              />
            </button>
          </div>
        </form>
      </div>
      {/* <style jsx>{`
        .kyc-container {
          background: #10171d;
          min-height: 100vh;
          color: #fff;
          padding: 0 1rem;
          font-family: inherit;
        }
        .kyc-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 2rem;
        }
        .kyc-back {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .kyc-back-arrow {
          display: inline-block;
          width: 24px;
          height: 24px;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(45deg);
          margin-right: 2px;
        }
        .kyc-title {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .kyc-subtitle {
          font-size: 1rem;
          color: #bfc9d1;
        }
        .kyc-progress {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 2rem 0 1.5rem 0;
          position: relative;
        }
        .kyc-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          position: relative;
        }
        .kyc-step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #181f25;
          color: #bfc9d1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          border: 2px solid #181f25;
          transition: background 0.2s, color 0.2s;
        }
        .kyc-step-circle.active {
          background: #10171d;
          color: #00e0c6;
          border: 2px solid #00e0c6;
        }
        .kyc-step-bar {
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: #181f25;
          z-index: -1;
        }
        .kyc-step-label {
          font-size: 0.9rem;
          color: #bfc9d1;
          margin-top: 0.2rem;
        }
        .kyc-step-label.active {
          color: #00e0c6;
        }
        .kyc-desc {
          text-align: center;
          color: #bfc9d1;
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        .kyc-form {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .kyc-label {
          display: flex;
          flex-direction: column;
          font-size: 1rem;
          color: #bfc9d1;
          gap: 0.5rem;
        }
        .kyc-input {
          background: #181f25;
          border: 1px solid #181f25;
          border-radius: 8px;
          padding: 0.9rem 1rem;
          color: #fff;
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .kyc-input:focus {
          border: 1px solid #00e0c6;
        }
        .kyc-error {
          color: #ff4d4f;
          font-size: 0.85rem;
          margin-top: 0.2rem;
        }
        .kyc-continue {
          background: #181f25;
          color: #bfc9d1;
          border: none;
          border-radius: 16px;
          padding: 1rem 0;
          font-size: 1.1rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          margin-top: 1.5rem;
          width: 100%;
          transition: background 0.2s, color 0.2s;
        }
        .kyc-continue:disabled {
          background: #181f25;
          color: #2c353d;
          cursor: not-allowed;
        }
        .kyc-continue-arrow {
          display: inline-block;
          width: 18px;
          height: 18px;
          border-right: 2px solid #bfc9d1;
          border-bottom: 2px solid #bfc9d1;
          transform: rotate(-45deg);
          margin-left: 2px;
        }
        @media (max-width: 600px) {
          .kyc-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            padding-top: 1rem;
          }
          .kyc-progress {
            flex-direction: row;
            margin: 1.2rem 0 1rem 0;
          }
          .kyc-step-label {
            font-size: 0.8rem;
          }
          .kyc-step-circle {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }
          .kyc-form {
            max-width: 100%;
            padding: 0 0.2rem;
          }
        }
      `}</style> */}
    </main>
  );
};

export default KYCPage;
