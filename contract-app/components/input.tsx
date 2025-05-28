type Type = 'text' | 'date';

interface inputProps {
    type : Type;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

function Input({ type, placeholder, value, onChange} : inputProps) {
    switch (type) {
        case 'text' : {
            return (
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="w-50 h-full font-bold text-lg px-3 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                />
            );
        }
        case 'date' : {
            return (
                <input type="date"
                placeholder="날짜를 선택해주세요" 
                className=" h-full font-bold border text-lg px-3 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                onChange = {(e)=> onChange && onChange(e.target.value)}
                />
            );
        }
        
    }
}

export default Input;