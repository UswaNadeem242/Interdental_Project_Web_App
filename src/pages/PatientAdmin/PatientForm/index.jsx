import React, { useState } from "react";
// import { InputField } from "../../../Common/FormInputField";
import  InputField  from '../../../Common/FormInputField'
import { FormSection, FormSectionHeading } from "../../../Common/FormSection";
import { NavLink, useNavigate } from "react-router-dom";
import { DoctorClaimInitialValues, PatientClaimInitialValues, patientClaimValidationSchema } from "../../../Common/FormsValidation/patient-claim-validation";
import { Formik, Form, FieldArray, Field } from "formik";
import { getClaimsByUser } from "../../../api/patient-dashaboard-api";
import { showToast } from "../../../store/toast-slice";
import { useDispatch } from "react-redux";
import TeethSvg from "../../../components/teeth-svg";

export const PatientForm = () => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectedImplants, setSelectedImplants] = useState([]);
  const [selectedDenture, setSelectedDenture] = useState(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();
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
      const warrantySelections = [];

      const pushSelection = (field, yearsField, category, monthlyAmount) => {
        const teethValue = values[field];

        if (teethValue && teethValue.toString().trim() !== "") {
          warrantySelections.push({
            category,
            years: values[yearsField]
              ? parseInt(values[yearsField].replace(/\D/g, ""), 10) // convert "6 Years" -> 6
              : null,
            monthlyAmount,
          });
        }
      };
      pushSelection("crownTeeth", "crownYears", "Crown", 45.0);
      pushSelection("implantTeeth", "implantYears", "Implant", 50.0);
      pushSelection("dentureTeeth", "dentureYears", "Denture", 30.0);
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
        crownTeeth: Array.isArray(values.crownTeeth)
          ? values.crownTeeth.filter(Boolean).join(",")
          : (values.crownTeeth || "").replace(/^,|,$/g, ""), // remove leading/trailing commas

        implantTeeth: Array.isArray(values.implantTeeth)
          ? values.implantTeeth.filter(Boolean).join(",")
          : (values.implantTeeth || "").replace(/^,|,$/g, ""),

        dentureTeeth: Array.isArray(values.dentureTeeth)
          ? values.dentureTeeth.filter(Boolean).join(",")
          : (values.dentureTeeth || "").replace(/^,|,$/g, ""),

        warrantySelections,

        paymentMethod: values.paymentMethod || "",
        creditCardMasked: values.creditCardMasked,
        ccExpiry: values.ccExpiry,
        // createdAt: values.date,

        // warrantySelections, // <-- injected here
      };

      console.log("Final Payload 👉", payload);

      // Example API call
      const response = await getClaimsByUser(payload);
      console.log(response);

      if (response.success) {

        dispatch(
          showToast({
            message: `Claim submitted successfully!`,
            type: "success",
          })
        );
        resetForm();
        navigator('/patient-admin/claim-request')
      } else {
        dispatch(
          showToast({
            message: `response?.data?.responseDesc || "Failed to submit claim.`,
            type: "error",
          })
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      dispatch(
        showToast({
          message: `An error occurred. Please try again.`,
          type: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  const InputLabeStyle = `grid grid-cols-1 lg:grid-cols-4 gap-4`;

  return (
    <div className="bg-bgWhite rounded-2xl">
      <Formik
        initialValues={DoctorClaimInitialValues}
        validationSchema={patientClaimValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => {
          const combinedSelected = [...values.crownTeeth, ...values.implantTeeth];
          const handleSvgToothClick = (num) => {
            const n = Number(num);
            if (n <= 16) {
              // toggle in crownTeeth
              const arr = values.crownTeeth.slice();
              const idx = arr.indexOf(n);
              if (idx >= 0) {
                arr.splice(idx, 1);
              } else {
                arr.push(n);
              }
              arr.sort((a, b) => a - b);
              setFieldValue("crownTeeth", arr);
            } else {
              // toggle in implantTeeth
              const arr = values.implantTeeth.slice();
              const idx = arr.indexOf(n);
              if (idx >= 0) {
                arr.splice(idx, 1);
              } else {
                arr.push(n);
              }
              arr.sort((a, b) => a - b);
              setFieldValue("implantTeeth", arr);
            }
          };
          return (
            <Form >
              <div className="p-4  font-poppins font-medium text-sm  ">

                {/* Patient Info */}
                <FormSectionHeading title="Patient Information">
                  <div className={InputLabeStyle}>
                    <InputField label="Patient Name" name="patientName" placeholder='Jane Doe' />
                    <InputField label="Phone Number" name='patientPhone' placeholder='+1-555-123-4567' />
                    <InputField label="Email Address" type="email" name='patientEmail' placeholder='jane@example.com' />
                    <InputField label="Date of Birth" name='dateOfBirth' placeholder='YYYY-MM-DD' />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <InputField label="Address" className="lg:col-span-2" name='patientAddress' placeholder='123 Main St' />
                    <InputField label="City" name='patientCity' placeholder='New York' />
                    <InputField label="State" name='patientState' placeholder='NY' />
                    <InputField label="Zip" name="patientZip" placeholder='10001' />
                  </div>
                </FormSectionHeading>

                {/* Doctor Info */}
                <div className="mt-6">
                  <FormSectionHeading title="Doctor Information">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <InputField label="Dr. Name" name="doctorName" placeholder='Dr. Emily Smith' />
                      <InputField label="Telephone" name='doctorPhone' placeholder='555-999-8888' />
                      <InputField label="Email Address" type="email" name='doctorEmail' placeholder='dr.emily@clinic.com' />
                    </div>

                    <div className={InputLabeStyle}>
                      <InputField label="Address" className="" name='doctorAddress' placeholder='Clinic St 5' />
                      <InputField label="City" className="" name='doctorCity' placeholder='New York' />

                      <InputField label="State" className="" name='doctorState' placeholder='NY' />
                      <InputField label="Zip" className="" name='doctorZip' placeholder='10001' />
                    </div>

                    <div className={InputLabeStyle}>
                      <InputField label="License #" name='licenseNumber' placeholder='LIC-56789' />
                      <InputField label="Total # of units" type="number" name='totalUnits' placeholder='5' />
                      <InputField label="Type of restoration" className="" name='typeOfRestoration' placeholder='Crown' />
                      <InputField label="Shade" className="ml-8" name='shade' placeholder='A2' />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <InputField label="Email Address" type="email" name='doctorSignatureEmail' placeholder='dr.emily@clinic.com' />
                      <InputField label="Dr. Signature" name='doctorSignature' placeholder='signature.png' />
                    </div>
                  </FormSectionHeading>
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
                        {({ push, remove }) => (
                          <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 16 }, (_, i) => {
                              const num = i + 1;
                              const selected = values.crownTeeth.includes(num);
                              return (
                                <button
                                  key={`crown-${num}`}
                                  type="button"
                                  onClick={() => {
                                    if (selected) remove(values.crownTeeth.indexOf(num));
                                    else push(num);
                                  }}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-medium
                            ${selected ? "bg-[#94D3DD] text-secondaryBrand" : ""}`}
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
                      <FieldArray name="implantTeeth">
                        {({ push, remove }) => (
                          <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 16 }, (_, i) => {
                              const num = 17 + i;
                              const selected = values.implantTeeth.includes(num);
                              return (
                                <button
                                  key={`implant-${num}`}
                                  type="button"
                                  onClick={() => {
                                    if (selected) remove(values.implantTeeth.indexOf(num));
                                    else push(num);
                                  }}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-medium
                            ${selected ? "bg-[#94D3DD] text-secondaryBrand" : ""}`}
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
                    <div className="pt-6 bg-bgWhite font-poppins text-secondaryBrand">
                      <h4>Please select from the following options:</h4>

                      <div className="  flex gap-10 md:flex-row flex-col pt-8 ">
                        {/* flex gap-10 md:flex-row  pt-8 */}
                        {[
                          {
                            label: "Total Crown/Bridges",
                            field: "crownTeeth",
                            yearsField: "crownYears",
                            category: "Crown",
                            monthlyAmount: 45.0,

                          },
                          {
                            label: "Total Implant Relate",
                            field: "implantTeeth",
                            yearsField: "implantYears",
                            category: "Implant",
                            monthlyAmount: 50.0,
                          },
                          {
                            label: "Total Denture/Partials",
                            field: "dentureTeeth",
                            yearsField: "dentureYears",
                            category: "Denture",
                            monthlyAmount: 30.0,
                          },
                        ].map((section, id) => (
                          <div key={id} className="text-[#949494] justify-between">
                            {/* count input */}
                            <InputField label={section.label} name={section.field} placeholder='3' />

                            {/* years selection */}
                            <div className="flex gap-3 mt-4">
                              {["3 Years", "6 Years", "12 Years"].map((option, idx) => (
                                <label key={idx} className="flex flex-2 items-center">
                                  <Field
                                    type="radio"
                                    name={section.yearsField} // <-- tracked by Formik
                                    value={option}
                                  />
                                  <span className="ml-2 text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* <div className="lg:ml-36 ml-12">
                    <img
                    src={"/assets/TeethChart.png"}
                    alt="Tooth Diagram"
                    className="max-w-xs"
                  />

                    <TeethSvg selectedTeeth={combinedSelected} onToothClick={handleSvgToothClick} fillColor="#94D3DD"
                      defaultColor="#ffffff" />

                  </div> */}

                  <div className="flex justify-end items-start w-full h-full">
                    <div className="relative w-[380px] h-[380px]">
                      <TeethSvg
                        selectedTeeth={combinedSelected}
                        onToothClick={handleSvgToothClick}
                        fillColor="#94D3DD"
                        defaultColor="#ffffff"
                      />
                    </div>
                  </div>



                </div>
              </div>

              {/* Select From Options Form */}
              <div className="p-6 ml-2  bg-bgWhite font-poppins text-secondaryBrand">
                <h4 className="mb-8 font-medium">
                  Please select from the following options:
                </h4>

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
                  <h2 className="text-xs font-semibold mb-4 text-primaryText font-poppins">
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
                      <InputField label="Credit Card #" name='creditCardMasked' placeholder='1111 1111 1111 1111' />
                    </div>
                    <div>
                      <InputField label="CC Expiration Date" name='ccExpiry' placeholder='2027-09' />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#949494]">
                    <div className="">
                      <InputField label="Patient Signature" name='patientSignature' placeholder='signature.png' />
                    </div>
                    <div className=" ">
                      <InputField label="Date" name='date' placeholder='YYYY-MM-DD' />
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
                      {/* <NavLink to="/patient-admin/term-condition" className="underline">
                        <span className="ml-1" />
                        Terms of Service.
                      </NavLink> */}
                    </span>
                  </p>
                </div>

                <div className="flex gap-4 pt-10 items-center justify-center font-poppins ">
                  <button type="button" className="px-16 py-4 bg-card rounded-full text-primaryText font-bold text-base  font-poppins capitalize">
                    Go Back
                  </button>
                  <button
                    type="submit"
                    className="px-16 py-4 capitalize bg-secondaryBrand text-bgWhite rounded-full font-poppins text-base font-bold"
                  >
                    Send Claim Request
                  </button>
                </div>
              </div>
            </Form>
          )


        }}
      </Formik>
    </div >
  );
};
