// import { useEffect, useState } from "react";
// export default function ReviewOrder({ next }) {
//     const [selectedTeeth, setSelectedTeeth] = useState([3, 4, 12, 30]);
//     const handleSave = () => {
//         try {
//             next();
//         } catch (e) {
//             console.error(e);
//         }
//     };
//     const [savedData, setSavedData] = useState(null);

//     useEffect(() => {
//         const stored = localStorage.getItem("restorationForm");
//         if (stored) {
//             setSavedData(JSON.parse(stored));
//         }
//     }, []);

//     if (!savedData) return <p>No data found.</p>;

//     const { doctor, patient, teeth } = savedData;

//     const totalPrice = Object.values(teeth).reduce(
//         (sum, tooth) => sum + (tooth.materialPrice || 0),
//         0
//     );

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Left Panel */}
//                 <div className="lg:col-span-2 w-full bg-white shadow-md rounded-xl border border-gray-200 p-6 space-y-6">
//                     <h2 className="text-lg font-semibold text-[rgba(67,67,67,1)]">
//                         Implant Design Details
//                     </h2>

//                     <div className="border border-gray-200 rounded-lg p-4 mt-4">
//                         <h3 className="font-semibold text-[rgba(67,67,67,1)] mb-3">
//                             Doctor Info
//                         </h3>
//                         <hr className="border-gray-200 my-2" />
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
//                             <div>
//                                 <p className="text-gray-500">Doctor’s Name</p>
//                                 <p className="font-bold text-blue-900">Steff Anri</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-500">Office Registration No#</p>
//                                 <p className="font-bold text-blue-900">031 56 475 432</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-500">Create Date</p>
//                                 <p className="font-bold text-blue-900">16/22/2026</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="border border-gray-200 rounded-lg p-4 mt-4">
//                         <h3 className="font-semibold text-[rgba(67,67,67,1)]">
//                             Patient Information
//                         </h3>
//                         <hr className="border-gray-200 my-2" />
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
//                             <div>
//                                 <p className="text-gray-500">First Name</p>
//                                 <p className="font-bold text-blue-900">Miles</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-500">Last Name</p>
//                                 <p className="font-bold text-blue-900">Esther</p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-500">Subscription ID</p>
//                                 <p className="font-bold text-blue-900">466437#</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Selected Teeth */}
//                     <div className="border border-gray-200 rounded-lg p-4">
//                         <p className="text-sm font-medium text-gray-700 mb-2">
//                             Selected Teeth:{" "}
//                             <span className="font-semibold">
//                                 {selectedTeeth.length > 0
//                                     ? selectedTeeth.map((t) => `#${t}`).join(", ")
//                                     : "None"}
//                             </span>
//                         </p>

//                         {/* Teeth Chart Image */}
//                         <img
//                             src="/assets/teeth.jpeg"
//                             alt="Teeth Chart"
//                             className="w-full h-auto rounded-md border border-gray-300"
//                         />
//                     </div>

//                     <div className="border border-gray-200 rounded-lg p-4">
//                         <h3 className="font-semibold text-[rgba(0, 0, 0, 1)] mb-3">
//                             Customization Details
//                         </h3>
//                         <hr className="border-gray-200 my-2" />
//                         <div className="space-y-2">
//                             <div className="grid grid-cols-3 gap-4 text-sm">
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Material:</p>
//                                     <p className="font-bold text-blue-900">Miles</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Colour:</p>
//                                     <p className="font-bold text-blue-900">Esther</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Type:</p>
//                                     <p className="font-bold text-blue-900">466437#</p>
//                                 </div>
//                             </div>
//                             <hr className="border-gray-200 my-2" />
//                             <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Manufacturer</p>
//                                     <p className="font-bold text-blue-900">Miles</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Manufacture Process</p>
//                                     <p className="font-bold text-blue-900">Esther</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Notes */}
//                     <div className="border border-gray-200 rounded-lg p-4">
//                         <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
//                         <hr className="border-gray-200 my-2" />
//                         <p className="text-gray-500 mb-1">Dr. Weed bran</p>
//                         <p className="text-sm text-blue-900 underline">
//                             Kindly use strong material for the upper teeth for better
//                         </p>
//                     </div>
//                 </div>

