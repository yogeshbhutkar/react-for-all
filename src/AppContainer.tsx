import React from "react";
import Header from "./Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="card  flex py-auto bg-slate-900 items-center">
      <div className="p-4 my-10  lg:w-[50%] w-[75%] mx-auto bg-slate-700 shadow-slate-300/30 shadow-lg text-white rounded-xl">
        <Header />
        {props.children}
      </div>
    </div>
  );
}
