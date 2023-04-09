import { useState } from "react";
import LabeledInputs from "./LabeledInputs";

const formFields = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
  { id: 5, label: "Phone Number", type: "tel", value: "" },
];

export default function Form(props: { closeFormCB: () => void }) {
  const clearForm = () => {
    setState(
      state.map((ele) => {
        return {
          ...ele,
          value: "",
        };
      })
    );
  };

  const updateForm = (id: number, str: string) => {
    setState(
      state.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            value: str,
          };
        } else {
          return ele;
        }
      })
    );
  };

  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");
  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
        value: "",
      },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 p-4 divide-y divide-slate-500 divide-dotted">
      <div>
        {state.map((field) => (
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
        <button className="bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold">
          Submit
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
  );
}
