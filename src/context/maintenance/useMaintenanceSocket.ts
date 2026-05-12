import { useEffect, type Dispatch, type SetStateAction } from "react";
import { API_URL } from "@/api/services/apiClient";
import type { MaintenanceRecord } from "@/types";

const WS_URL = API_URL.replace("http", "ws") + "/ws/records";

type RecordsSetter = Dispatch<SetStateAction<Array<MaintenanceRecord>>>;

export function useMaintenanceSocket(setRecords: RecordsSetter) {
  useEffect(() => {
    let isMounted = true;
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connected to:", WS_URL);
    };

    socket.onmessage = (event) => {
      try {
        const parsedRecord = JSON.parse(event.data) as MaintenanceRecord;
        if (!parsedRecord || !parsedRecord.id) return;
        if (!isMounted) return;
        setRecords((previous) => [...previous, parsedRecord]);
        window.dispatchEvent(new CustomEvent('ws:newRecord', { detail: parsedRecord }));
        console.log("Received real-time update:", parsedRecord);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected from:", WS_URL);
    };

    socket.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    return () => {
      isMounted = false;
      socket.close();
    };
  }, [setRecords]);
}
