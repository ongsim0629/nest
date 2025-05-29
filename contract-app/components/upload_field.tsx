interface UploadFieldProps {
  label: string;
  statusText: string;
}

export default function UploadField({ label, statusText }: UploadFieldProps) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 bg-[#2E2F6E] text-white rounded text-xs">업로드</button>
        <span className="text-sm text-gray-500">{statusText}</span>
      </div>
    </div>
  );
}