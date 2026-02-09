const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user_id: string;
  email: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  token: string;
}

export interface ApiError {
  detail?: string;
  email?: string[];
  password?: string[];
  phone?: string[];
  non_field_errors?: string[];
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw { status: response.status, ...error };
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(
    email: string,
    password: string,
    phone?: string
  ): Promise<RegisterResponse> {
    const body: Record<string, string> = { email, password };
    if (phone) body.phone = phone;

    return this.request<RegisterResponse>("/auth/register/", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>("/auth/logout/", {
      method: "POST",
    });
  }

  async deleteAccount(): Promise<void> {
    return this.request<void>("/auth/deleteaccount/", {
      method: "DELETE",
    });
  }
}

export const api = new ApiClient(API_URL);
