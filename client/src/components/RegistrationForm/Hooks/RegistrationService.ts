import { ApiResponse, ApiService } from "@/api/APIService";
import { API_CONFIG } from "@/api/APIConfig";

export type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  deliveryAddress: string;
  preferredTime: string;
  specialInstructions?: string;
};

export class RegistrationService {
  private api: ApiService;

  constructor() {
    this.api = ApiService.getInstance();
  }

  public async submitRegistration(data: RegistrationData): Promise<ApiResponse> {
    return await this.api.post<RegistrationData>(
      API_CONFIG.ENDPOINTS.REGISTRATION,
      data
    );
  }
}