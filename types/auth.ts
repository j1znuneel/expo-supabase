export type Role = 'manager' | 'staff';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface AuthForm {
  email: string;
  password: string;
  fullName?: string;
  role?: Role;
}
