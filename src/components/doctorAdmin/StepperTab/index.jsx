

// import { useMemo, useState } from "react";

// export default function StepperTabs({ steps = [] }) {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [completed, setCompleted] = useState(() => steps.map(() => false));

//     const hasSteps = Array.isArray(steps) && steps.length > 0;
//     const isLast = !hasSteps ? true : activeIndex === steps.length - 1;

//     const currentStep = hasSteps ? steps[activeIndex] : undefined;
//     const canGoNext = currentStep?.canContinue ?? (() => true);
//     const onContinue = currentStep?.onContinue;

//     const progress = useMemo(() => {
//         if (!hasSteps) return 0;
//         const done = (completed || []).filter(Boolean).length;
//         return Math.round((done / steps.length) * 100);
//     }, [completed, hasSteps, steps]);

//     const goNext = async () => {
//         if (!hasSteps || isLast) return;
//         const ok = await Promise.resolve(canGoNext());
//         if (!ok) return;
//         setCompleted((prev) => {
//             const cp = Array.isArray(prev) ? [...prev] : steps.map(() => false);
//             cp[activeIndex] = true;
//             return cp;
//         });
//         onContinue?.();
//         setActiveIndex((i) => i + 1);
//     };

//     const goBack = () => {
//         if (!hasSteps || activeIndex === 0) return;
//         setActiveIndex((i) => i - 1);
//     };

//     if (!hasSteps) {
//         return (
//             <div className="w-full rounded-2xl   bg-white p-5 text-sm text-gray-600">
//                 No steps provided.
//             </div>
//         );
//     }

//     const maxReachable = Math.min(
//         completed.findLastIndex?.((c) => c) + 1 || 0,
//         steps.length - 1
//     );

//     return (
//         <div className="w-full">
//             {/* Underline Tabs Header (matches screenshot) */}
//             <div className="border-[#F8F8F8] border   px-4 py-6">
//                 <div className="grid grid-cols-4 gap-6">
//                     {steps.map((step, index) => {
//                         const isActive = index === activeIndex;
//                         const isDone = completed[index];
//                         const canJump = index <= maxReachable; // gated navigation
//                         return (
//                             <button
//                                 key={step.id ?? index}
//                                 type="button"
//                                 onClick={() => canJump && setActiveIndex(index)}
//                                 className="text-left"
//                                 disabled={!canJump}
//                             >
//                                 <div
//                                     className={`text-sm font-poppins font-normal text-center ${isActive
//                                             ? "text-secondaryBrand"
//                                             : "text-[#B1B1B1]"
//                                         }`}
//                                 >
//                                     {step.title}
//                                 </div>
//                                 <div className="mt-2 h-[2px] w-full bg-gray-200">
//                                     <div
//                                         className={`h-[2px] transition-all ${isActive || isDone ? "bg-[#0b2b62] w-full" : "bg-[#B0B0B0 ]"
//                                             }`}
//                                     />
//                                 </div>
//                             </button>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* Active content */}


//             {/* Controls */}
//             <div className="mt-6 flex items-center justify-between">
//                 <button
//                     onClick={goBack}
//                     disabled={activeIndex === 0}
//                     className="rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                     Back
//                 </button>
//                 {!isLast ? (
//                     <button
//                         onClick={goNext}
//                         className="rounded-full bg-[#0b2b62] px-6 py-3 text-sm font-semibold text-white hover:bg-[#092b58]"
//                     >
//                         Continue
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => setCompleted(steps.map(() => true))}
//                         className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
//                     >
//                         Finish
//                     </button>
//                 )}
//             </div>

//             {/* Hidden progress bar for accessibility/metrics */}
//             <div className="sr-only" aria-hidden>
//                 Progress: {progress}%
//             </div>
//         </div>
//     );
// }



// import { useMemo, useState } from "react";

// export default function StepperTabs({ steps = [] }) {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [completed, setCompleted] = useState(() => steps.map(() => false));

//     const hasSteps = Array.isArray(steps) && steps.length > 0;
//     const isLast = !hasSteps ? true : activeIndex === steps.length - 1;

//     const currentStep = hasSteps ? steps[activeIndex] : undefined;
//     const canGoNext = currentStep?.canContinue ?? (() => true);
//     const onContinue = currentStep?.onContinue;

