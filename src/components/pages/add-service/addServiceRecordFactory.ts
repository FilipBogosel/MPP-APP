import type { AddServiceFormData, Car, MaintenanceRecord } from "@/types";

function createRecordId() {
  return crypto.randomUUID();
}

type BuildRecordInput = {
  cars: ReadonlyArray<Car>;
  formData: AddServiceFormData;
  today: string;
};

export function buildMaintenanceRecord({
  cars,
  formData,
  today,
}: BuildRecordInput): MaintenanceRecord {
  const selectedCar = cars.find((car) => car.id === formData.carId);

  return {
    id: createRecordId(),
    userId: selectedCar?.userId ?? cars[0]?.userId ?? "user-001",
    carId: formData.carId,
    serviceType: formData.serviceType as any,
    serviceDate: formData.date || today,
    odometerKm: formData.kilometers,
    nextServiceKm: formData.nextKilometers,
    costUsd: formData.cost,
    providerName: formData.shopName.trim(),
    providerLocation: formData.location.trim(),
    notes: formData.notes.trim(),
    createdAt: today,
    updatedAt: today,
  };
}
