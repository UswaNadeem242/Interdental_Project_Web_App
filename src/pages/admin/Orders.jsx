import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import FilterOptionsDropdown from "../../components/dropdowns/FilterOptionsDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";

const Orders = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const tabs = ["All", "Pending", "Shipped", "Completed"];

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/getAllOrders`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(response.data.orders);
      console.log(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  const filteredOrders = orders
    // 1️⃣ Tab filter
    .filter((order) => {
      if (selectedIndex === 0) return true; // All
      if (selectedIndex === 1) return order.orderStatus === "PENDING";
      if (selectedIndex === 2) return order.orderStatus === "SHIPED";
      if (selectedIndex === 3) return order.orderStatus === "DELIVERD";
      return true;
    })
    // 2️⃣ Search filter
    .filter((order) => {
      if (!searchTerm) return true;
      return (
        order?.name &&
        order?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  return (
    <div className="flex flex-col justify-center items-start ">
      {/* <AdminHeader title="Orders" /> */}
      <div className="flex flex-col justify-start items-start mt-6 w-full h-[887px] rounded-[20px] p-[24px] gap-[20px] bg-[#FFFFFF]">
        <div className="flex justify-between items-center w-full h-[49px] bg-[#F8F8F8] rounded-[8px] py-[8px] pl-[16px] pr-[8px] gap-[8px]">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-col relative">
            {/* <div
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex w-[77px] h-[33px] bg-[#FFFFFF] rounded-[8px] py-[6px] px-[8px] gap-[8px]"
            >
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
            </div> */}
            {isFilterOpen && <FilterOptionsDropdown />}
          </div>
        </div>
        <div className="w-[529px] h-[40px] gap-[8px] flex justify-start items-center">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`${
                index === selectedIndex &&
                "bg-[#F8F8F8] border-b-[1px] border-[#0000001A] "
              } flex justify-center items-center w-auto h-[40px] cursor-pointer rounded-[39px] py-[17px] px-[18px] gap-[8px] border-l-[1px] border-r-[1px] border-b-[1px] border-[#0000001A]`}
            >
              <p className="font-poppins font-bold text-[12px] leading-[18px] text-[#434343]">
                {tab}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-start items-start w-[1108px] h-[724px] bg-white rounded-[20px]  space-y-[16px]">
          <div className="flex flex-col justify-start items-center w-full overflow-y-auto h-[780px] pt-4">
            {/* Table Headings */}
            <div className="w-full h-[50px] py-[16px] px-[20px] gap-[67px]  flex justify-start items-center">
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Order ID
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Buyer Name
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Status
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Date
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Total
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Items
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                Action
              </h1>
            </div>
            {/* Orders Listing */}
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  onClick={() => navigate(`/admin/orders/${order.orderId}`)}
                  className="w-full h-[50px] py-[16px] px-[20px] gap-[67px] flex justify-start items-center cursor-pointer"
                >
                  <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
                    #{order?.orderId}
                  </h1>
                  <h1 className="w-[116.84px] h-[88px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                    {order?.name}
                  </h1>
                  <div className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                    <div className="w-[57px] h-[23px] py-[4px] px-[8px] gap-[8px] bg-[#FF57570D] rounded-[33px]">
                      <h1 className="font-poppins font-normal text-[10px] leading-[15px] text-[#EF6A1F]">
                        {order?.orderStatus}
                      </h1>
                    </div>
                  </div>
                  <h1 className="w-[116.84px] h-[88px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(order.createdAt))}
                  </h1>
                  <h1 className="w-[116.84px] h-[88px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                    {order.orderItems.reduce(
                      (acc, item) => acc + item.unitPrice,
                      0
                    )}
                  </h1>
                  <h1 className="w-[116.84px] h-[88px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                    {order.orderItems.length}
                  </h1>
                  <div className="flex flex-row w-[116.84px]">
                    <h1 className=" h-[88px] mr-[12px] font-poppins font-normal text-[12px] leading-[18px] text-[#285772]">
                      View Detail
                    </h1>
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.999878 7L6.99988 1M6.99988 1H2.49988M6.99988 1V5.5"
                        stroke="#285772"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <p>
                No orders found for the status of <b>"{tabs[selectedIndex]}"</b>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
