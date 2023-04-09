import AppContainer from "./AppContainer";
import Header from "./Header";
import { useState } from "react";
import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  const [state, setState] = useState("HOME");

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };

  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-slate-700 shadow-slate-300/30 shadow-lg text-white rounded-xl">
        <Header
          title={`welcome to Lesson 5 of $react-typescript with #tailwindcss`}
        />
        {state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <Form closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
