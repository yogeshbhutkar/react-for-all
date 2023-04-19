import { useState } from "react";

function LabeledRadio(props: {
  id: number;
  label: string;
  value: string;
  options: string[];
  option: string;
  removeFieldCB: (id: number) => void;
  setOptionCB: (param: string) => void;
  addOptionCB: (id: number, str: string) => void;
}) {
  const [option, setOption] = useState("");

  return (
    <div key={props.id}>
      <div className="flex mb-2">
        <p className="inline my-2">{props.label}</p>
        <button
          onClick={(_) => props.removeFieldCB(props.id)}
          className="px-3 inline text-amber-500 hover:text-amber-600  py-2 rounded-xl font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>

      <div className="block mb-4">
        {props.options.map((option, index) => (
          <div key={index} className="mr-5 inline-block">
            <label className="mr-2 py-2">{option}</label>
            <input
              className="bg-slate-500 text-white font-semibold"
              key={index}
              value={option}
              type="radio"
            />
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={option}
          className="border-1 flex-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 "
          onChange={(e) => {
            setOption(e.target.value);
          }}
        />
        <button
          onClick={() => {
            props.addOptionCB(props.id, option);
            setOption("");
          }}
          className="px-5 mx-2 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
        >
          Add option
        </button>
      </div>
    </div>
  );
}

export default LabeledRadio;
