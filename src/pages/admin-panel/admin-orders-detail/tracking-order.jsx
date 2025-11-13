import React, { useEffect, useState, useMemo, useCallback } from "react";
import Icons from "../../../components/Icons";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { format, parseISO } from "date-fns";

const ORDER_STATUS = {
  BOOKED: "BOOKED",
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
};

const STEP_COLORS = {
  COMPLETED_LIGHT: "#7DD3DD",
  COMPLETED_DARK: "#001D58",
  INCOMPLETE: "#DDDDDD",
};

export default function TrackingOrderAdmin({ id, setIsModalOpen }) {
  const [trackingData, setTrackingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const formatShortTimestamp = useCallback((dateString) => {
    if (!dateString) return "";
    try {
      
      const hasTimezone =
        dateString.includes("Z") ||
        dateString.includes("+") ||
        dateString.includes("-", 10);

      let date;
      if (hasTimezone) {
        date = parseISO(dateString);
      } else {
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

  const getTrackingForStatus = useCallback(
    (status) => trackingData.find((item) => item.status === status),
    [trackingData]
  );

  const hasReachedStatus = useCallback(
    (status) => trackingData.some((item) => item.status === status),
    [trackingData]
  );

  const isStepCompleted = useCallback(
    (step) => {
      const statusHierarchy = {
        [ORDER_STATUS.BOOKED]: [ORDER_STATUS.BOOKED],
        [ORDER_STATUS.PENDING]: [
          ORDER_STATUS.BOOKED,
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (id) {
        await Promise.all([fetchOrderTracking()]);
      } else {
        console.warn("No ID provided — showing empty UI");
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id, fetchOrderTracking]);

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

    const displayTracking =
      status === ORDER_STATUS.PENDING
        ? tracking || getTrackingForStatus(ORDER_STATUS.BOOKED)
        : tracking;

    return (
      <>
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
                    <Icons.ArrowRightSmall />
                  </span>
                </button>
              </span>
            </div>

            <div className="mt-4">
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
                    <Icons.ArrowRightSmall />
                  </span>
                </button>
              </div>

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
