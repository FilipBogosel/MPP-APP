import type { MaintenanceRecord } from "@/types";
import { getAuthHeaders, getGraphqlUrl, handleJsonResponse } from "./apiClient";
import { addToOfflineQueue } from "./syncService";

export async function createRecord(
  record: Omit<MaintenanceRecord, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<MaintenanceRecord> {
  if (!navigator.onLine) {
    addToOfflineQueue('POST', '/records', record);
    return { ...(record as MaintenanceRecord), id: `temp-${Date.now()}`, createdAt: '', updatedAt: '' };
  }

  const { id, userId, createdAt, updatedAt, ...inputFields } = record as any;

  const response = await fetch(getGraphqlUrl(), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      query: `mutation CreateRecord($record: MaintenanceRecordInput!) {
        createRecord(record: $record) {
          id carId serviceType serviceDate odometerKm nextServiceKm
          costUsd providerName providerLocation notes
        }
      }`,
      variables: { record: inputFields },
    }),
  });

  const payload = await handleJsonResponse<{ data: { createRecord: MaintenanceRecord } }>(response);
  return payload.data.createRecord;
}

export async function updateRecord(id: string, record: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> {
  if (!navigator.onLine) {
    addToOfflineQueue('PUT', `/records/${id}`, record);
    return { ...(record as MaintenanceRecord), id };
  }

  const { userId, createdAt, updatedAt, ...inputFields } = record as any;

  const response = await fetch(getGraphqlUrl(), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      query: `mutation UpdateRecord($id: String!, $record: MaintenanceRecordInput!) {
        updateRecord(id: $id, record: $record) {
          id carId serviceType serviceDate odometerKm nextServiceKm
          costUsd providerName providerLocation notes
        }
      }`,
      variables: { id, record: inputFields },
    }),
  });

  const payload = await handleJsonResponse<{ data: { updateRecord: MaintenanceRecord } }>(response);
  return payload.data.updateRecord;
}

export async function deleteRecord(id: string): Promise<void> {
  if (!navigator.onLine) {
    addToOfflineQueue('DELETE', `/records/${id}`);
    return;
  }

  const response = await fetch(getGraphqlUrl(), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      query: `mutation DeleteRecord($id: String!) { deleteRecord(id: $id) }`,
      variables: { id },
    }),
  });

  await handleJsonResponse<{ data: { deleteRecord: boolean } }>(response);
}
