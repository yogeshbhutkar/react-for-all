import AppContainer from "./AppContainer";
import Header from "./Header";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "tel" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-slate-700 shadow-slate-300/30 shadow-lg text-white rounded-xl">
        <Header
          title={`welcome to Lesson 5 of $react-typescript with #tailwindcss`}
        />
        {formFields.map((field) => (
          <div key={field.id}>
            <label>{field.label}</label>
            <input
              className="border-2 text-black border-gray-200 rounded-lg p-2 m-2 w-full"
              type={field.type}
            />
          </div>
        ))}
        <button className="bg-amber-500 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold">
          Submit
        </button>
      </div>
    </AppContainer>
  );
}

export default App;
