interface TableHeaderProps {
  headers: string[];
}

export function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead className="bg-purple-100">
      <tr>
        {headers.map((header) => (
          <th key={header} className="px-2 py-1">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
