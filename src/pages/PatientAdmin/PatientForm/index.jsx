import React, { useState } from "react";
// import { InputField } from "../../../Common/FormInputField";
import { InputField } from '../../../Common/FormInputField'
import { FormSection } from "../../../Common/FormSection";
import { NavLink } from "react-router-dom";
import { PatientClaimInitialValues, patientClaimValidationSchema } from "../../../Common/FormsValidation/patient-claim-validation";
import { Formik, Form, FieldArray } from "formik";
import { getClaimsByUser } from "../../../api/patient-dashaboard-api";

export const PatientForm = () => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectedImplants, setSelectedImplants] = useState([]);
  const [selectedDenture, setSelectedDenture] = useState(null);

  const toggleSelection = (num, type) => {
    if (type === "teeth") {
      // setSelectedTeeth((prev) =>
      //   prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
      // );
      setSelectedTeeth((prev) =>
        prev.includes(num) ? prev.filter((t) => t !== num) : [...prev, num]
      );
    } else if (type === "implants") {
      setSelectedImplants((prev) =>
        prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
      );
    }
  };

  // API OF THE FORM
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Build warrantySelections dynamically
      const warrantySelections = [];

      if (values.crownTeeth?.length > 0) {
        warrantySelections.push({
          category: "Crown",
          years: 3, // could be user input or config
          monthlyAmount: 45.0,
          selected: values.crownTeeth, // send selected tooth numbers
        });
      }
      if (values.implantTeeth?.length > 0) {
        warrantySelections.push({
          category: "Implant",
          years: 6,
          monthlyAmount: 50.0,
          selected: values.implantTeeth,
        });
      }

      if (values.dentureTeeth) {
        warrantySelections.push({
          category: "Denture",
          years: 4,
          monthlyAmount: 30.0,
          selected: values.dentureTeeth,
        });
      }

      // Final Payload
      const payload = {
        patientName: values.patientName,
        patientPhone: values.patientPhone,
        patientEmail: values.patientEmail,
        dateOfBirth: values.dateOfBirth,
        patientAddress: values.patientAddress,
        patientCity: values.patientCity,
        patientState: values.patientState,
        patientZip: values.patientZip,

        doctorName: values.doctorName,
        doctorPhone: values.doctorPhone,
        doctorEmail: values.doctorEmail,
        doctorAddress: values.doctorAddress,
        doctorCity: values.doctorCity,
        doctorState: values.doctorState,
        doctorZip: values.doctorZip,

        licenseNumber: values.licenseNumber,
        totalUnits: values.totalUnits,
        typeOfRestoration: values.typeOfRestoration,
        shade: values.shade,
        doctorSignature: values.doctorSignature || "",

        crownTeeth: values.crownTeeth?.join(",") || "",
        implantTeeth: values.implantTeeth?.join(",") || "",
        dentureTeeth: values.dentureTeeth || "",

        paymentMethod: values.paymentMethod || "",
        creditCardMasked: values.creditCardMasked,
        ccExpiry: values.ccExpiry,
        // createdAt: values.date,

        warrantySelections, // <-- injected here
      };

      console.log("Final Payload 👉", payload);

      // Example API call
      const response = await getClaimsByUser(payload);

      if (response.success) {
        showToast("Claim submitted successfully!", "success");
        // resetForm();
      } else {
        showToast(response?.data?.responseDesc || "Failed to submit claim.", "error");
      }
    } catch (error) {
      console.error("API Error:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };









  const InputLabeStyle = `grid grid-cols-1 lg:grid-cols-4 gap-4`;

  return (
    <div className="bg-bgWhite rounded-2xl ">
      <Formik
        initialValues={PatientClaimInitialValues}
        validationSchema={patientClaimValidationSchema}
        // onSubmit={(values) => {
        //   console.log("submitt button clicked", values);
        // }}

        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="p-4  font-poppins font-medium text-sm  ">

              {/* Patient Info */}
              {/* <FormSection FormSection title="Patient Information"> */}
              <div className={InputLabeStyle}>
                <InputField label="Patient Name" name="patientName" />
                <InputField label="Phone Number" name='patientPhone' />
                <InputField label="Email Address" type="email" name='patientEmail' />
                <InputField label="Date of Birth" name='dateOfBirth' />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <InputField label="Address" className="lg:col-span-2" name='patientAddress' />
                <InputField label="City" name='patientCity' />
                <InputField label="State" name='patientState' />
                <InputField label="Zip" name="patientZip" />
              </div>
              {/* </FormSection> */}

              {/* Doctor Info */}
              <div className="mt-6">
                {/* <FormSection title="Doctor Information"> */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <InputField label="Dr. Name:" name="doctorName" />
                  <InputField label="Telephone:" name='doctorPhone' />
                  <InputField label="Email Address" type="email" name='doctorEmail' />
                </div>

                <div className={InputLabeStyle}>
                  <InputField label="Address" className="" name='doctorAddress' />
                  <InputField label="City" className="" name='doctorCity' />
                  <InputField label="State" className="" name='doctorState' />
                  <InputField label="Zip" className="" name='doctorZip' />
                </div>

                <div className={InputLabeStyle}>
                  <InputField label="License #" name='licenseNumber' />
                  <InputField label="Total # of units" type="number" name='totalUnits' />
                  <InputField label="Type of restoration" className="" name='typeOfRestoration' />
                  <InputField label="Shade" className="ml-8" name='shade' />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField label="Email Address" type="email" name='doctorSignatureEmail' />
                  <InputField label="Dr. Signature" name='doctorSignature' />
                </div>
                {/* </FormSection> */}
              </div>
            </div>
            {/* Warranty Options */}

            <div className="pl-6 pr-6 pb-6 ml-2  bg-bgWhite font-poppins ">
              <div className=" mt-6 grid grid-cols-1 lg:grid-cols-2 ">
                {/* Left Side */}
                <div className="">
                  <div className="pb-3 mb-4">
                    <h2 className="text-base font-semibold mb-2 text-[#434343]">
                      Warranty Options
                    </h2>
                  </div>
                  {/* Crown */}
                  <h3 className="mb-5 text-secondaryBrand  font-semibold">
                    Schedule A
                  </h3>
                  <h4 className="font-medium text-secondaryBrand mb-4">
                    Crown And Bridges, Onlays/Inlays And Veneers:
                    <span className="ml-5">{` ${selectedTeeth}`}</span>
                  </h4>

                  <div className="flex flex-row flex-wrap gap-2 mb-6 ">



                    <FieldArray name="crownTeeth">
                      {({ push, remove, form }) => (
                        <div className="flex flex-row flex-wrap gap-2 mb-6">
                          {Array.from({ length: 32 }, (_, i) => i + 1).map((num) => {
                            const isSelected = form?.values?.crownTeeth?.includes(num);
                            return (
                              <button
                                type="button"
                                key={num}
                                onClick={() => {
                                  if (isSelected) {
                                    // remove this tooth
                                    const index = form.values.crownTeeth.indexOf(num);
                                    remove(index);
                                  } else {
                                    // add this tooth
                                    push(num);
                                  }
                                }}
                                className={`w-8 h-8 px-5 py-4 rounded-lg border text-sm font-medium flex items-center justify-center
              ${isSelected ? "bg-[#94D3DD] text-secondaryBrand" : ""}`}
                              >
                                {num}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>

                  </div>

                  {/* Implant */}
                  <h4 className="font-medium text-secondaryBrand mb-4">
                    Implant Related Crown And Bridges:
                    <span className="ml-6">{` ${selectedImplants}`}</span>
                  </h4>
                  <div className="flex flex-row flex-wrap gap-2 mb-6">
                    {/* {Array.from({ length: 32 }, (_, i) => i + 1).map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => toggleSelection(num, "implants")}
                        className={`w-8 h-8 px-5 py-4  rounded-lg border font-medium text-sm flex items-center justify-center 
                  ${selectedImplants.includes(num)
                            ? "bg-[#94D3DD] text-secondaryBrand"
                            : ""
                          }`}
                      >
                        {num}
                      </button>
                    ))} */}
                    <FieldArray name="implantTeeth">
                      {({ push, remove, form }) => (
                        <div className="flex flex-row flex-wrap gap-2 mb-6">
                          {Array.from({ length: 32 }, (_, i) => i + 1).map((num) => {
                            const isSelected = form?.values?.implantTeeth?.includes(num);

                            return (
                              <button
                                type="button"
                                key={num}
                                onClick={() => {
                                  if (isSelected) {
                                    const index = form.values.implantTeeth.indexOf(num);
                                    remove(index);
                                  } else {
                                    push(num);
                                  }
                                }}
                                className={`w-8 h-8 px-5 py-4 rounded-lg border font-medium text-sm flex items-center justify-center
              ${isSelected ? "bg-[#94D3DD] text-secondaryBrand" : ""}`}
                              >
                                {num}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  {/* Dentures */}
                  <div className="mt-4">
                    <h4 className="font-medium text-secondaryBrand mb-4 mt-8">
                      Dentures And Partials
                    </h4>
                    <div className="flex gap-4  font-semibold text-medium">
                      {["Full Upper", "Full Lower", "Partial"].map((option) => (
                        <button
                          type="button"
                          key={option}
                          onClick={() => setSelectedDenture(option)}
                          className={`px-4 py-2 border rounded-md shadow-sm font-medium 
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
            <div className="p-6 ml-2  bg-bgWhite font-poppins text-secondaryBrand">
              <h4 className="mb-8 font-medium">
                Please select from the following options:
              </h4>
              {/* <div className="flex gap-10 md:flex-row flex-col ">
                {[
                  "Total Crown/Bridges",
                  "Total Implant Relate",
                  "Total Denture/Partials",
                ].map((section, id) => (
                  <div key={id} className="text-[#949494] justify-between">
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
              </div> */}

              <div className="mt-6  font-normal text-xs italic">
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
            <div className="p-2 mx-4 bg-bgWhite text-[#949494] border border-[#0000000D] font-poppins">
              {/* Heading */}
              <div className="border-b border-[#0000000D] pt-3 pl-2 pr-2 ">
                <h2 className="text-sm font-semibold mb-4 text-primaryText">
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
                      type="button"
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
                    <InputField label="Credit Card #" name='creditCardMasked' />
                  </div>
                  <div>
                    <InputField label="CC Expiration Date" name='ccExpiry' />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#949494]">
                  <div className="">
                    <InputField label="Patient Signature" name='patientSignature' />
                  </div>
                  <div className=" ">
                    <InputField label="Date" name='date' />
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
                <p className="text-[#8E8E8E] text-sm font-normal">
                  Yes, I understand and agree to the
                  <span className="text-secondaryBrand ">
                    <NavLink to="/patient-admin/term-condition" className="underline">
                      <span className="ml-1" />
                      Terms of Service.
                    </NavLink>
                  </span>
                </p>
              </div>

              <div className="flex gap-4 pt-10 items-center justify-center font-poppins ">
                <button type="button" className="px-16 py-4 bg-card rounded-full text-primaryText font-medium">
                  Go Back
                </button>
                <button
                  type="submit"
                  className="px-16 py-4 bg-secondaryBrand text-bgWhite rounded-full"
                >
                  Send Claim Request
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
