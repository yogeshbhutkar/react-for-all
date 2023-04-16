import { useState } from "react";

export default function QuestionCard(props: {
  label: string;
  type: string;
  updateIndexCB: () => void;
  addAnswerCB: (ans: string) => void;
}) {
  const [ansState, setAnsState] = useState("");

  return (
    <form
      onSubmit={(_) => {
        _.preventDefault();
        props.updateIndexCB();
      }}
    >
      <label htmlFor="answer">{props.label}</label>
      <input
        name="answer"
        id="answer"
        className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
        value={ansState}
        onChange={(e) => setAnsState(e.target.value)}
        type={props.type}
      />
      <button
        onClick={(_) => {
          props.addAnswerCB(ansState);
          setAnsState("");
        }}
        className="bg-amber-500 w-full hover:bg-amber-600 shadow-amber-500/40 mt-6 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
      >
        submit
      </button>
    </form>
  );
}
