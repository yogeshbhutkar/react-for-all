import { useEffect, useReducer, useRef, useState } from "react";
import LabeledInputs from "./LabeledInputs";
import { getLocalForms } from "../App";
import { saveLocalForms } from "../App";
import { navigate } from "raviger";
import {
  formField,
  formData,
  textFieldTypes,
  formKinds,
} from "../types/formTypes";
import LabeledDropdown from "./LabeledDropdown";
import LabeledRadio from "./LabeledRadio";
import LabeledMultiSelect from "./LabeledMultiSelect";
import { reducerForm } from "../reducer/reducers";

export const formFields: formField[] = [
  {
    kind: "text",
    id: 1,
    label: "First Name",
    type: "text",
    value: "",
  },
  {
    kind: "text",
    id: 2,
    label: "Last Name",
    type: "text",
    value: "",
  },
  {
    kind: "text",
    id: 3,
    label: "Email",
    type: "email",
    value: "",
  },
  {
    kind: "text",
    id: 4,
    label: "Date of Birth",
    type: "date",
    value: "",
  },
  {
    kind: "text",
    id: 5,
    label: "Phone Number",
    type: "tel",
    value: "",
  },
];

export default function Form(props: { formId: number }) {
  //Reducer.

  const saveForm = () => {
    const prev_data = getLocalForms();
    state.id = Number(new Date());
    saveLocalForms([...prev_data, state]);
    navigate("/");
  };

  //Use effects
  useEffect(() => {
    console.log("Mounting the component");
    const oldTitle = document.title;
    document.title = "Form Edit";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  //Function declarations

  const saveData = (currentState: formData) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.map((form) =>
      form.id === currentState.id ? currentState : form
    );
    saveLocalForms(updatedLocalForms);
  };

  const formData: () => formData = () => {
    const arr = getLocalForms().find((ele) => ele.id === props.formId);
    if (arr) {
      return arr;
    }
    const newForm = {
      id: -1,
      title: "Untitled Form",
      formFields: formFields,
    };
    return newForm;
  };

  //State variables

  //Contains the current form data
  const [state, dispatch] = useReducer(reducerForm, null, () => formData());

  //Data corresponding to the fields
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<textFieldTypes>("text");
  const [option, setOption] = useState("");

  const [renderAddForm, setRenderAddForm] = useState<boolean>();

  useEffect(() => {
    if (props.formId === -1) {
      setRenderAddForm(true);
    } else {
      setRenderAddForm(false);
    }
  }, [props.formId]);

  useEffect(() => {
    state.id !== props.formId && navigate(`/forms/${state.id}`);
  }, [state.id, props.formId]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveData(state);
      console.log("Data saved to local storage");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  useEffect(() => {
    console.log(type);
  }, [type]);

  return (
    <div className="flex flex-col gap-2 p-4 divide-y divide-slate-500 divide-dotted">
      <input
        type="text"
        className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
        value={state.title}
        onChange={(e) => {
          dispatch({ type: "update_title", title: e.target.value });
        }}
        ref={titleRef}
      />
      <div>
        {state.formFields.map((field) => {
          switch (field.kind) {
            case "text":
              return (
                <LabeledInputs
                  id={field.id}
                  key={field.id}
                  label={field.label}
                  type={field.type}
                  value={field.value}
                  removeFieldCB={(id) =>
                    dispatch({ type: "remove_field", id: id })
                  }
                  updateFormCB={(id, str) =>
                    dispatch({ type: "update_label", id, str })
                  }
                />
              );
            case "dropdown":
              return (
                <LabeledDropdown
                  id={field.id}
                  key={field.id}
                  label={field.label}
                  value={field.value}
                  options={field.options}
                  removeFieldCB={(id) =>
                    dispatch({ type: "remove_field", id: id })
                  }
                  addOptionCB={(id, str) =>
                    dispatch({
                      type: "add_option",
                      id,
                      str,
                    })
                  }
                  removeElementCB={(id, formID) =>
                    dispatch({
                      type: "remove_option",
                      id,
                      formID,
                    })
                  }
                  updateRadioOptionCB={(id, stOption, formID) =>
                    dispatch({ type: "update_radio", id, stOption, formID })
                  }
                />
              );
            case "radio":
              return (
                <LabeledRadio
                  id={field.id}
                  key={field.id}
                  label={field.label}
                  value={field.value}
                  options={field.options}
                  removeFieldCB={(id) =>
                    dispatch({ type: "remove_field", id: id })
                  }
                  option={option}
                  setOptionCB={setOption}
                  addOptionCB={(id, str) =>
                    dispatch({
                      type: "add_option",
                      id,
                      str,
                    })
                  }
                  removeElementCB={(id, formID) =>
                    dispatch({
                      type: "remove_option",
                      id,
                      formID,
                    })
                  }
                  updateRadioOptionCB={(id, stOption, formID) =>
                    dispatch({ type: "update_radio", id, stOption, formID })
                  }
                />
              );
            case "textarea":
              return (
                <LabeledInputs
                  id={field.id}
                  key={field.id}
                  label={field.label}
                  value={field.value}
                  type="textarea"
                  removeFieldCB={(id) =>
                    dispatch({ type: "remove_field", id: id })
                  }
                  updateFormCB={(id, str) =>
                    dispatch({ type: "update_label", id, str })
                  }
                />
              );
            case "multiple":
              return (
                <LabeledMultiSelect
                  id={field.id}
                  key={field.id}
                  label={field.label}
                  value={field.value}
                  options={field.options}
                  removeFieldCB={(id) =>
                    dispatch({ type: "remove_field", id: id })
                  }
                  addOptionCB={(id, str) =>
                    dispatch({
                      type: "add_option",
                      id,
                      str,
                    })
                  }
                  removeElementCB={(id, formID) =>
                    dispatch({
                      type: "remove_option",
                      id,
                      formID,
                    })
                  }
                  updateRadioOptionCB={(id, stOption, formID) =>
                    dispatch({ type: "update_radio", id, stOption, formID })
                  }
                />
              );
            default:
              return <div key={field.id}></div>;
          }
        })}
      </div>
      <div className="flex gap-2 p-2">
        <input
          type="text"
          className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
        />
        <select
          onChange={(e) => {
            setType(e.target.value as textFieldTypes);
          }}
          name="type"
          id="type"
          className="px-3 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
        >
          <option
            value="text"
            className="bg-slate-500 text-white font-semibold"
          >
            text
          </option>
          <option value="tel" className="bg-slate-500 text-white font-semibold">
            tel
          </option>
          <option
            value="email"
            className="bg-slate-500 text-white font-semibold"
          >
            email
          </option>
          <option
            value="number"
            className="bg-slate-500 text-white font-semibold"
          >
            number
          </option>
          <option
            value="date"
            className="bg-slate-500 text-white font-semibold"
          >
            date
          </option>
          <option
            value="dropdown"
            className="bg-slate-500 text-white font-semibold"
          >
            dropdown
          </option>
          <option
            value="radio"
            className="bg-slate-500 text-white font-semibold"
          >
            radio
          </option>
          <option
            value="textarea"
            className="bg-slate-500 text-white font-semibold"
          >
            textarea
          </option>
          <option
            value="multi-select"
            className="bg-slate-500 text-white font-semibold"
          >
            multi-select
          </option>
        </select>
        <button
          onClick={(_) => {
            dispatch({
              type: "add_field",
              label: newField,
              kind: type as formKinds,
            });
            setNewField("");
          }}
          className="px-5 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
        >
          Add Field
        </button>
      </div>
      {renderAddForm ? (
        <div className="flex gap-4">
          <button
            onClick={saveForm}
            className="bg-amber-500 w-full hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
          >
            Add Form
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
