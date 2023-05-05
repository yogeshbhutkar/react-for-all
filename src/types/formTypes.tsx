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

// type AddAction = {
//   type: "add_field";
//   kind: formKinds;
//   label: string;
// };

export type CurrentQuestion = {
  type: "current_question";
  getQuestion: (id: number) => formField;
  getAllQuestions: () => formField[];
  setQuestionId: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};

export type UpdateQuestion = {
  type: "update_question";
  getQuestion: (id: number) => formField;
  getAllQuestions: () => formField[];
  setQuit: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestionId: React.Dispatch<React.SetStateAction<number>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};

export type UserAnswer = {
  id: number;
  questionId: number;
  answer: string | string[];
};

type AddAnswer = {
  type: "add_answer";
  id: number;
  questionId: number;
  answer: string | string[];
};

type RemoveActionForm = {
  type: "remove_field";
  id: number;
};

type AddActionForm = {
  type: "add_field";
  kind: formKinds;
  label: string;
};

type AddOption = {
  type: "add_option";
  id: number;
  str: string;
};

type RemoveOption = {
  type: "remove_option";
  id: number;
  formID: number;
};

type UpdateTitleAction = {
  type: "update_title";
  title: string;
};

type UpdateLabel = {
  type: "update_label";
  id: number;
  str: string;
};

type UpdateRadio = {
  type: "update_radio";
  id: number;
  stOption: string;
  formID: number;
};

type SaveForm = {
  type: "save_form";
};

export type FormActionForBuilder =
  | AddActionForm
  | RemoveActionForm
  | UpdateTitleAction
  | AddOption
  | RemoveOption
  | UpdateLabel
  | UpdateRadio
  | SaveForm;

export type AddAction = AddAnswer;

export type FormAction = AddAction | RemoveAction;
