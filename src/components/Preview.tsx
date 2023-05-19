import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { navigate } from "raviger";
import { getFormData, uploadAnswer } from "../utils/apiUtils";

import { results } from "../types/common";
import { ClipLoader } from "react-spinners";

export default function Preview(props: { previewId: number }) {
  const handleKeypress = (e: any) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  const initializeData = async (
    formId: number,
    setDataCB: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      getFormData(formId).then((result) => setDataCB(result.results));
    } catch (error) {
      console.error(error);
    }
  };

  const addAnswer = (ans: string | string[], questionId: number) => {
    // uploadAnswer(props.previewId, {answers:ans}  )
    if (ans.length === 0) {
      ans = "empty";
    }
    setAnswers((prev) => [
      ...prev,
      { form_field: questionId, value: ans.toString() },
    ]);
  };

  const handleClick = () => {
    navigate("/");
    console.log(answers[0] + "answers");
    const temp = async () => {
      await uploadAnswer(props.previewId, { answers: answers });
    };
    temp();
  };

  useEffect(() => {
    setLoading(true);
    const temp = async () =>
      await initializeData(props.previewId, setAllQuestions).then((res) =>
        setLoading(false)
      );

    temp();
  }, [props.previewId]);

  const [allQuestions, setAllQuestions] = useState<results[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { form_field: number; value: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(
    allQuestions.length === 0
      ? "No questions to preview"
      : "Thank you for filling the form"
  );

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const updateIndex = () => {
    setIndex((prev) => {
      if (prev === allQuestions.length) {
        return prev;
      } else {
        return (prev = prev + 1);
      }
    });
  };

  useEffect(() => {
    if (allQuestions.length === 0) {
      setMessage("No questions to preview");
    } else {
      setMessage("Thank you for filling the form");
    }
  }, [allQuestions]);

  return (
    <>
      {index === allQuestions.length ? (
        <div>
          <div className="text-center h-[10em] flex">
            <p className="items-center justify-center m-auto">{message}</p>
          </div>
          <button
            type="submit"
            onKeyUp={handleKeypress}
            onClick={handleClick}
            className="bg-amber-500 w-full hover:bg-amber-600 shadow-amber-500/40 mt-6 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
          >
            Close
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {allQuestions.length > 0 && index < allQuestions.length ? (
        <div>
          {(() => {
            if (allQuestions[index].kind === "TEXT")
              return (
                <div className="mt-3">
                  <QuestionCard
                    label={allQuestions[index].label}
                    addAnswerCB={addAnswer}
                    type={allQuestions[index].meta.type}
                    updateIndexCB={() =>
                      setIndex((prev) => {
                        if (prev === allQuestions.length) {
                          return prev;
                        } else {
                          return (prev = prev + 1);
                        }
                      })
                    }
                    questionId={allQuestions[index].id}
                  />
                </div>
              );
            else if (allQuestions[index].kind === "RADIO") {
              return (
                <QuestionCard
                  label={allQuestions[index].label}
                  type="radio"
                  options={allQuestions[index].options}
                  addAnswerCB={addAnswer}
                  updateIndexCB={() =>
                    setIndex((prev) => {
                      if (prev === allQuestions.length) {
                        return prev;
                      } else {
                        return (prev = prev + 1);
                      }
                    })
                  }
                  questionId={allQuestions[index].id}
                />
              );
            } else if (allQuestions[index].kind === "DROPDOWN") {
              return (
                <select
                  className="px-3 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
                  value={allQuestions[index].label}
                  onChange={(e) => {
                    console.log(e.target.value);
                    updateIndex();
                  }}
                >
                  <option
                    className="bg-slate-500 text-white font-semibold"
                    value=""
                  >
                    Select an option
                  </option>
                  {allQuestions[index].options.map((option, index) => (
                    <option
                      className="bg-slate-500 text-white font-semibold"
                      key={index}
                      value={option.option}
                    >
                      {option.option}
                    </option>
                  ))}
                </select>
              );
            } else if (allQuestions[index].kind === "GENERIC") {
              return (
                <QuestionCard
                  label={allQuestions[index].label}
                  type="multiple"
                  options={allQuestions[index].options}
                  addAnswerCB={addAnswer}
                  updateIndexCB={() =>
                    setIndex((prev) => {
                      if (prev === allQuestions.length) {
                        return prev;
                      } else {
                        return (prev = prev + 1);
                      }
                    })
                  }
                  questionId={allQuestions[index].id}
                />
              );
            }
          })()}
        </div>
      ) : (
        <div className="text-center">
          <ClipLoader
            color="#ffffff"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}