//     const progress = useMemo(() => {
//         if (!hasSteps) return 0;
//         const done = (completed || []).filter(Boolean).length;
//         return Math.round((done / steps.length) * 100);
//     }, [completed, hasSteps, steps]);

//     const goNext = async () => {
//         if (!hasSteps || isLast) return;
//         const ok = await Promise.resolve(canGoNext());
//         if (!ok) return;
//         setCompleted((prev) => {
//             const cp = Array.isArray(prev) ? [...prev] : steps.map(() => false);
//             cp[activeIndex] = true;
//             return cp;
//         });
//         onContinue?.();
//         setActiveIndex((i) => i + 1);
//     };

//     const goBack = () => {
//         if (!hasSteps || activeIndex === 0) return;
//         setActiveIndex((i) => i - 1);
//     };

//     if (!hasSteps) {
//         return (
//             <div className="w-full rounded-2xl bg-white p-5 text-sm text-gray-600">
//                 No steps provided.
//             </div>
//         );
//     }

//     const maxReachable = Math.min(
//         completed.findLastIndex?.((c) => c) + 1 || 0,
//         steps.length - 1
//     );

//     return (
//         <div className="w-full">
//             {/* Tabs Header */}
//             <div className="border border-gray-100 px-4 py-6">
//                 <div className={`grid grid-cols-${steps.length} gap-6`}>
//                     {steps.map((step, index) => {
//                         const isActive = index === activeIndex;
//                         const isDone = completed[index];
//                         const canJump = index <= maxReachable;
//                         return (
//                             <button
//                                 key={step.id ?? index}
//                                 type="button"
//                                 onClick={() => canJump && setActiveIndex(index)}
//                                 className="text-left w-full"
//                                 disabled={!canJump}
//                             >
//                                 <div
//                                     className={`text-sm font-semibold text-center ${isActive ? "text-blue-600" : "text-gray-400"
//                                         }`}
//                                 >
//                                     {step.title}
//                                 </div>
//                                 <div className="mt-2 h-[2px] w-full bg-gray-200">
//                                     <div
//                                         className={`h-[2px] transition-all ${isActive || isDone ? "bg-blue-600 w-full" : ""
//                                             }`}
//                                     />
//                                 </div>
//                             </button>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* Active content */}
//             <div className="mt-6">{currentStep?.content}</div>

//             {/* Controls */}
//             <div className="mt-6 flex items-center justify-between">
//                 <button
//                     onClick={goBack}
//                     disabled={activeIndex === 0}
//                     className="rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                     Back
//                 </button>
//                 {!isLast ? (
//                     <button
//                         onClick={goNext}
//                         className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
//                     >
//                         Continue
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => setCompleted(steps.map(() => true))}
//                         className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
//                     >
//                         Finish
//                     </button>
//                 )}
//             </div>

//             {/* Hidden progress bar */}
//             <div className="sr-only" aria-hidden>
//                 Progress: {progress}%
//             </div>
//         </div>
//     );
// }



// src/components/StepperTabs.jsx
import { useState } from "react";

export default function StepperTabs({ steps }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => {
        if (activeIndex < steps.length - 1) setActiveIndex(activeIndex + 1);
    };

    const back = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* --- Tabs Header --- */}
            <div className="flex justify-between border-b mb-4">
                {steps.map((step, idx) => (
                    <div
                        key={step.id}
                        className={`flex-1 text-center py-2 cursor-pointer ${idx === activeIndex ? "font-bold text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                            }`}
                        onClick={() => setActiveIndex(idx)}
                    >
                        {step.title}
                    </div>
                ))}
            </div>

            {/* --- Active Content --- */}
            <div className="p-4 border rounded-lg shadow bg-white min-h-[200px]">
                {steps[activeIndex].content}
            </div>

            {/* --- Controls --- */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={back}
                    disabled={activeIndex === 0}
                    className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                    Back
                </button>

                {activeIndex < steps.length - 1 ? (
                    <button
                        onClick={next}
                        className="px-4 py-2 rounded bg-blue-600 text-white"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={() => alert("All steps completed!")}
                        className="px-4 py-2 rounded bg-green-600 text-white"
                    >
                        Finish
                    </button>
                )}
            </div>
        </div>
    );
}
