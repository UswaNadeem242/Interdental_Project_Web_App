import React, { useState } from "react";
import { InputField } from "../../../Common/FormInputField";
import { FormSection } from "../../../Common/FormSection";
import { NavLink } from "react-router-dom";

export const PatientForm = () => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectedImplants, setSelectedImplants] = useState([]);
  const [selectedDenture, setSelectedDenture] = useState(null);

  const toggleSelection = (num, type) => {
    if (type === "teeth") {
      setSelectedTeeth((prev) =>
        prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
      );
    } else if (type === "implants") {
      setSelectedImplants((prev) =>
        prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
      );
    }
  };

  const InputLabeStyle = `grid grid-cols-1 lg:grid-cols-4 gap-4`;

  return (
    <div className="bg-bgWhite rounded-2xl ">
      <div className="p-4  font-poppins font-medium text-sm ">
        {/* Patient Info */}
        <FormSection title="Patient Information">
          <div className={InputLabeStyle}>
            <InputField label="Patient Name" />
            <InputField label="Phone Number" />
            <InputField label="Email Address" type="email" />
            <InputField label="Date of Birth" />
          </div>

          <div className={InputLabeStyle}>
            <InputField label="Address" />
            <InputField label="City" />
            <InputField label="State" />
            <InputField label="Zip" />
          </div>
        </FormSection>

        {/* Doctor Info */}
        <div className="mt-6">
          <FormSection title="Doctor Information">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <InputField label="Dr. Name" />
              <InputField label="Telephone" />
              <InputField label="Email Address" type="email" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <InputField label="Address" className="w-full" />
              <InputField label="City" className="w-full" />
              <InputField label="State" className="w-full" />
              <InputField label="Zip" className="w-full" />
            </div>

            <div className={InputLabeStyle}>
              <InputField label="License #" />
              <InputField label="Total # of units" type="number" />
              <InputField label="Type of restoration" className="w-full" />
              <InputField label="Shade" className="w-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputField label="Email Address" type="email" />
              <InputField label="Dr. Signature" />
            </div>
          </FormSection>
        </div>
      </div>

      {/* Warranty Options */}

      <div className="pl-6 pr-6 pb-6  bg-bgWhite font-poppins ">
        <div className=" mt-6 grid grid-cols-1 lg:grid-cols-2 ">
          {/* Left Side */}
          <div className="">
            <div className="pb-3 mb-4">
              <h2 className="text-sm font-semibold text-[#434343]">
                Warranty Options
              </h2>
            </div>
            {/* Crown */}
            <h3 className="mb-4 text-secondaryBrand font-semibold">
              Schedule A
            </h3>
            <h4 className="font-medium text-secondaryBrand mb-2">
              Crown And Bridges, Onlays/Inlays And Veneers:
              <span className="ml-5">{` ${selectedTeeth}`}</span>
            </h4>

            <div className="grid grid-cols-12 gap-2 mb-6">
              {Array.from({ length: 32 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => toggleSelection(num, "teeth")}
                  className={`w-8 h-8 rounded-md border text-sm flex items-center justify-center 
                  ${selectedTeeth.includes(num)
                      ? "bg-[#94D3DD] text-secondaryBrand"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Implant */}
            <h4 className="font-medium text-secondaryBrand mb-2">
              Implant Related Crown And Bridges:
              <span className="ml-6">{` ${selectedImplants}`}</span>
            </h4>
            <div className="grid grid-cols-12 gap-2 mb-6">
              {Array.from({ length: 32 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => toggleSelection(num, "implants")}
                  className={`w-8 h-8 rounded-md border text-sm flex items-center justify-center 
                  ${selectedImplants.includes(num)
                      ? "bg-[#94D3DD] text-secondaryBrand"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Dentures */}
            <h4 className="font-medium text-secondaryBrand mb-2">
              Dentures And Partials
            </h4>
            <div className="flex gap-4 mb-6 font-semibold text-medium">
              {["Full Upper", "Full Lower", "Partial"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedDenture(option)}
                  className={`px-4 py-2 border rounded-md shadow-sm 
                  ${selectedDenture === option
                      ? "bg-[#94D3DD] text-secondaryBrand"
                      : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:ml-36 ml-12">
            <img
              src={"/assets/TeethChart.png"}
              alt="Tooth Diagram"
              className="max-w-xs"
            />
          </div>
        </div>
      </div>

      {/* Select From Options Form */}
      <div className="p-6  bg-bgWhite font-poppins text-secondaryBrand">
        <h4>Please select from the following options:</h4>
        <div className="flex gap-10 md:flex-row flex-col">
          {[
            "Total Crown/Bridges",
            "Total Implant Relate",
            "Total Denture/Partials",
          ].map((section, id) => (
            <div key={id} className="text-[#949494]">
              <InputField label={section} />
              <div className="flex gap-3 mt-4">
                {["3 Years", "6 Years", "12 Years"].map((option, id) => (
                  <label key={id} className="flex flex-1 items-center">
                    <input type="radio" value={option} name={section} />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 font-light text-xs italic">
          <h4>
            Crown/Bridges/Onlays/Inlays/Veneers: $9 per month for 36 months- $6
            per month for 72 months- $5 per month for 144 monthsImplant Related
            Crowns and Bridges: $12 per month for 36 months- $11 per month for
            72 months- $10 per month for 144 monthsDentures and Partials: $5 per
            month for 36 months- $4 per month for 72 months- $3 per month for
            144 months
          </h4>
        </div>
      </div>

      {/*Patient Participation Enrollment Agreement*/}
      <div className="p-2 m-4 bg-bgWhite text-[#949494] border border-[#0000000D] font-poppins">
        {/* Heading */}
        <div className="border-b border-[#0000000D] pt-3 pl-2 pr-2 ">
          <h2 className="text-sm font-semibold mb-4 text-secondaryBrand">
            Patient Participation Enrollment Agreements
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 text-sm text-[#434343] space-y-6">
          <p className="text-secondaryBrand text-xs font-normal italic">
            Charged monthly at the beginning of each month:
          </p>

          {/* Payment buttons */}
          <div className="flex gap-2 text-[#000000] font-medium">
            {["American Express", "MasterCard", "Visa"].map((card, id) => (
              <button
                key={id}
                className="px-4 py-2 border rounded-md shadow-sm bg-white hover:bg-gray-100"
              >
                {card}
              </button>
            ))}
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#949494]">
            <div>
              <InputField label="Credit Card #" />
            </div>
            <div>
              <InputField label="CC Expiration Date" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#949494]">
            <div className="">
              <InputField label="Patient Signature" />
            </div>
            <div className=" ">
              <InputField label="Date" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="pb-4">
        <div className="flex items-center justify-center gap-2 mt-12 font-poppins">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-[#00538F] border-gray-300 rounded-lg focus:ring-blue-500 "
          />
          <p className="text-[#8E8E8E] text-sm font-light">
            Yes, I understand and agree to the
            <span className="text-secondaryBrand ">
              <NavLink to="/patientadmin/term-condition" className="underline">
                Terms of Service.
              </NavLink>
            </span>
          </p>
        </div>

        <div className="flex gap-4 pt-10 items-center justify-center font-poppins ">
          <button className="px-12 py-4 bg-card rounded-full text-primaryText font-medium">
            Go Back
          </button>
          <button className="px-8 py-4 bg-secondaryBrand text-bgWhite rounded-full ">
            Send Claim Request
          </button>
        </div>
      </div>
    </div>
  );
};
