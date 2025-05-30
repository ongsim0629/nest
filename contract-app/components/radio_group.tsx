interface RadioGroupProps {
  options: { value: string; label: string }[];
  selected: string;
}

export default function RadioGroup({ options, selected }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((o) => (
        <label key={o.value} className="flex items-center gap-1 text-md font-bold">
          <input type="radio" checked={selected === o.value} readOnly />
          {o.label}
        </label>
      ))}
    </div>
  );
}
