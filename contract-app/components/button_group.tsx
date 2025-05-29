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
          className={`px-3 py-1 text-xs rounded-full border ${
            selected.includes(item)
              ? "bg-[#2E2F6E] text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
