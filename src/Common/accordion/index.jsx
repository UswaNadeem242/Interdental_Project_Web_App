import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full  max-w-5xl  mx-auto ">
            {items.map((item, index) => (
                <div key={index} className="py-3">
                    {/* Header */}
                    <div className="bg-white px-4 py-8 rounded-lg    transition">

                        <button
                            onClick={() => toggle(index)}
                            className={`w-full flex justify-between items-center text-left   ${openIndex === index ? "border-b pb-5 border-secondaryBrand" : ""}`}
                        >
                            <span className="font-poppins text-sm md:text-base  font-bold text-secondaryBrand">
                                {item.title}
                            </span>
                            <ChevronDownIcon
                                className={`w-5 h-5 transform transition-transform ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="mt-5">
                                {index === 4 ? (
                                    <ul className="list-disc  space-y-2 text-sm md:text-base text-primaryText font-poppins">
                                        <p className="text-sm md:text-base text-primaryText font-poppins pt-3">    Depending on your plan (Starter, Growth, or Pro), you’ll access tools like:</p>


                                        {item.description.map((line, i) => (
                                            <div className="pl-6">
                                                <li key={i} className="custom-list">{line}</li>
                                            </div>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm md:text-base text-primaryText font-poppins">
                                        {Array.isArray(item.description)
                                            ? item.description.join(" ") // join array text if any
                                            : item.description}
                                    </p>
                                )}
                            </div>
                        )}











                    </div>


                </div>
            ))}
        </div>
    );
};

export default Accordion;
