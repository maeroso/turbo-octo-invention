import React, { ReactNode } from "react";
import { WizardProvider } from "@/components/FormWizard/Context/WizardProvider";
import { WizardProgress } from "@/components/FormWizard/Presentation/WizardProgress";
import { WizardContent } from "@/components/FormWizard/Presentation/WizardContent";
import { WizardNavigation } from "@/components/FormWizard/Presentation/WizardNavigation";

export type StepConfig = {
  id: string;
  title: string;
  isValid: (data: any) => boolean;
  component: ReactNode;
};

const FormWizard: React.FC<{
  steps: StepConfig[];
  initialData: any;
  onSubmit: (data: any) => void;
}> = ({ steps, initialData, onSubmit }) => {
  return (
    <WizardProvider steps={steps} initialData={initialData}>
      <div className="max-w-2xl mx-auto p-6">
        <WizardProgress />
        <form className="space-y-6">
          <WizardContent />
          <WizardNavigation onSubmit={onSubmit} />
        </form>
      </div>
    </WizardProvider>
  );
};

export default FormWizard;