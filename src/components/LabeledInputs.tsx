export default function LabeledInputs(props: {
  id: number;
  label: string;
  type: string;
  value: string;
  updateFormCB: (id: number, str: string) => void;
  removeFieldCB: (id: number) => void;
}) {
  return (
    <div>
      <label>{props.label}</label>
      <div className="flex">
        <input
          className="border-2 flex-1 text-black border-gray-200 rounded-lg p-2 m-2 w-full"
          type={props.type}
          value={props.value}
          onChange={(e) => props.updateFormCB(props.id, e.target.value)}
        />
        <button
          onClick={(e) => props.removeFieldCB(props.id)}
          className="px-5 mx-2 bg-amber-500 hover:bg-amber-600 shadow-amber-500/40 my-2 shadow-lg  text-white py-2 rounded-xl font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
