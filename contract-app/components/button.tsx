type Color = "navy" | "gray" | "light-navy" | "white" | "white-gray";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  type?: "submit" | undefined;
  color: Color;
  size: Size;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({
  type,
  color,
  size,
  className,
  onClick,
  children,
}: ButtonProps) {
  let combinedClassName = "";

  switch (color) {
    case "navy": {
      combinedClassName =
        "rounded bg-indigo-900 text-white hover:bg-light-navy";
      break;
    }
    case "gray": {
      combinedClassName = "rounded bg-gray-500 text-white hover:bg-light-navy";
      break;
    }
    case "light-navy": {
      combinedClassName = "rounded bg-blue-700 text-white hover:bg-navy";
      break;
    }
    case "white": {
      combinedClassName = "rounded bg-white text-gray-500 hover:bg-navy";
      break;
    }
    case "white-gray": {
      combinedClassName =
        "rounded bg-white border border-gray text-gray-500 hover:bg-navy";
      break;
    }
  }
  switch (size) {
    case "sm": {
      combinedClassName += " px-3 py-3 text-sm";
      break;
    }
    case "md": {
      combinedClassName += " px-4 py-2 text-md";
      break;
    }
    case "lg": {
      combinedClassName += " px-6 py-3 text-lg";
      break;
    }
  }

  return (
    <button
      type={type ? type : "button"}
      className={`${combinedClassName} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
