import { formFields } from "../components/Form";
import {
  AddAction,
  CurrentQuestion,
  FormActionForBuilder,
  UpdateQuestion,
  UserAnswer,
  formData,
  formField,
  formKinds,
  radioField,
} from "../types/formTypes";

export const reducer: (
  state: UserAnswer[],
  action: AddAction
) => UserAnswer[] = (state: UserAnswer[], action: AddAction) => {
  switch (action.type) {
    case "add_answer": {
      const newState = [
        ...state,
        {
          id: action.id,
          questionId: action.questionId,
          answer: action.answer,
        },
      ];
      return newState;
    }
  }
};

export const questionReducer: (
  state: formField,
  action: CurrentQuestion | UpdateQuestion
) => formField = (
  state: formField,
  action: CurrentQuestion | UpdateQuestion
) => {
  switch (action.type) {
    case "current_question": {
      const newState = action.getQuestion(action.index);
      action.setQuestionId(action.getQuestion(action.index).id);
      return newState;
    }

    case "update_question": {
      if (action.index === action.getAllQuestions().length - 1) {
        action.setQuit(true);
        return action.getQuestion(action.index);
      }
      action.setIndex((idx) => idx + 1);
      return action.getQuestion(action.index);
    }
  }
};

const getNewField = (formKind: formKinds, formLabel: string) => {
  const textType: formKinds = "text";
  const multiSelect: formKinds = "multiple";
  switch (formKind) {
    case "dropdown":
      return {
        kind: formKind,
        id: Number(new Date()),
        label: formLabel,
        options: [],
        value: "",
      };

    case "radio":
      return {
        kind: formKind,
        id: Number(new Date()),
        label: formLabel,
        options: [],
        value: "",
      };

    case "multi-select": {
      return {
        kind: multiSelect,
        id: Number(new Date()),
        label: formLabel,
        options: [],
        value: "",
      };
    }

    case "text": {
      return {
        kind: formKind,
        id: Number(new Date()),
        label: formLabel,
        type: formKind,
        value: "",
      };
    }

    case "textarea": {
      return {
        kind: formKind,
        id: Number(new Date()),
        label: formLabel,
        value: "",
      };
    }

    default: {
      console.log("default");
      return {
        kind: textType,
        id: Number(new Date()),
        label: formLabel,
        type: formKind,
        value: "",
      };
    }
  }
};

const getAllOptions = (
  oldOptions: { id: number; option: string }[],
  option: string
) => {
  return [...oldOptions, { id: Number(new Date()), option: option }];
};

export const reducerForm: (
  state: formData,
  action: FormActionForBuilder
) => formData = (state: formData, action: FormActionForBuilder) => {
  switch (action.type) {
    case "add_field": {
      console.log(action.kind + "kind");
      let newField;
      if (action.kind === "multi-select") {
        newField = getNewField("multi-select", action.label);
      } else {
        newField = getNewField(action.kind, action.label);
      }
      console.log(newField);
      if (newField.label.length > 0)
        return {
          ...state,
          formFields: [...state.formFields, newField],
        };
      return state;
    }
    case "remove_field": {
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };
    }
    case "update_title": {
      return {
        ...state,
        title: action.title,
      };
    }
    case "add_option": {
      let prevState = state.formFields.find((ele) => ele.id === action.id);
      let oldOption: { id: number; option: string }[] = [];
      if (prevState && "options" in prevState) {
        oldOption = [...prevState.options];
      }
      const allOptions = getAllOptions(oldOption, action.str);
      return {
        ...state,
        formFields: state.formFields.map((ele) => {
          if (
            ele.id === action.id &&
            (ele.kind === "dropdown" ||
              ele.kind === "radio" ||
              ele.kind === "multiple")
          ) {
            return {
              ...ele,
              options: allOptions,
            };
          } else {
            return ele;
          }
        }),
      };
    }
    case "remove_option": {
      const formfields = state.formFields.filter(
        (field) => field.id === action.formID
      )[0] as radioField;

      return {
        ...state,
        formFields: state.formFields.map((ele) => {
          if (
            ele.id === action.formID &&
            (ele.kind === "dropdown" ||
              ele.kind === "radio" ||
              ele.kind === "multiple")
          ) {
            return {
              ...ele,
              options: formfields.options.filter((ele) => ele.id !== action.id),
            };
          } else {
            return ele;
          }
        }),
      };
    }
    case "update_label": {
      return {
        ...state,
        formFields: state.formFields.map((ele) => {
          if (ele.id === action.id) {
            return {
              ...ele,
              label: action.str,
            };
          } else {
            return ele;
          }
        }),
      };
    }
    case "update_radio": {
      const formfields = state.formFields.filter(
        (field) => field.id === action.formID
      )[0] as radioField;

      return {
        ...state,
        formFields: state.formFields.map((ele) => {
          if (
            ele.id === action.formID &&
            (ele.kind === "dropdown" ||
              ele.kind === "radio" ||
              ele.kind === "multiple")
          ) {
            return {
              ...ele,
              options: formfields.options.map((ele) => {
                if (ele.id === action.id) {
                  return {
                    ...ele,
                    option: action.stOption,
                  };
                } else {
                  return ele;
                }
              }),
            };
          } else {
            return ele;
          }
        }),
      };
    }

    default: {
      return {
        ...state,
        formFields,
      };
    }
  }
};
