import React, { useEffect, useState } from "react";
import { ProgressBar } from "../../../../Common/ProgressBar";
import { getOrderByID } from "../../../../api/doctorDasboard";
import HealthIcon from "../../../../icon/HealthIcon";
import BoxIcon from "../../../../icon/BoxIcon";
import ShipIcon from "../../../../icon/ShipIcon";
import TimeIcon from "../../../../icon/TimeIcon";
export default function TrackingOrder({ id }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [steps, setSteps] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "-") return "-";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";

      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();

      return `${month}/${day}/${year}`;
    } catch (error) {
      return "-";
    }
  };

  const formatTimestamp = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const day = String(date.getDate()).padStart(2, "0");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      
      return `${day} ${month} ${year}, ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
    } catch (error) {
      return "";
    }
  };

  const orderSteps = [
    {
      id: 1,
      title: "Order Placed",
      key: "PENDING",
      icon: HealthIcon,
    },
    {
      id: 2,
      title: "Processing",
      key: "IN_PROGRESS",
      icon: BoxIcon,
    },
    {
      id: 3,
      title: "Shipped",
      key: "SHIPPED",
      icon: ShipIcon,
    },
    {
      id: 4,
      title: "Delivered",
      key: "DELIVERED",
      icon: TimeIcon,
    },
  ];
  // useEffect(() => {
  //     const fetchOrderByID = async () => {
  //         const response = await getOrderTranckingByID(id);

  //         if (response.status === 200) {
  //             setOrderTracking(response.data.data);
  //         }
  //     };
  //     fetchOrderByID();
  // }, [id]);

  useEffect(() => {
    const fetchOrderByID = async () => {
      const response = await getOrderByID(id);
      if (response.status === 200) {
        const data = response.data.data;
        setOrderDetails(data);

        const currentStatus = data?.orderStatus; // e.g. "PENDING"
        const currentIndex = orderSteps.findIndex(
          (s) => s.key === currentStatus,
        );

        // Mark step statuses dynamically
        const updatedSteps = orderSteps.map((step, idx) => {
          if (idx < currentIndex) return { ...step, status: "completed" };
          if (idx === currentIndex) return { ...step, status: "current" };
          return { ...step, status: "upcoming" };
        });

        // Add timestamp to current step
        if (currentIndex >= 0) {
          updatedSteps[currentIndex].timestamp = formatTimestamp(data?.updatedAt || data?.createdAt);
        }
        // Add timestamp to first step (order placed)
        if (updatedSteps[0]) {
          updatedSteps[0].timestamp = formatTimestamp(data?.createdAt);
        }

        setSteps(updatedSteps);
      }
    };
    fetchOrderByID();
  }, [id]); 

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
                  {formatDate(orderDetails?.expectedDeliveryDate)}
                </h3>
              </div>

              <div className="col-span-6  items-center md:gap-0 gap-2  flex justify-between p-2">
                <h3 className="text-[#909198] capitalize text-sm font-poppins font-semibold">
                  tracking ID
                </h3>
                <h3 className="text-tertiaryBrand font-semibold flex md:justify-end">
                  #{orderDetails?.id}
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
            <div className="mt-4">
              <ProgressBar steps={steps} />
              {/* Display timestamps below progress bar */}
              {steps.length > 0 && (
                <div className="mt-4 text-center">
                  {steps.map((step, index) => (
                    step.timestamp && (
                      <div key={index} className="text-xs text-gray-600 mb-2">
                        <span className="font-semibold">{step.title}:</span> {step.timestamp}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
