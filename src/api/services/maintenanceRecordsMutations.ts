import type { MaintenanceRecord } from "@/types";
import { getAuthHeaders, getGraphqlUrl, handleJsonResponse } from "./apiClient";
import { addToOfflineQueue } from "./syncService";

type GqlResponse<T> = { data: T | null; errors?: Array<{ message: string }> };

function assertGqlData<T>(payload: GqlResponse<T>, field: string): T {
  if (!payload.data) {
    const msg = payload.errors?.[0]?.message ?? `GraphQL ${field} returned no data`;
    throw new Error(msg);
  }
  return payload.data;
}

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

  const payload = await handleJsonResponse<GqlResponse<{ createRecord: MaintenanceRecord }>>(response);
  return assertGqlData(payload, 'createRecord').createRecord;
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

  const payload = await handleJsonResponse<GqlResponse<{ updateRecord: MaintenanceRecord }>>(response);
  return assertGqlData(payload, 'updateRecord').updateRecord;
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

  const payload = await handleJsonResponse<GqlResponse<{ deleteRecord: boolean }>>(response);
  assertGqlData(payload, 'deleteRecord');
}
