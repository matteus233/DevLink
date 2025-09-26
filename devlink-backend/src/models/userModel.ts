export interface User {
  id: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const users: User[] = [];
