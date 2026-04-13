import React, { useState, useRef } from "react";
import UploadIcon from "../icon/UploadIcon";
// import Group from "../assets/Group.png";

const AddBrandModalTwo = ({ isModalOpen, getAllBrands, setIsModalOpen }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef();
  const [name, setName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the uploaded image to preview it

      setUploadedImage(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-[303px] h-[295px] gap-[16px]">
        <div className="flex flex-col justify-center items-center space-y-[16px]  bg-white py-[16px] rounded-[8px] shadow-lg w-[303px] h-auto relative">
          <div className="w-[114px] h-[121px] flex flex-col justify-center items-center space-y-[8px]">
            {uploadedImage ? (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded Brand Logo"
                className="w-[95px] h-[95px] object-cover rounded-full"
              />
            ) : (
              <label htmlFor="fileUpload" className="cursor-pointer">
                <UploadIcon />
              </label>
            )}
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              ref={fileInputRef}
            />
            <p
              onClick={triggerFileUpload}
              className="font-poppins font-normal text-[12px] leading-[18px] text-[#001D58]"
            >
              {uploadedImage ? "Change Logo" : "Upload Brand Logo"}
            </p>
          </div>
          <input
            type="text"
            placeholder="Enter Brand Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[271px] h-[53px] gap-[8px] rounded-[8px] border-[1px] border-[#E5E5E5] p-[16px] bg-white font-poppins font-normal text-[14px] leading-[21px] text-[#949494] outline-none "
          />

          <div className="flex justify-center items-center w-[271px] h-[57px] gap-[24px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px]"
            >
              Go Back
            </button>
            <button className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px]">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrandModalTwo;
