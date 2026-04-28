import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router";

import { validateAddServiceFormData } from "@/components/pages/add-service/addServiceValidation";
import { useMaintenanceContext } from "@/context/MaintenanceRecordsContext";
import type { AddServiceFormData, ServiceRecordFormData } from "@/types";
import {
  buildUpdatedRecord,
  mapFormToValidationInput,
  mapRecordToFormData,
  mapValidationErrors,
  type ServiceFormErrors,
} from "./serviceDetailFormUtils";

type UseServiceDetailControllerResult = {
  carOptions: ReturnType<typeof useMaintenanceContext>["carOptions"];
  formData: ServiceRecordFormData | null;
  hasChanges: boolean;
  isMissingRecord: boolean;
  onDelete: () => Promise<void>;
  onFieldChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onUpdate: () => Promise<void>;
  validationErrors: ServiceFormErrors;
};

export function useServiceDetailController(
  recordId?: string,
): UseServiceDetailControllerResult {
  const navigate = useNavigate();
  const { cars, carOptions, records, updateRecord, deleteRecord } =
    useMaintenanceContext();
  const selectedRecord = useMemo(
    () => records.find((record) => record.id === recordId),
    [recordId, records],
  );
  const initialData = useMemo<ServiceRecordFormData | null>(
    () => (selectedRecord ? mapRecordToFormData(selectedRecord) : null),
    [selectedRecord],
  );

  const [formData, setFormData] = useState<ServiceRecordFormData | null>(
    initialData,
  );
  const [validationErrors, setValidationErrors] = useState<ServiceFormErrors>(
    {},
  );

  useEffect(() => {
    setFormData(initialData);
    setValidationErrors({});
  }, [initialData]);

  const hasChanges = useMemo(
    () =>
      initialData !== null &&
      formData !== null &&
      JSON.stringify(formData) !== JSON.stringify(initialData),
    [formData, initialData],
  );

  const onFieldChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const fieldName = event.target.name as keyof AddServiceFormData;

    setFormData((previous) => {
      if (!previous) return previous;
      return { ...previous, [fieldName]: event.target.value };
    });

    setValidationErrors((previous) => {
      if (!previous[fieldName]) return previous;
      const { [fieldName]: _ignored, ...rest } = previous;
      return rest;
    });
  };

  const onUpdate = async () => {
    if (!selectedRecord || !recordId || !formData || !hasChanges) return;

    const validationInput = mapFormToValidationInput(formData);
    const validationResult = validateAddServiceFormData(validationInput);

    if (!validationResult.success) {
      setValidationErrors(
        mapValidationErrors(validationResult.error.flatten().fieldErrors),
      );
      return;
    }

    setValidationErrors({});
    await updateRecord(
      recordId,
      buildUpdatedRecord({ cars, formData, selectedRecord }),
    );
    navigate("/dashboard/records");
  };

  const onDelete = async () => {
    if (!recordId) return;
    if (!window.confirm("Are you sure you want to delete this service record?"))
      return;

    await deleteRecord(recordId);
    navigate("/dashboard/records");
  };

  return {
    carOptions,
    formData,
    hasChanges,
    isMissingRecord: !selectedRecord || !formData,
    onDelete,
    onFieldChange,
    onUpdate,
    validationErrors,
  };
}