//                 {/* Right Panel */}
//                 <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
//                     <div>
//                         <h2 className="text-lg font-semibold text-[rgba(26,26,26,1)] mb-4">
//                             Order Summary
//                         </h2>
//                         <div className="space-y-3 text-sm">
//                             <div className="flex justify-between">
//                                 <span>Emax x4</span>
//                                 <span>$80.00</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Argen ST x3</span>
//                                 <span>$90.00</span>
//                             </div>
//                             <hr className="my-2 border-gray-200" />
//                             <div className="flex justify-between font-semibold">
//                                 <span>Subtotal</span>
//                                 <span>$180.00</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Shipping</span>
//                                 <span className="text-green-600">Free</span>
//                             </div>
//                             <div className="flex justify-between font-bold text-blue-700 text-lg mt-4 border-t border-gray-200 pt-2">
//                                 <span>Total</span>
//                                 <span>$180.00</span>
//                             </div>
//                         </div>
//                     </div>
//                     <button onClick={handleSave} className="mt-6 w-full py-3 rounded-3xl bg-secondaryBrand hover:bg-blue-800 text-white font-medium">
//                         Checkout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }



import { useEffect, useState } from "react";

const ReviewOrder = () => {
    const [formData, setFormData] = useState({
        doctor: {},
        patient: {},
        teeth: {},
    });

    const [selectedTeeth, setSelectedTeeth] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem("restorationForm");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setFormData(parsed);
            setSelectedTeeth(Object.keys(parsed.teeth || {}));
        }
    }, []);

    const totalPrice = Object.values(formData.teeth).reduce(
        (sum, tooth) => sum + (tooth.materialPrice || 0),
        0
    );


    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel */}
                <div className="lg:col-span-2 w-full bg-white shadow-md rounded-xl border border-gray-200 p-6 space-y-6">
                    {/* Doctor Info */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Doctor Info</h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Doctor’s Name</p>
                                <p className="font-bold text-blue-900">{formData.doctor.doctorName}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Office Registration No#</p>
                                <p className="font-bold text-blue-900">{formData.doctor.officeReg}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Create Date</p>
                                <p className="font-bold text-blue-900">{formData.doctor.createDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Patient Info */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Patient Information</h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">First Name</p>
                                <p className="font-bold text-blue-900">{formData.patient.firstName}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Last Name</p>
                                <p className="font-bold text-blue-900">{formData.patient.lastName}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Subscription ID</p>
                                <p className="font-bold text-blue-900">{formData.patient.subscriptionId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Selected Teeth */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm font-medium font-poppins text-[#000000] mb-2">
                            Selected Teeth:{" "}
                            <span className="font-semibold">
                                {selectedTeeth.length > 0 ? selectedTeeth.map((t) => `#${t}`).join(", ") : "None"}
                            </span>
                        </p>
                        <img
                            src="/assets/doctor/teeth.png"
                            alt="Teeth Chart"
                            className="w-full h-auto rounded-md border border-gray-300"
                        />
                    </div>

                    {/* Customization Details */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Customization Details</h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="space-y-2">
                            {selectedTeeth.map((toothId) => {
                                const tooth = formData.teeth[toothId] || {};
                                return (
                                    <div key={toothId} className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 text-xs">Material:</p>
                                            <p className="font-bold text-blue-900">{tooth.material || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Colour:</p>
                                            <p className="font-bold text-blue-900">{tooth.color || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Type:</p>
                                            <p className="font-bold text-blue-900">{tooth.type || "N/A"}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Panel / Order Summary */}
                <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-3 text-sm">
                            {selectedTeeth.map((toothId) => {
                                const tooth = formData.teeth[toothId] || {};
                                return (
                                    <div key={toothId} className="flex justify-between ">
                                        <span>{tooth.material ? `${tooth.material} x1` : "N/A"}</span>
                                        <span>${tooth.materialPrice || 0}</span>
                                    </div>
                                );
                            })}
                            <hr className="my-2 border-gray-200" />
                            <div className="flex justify-between font-semibold">
                                <span>Subtotal</span>
                                <span className="text-[#1A1A1A]">${totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-secondaryBrand text-lg mt-4 border-t border-gray-200 pt-2">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                    <button className="mt-6 w-full py-3 rounded-3xl bg-secondaryBrand  text-white font-medium">
                        Checkout
                    </button>
                </div>
            </div>






       
       



        </div >
    );
};

export default ReviewOrder;
