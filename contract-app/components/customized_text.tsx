type Color = 'navy' | 'black' | 'sky' | 'white';
type Size = 'sm' | 'md' | 'lg';

interface TextProps {
    type?: 'link' | string;
    color: Color;
    size: Size;
    className?: string;
    children: string;
    onclick?: () => void;
}

function CustomizedText({ type, color, size, className, children, onclick }: TextProps) {
    let combinedClassName = '';

    switch (color) {
        case 'navy': {
            combinedClassName = 'text-indigo-900';
            break;
        }
        case 'black': {
            combinedClassName = 'text-black';
            break;
        }
        case 'sky': {
            combinedClassName = 'text-sky-400 decoration-sky-400 underline';
            break;
        }
        case 'white': {
            combinedClassName = 'text-white';
            break;
        }
    }

    switch (size) {
        case 'sm': {
            combinedClassName += ' text-lg';
            break;
        }
        case 'md': {
            combinedClassName += ' text-2xl';
            break;
        }
        case 'lg': {
            combinedClassName += ' text-4xl font-bold';
            break;
        }
    }

    return (
        <span className={`${combinedClassName} ${className}`} onClick={onclick}>
            {children}
        </span>
    );
}

export default CustomizedText;