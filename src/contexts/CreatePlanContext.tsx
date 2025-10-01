/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useState, ReactNode } from "react";
import { cairo, byteArray } from "starknet";

// Types matching the contract requirements
interface Beneficiary {
  id: number;
  name: string;
  relationship: string;
  email: string;
}

// Contract beneficiary input structure
interface BeneficiaryInput {
  name: string;
  email: string;
  relationship: string;
}

interface Asset {
  type: number; // u8: 0=STRK, 1=USDT, 2=USDC
  amount: number; // u256
  label: string; // For UI display
  icon: string; // For UI display
}

// Contract enums
enum AssetType {
  STRK = 0,
  USDT = 1,
  USDC = 2,
}

enum DistributionMethod {
  LumpSum = 0,
  Quarterly = 1,
  Yearly = 2,
  Monthly = 3,
}

interface CreatePlanContextType {
  // Form data matching contract requirements
  formData: {
    // Step 1: Plan Creation Name & Description
    planName: string;
    planDescription: string;

    // Step 2: Add Multiple Beneficiaries (array of beneficiaries for contract)
    contractBeneficiaries: Array<BeneficiaryInput>;

    // Step 3: Asset Allocation (single asset for contract)
    assetType: number; // u8: 0=STRK, 1=USDT, 2=USDC
    assetAmount: number; // u256

    // Step 4: Rules for Plan Creation
    distributionMethod: number; // u8: 0=LumpSum, 1=Quarterly, 2=Yearly, 3=Monthly
    claimCode: string; // 6-digit claim code

    // Additional form data for UI
    beneficiaries: Beneficiary[]; // For UI display
    selectedBeneficiaries: number[]; // For UI selection
    assets: Asset[]; // For UI display
    additional_note: string; // Additional notes

    lump_sum_date: number;
    quarterly_percentage: number;
    yearly_percentage: number;
    monthly_percentage: number;

    // UI-specific fields for backward compatibility
    disbursementType: string; // For UI display
    lumpDate: string; // For UI display
    percentages: { [key: string]: string }; // For UI display
    note: string; // For UI display

    // Contract parameters
    contractParams?: any; // Store prepared contract parameters
  };

  // Navigation state
  currentStep: number;
  isComplete: boolean;
  isSubmitting: boolean;

  // Actions
  updateFormData: (data: Partial<CreatePlanContextType["formData"]>) => void;
  addBeneficiary: (beneficiary: Omit<Beneficiary, "id">) => void;
  removeBeneficiary: (id: number) => void;
  addAsset: (asset: Asset) => void;
  removeAsset: (index: number) => void;
  removeTrustee: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  createPlan: () => Promise<any>;

  // Helper functions for contract integration
  getAssetTypeFromString: (assetString: string) => number;
  getAssetTypeToString: (assetType: number) => string;
  getDistributionMethodFromString: (methodString: string) => number;
  getDistributionParameters: () => {
    lumpSumDate: number;
    quarterlyPercentage: number;
    yearlyPercentage: number;
    monthlyPercentage: number;
  };
}

const CreatePlanContext = createContext<CreatePlanContextType | undefined>(
  undefined
);

const initialFormData: CreatePlanContextType["formData"] = {
  // Contract required fields
  planName: "",
  planDescription: "",
  contractBeneficiaries: [], // Array of beneficiaries for contract
  assetType: 0, // Default to STRK
  assetAmount: 0,
  distributionMethod: 0, // Default to LumpSum

  lump_sum_date: 0,
  quarterly_percentage: 0,
  yearly_percentage: 0,
  monthly_percentage: 0,

  claimCode: "",
  additional_note: "",

  // UI fields
  beneficiaries: [], // Add missing beneficiaries field
  selectedBeneficiaries: [],
  assets: [],

  // UI-specific fields
  disbursementType: "",
  lumpDate: "",
  percentages: {},
  note: "",
};

