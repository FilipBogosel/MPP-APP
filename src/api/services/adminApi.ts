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
  loggedAt: string; 
};

export async function fetchObservationList(): Promise<ObservationEntry[]> {
  const response = await fetch(`${API_URL}/admin/observation-list`, {
    headers: getAuthHeaders(),
  });
  return handleJsonResponse<ObservationEntry[]>(response);
}

export async function fetchLogs(userId?: string, page = 0, pageSize = 50): Promise<ActionLogEntry[]> {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  if (userId) params.set('userId', userId);
  const response = await fetch(`${API_URL}/admin/logs?${params}`, { headers: getAuthHeaders() });
  return handleJsonResponse<ActionLogEntry[]>(response);
}

export async function resolveObservation(userId: string): Promise<void> {
  const response = await fetch(`${API_URL}/admin/observation-list/${encodeURIComponent(userId)}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleEmptyResponse(response);
}