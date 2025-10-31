import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import { getClaimsByUser } from "../../../../api/patient-dashaboard-api";
import { useDispatch } from "react-redux";
import TeethSvg from "../../../../components/teeth-svg";
import { FormSectionHeading } from "../../../../Common/FormSection";
import {
  DoctorClaimInitialValues,
  patientClaimValidationSchema,
} from "../../../../Common/FormsValidation/patient-claim-validation";
import { showToast } from "../../../../store/toast-slice";
import { PatientDropdown } from "../../../../components/doctorAdmin/patient-component";
import { getDoctorProfile } from "../../../../api/doctorDasboard";
import InputField from "../../../../Common/FormInputField";
import DoctorTermCondition from "../../TermCondition";
import { toast } from "react-toastify";
import { Xmark, Xmark2 } from "../../../../icon/xmark";
export const DoctorCalimsForm = () => {
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [doctorProfileEmail, setDoctorProfileEmail] = useState(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const pVarible = `text-[#686868] text-sm font-poppins font-normal py-4 col-span-6 md:col-span-12`;
  const p2Varible = `text-[#686868] text-sm font-poppins font-normal py-2`;
  const liVarible = `text-black text-sm font-semibold font-poppins `;

  // Validation Only
  const validateClaim = (values) => {
    const errors = {};
    // Patient must be selected
    if (!values?.patient?.id) {
      errors.patient = "Please select a patient.";
    }

    // At least 1 crown tooth
    if (!values.crownTeeth || values.crownTeeth.length === 0) {
      errors.crownTeeth = "Please select at least one Crown tooth.";
    }

    // At least 1 implant tooth
    if (!values.implantTeeth || values.implantTeeth.length === 0) {
      errors.implantTeeth = "Please select at least one Implant tooth.";
    }

    return errors;
  };
  // API OF THE FORM
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const errors = validateClaim(values);

    if (Object.keys(errors).length > 0) {
      // Show a toast or inline errors
      dispatch(
        showToast({
          message: "Please complete all required fields.",
          type: "error",
        })
      );
      setSubmitting(false);
      return;
    }
    try {
      //  Prepare final payload in backend format
      const payload = {
        patientId: values?.patient?.id,
        crownTeeth: Array.isArray(values.crownTeeth)
          ? values.crownTeeth.filter(Boolean).join(",")
          : (values.crownTeeth || "").replace(/^,|,$/g, ""),
        implantTeeth: Array.isArray(values.implantTeeth)
          ? values.implantTeeth.filter(Boolean).join(",")
          : (values.implantTeeth || "").replace(/^,|,$/g, ""),
      };

      const response = await getClaimsByUser(payload);

      if (response.success) {
        dispatch(
          showToast({
            message: `Claim submitted successfully!`,
            type: "success",
          })
        );
        resetForm();
        navigator("/doctor-admin/claim-requests");
      } else {
        dispatch(
          showToast({
            message: "Failed to submit claim.",
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
        const fullName = `${profile?.firstName || ""} ${
          profile?.lastName || ""
        }`.trim();
        setDoctorProfile(fullName);
        setDoctorProfileEmail(profile?.email || "");
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
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          isSubmitting,
          setFieldValue,
          errors,
          setFieldTouched,
          touched,
        }) => {
          const combinedSelected = [
            ...values.crownTeeth,
            ...values.implantTeeth,
          ];
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
            <Form>
              {" "}
              <div className="p-4  font-poppins font-medium text-sm  ">
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
                    className="w-2/4 rounded-md pt-2 text-sm text-secondaryBrand outline-none transition-shadow "
                    dropdownClass="text-secondaryBrand"
                    value={values?.patient} // Formik value
                    onChange={(val) => {
                      setFieldValue("patient", val);
                    }}
                    onBlur={() => setFieldTouched("patient", true)}
                    classNameWidth="w-full"
                  />
                </FormSectionHeading>

                {(!values?.patient || values?.patient?.length === 0) && (
                  <p className="text-red-400 text-xs mt-1">
                    Please select at least one Patient
                  </p>
                )}
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
                                    if (selected)
                                      remove(values.crownTeeth.indexOf(num));
                                    else push(num);
                                  }}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-medium
                            ${
                              selected ? "bg-[#94D3DD] text-secondaryBrand" : ""
                            }`}
                                >
                                  {num}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </FieldArray>

                      {(!values.crownTeeth ||
                        values.crownTeeth.length === 0) && (
                        <p className="text-red-500 text-xs mt-1">
                          Please select at least one Crown tooth.
                        </p>
                      )}
                    </div>

                    {/* Implant */}
                    <h4 className="font-medium text-secondaryBrand mb-4">
                      Implant Related Crown And Bridges:
                    </h4>
                    <div className="flex flex-row flex-wrap gap-2 mb-6">
                      <FieldArray name="implantTeeth">
                        {({ push, remove }) => (
                          <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 16 }, (_, i) => {
                              const num = 17 + i;
                              const selected =
                                values.implantTeeth.includes(num);
                              return (
                                <button
                                  key={`implant-${num}`}
                                  type="button"
                                  onClick={() => {
                                    if (selected)
                                      remove(values.implantTeeth.indexOf(num));
                                    else push(num);
                                  }}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-medium
                            ${
                              selected ? "bg-[#94D3DD] text-secondaryBrand" : ""
                            }`}
                                >
                                  {num}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </FieldArray>
                      {(!values.implantTeeth ||
                        values.implantTeeth.length === 0) && (
                        <p className="text-red-500 text-xs mt-1">
                          Please select at least one implant tooth.
                        </p>
                      )}
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
              </div>
              {/* T&C */}
              <div className="pb-4">
                <div className="flex items-center justify-center gap-2 mt-12 font-poppins">
                  {/* <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-[#00538F] border-gray-300 rounded-lg focus:ring-blue-500 "
                  />
                  <p className="text-[#8E8E8E] text-sm font-normal">
                    Yes, I understand and agree to the
                    <span className="text-secondaryBrand ">
                      <NavLink
                        to="/doctor-admin/term-condition"
                        className="underline"
                      >
                        <span className="ml-1" />
                        Terms of Service.
                      </NavLink>
                    </span>
                  </p> */}
                </div>

                <div className="flex gap-4 pt-10 items-center justify-center font-poppins">
                  <NavLink to={`/doctor-admin/claim-requests`}>
                    <button
                      type="button"
                      className="px-16 py-4 bg-card rounded-full text-primaryText font-bold md:text-base text-[14px] whitespace-nowrap  font-poppins capitalize"
                    >
                      Go Back
                    </button>
                  </NavLink>

                  <button
                    // type="submit"
                    type="button"
                    onClick={async () => {
                      const validationErrors = validateClaim(values);

                      if (Object.keys(validationErrors).length === 0) {
                        setShowModal(true);
                      } else {
                        toast.error("Please select all the options first.");
                      }
                    }}
                    className="md:px-16 px-10 py-4 capitalize bg-secondaryBrand text-bgWhite rounded-full font-poppins md:text-base text-[14px] whitespace-nowrap font-bold"
                  >
                    Send Claim Request
                  </button>
                </div>
              </div>
              {/*  Modal */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
                  <div className="bg-white  rounded-xl w-[95%] h-[95%] shadow-lg animate-scaleUp overflow-hidden relative flex flex-col">
                    {/* Close Button */}

                    <div className="flex justify-between">
                      <div></div>
                      <div className="mr-7 mt-4">
                        <button
                          onClick={() => setShowModal(false)}
                          className=" top-3 right-10 text-gray-500 hover:text-gray-700 text-2xl leading-none "
                        >
                          <span>
                            <Xmark2 />
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4 pb-10">
                      <DoctorTermCondition />
                      <p>sdf</p>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-bgWhite pb-2 p-4 ">
                      <button
                        type="submit"
                        className="bg-[#001D58]  text-[#FFFFFF] text-sm font-normal font-poppins px-16  py-4 rounded-full "
                      >
                        Agree & Send Claim Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
