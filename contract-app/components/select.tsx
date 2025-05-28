type Category = 'center' | 'type' | 'account' | 'method';

interface SelectProps {
    type: Category;
    value?: string;
    onChange?: (value: string) => void;
}

function Select({ type, value, onChange }: SelectProps) {
    let options: { value: string; label: string }[] = [];

    switch (type) {
        case 'center':
            options = [
                { value: '', label: '센터' },
                { value: '재단본부', label: '재단본부' },
                { value: '전국', label: '전국' },
                { value: '강남', label: '강남' },
                { value: '광주', label: '광주' },
                { value: '광화문', label: '광화문' },
                { value: '메디컬허브', label: '메디컬허브' },
                { value: '부산', label: '부산' },
                { value: '수원', label: '수원' },
                { value: '여의도', label: '여의도' },
                { value: '영등포', label: '영등포' },
                { value: '제주', label: '제주' },
            ];
            break;
        case 'type':
            options = [
                { value: '', label: '계약종류' },
                { value: 'GENERAL', label: '일반계약' },
                { value: 'UNIT_PRICE', label: '단가계약' },
                { value: 'LEASE', label: '임대계약' },
                { value: 'CONSTRUCTION', label: '공사계약' },
                { value: 'SALE', label: '매각계약' },
                { value: 'SERVICE', label: '용역계약' },
                { value: 'MAINTENANCE', label: '유지보수계약' },
                { value: 'OTHER', label: '기타계약' },
            ];
            break;
        case 'account':
            options = [
                { value: '', label: '계정명' },
                { value: '기타', label: '기타' },
                { value: '백신', label: '백신' },
                { value: '사무용품', label: '사무용품' },
                { value: '시약', label: '시약약' },
                { value: '의료비품', label: '의료비품' },
                { value: '의료소모품', label: '의료소모품' },
                { value: '의료장비', label: '의료장비' },
                { value: '의약품', label: '의약품' },
                { value: '인쇄물', label: '인쇄물물' },
                { value: '일반비품', label: '일반비품' },
                { value: '장비비품', label: '장비비품' },
                { value: '장비소모품', label: '장비소모품' },
                { value: '전산용품', label: '전산용품' },
                { value: '피복', label: '피복' },
            ];
            break;
        case 'method':
            options = [
                { value: '', label: '계약방법' },
                { value: 'DIRECT', label: '수의' },
                { value: 'BID', label: '입찰' },
            ];
            break;
    }

    return (
        <div className="flex flex-col">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-full font-bold text-lg gap-10 ml-7 mr-3 pr-30"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
