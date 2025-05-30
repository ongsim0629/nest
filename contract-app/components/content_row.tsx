import RadioGroup from "./radio_group";
import ButtonGroup from "./button_group";
import UploadField from "./upload_field";
import TextArea from "./text_area";

type Type = "radio" | "button" | "file" |  "text_area" | "text" | "date" | "number";

interface ContentRowProps {
    type: string;
    label: string;
    value?: string | string[];
    isEssential?: boolean;
    options?: { value: string; label: string }[] | string[];
    selected?: string | string[];
}

function ContentRow({ type, label, value, isEssential, options, selected }: ContentRowProps) {
    const labelClassName = "w-30 y-full text-md pl-2 bg-purple-100 flex-shrink-0";

     return (
        <div className="flex items-stretch w-full h-full font-bold text-black border-b border-gray-200">
            <label className={labelClassName}>
                {label} {isEssential && <span className="text-red-500">*</span>}
            </label>
            <div className="flex-1">
                {(() => {
                    switch (type) {
                        case "radio":
                            return (
                                <div className="flex pl-2">
                                    <RadioGroup
                                        options={options as { value: string; label: string }[]}
                                        selected={value || ""}
                                    />
                                </div>
                            );
                        case "button":
                            return (
                                <div className="flex px-2">
                                    <ButtonGroup
                                    options={options as string[]}
                                    selected={Array.isArray(value) ? value : [value]}
                                />  
                                </div>

                            );
                        case "file":
                            return (
                                <div className="flex px-2">
                            <UploadField statusText={value}/>
                                </div>
                            );
                        case "text_area":
                            return <TextArea placeholder={value || ''} />;
                        case "text":
                            return (
                                <div className="flex px-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={value as string}
                                        className="rounded bg-gray-100 text-gray-500 px-2 py-1 w-full"
                                    />
                                </div>
                            );
                        case "date":
                            return (
                                <div className="flex px-2">
                                    <input type="date" value={value as string} className="border rounded px-2 py-1 w-60" />;
                                </div>
                            );
                        case "number":
                            return (
                                <div className="flex px-2">
                                  {value}
                                </div>
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
}
export default ContentRow;