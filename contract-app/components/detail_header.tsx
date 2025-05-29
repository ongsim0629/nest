type Type = "table" | "contents";

interface DetailHeaderProps {
  type: Type;
  title: string;
  count?: number;
}

export default function DetailHeader({
  type,
  title,
  count,
}: DetailHeaderProps) {
  const commonClass = "bg-[#2E2F6E] text-white px-4 py-2 rounded-t";

  if (type === "table") {
    return (
      <div className={commonClass + " flex items-center"}>
        <h2 className="text-sm font-semibold">{title}</h2>
        {type === "table" && count !== undefined && (
          <span className="ml-2 inline-flex items-center justify-center bg-white text-[#2E2F6E] rounded-full text-xs font-bold w-6 h-6">
            {count}
          </span>
        )}
      </div>
    );
  }

  if (type === "contents") {
    return (
      <div className={commonClass}>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
    );
  }

  return null;
}
