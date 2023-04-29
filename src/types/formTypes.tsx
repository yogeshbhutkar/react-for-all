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
  | "multi-select"
  | "multiple";

export type formKinds =
  | "text"
  | "dropdown"
  | "radio"
  | "textarea"
  | "multiple"
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
  label: string;
  options: { id: number; option: string }[];
  value: string;
};

type multi_select = {
  kind: "multi-select";
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
  | multiple
  | multi_select;

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

export type UserAnswer = {
  id: number;
  questionId: number;
  answer: string | string[];
};

export type FormAction = AddAction | RemoveAction;
