import React, { useState } from "react";
import { Form, Error, validateForm } from "../types/formTypes";
import { navigate } from "raviger";
import { createForm } from "../utils/apiUtils";

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: false,
  });

  const [errors, setErrors] = useState<Error<Form>>();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setForm({ ...form, [name]: value });
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateForm(form);
    setErrors(validationError);
    if (Object.keys(validationError).length === 0) {
      try {
        const data = await createForm(form);
        navigate(`/forms/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-5 bg-slate-700 text-white">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
            id="title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {errors?.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          {errors?.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="is_public">is public</label>
          <input
            type="checkbox"
            id="is_public"
            name="is_public"
            className="mx-3"
            value={form.is_public ? "true" : "false"}
            onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
          />
          {errors?.is_public && (
            <p className="text-red-500">{errors.is_public}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-amber-500 text-center hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
