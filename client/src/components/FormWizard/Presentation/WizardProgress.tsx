import { Check } from "lucide-react";
import React from "react";
import { useWizard } from "@/components/FormWizard/Context/WizardContext";

export const WizardProgress: React.FC = () => {
  const { currentStep, steps } = useWizard();

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center flex-1"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                ${
                index < currentStep
                  ? "bg-blue-600 text-white"
                  : index === currentStep
                    ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {index < currentStep ? (
                <Check size={16} />
              ) : (
                index + 1
              )}
            </div>
            <span className="text-sm text-center">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};