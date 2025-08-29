import { useState } from "react";
export default function CheckoutOrder() {
    const [selectedTeeth, setSelectedTeeth] = useState([3, 4, 12, 30]);
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel */}
                <div className="lg:col-span-2 w-full bg-white shadow-md rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-[rgba(67,67,67,1)]">
                       Buyer’s Details
                    </h2>

                    {/* <div className="border border-gray-200 rounded-lg p-4 mt-4">
                        <h3 className="font-semibold text-[rgba(67,67,67,1)] mb-3">
                            Doctor Info
                        </h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Doctor’s Name</p>
                                <p className="font-bold text-blue-900">Steff Anri</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Office Registration No#</p>
                                <p className="font-bold text-blue-900">031 56 475 432</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Create Date</p>
                                <p className="font-bold text-blue-900">16/22/2026</p>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="border border-gray-200 rounded-lg p-4 mt-4">
                        <h3 className="font-semibold text-[rgba(67,67,67,1)]">
                            Patient Information
                        </h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">First Name</p>
                                <p className="font-bold text-blue-900">Miles</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Last Name</p>
                                <p className="font-bold text-blue-900">Esther</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Subscription ID</p>
                                <p className="font-bold text-blue-900">466437#</p>
                            </div>
                        </div>
                    </div> */}

                    {/* Selected Teeth */}
                  

                    {/* <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-[rgba(0, 0, 0, 1)] mb-3">
                            Customization Details
                        </h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs">Material:</p>
                                    <p className="font-bold text-blue-900">Miles</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Colour:</p>
                                    <p className="font-bold text-blue-900">Esther</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Type:</p>
                                    <p className="font-bold text-blue-900">466437#</p>
                                </div>
                            </div>
                            <hr className="border-gray-200 my-2" />
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs">Manufacturer</p>
                                    <p className="font-bold text-blue-900">Miles</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Manufacture Process</p>
                                    <p className="font-bold text-blue-900">Esther</p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Notes */}
                    {/* <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
                        <hr className="border-gray-200 my-2" />
                        <p className="text-gray-500 mb-1">Dr. Weed bran</p>
                        <p className="text-sm text-blue-900 underline">
                            Kindly use strong material for the upper teeth for better
                        </p>
                    </div> */}
                </div>

                {/* Right Panel */}
                {/* <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[rgba(26,26,26,1)] mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Emax x4</span>
                                <span>$80.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Argen ST x3</span>
                                <span>$90.00</span>
                            </div>
                            <hr className="my-2 border-gray-200" />
                            <div className="flex justify-between font-semibold">
                                <span>Subtotal</span>
                                <span>$180.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-blue-700 text-lg mt-4 border-t border-gray-200 pt-2">
                                <span>Total</span>
                                <span>$180.00</span>
                            </div>
                        </div>
                    </div>
                    <button className="mt-6 w-full py-3 rounded-3xl bg-blue-900 hover:bg-blue-800 text-white font-medium">
                        Checkout
                    </button>
                </div> */}
            </div>
        </div>
    );
}