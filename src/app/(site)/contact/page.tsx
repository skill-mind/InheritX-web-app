"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import "./contact.css";

const subjectOptions = [
  { value: "", label: "Select A Subject", disabled: true },
  { value: "legal-issue", label: "Legal" },
  { value: "general-inquiry", label: "Compliance Issue" },
  { value: "technical-support", label: "Technical Problem" },
  { value: "other", label: "Other" },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    message: "",
  });

  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.subject.trim() !== "" &&
    formData.message.trim() !== "";

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* Desktop - Contact Bacground Particles */}
      <Image
        src="/assets/images/contact_tree.svg"
        alt="background vector"
        fill={false}
        width={1920}
        height={400}
        className="absolute right-0 top-0 z-[-999] w-full h-auto pointer-events-none select-none hidden md:block"
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
      <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 mt-[8rem] mb-[20rem]">
        <div className="contact-box max-w-[796px] p-[48px] rounded-[48px] mx-auto bg-[#1C252A] z-[9999999]">
          {/* Contact Support Header */}
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-[#FCFFFF] text-[#FCFFFF] font-semibold mb-2">
              Contact Support
            </h1>
            <p className="text-[#92A5A8] text-[12px] md:text-[14px]">
              We&apos;re here if you need help or clarity on things concerning
              InheritX
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-[#FCFFFF] text-[10px] md:text-[12px] font-medium mb-2 sm:mb-3"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full bg-transparent border border-[#1C252A] rounded-lg px-4 py-3 sm:py-4 text-[#92A5A8] text-[12px] md:text-[14px] ] placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors duration-200"
                required
              />
            </div>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-[#FCFFFF] text-[10px] md:text-[12px] font-medium mb-2 sm:mb-3"
              >
                Subject
              </label>
              <CustomDropdown
                options={subjectOptions}
                value={formData.subject}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, subject: val }))
                }
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-[#FCFFFF] text-[10px] md:text-[12px] font-medium mb-2 sm:mb-3"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Text"
                rows={6}
                className="w-full bg-transparent border border-[#1C252A] rounded-lg px-4 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors duration-200 resize-vertical min-h-[120px]"
                required
              />
            </div>
          </form>
        </div>
        <div className="bg-[#1C252A] h-[12px] w-[400px] mx-auto rounded-[12px] my-4"></div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-center">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`group ${
              !isFormValid
                ? "bg-[#1C252A] text-[#92A5A8] cursor-not-allowed"
                : "bg-[#33C5E0] hover:bg-cyan-300 text-[#161E22]"
            } space-x-4 text-[14px] font-medium px-8 py-4 rounded-b-[24px] rounded-t-[8px] transition-all duration-300 transform ${
              isFormValid
                ? "hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25"
                : ""
            } flex items-center`}
          >
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
    </>
  );
};

// CustomDropdown component
const CustomDropdown: React.FC<{
  options: { value: string; label: string; disabled?: boolean }[];
  value: string;
  onChange: (val: string) => void;
}> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full bg-[#1C252A] border border-[#1C252A] rounded-lg px-4 py-3 sm:py-4 text-[#92A5A8] text-[12px] md:text-[14px] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors duration-200 appearance-none cursor-pointer flex justify-between items-center"
        onClick={() => setOpen((prev) => !prev)}
        ref={selectRef}
      >
        <span>
          {options.find((opt) => opt.value === value)?.label || "Legal"}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[40%] bg-[#1C252A] border border-[#232B2F] rounded-lg shadow-lg z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              disabled={opt.disabled}
              className={`block w-full text-left px-4 py-3 text-[#92A5A8] text-[12px] md:text-[14px] hover:bg-slate-800 transition-colors duration-200 ${
                opt.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (!opt.disabled) {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactPage;
