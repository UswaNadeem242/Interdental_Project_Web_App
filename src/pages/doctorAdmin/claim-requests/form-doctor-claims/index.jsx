import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import { getClaimsByUser } from "../../../../api/patient-dashaboard-api";
import { useDispatch } from "react-redux";
import TeethSvg from "../../../../components/teeth-svg";
import { FormSectionHeading } from "../../../../Common/FormSection";
import { DoctorClaimInitialValues, patientClaimValidationSchema } from "../../../../Common/FormsValidation/patient-claim-validation";
import { showToast } from "../../../../store/toast-slice";
import { PatientDropdown } from "../../../../components/doctorAdmin/patient-component";
import { getDoctorProfile } from "../../../../api/doctorDasboard";
import InputField from "../../../../Common/FormInputField";
export const DoctorCalimsForm = () => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectedImplants, setSelectedImplants] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [doctorProfileEmail, setDoctorProfileEmail] = useState(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const toggleSelection = (num, type) => {
    if (type === "teeth") {

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
        doctorName: values.doctorName,
        doctorEmail: values.doctorEmail,
        crownTeeth: Array.isArray(values.crownTeeth)
          ? values.crownTeeth.filter(Boolean).join(",")
          : (values.crownTeeth || "").replace(/^,|,$/g, ""), // remove leading/trailing commas
        implantTeeth: Array.isArray(values.implantTeeth)
          ? values.implantTeeth.filter(Boolean).join(",")
          : (values.implantTeeth || "").replace(/^,|,$/g, ""),

        warrantySelections: [
          ...(Array.isArray(values.crownTeeth) ? values.crownTeeth : []),
          ...(Array.isArray(values.implantTeeth) ? values.implantTeeth : [])
        ]


      };


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
  useEffect(() => {
    const userData = localStorage.getItem("users");
    if (!userData) return;

    const parsedUserData = JSON.parse(userData);
    const userId = parsedUserData.id;

    const fetchDoctorProfile = async () => {
      try {
        const response = await getDoctorProfile(userId);
        const profile = response.data.data;
        const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();
        setDoctorProfile(fullName);
        setDoctorProfileEmail(profile?.email || "")
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfile();
  }, []);

  return (
    <div className="bg-bgWhite rounded-2xl">
      <Formik
        initialValues={DoctorClaimInitialValues}
        validationSchema={patientClaimValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isSubmitting, setFieldValue, errors, setFieldTouched }) => {

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
            <Form>   <div className="p-4  font-poppins font-medium text-sm  ">

              <FormSectionHeading title="Doctor Information">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* <InputField label="Dr. Name" name="doctorName" placeholder='Dr. Emily Smith' /> */}
                  <InputField
                    type="text"
                    label="Dr. Name"
                    name="doctorName"
                    value={doctorProfile}
                    readOnly
                    placeholder="Dr. Emily Smith"
                  />
                  <InputField
                    type="text"
                    label="Email Address"
                    name="doctorEmail"
                    value={doctorProfileEmail}
                    readOnly
                    placeholder="dr.emily@clinic.com"
                  />
                </div>
              </FormSectionHeading>

              {/* Patient Info */}
              <FormSectionHeading title="Patient Information">
                <PatientDropdown
                  className="w-2/4 rounded-md pt-2 text-sm text-secondaryBrand outline-none transition-shadow"
                  dropdownClass="text-secondaryBrand"
                  value={values.patientFirstName} // Formik value
                  onChange={(val) => {
                    setFieldValue("patientFirstName", val);
                    setFieldTouched("patientFirstName", true, true)
                  }
                  }
                  onBlur={() => setFieldTouched("patientFirstName", true)}
                  classNameWidth='w-full'
                />
                {errors.patientFirstName &&
                  touched.patientFirstName && (
                    <p className="text-red-800 text-xs capitalize">
                      {errors.patientFirstName}
                    </p>
                  )}
              </FormSectionHeading>

            </div>

              <div className="pl-6 pr-6 pb-6 ml-2  bg-bgWhite font-poppins ">
                <div className=" mt-6 grid grid-cols-1 lg:grid-cols-2 ">
                  {/* Left Side */}
                  <div className="">
                    <div className="pb-3 mb-4">
                      <h2 className="text-base font-semibold mb-2 text-[#434343]">
                        Warranty Options
                      </h2>
                    </div>

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
                  </div>
                  <div className="flex justify-end items-start w-full h-full">
                    <div className="relative w-[120px] h-[380px]">
                      <TeethSvg
                        selectedTeeth={combinedSelected}
                        onToothClick={handleSvgToothClick}
                        fillColor="#94D3DD"
                        defaultColor="#ffffff"
                      />
                    </div>
                  </div>
                </div>
              </div>  {/* Footer */}

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
                      <NavLink to="/doctor-admin/term-condition" className="underline">
                        <span className="ml-1" />
                        Terms of Service.
                      </NavLink>
                    </span>
                  </p>
                </div>

                <div className="flex gap-4 pt-10 items-center justify-center font-poppins">
                  <NavLink to={`/doctor-admin/claim-request`}>
                    <button type="button" className="px-16 py-4 bg-card rounded-full text-primaryText font-bold text-base  font-poppins capitalize" >
                      Go Back
                    </button>
                  </NavLink>

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
