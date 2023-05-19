import React from "react";
import Header from "./Header";
import { User } from "./types/userTypes";

export default function AppContainer(props: { children: React.ReactNode, currentUser: User}) {
  return (
    <div className="card  flex py-auto bg-slate-900 items-center">
      <div className="p-4 my-10  lg:w-[50%] w-[75%] mx-auto bg-slate-700 shadow-slate-300/30 shadow-lg text-white rounded-xl">
        <Header currentUser={props.currentUser} />
        {props.children}
      </div>
    </div>
  );
}
