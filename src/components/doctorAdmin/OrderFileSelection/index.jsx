
import React, { useState } from "react";
import FormSection from "../CommonLabel/FormSelection";
import { ClipboardDocumentListIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

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

        setFiles(allowedFiles);
    };

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <FormSection
            className="bg-textField py-3 px-4 border border-gray-200"
            title={
                <div className="flex items-center justify-between gap-5">
                    <span className="text-sm font-poppins font-normal text-secondaryBrand">
                        Upload Patient Photos/Files
                    </span>
                    <label
                        htmlFor="file-upload"
                        className="rounded-full px-3 py-1 text-xs font-semibold text-[#4640FF] cursor-pointer pb-0"
                    >
                        <PlusIcon className="w-5 h-5" />
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
                            <div className="flex items-center gap-2">
                                <ClipboardDocumentListIcon className="w-4 h-4" />
                                <span className="truncate max-w-[200px]">{file.name}</span>
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




