import { API_URL, getAuthHeaders, handleJsonResponse, handleEmptyResponse } from './apiClient';

export type ObservationEntry = {
  id: string;
  userId: string;
  reason: string;
  detectedAt: string;
  resolved: boolean;
};

export type ActionLogEntry = {
  id: string;
  userId: string;
  userRole: string;
  action: string;
  entityType: string;
  entityId: string | null;
  httpStatus: number;
  timestamp: string;
};

export async function fetchObservationList(): Promise<ObservationEntry[]> {
  const response = await fetch(`${API_URL}/admin/observation-list`, {
    headers: getAuthHeaders(),
  });
  return handleJsonResponse<ObservationEntry[]>(response);
}

export async function fetchLogs(userId?: string): Promise<ActionLogEntry[]> {
  const url = userId
    ? `${API_URL}/admin/logs?userId=${encodeURIComponent(userId)}`
    : `${API_URL}/admin/logs`;
  const response = await fetch(url, { headers: getAuthHeaders() });
  return handleJsonResponse<ActionLogEntry[]>(response);
}

export async function resolveObservation(userId: string): Promise<void> {
  const response = await fetch(`${API_URL}/admin/observation-list/${encodeURIComponent(userId)}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleEmptyResponse(response);
}
