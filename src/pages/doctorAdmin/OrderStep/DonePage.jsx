import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const DonePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bgWhite p-4 ">
      <div className="flex flex-col items-center gap-6 text-center max-w-xl">
        {/* Green Circle with SVG */}
        <div className="bg-[#4FAD2E] w-20 h-20 rounded-full flex items-center justify-center">
          <svg
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.52539 12L12.1632 21.2631L31.4728 2.73682"
              stroke="white"
              strokeWidth="4.63158"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center px-2">
          <h1 className="text-black text-lg sm:text-xl font-semibold font-poppins capitalize">
            Your Order Has Been Successfully <br className="" />Placed!
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm font-normal font-poppins capitalize mt-2">
            Thank you for shopping with us. Your order is being processed, and
            you’ll receive an email confirmation shortly with the details. We
            appreciate your trust in our service, and we’ll ensure your order is
            delivered promptly.
          </p>
        </div>

        {/* Button */}
        <NavLink to='/doctor-admin/orders'>
          <button className="bg-secondaryBrand text-white rounded-full px-5 py-4 w-full sm:w-80 md:w-96 font-poppins text-sm font-semibold" >
            Track Order
          </button>
        </NavLink>

      </div>
    </div>
  );
};

export default DonePage;
