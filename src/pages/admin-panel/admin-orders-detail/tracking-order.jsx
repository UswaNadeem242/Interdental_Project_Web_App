import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getOrderByID } from "../../../api/doctorDasboard";
import Icons from "../../../components/Icons";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { format, parseISO } from "date-fns";

// Order status constants
const ORDER_STATUS = {
  BOOKED: "BOOKED",
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
};

// Color constants
const STEP_COLORS = {
  COMPLETED_LIGHT: "#7DD3DD",
  COMPLETED_DARK: "#001D58",
  INCOMPLETE: "#DDDDDD",
};

export default function TrackingOrderAdmin({ id, setIsModalOpen }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format date utility function
  const formatDate = useCallback((dateString) => {
    if (!dateString || dateString === "-") return "-";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "-" : format(date, "dd-MM-yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "-";
    }
  }, []);

  // Format timestamp utility function - with proper timezone handling
  const formatShortTimestamp = useCallback((dateString) => {
    if (!dateString) return "";
    try {
      // Check if the string has timezone information
      const hasTimezone =
        dateString.includes("Z") ||
        dateString.includes("+") ||
        dateString.includes("-", 10);

      let date;
      if (hasTimezone) {
        // Has timezone info, parse normally
        date = parseISO(dateString);
      } else {
        // No timezone info, assume it's UTC and add 'Z' to make it explicit
        const utcString = dateString + "Z";
        date = parseISO(utcString);
      }

      if (isNaN(date.getTime())) return "";

      return format(date, "d MMM yyyy, hh:mm aaa").replace(/am|pm/gi, (match) =>
        match.toUpperCase()
      );
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "";
    }
  }, []);

  // Extract tracking ID
  const trackingId = useMemo(
    () => trackingData?.[0]?.trackingId || "N/A",
    [trackingData]
  );

  // Get tracking info for a specific status
  const getTrackingForStatus = useCallback(
    (status) => trackingData.find((item) => item.status === status),
    [trackingData]
  );

  // Check if a status has been reached
  const hasReachedStatus = useCallback(
    (status) => trackingData.some((item) => item.status === status),
    [trackingData]
  );

  // Determine if a step should be shown as completed
  const isStepCompleted = useCallback(
    (step) => {
      const statusHierarchy = {
        [ORDER_STATUS.BOOKED]: [ORDER_STATUS.BOOKED],
        [ORDER_STATUS.PENDING]: [
          ORDER_STATUS.BOOKED, // PENDING is completed when BOOKED exists
          ORDER_STATUS.PENDING,
          ORDER_STATUS.SHIPPED,
          ORDER_STATUS.DELIVERED,
        ],
        [ORDER_STATUS.SHIPPED]: [ORDER_STATUS.SHIPPED, ORDER_STATUS.DELIVERED],
        [ORDER_STATUS.DELIVERED]: [ORDER_STATUS.DELIVERED],
      };

      const requiredStatuses = statusHierarchy[step] || [];
      return requiredStatuses.some((status) => hasReachedStatus(status));
    },
    [hasReachedStatus]
  );

  // Get the appropriate color for each step
  const getStepColor = useCallback(
    (step) => {
      if (!isStepCompleted(step)) return STEP_COLORS.INCOMPLETE;

      const isLightStep =
        step === ORDER_STATUS.BOOKED || step === ORDER_STATUS.PENDING;
      return isLightStep
        ? STEP_COLORS.COMPLETED_LIGHT
        : STEP_COLORS.COMPLETED_DARK;
    },
    [isStepCompleted]
  );

  // Fetch order details
  const fetchOrderDetails = useCallback(async () => {
    try {
      const response = await getOrderByID(id);
      if (response.status === 200) {
        setOrderDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }, [id]);

  // Fetch order tracking
  const fetchOrderTracking = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/api/ordertracking/byOrderId/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.responseStatus) {
        setTrackingData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching order tracking:", error);
    }
  }, [id]);

  // Fetch all data on mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     await Promise.all([fetchOrderDetails(), fetchOrderTracking()]);
  //     setIsLoading(false);
  //   };

  //   if (id) {
  //     fetchData();
  //   }
  // }, [id, fetchOrderDetails, fetchOrderTracking]);

  //Altered
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (id) {
        await Promise.all([fetchOrderDetails(), fetchOrderTracking()]);
      } else {
        console.warn("No ID provided — showing empty UI");
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id, fetchOrderDetails, fetchOrderTracking]);

  // Render delivery detail row (responsive)
  const DeliveryDetailRow = ({ label, value }) => (
    <div className="flex flex-col md:flex-row md:col-span-6 md:items-center md:justify-between p-2 md:border-r-2 md:last:border-r-0 gap-1 md:gap-2">
      <h3 className="text-[#909198] capitalize text-sm font-poppins font-semibold">
        {label}
      </h3>
      <h3 className="text-tertiaryBrand font-semibold">{value}</h3>
    </div>
  );

  // Render order status step (responsive - horizontal on desktop, vertical on mobile)
  const OrderStatusStep = ({
    status,
    icon: Icon,
    label,
    isLast = false,
    iconProps = {},
  }) => {
    const tracking = getTrackingForStatus(status);
    const stepColor = getStepColor(status);
    const nextStatus =
      status === ORDER_STATUS.BOOKED
        ? ORDER_STATUS.PENDING
        : status === ORDER_STATUS.PENDING
        ? ORDER_STATUS.SHIPPED
        : ORDER_STATUS.DELIVERED;

    // For PENDING status, use BOOKED date if PENDING doesn't exist
    const displayTracking =
      status === ORDER_STATUS.PENDING
        ? tracking || getTrackingForStatus(ORDER_STATUS.BOOKED)
        : tracking;

    return (
      <>
        {/* Desktop Layout - Horizontal (only on lg and above) */}
        <div
          className={`hidden lg:flex flex-col items-start gap-[12px] ${
            isLast ? "" : "flex-1"
          }`}
        >
          <div className="flex items-center w-full">
            <Icons.OrderCheckIcon fill={stepColor} />
            {!isLast && (
              <div
                className={`flex-1 h-[2px] mx-[8px] ${
                  isStepCompleted(nextStatus)
                    ? status === ORDER_STATUS.BOOKED
                      ? "bg-[#7DD3DD]"
                      : "bg-[#001D58]"
                    : "bg-[#DDDDDD]"
                }`}
              />
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-start gap-[8px]">
              <Icon {...iconProps} />
              <div className="flex flex-col space-y-[2px]">
                <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                  {label}
                </p>
                {displayTracking && (
                  <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#909198]">
                    {formatShortTimestamp(displayTracking.createdAt)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout - Vertical (on mobile and md screens) */}
        <div className="flex lg:hidden items-start gap-[12px] w-full">
          <div className="flex flex-col items-center">
            <Icons.OrderCheckIcon fill={stepColor} />
            {!isLast && (
              <div
                className={`w-[2px] h-[40px] my-[8px] ${
                  isStepCompleted(nextStatus)
                    ? status === ORDER_STATUS.BOOKED
                      ? "bg-[#7DD3DD]"
                      : "bg-[#001D58]"
                    : "bg-[#DDDDDD]"
                }`}
              />
            )}
          </div>
          <div className="flex items-start gap-[12px] flex-1">
            <Icon {...iconProps} />
            <div className="flex flex-col space-y-[2px]">
              <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                {label}
              </p>
              {displayTracking && (
                <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#909198]">
                  {formatShortTimestamp(displayTracking.createdAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white p-8 mt-8 rounded-2xl">
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading tracking information...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="">
        {/* Delivery Details Section */}

        {/* Order Status Section */}
        <div className="bg-white mt-5 rounded-lg">
          <div className="  p-4 rounded-2xl">
            <div className="flex items-center justify-between border-b-2">
              <h3 className="text-tertiaryBrand text-sm font-poppins capitalize font-semibold  pb-3">
                order status
              </h3>
              <span className="text-tertiaryBrand text-sm font-poppins capitalize font-semibold  pb-3 lg:hidden ">
                <button
                  className="px-2 font-poppins text-xs font-medium py-2 bg-[#001D58] rounded-lg text-bgWhite ml-2 -mt-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="flex items-center gap-2">
                    <span>Move Order to Delivered</span>
                    <span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M1.91675 5.21094C1.61903 5.21094 1.37769 5.45228 1.37769 5.75C1.37769 6.04772 1.61903 6.28906 1.91675 6.28906V5.75V5.21094ZM1.91675 5.75V6.28906H9.58341V5.75V5.21094H1.91675V5.75Z"
                          fill="white"
                        />
                        <path
                          d="M6.70825 2.875L9.58325 5.75L6.70825 8.625"
                          stroke="white"
                          stroke-width="1.07812"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </span>
            </div>

            {/* Status timeline - Horizontal on Desktop (lg+), Vertical on Mobile/Tablet (md and below) */}
            <div className="mt-4">
              {/* Desktop - Horizontal (only on lg and above) */}
              <div className="hidden lg:flex w-full py-[16px] px-[8px] items-start">
                <OrderStatusStep
                  status={ORDER_STATUS.BOOKED}
                  icon={Icons.OrderPending}
                  label="Order Placed"
                  iconProps={{ fill: getStepColor(ORDER_STATUS.BOOKED) }}
                />
                <OrderStatusStep
                  status={ORDER_STATUS.PENDING}
                  icon={Icons.OrderInProgress}
                  label="In Progress"
                  iconProps={{ stroke: getStepColor(ORDER_STATUS.PENDING) }}
                />
                <OrderStatusStep
                  status={ORDER_STATUS.SHIPPED}
                  icon={Icons.OrderShipped}
                  label="Shipped"
                  iconProps={{
                    fill: getStepColor(ORDER_STATUS.SHIPPED),
                    stroke: getStepColor(ORDER_STATUS.SHIPPED),
                  }}
                />
                <OrderStatusStep
                  status={ORDER_STATUS.DELIVERED}
                  icon={Icons.OrderDelivered}
                  label="Delivered"
                  iconProps={{ fill: getStepColor(ORDER_STATUS.DELIVERED) }}
                  isLast
                />
                <button
                  className="px-2 font-poppins text-xs font-medium py-2 bg-[#001D58] rounded-lg text-bgWhite ml-2 -mt-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="flex items-center gap-2">
                    <span>Move Order to Delivered</span>
                    <span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M1.91675 5.21094C1.61903 5.21094 1.37769 5.45228 1.37769 5.75C1.37769 6.04772 1.61903 6.28906 1.91675 6.28906V5.75V5.21094ZM1.91675 5.75V6.28906H9.58341V5.75V5.21094H1.91675V5.75Z"
                          fill="white"
                        />
                        <path
                          d="M6.70825 2.875L9.58325 5.75L6.70825 8.625"
                          stroke="white"
                          stroke-width="1.07812"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

              {/* Mobile/Tablet - Vertical (on mobile and md screens) */}
              <div className="flex lg:hidden flex-col py-[16px] px-[8px]">
                <OrderStatusStep
                  status={ORDER_STATUS.BOOKED}
                  icon={Icons.OrderPending}
                  label="Order Placed"
                  iconProps={{ fill: getStepColor(ORDER_STATUS.BOOKED) }}
                />
                <OrderStatusStep
                  status={ORDER_STATUS.PENDING}
                  icon={Icons.OrderInProgress}
                  label="In Progress"
                  iconProps={{ stroke: getStepColor(ORDER_STATUS.PENDING) }}
                />
                <OrderStatusStep
                  status={ORDER_STATUS.SHIPPED}
                  icon={Icons.OrderShipped}
                  label="Shipped"
                  iconProps={{
                    fill: getStepColor(ORDER_STATUS.SHIPPED),
                    stroke: getStepColor(ORDER_STATUS.SHIPPED),
                  }}
                />
                <OrderStatusStep
                  status={ORDER_STATUS.DELIVERED}
                  icon={Icons.OrderDelivered}
                  label="Delivered"
                  iconProps={{ fill: getStepColor(ORDER_STATUS.DELIVERED) }}
                  isLast
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
