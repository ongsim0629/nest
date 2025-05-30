interface ButtonGroupProps {
  options: string[];
  selected: string[];
}

export default function ButtonGroup({ options, selected }: ButtonGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <button
          key={item}
          className={`px-3 py-1 text-sm rounded-full border ${
            selected.includes(item)
              ? "bg-indigo-900 text-white"
              : "bg-white border border-indigo-900 text-indigo-900"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
