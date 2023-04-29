import { useCallback, useEffect, useState } from "react";
import Select from "react-select";

export default function QuestionCard(props: {
  label: string;
  type: string;
  options?: { id: number; option: string }[];
  questionId: number;
  updateIndexCB: () => void;
  addAnswerCB: (ans: string | string[], questionId: number) => void;
}) {
  const getAllOptions = useCallback(() => {
    let options: { label: string; value: string }[] = [];
    if (props.options)
      props.options.forEach((ele) =>
        options.push({ label: ele.option, value: ele.option })
      );
    return options;
  }, [props.options]);

  useEffect(() => {
    setOptions(getAllOptions());
  }, [props.options, getAllOptions]);

  const [options, setOptions] = useState(getAllOptions);
  const [ansState, setAnsState] = useState<string | string[]>("");
  const [multiOptions, setMultiOptions] = useState<string[]>([]);

  useEffect(() => {
    setAnsState(multiOptions);
  }, [multiOptions]);

  return (
    <form
      onSubmit={(_) => {
        _.preventDefault();
        props.updateIndexCB();
      }}
    >
      <label htmlFor="answer">{props.label}</label>
      {(() => {
        if (props.type === "textarea") {
          return (
            <textarea
              name="answer"
              id="answer"
              className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
              value={ansState}
              onChange={(e) => setAnsState(e.target.value)}
            ></textarea>
          );
        } else if (props.type === "radio") {
          return (
            <div>
              {props.options?.map((option, index) => (
                <div key={index} className="mr-5 my-5 inline-block">
                  <label className="mr-2 py-2">{option.option}</label>
                  <input
                    className="bg-slate-500 text-white font-semibold"
                    key={index}
                    value={option.option}
                    type="radio"
                    name="radio"
                    onChange={(e) => setAnsState(e.target.value)}
                  />
                </div>
              ))}
            </div>
          );
        } else if (props.type === "multiple") {
          return (
            <Select
              isMulti
              name="options"
              options={options}
              className="basic-multi-select bg-[#485d74] text-black w-full"
              classNamePrefix="select"
              onChange={(option) =>
                setMultiOptions(() => option.map((ele) => ele.label))
              }
            />
          );
        } else {
          return (
            <input
              name="answer"
              id="answer"
              className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
              value={ansState}
              onChange={(e) => setAnsState(e.target.value)}
              type={props.type}
            />
          );
        }
      })()}

      <button
        onClick={(_) => {
          // multiBoolean
          //   ? props.addAnswerCB(multiOptions, props.questionId)
          props.addAnswerCB(ansState, props.questionId);
          // if (multiBoolean === true) {
          //   setMultiBoolean(false);
          //   setMultiOptions([]);
          // }
          setAnsState("");
        }}
        className="bg-amber-500 w-full hover:bg-amber-600 shadow-amber-500/40 mt-6 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
      >
        submit
      </button>
    </form>
  );
}
