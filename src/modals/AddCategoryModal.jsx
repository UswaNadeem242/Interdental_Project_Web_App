import React, { useState } from "react";
// import Group from "../assets/Group.png";
import axios from "axios";
import { BASE_URL } from "../config";

const AddCategoryModal = ({
  isModalOpen,
  getAllCategories,
  setIsModalOpen,
  categoriesList,
}) => {
  const [name, setName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCategory = async () => {
    if (!name) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const payload = {
        name,
        parentCategoryId,
      };
      const response = await axios.post(
        `${BASE_URL}/api/category/addCategory`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
       if (response.data.responseCode === "0000") {
        console.log(response);
        getAllCategories();
        alert("Categroy added successfully");
        setIsModalOpen(false);
      } else if (response.data.responseCode === "1500") {
 
        alert("Categroy Already Exsist");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("❌ Error:");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 flex md:items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-[303px]  gap-4 m-32">
        <div className="flex flex-col justify-center items-center space-y-[16px]  bg-white py-[16px] rounded-[8px] shadow-lg w-[303px] h-auto relative">
          <h1 className="font-poppins font-semibold text-[16px] leading-[21px] text-[#434343]">
            Add New Category
          </h1>
          <div className="w-[271px] h-[82px] flex flex-col space-y-[8px]">
            <label
              htmlFor=""
              className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Categroy Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[271px] h-[53px] gap-[8px] rounded-[8px] border-[1px] border-[#E5E5E5] p-[16px] bg-white font-poppins font-normal text-[14px] leading-[21px] text-[#949494] outline-none "
            />
          </div>
          <div className="w-[271px] flex flex-col space-y-2">
            <label className="font-poppins font-semibold text-[14px] text-[#434343]">
              Parent Category
            </label>

            <div className="relative w-full">
              {/* Dropdown Toggle */}
              <div
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex justify-between items-center w-full h-[53px] cursor-pointer rounded-[8px] border border-[#E5E5E5] px-4"
              >
                <p className="text-[14px] text-[#949494]  placeholder:font-poppins">
                  {categoriesList?.find(
                    (category) => category.categoryId === parentCategoryId
                  )?.name || "Enter Parent Category"}
                </p>
                <svg
                  width="14"
                  height="7"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7061 0.862378C12.2309 0.337599 13.0816 0.337599 13.6064 0.862378C14.1311 1.38716 14.1311 2.23784 13.6064 2.76262L8.23137 8.13767C7.97946 8.38967 7.63761 8.53125 7.28124 8.53125C6.92488 8.53125 6.58303 8.38967 6.33112 8.13767L0.956071 2.76262C0.431309 2.23784 0.431309 1.38716 0.956071 0.862379C1.48083 0.3376 2.33166 0.3376 2.85642 0.862378L7.28124 5.28708L11.7061 0.862378Z"
                    fill="#434343"
                  />
                </svg>
              </div>

              {/* Dropdown List */}
              {isCategoryOpen && (
                <div className="absolute top-[60px] left-0 w-full max-h-[200px] bg-white rounded-[8px] shadow-md overflow-y-auto z-50">
                  {categoriesList?.map((category, index) => (
                    <div
                      key={category.categoryId}
                      onClick={() => {
                        setParentCategoryId(category.categoryId);
                        setIsCategoryOpen(false);
                      }}
                      className={`flex justify-between items-center px-4 py-2 cursor-pointer text-[12px] text-[#828386] ${index < categoriesList.length - 1 ? "border-b border-[#E5E5E5]" : ""
                        }`}
                    >
                      <span>{category.name}</span>
                      <input
                        type="radio"
                        checked={parentCategoryId === category.categoryId}
                        readOnly
                        className="w-4 h-4 accent-[#D2D4DA]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


          <div className="flex justify-center items-center w-[271px] h-[57px] gap-[24px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px]"
            >
              Go Back
            </button>
            <button
              onClick={handleAddCategory}
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

export default AddCategoryModal;
