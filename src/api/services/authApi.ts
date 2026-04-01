export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  username: string;
  email: string;
  dob: string;
  car: string;
  password: string;
};

export async function login(payload: LoginPayload): Promise<{ token: string }> {
  void payload;
  return { token: 'mock-auth-token' };
}

export async function register(payload: RegisterPayload): Promise<{ userId: string }> {
  void payload;
  return { userId: 'mock-user-id' };
}
