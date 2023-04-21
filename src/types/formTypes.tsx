export type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type textFieldTypes =
  | "text"
  | "email"
  | "date"
  | "tel"
  | "dropdown"
  | "radio"
  | "textarea"
  | "multi-select";

type TextField = {
  kind: "text";
  id: number;
  label: string;
  type: textFieldTypes;
  value: string;
};

export type DropdownField = {
  kind: "dropdown";
  id: number;
  label: string;
  options: { id: number; option: string }[];
  value: string;
};

export type radioField = {
  kind: "radio";
  id: number;
  label: string;
  options: { id: number; option: string }[];
  value: string;
};

type textArea = {
  kind: "textarea";
  id: number;
  label: string;
  value: string;
};

type multiple = {
  kind: "multiple";
  id: number;
  options: { id: number; option: string }[];
  label: string;
  value: string;
};

export type formField =
  | DropdownField
  | TextField
  | radioField
  | textArea
  | multiple;
