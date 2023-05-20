import React, { useEffect, useState } from "react";
import { Form, formData } from "../types/formTypes";
import { navigate } from "raviger";
import { deleteListedForm, listForms } from "../utils/apiUtils";
import { Pagination } from "../types/common";
import { initialOffset, limit } from "../constants";
import PageElement from "./PageElement";
import ShareForm from "./common/ShareForm";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

const fetchForms = async (
  setAllFormsCB: (value: Form[]) => void,
  offset: number,
  setCount: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const data: Pagination<Form> = await listForms({
      offset: offset,
      limit: limit,
    });
    setAllFormsCB(data.results);
    setCount(data.count);
  } catch (error) {
    console.error(error);
  }
};

export default function AllForms(props: {
  getLocalFormCB: () => formData[];
  search: string;
}) {
  // const deleteForm = (id: number) => {
  //   const removedArray = props
  //     .getLocalFormCB()
  //     .filter((item) => item.id !== id);
  //   localStorage.setItem("savedForms", JSON.stringify(removedArray));
  //   setAllForms(removedArray);
  // };

  const [offset, setOffset] = useState<number>(initialOffset);
  const [count, setCount] = useState(0);

  const [allForms, setAllForms] = React.useState<Form[]>(
    props.getLocalFormCB()
  );

  useEffect(() => {
    fetchForms(setAllForms, offset, setCount);
  }, [offset]);

  const handleDragEnd = (result: {
    draggableId: string;
    type: string;
    source: { index: number; droppableId: string };
    reason: string;
    mode: string;
    destination: { droppableId: string; index: number };
  }) => {
    if (!result.destination) return;
    const items = Array.from(allForms);
    const [reorderData] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderData);
    setAllForms(items);
  };

  return (
    <div className="px-5 w-full ">
      <DragDropContext onDragEnd={handleDragEnd as OnDragEndResponder}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              className="list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {allForms
                .filter((ele) => ele.id !== -1)
                .filter((ele) =>
                  ele.title
                    .toLowerCase()
                    .includes(props.search?.toLowerCase() || "")
                )
                .map((ele, index) => (
                  <Draggable
                    key={ele.id}
                    draggableId={ele.id ? ele.id.toString() : "-1"}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className=" relative z-0"
                      >
                        <div
                          className="relative z-0 text-white py-7 px-5 my-3 rounded-lg hover:bg-[#5d7691] bg-[#485d74] flex justify-between"
                          key={index}
                          onClick={() => navigate(`/forms/${ele.id}`)}
                        >
                          <div>{ele.title}</div>
                        </div>
                        <div className="absolute inset-y-0 right-0 z-10 py-7 px-5">
                          <button
                            onClick={() => navigate(`/forms/${ele.id}`)}
                            className="align-top pl-3 text-amber-300 hover:text-amber-400"
                          >
                            Open
                          </button>
                          <button
                            onClick={(_) => navigate(`/preview/${ele.id}`)}
                            className="align-top pl-3 text-amber-300 hover:text-amber-400"
                          >
                            Preview
                          </button>
                          <button
                            onClick={async (_) => {
                              try {
                                const response = await deleteListedForm(
                                  ele.id ? ele.id : -1
                                );
                                console.log(response);
                              } catch (err) {
                                console.log(err);
                              }
                              setAllForms(
                                allForms.filter((item) => item.id !== ele.id)
                              );
                              setCount((prev) => prev - 1);
                            }}
                            className="inline px-3 text-amber-300 hover:text-red-300"
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

                          <ShareForm formID={ele.id ? ele.id : -1} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PageElement
        count={count}
        items={allForms}
        offset={offset}
        setOffsetCB={setOffset}
      />
    </div>
  );
}
