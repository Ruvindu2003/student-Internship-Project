export interface User {
  id: number;
  username: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
}

export interface AuthResponse {
  token?: string;
  id?: number;
  username?: string;
  role?: string;
}