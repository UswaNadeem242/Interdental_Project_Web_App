
import React, { useState } from "react";
import FormSection from "../CommonLabel/FormSelection";
import { ClipboardDocumentListIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ExclamationCircleIcon from "../../../icon/exclamation-circle-icon";

export const FileUploadSection = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Filter only allowed file types
        const allowedFiles = selectedFiles.filter((file) =>
            ["image/png", "image/jpeg", "image/jpg", "application/pdf"].includes(file.type)
        );

        if (allowedFiles.length !== selectedFiles.length) {
            alert("Only PNG, JPG, JPEG, or PDF files are allowed.");
        }

        setFiles((prev) => [...prev, ...allowedFiles]);
    };

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const formatFileName = (name, front = 10, back = 5) => {
        if (!name) return "";
        if (name.length <= front + back) return name;
        return `${name.slice(0, front)}...${name.slice(-back)}`;
    };

    return (
        <FormSection
            className="bg-textField py-3 px-2 border border-gray-200"
            title={
                <div className="flex items-center justify-between relative gap-1">
                    <span className="text-xs whitespace-nowrap font-poppins font-normal text-secondaryBrand">
                        Upload Patient Photos/Files
                    </span>

                    {/* Icon with tooltip */}
                    <div className="relative group">
                        <ExclamationCircleIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                        <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-50">
                            <div className="w-40 rounded-md bg-white px-3 py-2 text-[10px] font-normal text-secondaryText shadow-lg whitespace-normal leading-snug">
                                include patient face only (lips, nose, teeth) and profile pics
                            </div>
                        </div>
                    </div>

                    <label
                        htmlFor="file-upload"
                        className="rounded-full py-1 pr-2 text-xs font-semibold text-[#4640FF] cursor-pointer pb-0"
                    >
                        <PlusIcon className="w-4 h-5" />
                    </label>

                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>


            }
        >
            {/* Show selected file names */}
            {files.length > 0 && (
                <div className="mt-2 space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-1 px-2 text-sm text-[#989EC2] border border-gray-200 rounded-full"
                        >
                            {/* File name with icon */}
                            {/* <div className="flex items-center gap-2">
                                <ClipboardDocumentListIcon className="w-4 h-4" />
                                <span className="truncate max-w-[200px]">{file.name}</span>
                            </div> */}

                            <div className="flex items-center gap-2">
                                <ClipboardDocumentListIcon className="w-4 h-4" />
                                <span className="text-sm font-poppins">
                                    {formatFileName(file.name, 12, 8)}
                                </span>
                            </div>


                            {/* ❌ Remove button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="text-secondaryBrand"
                            >
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </FormSection>
    );
};




