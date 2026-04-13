import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    } catch (error) {
      console.log(error);
    }
  };


  const [trackingData, setTrackingData] = useState(null);

  const getOrderTrackingInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/ordertracking/byOrderId/${orderId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setTrackingData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
    getOrderTrackingInfo();
  }, [getAllOrders, getOrderTrackingInfo]);

  return (
    <div className="flex justify-center items-start w-full min-h-screen bg-[#F8F8F8] py-8">
      <div className="flex flex-col justify-start items-start w-full max-w-[1200px] p-[32px] mt-20 space-y-[16px] rounded-[16px] bg-white">
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
        {selectedIndex === 0 && (
          <div className="flex w-full gap-6">
            <div className="flex flex-col w-[60%] h-auto rounded-[12px] gap-[16px]">
              <div className="flex flex-col justify-start items-start w-full h-auto rounded-[12px] border-[1px] p-[24px] space-y-[28px] bg-white border-[#0000000D]">
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
                          <div key={index} className={`flex w-full items-center gap-4 border-[#0000001A] pb-4 ${index !== products.length - 1 && "border-b-[1px]"}`}>
                            <img
                              src={order?.imageUrl?.[0] || "/assets/product8.png"}
                              alt="product"
                              className="w-[60px] h-[60px] rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col justify-center space-y-1">
                              <p className="font-poppins font-normal text-sm text-primaryText">
                                {order.productName}
                              </p>
                              <p className="text-sm font-semibold font-poppins capitalize text-primaryText">
                                $ {order.unitPrice}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                if (orders?.orderStatus === "DELIVERED") {
                                  setSelectedProduct(order);
                                  setIsViewReview(false);
                                  SetIsFeedbackOpen(true);
                                  setSelectedProductId(order.productId);
                                }
                              }}
                              disabled={orders?.orderStatus !== "DELIVERED"}
                              className={`flex justify-center items-center w-[113px] h-[32px] rounded-[33px] border-[1px] py-[4px] px-[8px] transition-colors flex-shrink-0 ${orders?.orderStatus === "DELIVERED"
                                  ? "border-[#F69B26] bg-[#F69B261A] cursor-pointer hover:bg-[#F69B2630]"
                                  : "border-[#DDDDDD] bg-[#F5F5F5] cursor-not-allowed"
                                }`}
                            >
                              <p className={`font-poppins font-normal text-[10px] leading-[15px] ${orders?.orderStatus === "DELIVERED"
                                  ? "text-[#F69B26]"
                                  : "text-[#999999]"
                                }`}>
                                Leave Review
                              </p>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
            <div className="flex flex-col w-[40%] space-y-[16px]">
              <div className="flex flex-col w-full rounded-[12px] border-[1px] border-[#0000000D] p-[16px] space-y-[12px]">
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

              <div className="flex flex-col w-full rounded-[12px] border-[1px] border-[#0000000D] p-[16px]">
                <div className="flex justify-between items-center">
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
                    Grand Total
                  </p>
                  <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
                    $ {orders?.totalAmount}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full rounded-[12px] border-[1px] border-[#0000000D] p-[16px]">
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
              <div className="flex flex-col w-full rounded-[12px] border-[1px] border-[#0000000D] bg-white">
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
        {selectedIndex === 1 && (
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
                    {orders?.expectedDeliveryDate || "TBD"}
                  </p>
                </div>
                <div className="hidden md:block h-[24px] border-[1px] border-[#0000000D]"></div>
                <div className="flex items-start justify-between w-full gap-[8px]">
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#909198]">
                    Tracking ID
                  </p>
                  <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    {trackingData?.data?.[0]?.trackingId || orders?.trackingId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start space-y-[16px] w-full rounded-[8px] border-[1px] border-[#0000000D] py-[16px] px-[24px] bg-white">
              <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#393A44]">
                Order Status
              </h1>
              <div className="border-[1px] border-[#E5E7EB] w-full"></div>

              {/* Progress Bar and Labels Container */}
              <div className="flex w-full py-[16px] px-[8px]">
                {/* Order Placed (BOOKED) */}
                <div className="flex flex-col items-start gap-[12px] flex-1">
                  <div className="flex items-center w-full">
                    <Icons.OrderCheckIcon
                      fill={
                        orders?.orderStatus === "BOOKED" ||
                          orders?.orderStatus === "PENDING" ||
                          orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "#7DD3DD"
                          : "#DDDDDD"
                      }
                    />
                    <div
                      className={`flex-1 h-[2px] mx-[8px] ${orders?.orderStatus === "BOOKED" ||
                          orders?.orderStatus === "PENDING" ||
                          orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "bg-[#7DD3DD]"
                          : "bg-[#DDDDDD]"
                        }`}
                    ></div>
                  </div>
                  <div className="flex items-start gap-[8px]">
                    <Icons.OrderPending
                      fill={
                        orders?.orderStatus === "BOOKED" ||
                          orders?.orderStatus === "PENDING" ||
                          orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "#7DD3DD"
                          : "#DDDDDD"
                      }
                    />
                    <div className="flex flex-col space-y-[2px]">
                      <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                        Order Placed
                      </p>
                    </div>
                  </div>
                </div>

                {/* In Progress (PENDING) */}
                <div className="flex flex-col items-start gap-[12px] flex-1">
                  <div className="flex items-center w-full">
                    <Icons.OrderCheckIcon
                      fill={
                        orders?.orderStatus === "PENDING" ||
                          orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "#7DD3DD"
                          : "#DDDDDD"
                      }
                    />
                    <div
                      className={`flex-1 h-[2px] mx-[8px] ${orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "bg-[#001D58]"
                          : "bg-[#DDDDDD]"
                        }`}
                    ></div>
                  </div>
                  <div className="flex items-start gap-[8px]">
                    <Icons.OrderInProgress
                      stroke={
                        orders?.orderStatus === "PENDING" ||
                          orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "#7DD3DD"
                          : "#DDDDDD"
                      }
                    />
                    <div className="flex flex-col space-y-[2px]">
                      <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                        In Progress
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipped (SHIPPED) */}
                <div className="flex flex-col items-start gap-[12px] flex-1">
                  <div className="flex items-center w-full">
                    <Icons.OrderCheckIcon
                      fill={
                        orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "#001D58"
                          : "#DDDDDD"
                      }
                    />
                    <div
                      className={`flex-1 h-[2px] mx-[8px] ${orders?.orderStatus === "DELIVERED"
                          ? "bg-[#001D58]"
                          : "bg-[#DDDDDD]"
                        }`}
                    ></div>
                  </div>
                  <div className="flex items-start gap-[8px]">
                    <Icons.OrderShipped
                      fill={
                        orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "#001D58"
                          : "#DDDDDD"
                      }
                      stroke={
                        orders?.orderStatus === "SHIPPED" ||
                          orders?.orderStatus === "DELIVERED"
                          ? "#001D58"
                          : "#DDDDDD"
                      }
                    />
                    <div className="flex flex-col space-y-[2px]">
                      <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                        Shipped
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivered (''DELIVERED'') */}
                <div className="flex flex-col items-start gap-[12px]">
                  <div className="flex items-center">
                    <Icons.OrderCheckIcon
                      fill={
                        orders?.orderStatus === "DELIVERED"
                          ? "#001D58"
                          : "#DDDDDD"
                      }
                    />
                  </div>
                  <div className="flex items-start gap-[8px]">
                    <Icons.OrderDelivered
                      fill={
                        orders?.orderStatus === "DELIVERED"
                          ? "#001D58"
                          : "#DDDDDD"
                      }
                    />
                    <div className="flex flex-col space-y-[2px]">
                      <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                        Delivered
                      </p>
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
