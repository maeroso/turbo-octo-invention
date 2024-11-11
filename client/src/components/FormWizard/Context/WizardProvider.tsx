import React, { ReactNode } from "react";
import { StepConfig } from "@/components/FormWizard/FormWizard";
import { WizardContext } from "@/components/FormWizard/Context/WizardContext";

export type WizardProviderProps = {
  children: ReactNode;
  initialData: any;
  steps: StepConfig[];
};

export const WizardProvider: React.FC<WizardProviderProps> = ({
                                                                children,
                                                                initialData,
                                                                steps
                                                              }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState(initialData);
  const [isEditing, setIsEditing] = React.useState(false);

  const updateFormData = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }));
  };

  const value = {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    isEditing,
    setIsEditing,
    steps
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
};