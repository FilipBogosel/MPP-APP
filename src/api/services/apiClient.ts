import { getStoredUser, logout } from './authApi';

// When VITE_API_URL is not set (local dev with Vite proxy) this is '/api'.
// Requests like fetch('/api/records') are intercepted by the Vite dev-server
// and proxied to the real backend, so the browser never touches the self-signed
// cert directly.  When VITE_API_URL is set (LAN / production) it is absolute
// (e.g. https://192.168.100.126:8443/api) and goes straight to the backend.
const API_URL: string = import.meta.env.VITE_API_URL || '/api';

export function getAuthHeaders(): Record<string, string> {
  const user = getStoredUser();
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${user?.token ?? ''}`,
  };
}

export function getWsUrl(): string {
  if (API_URL.startsWith('http')) {
    // Absolute URL — convert scheme and strip /api suffix
    return API_URL.replace('https', 'wss').replace('http', 'ws').replace('/api', '');
  }
  // Relative URL (Vite proxy mode) — derive from current page origin
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${window.location.host}`;
}

export function getGraphqlUrl(): string {
  if (API_URL.startsWith('http')) {
    return API_URL.replace('/api', '/graphql');
  }
  return '/graphql';
}

async function getErrorMessage(response: Response): Promise<string> {
  const text = await response.text().catch(() => '');
  return text || `Request failed with status ${response.status}`;
}

function handleUnauthorized(response: Response): void {
  if (response.status === 401) {
    // Only force-navigate when there WAS a stored session that the server
    // rejected.  If there is no session at all (e.g. login page loading
    // unauthenticated API calls before the user logs in) calling logout()
    // sets window.location.href = '/login' which reloads the page and the
    // same 401 fires again — an infinite reload loop.
    if (getStoredUser()) {
      logout();
    }
    throw new Error('Session expired — please log in again');
  }
}

export async function handleJsonResponse<T>(response: Response): Promise<T> {
  handleUnauthorized(response);
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return response.json() as Promise<T>;
}

export async function handleEmptyResponse(response: Response): Promise<void> {
  handleUnauthorized(response);
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}

export { API_URL };
