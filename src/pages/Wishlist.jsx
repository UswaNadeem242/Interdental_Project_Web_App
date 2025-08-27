import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import Toast from "../components/Toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  const getWishlist = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
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
    <div className="flex justify-center items-center w-full h-auto pb-36 bg-gray-100">
      <div className="w-[1320px] h-auto flex flex-col justify-start items-start space-y-4 mt-4">
        <h1 className="font-workSans font-semibold text-[20px] leading-[23.46px] tet-[#000000]">
          Wishlist
        </h1>
        <div className="flex flex-wrap justify-start items-center gap-[32px] w-full h-auto">
          {wishlist?.map((item) => (
            <div className="flex flex-col justify-start items-start space-y-[24px] bg-white border-[1px] border-[#0000000D] rounded-[16px] p-[20px] w-[303.15] h-auto">
              <div className="w-[263.15px] h-[264px] bg-gray-400"></div>
              {/* <img
                                     className="w-[263.15px] h-[264px] bg-gray-400"
                                      src={item.}
                                      alt={`product-${index}`}
                                    /> */}
              <div className="flex flex-col justify-center items-center space-y-[7.55px] w-[263.15px] h-auto">
                <p className="font-poppins font-semibold text-[16px] leading-[24px] text-[#000000]">
                  {item.productName}
                </p>
                <p className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD]">
                  ${item.price}
                </p>
                <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494] text-center">
                  {item?.description}
                </p>
              </div>
              <div className="flex justify-start items-center gap-[16px] w-[263.15px] h-[56.89px]">
                <div className="flex justify-start items-center gap-[2px] h-[31px]">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.46536 1.70259L10.8868 4.54539C11.0783 4.93854 11.5924 5.31154 12.0259 5.39218L14.5965 5.81558C16.2397 6.08776 16.6228 7.2773 15.4433 8.46684L13.4372 10.4729C13.1045 10.8056 12.913 11.4608 13.0239 11.9346L13.5985 14.4145C14.0521 16.3702 13.0037 17.1364 11.2799 16.1081L8.87059 14.6766C8.43711 14.4145 7.71129 14.4145 7.27781 14.6766L4.86849 16.1081C3.14467 17.1263 2.09626 16.3702 2.5499 14.4145L3.12451 11.9346C3.21524 11.4508 3.0237 10.7955 2.69103 10.4628L0.684946 8.45676C-0.494512 7.2773 -0.11144 6.08776 1.53174 5.8055L4.10235 5.3821C4.53583 5.31154 5.04995 4.92846 5.24149 4.53531L6.66288 1.69251C7.43911 0.160227 8.68913 0.160227 9.46536 1.70259Z"
                      fill="#FFC700"
                    />
                  </svg>
                  <p className="font-poppins font-normal text-[17.09px] leading-[30.76px] text-[#585858]">
                    5.0
                  </p>
                </div>
                <button
                  onClick={() => handleAddtoCart(item)}
                  className="w-[131.24px] h-[56px] rounded-[32px] bg-[#0137641A] py-[17px] px-[24px]"
                >
                  <p className="font-poppins font-semibold text-[13px] leading-[21px] text-[#013764] ">
                    {loading ? "Adding..." : "Add to Cart"}
                  </p>
                </button>
                <svg
                  width="58"
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
                      fill="#001D58"
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
  );
};

export default Wishlist;
