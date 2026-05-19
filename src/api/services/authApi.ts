const AUTH_KEY = 'auth';

export type StoredUser = {
  userId: string;
  username: string;
  role: string;
  token: string;
  refreshToken: string;
  expiresAt: number;
};

const API_URL: string = import.meta.env.VITE_API_URL || '/api';

export async function login(username: string, password: string): Promise<StoredUser> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 401) throw new Error('Invalid username or password');
  if (!response.ok) throw new Error(`Login failed with status ${response.status}`);

  const data = await response.json();
  const stored: StoredUser = {
    userId: data.userId,
    username: data.username,
    role: data.role,
    token: data.token,
    refreshToken: data.refreshToken,
    expiresAt: Date.now() + data.expiresIn * 1000,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(stored));
  return stored;
}

export async function register(
  username: string,
  password: string,
  email: string,
): Promise<StoredUser> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });

  if (response.status === 409) throw new Error('Username already taken');
  if (!response.ok) throw new Error(`Registration failed with status ${response.status}`);

  const data = await response.json();
  const stored: StoredUser = {
    userId: data.userId,
    username: data.username,
    role: data.role,
    token: data.token,
    refreshToken: data.refreshToken,
    expiresAt: Date.now() + data.expiresIn * 1000,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(stored));
  return stored;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = '/login';
}

export function getStoredUser(): StoredUser | null {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    const user = JSON.parse(raw) as StoredUser;
    if (user.expiresAt < Date.now()) {
      logout();
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

export async function refreshToken(): Promise<void> {
  const user = getStoredUser();
  if (!user) return;
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${user.refreshToken}` },
    });
    if (!response.ok) {
      logout();
      return;
    }
    const data = await response.json();
    const updated: StoredUser = {
      ...user,
      token: data.token,
      expiresAt: Date.now() + data.expiresIn * 1000,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
  } catch {
    logout();
  }
}

export function isTokenExpiringSoon(): boolean {
  const user = getStoredUser();
  if (!user) return false;
  return user.expiresAt - Date.now() < 5 * 60 * 1000;
}
