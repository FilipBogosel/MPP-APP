import { useEffect, useRef } from 'react';
import { logout, isTokenExpiringSoon, refreshToken } from '@/api/services/authApi';

export function useIdleTimer(idleMinutes = 15) {
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    const updateActivity = () => {
      lastActivity.current = Date.now();
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, updateActivity));

    const interval = setInterval(() => {
      if (Date.now() - lastActivity.current > idleMinutes * 60 * 1000) {
        logout();
        return;
      }
      if (isTokenExpiringSoon()) {
        refreshToken().catch(() => logout());
      }
    }, 60_000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, updateActivity));
      clearInterval(interval);
    };
  }, [idleMinutes]);
}
