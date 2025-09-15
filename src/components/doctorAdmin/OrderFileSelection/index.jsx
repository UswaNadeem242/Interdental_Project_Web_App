import React, { useState } from "react";
import FormSection from "../CommonLabel/FormSelection";
import { ClipboardDocumentListIcon, PlusIcon } from "@heroicons/react/24/solid";

export const FileUploadSection = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    return (
        <FormSection
            className='bg-textField py-3 px-4 border border-gray-200'
            title={
                <div className="flex items-center justify-between gap-5 ">

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
                <div className="mt-2 space-y-1">
                    {files.map((file, index) => (
                        <p
                            key={index}
                            className="py-1 px-2 text-sm text-[#989EC2]  border border-grey-200 rounded-full flex items-center gap-2"
                        >
                            <ClipboardDocumentListIcon className="w-3 h-3 " />
                            {file.name}
                        </p>
                    ))}
                </div>
            )}
        </FormSection>
    );
};



