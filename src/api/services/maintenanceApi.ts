import { mockCars } from "@/api/mockData";
import type { Car, MaintenanceRecord } from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

function getTenantId() {
  return localStorage.getItem("tenantId") || "user-001";
}

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "X-Mock-User": getTenantId(),
  };
}

function cloneRows<T extends object>(rows: ReadonlyArray<T>): Array<T> {
  return rows.map((row) => ({ ...row }));
}

async function getErrorMessage(response: Response): Promise<string> {
  const text = await response.text().catch(() => "");
  return text || `Request failed with status ${response.status}`;
}

async function handleJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<T>;
}

async function handleEmptyResponse(response: Response): Promise<void> {
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}

export async function fetchCars(): Promise<Array<Car>> {
  // const tenantId = getTenantId();
  // const scopedCars = mockCars.filter((car) => car.userId === tenantId);
  // return cloneRows(scopedCars);
  return cloneRows(mockCars);
}

export async function fetchMaintenanceRecords(): Promise<
  Array<MaintenanceRecord>
> {
  const response = await fetch(`${API_URL}/records?size=1000`, {
    headers: getAuthHeaders(),
  });

  return handleJsonResponse<Array<MaintenanceRecord>>(response);
}

export async function createRecord(
  record: Omit<MaintenanceRecord, "id" | "createdAt" | "updatedAt">,
): Promise<MaintenanceRecord> {
  const { id, createdAt, updatedAt, ...payload } = record as any;
  const response = await fetch(`${API_URL}/records`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return handleJsonResponse<MaintenanceRecord>(response);
}

export async function updateRecord(
  id: string,
  record: Partial<MaintenanceRecord>,
): Promise<MaintenanceRecord> {
  const response = await fetch(`${API_URL}/records/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(record),
  });

  return handleJsonResponse<MaintenanceRecord>(response);
}

export async function deleteRecord(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/records/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  await handleEmptyResponse(response);
}
