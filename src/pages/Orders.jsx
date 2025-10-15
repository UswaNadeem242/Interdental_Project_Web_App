import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
import CartOrderIcon from "../icon/cart-order-icon";
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
        }
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
        return order.orderStatus === "SHIPED";
      if (tabs[selectedIndex] === "Completed")
        return order.orderStatus === "COMPLETED";

      return true;
    });
 
  const statusNames = {
    SHIPPED: "SHIPPED",
    PENDING: "PENDING",
    DELIVERED: "DELIVERED",
  };

  return (
    <div className="flex justify-center items-center w-full h-auto py-8 bg-[#F8F8F8] pt-28">
      <div className="flex flex-col justify-start items-start w-[1124px] h-[505px] p-[32px] space-y-[16px] rounded-[16px] bg-white ">
        <p className="font-poppins font-semibold text-[24px] leading-[36px] text-black">
          Orders
        </p>

        <div className="flex justify-start items-center w-[1060px] h-[55px] rounded-[12px] border-[1px] border-[#0000001A] gap-[8px] p-[8px]">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={
                index === selectedIndex
                  ? "w-[342.67px] h-[39px] text-center font-poppins font-semibold text-[14px] leading-[21px] rounded-[12px] py-[8px] px-[16px] gap-[16px] text-[#434343] bg-[#F8F8F8]"
                  : "w-[342.67px] h-[39px] text-center font-poppins font-normal text-[14px] leading-[21px] rounded-[12px] py-[8px] px-[16px] gap-[16px] text-[#949494]"
              }
            >
              <p className="">{tab}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center w-full flex-wrap gap-[16px]">
          <div className="grid grid-cols-2 gap-4 h-[300px] overflow-y-auto pr-2">
            {filteredOrders.length > 0 &&
              filteredOrders.map((order) => (
                <div
                  key={order.orderId}
                  onClick={() => {
                    navigate(`/order-info/${order.orderId}`);
                  }}
                  className="flex flex-col justify-center items-center w-[522px] h-[151px] rounded-[8px] space-y-[8px] py-[8px] bg-[#FFFFFF]  shadow-[0px_0px_16px_2px_rgba(0,0,0,0.04)]"
                >
                  {/* Top section with date */}
                  <div className="flex justify-start items-center w-full h-[16px] gap-[8px] px-[8px]">
                    <CartOrderIcon />
                    <p className="font-poppins font-normal text-xs leading-[15px] text-[#434343]">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>

                  {/* Order body */}
                  <div className="flex justify-center items-center w-full h-[111px] border-t-[1px] border-[#0000001A] p-[8px] gap-[8px]">
                    <img
                      src={order?.orderItems[0]?.imageUrl || "/assets/product8.png"}
                      alt="product"
                      className="w-[95px] h-[95px]"
                    />
                    <div className="w-[403px] h-[89px] space-y-[4px] flex flex-col justify-center items-start">
                      <div className="w-[60px] h-[23px] py-[4px] px-[8px] rounded-[32px] bg-[#1F27EF0D]">
                        <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#1F27EF]">

                          {order?.orderStatus === 'SHIPED' ? 'SHIPPED' : order?.orderStatus === 'PENDING' ? 'PENDING' : order?.orderStatus === 'DELIVERD' && 'DELIVERD'}

                        </p>
                      </div>
                      <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
                        {order.name}
                      </p>
                      <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#949494]">
                        {order.orderItems.length} products
                      </p>
                      <div className="flex justify-start items-center gap-[4px]">
                        <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#949494]">
                          Total Shopping:
                        </p>
                        <div className="font-poppins font-normal text-[12.06px] leading-[18.1px]">
                          <span>$</span>
                          <span className="font-poppins font-bold text-[12.06px] leading-[18.1px]">
                            {order.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
