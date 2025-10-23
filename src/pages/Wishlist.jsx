import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

import { useAuth } from "../auth/AuthContext";
import { ChevronLeftIcon, StarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toast-slice";
import BackButton from "../components/BackButton";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null); // Track which item is being added
  const { fetchWishlistCount, fetchCartCount } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setWishlist(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/wishlist/${id}/remove`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(
        showToast({
          message: "Product Removed From Wishlist!",
          type: "success",
        }),
      );
      fetchWishlistCount();
      getWishlist();
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          message: `Error: ${error}`,
          type: "error",
        }),
      );
    }
  };

  const handleAddtoCart = async (item) => {
    console.log(item);
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(
        showToast({
          message: "Access Denied. Please login first.",
          type: "error",
        }),
      );
      return;
    }

    // Check if stock quantity exists and is valid
    // if (
    //   !item ||
    //   item.stockQuantity === undefined ||
    //   item.stockQuantity === null
    // ) {
    //   setToastMessage("Unable to check stock availability.");
    //   setToastType("error");
    //   setToastVisible(true);
    //   return;
    // }

    // if (item.stockQuantity <= 0) {
    //   setToastMessage("No stock remaining for this item!");
    //   setToastType("error");
    //   setToastVisible(true);
    //   dispatch(
    //     showToast({
    //       message: "No stock remaining for this item!",
    //       type: "error",
    //     }),
    //   );
    //   return;
    // }

    try {
      setAddingToCart(item.productId);
      const payload = {
        id: item.productId,
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

      // {
      //     "responseCode": "098",
      //     "responseMessage": "Stock is less than the desired quantity"
      // }
      //

      if (response.data.responseCode === "098") {
        dispatch(
          showToast({
            message: response.data.responseMessage,
            type: "error",
          }),
        );
        setAddingToCart(null);
        return;
      }

      if (response.data.responseCode === "1500") {
        dispatch(
          showToast({
            message: "Please try again later.",
            type: "error",
          }),
        );
        setAddingToCart(null);
        return;
      }

      fetchCartCount();
      dispatch(showToast({ message: "Added to Cart!", type: "success" }));
      setAddingToCart(null);
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          message: "Failed to add item to cart.",
          type: "error",
        }),
      );
      setAddingToCart(null);
    }
  };
  const handleProductClick = (item) => {
    navigate(`/shop/${item.productId}`); //  /product/:id
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center w-full   pb-36 px-20">
        <div className="w-[1320px] h-auto flex flex-col justify-start items-start space-y-4   mt-28">
          <div className="flex justify-start items-center gap-2">
            <div
              onClick={() => navigate(-1)}
              className="flex justify-center cursor-pointer items-center bg-[#F7F8F8] w-[32px] h-[32px] rounded-[8px]"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </div>
            <p className="font-poppins font-semibold text-2xl leading-[36px] text-black">
              Wishlist
            </p>
          </div>
          <div className="flex flex-wrap justify-start items-center gap-[32px] w-full h-auto">
            {loading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </>
            ) : wishlist.length === 0 ? (
              <div className="w-full flex justify-center items-center py-20">
                <p className="font-poppins text-gray-500 text-2xl">
                  Your wishlist is empty...
                </p>
              </div>
            ) : (
              wishlist?.map((item) => (
                <div
                  onClick={() => handleProductClick(item)}
                  className="flex flex-col justify-start items-start space-y-[24px] bg-white border-[1px] border-[#0000000D] rounded-[16px] p-[20px] w-[303.15] h-auto"
                >
                  <img
                    className="w-[263.15px]   h-[264px] bg-gray-400"
                    src={item?.imageUrls[0]}
                    alt={item?.productName || "Product image"}
                  />
                  <div className="flex flex-col justify-center items-center space-y-[7.55px] w-[263.15px] h-auto">
                    <p className="font-poppins font-semibold text-[16px] leading-[24px] text-[#000000]">
                      {item.productName}
                    </p>
                    <p className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD] flex gap-3">
                      ${item.price}{" "}
                      <span className="flex items-center ">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-poppins font-normal text-[#585858]">
                          5.0
                        </span>
                      </span>
                    </p>
                    <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494] text-center">
                      {item?.description}
                    </p>
                  </div>
                  <div className="flex justify-start items-center    ">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddtoCart(item);
                      }}
                      disabled={addingToCart === item.productId}
                      className="text-xs text-secondaryBrand font-poppins bg-background px-16 py-5 rounded-full capitalize hover:bg-secondaryBrand hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* <p className="font-poppins font-semibold text-[13px] leading-[21px] text-[#013764] "> */}
                      {addingToCart === item.productId
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>
                    <svg
                      width="70"
                      height="57"
                      viewBox="0 0 58 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      // onClick={() => handleRemoveItem(item.id)}
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ prevents handleProductClick from firing
                        handleRemoveItem(item.id);
                      }}
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
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
