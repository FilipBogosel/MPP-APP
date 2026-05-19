import type { MaintenanceRecord } from "@/types";
import { getAuthHeaders, getGraphqlUrl, handleJsonResponse } from "./apiClient";

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
    } | null;
    errors?: Array<{ message: string }>;
  }>(response);

  // GraphQL wraps authorization and other errors in the errors array and
  // returns HTTP 200 — handleJsonResponse never sees a 4xx status, so we
  // must check payload.data manually to avoid a TypeError on null.
  if (!payload.data?.getRecordsPaginated) {
    const msg = payload.errors?.[0]?.message ?? 'Failed to load records';
    throw new Error(msg);
  }

  const { content, totalElements, totalPages } = payload.data.getRecordsPaginated;
  return { records: content, totalElements, totalPages };
}

export { createRecord, updateRecord, deleteRecord } from "./maintenanceRecordsMutations";
