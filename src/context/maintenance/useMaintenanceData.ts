import { useEffect, useState } from "react";
import { API_URL, getAuthHeaders } from "@/api/services/apiClient";
import { fetchCars } from "@/api/services/carsApi";
import { fetchRecordsPage } from "@/api/services/maintenanceRecordsApi";
import { clearOfflineQueue, getOfflineQueue } from "@/api/services/syncService";
import type { Car, MaintenanceRecord } from "@/types";

export function useMaintenanceData() {
  const [records, setRecords] = useState<Array<MaintenanceRecord>>([]);
  const [cars, setCars] = useState<Array<Car>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const syncOfflineData = async () => {
      const offlineQueue = getOfflineQueue();

      if (offlineQueue.length === 0) {
        return;
      }

      for (const action of offlineQueue) {
        const requestBody =
          action.method === "DELETE"
            ? undefined
            : action.method === "POST"
              ? (() => {
                  const { id, createdAt, updatedAt, ...payload } =
                    action.payload as any;
                  return JSON.stringify(payload);
                })()
              : JSON.stringify(action.payload);

        const response = await fetch(`${API_URL}${action.endpoint}`, {
          method: action.method,
          headers: getAuthHeaders(),
          body: requestBody,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to sync queued action ${action.method} ${action.endpoint}`,
          );
        }
      }

      clearOfflineQueue();

      const { records: refreshedRecords } = await fetchRecordsPage(1, 1000);

      if (!isMounted) return;
      setRecords(refreshedRecords);
    };

    const load = async () => {
      let nextRecords: Array<MaintenanceRecord> = [];
      let nextCars: Array<Car> = [];

      try {
        const [recordsPage, fetchedCars] = await Promise.all([
          fetchRecordsPage(1, 1000),
          fetchCars(),
        ]);
        nextRecords = recordsPage.records;
        nextCars = fetchedCars;
      } catch (error) {
        console.error("Failed to load data", error);
      }

      if (!isMounted) return;
      setRecords(nextRecords);
      setCars(nextCars);
      setIsLoading(false);
    };

    void load();
    window.addEventListener("online", syncOfflineData);

    return () => {
      isMounted = false;
      window.removeEventListener("online", syncOfflineData);
    };
  }, []);

  return { records, setRecords, cars, setCars, isLoading };
}
