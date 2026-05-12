import type { Dispatch, SetStateAction } from "react";
import type { Car, MaintenanceRecord } from "@/types";
import {
  createCar as createCarApi,
  deleteCar as deleteCarApi,
} from "@/api/services/carsApi";
import {
  createRecord as createRecordApi,
  deleteRecord as deleteRecordApi,
  updateRecord as updateRecordApi,
} from "@/api/services/maintenanceRecordsApi";

type ActionsArgs = {
  setRecords: Dispatch<SetStateAction<Array<MaintenanceRecord>>>;
  setCars: Dispatch<SetStateAction<Array<Car>>>;
};

export function useMaintenanceActions({ setRecords, setCars }: ActionsArgs) {
  const addRecord = async (record: MaintenanceRecord) => {
    const savedRecord = await createRecordApi(record);
    setRecords((previous) => [...previous, savedRecord]);
  };

  const updateRecord = async (
    id: string,
    record: Partial<MaintenanceRecord>,
  ) => {
    const savedRecord = await updateRecordApi(id, record);
    setRecords((previous) =>
      previous.map((existingRecord) =>
        existingRecord.id === id
          ? { ...existingRecord, ...savedRecord }
          : existingRecord,
      ),
    );
  };

  const deleteRecord = async (id: string) => {
    await deleteRecordApi(id);
    setRecords((previous) => previous.filter((record) => record.id !== id));
  };

  const addCar = async (car: Omit<Car, "id" | "userId">) => {
    const savedCar = await createCarApi(car);
    setCars((previous) => [...previous, savedCar]);
  };

  const removeCar = async (id: string) => {
    await deleteCarApi(id);
    setCars((previous) => previous.filter((car) => car.id !== id));
  };

  return { addRecord, updateRecord, deleteRecord, addCar, removeCar };
}
