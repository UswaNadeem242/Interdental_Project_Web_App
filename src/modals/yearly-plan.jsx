import React from "react";
import { useNavigate } from "react-router-dom";
import { plansmodel } from "../Constant";

const YearlyPlanModel = ({ yearly, setYearly }) => {
    const navigate = useNavigate();
    // Removed unused handleOpenModal, handleCloseModal

    const Check = (props) => (
        <svg
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
            className={`h-4 w-4 flex-none ${props.className ?? ""}`}
        >
            <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            {/* <div className="flex flex-col justify-center items-center gap-[24px] bg-white p-[32px] rounded-[24px] shadow-lg w-[325px] h-[314px] relative">
        <svg
          width="87"
          height="86"
          viewBox="0 0 87 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="86" height="86" rx="43" fill="#001D58" />
          <path
            d="M42.7258 49.6964C52.1235 49.6964 60.057 51.2427 60.057 57.2148C60.057 63.1869 52.0726 64.6817 42.7258 64.6817C33.3281 64.6817 25.3945 63.133 25.3945 57.1633C25.3945 51.1912 33.3767 49.6964 42.7258 49.6964ZM42.7258 20.7759C49.0911 20.7759 54.1936 25.9444 54.1936 32.3921C54.1936 38.8398 49.0911 44.0083 42.7258 44.0083C36.3604 44.0083 31.258 38.8398 31.258 32.3921C31.258 25.9444 36.3604 20.7759 42.7258 20.7759Z"
            fill="white"
          />
          <path
            d="M61.0296 26.7622C61.5235 26.7622 61.9181 27.1736 61.8975 27.6671L61.5335 36.3858C61.514 36.851 61.1312 37.2182 60.6655 37.2182H59.1667C58.701 37.2182 58.3182 36.851 58.2988 36.3858L57.9347 27.6671C57.9141 27.1736 58.3087 26.7622 58.8027 26.7622H61.0296ZM59.9707 42.8064C59.3158 42.8064 58.7774 42.6172 58.3553 42.2388C57.9479 41.8459 57.7441 41.3657 57.7441 40.7981C57.7441 40.216 57.9479 39.7285 58.3553 39.3356C58.7774 38.9427 59.3158 38.7462 59.9707 38.7462C60.611 38.7462 61.1349 38.9427 61.5424 39.3356C61.9644 39.7285 62.1754 40.216 62.1754 40.7981C62.1754 41.3657 61.9644 41.8459 61.5424 42.2388C61.1349 42.6172 60.611 42.8064 59.9707 42.8064Z"
            fill="white"
          />
        </svg>

        <div className="flex flex-col justify-center items-center gap-[4px] w-[261px] h-[76px]">
          <p className="font-poppins font-medium text-[20px] leading-[30px] text-[#000000]">
            Account Required!
          </p>
          <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494] text-center">
            Please log in or register to proceed further.
          </p>
        </div>
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="flex justify-center items-center gap-[24px] w-[261px] h-[40px]">
          <button
            onClick={handleCloseModal}
            className="flex justify-center items-center text-[#001D58] w-[118.5px] h-[40px] rounded-[12px] border-[1px] border-[#001D58] gap-[8px] py-[19px] px-[30px] "
          >
            <h1 className="text-[12px] font-poppins font-normal leading-[18px]">
              Cancel
            </h1>
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="flex justify-center items-center bg-[#001D58] text-white w-[118.5px] h-[40px] rounded-[12px] border-[1px] border-[#001D58] gap-[8px] py-[19px] px-[10px] "
          >
            <h1 className="text-[12px] font-poppins font-normal leading-[18px]">
              Create Account
            </h1>
          </button>
        </div>
      </div> */}
            <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
                {/* Header */}
                <div className="flex justify-center ">  <img src="/assets/logo.png" /></div>
                <h2 className="text-base md:text-3xl font-bold text-primaryText uppercase text-center tracking-wide">
                    DOCTOR <span className="font-bold text-3xl  text-secondaryBrand font-poppins uppercase">ENROLLMENT</span> <span className="text-3xl font-bold font-poppins uppercase text-fouthBrand">PLANS </span>
                </h2>
                

                {/* Plans Grid */}
                <div className="mx-auto mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl">
                    {Array.isArray(plansmodel) && plansmodel.length > 0 ? (
                        plansmodel.map((plan) => (
                            <div
                                key={plan.id}
                                className="border rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition"
                            >
                                {/* Title & Price */}
                                <h3 className="text-lg sm:text-xl font-semibold font-poppins text-center">
                                    {plan.title}
                                </h3>
                                <p className="mt-2 text-2xl font-bold text-secondaryBrand text-center">
                                    {plan.price}
                                </p>

                                {/* Description */}
                                <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
                                    {plan.description?.map((desc, i) => (
                                        <li key={i} className="flex items-start gap-2 capitalize">
                                            <span className="mt-1 text-blue-500">
                                                <Check />
                                            </span>
                                            <span>{desc}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <button
                                    className={`mt-6 px-4 py-2 w-full border rounded-lg ${plan.buttonStyle}`}
                                    onClick={() => navigate("/signup")}
                                >
                                    Select
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">
                            No plans available
                        </p>
                    )}
                </div>

                <p className="mt-4 sm:mt-6 text-sm md:text-base text-gray-600 text-center max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
                    If you do not see what you want, don&apos;t worry{' '}
                    <a
                        href="/contact-us"
                        className="text-secondaryBrand font-bold underline hover:text-blue-600"
                    >
                        Contact Us
                    </a>{' '}
                    and we will create a personalized proposal that fits your business needs.
                </p>

            </section>
        </div>
    );
};

export default YearlyPlanModel;
