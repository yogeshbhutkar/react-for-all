import { formData } from "./types/formTypes";
import AppRouter from "./router/AppRouter";
import { useEffect, useState } from "react";
import { me } from "./utils/apiUtils";
import { User } from "./types/userTypes";

export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const getCurrentUser = async (setCurrentUser: (currentUser: User)=>void)=> {
  const currentUser = await me()
  setCurrentUser(currentUser)
}

function App() {

  const [currentUser, setCurrentUser] = useState<User>({username:"" , url: ""})

  useEffect(()=>{
    getCurrentUser(setCurrentUser)
  }, [])

  return <AppRouter currentUser={currentUser} />;
}

export default App;
