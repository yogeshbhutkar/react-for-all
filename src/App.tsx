import AppContainer from "./AppContainer";
import Header from "./Header";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "number" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header
          title={`welcome to Lesson 5 of $react-typescript with #tailwindcss`}
        />
        {formFields.map((field) => (
          <div key={field.id}>
            <label>{field.label}</label>
            <input
              className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
              type={field.type}
            />
          </div>
        ))}
        <button className="bg-blue-500 text-white px-5 py-2 rounded-xl mt-2 font-semibold">
          Submit
        </button>
      </div>
    </AppContainer>
  );
}

export default App;
