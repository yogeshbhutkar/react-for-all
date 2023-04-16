import { useEffect, useRef, useState } from "react";
import LabeledInputs from "./LabeledInputs";
import { getLocalForms } from "../App";
import { saveLocalForms } from "../App";
import { navigate } from "raviger";

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

export interface formField {
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

export default function Form(props: { formId: number }) {
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

  // const clearForm = () => {
  //   setState({
  //     ...state,
  //     formFields: state.formFields.map((ele) => {
  //       return {
  //         ...ele,
  //         value: "",
  //       };
  //     }),
  //   });
  // };

  const updateForm = (id: number, str: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            label: str,
          };
        } else {
          return ele;
        }
      }),
    });
  };

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: type,
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
    setState(initialState()[0]);
    navigate("/");
  };

  //State variables

  //Contains the current form data
  const [state, setState] = useState(() => formData());

  //Data corresponding to the fields
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("text");

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
          className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
        />
        <select
          onChange={(e) => {
            setType(e.target.value);
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
        </select>
        <button
          onClick={addField}
          className="px-5 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
        >
          Add Field
        </button>
      </div>
      <div className="flex gap-4">
        {/* <button
          onClick={(_) => saveData(state)}
          className="bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
        >
          Save
        </button> */}

        <button
          onClick={saveForm}
          className="bg-amber-500 w-full hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
        >
          Add Form
        </button>
      </div>
    </div>
  );
}
