const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

export function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-User-Id": localStorage.getItem("userId") ?? "user-001",
  };
}

async function getErrorMessage(response: Response): Promise<string> {
  const text = await response.text().catch(() => "");
  return text || `Request failed with status ${response.status}`;
}

export async function handleJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<T>;
}

export async function handleEmptyResponse(response: Response): Promise<void> {
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}

export function getGraphqlUrl(): string {
  return API_URL.replace("/api", "/graphql");
}

export { API_URL };
