interface RadioGroupProps {
  options: { value: string; label: string }[];
  selected: string;
}

export default function RadioGroup({ options, selected }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-1 text-sm">
          <input type="radio" checked={selected === opt.value} readOnly />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
