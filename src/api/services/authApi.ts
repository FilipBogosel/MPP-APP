const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

export type StoredUser = { userId: string; username: string; role: string };

export async function login(username: string, password: string): Promise<StoredUser> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 401) {
    throw new Error('Invalid username or password');
  }

  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const data = (await response.json()) as StoredUser;
  localStorage.setItem('userId', data.userId);
  localStorage.setItem('username', data.username);
  localStorage.setItem('role', data.role);
  return data;
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

  if (response.status === 409) {
    throw new Error('Username already taken');
  }

  if (!response.ok) {
    throw new Error(`Registration failed with status ${response.status}`);
  }

  return login(username, password);
}

export function logout(): void {
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  window.location.href = '/login';
}

export function getStoredUser(): StoredUser | null {
  const userId = localStorage.getItem('userId');
  if (!userId) return null;
  return {
    userId,
    username: localStorage.getItem('username') ?? '',
    role: localStorage.getItem('role') ?? '',
  };
}
