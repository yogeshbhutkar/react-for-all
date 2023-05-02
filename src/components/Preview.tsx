import { useCallback, useEffect, useReducer, useState } from "react";
import { getLocalForms } from "../App";
import { DropdownField, UserAnswer, formField } from "../types/formTypes";
import QuestionCard from "./QuestionCard";
import { navigate } from "raviger";

export default function Preview(props: { previewId: Number }) {
  const getAllQuestions: () => formField[] = useCallback(() => {
    const form = getLocalForms().filter((ele) => ele.id === props.previewId);
    return form[0].formFields;
  }, [props.previewId]);

  const addAnswer = (ans: string | string[], questionId: number) => {
    // setAnswers((prev) => [...prev, ans]);
    // console.log(answers);
    dispatch({
      type: "add_answer",
      id: Number(new Date()),
      answer: ans,
      questionId: questionId,
    });
    console.log(answers + "answers");
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

  type AddAnswer = {
    type: "add_answer";
    id: number;
    questionId: number;
    answer: string | string[];
  };

  type AddAction = AddAnswer;

  const reducer: (state: UserAnswer[], action: AddAction) => UserAnswer[] = (
    state: UserAnswer[],
    action: AddAction
  ) => {
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

  type CurrentQuestion = {
    type: "current_question";
  };

  type UpdateQuestion = {
    type: "update_question";
  };

  const questionReducer: (
    state: formField,
    action: CurrentQuestion | UpdateQuestion
  ) => formField = (
    state: formField,
    action: CurrentQuestion | UpdateQuestion
  ) => {
    switch (action.type) {
      case "current_question": {
        const newState = getQuestion(index);
        setQuestionId(getQuestion(index).id);
        return newState;
      }

      case "update_question": {
        if (index === getAllQuestions().length - 1) {
          setQuit(true);
          return getQuestion(index);
        }
        setIndex((idx) => idx + 1);
        return getQuestion(index);
      }
    }
  };

  const [quit, setQuit] = useState(false);
  const [index, setIndex] = useState(0);
  const [questionId, setQuestionId] = useState(getQuestion(index).id);
  const [answers, dispatch] = useReducer(reducer, []);
  const [currentQuestion, dispatchQuestion] = useReducer(
    questionReducer,
    getQuestion(index)
  );
  const [error] = useState<boolean>(detectError());

  useEffect(() => {
    dispatchQuestion({ type: "current_question" });
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
                        updateIndexCB={() =>
                          dispatchQuestion({ type: "update_question" })
                        }
                        questionId={questionId}
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
                      updateIndexCB={() =>
                        dispatchQuestion({ type: "update_question" })
                      }
                      questionId={questionId}
                    />
                  );
                } else if (currentQuestion.kind === "dropdown") {
                  return (
                    <select
                      className="px-3 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
                      value={currentQuestion.label}
                      onChange={(e) => {
                        addAnswer(e.target.value, questionId);
                        dispatchQuestion({ type: "update_question" });
                        dispatchQuestion({ type: "update_question" });
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
                      updateIndexCB={() =>
                        dispatchQuestion({ type: "update_question" })
                      }
                      questionId={questionId}
                    />
                  );
                } else if (currentQuestion.kind === "multiple") {
                  return (
                    <QuestionCard
                      label={currentQuestion.label}
                      type="multiple"
                      options={currentQuestion.options}
                      addAnswerCB={addAnswer}
                      updateIndexCB={() =>
                        dispatchQuestion({ type: "update_question" })
                      }
                      questionId={questionId}
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
