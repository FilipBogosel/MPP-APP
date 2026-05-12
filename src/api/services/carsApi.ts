import type { Car } from "@/types";
import {
  API_URL,
  getAuthHeaders,
  handleEmptyResponse,
  handleJsonResponse,
} from "./apiClient";

export async function fetchCars(): Promise<Array<Car>> {
  const response = await fetch(`${API_URL}/cars`, {
    headers: getAuthHeaders(),
  });

  return handleJsonResponse<Array<Car>>(response);
}

export async function createCar(car: Omit<Car, "id" | "userId">): Promise<Car> {
  const response = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(car),
  });

  return handleJsonResponse<Car>(response);
}

export async function deleteCar(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  await handleEmptyResponse(response);
}
