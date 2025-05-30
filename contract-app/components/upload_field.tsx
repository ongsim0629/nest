interface UploadFieldProps {
  statusText?: string;
}

export default function UploadField({ statusText }: UploadFieldProps) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 bg-indigo-900 text-white rounded text-md">업로드</button>
        <span className="font-bold text-sm">파일이 업로드되지 않았습니다.</span>

        {statusText && (
          <>
            <span className="ml-3 font-bold">미제출 :</span>
            <input
              type="text"
              placeholder={statusText}
              className="border border-gray-500 rounded"
            />
          </>
        )}
      </div>
    </div>
  );
}