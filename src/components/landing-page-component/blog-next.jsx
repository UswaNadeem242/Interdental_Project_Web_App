import { ArrowLongLeftIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'

function BlogNext() {
    return (
        <>
            <section className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left / Previous */}
                    {/* <WrapperPrev
                        {...wrapperPrevProps}
                        className="group relative block w-full"
                        aria-label={prev.label || "Previous"}
                    > */}
                    <div className="h-full w-full bg-[#eaf4f5] px-6 sm:px-10 py-10 md:py-14">
                        {/* icon + label */}
                        <div className="flex justify-end items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondaryBrand text-white">
                                <ChevronLeftIcon className='w-4 h-4 ' />
                            </span>
                            <span className="text-xs tracking-wide text-primaryText">{"Previous"}</span>
                        </div>

                        <div className="mt-6 flex flex-col items-end text-right">
                            <p className="text-sm font-semibold text-secondaryBrand">
                                Dentures
                            </p>
                            <h3 className="mt-3 text-lg leading-7 text-primaryText max-w-[219px]">
                                How Corrective Jaw Surgery Can Treat Sleep Apnea
                            </h3>
                        </div>




                        {/* subtle hover */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
                    </div>

                    <div className="h-full w-full bg-[#eceef4] px-6 sm:px-10 py-10 md:py-14">
                        {/* icon + label */}
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0b2a5b] text-white">
                                {/* Right arrow icon */}
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 6l6 6-6 6" />
                                </svg>
                            </span>
                            <span className="text-xs tracking-wide text-[#0b2a5b]/80">{"Next"}</span>
                        </div>

                        {/* question card */}
                        <div className="mt-6">
                            <p className="text-sm font-semibold text-[#2b3a4a]">{"Question"}</p>
                            <h3 className="mt-3 whitespace-pre-line text-lg leading-7 text-[#1e1e1e]">
                                Who Discovered Anesthesia?
                            </h3>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default BlogNext