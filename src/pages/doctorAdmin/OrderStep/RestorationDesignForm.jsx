import React, { useEffect, useState } from "react";
import FormSection from "../../../components/doctorAdmin/CommonLabel/FormSelection";
import LabeledInput from "../../../components/doctorAdmin/CommonLabel/inputLable";
import MaterialDropdown from "../../../components/doctorAdmin/CommonLabel/selectInputLabel";
import TeethChart from "../../../components/doctorAdmin/TeethComponent";
import StepperTabs from "../../../components/doctorAdmin/StepperTab";
import ReviewOrder from "./Review";
import CheckoutForm from "./Checkout";
import {
  // DIGITAL_DENTURE,
  Digital_Option,
} from "../../../Constant";
import { useDispatch, useSelector } from "react-redux";
import { fetchDropdowns } from "../../../store/slices/order-dropdown-slice/index";
import { fetchTeeth } from "../../../store/slices/teeth-slice/index";
import {
  updateToothSelection,
  selectTooth,
  setNote,
  setDoctorField,
  resetRestoration,
  setDueDate,
} from "../../../store/slices/restoration-slice/index";
import { SmileDesignPicker } from "../../../components/doctorAdmin/DoctorModel/smile";
import DonePage from "./DonePage";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FileUploadSection } from "../../../components/doctorAdmin/OrderFileSelection";
import { ShadeDropdown } from "../../../Common/DropDown/NestedDropdown";
import { Form, Formik } from "formik";
import { OrderValidationSchema } from "../../../Common/FormsValidation/order-validation";
import { toast } from "react-toastify";
import { showToast } from "../../../store/toast-slice";
import { PatientDropdown } from "../../../components/doctorAdmin/patient-component";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Drawers from "../../../Common/Drawers";
import AddPatientForm from "../PatientDoctor/AddPatientForm";
import { getDoctorProfile } from "../../../api/doctorDasboard";
import { DropdownWrapper } from "../../../Common/drop-down-wrapper";
const DoctorOrder = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {
    orders,
    shadeGroups,
    loading: dropdownLoading,
  } = useSelector((state) => state.dropdown);
  const { teethData, loading: teethLoading } = useSelector(
    (state) => state.teeth
  );
  const {
    selectedTeeth,
    selectedTooth,
    toothSelections,
    doctorOrderItems,
    doctor,
    patient,
  } = useSelector((state) => state.restoration);
  const [touched, setTouched] = useState({});
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const steps = [
    { id: "s1", title: "Restoration Design Form" },
    { id: "s2", title: "Review" },
    { id: "s3", title: "Checkout" },
    { id: "s4", title: "Completion" },
  ];
  const currentStepIndex = 0; // update this dynamically from your state
  const currentStep = steps[currentStepIndex];
  const [activeIndex, setActiveIndex] = useState(0);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const next = () => setActiveIndex((prev) => Math.min(prev + 1, 3));
  const back = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartSize, setChartSize] = useState(480);
  useEffect(() => {
    const small = window.matchMedia("(max-width: 639px)");
    const medium = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)"
    );
    const large = window.matchMedia("(min-width: 1024px)");

    const updateSize = () => {
      if (small.matches) {
        setChartSize(100); // mobile
      } else if (medium.matches) {
        setChartSize(200); // tablet
      } else if (large.matches) {
        setChartSize(440); // desktop
      }
    };

    updateSize();
    [small, medium, large].forEach((mq) =>
      mq.addEventListener("change", updateSize)
    );

    return () => {
      [small, medium, large].forEach((mq) =>
        mq.removeEventListener("change", updateSize)
      );
    };
  }, []);

  const handleDropdownChange = (field, option) => {
    if (!selectedTooth) return; // ❌ this will block if your slice doesn't set selectedTooth properly
    if (!option) return;
    dispatch(
      updateToothSelection({
        toothId: selectedTooth, // must be an ID
        field,
        value: option.value,
        price: Number(option.price) || 0,
        option,
      })
    );
  };
  useEffect(() => {
    dispatch(fetchDropdowns());
    dispatch(fetchTeeth());
  }, [dispatch]);

  const activeToothSelection =
    toothSelections.find((t) => t.toothId === selectedTooth) || {};
  const totalPrice = toothSelections.reduce((toothSum, tooth) => {
    // for each tooth, sum its fields that have price
    const toothTotal = Object.values(tooth)
      .filter((field) => field && typeof field === "object" && field.price)
      .reduce((sum, field) => sum + field.price, 0);

    return toothSum + toothTotal;
  }, 0);

  useEffect(() => {
    dispatch(resetRestoration());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    id: "",
    reference: "",
  });
  useEffect(() => {
    const userData = localStorage.getItem("users");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;

      const fetchDoctorProfile = async () => {
        const response = await getDoctorProfile(userId);
        setDoctorProfile(response?.data?.data);
        if (doctorProfile?.id && doctorProfile?.officeRefNumber) {
          dispatch(
            setDoctorField({
              id: doctorProfile.id,
              officeRefNumber: doctorProfile.officeRefNumber,
            })
          );
        }
      };
      fetchDoctorProfile();
    }
  }, []);
  useEffect(() => {
    if (doctorProfile) {
      setFormData({
        id: doctorProfile?.id || "",
        reference: doctorProfile?.officeRefNumber || "",
      });
    }
  }, [doctorProfile]);

  const handleDueDateChange = (e) => {
    dispatch(setDueDate({ dueDate: e.target.value }));
  };
  return (
    <>
      <div className="flex flex-col rounded-3xl justify-center items-start">
        <main className="flex-1 bg-white rounded-3xl p-4 sm:p-6 w-full">
          <Formik
            initialValues=""
            validationSchema={OrderValidationSchema}
            onSubmit=""
          >
            {({
              validateForm,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => {
              const handleTabClick = async (index) => {
                if (index === activeIndex) return;
                const formErrors = await validateForm();
                if (Object.keys(formErrors).length === 0) {
                  setActiveIndex(index);
                } else {
                  if (currentStep) {
                    dispatch(
                      showToast({
                        message: `Please complete all required fields before proceeding to Review.`,
                        type: "error",
                      })
                    );
                  }
                }
              };
              return (
                <>
                  <StepperTabs
                    steps={steps}
                    setActiveIndex={(i) => handleTabClick(i)}
                    activeIndex={activeIndex}
                    back={back}
                    next={next}
                  />

                  {/* Tab Content */}
                  {activeIndex === 0 && (
                    <Formik
                      initialValues={{
                        officeReg: "",
                        dueDate: "",
                        patientFirstName: "",
                        patientLastName: "",
                        scannerType: "",
                        digitalOptions: "",
                        surgical_guide: "",
                        Model_type: "",
                        material: "",
                        lab: "",
                        selectedTeeth: [], // 🟢 track selected teeth
                        toothSelections: {},
                        note: "",
                        crown: "",
                        photogrammetryfiles: "",
                      }}
                      validationSchema={OrderValidationSchema}
                      validateOnChange={true} // 🚫 Validation har change pe na chale
                      validateOnBlur={true}
                      onSubmit={(values, { setSubmitting }) => {
                        next();
                        setSubmitting(false);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        validateForm,
                        setFieldValue,
                        handleBlur,
                      }) => (
                        <Form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-screen">
                            {/* Left 3 */}
                            <aside className="col-span-12 md:col-span-3 space-y-4">
                              <FormSection
                                title="Doctor Info"
                                color="text-xs font-semibold"
                                className="border border-gray-200 p-4"
                                gap="gap-4"
                              >
                                {" "}
                                <LabeledInput
                                  type="text"
                                  label="Office Reference number"
                                  name="officeReg"
                                  value={formData?.reference}
                                  onBlur={handleBlur}
                                  placeholder="Office Reference number"
                                />
                                <lable className="text-primaryText text-xs font-semibold font-poppins capitalize">
                                  Case expected due date
                                </lable>
                                <LabeledInput
                                  label="Case expected due date"
                                  type="date"
                                  name="dueDate"
                                  min={new Date().toISOString().split("T")[0]}
                                  // value={values.dueDate || ""}
                                  // onChange={(e) => {
                                  //   const value = e.target.value;
                                  //   const fieldName = e.target.name;
                                  //   setFieldValue(fieldName, value);
                                  //   dispatch(
                                  //     setDoctorField({
                                  //       field: fieldName,
                                  //       value,
                                  //     })
                                  //   );
                                  // }}

                                  value={
                                    doctor.find((d) => d.field === "dueDate")
                                      ?.value || ""
                                  }
                                  onChange={handleDueDateChange}
                                  onBlur={handleBlur}
                                />
                                {errors.dueDate && (
                                  <p className="text-red-800 text-xs capitalize">
                                    {errors.dueDate}
                                  </p>
                                )}
                              </FormSection>

                              <FormSection
                                title={
                                  <div className="flex justify-between items-center">
                                    <span>Patient ID</span>
                                    <div className="relative group">
                                      <button
                                        type="button"
                                        className="p-1 rounded-full  text-secondaryBrand"
                                        onClick={() => setIsOpen(true)}
                                      >
                                        <PlusIcon className="h-3 w-3" />
                                      </button>
                                      {/* Tooltip */}
                                      <div className="  absolute left-full top-1/2 -translate-y-1/2 ml-2   hidden group-hover:block  z-50">
                                        {/* hidden group-hover:block */}
                                        <div className="w-52 rounded-md bg-white font-normal px-4  py-1 text-[8.03px] text-secondaryText shadow">
                                          Add New Patient if the patient is not
                                          exist in the dropdown
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                }
                                color="text-xs font-semibold"
                                className="border border-gray-200 p-4"
                                gap="gap-0"
                              >
                                <PatientDropdown
                                  className="w-full rounded-md pt-2 text-sm text-secondaryBrand outline-none transition-shadow"
                                  dropdownClass="text-secondaryBrand"
                                  value={values.patientFirstName} // Formik value
                                  onChange={(val) =>
                                    setFieldValue("patientFirstName", val)
                                  } // update formik
                                />
                                {errors.patientFirstName &&
                                  touched.patientFirstName && (
                                    <p className="text-red-800 text-xs capitalize">
                                      {errors.patientFirstName}
                                    </p>
                                  )}
                              </FormSection>
                              <div className="bg-textField  rounded-md ">
                                <button
                                  onClick={() => setIsModalOpen(true)}
                                  className="w-full bg-textField  font-poppins text-secondaryBrand rounded-lg px-4 py-3 text-left cursor-pointer border text-sm font-normal flex justify-between"
                                >
                                  Select Smile Design
                                  <span>
                                    <ChevronDownIcon className="w-3 h-3" />
                                  </span>
                                </button>
                                {selected > 0 && (
                                  <p className="py-2 px-2 text-sm text-secondaryBrand">
                                    Smile Design :{" "}
                                    {selected.length > 0
                                      ? selected.join(", ")
                                      : ""}
                                  </p>
                                )}
                              </div>
                              <MaterialDropdown
                                className="w-full rounded-md bg-textField px-4 py-3 text-sm text-secondaryBrand outline-none transition-shadow"
                                options={
                                  orders.find((p) => p.name === "Scanner")
                                    ?.children || []
                                }
                                value={activeToothSelection.scannerType || ""}
                                onChange={(option) => {
                                  if (!selectedTooth) return; // make sure tooth is selected
                                  dispatch(
                                    updateToothSelection({
                                      toothId: selectedTooth,
                                      field: "scannerType",
                                      value: option.value,
                                      price: option.price,
                                      option,
                                    })
                                  );
                                  if (option) {
                                    setTouched((prev) => ({
                                      ...prev,
                                      scannerType: false,
                                    }));
                                  }
                                }}
                                label="Scanner Type"
                                storageKey="scannerType"
                                dropdownClass="text-secondaryBrand"
                                error={
                                  touched.scannerType &&
                                  !activeToothSelection.scannerType
                                    ? "Scanner Type is Required Select the Teeth"
                                    : ""
                                }
                              />
                              <div>
                                <FileUploadSection />
                              </div>
                              <FormSection
                                title="Additional Notes"
                                className="border border-gray-200 p-4"
                                gap="gap-4"
                              >
                                <textarea
                                  type="text"
                                  rows={2}
                                  name="note"
                                  value={values.note}
                                  placeholder="Write here"
                                  maxLength={500}
                                  className="w-full resize-none rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Dispatch to Redux
                                    dispatch(setNote(value));
                                    // Update Formik state
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                />
                                {errors.note && (
                                  <p className="text-red-800 text-xs capitalize">
                                    {errors.note}
                                  </p>
                                )}
                              </FormSection>
                            </aside>
                            <section className="col-span-12 md:col-span-6 space-y-4">
                              <div className="h-full min-h-[400px] rounded-2xl border border-gray-200 bg-white p-2">
                                <div className="grid grid-cols-2 gap-4 mt-5 mb-10">
                                  {/* <MaterialDropdown
                                    className=" w-full rounded-xl bg-white border border-gray-200   px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                    options={
                                      orders.find((p) => p.name === "Denture")
                                        ?.children || []
                                    }
                                    value={
                                      toothSelections.find(
                                        (t) => t.toothId === selectedTooth
                                      )?.digitalOptions || ""
                                    }
                                    onChange={(option) => {
                                      if (!selectedTooth) {
                                        dispatch(
                                          showToast({
                                            message: `Please select a tooth first`,
                                            type: "error",
                                          })
                                        );

                                        return;
                                      }
                                      dispatch(
                                        updateToothSelection({
                                          toothId: selectedTooth,
                                          field: "digitalOptions",
                                          value: option.value,
                                          price: option.price || 0,
                                          option,
                                        })
                                      );
                                      setTouched((prev) => ({
                                        ...prev,
                                        digitalOptions: false,
                                      }));
                                    }}
                                    label=" Denture"
                                    storageKey="digitalOptions"
                                    // error={touched.digitalOptions && !toothSelections[selectedTeeth]?.digitalOptions ? "Digital Denture is Required Select the teeth" : ""}
                                    error={
                                      touched.digitalOptions &&
                                      !toothSelections.find(
                                        (t) => t.toothId === selectedTooth
                                      )?.digitalOptions
                                        ? "Digital Denture is Required Select the teeth"
                                        : ""
                                    }
                                  />
                                  <MaterialDropdown
                                    className="w-full rounded-xl border border-gray-200 cursor-not-allowed  bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                    // options={
                                    //   orders.find(
                                    //     (p) => p.name === "Surgical Guide"
                                    //   )?.children || []
                                    // }
                                    // value={
                                    //   toothSelections.find(
                                    //     (t) => t.toothId === selectedTooth
                                    //   )?.surgical_guide || ""
                                    // }
                                    // onChange={(val) => {
                                    //   if (!selectedTooth) {
                                    //     dispatch(
                                    //       showToast({
                                    //         message: `Please select a tooth first`,
                                    //         type: "error",
                                    //       })
                                    //     );

                                    //     return;
                                    //   }
                                    //   handleDropdownChange(
                                    //     "surgical_guide",
                                    //     val
                                    //   );
                                    //   if (val) {
                                    //     setTouched((prev) => ({
                                    //       ...prev,
                                    //       surgical_guide: false,
                                    //     }));
                                    //   }
                                    // }}
                                    label="Surgical Guide"
                                    storageKey="surgical_guide"
                                    // error={
                                    //   touched.surgical_guide &&
                                    //     !toothSelections.find(
                                    //       (t) => t.toothId === selectedTooth
                                    //     )?.surgical_guide
                                    //     ? "Surgical Guide is Required. Please select a tooth."
                                    //     : ""
                                    // }
                                    disabled={!selectedTooth}
                                  /> */}
                                </div>
                                <div className="flex flex-wrap gap-2  justify-center flex-col">
                                  <button className="text-[#949494] text-sm font-normal pb-10 font-poppins h-full">
                                    upper Arch
                                  </button>
                                  {/* <img src='/assets/doctor/image.png' /> */}
                                  <div>
                                    <TeethChart
                                      teeth={teethData}
                                      sizePx={chartSize}
                                      initialSelectedIds={selectedTeeth}
                                      currentToothId={selectedTooth}
                                      onSelect={(tooth) => {
                                        const id =
                                          tooth?.id ||
                                          tooth?.toothId ||
                                          (typeof tooth === "number"
                                            ? tooth
                                            : null);
                                        if (id) {
                                          dispatch(selectTooth(id));
                                        }
                                      }}
                                    />
                                  </div>

                                  {/* <button className="text-[#949494] text-sm font-normal pt-10  font-poppins">Lower Arch</button> */}
                                </div>
                              </div>
                            </section>
                            {/* Right 3 */}
                            <aside className="col-span-12 md:col-span-3 space-y-4 flex flex-col justify-between">
                              <div className="flex  flex-col justify-between ">
                                <div className="w-full">
                                  <FormSection className="p-0">
                                    <DropdownWrapper buttonLabel="Modules">
                                      <MaterialDropdown
                                        className2="relative z-0"
                                        className=" w-full  bg-white border    px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                        options={
                                          orders.find(
                                            (p) => p.name === "Denture"
                                          )?.children || []
                                        }
                                        value={
                                          toothSelections.find(
                                            (t) => t.toothId === selectedTooth
                                          )?.digitalOptions || ""
                                        }
                                        onChange={(option) => {
                                          if (!selectedTooth) {
                                            dispatch(
                                              showToast({
                                                message: `Please select a tooth first`,
                                                type: "error",
                                              })
                                            );

                                            return;
                                          }
                                          dispatch(
                                            updateToothSelection({
                                              toothId: selectedTooth,
                                              field: "digitalOptions",
                                              value: option.value,
                                              price: option.price || 0,
                                              option,
                                            })
                                          );
                                          setTouched((prev) => ({
                                            ...prev,
                                            digitalOptions: false,
                                          }));
                                        }}
                                        label=" Denture"
                                        storageKey="digitalOptions"
                                        // error={touched.digitalOptions && !toothSelections[selectedTeeth]?.digitalOptions ? "Digital Denture is Required Select the teeth" : ""}
                                        // error={
                                        //   touched.digitalOptions &&
                                        //   !toothSelections.find(
                                        //     (t) => t.toothId === selectedTooth
                                        //   )?.digitalOptions
                                        //     ? "Digital Denture is Required Select the teeth"
                                        //     : ""
                                        // }
                                      />
                                      <MaterialDropdown
                                        className2="relative z-0"
                                        className="w-full border    bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                        options={
                                          orders.find(
                                            (p) => p.name === "Surgical Guide"
                                          )?.children?.length > 0
                                            ? orders.find(
                                                (p) =>
                                                  p.name === "Surgical Guide"
                                              )?.children
                                            : [
                                                {
                                                  label: "Not Available",
                                                  value: "",
                                                },
                                              ]
                                        }
                                        hideCheckForNotAvailable={true}
                                        // value={
                                        //   toothSelections.find(
                                        //     (t) => t.toothId === selectedTooth
                                        //   )?.surgical_guide || ""
                                        // }
                                        // onChange={(val) => {
                                        //   if (!selectedTooth) {
                                        //     dispatch(
                                        //       showToast({
                                        //         message: `Please select a tooth first`,
                                        //         type: "error",
                                        //       })
                                        //     );

                                        //     return;
                                        //   }
                                        //   handleDropdownChange(
                                        //     "surgical_guide",
                                        //     val
                                        //   );
                                        //   if (val) {
                                        //     setTouched((prev) => ({
                                        //       ...prev,
                                        //       surgical_guide: false,
                                        //     }));
                                        //   }
                                        // }}
                                        label="Surgical Guide"
                                        storageKey="surgical_guide"
                                        // error={
                                        //   touched.surgical_guide &&
                                        //     !toothSelections.find(
                                        //       (t) => t.toothId === selectedTooth
                                        //     )?.surgical_guide
                                        //     ? "Surgical Guide is Required. Please select a tooth."
                                        //     : ""
                                        // }
                                        disabled={!selectedTooth}
                                      />

                                      <MaterialDropdown
                                        className2="relative z-0"
                                        options={
                                          orders.find((p) => p.name === "Crown")
                                            ?.children || []
                                        }
                                        value={
                                          toothSelections.find(
                                            (t) => t.toothId === selectedTooth
                                          )?.crown?.value || ""
                                        }
                                        onChange={(val) => {
                                          if (!selectedTooth) {
                                            toast.error(
                                              "Please select a tooth first",
                                              {
                                                position: "top-right",
                                                autoClose: 3000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                              }
                                            );
                                            return;
                                          }
                                          const option = (
                                            orders.find(
                                              (p) => p.name === "Crown"
                                            )?.children || []
                                          ).find((c) => c.value === val);

                                          handleDropdownChange("crown", {
                                            value: option?.value || val,
                                            label: option?.label || "",
                                            price: option?.price || 0,
                                            option, // pass the full object if needed in redux
                                          });

                                          setTouched((prev) => ({
                                            ...prev,
                                            crown: false,
                                          }));
                                        }}
                                        label="Smart Crown"
                                        storageKey="crown"
                                        className="w-full  bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                      />
                                      <MaterialDropdown
                                        className2="relative z-0"
                                        options={
                                          orders.find(
                                            (p) => p.name === "Material"
                                          )?.children || []
                                        }
                                        value={
                                          toothSelections.find(
                                            (t) => t.toothId === selectedTooth
                                          )?.material || ""
                                        }
                                        onChange={(val) => {
                                          if (!selectedTooth) {
                                            dispatch(
                                              showToast({
                                                message: `Please select a tooth first`,
                                                type: "error",
                                              })
                                            );

                                            return;
                                          }

                                          handleDropdownChange("material", val);

                                          if (val) {
                                            setTouched((prev) => ({
                                              ...prev,
                                              material: false,
                                            }));
                                          }
                                        }}
                                        label="Material"
                                        storageKey="material"
                                        className="w-full  bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                      />

                                      <ShadeDropdown
                                        className="relative"
                                        shades={shadeGroups}
                                        selectedTooth={selectedTooth}
                                        touched={touched}
                                        setTouched={setTouched}
                                        onChange={(selected) =>
                                          console.log(selected)
                                        }
                                      />
                                      {/* <MaterialDropdown
                                        options={Digital_Option}
                                        value={
                                          toothSelections[selectedTeeth]
                                            ?.digital_option || ""
                                        }
                                        onChange={(val) =>
                                          handleDropdownChange(
                                            "digital_option",
                                            val
                                          )
                                        }
                                        label=" Digital Model type"
                                        className="w-full  bg-white  px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                      /> */}

                                      <MaterialDropdown
                                        className2="relative z-0"
                                        options={
                                          orders.find(
                                            (p) =>
                                              p.name === "Digital Model Type"
                                          )?.children || []
                                        }
                                        value={
                                          toothSelections.find(
                                            (t) => t.toothId === selectedTooth
                                          )?.Model_type || ""
                                        } // ✅ correct selected value
                                        onChange={(val) => {
                                          if (!selectedTooth) {
                                            dispatch(
                                              showToast({
                                                message: `Please select a tooth first`,
                                                type: "error",
                                              })
                                            );
                                            return;
                                          }

                                          handleDropdownChange(
                                            "Model_type",
                                            val
                                          );

                                          if (val) {
                                            setTouched((prev) => ({
                                              ...prev,
                                              Model_type: false,
                                            }));
                                          }
                                        }}
                                        label="Digital Model Type"
                                        storageKey="Digital Model Type"
                                        className="w-full bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                      />
                                      <MaterialDropdown
                                        className2="relative z-0"
                                        options={
                                          orders.find(
                                            (p) =>
                                              p.name === "Participating Lab"
                                          )?.children || []
                                        }
                                        value={
                                          toothSelections.find(
                                            (t) => t.toothId === selectedTooth
                                          )?.lab || ""
                                        } // ✅ correct selected value
                                        onChange={(val) => {
                                          if (!selectedTooth) {
                                            dispatch(
                                              showToast({
                                                message: `Please select a tooth first`,
                                                type: "error",
                                              })
                                            );
                                            return;
                                          }

                                          handleDropdownChange("lab", val);

                                          if (val) {
                                            setTouched((prev) => ({
                                              ...prev,
                                              lab: false,
                                            }));
                                          }
                                        }}
                                        label="Dental lab alliance"
                                        storageKey="Dental lab alliance"
                                        className="w-full bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                      />
                                    </DropdownWrapper>

                                    {/* <MaterialDropdown
                                      options={
                                        orders.find((p) => p.name === "Crown")
                                          ?.children || []
                                      }
                                      value={
                                        toothSelections.find(
                                          (t) => t.toothId === selectedTooth
                                        )?.crown?.value || ""
                                      }
                                      onChange={(val) => {
                                        if (!selectedTooth) {
                                          toast.error(
                                            "Please select a tooth first",
                                            {
                                              position: "top-right",
                                              autoClose: 3000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                            }
                                          );
                                          return;
                                        }
                                        const option = (
                                          orders.find((p) => p.name === "Crown")
                                            ?.children || []
                                        ).find((c) => c.value === val);

                                        handleDropdownChange("crown", {
                                          value: option?.value || val,
                                          label: option?.label || "",
                                          price: option?.price || 0,
                                          option, // pass the full object if needed in redux
                                        });

                                        setTouched((prev) => ({
                                          ...prev,
                                          crown: false,
                                        }));
                                      }}
                                      label="Smart Crown"
                                      storageKey="crown"
                                      className="w-full rounded-xl bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                      error={
                                        touched.crown &&
                                        !toothSelections.find(
                                          (t) => t.toothId === selectedTooth
                                        )?.crown
                                          ? "Crown is required. Please select a value."
                                          : ""
                                      }
                                    /> */}
                                    {/* <MaterialDropdown
                                      options={
                                        orders.find(
                                          (p) => p.name === "Material"
                                        )?.children || []
                                      }
                                      value={
                                        toothSelections.find(
                                          (t) => t.toothId === selectedTooth
                                        )?.material || ""
                                      }
                                      onChange={(val) => {
                                        if (!selectedTooth) {
                                          dispatch(
                                            showToast({
                                              message: `Please select a tooth first`,
                                              type: "error",
                                            })
                                          );

                                          return;
                                        }

                                        handleDropdownChange("material", val);

                                        if (val) {
                                          setTouched((prev) => ({
                                            ...prev,
                                            material: false,
                                          }));
                                        }
                                      }}
                                      label="Material"
                                      storageKey="material"
                                      className="w-full rounded-xl bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                      error={
                                        touched.material &&
                                        !toothSelections.find(
                                          (t) => t.toothId === selectedTooth
                                        )?.material
                                          ? "Material is required. Please select a tooth first"
                                          : ""
                                      }
                                    /> */}
                                    {/* <ShadeDropdown
                                      shades={shadeGroups}
                                      selectedTooth={selectedTooth}
                                      touched={touched}
                                      setTouched={setTouched}
                                      onChange={(selected) =>
                                        console.log(selected)
                                      }
                                    />
                                    <MaterialDropdown
                                      options={Digital_Option}
                                      value={
                                        toothSelections[selectedTeeth]
                                          ?.digital_option || ""
                                      }
                                      onChange={(val) =>
                                        handleDropdownChange(
                                          "digital_option",
                                          val
                                        )
                                      }
                                      label=" Digital Model type"
                                      className="w-full rounded-xl  bg-white  px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                    />
                                    <MaterialDropdown
                                      options={
                                        orders.find(
                                          (p) => p.name === "Participating Lab"
                                        )?.children || []
                                      }
                                      value={
                                        toothSelections.find(
                                          (t) => t.toothId === selectedTooth
                                        )?.lab || ""
                                      } // ✅ correct selected value
                                      onChange={(val) => {
                                        if (!selectedTooth) {
                                          dispatch(
                                            showToast({
                                              message: `Please select a tooth first`,
                                              type: "error",
                                            })
                                          );
                                          return;
                                        }

                                        handleDropdownChange("lab", val);

                                        if (val) {
                                          setTouched((prev) => ({
                                            ...prev,
                                            lab: false,
                                          }));
                                        }
                                      }}
                                      label="Dental lab alliance"
                                      storageKey="Dental lab alliance"
                                      className="w-full rounded-xl bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                      error={
                                        touched.lab &&
                                        !toothSelections.find(
                                          (t) => t.toothId === selectedTooth
                                        )?.lab
                                          ? "Participating Lab is required. Please select a tooth first."
                                          : ""
                                      }
                                    /> */}
                                    <MaterialDropdown
                                      options={
                                        orders.find(
                                          (p) =>
                                            p.name === "Photogrammetry files"
                                        )?.children || []
                                      }
                                      value={
                                        toothSelections.find(
                                          (t) => t.toothId === selectedTooth
                                        )?.photogrammetryfiles || ""
                                      } // ✅ get value from current tooth
                                      onChange={(val) => {
                                        if (!selectedTooth) {
                                          dispatch(
                                            showToast({
                                              message: `Please select a tooth first`,
                                              type: "error",
                                            })
                                          );
                                          return;
                                        }

                                        handleDropdownChange(
                                          "photogrammetryfiles",
                                          val
                                        );

                                        if (val) {
                                          setTouched((prev) => ({
                                            ...prev,
                                            photogrammetryfiles: false,
                                          }));
                                        }
                                      }}
                                      label="Photogrammetry files"
                                      storageKey="Photogrammetry files"
                                      className="w-full rounded-xl bg-[#F8F8F8] border-none px-4 py-3 text-sm text-secondaryBrand outline-none transition-shadow "
                                      dropdownClass="text-secondaryBrand"
                                      error={
                                        touched.photogrammetryfiles &&
                                        !toothSelections.find(
                                          (t) => t.toothId === selectedTooth
                                        )?.photogrammetryfiles
                                          ? "Photogrammetry files is required. Please select a tooth first."
                                          : ""
                                      }
                                    />
                                  </FormSection>
                                </div>

                                <div className="mt-96">
                                  <div className="flex flex-col space-y-3">
                                    {Object.entries(toothSelections).map(
                                      ([toothId, values]) => (
                                        <div
                                          key={toothId}
                                          className="space-y-1"
                                        >
                                          {/* Material */}
                                          <div className="flex justify-between items-center py-1">
                                            <p className="text-xs text-textFieldHeading">
                                              {values.materialOption?.label ||
                                                "No Material"}{" "}
                                              x1
                                            </p>
                                            <p className="text-xs font-medium">
                                              $
                                              {values.materialPrice ||
                                                values.materialOption?.price ||
                                                0}
                                            </p>
                                          </div>

                                          {/* Crown */}
                                          <div className="flex justify-between items-center py-1">
                                            <p className="text-xs text-textFieldHeading">
                                              {values.crown?.label ||
                                                "No Crown"}
                                            </p>
                                            <p className="text-xs font-medium">
                                              ${values.crown?.price || 0}
                                            </p>
                                          </div>

                                          {/* digital model */}
                                          <div className="flex justify-between items-center py-1">
                                            <p className="text-xs text-textFieldHeading">
                                              {values.Model_typeOption?.label ||
                                                "Digital Model Type"}
                                            </p>
                                            <p className="text-xs font-medium">
                                              $
                                              {values.Model_typeOption?.price ||
                                                0}
                                            </p>
                                          </div>

                                          {/* Digital Denture */}
                                          <div className="flex justify-between items-center py-1">
                                            <p className="text-xs text-textFieldHeading">
                                              {values.digitalOptionsOption
                                                ?.label || "No Digital Denture"}
                                            </p>
                                            <p className="text-xs font-medium">
                                              $
                                              {values.digitalOptionsOption
                                                ?.price || 0}
                                            </p>
                                          </div>

                                          {/* Lab */}
                                          <div className="flex justify-between items-center py-1">
                                            <p className="text-xs text-textFieldHeading">
                                              {values?.labOption?.label ||
                                                "Participating Lab"}
                                            </p>
                                            <p className="text-xs font-medium">
                                              ${values?.labOption?.price || 0}
                                            </p>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                  <> </>

                                  <div className="">
                                    <div className="flex justify-between items-center py-3">
                                      <p className="text-textFieldHeading text-xs font-poppins">
                                        Subtotal:
                                      </p>
                                      <p className="text-[#1A1A1A] font-medium text-xs font-poppins">
                                        ${totalPrice.toFixed(2)}
                                      </p>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-t">
                                      <p className="text-textFieldHeading text-xs font-poppins">
                                        Shipping:
                                      </p>
                                      <p className="text-[#1A1A1A] font-medium text-xs font-poppins">
                                        {/* ${shipping.toFixed(2)} */}
                                      </p>
                                    </div>
                                    <div className="flex justify-between items-center py-3 font-poppins">
                                      <p className="text-[#4D4D4D] text-base font-normal   leading-normal">
                                        Total:
                                      </p>

                                      <p className="text-[#1A1A1A] font-semibold text-lg font-poppins">
                                        ${totalPrice.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  // onClick={() => {
                                  //   // ✅ validate form before next
                                  //   console.log('erroe', errors);
                                  //   validateForm().then((errors) => {
                                  //     if (Object.keys(errors).length === 0) {
                                  //       // no errors → submit → move next

                                  //       handleSubmit();
                                  //     } else {
                                  //       // show toast instead of silently failing
                                  //       toast.error("⚠️ Please fill all required fields", {
                                  //         position: "bottom-right",
                                  //         autoClose: 3000,
                                  //       });
                                  //     }
                                  //   });
                                  // }}
                                  onClick={() => next()}
                                  className="font-poppins w-full bg-[#0b2b62] px-6 py-3 text-sm font-medium text-[#F8F8F8] hover:bg-[#092b58]"
                                >
                                  Checkout
                                </button>
                              </div>
                            </aside>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                  {activeIndex === 1 && <ReviewOrder next={next} />}
                  {activeIndex === 2 && <CheckoutForm next={next} />}
                  {activeIndex === 3 && <DonePage next={next} />}
                </>
              );
            }}
          </Formik>
        </main>
        {isModalOpen && (
          <SmileDesignPicker
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        <div>
          <Drawers
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Add New User"
            Content={<AddPatientForm onClose={() => setIsOpen(false)} />}
          />
        </div>
      </div>
    </>
  );
};

export default DoctorOrder;
