import React from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useWizard } from "@/components/FormWizard/Context/WizardContext";

export const WizardNavigation: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  const {
    currentStep,
    setCurrentStep,
    formData,
    steps,
    isEditing
  } = useWizard();

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-between pt-4">
      <button
        data-testid="previousButton"
        type="button"
        onClick={handlePrevious}
        disabled={currentStep === 0 || isEditing}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md
          ${
          currentStep === 0 || isEditing
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        }`}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </button>

      {currentStep < steps.length - 1 ? (
        <button
          data-testid="nextButton"
          type="button"
          onClick={handleNext}
          disabled={!steps[currentStep].isValid(formData) || isEditing}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md
            ${
            !steps[currentStep].isValid(formData) || isEditing
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      ) : (
        <button
          data-testid="submitButton"
          onClick={handleSubmit}
          disabled={isEditing}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md
            ${
            isEditing
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Submit
          <Check className="w-4 h-4 ml-2" />
        </button>
      )}
    </div>
  );
};