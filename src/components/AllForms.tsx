import { useState } from "react";
import { formData } from "../types/formTypes";
import { Link, navigate } from "raviger";

export default function AllForms(props: {
  getLocalFormCB: () => formData[];
  search: string;
}) {
  const deleteForm = (id: number) => {
    const removedArray = props
      .getLocalFormCB()
      .filter((item) => item.id !== id);
    localStorage.setItem("savedForms", JSON.stringify(removedArray));
    setAllForms(removedArray);
  };

  const [allForms, setAllForms] = useState(props.getLocalFormCB());

  return (
    <div className="px-5 w-full ">
      {allForms
        .filter((ele) => ele.id !== -1)
        .filter((ele) =>
          ele.title.toLowerCase().includes(props.search?.toLowerCase() || "")
        )
        .map((ele, index) => (
          <div key={index} className=" relative z-0">
            <div
              className="relative z-0 text-white py-7 px-5 my-3 rounded-lg hover:bg-[#5d7691] bg-[#485d74] flex justify-between"
              key={index}
              onClick={() => navigate(`/forms/${ele.id}`)}
            >
              <div>{ele.title}</div>
            </div>
            <div className="absolute inset-y-0 right-0 z-10 py-7 px-5">
              <button
                onClick={(_) => navigate(`/preview/${ele.id}`)}
                className="align-top pl-3 text-amber-300 hover:text-amber-400"
              >
                Preview
              </button>
              <button
                onClick={(_) => deleteForm(ele.id)}
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
            </div>
          </div>
        ))}
    </div>
  );
}
