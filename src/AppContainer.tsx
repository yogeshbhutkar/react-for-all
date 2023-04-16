import React from "react";
import Header from "./Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="card flex h-screen py-auto bg-slate-900 items-center">
      <div className="p-4 w-[50%]  mx-auto bg-slate-700 shadow-slate-300/30 shadow-lg text-white rounded-xl">
        <Header />
        {props.children}
      </div>
    </div>
  );
}
