
import { useState } from "react";

export default function StepperTabs({
    steps,
    setActiveIndex,
    activeIndex,
    back,
    next,
}) {
    return (
        <div className="w-full  mx-auto">
            {/* --- Tabs Header --- */}
            <div className="flex flex-wrap  justify-between border-b mb-4">
                {steps.map((step, idx) => (
                    <div
                        key={step.id}
                        className={`flex-1 text-center py-2 cursor-pointer md:text-sm text-xs  ${idx === activeIndex
                            ? "font-bold text-[#001D58] border-b-2 border-[#001D58]"
                            : "text-[#B1B1B1] border-[#94D3DD]"
                            }`}
                        onClick={() => setActiveIndex(idx)}
                    >
                        {step.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
