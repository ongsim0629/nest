interface DetailHeaderProps {
  title: string;
  count?: number;
}

export default function DetailHeader({
  title,
  count,
}: DetailHeaderProps) {
  const commonClass = "bg-[#2E2F6E] text-white px-4 py-2 rounded-t";

  if (count !== undefined) {
    return (
      <div className={commonClass + " flex items-center"}>
        <h2 className="text-sm font-semibold">{title}</h2>
        {count !== undefined && (
          <span className="ml-2 inline-flex items-center justify-center bg-white text-[#2E2F6E] rounded-full text-xs font-bold w-6 h-6">
            {count}
          </span>
        )}
      </div>
    );
  }

  else{
    return (
      <div className={commonClass}>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
    );
  }

  return null;
}
