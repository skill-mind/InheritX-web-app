// Types for edit form
export interface BeneficiaryInput {
  name: string;
  email: string;
  relationship: string;
}

export interface EditFormData {
  newBeneficiaries: BeneficiaryInput[];
  newMonthlyPercentage: number;
  newYearlyPercentage: number;
  newQuarterlyPercentage: number;
  newDate: number;
  newAmount: number;
}
