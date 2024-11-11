import { useWizard } from "@/components/FormWizard/Context/WizardContext";
import React from "react";

const ReviewAndSubmitStep: React.FC = () => {
  const { formData, isEditing, setIsEditing } = useWizard();

  const handleEditButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-4">
      {!isEditing &&
        <>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium mb-2">Personal Information</h3>
            <p>First Name: {formData.firstName}</p>
            <p>Last Name: {formData.lastName}</p>
            <p>Email: {formData.email}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium mb-2">Delivery Preferences</h3>
            <p>Address: {formData.deliveryAddress}</p>
            <p>Preferred Time: {formData.preferredTime}</p>
            <p>Special Instructions: {formData.specialInstructions || "None"}</p>
          </div>
        </>
      }
      <button
        data-testid="editButton"
        onClick={handleEditButton}
        className="text-blue-600 hover:text-blue-800"
      >
        {isEditing ? "Apply Edits" : "Edit Information"}
      </button>
    </div>
  );
};

export default ReviewAndSubmitStep;