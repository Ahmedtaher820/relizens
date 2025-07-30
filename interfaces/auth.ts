export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface AuthHeaders {
  Authorization?: string
  Accept?: string
  'Content-Type'?: string
}

export interface LoginPayload {
  email: string
  password: string
}
