import { useCallback, useEffect, useState } from "react";
import { getLocalForms } from "../App";
import { DropdownField, formField } from "../types/formTypes";
import QuestionCard from "./QuestionCard";
import { navigate } from "raviger";

export default function Preview(props: { previewId: Number }) {
  const getAllQuestions: () => formField[] = useCallback(() => {
    const form = getLocalForms().filter((ele) => ele.id === props.previewId);
    return form[0].formFields;
  }, [props.previewId]);

  const updateIndex = () => {
    // console.log(index);
    if (index === getAllQuestions().length - 1) {
      setQuit(true);
      return;
    }
    setIndex((idx) => idx + 1);
    // console.log("new index" + index);
  };

  const addAnswer = (ans: string) => {
    setAnswers((prev) => [...prev, ans]);
    // console.log(answers);
  };
  const detectError = () => {
    if (getAllQuestions().length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const getQuestion = useCallback(
    (id: number) => {
      const questions = getAllQuestions();
      return questions[id];
    },
    [getAllQuestions]
  );

  const [quit, setQuit] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(getQuestion(index));
  const [answers, setAnswers] = useState<string[]>([]);
  const [error] = useState<boolean>(detectError());

  useEffect(() => {
    setCurrentQuestion(getQuestion(index));
  }, [index, getQuestion]);

  useEffect(() => {
    console.log(getAllQuestions());
    console.log(answers);
  }, [answers, getAllQuestions]);

  return (
    <>
      {!error ? (
        <div>
          {quit ? (
            <div>
              <div className="text-center h-[10em] flex">
                <p className="items-center justify-center m-auto">
                  Thank you for filling the form
                </p>
              </div>
              <button
                onClick={(_) => navigate("/")}
                className="bg-amber-500 w-full hover:bg-amber-600 shadow-amber-500/40 mt-6 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              {(() => {
                if (currentQuestion.kind === "text")
                  return (
                    <div>
                      <QuestionCard
                        label={currentQuestion.label}
                        type={currentQuestion.type}
                        addAnswerCB={addAnswer}
                        updateIndexCB={updateIndex}
                      />
                    </div>
                  );
                else if (currentQuestion.kind === "radio") {
                  return (
                    <QuestionCard
                      label={currentQuestion.label}
                      type="radio"
                      options={currentQuestion.options}
                      addAnswerCB={addAnswer}
                      updateIndexCB={updateIndex}
                    />
                  );
                } else if (currentQuestion.kind === "dropdown") {
                  return (
                    <select
                      className="px-3 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
                      value={currentQuestion.label}
                      onChange={(e) => {
                        addAnswer(e.target.value);
                        updateIndex();
                        updateIndex();
                        console.log(answers);
                      }}
                    >
                      <option
                        className="bg-slate-500 text-white font-semibold"
                        value=""
                      >
                        Select an option
                      </option>
                      {(currentQuestion as DropdownField).options.map(
                        (option, index) => (
                          <option
                            className="bg-slate-500 text-white font-semibold"
                            key={index}
                            value={option.option}
                          >
                            {option.option}
                          </option>
                        )
                      )}
                    </select>
                  );
                } else if (currentQuestion.kind === "textarea") {
                  return (
                    <QuestionCard
                      label={currentQuestion.label}
                      type="textarea"
                      addAnswerCB={addAnswer}
                      updateIndexCB={updateIndex}
                    />
                  );
                } else if (currentQuestion.kind === "multiple") {
                  return (
                    <QuestionCard
                      label={currentQuestion.label}
                      type="multiple"
                      options={currentQuestion.options}
                      addAnswerCB={addAnswer}
                      updateIndexCB={updateIndex}
                    />
                  );
                }
              })()}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center h-32">
          <p>No questions to preview.</p>
        </div>
      )}
    </>
  );
}
