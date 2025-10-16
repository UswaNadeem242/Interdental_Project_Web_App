import React, { useEffect, useState } from 'react'
import { ProgressBar } from '../../../../Common/ProgressBar'
import { getOrderTranckingByID } from '../../../../api/doctorDasboard';

export default function TrackingOrder({ id }) {
    const [orderTracking, setOrderTracking] = useState(null);

    useEffect(() => {
        const fetchOrderByID = async () => {
            const response = await getOrderTranckingByID(id);

            if (response.status === 200) {
                setOrderTracking(response.data.data);
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

                                <h3 className='text-tertiaryBrand font-semibold  '>23 sep 2023</h3>
                            </div>

                            <div className="col-span-6  items-center md:gap-0 gap-2  flex justify-between p-2">
                                <h3 className='text-[#909198] capitalize text-sm font-poppins font-semibold'>tracking ID</h3>
                                <h3 className='text-tertiaryBrand font-semibold flex md:justify-end'>TYRGSH465Y6443</h3>
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

                            <ProgressBar />
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
