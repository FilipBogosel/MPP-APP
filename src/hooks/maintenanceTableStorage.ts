const COOKIE_MAX_AGE_SECONDS = 31536000;

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookiePrefix = `${name}=`;
  const cookies = document.cookie ? document.cookie.split(';') : [];

  for (const cookie of cookies) {
    const normalizedCookie = cookie.trim();
    if (normalizedCookie.startsWith(cookiePrefix)) {
      return decodeURIComponent(normalizedCookie.slice(cookiePrefix.length));
    }
  }

  return null;
}

export function setCookieValue(name: string, value: string) {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}`;
}

export function getInitialViewMode() {
  return getCookieValue('viewMode') === 'card' ? 'card' : 'table';
}

export function getInitialDateOrder() {
  return getCookieValue('dateOrder') === 'asc' ? 'asc' : 'desc';
}
