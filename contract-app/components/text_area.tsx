interface TextAreaProps {
    placeholder?: string;
    className?: string;
}

export default function TextArea({
    placeholder = "No value provided",
    className = "h-full w-full px-3 text-gray-700"
}: TextAreaProps) {
    return (
        <textarea
            placeholder={placeholder}
            readOnly
            className={className}
        />
    );
}