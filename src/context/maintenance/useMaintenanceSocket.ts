import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { getWsUrl } from '@/api/services/apiClient';
import { getStoredUser } from '@/api/services/authApi';
import type { MaintenanceRecord } from '@/types';

type RecordsSetter = Dispatch<SetStateAction<Array<MaintenanceRecord>>>;

const RECONNECT_DELAY_MS = 3000;

export function useMaintenanceSocket(setRecords: RecordsSetter) {
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const token = getStoredUser()?.token ?? '';
    if (!token) return;

    let isMounted = true;

    function connect() {
      const socket = new WebSocket(
        `${getWsUrl()}/api/ws/records?token=${encodeURIComponent(token)}`,
      );

      socket.onopen = () => {
        console.log('WebSocket connected to records');
      };

      socket.onmessage = (event) => {
        try {
          const parsedRecord = JSON.parse(event.data as string) as MaintenanceRecord;
          if (!parsedRecord || !parsedRecord.id) return;
          if (!isMounted) return;
          setRecords((previous) => [...previous, parsedRecord]);
          window.dispatchEvent(new CustomEvent('ws:newRecord', { detail: parsedRecord }));
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      socket.onclose = (ev) => {
        console.log('WebSocket disconnected from records, code:', ev.code);
        // 1000 = normal close (we initiated it), 1008 = policy violation (bad token).
        // Reconnect for everything else (network drop, server restart, etc.).
        if (isMounted && ev.code !== 1000 && ev.code !== 1008) {
          reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY_MS);
        }
      };

      socket.onerror = () => {
        // onclose fires right after onerror; reconnect is handled there.
      };

      return socket;
    }

    const socket = connect();

    return () => {
      isMounted = false;
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      socket.close(1000, 'component unmounted');
    };
  }, [setRecords]);
}
