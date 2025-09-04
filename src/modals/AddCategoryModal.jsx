import React, { useEffect, useState, useRef } from "react";
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
  const [categoryId, setCategoryId] = useState(0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

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
      console.log(response.data.responseCode);
      if (response.data.responseCode === "0000") {
        console.log(response);
        getAllCategories();
        alert("Categroy added successfully");
        setIsModalOpen(false);
      } else if (response.data.responseCode === "1500") {
        console.log("==-=-==-=--=-==--=-=dsfsafsdfsdfsfdsfdsffs");

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
          <div className="w-[271px] h-[82px] flex flex-col space-y-[8px]">
            <label
              htmlFor=""
              className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
            >
              Parent Category
            </label>
            <div className="relative w-full">
              <div
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                }}
                className="flex justify-start items-center w-[271px] h-[53px] cursor-pointer outline-none rounded-[8px] border-[1px] px-[16px] gap-[8px] border-[#E5E5E5]"
              >
                <p className="w-[271px] h-[21px] font-poppins font-normal text-[14px] leading-[21px] text-[#949494]">
                  {categoriesList?.find(
                    (category) => category.categoryId === parentCategoryId
                  )?.name || "Select Parent Category"}
                </p>
                <svg
                  width="14"
                  height="9"
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
              {isCategoryOpen && (
                <div className="absolute w-[271px] h-auto bg-white rounded-[8px] p-[16px] flex flex-col justify-start items-start space-y-[16px] z-50 shadow-[0_4px_4px_0_#00000017]">
                  <div
                    //   onClick={() => setIsAddCategoryModal(true)}
                    className="w-[132px] h-[24px] flex justify-start items-center gap-[4px] cursor-pointer"
                  >
                    <div className="w-[24px] h-[24px] flex justify-center items-center">
                      <div className="w-[20px] h-[20px] flex justify-center items-center bg-[#F5FBFC">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 0.25C4.4142 0.25 4.75 0.58579 4.75 1V3.25H7C7.4142 3.25 7.75 3.5858 7.75 4C7.75 4.4142 7.4142 4.75 7 4.75H4.75V7C4.75 7.4142 4.4142 7.75 4 7.75C3.5858 7.75 3.25 7.4142 3.25 7V4.75H1C0.58579 4.75 0.25 4.4142 0.25 4C0.25 3.5858 0.58579 3.25 1 3.25H3.25V1C3.25 0.58579 3.5858 0.25 4 0.25Z"
                            fill="#001D58"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#001D58]">
                      Add Category
                    </p>
                  </div>
                  <div className=" h-[190px]  overflow-y-scroll">
                    {categoriesList?.map((category) => (
                      <div className="w-[271px] flex flex-col  justify-start items-start space-y-[8px]">
                        <div
                          onClick={() => {
                            setParentCategoryId(category.categoryId);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-[245px] h-[28px] py-[10px] flex justify-start items-center gap-[2px] bg-white cursor-pointer ${
                            categoriesList.indexOf(category) ===
                            categoriesList.length - 1
                              ? ""
                              : "border-b-[1px] border-[#0000000D]"
                          }`}
                        >
                          <p className="w-[271px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#828386]">
                            {category.name}
                          </p>
                          <input
                            type="radio"
                            name=""
                            id=""
                            className="w-[16px] h-[16px] accent-[#D2D4DA]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
