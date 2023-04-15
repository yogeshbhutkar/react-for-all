import { formData } from "./components/Form";
import AppRouter from "./router/AppRouter";

export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

function App() {
  return <AppRouter />;
}

export default App;