export function CreatePlanProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<typeof initialFormData>) => {
    setFormData((prev) => {
      const updatedData = { ...prev, ...data };

      // If distribution method is being updated, reset unused parameters
      if (data.distributionMethod !== undefined) {
        switch (data.distributionMethod) {
          case DistributionMethod.LumpSum:
            // Reset all percentage fields, keep lump_sum_date
            updatedData.quarterly_percentage = 0;
            updatedData.yearly_percentage = 0;
            updatedData.monthly_percentage = 0;
            break;
          case DistributionMethod.Quarterly:
            // Reset lump_sum_date and other percentages, keep quarterly_percentage
            updatedData.lump_sum_date = 0;
            updatedData.yearly_percentage = 0;
            updatedData.monthly_percentage = 0;
            break;
          case DistributionMethod.Yearly:
            // Reset lump_sum_date and other percentages, keep yearly_percentage
            updatedData.lump_sum_date = 0;
            updatedData.quarterly_percentage = 0;
            updatedData.monthly_percentage = 0;
            break;
          case DistributionMethod.Monthly:
            // Reset lump_sum_date and other percentages, keep monthly_percentage
            updatedData.lump_sum_date = 0;
            updatedData.quarterly_percentage = 0;
            updatedData.yearly_percentage = 0;
            break;
        }
      }

      // Map percentage values from UI to specific percentage fields
      if (data.percentages) {
        const percentages = { ...prev.percentages, ...data.percentages };

        // Map UI percentage values to specific percentage fields
        if (percentages["Quarterly Release Of Funds (Disbursement)"]) {
          updatedData.quarterly_percentage =
            Number(percentages["Quarterly Release Of Funds (Disbursement)"]) ||
            0;
        }
        if (percentages["Yearly Release Of Funds (Disbursement)"]) {
          updatedData.yearly_percentage =
            Number(percentages["Yearly Release Of Funds (Disbursement)"]) || 0;
        }
        if (percentages["Monthly Release Of Funds (Disbursement)"]) {
          updatedData.monthly_percentage =
            Number(percentages["Monthly Release Of Funds (Disbursement)"]) || 0;
        }
      }

      // Map lump sum date from UI to contract field
      if (data.lumpDate) {
        // Convert date string to timestamp
        const date = new Date(data.lumpDate);
        updatedData.lump_sum_date = Math.floor(date.getTime() / 1000);
      }

      // Map additional note
      if (data.note !== undefined) {
        updatedData.additional_note = data.note;
      }

      return updatedData;
    });
  };

  const addBeneficiary = (beneficiary: Omit<Beneficiary, "id">) => {
    console.log("=== CONTEXT: addBeneficiary called ===");
    console.log("Input beneficiary:", beneficiary);
    console.log("Current beneficiaries:", formData.beneficiaries);

    // Check if beneficiary already exists (by email)
    const existingBeneficiary = formData.beneficiaries.find(
      (b) => b.email === beneficiary.email
    );

    if (existingBeneficiary) {
      console.log(
        "Beneficiary already exists, selecting them:",
        existingBeneficiary
      );
      // If beneficiary exists, just select them instead of adding duplicate
      setFormData((prev) => ({
        ...prev,
        selectedBeneficiaries: prev.selectedBeneficiaries.includes(
          existingBeneficiary.id
        )
          ? prev.selectedBeneficiaries
          : [...prev.selectedBeneficiaries, existingBeneficiary.id],
      }));
      return;
    }

    const newBeneficiary: Beneficiary = {
      ...beneficiary,
      id:
        formData.beneficiaries.length > 0
          ? Math.max(...formData.beneficiaries.map((b) => b.id)) + 1
          : 1,
    };

    console.log("Creating new beneficiary:", newBeneficiary);

    setFormData((prev) => ({
      ...prev,
      beneficiaries: [...prev.beneficiaries, newBeneficiary],
      selectedBeneficiaries: [...prev.selectedBeneficiaries, newBeneficiary.id], // Automatically select new beneficiary
    }));

    console.log("Beneficiary added to context");
  };

  const removeBeneficiary = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      beneficiaries: prev.beneficiaries.filter((b) => b.id !== id),
      selectedBeneficiaries: prev.selectedBeneficiaries.filter(
        (bId) => bId !== id
      ),
    }));
  };

  const addAsset = (asset: Asset) => {
    setFormData((prev) => ({
      ...prev,
      assets: [...prev.assets, asset],
    }));
  };

  const removeAsset = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index),
    }));
  };

  const removeTrustee = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      beneficiaries: prev.beneficiaries.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsComplete(false);
    setIsSubmitting(false);
  };

  // Helper functions for contract integration
  const getAssetTypeFromString = (assetString: string): number => {
    switch (assetString) {
      case "STRK":
        return AssetType.STRK;
      case "USDT":
        return AssetType.USDT;
      case "USDC":
        return AssetType.USDC;
      default:
        return AssetType.STRK;
    }
  };

  const getAssetTypeToString = (assetType: number): string => {
    switch (assetType) {
      case AssetType.STRK:
        return "STRK";
      case AssetType.USDT:
        return "USDT";
      case AssetType.USDC:
        return "USDC";
      default:
        return "STRK";
    }
  };

  const getDistributionMethodFromString = (methodString: string): number => {
    switch (methodString) {
      case "Lump Sum (All At Once)":
        return DistributionMethod.LumpSum;
      case "Quarterly Release Of Funds (Disbursement)":
        return DistributionMethod.Quarterly;
      case "Yearly Release Of Funds (Disbursement)":
        return DistributionMethod.Yearly;
      case "Monthly Release Of Funds (Disbursement)":
        return DistributionMethod.Monthly;
      default:
        return DistributionMethod.LumpSum;
    }
  };

  const getDistributionParameters = () => {
    let lumpSumDate = 0;
    let quarterlyPercentage = 0;
    let yearlyPercentage = 0;
    let monthlyPercentage = 0;

    // Set only the relevant parameters based on distribution method
    switch (formData.distributionMethod) {
      case DistributionMethod.LumpSum:
        lumpSumDate = formData.lump_sum_date;
        break;
      case DistributionMethod.Quarterly:
        quarterlyPercentage = formData.quarterly_percentage;
        break;
      case DistributionMethod.Yearly:
        yearlyPercentage = formData.yearly_percentage;
        break;
      case DistributionMethod.Monthly:
        monthlyPercentage = formData.monthly_percentage;
        break;
    }

    return {
      lumpSumDate,
      quarterlyPercentage,
      yearlyPercentage,
      monthlyPercentage,
    };
  };

  const createPlan = async () => {
    try {
      setIsSubmitting(true);

      // Get selected beneficiaries for contract
      let selectedBeneficiaries = formData.beneficiaries.filter((b) =>
        formData.selectedBeneficiaries.includes(b.id)
      );

      // Fallback: if no beneficiaries are selected but there are beneficiaries, select all
      if (
        selectedBeneficiaries.length === 0 &&
        formData.beneficiaries.length > 0
      ) {
        selectedBeneficiaries = formData.beneficiaries;
        // Update the selectedBeneficiaries array
        setFormData((prev) => ({
          ...prev,
          selectedBeneficiaries: formData.beneficiaries.map((b) => b.id),
        }));
      }

      if (selectedBeneficiaries.length === 0) {
        throw new Error(
          "No beneficiaries available. Please add at least one beneficiary first."
        );
      }

      // Convert UI beneficiaries to contract format
      const contractBeneficiaries: BeneficiaryInput[] =
        selectedBeneficiaries.map((beneficiary) => ({
          name: beneficiary.name,
          email: beneficiary.email,
          relationship: beneficiary.relationship,
        }));

      // Prepare distribution parameters based on selected method
      let lumpSumDate = 0;
      let quarterlyPercentage = 0;
      let yearlyPercentage = 0;
      let monthlyPercentage = 0;

      // Set only the relevant parameters based on distribution method
      switch (formData.distributionMethod) {
        case DistributionMethod.LumpSum:
          lumpSumDate = formData.lump_sum_date;
          // All other percentages remain 0
          break;
        case DistributionMethod.Quarterly:
          quarterlyPercentage = formData.quarterly_percentage;
          // All other parameters remain 0
          break;
        case DistributionMethod.Yearly:
          yearlyPercentage = formData.yearly_percentage;
          // All other parameters remain 0
          break;
        case DistributionMethod.Monthly:
          monthlyPercentage = formData.monthly_percentage;
          // All other parameters remain 0
          break;
        default:
          // Default to lump sum if invalid method
          lumpSumDate = formData.lump_sum_date;
          break;
      }

      const decimals = 18; // STRK uses 18 decimals

      const assetAmountInSmallestUnit = BigInt(
        Math.floor(formData.assetAmount * Math.pow(10, decimals))
      );

      console.log("XXXX ASSET AMOUNT: ", formData.assetAmount);
      console.log(
        "XXXX ASSET AMOUNT IN SMALLEST UNIT: ",
        assetAmountInSmallestUnit
      );

      console.log("XXXX ASSET AMOUNT: ", formData.assetAmount);

      // Prepare contract parameters
      const contractParameters = {
        plan_name: byteArray.byteArrayFromString(formData.planName),
        plan_description: byteArray.byteArrayFromString(
          formData.planDescription
        ),
        beneficiaries: selectedBeneficiaries.map((beneficiary) => ({
          name: byteArray.byteArrayFromString(beneficiary.name),
          email: byteArray.byteArrayFromString(beneficiary.email),
          relationship: byteArray.byteArrayFromString(beneficiary.relationship),
        })),
        asset_type: BigInt(formData.assetType),
        asset_amount: cairo.uint256(assetAmountInSmallestUnit), // Use converted amount
        distribution_method: BigInt(formData.distributionMethod),
        lump_sum_date: BigInt(lumpSumDate),
        quarterly_percentage: BigInt(quarterlyPercentage),
        yearly_percentage: BigInt(yearlyPercentage),
        monthly_percentage: BigInt(monthlyPercentage),
        additional_note: byteArray.byteArrayFromString(
          formData.additional_note
        ),
        claim_code: byteArray.byteArrayFromString(formData.claimCode),
      };

      console.log("=== CONTRACT PARAMETERS DEBUG ===");
      console.log("Selected Beneficiaries:", selectedBeneficiaries);
      console.log("Distribution Method:", formData.distributionMethod);
      console.log("Yearly Percentage:", yearlyPercentage);
      console.log("Quarterly Percentage:", quarterlyPercentage);
      console.log("Monthly Percentage:", monthlyPercentage);
      console.log("Lump Sum Date:", lumpSumDate);
      console.log("Full contract parameters:", contractParameters);

      // Store contract parameters for the component to use
      setFormData((prev) => ({
        ...prev,
        contractParams: contractParameters,
      }));

      // Simulate contract call for now
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log("Inheritance plan created successfully!");
      setIsComplete(true);

      // Return the contract parameters for immediate use
      return contractParameters;
    } catch (error) {
      console.error("Error creating inheritance plan:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const value: CreatePlanContextType = {
    formData,
    currentStep,
    isComplete,
    isSubmitting,
    updateFormData,
    addBeneficiary,
    removeBeneficiary,
    addAsset,
    removeAsset,
    removeTrustee,
    nextStep,
    prevStep,
    resetForm,
    createPlan,
    getAssetTypeFromString,
    getAssetTypeToString,
    getDistributionMethodFromString,
    getDistributionParameters,
  };

  return (
    <CreatePlanContext.Provider value={value}>
      {children}
    </CreatePlanContext.Provider>
  );
}

export function useCreatePlan() {
  const context = useContext(CreatePlanContext);
  if (context === undefined) {
    throw new Error("useCreatePlan must be used within a CreatePlanProvider");
  }
  return context;
}
