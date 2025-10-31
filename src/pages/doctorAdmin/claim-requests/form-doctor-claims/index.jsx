import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import { getClaimsByUser } from "../../../../api/patient-dashaboard-api";
import { useDispatch } from "react-redux";
import TeethSvg from "../../../../components/teeth-svg";
import { FormSectionHeading } from "../../../../Common/FormSection";
import { DoctorClaimInitialValues } from "../../../../Common/FormsValidation/patient-claim-validation";
import { showToast } from "../../../../store/toast-slice";
import { PatientDropdown } from "../../../../components/doctorAdmin/patient-component";
import { getDoctorProfile } from "../../../../api/doctorDasboard";
import InputField from "../../../../Common/FormInputField";
import DoctorTermCondition from "../../TermCondition";
import { toast } from "react-toastify";
import { Xmark2 } from "../../../../icon/xmark";
import axios from "axios";
import { BASE_URL } from "../../../../config";
import Icons from "../../../../components/Icons";

// Constants
const TEETH_RANGES = {
  CROWN_START: 1,
  CROWN_END: 16,
  IMPLANT_START: 17,
  IMPLANT_END: 32,
};

const ROUTES = {
  CLAIM_REQUESTS: "/doctor-admin/claim-requests",
};

const ERROR_MESSAGES = {
  SELECT_PATIENT: "Please select a patient.",
  SELECT_TOOTH: "Please select at least one tooth.",
  SELECT_ORDER: "Please select an order",
  COMPLETE_FIELDS: "Please complete all required fields.",
  SELECT_OPTIONS: "Please select all the options first.",
  SUBMIT_FAILED: "Failed to submit claim.",
  API_ERROR: "An error occurred. Please try again.",
};

const SUCCESS_MESSAGES = {
  CLAIM_SUBMITTED: "Claim submitted successfully!",
};

