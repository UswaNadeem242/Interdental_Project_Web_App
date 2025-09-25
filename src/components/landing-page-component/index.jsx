import React from 'react'
import { Doctorsteps } from '../../Constant'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from "@heroicons/react/24/outline";
function DoctorComponent() {
    const navigate = useNavigate();
    return (
        <>
            <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between">
                <div className="relative w-full md:w-1/2 flex justify-center items-center">
                    <img
                        src={
                            "/assets/landing-page/doctor-image.png"
                        }
                        alt="Doctor"
                        className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                    />
                </div>
                <div className="mt-6 sm:mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-1/2 text-gray-800">
                    <h3 className="text-3xl md:text-5xl font-bold text-secondaryBrand">
                        DOCTOR
                    </h3>
                    <p className="font-poppins capitalize text-base  font-medium py-4">Partner with InterOral.ai- Smplify, save, and grow</p>
                    <p className="mt-4 text-sm md:text-lg text-secondaryText">
                        Join our platform to access lab discounts, extended warranties, AI design tools, and patient referrals — all in one streamlined system. Your Practice Benefits:
                    </p>
                    <ul className="list-disc list-inside text-secondaryText text-start p-4 rounded-md  text-sm md:text-base font-poppins space-y-2 pl-2 mb-6">
                        <li>Discounted lab fees through the Dental Lab Alliance</li>
                        <li>Eligibility for 3–9 year patient warranties via MakeMeSmile</li>
                        <li>Patient referrals from national marketing campaigns</li>
                        <li>Increased visibility as a featured providere</li>
                        <li>Case automation with our AI-powered Doctor Portal</li>
                    </ul>

                    <button onClick={() => navigate("/signup")} className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">

                        <h1 className="font-poppins font-semibold text-base text-[#434343]">
                            Register
                        </h1>
                        <div className="rounded-full bg-secondaryBrand text-white p-2">
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </section>
            <div className="py-8 sm:py-12 md:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
                <div className="text-center mb-6 sm:mb-12">
                    <h2 className=" text-sm md:text-3xl font-semibold text-secondaryBrand max-w-[600px] mx-auto text-center">
                        Simplify Your <span className="text-fouthBrand">Practice</span>  with Our  <span className="text-secondaryBrand">Subscription Plans</span>
                    </h2>
                    <p className="text-secondaryText py-8 font-poppins text-sm  font-normal">Effortless Patient Management in Three Simple Steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 relative">
                    {/* ✅ Dashed line only between first and last steps */}
                    <div className="hidden md:block absolute top-6 left-[16.666%] w-[66.666%] border-t-2 border-dashed border-gray-300 z-0"></div>

                    {Doctorsteps.map((step, idx) => (
                        <div
                            key={step.id}
                            className="flex flex-col items-center   relative z-10"
                        >
                            {/* Step Circle */}
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-fouthBrand text-white text-xl font-bold mb-6">
                                {idx + 1}
                            </div>


                            <div className="mt-6 flex-1 w-full bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-sm md:text-2xl font-poppins font-bold text-start text-secondaryBrand mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-sm font-poppins font-bold text-start text-secondaryBrand mb-4">
                                    {step?.parag}
                                </p>
                              


                                <ul className="text-gray-600 text-sm font-poppins space-y-2 pl-2">
                                    {step.description.map((desc, index) => {
                                        if (step.id === 1) { 
                                            const [firstWord, ...rest] = desc.split("–");
                                            return (
                                                <li key={index}>
                                                    <span className="font-bold">{firstWord.trim()}</span>
                                                    {rest.length > 0 && " – " + rest.join("–")}
                                                </li>
                                            );
                                        }
                                        return <li key={index}>{desc}</li>;
                                    })}
                                </ul>

                            </div>
                        </div>
                    ))}
                </div>


            </div>


        </>
    )
}

export default DoctorComponent