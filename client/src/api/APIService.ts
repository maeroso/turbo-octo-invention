import { API_CONFIG } from "@/api/APIConfig";

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};

export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

export class ApiService {
  private static instance: ApiService;
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  private constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.defaultHeaders = API_CONFIG.DEFAULT_HEADERS;
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || "An error occurred",
        code: errorData.code,
        status: response.status
      };
    }

    return {
      success: response.ok,
      message: response.statusText,
      data: await response.json()
    };
  }

  private createUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout = 5000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  public async post<T>(
    endpoint: string,
    data: any,
    headers: HeadersInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.fetchWithTimeout(
        this.createUrl(endpoint),
        {
          method: "POST",
          headers: {
            ...this.defaultHeaders,
            ...headers
          },
          body: JSON.stringify(data)
        }
      );

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw { message: "Request timed out", code: "TIMEOUT" };
        }
      }
      throw error;
    }
  }
}