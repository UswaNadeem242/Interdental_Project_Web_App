import React, { useEffect, useState, useRef } from "react";
// import Group from "../assets/Group.png";
import axios from "axios";
import { BASE_URL } from "../config";

const AddQuantityModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedProducts,
  getAllProducts
}) => {
  const [name, setName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [productQuantities, setProductQuantities] = useState(
    selectedProducts.reduce((acc, product) => {
      acc[product.productId] = 0;
      return acc;
    }, {})
  );
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddQuantity = async () => {
    const emptyProducts = Object.entries(productQuantities).filter(
      ([productId, quantity]) => !quantity || Number(quantity) <= 0
    );

    if (emptyProducts.length > 0) {
      alert("Please enter quantity for all products");
      return; // Stop execution
    }
    try {
      const payload = Object.entries(productQuantities).map(
        ([productId, quantityToAdd]) => ({
          productId: Number(productId),
          quantityToAdd: Number(quantityToAdd),
        })
      );
      const response = await axios.put(
        `${BASE_URL}/api/admin/products/add-stock`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); 
      alert("Quantity added successfully");
      getAllProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantity(value);
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
       <div className="w-[572px] h-[541px] gap-[32px]">
        <div className="flex flex-col justify-center items-center space-y-[32px]  bg-white p-[44px] rounded-[24px] shadow-lg w-[572px] h-auto relative">
          <h1 className="w-[508px] h-[36px] font-poppins font-bold text-[24px] leading-[36px] text-[#434343]">
            Update Product Quantities
          </h1>
          <div className="flex flex-col justify-start items-start w-[484px] h-[296px] rounded-[16px] border-[1px] border-[#0000000D] p-[16px] space-y-[16px] bg-white">
            <p className="w-[221px] h-[24px] font-poppins font-semibold text-[16px] leading-[24px] text-[#434343]">
              {selectedProducts.length}{" "}
              {selectedProducts.length > 1 ? `Variants` : "Variant"} Will Be
              Changed
            </p>
            {selectedProducts &&
              selectedProducts.map((product) => (
                <div className="w-[452px] h-[54px] border-b-[1px] border-[#E5E5E5] p-[16px] flex justify-start items-center bg-white gap-[8px]">
                  <p className="w-[315.5px] h-[21px] font-poppins font-normal text-[14px] leading-[21px] text-[#585858]">
                    {product.name}
                  </p>
                  <div className="w-[96.5px] h-[32px] flex justify-between items-center gap-[4px]">
                    <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
                      {product.stockQuantity}
                      {/* {productQuantities[product.productId]} */}
                    </p>
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.25 0.25C4.6642 0.25 5 0.58579 5 1V3.25H7.25C7.6642 3.25 8 3.5858 8 4C8 4.4142 7.6642 4.75 7.25 4.75H5V7C5 7.4142 4.6642 7.75 4.25 7.75C3.8358 7.75 3.5 7.4142 3.5 7V4.75H1.25C0.83579 4.75 0.5 4.4142 0.5 4C0.5 3.5858 0.83579 3.25 1.25 3.25H3.5V1C3.5 0.58579 3.8358 0.25 4.25 0.25Z"
                        fill="#434343"
                      />
                    </svg>

                    <input
                      type="text"
                      value={productQuantities[product.productId]}
                      onChange={(e) =>
                        handleQuantityChange(product.productId, e.target.value)
                      }
                      className="w-[57px] h-[32px] font-poppins font-normal text-[16px] leading-[24px] text-[#949494] rounded-[6px] border-[1px] border-[#0000001A] py-[4px] px-[8px] gap-[8px]"
                    />
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center items-center w-[484px] h-[57px] gap-[24px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[230px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px]"
            >
              Cancel
            </button>
            <button
              onClick={handleAddQuantity}
              className="flex justify-center items-center w-[230px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuantityModal;
