import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
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
      console.log(response.data.orders);
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
    <div className="flex justify-center items-center w-full h-auto py-8 bg-[#F8F8F8]">
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
                    console.log("-=-=-==-=--=click=--==--=-=-=-=", order);
                    navigate(`/order-info/${order.orderId}`);
                  }}
                  className="flex flex-col justify-center items-center w-[522px] h-[151px] rounded-[8px] space-y-[8px] py-[8px] bg-[#FFFFFF] shadow-[0_0_4px_0_#0000000A]"
                >
                  {/* Top section with date */}
                  <div className="flex justify-start items-center w-full h-[16px] gap-[8px] px-[8px]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.859778 1.84202C0.947102 1.58005 1.23026 1.43847 1.49223 1.52579L1.69516 1.59344C2.11274 1.73261 2.46563 1.85023 2.74311 1.97932C3.03807 2.11653 3.294 2.2866 3.48806 2.55585C3.68213 2.82509 3.76253 3.12167 3.79943 3.44488C3.81828 3.60994 3.82689 3.79501 3.83082 4.00014H10.9679C12.3378 4.00014 13.0228 4.00014 13.3192 4.44964C13.6156 4.89915 13.3458 5.52876 12.8061 6.78797L12.5204 7.45464C12.2685 8.04254 12.1425 8.33648 11.892 8.50164C11.6416 8.6668 11.3218 8.6668 10.6821 8.6668H3.93625C4.00625 9.02672 4.11667 9.23734 4.27346 9.39413C4.45797 9.57864 4.71702 9.69894 5.2062 9.7647C5.70977 9.83241 6.37718 9.83347 7.33412 9.83347H12.0008C12.2769 9.83347 12.5008 10.0573 12.5008 10.3335C12.5008 10.6096 12.2769 10.8335 12.0008 10.8335H7.29753C6.38581 10.8335 5.65093 10.8335 5.07295 10.7558C4.47288 10.6751 3.96763 10.5025 3.56635 10.1012C3.16508 9.69996 2.99248 9.19471 2.9118 8.59464C2.8341 8.01666 2.83411 7.28178 2.83412 6.37005L2.83412 4.58883C2.83412 4.1135 2.83336 3.79899 2.80589 3.55831C2.77987 3.33042 2.73444 3.22049 2.67682 3.14056C2.61921 3.06062 2.52929 2.98276 2.32132 2.88601C2.10168 2.78383 1.80355 2.68366 1.35261 2.53335L1.17601 2.47448C0.914034 2.38715 0.772454 2.10399 0.859778 1.84202Z"
                        fill="#949494"
                      />
                    </svg>
                    <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#434343]">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>

                  {/* Order body */}
                  <div className="flex justify-center items-center w-full h-[111px] border-t-[1px] border-[#0000001A] p-[8px] gap-[8px]">
                    <img
                      src="/assets/product8.png"
                      alt="product"
                      className="w-[95px] h-[95px]"
                    />
                    <div className="w-[403px] h-[89px] space-y-[4px] flex flex-col justify-center items-start">
                      <div className="w-[60px] h-[23px] py-[4px] px-[8px] rounded-[32px] bg-[#1F27EF0D]">
                        <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#1F27EF]">
                          {/* {order.orderStatus} */}
                          {/* {statusNames[order?.orderStatus] || order.orderStatus} */}
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
