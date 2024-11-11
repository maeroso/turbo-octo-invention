import { useWizard } from "@/components/FormWizard/Context/WizardContext";
import React from "react";

const DeliveryPreferencesStep: React.FC = () => {
  const { formData, updateFormData } = useWizard();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Delivery Address *
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Preferred Time *
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Special Instructions</label>
        <textarea
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleChange}
          className="w-full p-2 border rounded h-24"
        />
      </div>
    </div>
  );
};

export default DeliveryPreferencesStep;