import type { MaintenanceRecord } from "@/types";
import {
  API_URL,
  getAuthHeaders,
  getGraphqlUrl,
  handleEmptyResponse,
  handleJsonResponse,
} from "./apiClient";
import { addToOfflineQueue } from "./syncService";

const RECORD_FIELDS = `
  id
  carId
  serviceType
  serviceDate
  odometerKm
  nextServiceKm
  costUsd
  providerName
  providerLocation
  notes
`;

export async function fetchRecordsPage(
  page: number,
  size: number,
): Promise<{ records: Array<MaintenanceRecord>; totalElements: number; totalPages: number }> {
  const response = await fetch(getGraphqlUrl(), {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      query: `query GetRecords($page: Int!, $size: Int!) {
        getRecordsPaginated(page: $page, size: $size) {
          content { ${RECORD_FIELDS} }
          totalElements
          totalPages
        }
      }`,
      variables: { page, size },
    }),
  });

  const payload = await handleJsonResponse<{
    data: {
      getRecordsPaginated: {
        content: Array<MaintenanceRecord>;
        totalElements: number;
        totalPages: number;
      };
    };
  }>(response);

  const { content, totalElements, totalPages } = payload.data.getRecordsPaginated;
  return { records: content, totalElements, totalPages };
}

// maintenanceRecordsApi.ts — createRecord
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

// updateRecord
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

// deleteRecord
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