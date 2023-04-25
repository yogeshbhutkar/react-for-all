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

export type formKinds = "text" | "dropdown" | "radio" | "textarea" | "multiple";

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
  label: string;
  options: { id: number; option: string }[];
  value: string;
};

export type formField =
  | DropdownField
  | TextField
  | radioField
  | textArea
  | multiple;

// Action types.
type RemoveAction = {
  type: "remove_field";
  id: number;
};

type AddAction = {
  type: "add_field";
  kind: formKinds;
  label: string;
};

export type FormAction = AddAction | RemoveAction;
