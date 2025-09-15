// COMMENTED OUT - This page is not being used in the current flow
// The rules page now goes directly to preview, skipping verification
//
// This file has been disabled to remove the verification step from the create plan flow.
// Users now go directly from Rules to Preview.

// import React, { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   CreatePlanProvider,
//   useCreatePlan,
// } from "@/contexts/CreatePlanContext";

// const VerificationPageContent = () => {
//   const router = useRouter();
//   const { formData, updateFormData, addTrustee } = useCreatePlan();
//   const [trusteeName, setTrusteeName] = useState("");
//   const [trusteePhone, setTrusteePhone] = useState("");
//   const [trusteeEmail, setTrusteeEmail] = useState("");

//   const isTrusteeValid =
//     trusteeName.trim() && trusteePhone.trim() && trusteeEmail.trim();
//   const isFormValid =
//     formData.legalFiles.length > 0 && formData.trustees.length > 0;

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       updateFormData({
//         legalFiles: [...formData.legalFiles, ...Array.from(e.target.files)],
//       });
//     }
//   };

//   const handleAddTrustee = () => {
//     if (isTrusteeValid) {
//       addTrustee({
//         name: trusteeName,
//         phone: trusteePhone,
//         email: trusteeEmail,
//       });
//       setTrusteeName("");
//       setTrusteePhone("");
//       setTrusteeEmail("");
//     }
//   };

//   return (
//     <main className="flex flex-col gap-6 p-4 md:p-8 w-full">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4 mb-2">
//           <button
//             className="text-[#BFC6C8] cursor-pointer text-[15px] flex items-center gap-2"
//             onClick={() => router.back()}
//           >
//             <Image
//               src="/assets/icons/back.svg"
//               alt="back"
//               width={18}
//               height={15}
//             />
//           </button>
//           <h2 className="text-lg md:text-2xl font-medium text-[#92A5A8]">
//             Create New Plan
//             <span className="text-[#FCFFFF] font-normal text-[14px] ml-2 mb-[4px]">
//               | Verification & Legal Settings
//             </span>
//           </h2>
//         </div>
//         <div>
//           <button className="border border-[#33C5E03D] p-[14px] rounded-[24px] text-[#33C5E0] text-[14px] hover:bg-[#33C5E0] hover:text-[#161E22] duration-500 cursor-pointer">
//             <Image
//               src="/assets/icons/plus.svg"
//               alt="plus icon"
//               width={14}
//               height={14}
//               className="inline-block mr-2"
//             />
//             <span>Save As Draft</span>
//           </button>
//         </div>
//       </div>
//       <div className="w-full flex flex-col gap-8">
//         {/* Progress Steps */}
//         <div className="flex flex-row items-center justify-between w-full mb-2">
//           {[1, 2, 3, 4, 5].map((step, idx) => (
//             <div key={step} className="flex flex-col items-center flex-1">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
//                   step <= 4
//                     ? "border-cyan-400 bg-[#161E22]"
//                     : "border-[#232B36] bg-[#232B36]"
//                 }`}
//               >
//                 {step < 4 ? (
//                   <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//                     <path
//                       d="M5 12l5 5 9-9"
//                       stroke="#33C5E0"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 ) : (
//                   <span
//                     className={`text-[15px] font-semibold ${
//                       step === 4 ? "text-cyan-400" : "text-[#BFC6C8]"
//                     }`}
//                   >
//                     {step}
//                   </span>
//                 )}
//               </div>
//               <span
//                 className={`mt-2 text-xs font-medium ${
//                   step === 4 ? "text-cyan-400" : "text-[#BFC6C8]"
//                 }`}
//               >
//                 {
//                   [
//                     "Basic Information",
//                     "Asset Allocation",
//                     "Rules",
//                     "Verification",
//                     "Preview",
//                   ][idx]
//                 }
//               </span>
//             </div>
//           ))}
//         </div>
//         <p className="text-center text-[#BFC6C8] text-[15px] mb-4">
//           Confirm Identity & Legal Details
//         </p>
//         <form className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
//           {/* Upload Legal Documents */}
//           <div>
//             <label className="block text-[#FCFFFF] text-[13px] md:text-[16px] mb-2">
//               Upload Legal Documents
//             </label>
//             <div className="border border-dashed border-[#33C5E0] rounded-[18px] p-8 flex flex-col items-center justify-center text-center bg-transparent">
//               <p className="text-[#92A5A8] text-[14px] mb-4">
//                 Upload any legal document that you think is necessary
//               </p>
//               <label
//                 htmlFor="legal-upload"
//                 className="flex items-center gap-2 px-6 py-3 rounded-[24px] border border-[#33C5E03D] text-[#33C5E0] text-[15px] cursor-pointer hover:bg-[#33C5E0] hover:text-[#161E22] duration-500"
//               >
//                 <Image
//                   src="/assets/icons/upload.svg"
//                   alt="upload"
//                   width={20}
//                   height={20}
//                 />
//                 Upload Legal Documents
//               </label>
//               <input
//                 id="legal-upload"
//                 type="file"
//                 className="hidden"
//                 onChange={handleFileChange}
//                 accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                 multiple
//               />
//               {formData.legalFiles.length > 0 && (
//                 <div className="flex flex-wrap gap-6 mt-6 w-full justify-center">
//                   {formData.legalFiles.map((file, idx) => (
//                     <div key={idx} className="flex flex-col items-center">
//                       <div className="w-[120px] h-[120px] bg-[#232B36] rounded-[12px] flex items-center justify-center overflow-hidden">
//                         {file.type.startsWith("image/") ? (
//                           <Image
//                             src={URL.createObjectURL(file)}
//                             alt={file.name}
//                             width={500} // required by Next.js
//                             height={500} // required by Next.js
//                             className="w-full h-full object-cover"
//                             unoptimized // needed for blob/file URLs
//                           />
//                         ) : (
//                           <Image
//                             src="/assets/icons/file.svg"
//                             alt="file"
//                             width={40}
//                             height={40}
//                           />
//                         )}
//                       </div>
//                       <span className="text-[#BFC6C8] text-xs mt-2 text-center max-w-[120px] truncate">
//                         {file.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           {/* Trustee Form */}
//           <div>
//             <label className="block text-[#BFC6C8] text-[13px] md:text-[16px] mb-2">
//               Add a Trustee / Executor
//             </label>
//             <div className="flex flex-col gap-2">
//               <label htmlFor="" className="text-[14px] text-[#92A5A8]">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 value={trusteeName}
//                 onChange={(e) => setTrusteeName(e.target.value)}
//                 placeholder="e.g. John Doe"
//                 className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none"
//               />
//               <label htmlFor="" className="text-[14px] text-[#92A5A8]">
//                 Phone Number
//               </label>

//               <input
//                 type="text"
//                 value={trusteePhone}
//                 onChange={(e) => setTrusteePhone(e.target.value)}
//                 placeholder="e.g. +234 812 3455 678"
//                 className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none"
//               />
//               <label htmlFor="" className="text-[14px] text-[#92A5A8]">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 value={trusteeEmail}
//                 onChange={(e) => setTrusteeEmail(e.target.value)}
//                 placeholder="e.g. example@gmail.com"
//                 className="w-full bg-[#161E22] border border-[#232B36] rounded-[12px] px-4 py-3 text-[#FCFFFF] placeholder:text-[#425558] text-[15px] outline-none"
//               />
//               <div className="flex justify-end mt-2">
//                 <button
//                   type="button"
//                   className="flex items-center gap-2 bg-[#161E22] border border-[#33C5E03D] text-[#33C5E0] px-6 py-3 rounded-[24px] font-normal text-[12px] hover:bg-[#33C5E014] transition-colors"
//                   onClick={handleAddTrustee}
//                   disabled={!isTrusteeValid}
//                 >
//                   <Image
//                     src="/assets/icons/plus.svg"
//                     alt="add"
//                     width={15}
//                     height={15}
//                   />
//                   Add Trustee
//                 </button>
//               </div>
//               {/* List of added trustees */}
//               {formData.trustees.length > 0 && (
//                 <ul className="mt-4">
//                   {formData.trustees.map((t, idx) => (
//                     <li
//                       key={idx}
//                       className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 text-[#33C5E0]"
//                     >
//                       <span>{t.name}</span>
//                       <span>{t.phone}</span>
//                       <span>{t.email}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//           <div className="flex justify-start mt-8">
//             <button
//               type="button"
//               disabled={!isFormValid}
//               className={`bg-[#33C5E0] w-[243px] text-[#161E22] text-center px-8 py-3 font-medium rounded-[16px] h-[56px] rounded-t-[8px] rounded-b-[24px] flex items-center gap-2 border border-[#232B36] text-[14px] transition-colors hover:bg-[#33C5E0]/90 disabled:bg-[#1C252A] disabled:text-[#425558] disabled:cursor-not-allowed`}
//               onClick={() => {
//                 if (isFormValid) router.push("/dashboard/plans/create/preview");
//               }}
//             >
//               PREVIEW
//               <Image
//                 src="/assets/icons/grey_arrowdown.svg"
//                 alt="arrow icon"
//                 width={13.5}
//                 height={13.5}
//                 className="inline-block"
//               />
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// };

// const VerificationPage = () => (
//   <CreatePlanProvider>
//     <VerificationPageContent />
//   </CreatePlanProvider>
// );

// export default VerificationPage;

const VerificationPage = () => {
  return null;
};

export default VerificationPage;
