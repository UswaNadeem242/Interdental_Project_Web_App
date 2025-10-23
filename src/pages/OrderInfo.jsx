import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import FeedbackModal from "../modals/FeedbackModal";
import axios from "axios";
import { BASE_URL } from "../config";
import Icons from "../components/Icons";

const Orders = () => {
  const tabs = ["Order Detail", "Track Order"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFeedbackOpen, SetIsFeedbackOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewReview, setIsViewReview] = useState(false);
  const [isShippingDetailsOpen, setIsShippingDetailsOpen] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState();

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/orders/getOrderByID/${orderId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setOrders(response.data);
      console.log(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };


  const getOrderTrackingInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/ordertracking/${orderId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data, 'ORDER TRACKING INFO');
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
    getOrderTrackingInfo();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-auto py-8 bg-[#F8F8F8]">
      <div className="flex flex-col justify-start items-start w-[1200px] p-[32px] space-y-[16px] rounded-[16px] bg-white mt-20">
        <div className="flex justify-start items-center gap-2">
          <div
            onClick={() => navigate(-1)}
            className="flex justify-center cursor-pointer items-center bg-[#F7F8F8] w-[32px] h-[32px] rounded-[8px]"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </div>
          <p className="font-poppins font-semibold text-[24px] leading-[36px] text-black">
            Order Detail
          </p>
        </div>
        <div className="flex justify-start items-center w-[335px] h-[55px] rounded-[12px] border-[1px] border-[#0000001A] gap-[8px] p-[8px]">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={
                index === selectedIndex
                  ? "w-[342.67px] h-[39px] text-center font-poppins font-semibold text-[14px] leading-[21px] rounded-[12px] py-[8px] px-[16px] gap-[16px] text-[#434343] bg-[#F8F8F8] cursor-pointer"
                  : "w-[342.67px] h-[39px] text-center font-poppins font-normal text-[14px] leading-[21px] rounded-[12px] py-[8px] px-[16px] gap-[16px] text-[#949494] cursor-pointer"
              }
            >
              <p className="">{tab}</p>
            </div>
          ))}
        </div>
        {selectedIndex == 0 && (
          <div className="flex w-[1136px] gap-4">
            <div className="flex flex-col justify-between items-center w-[560px] h-auto rounded-[12px] gap-[16px]">
              <div className="flex flex-col justify-start items-start w-[560px] h-auto rounded-[12px] border-[1px] p-[24px] space-y-[28px] bg-white border-[#0000000D]">
                {orders?.orderItems && (() => {
                  // Group products by category
                  const groupedProducts = orders.orderItems.reduce((acc, product) => {
                    const category = product.categoryName || "Uncategorized";
                    if (!acc[category]) {
                      acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                  }, {});

                  return Object.entries(groupedProducts).map(([categoryName, products], categoryIndex) => (
                    <div key={categoryIndex} className="w-full space-y-[16px]">
                      <div className="flex justify-start items-center">
                        <p className="font-poppins font-semibold text-[16px] leading-[24px] text-[#434343]">
                          {categoryName}
                        </p>
                      </div>
                      <div className="w-full space-y-[16px] flex flex-col items-start">
                        {products.map((order, index) => (
                          <div key={index} className={`flex w-full h-[60px] gap-[4px] border-[#0000001A] pb-4 ${index !== products.length - 1 && "border-b-[1px]"}`}>
                            <img
                              src={order?.imageUrl?.[0] || "/assets/product8.png"}
                              alt="product"
                              className="w-[60px] h-[60px] rounded-md p-[5.16px] gap-[5.16px]"
                            />
                            <div className="flex w-[444px] h-[46px] gap-[4px]">
                              <div className="flex flex-col justify-start items-start w-[357px] h-[46px] space-y-[4px]">
                                <p className="font-poppins font-normal text-sm text-primaryText">
                                  {order.productName}
                                </p>
                                <p className="text-sm font-semibold font-poppins capitalize text-primaryText">
                                  $ {order.unitPrice}
                                </p>
                              </div>
                            </div>
                            {order.ratings && order.ratings.length > 0 ? (
                              <button
                                onClick={() => {
                                  setSelectedProduct(order);
                                  setIsViewReview(true);
                                  SetIsFeedbackOpen(true);
                                }}
                                className="flex justify-center items-center w-[113px] h-[23px] rounded-[33px] border-[1px] border-[#10B981] bg-[#10B9811A] py-[4px] px-[8px] cursor-pointer hover:bg-[#10B98130] transition-colors"
                              >
                                <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#10B981]">
                                  View Review
                                </p>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedProduct(order);
                                  setIsViewReview(false);
                                  SetIsFeedbackOpen(true);
                                  setSelectedProductId(order.productId);
                                }}
                                className="flex justify-center items-center w-[113px] h-[23px] rounded-[33px] border-[1px] border-[#F69B26] bg-[#F69B261A] py-[4px] px-[8px] cursor-pointer hover:bg-[#F69B2630] transition-colors"
                              >
                                <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#F69B26]">
                                  Leave Review
                                </p>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
            <div className="flex flex-col w-[560px] space-y-[16px]">
              <div className="flex flex-col w-[560px] rounded-[12px] border-[1px] border-[#0000000D] p-[16px] space-y-[12px]">
                <div className="flex justify-between items-center">
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
                    Product Subtotal
                  </p>
                  <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
                    ${orders?.totalAmount}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
                    Shipping 
                  </p>
                  <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
                    free
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-[560px] rounded-[12px] border-[1px] border-[#0000000D] p-[16px]">
                <div className="flex justify-between items-center">
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
                    Grand Total
                  </p>
                  <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
                    $ {orders?.totalAmount}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-[560px] rounded-[12px] border-[1px] border-[#0000000D] p-[16px]">
                <div className="flex justify-between items-center">
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
                    Order Status
                  </p>
                  <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
                    {orders?.orderStatus}
                  </p>
                </div>
              </div>

              {/* Shipping Details Collapsible Section */}
              <div className="flex flex-col w-[560px] rounded-[12px] border-[1px] border-[#0000000D] bg-white">
                <div
                  className="flex justify-between items-center p-[16px] cursor-pointer transition-colors"
                  onClick={() => setIsShippingDetailsOpen(!isShippingDetailsOpen)}
                >
                  <p className="font-poppins text-[14px] leading-[21px] text-[#434343]">
                    Shipping Detail
                  </p>
                  {isShippingDetailsOpen ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {isShippingDetailsOpen && (
                  <div className="px-[16px] pb-[16px] space-y-[12px]">
                    <div className="space-y-[4px]">
                      <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#909198]">
                        Shipping Address
                      </p>
                      <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
                        {orders?.shippingAddress || "No shipping address provided"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {selectedIndex == 1 && (
          <div className="flex flex-col justify-start items-start space-y-6 w-full">
            {/* Delivery Detail */}
            <div className="flex flex-col justify-start items-start w-full rounded-[12px] border-[1px] border-[#0000000D] p-[24px] bg-white space-y-[16px]">
              <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#434343]">
                Delivery Detail
              </h1>
              <div className="border-[1px] border-[#0000000D] w-full"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                <div className="flex items-start justify-between w-full gap-[8px]">
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#909198]">
                    Expected Delivery Date
                  </p>
                  <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    {orders?.expectedDeliveryDate || "23 Sep 2023"}
                  </p>
                </div>
                <div className="hidden md:block h-[24px] border-[1px] border-[#0000000D]"></div>
                <div className="flex items-start justify-between w-full gap-[8px]">
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#909198]">
                    Tracking ID
                  </p>
                  <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    {orders?.trackingId || "TYRGSH465Y6443"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start space-y-[8px] w-[1136px] h-[148px] rounded-[8px] border-[1px] border-[#0000000D] py-[8px] px-[16px] bg-white">
              <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                Order Status
              </h1>
              <div className="border-[1px] border-[#0000000D] w-full"></div>
              <div className="flex flex-col justify-start items-start w-[1104px] h-[87px] py-[8px] px-[16px] space-y-[8px]">
                <div className="flex justify-start items-center w-[820px] h-[18px] gap-[4px]">
                  <Icons.OrderCheckIcon fill="#94D3DD" />
                  <div
                    className={`w-[250px] rounded-[10px] h-[2px] ${orders.orderStatus === "PENDING"
                      ? "bg-[#001D58]"
                      : "bg-[#94D3DD]"
                      }`}
                  ></div>
                  <Icons.OrderCheckIcon
                    fill={
                      orders.orderStatus === "PENDING" ? "#001D58" : "#94D3DD"
                    }
                  />
                  <div
                    className={`w-[250px] rounded-[10px] h-[2px] ${orders.orderStatus === "SHIPED"
                      ? "bg-[#001D58]"
                      : orders.orderStatus === "PENDING"
                        ? "bg-[#DDDDDD]"
                        : "bg-[#94D3DD]"
                      }`}
                  ></div>
                  <Icons.OrderCheckIconVariant
                    fill={
                      orders.orderStatus === "SHIPED"
                        ? "#001D58"
                        : orders.orderStatus === "PENDING"
                          ? "#DDDDDD"
                          : "#94D3DD"
                    }
                  />

                  <div
                    className={`w-[250px] rounded-[10px] h-[2px] ${orders.orderStatus === "DELIVERD"
                      ? "bg-[#94D3DD]"
                      : "bg-[#DDDDDD]"
                      }`}
                  ></div>
                  <Icons.OrderCheckIcon
                    fill={
                      orders.orderStatus === "DELIVERD" ? "#94D3DD" : "#DDDDDD"
                    }
                  />
                </div>

                <div className="flex gap-[8px] w-[1032px] h-[37px]">
                  <div className="flex justify-start items-center w-[237px] h-[68px] gap-[8px]">
                    <Icons.OrderPending fill="#94D3DD" />
                    <div className="flex flex-col justify-start items-start space-y-[1px] ">
                      <p className="font-poppins font-semibold text-[12px] leading-[18px]">
                        Order Placed
                      </p>
                      {/* <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
                        12 sep 2024, 04:25 PM
                      </p> */}
                    </div>
                  </div>
                  <div className="flex justify-start items-center w-[237px] h-[68px] gap-[8px]">
                    <Icons.OrderInProgress
                      stroke={
                        orders.orderStatus === "PENDING" ? "#001D58" : "#94D3DD"
                      }
                    />

                    <div className="flex flex-col justify-start items-start space-y-[1px] ">
                      <p className="font-poppins font-semibold text-[12px] leading-[18px]">
                        In Progress
                      </p>
                      {/* <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
                        12 sep 2024, 04:25 PM
                      </p> */}
                    </div>
                  </div>
                  <div className="flex justify-start items-center w-[237px] h-[68px] gap-[8px]">
                    <Icons.OrderShipped
                      fill={
                        orders.orderStatus === "SHIPED"
                          ? "#001D58"
                          : orders.orderStatus === "PENDING"
                            ? "#949494"
                            : "#94D3DD"
                      }
                      stroke={
                        orders.orderStatus === "SHIPED"
                          ? "#001D58"
                          : orders.orderStatus === "PENDING"
                            ? "#949494"
                            : "#94D3DD"
                      }
                    />

                    <div className="flex flex-col justify-start items-start space-y-[1px] ">
                      <p className="font-poppins font-semibold text-[12px] leading-[18px]">
                        Shipped
                      </p>
                      {/* <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
                        12 sep 2024, 04:25 PM
                      </p> */}
                    </div>
                  </div>
                  <div className="flex justify-start items-center w-[237px] h-[68px] gap-[8px]">
                    <Icons.OrderDelivered
                      fill={
                        orders.orderStatus === "DELIVERD"
                          ? "#94D3DD"
                          : "#949494"
                      }
                    />

                    <div className="flex flex-col justify-start items-start space-y-[1px] ">
                      <p className="font-poppins font-semibold text-[12px] leading-[18px]">
                        Delivered
                      </p>
                      {/* <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
                        12 sep 2024, 04:25 PM
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isFeedbackOpen && (
        <FeedbackModal
          fetchOrders={getAllOrders}
          isModalOpen={isFeedbackOpen}
          setIsModalOpen={SetIsFeedbackOpen}
          productId={selectedProductId}
          selectedProduct={selectedProduct}
          isViewReview={isViewReview}
        />
      )}
    </div>
  );
};

export default Orders;
