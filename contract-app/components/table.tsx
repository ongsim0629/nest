export default function Table({
  columns,
  data,
}: {
  columns: string[];
  data: React.ReactNode[][];
}) {
  return (
    <table className="w-full text-md font-bold rounded text-center shadow-lg">
      <thead className="bg-purple-100">
        <tr>
          {columns.map((header, index) => (
            <th key={index} className="px-2 py-1">
              {typeof header === "string" ? header : String(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          if (!Array.isArray(row)) {
            return null;
          }

          return (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 border-b border-gray-200 last:border-b-0 text-center"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-2 py-1">
                  {cell}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
