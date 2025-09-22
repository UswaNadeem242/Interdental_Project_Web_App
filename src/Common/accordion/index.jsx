import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full  mx-auto ">
            {items.map((item, index) => (
                <div key={index} className="py-3">
                    {/* Header */}
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex justify-between items-center text-left px-4 py-8 bg-white rounded-lg  transition"
                    >
                        <span className="font-poppins text-sm md:text-base  font-bold text-secondaryBrand">
                            {item.title}
                        </span>
                        <ChevronDownIcon
                            className={`w-5 h-5 transform transition-transform ${openIndex === index ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {/* Content */}
                    {openIndex === index && (
                        <div className="mt-3 px-4">
                            {Array.isArray(item.description) ? (
                                <ul className="space-y-2">
                                    {item.description.map((line, i) => (
                                        <li
                                            key={i}
                                            className="text-sm md:text-base text-gray-700 font-poppins"
                                            dangerouslySetInnerHTML={{ __html: line }}
                                        />
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm md:text-base text-gray-700 font-poppins">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
