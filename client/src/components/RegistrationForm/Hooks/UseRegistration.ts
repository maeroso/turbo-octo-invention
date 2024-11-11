import { useState, useCallback } from "react";
import { RegistrationData, RegistrationService } from "@/components/RegistrationForm/Hooks/RegistrationService";
import { ApiError } from "@/api/APIService";

export type RegistrationStatus = "idle" | "submitting" | "success" | "error";

export type UseRegistrationReturn = {
  status: RegistrationStatus;
  error: ApiError | null;
  submitRegistration: (data: RegistrationData) => Promise<void>;
  reset: () => void;
};

export const useRegistration = (): UseRegistrationReturn => {
  const [status, setStatus] = useState<RegistrationStatus>("idle");
  const [error, setError] = useState<ApiError | null>(null);

  const registrationService = new RegistrationService();

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  const submitRegistration = useCallback(async (data: RegistrationData) => {
    try {
      setStatus("submitting");
      setError(null);

      const response = await registrationService.submitRegistration(data);

      if (response.success) {
        setStatus("success");
      } else {
        throw { message: response.message };
      }
    } catch (err) {
      setStatus("error");
      setError(
        err as ApiError || { message: "An unexpected error occurred" }
      );
    }
  }, []);

  return {
    status,
    error,
    submitRegistration,
    reset
  };
};