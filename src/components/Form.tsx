import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import LabeledInputs from "./LabeledInputs";
import LabeledDropdown from "./LabeledDropdown";
import LabeledRadio from "./LabeledRadio";
import LabeledMultiSelect from "./LabeledMultiSelect";

import {
  addOptions,
  deleteParticularField,
  getForm,
  getFormData,
  postFormFields,
  updateForm,
} from "../utils/apiUtils";
import { inputStyle } from "../constants";
import { resultKind, results } from "../types/common";

const initializeData = async (
  formId: number,
  setDataCB: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const response = await getFormData(formId);
    const resData = response.results.sort(function (a: any, b: any) {
      return a.id - b.id;
    });
    setDataCB(resData);
  } catch (error) {
    console.error(error);
  }
};

const getTitleAndDescription = async (
  id: number,
  setTitleCB: React.Dispatch<React.SetStateAction<string>>,
  setDescriptionCB: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await getForm(id);
    setTitleCB(response.title);
    setDescriptionCB(response.description);
  } catch (err) {
    console.error(err);
  }
};

export default function Form(props: { formId: number }) {
  const [data, setData] = useState<results[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTitleAndDescription(props.formId, setTitle, setDescription);
  }, [props.formId]);

  useEffect(() => {
    setLoading(true);
    initializeData(props.formId, setData).then((res) => setLoading(false));
    // setLoading(false);
    // console.log(data)
  }, [props.formId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const removeOption = async (
    form_pk: number,
    id: number,
    option_id: number
  ) => {
    try {
      const optionArray = data.filter((ele) => ele.id === id)[0].options;
      const newOptions = optionArray.filter((item) => item.id !== option_id);
      const payload = { options: newOptions };

      // let currentData = data;

      await addOptions(form_pk, id, payload);
      await initializeData(props.formId, setData);
    } catch (err) {
      console.error(err);
    }
  };

  //Use effects
  useEffect(() => {
    console.log("Mounting the component");
    const oldTitle = document.title;
    document.title = "Form Edit";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  //Function declarations

  const removeItem = async (form_pk: number, id: number) => {
    try {
      setData((prev) => prev?.filter((ele) => ele.id !== id));
      await deleteParticularField(form_pk, id);
      await initializeData(props.formId, setData);
    } catch (err) {
      console.log(err);
    }
  };

  const addOption = async (form_pk: number, id: number, str: string) => {
    try {
      let optionArray = data.filter((item) => item.id === id)[0].options;
      optionArray.push({ id: Number(new Date()), option: str });
      const payload = { options: optionArray };
      await addOptions(form_pk, id, payload);
    } catch (err) {
      console.error(err);
    }
  };

  const updateItem = async (id: number, str: string) => {
    const payload = {
      label: str,
    };
    const res = await addOptions(props.formId, id, payload);
    if (res) {
      console.log("updated");
    }
  };

  //State variables

  //Data corresponding to the fields
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<resultKind>("TEXT");
  const [option, setOption] = useState("");

  const [renderAddForm, setRenderAddForm] = useState<boolean>();

  const addField = () => {
    setError("");

    if (newField === "") {
      setError("Label cannot be empty.");
      return;
    }

    console.log(type);

    const payload = {
      id: Number(new Date()),
      label: newField,
      kind:
        type === "tel" ||
        type === "email" ||
        type === "number" ||
        type === "date"
          ? "TEXT"
          : type,
      options: [],
      value: newField,
      meta: { type: type },
    };

    // const temp = async () => await postFormFields(props.formId, payload )
    // temp()

    postFormFields(props.formId, payload).then((response) => {
      setNewField("");
      setData((prev) => [...prev, payload]);

      const tempMethod = async () =>
        await initializeData(props.formId, setData);
      tempMethod();
      console.log(response);
    });
  };

  const handleKeypress = (e: any) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      updateTitleAndDesc(props.formId);
      setUpdatedMessage("Updated");
      setTimeout(() => {
        setUpdatedMessage("");
      }, 1000);
    }
  };

  const handleAddField = (e: any) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addField();
    }
  };

  const updateTitleAndDesc = async (id: number) => {
    const payload = {
      title: title,
      description: description,
    };
    await updateForm(id, payload);
  };

  const [updatedMessage, setUpdatedMessage] = useState<string>("");

  useEffect(() => {
    if (props.formId === -1) {
      setRenderAddForm(true);
    } else {
      setRenderAddForm(false);
    }
  }, [props.formId]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <ClipLoader
            color="#ffffff"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-4 ">
          <div>
            <label className="inline" htmlFor="title">
              Title
            </label>

            <button
              onClick={(_) => updateTitleAndDesc(props.formId)}
              className="px-3 inline text-amber-500 hover:text-amber-600  my-2 rounded-xl font-semibold"
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            {updatedMessage && (
              <p className="bg-[#5d7691] px-3 py-2 rounded-lg inline-block text-center items-center ">
                {updatedMessage}
              </p>
            )}
            <input
              onKeyUp={handleKeypress}
              type="text"
              id="title"
              name="title"
              className={inputStyle}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="py-3">
            <label htmlFor="description">Description</label>
            <button
              onClick={(_) => updateTitleAndDesc(props.formId)}
              className="px-3  text-amber-500 hover:text-amber-600  py-2 rounded-xl font-semibold"
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            <input
              onKeyUp={handleKeypress}
              type="text"
              id="description"
              name="description"
              className={inputStyle}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div>
            {data?.map((field) => {
              switch (field.kind) {
                case "TEXT":
                  return (
                    <LabeledInputs
                      formId={props.formId}
                      id={field.id ? field.id : -1}
                      key={field.id ? field.id : Number(new Date())}
                      label={field.label}
                      type="text"
                      value={field.value}
                      removeFieldCB={removeItem}
                      updateFormCB={updateItem}
                    />
                  );
                case "DROPDOWN":
                  return (
                    <LabeledDropdown
                      id={field.id ? field.id : -1}
                      key={field.id ? field.id : Number(new Date())}
                      label={field.label}
                      value={field.value}
                      options={field.options}
                      formID={props.formId}
                      removeFieldCB={removeItem}
                      addOptionCB={addOption}
                      removeElementCB={removeOption}
                      updateRadioOptionCB={() => {}}
                    />
                  );
                case "RADIO":
                  return (
                    <LabeledRadio
                      id={field.id ? field.id : -1}
                      key={field.id ? field.id : Number(new Date())}
                      label={field.label}
                      formID={props.formId}
                      value={field.value}
                      options={field.options}
                      removeFieldCB={removeItem}
                      option={option}
                      setOptionCB={setOption}
                      addOptionCB={addOption}
                      removeElementCB={removeOption}
                      updateRadioOptionCB={() => {}}
                    />
                  );
                // case "TEXTAREA":
                //   return (
                //     <LabeledInputs
                //       id={field.id ? field.id : -1}
                //       key={field.id}
                //       label={field.label}
                //       value={field.value}
                //       formId={props.formId}
                //       type="textarea"
                //       removeFieldCB={async (form_pk, id) => {
                //         try {
                //           await deleteParticularField(form_pk, id);
                //           console.log(id);
                //           setData((prev) =>
                //             prev?.filter((ele) => ele.id !== id)
                //           );
                //         } catch (err) {
                //           console.log(err);
                //         }
                //       }}
                //       updateFormCB={updateItem}
                //     />
                //   );
                case "GENERIC":
                  return (
                    <LabeledMultiSelect
                      id={field.id ? field.id : -1}
                      key={field.id}
                      formID={props.formId}
                      label={field.label}
                      value={field.value}
                      options={field.options}
                      removeFieldCB={async (form_pk, id) => {
                        try {
                          await deleteParticularField(form_pk, id);
                          console.log(id);
                          setData((prev) =>
                            prev?.filter((ele) => ele.id !== id)
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                      addOptionCB={addOption}
                      removeElementCB={removeOption}
                      updateRadioOptionCB={() => {}}
                    />
                  );
                default:
                  return <div key={field.id}></div>;
              }
            })}
          </div>
          <div className="flex gap-2 p-2">
            <input
              onKeyUp={handleAddField}
              type="text"
              className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
            />
            <select
              onChange={(e) => {
                setType(e.target.value as resultKind);
                console.log(type);
              }}
              name="type"
              id="type"
              className="px-3 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
            >
              <option
                value="TEXT"
                className="bg-slate-500 text-white font-semibold"
              >
                TEXT
              </option>
              <option
                value="tel"
                className="bg-slate-500 text-white font-semibold"
              >
                TEL
              </option>
              <option
                value="email"
                className="bg-slate-500 text-white font-semibold"
              >
                EMAIL
              </option>
              <option
                value="number"
                className="bg-slate-500 text-white font-semibold"
              >
                NUMBER
              </option>
              <option
                value="date"
                className="bg-slate-500 text-white font-semibold"
              >
                DATE
              </option>
              <option
                value="DROPDOWN"
                className="bg-slate-500 text-white font-semibold"
              >
                DROPDOWN
              </option>
              <option
                value="RADIO"
                className="bg-slate-500 text-white font-semibold"
              >
                RADIO
              </option>
              <option
                value="textarea"
                className="bg-slate-500 text-white font-semibold"
              >
                TEXTAREA
              </option>
              <option
                value="GENERIC"
                className="bg-slate-500 text-white font-semibold"
              >
                MULTI-SELECT
              </option>
            </select>
            <button
              onClick={addField}
              className="px-5 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
            >
              Add Field
            </button>
          </div>
          <div>
            {error && (
              <p className="text-white bg-red-500 text-lg rounded-xl text-center py-4 items-center">
                {error}
              </p>
            )}
          </div>
          {renderAddForm ? (
            <div className="flex gap-4">
              <button
                onClick={() => {}}
                className="bg-amber-500 w-full hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
              >
                Add Form
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
}