export const DoctorCalimsForm = () => {
  // State management
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [doctorProfileEmail, setDoctorProfileEmail] = useState(null);
  const [patientsWithOrders, setPatientsWithOrders] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [availableTeeth, setAvailableTeeth] = useState([]);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Refs
  const orderDropdownRef = useRef(null);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation logic
  const validateClaim = useCallback((values) => {
    const errors = {};

    if (!values?.patient?.id) {
      errors.patient = ERROR_MESSAGES.SELECT_PATIENT;
    }

    const totalSelected = [
      ...(values.crownTeeth || []),
      ...(values.implantTeeth || []),
    ].length;

    if (totalSelected === 0) {
      errors.teeth = ERROR_MESSAGES.SELECT_TOOTH;
    }

    return errors;
  }, []);

  // Prepare payload for submission
  const preparePayload = useCallback((values) => {
    const formatTeeth = (teeth) => {
      return Array.isArray(teeth)
        ? teeth.filter(Boolean).join(",")
        : (teeth || "").replace(/^,|,$/g, "");
    };

    return {
      patientId: values?.patient?.id,
      crownTeeth: formatTeeth(values.crownTeeth),
      implantTeeth: formatTeeth(values.implantTeeth),
    };
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      const errors = validateClaim(values);

      if (Object.keys(errors).length > 0) {
        dispatch(
          showToast({
            message: ERROR_MESSAGES.COMPLETE_FIELDS,
            type: "error",
          })
        );
        setSubmitting(false);
        return;
      }

      try {
        const payload = preparePayload(values);
        const response = await getClaimsByUser(payload);

        if (response.success) {
          dispatch(
            showToast({
              message: SUCCESS_MESSAGES.CLAIM_SUBMITTED,
              type: "success",
            })
          );
          resetForm();
          navigate(ROUTES.CLAIM_REQUESTS);
        } else {
          dispatch(
            showToast({
              message: ERROR_MESSAGES.SUBMIT_FAILED,
              type: "error",
            })
          );
        }
      } catch (error) {
        console.error("API Error:", error);
        dispatch(
          showToast({
            message: ERROR_MESSAGES.API_ERROR,
            type: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    },
    [validateClaim, preparePayload, dispatch, navigate]
  );

  // Fetch doctor profile
  const fetchDoctorProfile = useCallback(async (userId) => {
    try {
      const response = await getDoctorProfile(userId);
      const profile = response.data.data;
      const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();
      setDoctorProfile(fullName);
      setDoctorProfileEmail(profile?.email || "");
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  }, []);

  // Fetch patients with orders
  const fetchPatientsWithOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/api/users/doctors/patients-with-orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.responseStatus) {
        setPatientsWithOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching patients with orders:", error);
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    const userData = localStorage.getItem("users");
    if (!userData) return;

    try {
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;

      if (userId) {
        fetchDoctorProfile(userId);
        fetchPatientsWithOrders();
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, [fetchDoctorProfile, fetchPatientsWithOrders]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        orderDropdownRef.current &&
        !orderDropdownRef.current.contains(event.target)
      ) {
        setOrderDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get orders for selected patient
  const patientOrders = useMemo(() => {
    if (!selectedPatient?.id) return [];
    return patientsWithOrders.filter((item) => item.id === selectedPatient.id);
  }, [selectedPatient, patientsWithOrders]);

  // Parse teeth from order data
  const parseTeethFromOrder = useCallback((selectedTeeth) => {
    if (!selectedTeeth) return [];
    return selectedTeeth
      .split(",")
      .map((t) => parseInt(t.trim()))
      .filter((t) => !isNaN(t));
  }, []);

  // Reset form teeth fields
  const resetTeethFields = useCallback((setFieldValue, setFieldTouched) => {
    setFieldValue("crownTeeth", []);
    setFieldValue("implantTeeth", []);
    setFieldTouched("crownTeeth", false);
    setFieldTouched("implantTeeth", false);
  }, []);

  // Handle patient selection
  const handlePatientChange = useCallback(
    (patient, setFieldValue, setFieldTouched) => {
      setSelectedPatient(patient);
      setSelectedOrderId(null);
      setAvailableTeeth([]);
      setFieldValue("patient", patient);
      resetTeethFields(setFieldValue, setFieldTouched);
    },
    [resetTeethFields]
  );

  // Handle order selection
  const handleOrderChange = useCallback(
    (orderId, setFieldValue, setFieldTouched) => {
      setSelectedOrderId(orderId);
      const orderData = patientsWithOrders.find(
        (item) => item.orderId === orderId
      );

      if (orderData?.selectedTeeth) {
        const teeth = parseTeethFromOrder(orderData.selectedTeeth);
        setAvailableTeeth(teeth);
        resetTeethFields(setFieldValue, setFieldTouched);
      }
    },
    [patientsWithOrders, parseTeethFromOrder, resetTeethFields]
  );

  // Handle tooth selection from SVG
  const handleSvgToothClick = useCallback(
    (num, values, setFieldValue, setFieldTouched) => {
      const n = Number(num);
      const isCrownTooth = n <= TEETH_RANGES.CROWN_END;
      const fieldName = isCrownTooth ? "crownTeeth" : "implantTeeth";
      const currentTeeth = values[fieldName].slice();
      const idx = currentTeeth.indexOf(n);

      if (idx >= 0) {
        currentTeeth.splice(idx, 1);
      } else {
        currentTeeth.push(n);
      }

      currentTeeth.sort((a, b) => a - b);
      setFieldValue(fieldName, currentTeeth);
      setFieldTouched(fieldName, true);
    },
    []
  );

  // Check if tooth button should be disabled
  const isToothDisabled = useCallback(
    (toothNum) => {
      return (
        !selectedOrderId ||
        (availableTeeth.length > 0 && !availableTeeth.includes(toothNum))
      );
    },
    [selectedOrderId, availableTeeth]
  );

  // Handle form validation before showing modal
  const handleShowModal = useCallback(
    (values, setFieldTouched) => {
      setFieldTouched("crownTeeth", true);
      setFieldTouched("implantTeeth", true);
      setFieldTouched("patient", true);

      const validationErrors = validateClaim(values);

      if (Object.keys(validationErrors).length === 0) {
        setShowModal(true);
      } else {
        toast.error(ERROR_MESSAGES.SELECT_OPTIONS);
      }
    },
    [validateClaim]
  );

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

          // Calculate all disabled teeth (1-32)
          const allTeeth = Array.from({ length: 32 }, (_, i) => i + 1);
          const disabledTeethArray = allTeeth.filter((toothNum) =>
            isToothDisabled(toothNum)
          );

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
                  <div className="space-y-4">
                    {/* Patient Dropdown - Original Component */}
                    <div>
                      <PatientDropdown
                        className="w-2/4 rounded-md pt-2 text-sm text-secondaryBrand outline-none transition-shadow "
                        dropdownClass="text-secondaryBrand"
                        value={values?.patient}
                        onChange={(val) => {
                          setOrderDropdownOpen(false); // Close order dropdown
                          handlePatientChange(val, setFieldValue, setFieldTouched);
                        }}
                        onBlur={() => setFieldTouched("patient", true)}
                        classNameWidth="w-full"
                      />
                      {(!values?.patient || values?.patient?.length === 0) && 
                        (touched.patient || errors.patient) && (
                        <p className="text-red-400 text-xs mt-1">
                          Please select at least one Patient
                        </p>
                      )}
                    </div>

                    {/* Order Dropdown - Only show if patient is selected */}
                    {values?.patient?.id && patientOrders.length > 0 && (
                      <div className="w-full lg:w-2/4">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Select Order
                        </label>
                        <div className="relative" ref={orderDropdownRef}>
                          <button
                            type="button"
                            onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
                            className="flex w-full items-center justify-between gap-2 border rounded-md p-3 bg-white shadow-sm hover:border-gray-400 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {selectedOrderId ? (
                                <>
                                  <div className="w-9 h-9 rounded-full bg-[#285772]/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-[#285772]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </div>
                                  <div className="flex flex-col text-left min-w-0">
                                    <span className="text-secondaryBrand font-medium text-sm truncate">
                                      Order #{selectedOrderId}
                                    </span>
                                    <span className="text-xs text-gray-500 truncate">
                                      Teeth: {patientOrders.find(o => o.orderId === selectedOrderId)?.selectedTeeth}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <span className="text-gray-400">Select Order</span>
                              )}
                            </div>
                            <Icons.ChevronDown className="h-4 w-4 text-[#949494] flex-shrink-0" />
                          </button>

                          {orderDropdownOpen && (
                            <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                              {patientOrders.map((order, idx) => {
                                const active = selectedOrderId === order.orderId;
                                const isLast = idx === patientOrders.length - 1;
                                return (
                                  <button
                                    key={order.orderId}
                                    type="button"
                                    onClick={() => {
                                      handleOrderChange(order.orderId, setFieldValue, setFieldTouched);
                                      setOrderDropdownOpen(false);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-3 text-sm transition-colors w-full text-left
                                      ${active ? "bg-indigo-50" : "hover:bg-gray-50"}
                                      ${!isLast ? "border-b border-gray-200" : ""}`}
                                  >
                                    <div className="w-9 h-9 rounded-full bg-[#285772]/10 flex items-center justify-center flex-shrink-0">
                                      <svg className="w-5 h-5 text-[#285772]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                      <span className="text-secondaryBrand font-medium text-sm truncate">
                                        Order #{order.orderId}
                                      </span>
                                      <span className="text-xs text-gray-500 truncate">
                                        Teeth: {order.selectedTeeth}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        {!selectedOrderId && (
                          <p className="text-red-400 text-xs mt-1">
                            Please select an order
                          </p>
                        )}
                      </div>
                    )}
                  </div>
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
                    </h4>

                    <div className="flex flex-row flex-wrap gap-2 mb-6 ">
                      <FieldArray name="crownTeeth">
                        {({ push, remove }) => (
                          <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 16 }, (_, i) => {
                              const num = i + 1;
                              const selected = values.crownTeeth.includes(num);
                              const disabled = isToothDisabled(num);
                              return (
                                <button
                                  key={`crown-${num}`}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    if (!disabled) {
                                      if (selected)
                                        remove(values.crownTeeth.indexOf(num));
                                      else push(num);
                                      setFieldTouched("crownTeeth", true);
                                    }
                                  }}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-medium ${
                                    selected ? "bg-[#94D3DD] text-secondaryBrand" : ""
                                  } ${
                                    disabled ? "opacity-30 cursor-not-allowed bg-gray-100" : ""
                                  }`}
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
                    </h4>
                    <div className="flex flex-row flex-wrap gap-2 mb-6">
                      <FieldArray name="implantTeeth">
                        {({ push, remove }) => (
                          <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 16 }, (_, i) => {
                              const num = 17 + i;
                              const selected = values.implantTeeth.includes(num);
                              const disabled = isToothDisabled(num);
                              return (
                                <button
                                  key={`implant-${num}`}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    if (!disabled) {
                                      if (selected)
                                        remove(values.implantTeeth.indexOf(num));
                                      else push(num);
                                      setFieldTouched("implantTeeth", true);
                                    }
                                  }}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-medium ${
                                    selected ? "bg-[#94D3DD] text-secondaryBrand" : ""
                                  } ${
                                    disabled ? "opacity-30 cursor-not-allowed bg-gray-100" : ""
                                  }`}
                                >
                                  {num}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </FieldArray>
                      {/* Only show validation error at the end if no teeth are selected from combined set */}
                      {((!values.crownTeeth || values.crownTeeth.length === 0) && 
                        (!values.implantTeeth || values.implantTeeth.length === 0)) && 
                        (touched.crownTeeth || touched.implantTeeth || errors.teeth) && (
                        <p className="text-red-500 text-xs mt-1">
                          Please select at least one tooth.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end items-start w-full h-full">
                    <div className="relative w-[120px] h-[380px]">
                      <TeethSvg
                        selectedTeeth={combinedSelected}
                        onToothClick={(num) =>
                          handleSvgToothClick(
                            num,
                            values,
                            setFieldValue,
                            setFieldTouched
                          )
                        }
                        fillColor="#94D3DD"
                        defaultColor="#ffffff"
                        disabledTeeth={disabledTeethArray}
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
                    type="button"
                    onClick={() => handleShowModal(values, setFieldTouched)}
                    disabled={isSubmitting}
                    className="md:px-16 px-10 py-4 capitalize bg-secondaryBrand text-bgWhite rounded-full font-poppins md:text-base text-[14px] whitespace-nowrap font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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
