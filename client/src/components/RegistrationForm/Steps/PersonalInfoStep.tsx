import React from "react";
import { useWizard } from "@/components/FormWizard/Context/WizardContext";

const PersonalInfoStep: React.FC = () => {
  const { formData, updateFormData } = useWizard();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Name *
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Last Name *
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email *
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>
    </div>
  );
};

export default PersonalInfoStep;