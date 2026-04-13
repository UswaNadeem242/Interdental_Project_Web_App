import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
import CartOrderIcon from "../icon/cart-order-icon";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// import product8 from "../assets/product8.png";

const Orders = () => {
  const tabs = ["All", "Shipped", "Completed"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/orders/getAllOrdersByUser`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  // filter logic
  const filteredOrders =
    orders &&
    orders.filter((order) => {
      if (tabs[selectedIndex] === "All") return true;
      if (tabs[selectedIndex] === "Shipped")
        return order.orderStatus === "SHIPPED";
      if (tabs[selectedIndex] === "Completed")
        return order.orderStatus === "COMPLETED";

      return true;
    });

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#F8F8F8] pt-28 pb-8 px-4">
      <div className="w-full max-w-[1312px]">
        {/* <div className="mb-4">
          <BackButton variant="rounded" text="Back" />
        </div> */}

        {/* Orders Container */}
        <div className="flex flex-col justify-start items-start w-full h-auto p-6 md:p-8 space-y-4 rounded-2xl bg-white shadow-sm">
          <h1 className="font-poppins flex gap-2 items-center  font-semibold text-2xl text-black">
            <div
              onClick={()=>navigate(-1)}
            className="h-7 w-7 flex items-center cursor-pointer justify-center rounded-md bg-[#F7F8F8]">
              <ChevronLeftIcon className="h-5 w-5 " />
            </div>
            Orders
          </h1>

          {/* Tabs */}
          <div className="flex justify-start items-center w-full rounded-xl border border-gray-100 gap-2 p-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`flex-1 py-2 px-4 rounded-lg font-poppins text-sm transition-colors ${index === selectedIndex
                  ? "font-semibold text-[#434343] bg-[#F8F8F8]"
                  : "font-normal text-[#949494] hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {filteredOrders.length > 0 &&
                filteredOrders.map((order) => (
                  <div
                    key={order.orderId}
                    onClick={() => navigate(`/order-info/${order.orderId}`)}
                    className="flex flex-col w-full rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                  >
                    {/* Date Header */}
                    <div className="flex items-center gap-2 px-3 py-2">
                      <CartOrderIcon />
                      <p className="font-poppins text-xs text-[#434343]">
                        {new Date(order.createdAt).toDateString()}
                      </p>
                    </div>

                    {/* Order Details */}
                    <div className="flex items-center w-full border-t border-gray-100 p-3 gap-3">
                      <img
                        src={
                          order?.orderItems[0]?.imageUrl ||
                          "/assets/product8.png"
                        }
                        alt="product"
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-center space-y-1">
                        <div className="inline-flex w-fit py-1 px-2 rounded-full bg-blue-50">
                          <p className="font-poppins text-[10px] text-blue-600">
                            {order?.orderStatus === "SHIPPED"
                              ? "SHIPPED"
                              : order?.orderStatus === "PENDING"
                                ? "PENDING"
                                : order?.orderStatus === "DELIVERED" &&
                                "DELIVERED"}
                          </p>
                        </div>
                        <p className="font-poppins font-semibold text-sm text-[#434343] line-clamp-1">
                          {order.name}
                        </p>
                        <p className="font-poppins text-[10px] text-gray-500">
                          {order.orderItems.length} products
                        </p>
                        <div className="flex items-center gap-1">
                          <p className="font-poppins text-[10px] text-gray-500">
                            Total Shopping:
                          </p>
                          <p className="font-poppins text-sm">
                            $
                            <span className="font-bold">
                              {order.totalAmount}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <CartOrderIcon />
                </div>
                <p className="font-poppins text-gray-500 text-lg">
                  No orders found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
