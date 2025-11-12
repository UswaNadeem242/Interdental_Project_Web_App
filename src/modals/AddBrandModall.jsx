import React, { useEffect, useState, useRef } from "react";
// import Group from "../assets/Group.png";

const AddBrandModall = ({ isModalOpen, getAllBrands, setIsModalOpen }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

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
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const handleAddBrand = async () => {
  //   if (!name || !description || !uploadedImage) {
  //     alert("Please fill all the fields");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();

  //     // Append the image file (File object from input)
  //     formData.append("image", uploadedImage);

  //     // Append the brand object with proper MIME type
  //     const brandData = { name, description };
  //     formData.append(
  //       "brand",
  //       new Blob([JSON.stringify(brandData)], { type: "application/json" })
  //     );

  //     const response = await axios.post(
  //       `${BASE_URL}/api/brands/addbrand`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           // ❌ don't manually set multipart/form-data
  //           // axios + browser will set correct boundary
  //         },
  //       }
  //     );

  //     if (
  //       response.data.data.responseCode === "0000" ||
  //       response.data.responseCode === "200"
  //     ) {
  //       console.log("✅ Success:", response.data);
  //       getAllBrands();
  //       setIsModalOpen(false);
  //       alert("Brand added successfully");
  //     }
  //   } catch (error) {
  //     alert(error.response.data.responseDesc);
  //     console.error("❌ Error:");
  //     setIsModalOpen(false);
  //   }
  // };

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
                <svg
                  width="95"
                  height="95"
                  viewBox="0 0 95 95"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_14178_12766)">
                    <rect
                      width="95"
                      height="95"
                      rx="47.5"
                      fill="#EF6A1F"
                      fillOpacity="0.05"
                    />
                    <circle cx="47.5" cy="47.5" r="47.5" fill="#F8F8F8" />
                    <path
                      d="M59.1245 51.3748V56.5414C59.1245 57.2266 58.8523 57.8836 58.3679 58.3681C57.8834 58.8526 57.2263 59.1248 56.5412 59.1248H38.4578C37.7727 59.1248 37.1156 58.8526 36.6312 58.3681C36.1467 57.8836 35.8745 57.2266 35.8745 56.5414V51.3748"
                      stroke="#001D58"
                      strokeWidth="2.58333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M53.9596 42.3328L47.5013 35.8745L41.043 42.3328"
                      stroke="#001D58"
                      strokeWidth="2.58333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M47.5 35.8745V51.3745"
                      stroke="#001D58"
                      strokeWidth="2.58333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_14178_12766">
                      <rect width="95" height="95" rx="47.5" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
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
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[271px] h-[53px] gap-[8px] rounded-[8px] border-[1px] border-[#E5E5E5] p-[16px] bg-white font-poppins font-normal text-[14px] leading-[21px] text-[#949494] outline-none "
          />
          <div className="flex justify-center items-center w-[271px] h-[57px] gap-[24px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px]"
            >
              Go Back
            </button>
            <button
              // onClick={handleAddBrand}
              className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px]"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrandModall;
