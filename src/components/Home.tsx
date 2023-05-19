import AllForms from "./AllForms";
import { getLocalForms } from "../App";
import { navigate, useQueryParams } from "raviger";
import { useCallback, useEffect, useState } from "react";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";

export default function Home() {
  // handle what happens on key press
  const handleKeyPress = useCallback((event: any) => {
    if (event.shiftKey === true) {
      if (event.key === "K") {
        console.log("New Form");
        setNewForm(true);
      }
      if (event.key === "A") {
        console.log("navigating to about");
        navigate("/about");
      }
      if (event.key === "L") {
        console.log("Logging out");
        localStorage.removeItem("token");
        window.location.reload();
      }
      if (event.key === "S") {
        document.getElementById("search")?.focus();
        setSearchString("");
      }
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [newForm, setNewForm] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
        className="mx-5"
      >
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          className="border-1 focus:outline-none text-white border-slate-600 w-full bg-[#485d74] rounded-lg p-2 my-2 flex-1"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </form>
      <div className="flex-1  justify-center flex items-center">
        <AllForms getLocalFormCB={getLocalForms} search={search} />
      </div>
      <div className="flex flex-col">
        <button
          onClick={(_) => setNewForm(true)}
          className="bg-amber-500 text-center hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
        >
          Add Form
        </button>
      </div>
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}
