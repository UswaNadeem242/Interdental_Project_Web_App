import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config";
import { useAuth } from "../auth/AuthContext";
import Toast from "./Toast";
// import product1 from "../assets/product1.png";

const CartProduct = ({ item, getCart }) => {
  const [count, setCount] = useState(item.quantity);
  const { fetchCartCount } = useAuth();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const handleDeleteItem = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/cart/${item.id}/remove`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
       setToastMessage("Item removed from cart");
      fetchCartCount();
      setToastType("success");
      setToastVisible(true);
      getCart();
    } catch (error) {
      setToastMessage(`Error: ${error}`);
      setToastType("error");
      setToastVisible(true);
    }
  };
  const handleUpdateItem = async (status, items) => {
     if (status === "add" && items.stockItem <= count) {
      setToastMessage("This item is currently out of stock.");
      setToastType("error");
      setToastVisible(true);
      return;
    } else if (status === "add") {
      setCount(count + 1);
    } else if (status === "subtract") {
      if (count === 1) {
        handleDeleteItem();
      }
      setCount(count - 1);
    }
    try {
      const response = await axios.put(
        `${BASE_URL}/api/cart/${item.id}/update`,
        {
          cartItemId: item.id,
          quantity: status === "add" ? count + 1 : count - 1,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getCart();
    } catch (error) {}
  };
  const closeToast = () => {
    setToastVisible(false);
  };
  return (
    <div className="flex justify-center items-center w-[587px] h-[188px] rounded-[16px] border-[1px] border-[#0000000D] space-y-[24px] p-[16px] bg-[#FFFFFF]">
      <div className="flex justify-center items-center w-[555px] h-[156px] gap-[16px]">
        <div className="flex justify-between items-center w-[515px] h-[156px] gap-[16px] ">
          <img
            src={item?.imageUrl[0]}
            alt="product"
            className="w-[115.13px] rounded-[20px] h-[131.94px]"
          />
          <div className="flex flex-col justify-start items-start w-[373.87px] h-[156px] gap-[8px]">
            <h1>{item.productName}</h1>
            {/* <h1>Prouct description here</h1> */}
            <h1>${item.price}</h1>
            <div className="flex justify-between items-center w-[124px] h-[50px] rounded-[170px] border-[1px] border-[#0000000D] p-[8px]">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={() => handleUpdateItem("subtract", item)}
              >
                <rect
                  x="0.134766"
                  y="0.690247"
                  width="34"
                  height="34"
                  rx="17"
                  fill="#F2F2F2"
                />
                <path
                  d="M12.4688 17.6902H21.8021"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h1>{count}</h1>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={() => handleUpdateItem("add", item)}
              >
                <rect
                  x="0.134766"
                  y="0.690247"
                  width="34"
                  height="34"
                  rx="17"
                  fill="#F2F2F2"
                />
                <path
                  d="M12.4688 17.6902H21.8021M17.1354 13.0236V22.3569V13.0236Z"
                  stroke="#1A1A1A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={() => handleDeleteItem()}
        >
          <g clip-path="url(#clip0_13855_2364)">
            <path
              d="M12 23.6902C18.0748 23.6902 23 18.765 23 12.6902C23 6.6155 18.0748 1.69025 12 1.69025C5.92525 1.69025 1 6.6155 1 12.6902C1 18.765 5.92525 23.6902 12 23.6902Z"
              stroke="#CCCCCC"
              stroke-miterlimit="10"
            />
            <path
              d="M16 8.69025L8 16.6902"
              stroke="#666666"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 16.6902L8 8.69025"
              stroke="#666666"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_13855_2364">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0 0.690247)"
              />
            </clipPath>
          </defs>
        </svg>
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

export default CartProduct;
