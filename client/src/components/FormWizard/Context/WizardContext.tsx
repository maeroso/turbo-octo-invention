import { createContext, useContext } from "react";
import { StepConfig } from "@/components/FormWizard/FormWizard";

export type WizardContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: any;
  updateFormData: (data: any) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  steps: StepConfig[];
};

export const WizardContext = createContext<WizardContextType | null>(null);

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};