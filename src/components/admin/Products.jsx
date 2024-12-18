import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const tabs = ["Name", "Product ID", "Category", "Stock", "Price"];
  // const products = [
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  //   {
  //     id: 1,
  //     productId: 12,
  //     name: "Mgr Financial Plan ",
  //     category: "Contact Lenses",
  //     stock: 543,
  //     price: 233,
  //   },
  // ];
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://13.212.26.131:8080/product/getAll",
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="flex flex-col justify-center items-start">
      <AdminHeader title="Products" />
      <div className="flex flex-col justify-start items-start mt-6 w-full h-[887px] rounded-[20px] p-[24px] gap-[20px] bg-[#FFFFFF]">
        <div className="flex justify-start items-center gap-8">
          <div className="flex justify-between items-center w-[868px] h-[49px] bg-[#F8F8F8] rounded-[8px] py-[8px] pl-[16px] pr-[8px] gap-[16px]">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21.5C16.7467 21.5 21 17.2467 21 12C21 6.75329 16.7467 2.5 11.5 2.5C6.25329 2.5 2 6.75329 2 12C2 17.2467 6.25329 21.5 11.5 21.5Z"
                stroke="#434343"
                stroke-width="1.5"
              />
              <path
                d="M18.5 19L22 22.5"
                stroke="#434343"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search here..."
              className="w-[918px] h-[18px] py-4 bg-[#F8F8F8] outline-none"
            />
            <div className="flex w-[77px] h-[33px] bg-[#FFFFFF] rounded-[8px] py-[6px] px-[8px] gap-[8px]">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 10.5H15M2.5 5.5H17.5M7.5 15.5H12.5"
                  stroke="#344054"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#344054]">
                Filter
              </p>
            </div>
          </div>
          <div
            onClick={() => navigate("/admin/list-product")}
            className="w-[175px] h-[48px] rounded-[8px] bg-[#F8F8F8] py-[17px] px-[12px] gap-[8px] flex justify-center items-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8H15M8 15V1"
                stroke="#434343"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
              Add Product
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start w-[1108px] h-[724px] bg-white rounded-[20px]  space-y-[16px]">
          <div className="flex flex-col justify-start items-center w-full overflow-y-auto h-[780px] ">
            {/* Table Headings */}
            <div className="w-full h-[50px] py-[16px] px-[20px] gap-[67px]  flex justify-start items-center">
              <div className="w-[250px] h-[20px] flex justify-start items-start gap-[16px] ">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                  }}
                  className="w-[20px] h-[20px] rounded-[6px] border-[1px] border-[#D0D5DD]"
                />
                <h1 className="w-[116.84px] h-[18px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                  Name
                </h1>
              </div>
              <h1 className="w-[116.84px] h-[18px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Product ID
              </h1>
              <h1 className="w-[116.84px] h-[18px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Category
              </h1>
              <h1 className="w-[116.84px] h-[18px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Stock
              </h1>
              <h1 className="w-[116.84px] h-[18px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Price
              </h1>
            </div>
            {/* Orders Listing */}
            {products.map((p) => (
              <div className="w-full h-[50px] py-[16px] px-[20px] gap-[67px] flex justify-start items-center">
                <div className="w-[250px] h-[32px] flex justify-start items-center gap-[16px]">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    className="w-[20px] h-[20px] rounded-[6px] border-[1px] border-[#D0D5DD]"
                  />
                  <img
                    src={p?.imageUrls[0]?.imageUrl}
                    alt="product image"
                    className="w-[32px] h-[32px]"
                  />
                  <h1 className="w-[116.84px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                    {p.name}
                  </h1>
                </div>
                <h1 className="w-[116.84px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                  {p.productId}
                </h1>
                <h1 className="w-[116.84px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                  {p.categoryId}
                </h1>
                <h1 className="w-[116.84px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                  {p.stockQuantity}
                </h1>
                <h1 className="w-[116.84px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                  ${p.price}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
