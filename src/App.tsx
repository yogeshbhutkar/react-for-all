import { formData } from "./types/formTypes";
import AppRouter from "./router/AppRouter";
import { useEffect, useState } from "react";
import { me } from "./utils/apiUtils";
import { User } from "./types/userTypes";
import LoginRoute from "./router/LogInRoute";

export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  const currentUser = await me();
  setCurrentUser(currentUser);
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    username: "",
    url: "",
  });

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <>
      {currentUser.username === "" ? (
        <LoginRoute currentUser={currentUser} />
      ) : (
        <AppRouter currentUser={currentUser} />
      )}
    </>
  );
}

export default App;
