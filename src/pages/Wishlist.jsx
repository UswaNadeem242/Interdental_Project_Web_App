import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import Toast from "../components/Toast";
import { useAuth } from "../auth/AuthContext";
import { StarIcon } from "@heroicons/react/24/outline";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);
  const { fetchWishlistCount } = useAuth();
  const getWishlist = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setWishlist(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);
  const closeToast = () => {
    setToastVisible(false);
  };
  const handleRemoveItem = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/wishlist/${id}/remove`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setToastMessage("Product Removed From Wishlist !");
      setToastType("success");
      setToastVisible(true);
      fetchWishlistCount();
      getWishlist();
    } catch (error) {
      console.log(error);
      setToastMessage(`Error: ${error}`);
      setToastType("error");
      setToastVisible(true);

    }
  };

  const handleAddtoCart = async (item) => {
    console.log(item);
    try {
      setLoading(true);
      const payload = {
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        quantity: 1,
        price: item.price,
        totalPrice: item.price,
      };
      const response = await axios.post(`${BASE_URL}/api/cart/add`, payload, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setToastMessage("Added to Cart !");
      setToastType("success");
      setToastVisible(true);
      setLoading(false);
    } catch (error) {
      setToastMessage(`Error: ${error}`);
      setToastType("error");
      setToastVisible(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center w-full   pb-36 px-20">
        <div className="w-[1320px] h-auto flex flex-col justify-start items-start space-y-4   mt-28">
          <h1 className="font-workSans font-semibold text-[20px] leading-[23.46px] tet-[#000000]">
            Wishlist
          </h1>
          <div className="flex flex-wrap justify-start items-center gap-[32px] w-full h-auto">
            {wishlist?.map((item) => (
              <div className="flex flex-col justify-start items-start space-y-[24px] bg-white border-[1px] border-[#0000000D] rounded-[16px] p-[20px] w-[303.15] h-auto">
                <img
                  className="w-[263.15px]   h-[264px] bg-gray-400"
                  src={item?.imageUrls[0]}
                />
                <div className="flex flex-col justify-center items-center space-y-[7.55px] w-[263.15px] h-auto">
                  <p className="font-poppins font-semibold text-[16px] leading-[24px] text-[#000000]">
                    {item.productName}
                  </p>
                  <p className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD] flex gap-3">
                    ${item.price}   <span className="flex items-center ">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-poppins font-normal text-[#585858]">5.0</span>
                    </span>
                  </p>
                  <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494] text-center">
                    {item?.description}
                  </p>
                </div>
                <div className="flex justify-start items-center    ">

                  <button
                    onClick={() => handleAddtoCart(item)}
                    className="text-xs text-secondaryBrand font-poppins bg-background px-16 py-5 rounded-full capitalize hover:bg-secondaryBrand hover:text-white"
                  >
                    {/* <p className="font-poppins font-semibold text-[13px] leading-[21px] text-[#013764] "> */}
                    {loading ? "Adding..." : "Add to Cart"}

                  </button>
                  <svg
                    width="70"
                    height="57"
                    viewBox="0 0 58 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleRemoveItem(item.id)}
                    className="cursor-pointer"
                  >
                    <g filter="url(#filter0_b_14344_10747)">
                      <rect
                        x="0.261719"
                        y="0.109863"
                        width="56.8901"
                        height="56.8901"
                        rx="28.4451"
                        fill="#F8F8F8"
                      />
                      <path
                        d="M28.7069 39.2826C5.01268 26.1864 21.5989 11.9696 28.7069 20.9594C35.8157 11.9696 52.402 26.1864 28.7069 39.2826Z"
                        fill="#FF0000"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_b_14344_10747"
                        x="-21.4364"
                        y="-21.5883"
                        width="100.287"
                        height="100.286"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur
                          in="BackgroundImageFix"
                          stdDeviation="10.8491"
                        />
                        <feComposite
                          in2="SourceAlpha"
                          operator="in"
                          result="effect1_backgroundBlur_14344_10747"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_backgroundBlur_14344_10747"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Toast
          message={toastMessage}
          isVisible={toastVisible}
          onClose={closeToast}
          type={toastType}
        />
      </div>
    </div>

  );
};

export default Wishlist;
