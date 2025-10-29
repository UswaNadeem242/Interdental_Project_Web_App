import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "1",
    name: "Starter Plan",
    price: "$125",
    duration: "Per Month",
    enrollmentFee: "One‑Time Setup Fee: $125",
    features: [
      "Enroll patients into MMS",
      "Get discounted pricing on select cases",
      "Priority Case Handling",
      "Pick labs nationwide from dental lab alliance",
      "One time set up fee yes!",
    ],
    buttonStyle:
      "text-secondaryBrand border-secondaryBrand text-sm  font-semibold  font-popins",
  },
  {
    id: "2",
    name: "Growth Plan",
    price: "$275",
    duration: "Per Month",
    enrollmentFee: "One‑Time Setup Fee: $125",
    features: [
      "Enroll patients into MMS",
      "Get discounted pricing on select cases",
      "Pick labs nationwide from dental lab alliance",
      "One time set up fee yes!for growth 275.00 up to 20 crowns per month",
    ],
    buttonStyle:
      "text-secondaryBrand border-secondaryBrand text-sm  font-semibold  font-popins",
  },
  {
    id: "3",
    name: "Pro Plan",
    price: "$475",
    duration: "Per Month",
    enrollmentFee: "One‑Time Setup Fee: $125",
    features: [
      "Unlimited MMS crowns",
      "Enroll patients into MMS",
      "Get discounted pricing on select cases",
      "Pick labs nationwide from dental lab alliance",
      "One time set up fee yes! 475.00",
    ],
    buttonStyle:
      "text-secondaryBrand border-secondaryBrand text-sm  font-semibold  font-popins",
  },
  {
    id: "4",
    name: "Referral Plan",
    price: null,
    duration: "Coming Soon",
    enrollmentFee: "",
    features: [
      "We refer patients to you Featured listing as a Participating Provider",
      "Great for practices looking to grow",
      "Cancel anytime",
      "Coming soon",
    ],
    isReferral: true,
  },
];

function EnrollmentPlans() {
  const navigate = useNavigate();

  return (
    <div className="p-6 mt-6">
      <h2 className="text-lg md:text-3xl font-normal text-primaryText capitalize text-center tracking-wide">
        DOCTOR{" "}
        <span className="font-bold text-lg md:text-3xl font-poppins uppercase text-secondaryBrand">
          ENROLLMENT
        </span>{" "}
        <span className="md:text-3xl text-lg font-bold font-poppins uppercase text-fouthBrand ">
          PLANS{" "}
        </span>
      </h2>
      {/* Plans Grid */}
      <div className="mx-auto mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-full">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white border rounded-xl  p-4 sm:p-6 flex flex-col justify-between  transition    duration-300 hover:-translate-y-2 hover:shadow-[0px_100px_80px_0px_rgba(49,49,49,0.10)] `}
          >
            {/* Card content */}
            <div>
              {plan.isReferral ? (
                <div className="bg-secondaryBrand text-white rounded-lg p-4 text-center">
                  <p className="text-2xl  sm:text-xl font-bold font-poppins capitalize ">
                    {plan.name}
                  </p>
                  <p className="text-base font-bold font-poppins ">
                    {plan.duration}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-base sm:text-xl font-semibold font-poppins capitalize text-center">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-3xl font-bold font-poppins text-secondaryBrand text-center">
                    {plan.price}
                    <span className="text-sm font-semibold font-poppins text-secondaryBrand">
                      /month
                    </span>
                  </p>
                </>
              )}
              <ul className="mt-4 list-disc list-inside rounded-xl bg-blue-300/10 p-2 text-gray-700 space-y-2 text-sm sm:text-base mx-auto max-w-[20rem] custom-list">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className={`${
                      plan.isReferral
                        ? "text-secondaryBrand"
                        : "text-secondaryBrand"
                    } marker:text-secondaryBrand`}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Button */}
            {!plan.isReferral && (
              <button
                className={`mt-8 sm:mt-12 px-4 sm:px-6 py-2 sm:py-3 w-full border rounded-lg ${plan.buttonStyle}`}
                aria-label={`Select ${plan.name}`}
                onClick={() => navigate("/doctor-admin/dashboard")}
              >
                Select
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrollmentPlans;
