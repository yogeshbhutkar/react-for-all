import logo from "../logo.svg";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex-col justify-center">
      <img className="h-48" src={logo} alt="logo" />
      <div className="flex-1 justify-center flex items-center">
        <p>Welcome to Home Page</p>
      </div>
      <button
        onClick={props.openFormCB}
        className="bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 mt-4 shadow-lg  text-white px-5 py-2 rounded-xl font-semibold"
      >
        Open Form
      </button>
    </div>
  );
}
