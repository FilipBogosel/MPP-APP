export type CarFormState = {
  make: string;
  model: string;
  year: string;
  vin: string;
  mileageKm: string;
};

export type FormField = {
  id: keyof CarFormState;
  label: string;
  placeholder: string;
  type?: "text" | "number";
  min?: number;
};

export const initialFormState: CarFormState = {
  make: "",
  model: "",
  year: "",
  vin: "",
  mileageKm: "",
};

export const formFields: ReadonlyArray<FormField> = [
  { id: "make", label: "Make", placeholder: "Toyota" },
  { id: "model", label: "Model", placeholder: "Camry" },
  { id: "year", label: "Year", placeholder: "2021", type: "number", min: 1900 },
  {
    id: "mileageKm",
    label: "Mileage (km)",
    placeholder: "55000",
    type: "number",
    min: 0,
  },
];
