import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config";
import { useAuth } from "../auth/AuthContext";
import Toast from "./Toast";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
        },
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
      setCount(Math.max(0, count - 1));
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
        },
      );
      getCart();
    } catch (error) {}
  };
  const closeToast = () => {
    setToastVisible(false);
  };
  return (
    <div className="flex justify-center items-center w-[587px] h-[188px] rounded-[16px] border-[1px] border-cartColor space-y-[24px] p-[16px] bg-[#FFFFFF]">
      {/* <div className="flex justify-center items-center w-[555px] h-[156px] gap-[16px]">
        <div className="flex justify-between items-center w-[515px] h-[156px] gap-[16px] ">
          <img
            src={item?.imageUrl[0]}
            alt="product"
            className="w-[115.13px]  h-[131.94px]"
          />
          <div className="flex flex-col justify-start items-start w-[373.87px] h-[156px] gap-[8px]">
            <h1 className="text-black text-base font-semibold font-poppins capitalize">{item.productName}</h1>
            <p className="text-xs font-poppins capitalize text-secondaryText">{item?.description}</p>
            <h1 className="text-primaryText font-poppins font-medium">${item.price}</h1>
            <div className="flex justify-between items-center w-[124px] h-[50px] rounded-[170px] border-[1px] border-cartColor p-[8px]">
              <button onClick={() => handleUpdateItem("subtract", item)} className="cursor-pointer bg-background w-9 h-9 flex justify-center items-center rounded-full">

                <MinusIcon className="text-secondaryText w-5 h-5  " />
              </button>
              <h1>{count}</h1>

              <button o onClick={() => handleUpdateItem("add", item)} className="cursor-pointer bg-background w-9 h-9 flex justify-center items-center rounded-full ">
                <PlusIcon className="text-secondaryText w-5 h-5 font-bold" />
              </button>
            </div>
          </div>
        </div>
        <button className="cursor-pointer border w-6 h-6  flex justify-center items-center rounded-full"
          onClick={() => handleDeleteItem()}>

          <XMarkIcon className="w-4 h-4" />
        </button>
      </div> */}

      <div className="flex justify-center items-center w-[555px] h-[156px] gap-[16px]">
        <div className="flex justify-between items-center w-[515px] h-[156px] gap-[16px]   p-3">
          {/* Product Image */}
          <img
            src={item?.imageUrl[0]}
            alt="product"
            className="w-[115.13px] h-[131.94px] object-cover rounded-md"
          />

          {/* Product Details */}
          <div className="flex flex-col justify-between w-[373.87px] h-full">
            <div>
              <h1 className="text-black text-base font-semibold font-poppins capitalize truncate">
                {item.productName}
              </h1>
              <p
                className="text-xs font-poppins capitalize text-secondaryText line-clamp-2 overflow-hidden"
                style={{ maxHeight: "2.5rem" }} // prevents extra lines
              >
                {item?.description}
              </p>
            </div>

            <h1 className="text-primaryText font-poppins font-medium">
              ${item.price}
            </h1>

            {/* Quantity Controls */}
            <div className="flex justify-between items-center w-[124px] h-[50px] rounded-[170px] border border-cartColor p-2">
              <button
                onClick={() => handleUpdateItem("subtract", item)}
                className="cursor-pointer bg-background w-9 h-9 flex justify-center items-center rounded-full"
              >
                <MinusIcon className="text-secondaryText w-5 h-5" />
              </button>

              <h1>{count}</h1>

              <button
                onClick={() => handleUpdateItem("add", item)}
                className="cursor-pointer bg-background w-9 h-9 flex justify-center items-center rounded-full"
              >
                <PlusIcon className="text-secondaryText w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Delete Icon */}
        <button
          className="cursor-pointer border w-6 h-6 flex justify-center items-center rounded-full"
          onClick={() => handleDeleteItem()}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
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
