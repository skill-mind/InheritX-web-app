import React, { createContext, useContext, useState, ReactNode } from "react";

// Types matching the existing form structures
interface Beneficiary {
  id: number;
  name: string;
  relationship: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
}

interface Asset {
  label: string;
  icon: string;
  amount: number;
}

interface Trustee {
  name: string;
  phone: string;
  email: string;
}

interface CreatePlanContextType {
  // Form data matching existing structure
  formData: {
    // Basic Information (Step 1)
    planName: string;
    description: string;
    beneficiaries: Beneficiary[];
    selectedBeneficiaries: number[];

    // Asset Allocation (Step 2)
    assets: Asset[];

    // Rules & Conditions (Step 3)
    claimCode: string;
    distribution: "lump" | "recurring";
    lumpDate: string;
    disbursementType: string;
    percentages: { [key: string]: string };
    note: string;

    // Verification & Legal Settings (Step 4)
    legalFiles: File[];
    trustees: Trustee[];
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
  addTrustee: (trustee: Trustee) => void;
  removeTrustee: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  createPlan: () => Promise<void>;
}

const CreatePlanContext = createContext<CreatePlanContextType | undefined>(
  undefined
);

const initialFormData: CreatePlanContextType["formData"] = {
  planName: "",
  description: "",
  beneficiaries: [],
  selectedBeneficiaries: [],
  assets: [],
  claimCode: "",
  distribution: "lump",
  lumpDate: "",
  disbursementType: "",
  percentages: {},
  note: "",
  legalFiles: [],
  trustees: [],
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
    const newBeneficiary: Beneficiary = {
      ...beneficiary,
      id:
        formData.beneficiaries.length > 0
          ? Math.max(...formData.beneficiaries.map((b) => b.id)) + 1
          : 1,
    };
    setFormData((prev) => ({
      ...prev,
      beneficiaries: [...prev.beneficiaries, newBeneficiary],
    }));
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

  const addTrustee = (trustee: Trustee) => {
    setFormData((prev) => ({
      ...prev,
      trustees: [...prev.trustees, trustee],
    }));
  };

  const removeTrustee = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      trustees: prev.trustees.filter((_, i) => i !== index),
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

  const createPlan = async () => {
    try {
      setIsSubmitting(true);

      // Here you would integrate with your blockchain and backend
      // For now, we'll just simulate the process
      console.log("Creating plan with data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsComplete(true);
    } catch (error) {
      console.error("Error creating plan:", error);
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
    addTrustee,
    removeTrustee,
    nextStep,
    prevStep,
    resetForm,
    createPlan,
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
