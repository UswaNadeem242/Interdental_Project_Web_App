import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function DropDownComponent({ label, options, onSelect, selected, optionLabel = "label", optionValue = "value" }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`relative w-full bg-white 
    ${isOpen ? "rounded-tl-2xl rounded-tr-2xl" : "rounded-2xl"}
  `}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center   p-4 rounded-lg"
            >
                <span className="text-[#1A1A1A] text-lg font-semibold font-poppins capitalize">{selected || label}</span>

                <ChevronUpIcon className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                    }`} />
            </button>

            {isOpen && (
                <ul className="  w-full bg-white  rounded-bl-2xl  rounded-br-2xl shadow-lg  max-h-60 overflow-auto">
                    {options.map((option, index) => (
                        <li>
                            <li className="flex justify-between">
                                <li
                                    key={option[optionValue] || index}
                                    onClick={() => {
                                        onSelect(option);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 text-gray-700 cursor-pointer font-poppins text-sm"
                                >
                                    {option[optionLabel]}

                                </li>

                                <li
                                    key={option[optionValue] || index}
                                    onClick={() => {
                                        onSelect(option);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 text-gray-700 cursor-pointer font-poppins text-sm"
                                >
                                    {option[optionValue]}

                                </li>

                            </li>

                        </li>


                    ))}
                    {label === "Cart Total" && (
                        <li className="flex justify-between px-4 py-4 text-gray-700 font-poppins border-t border-borderPrimary text-sm">
                            <p>Total:</p>
                            <p>$350.00</p>
                        </li>
                    )}
                </ul>
            )}

        </div>
    );
}
