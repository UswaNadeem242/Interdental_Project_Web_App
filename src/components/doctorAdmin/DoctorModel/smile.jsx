// import React, { useState } from 'react'

// function SmileDesignPicker({ isModalOpen, setIsModalOpen }) {

//     const smileDesigns = Array.from({ length: 16 }, (_, i) => i + 1);

//     const toggleDesign = (design) => {
//         setSelected((prev) =>
//             prev.includes(design)
//                 ? prev.filter((d) => d !== design)
//                 : [...prev, design]
//         );
//     };

//     return (

//         <>
//             {/* smile design */}

//             < div className="grid grid-cols-4 gap-4" >
//                 {
//                     smileDesigns.map((design) => (
//                         <label
//                             key={design}
//                             className={`relative border rounded-lg p-2 flex flex-col items-center cursor-pointer transition ${selected.includes(design)
//                                 ? "border-blue-600 ring-1 ring-blue-600"
//                                 : "border-gray-200"
//                                 }`}
//                         >
//                             {/* Custom checkbox */}
//                             <input
//                                 type="checkbox"
//                                 value={design}
//                                 checked={selected.includes(design)}
//                                 onChange={() => toggleDesign(design)}
//                                 className="hidden peer"
//                             />
//                             <div className="absolute top-2 left-2 w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center peer-checked:border-blue-600">
//                                 <svg
//                                     className={`w-4 h-4 text-blue-600 ${selected.includes(design) ? "block" : "hidden"
//                                         }`}
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M5 13l4 4L19 7"
//                                     />
//                                 </svg>
//                             </div>

//                             {/* Label text */}
//                             <span className="text-sm">Smile Design {design}</span>

//                             {/* Image */}
//                             <img
//                                 src="/assets/selectTeeth.jpg"
//                                 alt={`Smile Design ${design}`}
//                                 className="w-full h-auto rounded-md mt-2"
//                             />
//                         </label>
//                     ))
//                 }
//             </div >
//             {/* Buttons */}
//             < div className="flex justify-between items-center mt-6 gap-4" >
//                 <button
//                     onClick={() => setIsModalOpen(false) }
//                     className="flex-1 px-6 py-3 rounded-3xl bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     onClick={() => {
//                         alert(
//                             `Smile Design(s) confirmed: ${selected.length > 0 ? selected.join(", ") : "None"
//                             }`
//                         );
//                         onClose();
//                     }}
//                     className="flex-1 px-6 py-3 rounded-3xl bg-[rgba(0,29,88,1)] text-white hover:bg-blue-900"
//                 >
//                     Confirm
//                 </button>
//             </div >
//             {/* smile design */}
//         </>
//     )
// }

// export default SmileDesignPicker








