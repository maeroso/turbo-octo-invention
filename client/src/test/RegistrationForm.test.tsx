import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { ApiService } from "@/api/APIService";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

jest.mock("@/api/APIService", () => ({
  ApiService: {
    getInstance: jest.fn(() => ({
      post: jest.fn()
    }))
  }
}));

describe("RegistrationForm", () => {
  let mockApiService: jest.Mocked<typeof ApiService>;

  beforeEach(() => {
    mockApiService = ApiService as jest.Mocked<typeof ApiService>;
    jest.clearAllMocks();
  });

  describe("Navigation", () => {
    it("should start at the personal information step", () => {
      render(<RegistrationForm />);
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    });

    it("should not allow navigation to next step with invalid data", () => {
      render(<RegistrationForm />);
      const nextButton = screen.getByTestId(/nextButton/i);
      expect(nextButton).toBeDisabled();
    });

    it("should allow navigation when all required fields are filled", async () => {
      render(<RegistrationForm />);

      await act(async () => {
        await userEvent.type(screen.getByLabelText(/first name/i), "John");
        await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
        await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
      });

      const nextButton = screen.getByTestId(/nextButton/i);
      expect(nextButton).toBeEnabled();
    });
  });

  describe("Form Validation", () => {
    it("should validate email format", async () => {
      render(<RegistrationForm />);

      await act(async () => {
        await userEvent.type(screen.getByLabelText(/first name/i), "John");
        await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
        await userEvent.type(screen.getByLabelText(/email/i), "invalid-email");
      });

      const nextButton = screen.getByTestId(/nextButton/i);
      expect(nextButton).toBeDisabled();
    });

    it("should validate delivery preferences", async () => {
      render(<RegistrationForm />);

      await act(async () => {
        await userEvent.type(screen.getByLabelText(/first name/i), "John");
        await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
        await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
      });

      fireEvent.click(screen.getByTestId(/nextButton/i));

      expect(screen.getByText(/next/i)).toBeDisabled();
    });
  });

  it("should handle successful submission", async () => {
    const mockPost = jest.fn().mockResolvedValue({
      success: true,
      message: "Registration successful"
    });

    mockApiService.getInstance.mockImplementation(() => ({
      post: mockPost
    }) as any);

    render(<RegistrationForm />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/first name/i), "John");
      await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    });

    fireEvent.click(screen.getByTestId(/nextButton/i));

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/delivery address/i), "123 Main St");
      await userEvent.selectOptions(screen.getByLabelText(/preferred time/i), "Afternoon");
    });

    fireEvent.click(screen.getByTestId(/nextButton/i));

    fireEvent.click(screen.getByTestId(/submitButton/i));

    await waitFor(() => {

      expect(screen.getByText(/success!/i)).toBeInTheDocument();
    });
  });

  it("should handle API errors", async () => {
    const mockError = {
      message: "Server error",
      code: "SERVER_ERROR"
    };

    mockApiService.getInstance.mockImplementation(() => ({
      post: jest.fn().mockRejectedValue(mockError)
    }) as any);

    render(<RegistrationForm />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/first name/i), "John");
      await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    });

    fireEvent.click(screen.getByTestId(/nextButton/i));

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/delivery address/i), "123 Main St");
      await userEvent.selectOptions(screen.getByLabelText(/preferred time/i), "Afternoon");
    });

    fireEvent.click(screen.getByTestId(/nextButton/i));

    fireEvent.click(screen.getByTestId(/submitButton/i));

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
      expect(screen.getByText(/Server error/)).toBeInTheDocument();
    });
  });
});