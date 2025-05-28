type Type = "text" | "date";

interface inputProps {
  type: Type;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function Input({ type, placeholder, value, onChange }: inputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="h-full px-3 font-bold"
    ></input>
  );
}

export default Input;
