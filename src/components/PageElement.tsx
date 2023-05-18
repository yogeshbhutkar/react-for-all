import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Form } from "../types/formTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { limit } from "../constants";
// import AllForms from "./AllForms";

const getNumberOfPages = (count: number) => {
  return Math.ceil(count / limit);
};

const pageArray = (pageNumber: number): number[] => {
  let arr = [];
  for (let i = 0; i < pageNumber; i++) {
    arr.push(i + 1);
  }
  return arr;
};

export default function PageElement(props: {
  count: number;
  items: Form[];
  offset: number;
  setOffsetCB: Dispatch<SetStateAction<number>>;
}) {
  const [count, setCount] = useState<number>(getNumberOfPages(props.count));
  const [pages, setPages] = useState<number[]>(pageArray(count));

  useEffect(() => {
    setCount(getNumberOfPages(props.count));
  }, [props.count]);

  useEffect(() => {
    setPages(pageArray(count));
  }, [count]);

  console.log(pages, count);

  return (
    <div className="flex items-center justify-between  text-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <p className="relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium  hover:bg-gray-50">
          Previous
        </p>
        <p className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </p>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm ">
            Showing{" "}
            <span className="font-medium">
              {props.offset === 0 ? props.offset + 1 : props.offset + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {props.offset + props.items?.length}
            </span>{" "}
            of <span className="font-medium">{props.count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px bg-white rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={(_) =>
                props.setOffsetCB((prev) => {
                  if (prev !== 0) return prev - limit;
                  else return prev;
                })
              }
            >
              <p className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </p>
            </button>
            {pages.map((ele) => (
              <button
                onClick={() => {
                  if (ele === 1) {
                    props.setOffsetCB(0);
                  } else {
                    props.setOffsetCB((ele - 1) * 5);
                  }
                }}
                key={ele}
                aria-current="page"
                className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-800  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {ele}
              </button>
            ))}

            <button
              onClick={(_) =>
                props.setOffsetCB((prev) => {
                  if (props.offset + props.items?.length !== props.count)
                    return prev + limit;
                  else return prev;
                })
              }
            >
              <p className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>

                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </p>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
