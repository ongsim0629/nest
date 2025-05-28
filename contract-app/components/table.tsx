interface TableHolderProps {
    children: React.ReactNode;
    className?: string;
}

function Table({ children, className }: TableHolderProps) {
    return (
        <div className={`w-full h-full rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );
}

export default Table;
