import React, { createContext, useContext, useState, ReactNode } from "react";
import { cairo, byteArray } from "starknet";

// Types matching the contract requirements
interface Beneficiary {
  id: number;
  name: string;
  relationship: string;
  email: string;
  address: string; // ContractAddress as string
}

interface Asset {
  type: number; // u8: 0=STRK, 1=USDT, 2=USDC, 3=NFT
  amount: number; // u256
  label: string; // For UI display
  icon: string; // For UI display
}

// Contract enums
enum AssetType {
  STRK = 0,
  USDT = 1,
  USDC = 2,
  NFT = 3,
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

    // Step 2: Add Beneficiary (single beneficiary for contract)
    beneficiaryName: string;
    beneficiaryRelationship: string;
    beneficiaryEmail: string;
    beneficiaryAddress: string; // ContractAddress

    // Step 3: Asset Allocation (single asset for contract)
    assetType: number; // u8: 0=STRK, 1=USDT, 2=USDC, 3=NFT
    assetAmount: number; // u256

    // Step 4: Rules for Plan Creation
    distributionMethod: number; // u8: 0=LumpSum, 1=Quarterly, 2=Yearly, 3=Monthly
    claimCode: string; // 6-digit claim code

    // Additional form data for UI
    beneficiaries: Beneficiary[]; // For UI display
    selectedBeneficiaries: number[]; // For UI selection
    assets: Asset[]; // For UI display
    note: string; // Additional notes

    // UI-specific fields for backward compatibility
    disbursementType: string; // For UI display
    lumpDate: string; // For UI display
    percentages: { [key: string]: string }; // For UI display

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
  getDistributionMethodFromString: (methodString: string) => number;
}

const CreatePlanContext = createContext<CreatePlanContextType | undefined>(
  undefined
);

const initialFormData: CreatePlanContextType["formData"] = {
  // Contract required fields
  planName: "",
  planDescription: "",
  beneficiaryName: "",
  beneficiaryRelationship: "",
  beneficiaryEmail: "",
  beneficiaryAddress: "",
  assetType: 0, // Default to STRK
  assetAmount: 0,
  distributionMethod: 0, // Default to LumpSum
  claimCode: "",

  // UI fields
  beneficiaries: [],
  selectedBeneficiaries: [],
  assets: [],
  note: "",

  // UI-specific fields
  disbursementType: "",
  lumpDate: "",
  percentages: {},
};

export function CreatePlanProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<typeof initialFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
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
      case "NFT":
        return AssetType.NFT;
      default:
        return AssetType.STRK;
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

  const createPlan = async () => {
    try {
      setIsSubmitting(true);

      // Get the first selected beneficiary for contract
      let selectedBeneficiary = formData.beneficiaries.find((b) =>
        formData.selectedBeneficiaries.includes(b.id)
      );

      // Fallback: if no beneficiary is selected but there are beneficiaries, select the first one
      if (!selectedBeneficiary && formData.beneficiaries.length > 0) {
        selectedBeneficiary = formData.beneficiaries[0];
        // Update the selectedBeneficiaries array
        setFormData((prev) => ({
          ...prev,
          selectedBeneficiaries: [selectedBeneficiary!.id],
        }));
      }

      if (!selectedBeneficiary) {
        throw new Error(
          "No beneficiary available. Please add a beneficiary first."
        );
      }

      // Prepare contract parameters
      const contractParameters = {
        plan_name: byteArray.byteArrayFromString(formData.planName),
        plan_description: byteArray.byteArrayFromString(
          formData.planDescription
        ),
        beneficiary_name: byteArray.byteArrayFromString(
          selectedBeneficiary.name
        ),
        beneficiary_relationship: byteArray.byteArrayFromString(
          selectedBeneficiary.relationship
        ),
        beneficiary_email: byteArray.byteArrayFromString(
          selectedBeneficiary.email
        ),
        beneficiary_address: selectedBeneficiary.address,
        asset_type: BigInt(formData.assetType),
        asset_amount: cairo.uint256(formData.assetAmount),
        distribution_method: BigInt(formData.distributionMethod),
        claim_code: byteArray.byteArrayFromString(formData.claimCode),
      };

      console.log(
        "Creating inheritance plan with contract parameters:",
        contractParameters
      );

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
    getDistributionMethodFromString,
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
