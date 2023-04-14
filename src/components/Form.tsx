import { useEffect, useRef, useState } from "react";
import LabeledInputs from "./LabeledInputs";
import { getLocalForms } from "../App";
import AllForms from "./AllForms";

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const formFields: formField[] = [
  {
    id: Math.random() * 10000000,
    label: "First Name",
    type: "text",
    value: "",
  },
  { id: Math.random() * 10000000, label: "Last Name", type: "text", value: "" },
  { id: Math.random() * 10000000, label: "Email", type: "email", value: "" },
  {
    id: Math.random() * 10000000,
    label: "Date of Birth",
    type: "date",
    value: "",
  },
  {
    id: Math.random() * 10000000,
    label: "Phone Number",
    type: "tel",
    value: "",
  },
];

export default function Form(props: { closeFormCB: () => void }) {
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
  const saveLocalForms = (localForms: formData[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
  };

  const saveData = (currentState: formData) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.map((form) =>
      form.id === currentState.id ? currentState : form
    );
    saveLocalForms(updatedLocalForms);
  };

  const initialState: () => formData[] = () => {
    const localForms = getLocalForms();
    if (localForms.length > 0) {
      return localForms;
    }

    //dummy form to prevent null.
    const newForm = {
      id: -1,
      title: "Untitled Form",
      formFields: formFields,
    };
    saveLocalForms([...localForms, newForm]);
    return getLocalForms();
  };

  const clearForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((ele) => {
        return {
          ...ele,
          value: "",
        };
      }),
    });
  };

  const updateForm = (id: number, str: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            value: str,
          };
        } else {
          return ele;
        }
      }),
    });
  };

  // After choosing a particular form from the list, its content would be loaded here.
  const getFormData = (id: number) => {
    const allForms = getLocalForms();
    const formData = allForms.find((ele) => ele.id === id);
    if (formData) {
      setState(formData);
    }
  };

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: "text",
          value: "",
        },
      ],
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const saveForm = () => {
    //Updating the ID
    let curState = state;
    curState.id = Number(new Date());
    setState(curState);

    //setting display and state
    const prev_data = getLocalForms();
    saveLocalForms([...prev_data, state]);
    console.log(getLocalForms());
    setDisplay((prevState) => !prevState);
    setState(initialState()[0]);
  };

  const toggleDisplay = () => {
    setDisplay((prevState) => !prevState);
    setState({
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: formFields,
    });
  };

  //State variables

  //Contains the current form data
  const [state, setState] = useState(() => initialState()[0]);

  //Display either the form or the list
  const [displayAllForms, setDisplay] = useState(true);

  //Data corresponding to the fields
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveData(state);
      console.log("Data saved to local storage");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  return (
    <>
      {displayAllForms ? (
        <AllForms
          getLocalFormCB={getLocalForms}
          toggleDisplayCB={toggleDisplay}
          saveFormCB={saveForm}
          getFormDataCB={getFormData}
        />
      ) : (
        <div className="flex flex-col gap-2 p-4 divide-y divide-slate-500 divide-dotted">
          <input
            type="text"
            className="border-2 border-gray-200 text-black rounded-lg p-2 my-2 flex-1"
            value={state.title}
            onChange={(e) => {
              setState({ ...state, title: e.target.value });
            }}
            ref={titleRef}
          />
          <div>
            {state.formFields.map((field) => (
              <LabeledInputs
                id={field.id}
                key={field.id}
                label={field.label}
                type={field.type}
                value={field.value}
                removeFieldCB={removeField}
                updateFormCB={updateForm}
              />
            ))}
          </div>
          <div className="flex gap-2 p-2">
            <input
              type="text"
              className="border-2 border-gray-200 rounded-lg text-black p-2 my-2 flex-1"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
            />
            <button
              onClick={addField}
              className="px-5 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
            >
              Add Field
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={(_) => saveData(state)}
              className="bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
            >
              Save
            </button>
            <button
              onClick={saveForm}
              className="bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
            >
              Add Form
            </button>
            <button
              onClick={props.closeFormCB}
              className="px-5 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white py-2 rounded-xl font-semibold"
            >
              Close Form
            </button>
            <button
              onClick={clearForm}
              className="px-5 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white py-2 rounded-xl font-semibold"
            >
              Clear Form
            </button>
          </div>
        </div>
      )}
    </>
  );
}
