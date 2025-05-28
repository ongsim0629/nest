import { ReactNode } from "react";

interface TableRowProps {
  columns: ReactNode[];
}

export function TableRow({ columns, hover = true }: TableRowProps) {
  const cell = "border px-2 py-1";
  const row =
    "border-b border-gray-200 last:border-b-0 text-center" +
    (hover ? " hover:bg-gray-50" : "");

  return (
    <tr className={row}>
      {columns.map((col, i) => (
        <td key={i} className={cell}>
          {col}
        </td>
      ))}
    </tr>
  );
}
