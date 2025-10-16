import React, { useEffect, useState } from 'react'
import { ProgressBar } from '../../../../Common/ProgressBar'
import { getOrderTranckingByID } from '../../../../api/doctorDasboard';
import { useSelector } from 'react-redux';
import HealthIcon from "../../../../icon/HealthIcon"; 
import BoxIcon from "../../../../icon/BoxIcon";
import ShipIcon from "../../../../icon/ShipIcon";
import TimeIcon from "../../../../icon/TimeIcon";
export default function TrackingOrder({ id }) {
    const [orderTracking, setOrderTracking] = useState(null);
    const [steps, setSteps] = useState([]);

    const restoration = useSelector((state) => state.restoration);
    const doctor = restoration.doctor.reduce((acc, d) => {
        acc[d.field] = d.value || "N/A";
        return acc;
    }, {});

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
            const response = await getOrderTranckingByID(id);
            if (response.status === 200) {
                const data = response.data.data; // array from API
                setOrderTracking(data);

                const currentStatus = data?.[0]?.status; // e.g. "PENDING"
                const currentIndex = orderSteps.findIndex(
                    (s) => s.key === currentStatus
                );

                // Mark step statuses dynamically
                const updatedSteps = orderSteps.map((step, idx) => {
                    if (idx < currentIndex) return { ...step, status: "completed" };
                    if (idx === currentIndex) return { ...step, status: "current" };
                    return { ...step, status: "upcoming" };
                });

                // Add created date (if available)
                updatedSteps.forEach((s, i) => {
                    s.date =
                        data?.[i]?.createdAt
                            ? new Date(data[i].createdAt).toLocaleDateString()
                            : "";
                });

                setSteps(updatedSteps);
            }
        };
        fetchOrderByID();
    }, [id]);
    console.log('orderTracking', orderTracking);

    return (
        <>
            <div className='bg-white p-8 mt-8 rounded-2xl'>
                <div className="grid md:grid-cols-12 grid-cols-6 bg-white ">
                    <div className="col-span-12 border border-borderPrimary p-4 rounded-lg">
                        <h3 className="text-tertiaryBrand text-sm font-poppins capitalize font-semibold border-b-2 pb-3">
                            Delivery Detail
                        </h3>

                        <div className="grid md:grid-cols-12 grid-cols-6  gap-2 mt-2">
                            <div className="col-span-6  items-center nd:gap-0 gap-2  flex justify-between p-2  md:border-r-2 border-r-0">
                                <h3 className='text-[#909198] capitalize text-sm font-poppins font-semibold'>expected delivery date</h3>

                                <h3 className='text-tertiaryBrand font-semibold'>   {formatDate(doctor?.dueDate)}</h3>
                            </div>

                            <div className="col-span-6  items-center md:gap-0 gap-2  flex justify-between p-2">
                                <h3 className='text-[#909198] capitalize text-sm font-poppins font-semibold'>tracking ID</h3>
                                <h3 className='text-tertiaryBrand font-semibold flex md:justify-end'>{
                                    orderTracking?.map((item) => item?.orderId)


                                }</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-12 grid-cols-6 bg-white mt-5">
                    <div className="col-span-12 border border-borderPrimary p-4 rounded-lg">
                        <h3 className="text-tertiaryBrand text-sm font-poppins capitalize font-semibold border-b-2 pb-3">
                            order status
                        </h3>
                        <div className='mt-4'>

                            <ProgressBar steps={steps} />
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
