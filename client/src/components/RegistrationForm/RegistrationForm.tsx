import FormWizard, { StepConfig } from "@/components/FormWizard/FormWizard";
import PersonalInfoStep from "@/components/RegistrationForm/Steps/PersonalInfoStep";
import DeliveryPreferencesStep from "@/components/RegistrationForm/Steps/DeliveryPreferencesStep";
import ReviewAndSubmitStep from "@/components/RegistrationForm/Steps/ReviewAndSubmitStep";
import { RegistrationData } from "@/components/RegistrationForm/Hooks/RegistrationService";
import { useRegistration } from "@/components/RegistrationForm/Hooks/UseRegistration";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/shadcnui/alert";


const steps: StepConfig[] = [
  {
    id: "personal",
    title: "Personal Information",
    isValid: (data) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        data.firstName.trim() !== "" &&
        data.lastName.trim() !== "" &&
        emailRegex.test(data.email)
      );
    },
    component: <PersonalInfoStep />
  },
  {
    id: "delivery",
    title: "Delivery Preferences",
    isValid: (data) => {
      return data.deliveryAddress.trim() !== "" && data.preferredTime !== "";
    },
    component: <DeliveryPreferencesStep />
  },
  {
    id: "review",
    title: "Review and Submit",
    isValid: () => true,
    component: <ReviewAndSubmitStep />
  }
];

const initialData: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  deliveryAddress: "",
  preferredTime: "",
  specialInstructions: ""
};

const RegistrationForm = () => {
  const { status, error, submitRegistration, reset } = useRegistration();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div className="space-y-4">
      {status === "success" && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your registration has been submitted successfully.
          </AlertDescription>
        </Alert>
      )}

      {status === "error" && error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message}
          </AlertDescription>
        </Alert>
      )}
      <FormWizard
        steps={steps}
        initialData={initialData}
        onSubmit={submitRegistration}
      />
    </div>
  );
};

export default RegistrationForm;