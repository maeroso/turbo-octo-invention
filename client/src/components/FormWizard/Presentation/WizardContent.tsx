import React from "react";
import { useWizard } from "@/components/FormWizard/Context/WizardContext";

export const WizardContent: React.FC = () => {
  const { currentStep, steps, isEditing } = useWizard();

  if (isEditing) {
    return (
      <div className="space-y-6">
        {steps.map((step) => step.component)}
      </div>
    );
  }

  return <>{steps[currentStep].component}</>;
};