import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SmileDesignPicker = ({ isModalOpen, setIsModalOpen }) => {
    const navigate = useNavigate();
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const [selected, setSelected] = useState([]);

    // Generate 16 designs dynamically
    const smileDesigns = Array.from({ length: 16 }, (_, i) => i + 1);

    const toggleDesign = (design) => {
        setSelected((prev) =>
            prev.includes(design)
                ? prev.filter((d) => d !== design)
                : [...prev, design]
        );
    };
    const [selectedTeeth, setSelectedTeeth] = useState([3, 4, 12, 30]);
    const [showSmilePicker, setShowSmilePicker] = useState(false);

    return (
        // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        //   <div className="flex flex-col justify-center items-center gap-[24px] bg-white p-[32px] rounded-[24px] shadow-lg w-[325px] h-[314px] relative">
        //     <svg
        //       width="87"
        //       height="86"
        //       viewBox="0 0 87 86"
        //       fill="none"
        //       xmlns="http://www.w3.org/2000/svg"
        //     >
        //       <rect x="0.5" width="86" height="86" rx="43" fill="#001D58" />
        //       <path
        //         d="M42.7258 49.6964C52.1235 49.6964 60.057 51.2427 60.057 57.2148C60.057 63.1869 52.0726 64.6817 42.7258 64.6817C33.3281 64.6817 25.3945 63.133 25.3945 57.1633C25.3945 51.1912 33.3767 49.6964 42.7258 49.6964ZM42.7258 20.7759C49.0911 20.7759 54.1936 25.9444 54.1936 32.3921C54.1936 38.8398 49.0911 44.0083 42.7258 44.0083C36.3604 44.0083 31.258 38.8398 31.258 32.3921C31.258 25.9444 36.3604 20.7759 42.7258 20.7759Z"
        //         fill="white"
        //       />
        //       <path
        //         d="M61.0296 26.7622C61.5235 26.7622 61.9181 27.1736 61.8975 27.6671L61.5335 36.3858C61.514 36.851 61.1312 37.2182 60.6655 37.2182H59.1667C58.701 37.2182 58.3182 36.851 58.2988 36.3858L57.9347 27.6671C57.9141 27.1736 58.3087 26.7622 58.8027 26.7622H61.0296ZM59.9707 42.8064C59.3158 42.8064 58.7774 42.6172 58.3553 42.2388C57.9479 41.8459 57.7441 41.3657 57.7441 40.7981C57.7441 40.216 57.9479 39.7285 58.3553 39.3356C58.7774 38.9427 59.3158 38.7462 59.9707 38.7462C60.611 38.7462 61.1349 38.9427 61.5424 39.3356C61.9644 39.7285 62.1754 40.216 62.1754 40.7981C62.1754 41.3657 61.9644 41.8459 61.5424 42.2388C61.1349 42.6172 60.611 42.8064 59.9707 42.8064Z"
        //         fill="white"
        //       />
        //     </svg>

        //     <div className="flex flex-col justify-center items-center gap-[4px] w-[261px] h-[76px]">
        //       <p className="font-poppins font-medium text-[20px] leading-[30px] text-[#000000]">
        //         Account Required!
        //       </p>
        //       <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494] text-center">
        //         Please log in or register to proceed further.
        //       </p>
        //     </div>
        //     <button
        //       onClick={handleCloseModal}
        //       className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
        //     >
        //       ✕
        //     </button>
        //     <div className="flex justify-center items-center gap-[24px] w-[261px] h-[40px]">
        //       <button
        //         onClick={handleCloseModal}
        //         className="flex justify-center items-center text-[#001D58] w-[118.5px] h-[40px] rounded-[12px] border-[1px] border-[#001D58] gap-[8px] py-[19px] px-[30px] "
        //       >
        //         <h1 className="text-[12px] font-poppins font-normal leading-[18px]">
        //           Cancel
        //         </h1>
        //       </button>
        //       <button
        //         onClick={() => navigate("/signup")}
        //         className="flex justify-center items-center bg-[#001D58] text-white w-[118.5px] h-[40px] rounded-[12px] border-[1px] border-[#001D58] gap-[8px] py-[19px] px-[10px] "
        //       >
        //         <h1 className="text-[12px] font-poppins font-normal leading-[18px]">
        //           Create Account
        //         </h1>
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-2xl   p-6 shadow-lg w-[80%] max-w-3xl h-auto min-h-[90vh]  ">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[rgba(0,29,88,1)]">
                        Pick Your Perfect Smile Design
                    </h2>
                    <button
                        onClick={handleCloseModal}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <p className="text-gray-500 mb-6 font-poppins text-[13px]">
                    Choose one or more smile designs that suit you best. Browse the
                    options below and select the ones you love!
                </p>

                {/* Smile Design Grid */}
                <div className="grid grid-cols-4 gap-4">
                    {smileDesigns.map((design) => (
                        <label
                            key={design}
                            className={`relative border rounded-lg p-2 flex flex-col items-center cursor-pointer transition ${selected.includes(design)
                                ? "border-blue-600 ring-1 ring-blue-600"
                                : "border-gray-200"
                                }`}
                        >
                            {/* Custom checkbox */}
                            <input
                                type="checkbox"
                                value={design}
                                checked={selected.includes(design)}
                                onChange={() => toggleDesign(design)}
                                className="hidden peer"
                            />
                            <div className="absolute top-2 left-2 w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center peer-checked:border-blue-600">
                                <svg
                                    className={`w-4 h-4 text-blue-600 ${selected.includes(design) ? "block" : "hidden"
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            {/* Label text */}
                            <span className="text-sm">Smile Design {design}</span>

                            {/* Image */}
                            <img
                                src="/assets/doctor/teeth1.png"
                                alt={`Smile Design ${design}`}
                                className="w-full h-auto rounded-md mt-2"
                            />
                        </label>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-6 gap-4">
                    <button
                        onClick={handleCloseModal}
                        className="flex-1 px-6 py-3 rounded-3xl bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            alert(
                                `Smile Design(s) confirmed: ${selected.length > 0 ? selected.join(", ") : "None"
                                }`
                            );
                            setIsModalOpen(false)

                        }}
                        className="flex-1 px-6 py-3 rounded-3xl bg-[rgba(0,29,88,1)] text-white hover:bg-blue-900"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmileDesignPicker;
