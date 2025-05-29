interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionContainer({
  title,
  children,
}: SectionContainerProps) {
  return (
    <div className="mb-6">
      <div className="bg-[#2E2F6E] text-white px-4 py-2 rounded-t">
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <div className="border rounded-b p-4 bg-white">{children}</div>
    </div>
  );
}
