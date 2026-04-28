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

export const createRecord = async (record: Omit<MaintenanceRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<MaintenanceRecord> => {
  // 1. Physically extract and discard id, createdAt, and updatedAt
  const { id, createdAt, updatedAt, ...safePayload } = record as any;

  // 2. Send the safePayload instead of the raw record
  const response = await fetch(`${API_URL}/records`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(safePayload)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create record');
  }
  return response.json();
};

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
