import React, { useState } from 'react'

function SmileDesignPicker({ onClose }) {
    const [selected, setSelected] = useState([]);

    const smileDesigns = Array.from({ length: 16 }, (_, i) => i + 1);

    const toggleDesign = (design) => {
        setSelected((prev) =>
            prev.includes(design)
                ? prev.filter((d) => d !== design)
                : [...prev, design]
        );
    };
    return (

        <>
            {/* smile design */}

            < div className="grid grid-cols-4 gap-4" >
                {
                    smileDesigns.map((design) => (
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
                                src="/assets/selectTeeth.jpg"
                                alt={`Smile Design ${design}`}
                                className="w-full h-auto rounded-md mt-2"
                            />
                        </label>
                    ))
                }
            </div >
            {/* Buttons */}
            < div className="flex justify-between items-center mt-6 gap-4" >
                <button
                    onClick={onClose}
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
                        onClose();
                    }}
                    className="flex-1 px-6 py-3 rounded-3xl bg-[rgba(0,29,88,1)] text-white hover:bg-blue-900"
                >
                    Confirm
                </button>
            </div >
            {/* smile design */}
        </>
    )
}

export default SmileDesignPicker