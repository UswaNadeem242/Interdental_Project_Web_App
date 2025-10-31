import React, { useEffect, useState } from "react";
import { getOrderByID } from "../../../../api/doctorDasboard";
import Icons from "../../../../components/Icons";
import axios from "axios";
import { BASE_URL } from "../../../../config";
import { format } from "date-fns";

export default function TrackingOrder({ id }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [steps, setSteps] = useState([]);
  const [trackingData, setTrackingData] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "-") return "-";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";
      return format(date, "dd-MM-yyyy");
    } catch (error) {
      return "-";
    }
  };

  const formatShortTimestamp = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return format(date, "d MMM yyyy, hh:mm aaa").replace(/am|pm/gi, (match) => match.toUpperCase());
    } catch (error) {
      return "";
    }
  };

  const trackingid=trackingData?.[0]?.trackingId || "N/A";

  useEffect(() => {
    const fetchOrderByID = async () => {
      const response = await getOrderByID(id);
      if (response.status === 200) {
        const data = response.data.data;
        setOrderDetails(data);
      }
    };

    const fetchOrderTracking = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/ordertracking/byOrderId/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.responseStatus) {
          setTrackingData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching order tracking:", error);
      }
    };

    fetchOrderByID();
    fetchOrderTracking();
  }, [id]);

  // Get tracking info for a specific status
  const getTrackingForStatus = (status) => {
    return trackingData.find((item) => item.status === status);
  };

  // Check if a status has been reached based on received tracking data
  const hasReachedStatus = (status) => {
    return trackingData.some((item) => item.status === status);
  };

  // Determine if a step should be shown as completed
  const isStepCompleted = (step) => {
    // BOOKED is always completed if we have any tracking data
    if (step === "BOOKED") return hasReachedStatus("BOOKED");
    
    // PENDING is completed if we have PENDING, SHIPED, or DELIVERD
    if (step === "PENDING") {
      return hasReachedStatus("PENDING") || hasReachedStatus("SHIPED") || hasReachedStatus("DELIVERD");
    }
    
    // SHIPED is completed if we have SHIPED or DELIVERD
    if (step === "SHIPED") {
      return hasReachedStatus("SHIPED") || hasReachedStatus("DELIVERD");
    }
    
    // DELIVERD is only completed if we have DELIVERD
    if (step === "DELIVERD") {
      return hasReachedStatus("DELIVERD");
    }
    
    return false;
  };

  // Get the appropriate color for each step
  const getStepColor = (step) => {
    if (step === "BOOKED" || step === "PENDING") {
      return isStepCompleted(step) ? "#7DD3DD" : "#DDDDDD";
    }
    // SHIPED and DELIVERD use darker blue when completed
    return isStepCompleted(step) ? "#001D58" : "#DDDDDD";
  }; 

  return (
    <>
      <div className="bg-white p-8 mt-8 rounded-2xl">
        <div className="grid md:grid-cols-12 grid-cols-6 bg-white ">
          <div className="col-span-12 border border-borderPrimary p-4 rounded-lg">
            <h3 className="text-tertiaryBrand text-sm font-poppins capitalize font-semibold border-b-2 pb-3">
              Delivery Detail
            </h3>

            <div className="grid md:grid-cols-12 grid-cols-6  gap-2 mt-2">
              <div className="col-span-6  items-center nd:gap-0 gap-2  flex justify-between p-2  md:border-r-2 border-r-0">
                <h3 className="text-[#909198] capitalize text-sm font-poppins font-semibold">
                  expected delivery date
                </h3>

                <h3 className="text-tertiaryBrand font-semibold">
                  {" "}
                  {formatDate(orderDetails?.expectedDeliveryDate)?.replace(/\//g, "-")}
                </h3>
              </div>

              <div className="col-span-6  items-center md:gap-0 gap-2  flex justify-between p-2">
                <h3 className="text-[#909198] capitalize text-sm font-poppins font-semibold">
                  tracking ID
                </h3>
                <h3 className="text-tertiaryBrand font-semibold flex md:justify-end">
                  {/* #{orderDetails?.id} */}
                  {trackingid || "N/A"}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-12 grid-cols-6 bg-white mt-5">
          <div className="col-span-12 border border-borderPrimary p-4 rounded-lg">
            <h3 className="text-tertiaryBrand text-sm font-poppins capitalize font-semibold border-b-2 pb-3">
              order status
            </h3>

            {/* Status timeline with dates below checkmarks */}
            <div className="mt-4">
              <div className="flex w-full py-[16px] px-[8px]">
                {/* Order Placed (BOOKED) */}
                <div className="flex flex-col items-start gap-[12px] flex-1">
                  <div className="flex items-center w-full">
                    <Icons.OrderCheckIcon 
                      fill={getStepColor("BOOKED")}
                    />
                    <div 
                      className={`flex-1 h-[2px] mx-[8px] ${
                        isStepCompleted("BOOKED") ? "bg-[#7DD3DD]" : "bg-[#DDDDDD]"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-start gap-[8px]">
                      <Icons.OrderPending 
                        fill={getStepColor("BOOKED")}
                      />
                      <div className="flex flex-col space-y-[2px]">
                        <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                          Order Placed
                        </p>
                        {getTrackingForStatus("BOOKED") && (
                          <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#909198]">
                            {formatShortTimestamp(getTrackingForStatus("BOOKED").createdAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* In Progress (PENDING) */}
                <div className="flex flex-col items-start gap-[12px] flex-1">
                  <div className="flex items-center w-full">
                    <Icons.OrderCheckIcon 
                      fill={getStepColor("PENDING")}
                    />
                    <div 
                      className={`flex-1 h-[2px] mx-[8px] ${
                        isStepCompleted("SHIPED") ? "bg-[#001D58]" : "bg-[#DDDDDD]"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-start gap-[8px]">
                      <Icons.OrderInProgress 
                        stroke={getStepColor("PENDING")}
                      />
                      <div className="flex flex-col space-y-[2px]">
                        <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                          In Progress
                        </p>
                        {/* Use BOOKED date if PENDING doesn't exist */}
                        {(getTrackingForStatus("PENDING") || getTrackingForStatus("BOOKED")) && (
                          <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#909198]">
                            {formatShortTimestamp(
                              (getTrackingForStatus("PENDING") || getTrackingForStatus("BOOKED")).createdAt
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipped (SHIPED) */}
                <div className="flex flex-col items-start gap-[12px] flex-1">
                  <div className="flex items-center w-full">
                    <Icons.OrderCheckIcon 
                      fill={getStepColor("SHIPED")}
                    />
                    <div 
                      className={`flex-1 h-[2px] mx-[8px] ${
                        isStepCompleted("DELIVERD") ? "bg-[#001D58]" : "bg-[#DDDDDD]"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-start gap-[8px]">
                      <Icons.OrderShipped 
                        fill={getStepColor("SHIPED")}
                        stroke={getStepColor("SHIPED")}
                      />
                      <div className="flex flex-col space-y-[2px]">
                        <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                          Shipped
                        </p>
                        {getTrackingForStatus("SHIPED") && (
                          <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#909198]">
                            {formatShortTimestamp(getTrackingForStatus("SHIPED").createdAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivered (DELIVERD) */}
                <div className="flex flex-col items-start gap-[12px]">
                  <div className="flex items-center">
                    <Icons.OrderCheckIcon 
                      fill={getStepColor("DELIVERD")}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-start gap-[8px]">
                      <Icons.OrderDelivered 
                        fill={getStepColor("DELIVERD")}
                      />
                      <div className="flex flex-col space-y-[2px]">
                        <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                          Delivered
                        </p>
                        {getTrackingForStatus("DELIVERD") && (
                          <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#909198]">
                            {formatShortTimestamp(getTrackingForStatus("DELIVERD").createdAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
