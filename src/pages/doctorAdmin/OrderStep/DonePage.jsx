import React from 'react'

const DonePage = () => {
    return (
        <>
            
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="flex flex-col items-center gap-6 text-center">
                    {/* Green Circle with SVG */}
                    <div className="bg-[#4FAD2E] w-20 h-20 rounded-full flex items-center justify-center">
                        <svg
                            width="34"
                            height="24"
                            viewBox="0 0 34 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.52539 12L12.1632 21.2631L31.4728 2.73682"
                                stroke="white"
                                strokeWidth="4.63158"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* Text */}
                    <div className='text-center'>
                        <h1 className="text-black text-xl font-semibold font-poppins capitalize">
                            Your Order Has Been Successfully Placed!
                        </h1>
                        <p className="text-neutral-400 text-xs font-normal font-poppins capitalize mt-2">
                            Thank you for shopping with us. Your order is being processed, and you’ll receive an email confirmation shortly with the details. We appreciate your trust in our service, and we’ll ensure your order is delivered promptly.
                        </p>
                    </div>

                    {/* Button */}
                    <button className="bg-secondaryBrand text-white rounded-full px-10 py-5 w-96">
                        Track Order
                    </button>
                </div>
            </div>

        </>
    )
}

export default DonePage