import React, { useEffect, useState } from "react";
import FormSection from "../../../components/doctorAdmin/CommonLabel/FormSelection";
import LabeledInput from "../../../components/doctorAdmin/CommonLabel/inputLable";
import MaterialDropdown from "../../../components/doctorAdmin/CommonLabel/selectInputLabel";
import StepperTabs from "../../../components/doctorAdmin/StepperTab";
import ReviewOrder from "./Review";
import CheckoutForm from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { fetchDropdowns } from "../../../store/slices/order-dropdown-slice/index";
import { fetchTeeth } from "../../../store/slices/teeth-slice/index";
import {
  updateGlobalSelection,
  updateShadeSelection,
  resetGlobalSelections,
  selectTooth,
  setNote,
  setDoctorField,
  setDueDate,
  resetRestoration,
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
import RestorationTeethSvg from "../../../components/restoration-page-teeth";
const DoctorOrder = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {
    orders,
    shadeGroups,
    loading: dropdownLoading,
  } = useSelector((state) => state.dropdown);
  console.log(shadeGroups, "shadeGroups");
  const { teethData, loading: teethLoading } = useSelector(
    (state) => state.teeth
  );
  const {
    selectedTeeth,
    selectedTooth,
    doctor,
    patient,
    note,
    globalSelections,
  } = useSelector((state) => state.restoration);
  const [touched, setTouched] = useState({});
  const [selected, setSelected] = useState(null);

  // Debug: Log when selected changes
  useEffect(() => {
    if (selected) {
      console.log("Selected object keys:", Object.keys(selected));
      console.log("Selected name:", selected.name);
      console.log("Selected name:", selected.name);
    }
  }, [selected]);
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
    if (!option) return;
    dispatch(
      updateGlobalSelection({
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

  // Reset global selections when no teeth are selected
  useEffect(() => {
    if (selectedTeeth.length === 0) {
      dispatch(resetGlobalSelections());
    }
  }, [selectedTeeth.length, dispatch]);

  const totalPrice = (selectedTeeth?.length || 0) * Object?.values(globalSelections || {})
    ?.filter((selection) => selection && selection?.price && selection?.price > 0)
    ?.reduce((sum, selection) => sum + (selection?.price || 0), 0) || 0;

  // Remove the resetRestoration call that was clearing all data on mount
  useEffect(() => {
    dispatch(resetRestoration());
  }, []);
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
              id: doctorProfile?.id,
              officeRefNumber: doctorProfile?.officeRefNumber,
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

  // Update form field when doctor profile loads
  const [formikRef, setFormikRef] = useState(null);

  useEffect(() => {
    if (doctorProfile?.officeRefNumber && formikRef) {
      formikRef.setFieldValue('officeReg', doctorProfile.officeRefNumber);
    }
  }, [doctorProfile, formikRef]);

  const handleDueDateChange = (e, setFieldValue) => {
    const value = e.target.value;
    dispatch(setDueDate({ dueDate: value }));
    setFieldValue("dueDate", value);
  };

  const today = new Date();
  // Format YYYY-MM-DD for <input type="date">
  const formattedToday = today.toISOString().split("T")[0];
  return (
    <>
      <div className="flex flex-col rounded-3xl justify-center items-start">
        <main className="flex-1 bg-white rounded-3xl p-4 sm:p-6 w-full">
          <Formik
            initialValues={{
              officeReg: "",
              dueDate: doctor?.dueDate || "",
              patientFirstName: patient?.name || "",
              patientLastName: patient?.lastName || "",
              scannerType: globalSelections?.scannerType?.value || "",
              digitalOptions: globalSelections?.digitalOptions?.value || "",
              surgical_guide: globalSelections?.surgical_guide?.value || "",
              Model_type: globalSelections?.Model_type?.value || "",
              material: globalSelections?.material?.value || "",
              lab: globalSelections?.lab?.value || "",
              note: note || "",
              crown: globalSelections?.crown?.value || "",
              photogrammetryfiles: globalSelections?.photogrammetryfiles?.value || "",
            }}
            validationSchema={OrderValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              next();
              setSubmitting(false);
            }}
          >
            {({
              validateForm,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
            }) => {
              // Set formik ref for external updates
              if (!formikRef) {
                setFormikRef({ setFieldValue });
              }
              const handleTabClick = async (index) => {
                if (index === activeIndex) return; // same tab click - ignore

                // Allow moving backward freely
                if (index < activeIndex) {
                  setActiveIndex(index);
                  return;
                }

                const formErrors = await validateForm();

                // Check if teeth are selected
                if (selectedTeeth.length === 0) {
                  dispatch(
                    showToast({
                      message: "Please select at least one tooth first",
                      type: "error",
                    })
                  );
                  return;
                }

                // Check if patient is selected
                if (!values?.patientFirstName || values?.patientFirstName === "" || values?.patientFirstName === null || values?.patientFirstName === undefined) {
                  dispatch(
                    showToast({
                      message: "Please select a patient first",
                      type: "error",
                    })
                  );
                  return;
                }

                if (Object.keys(formErrors).length === 0) {
                  setActiveIndex(index); // proceed to next tab
                } else {
                  // Show the first error message
                  const firstErrorField = Object.keys(formErrors)[0];
                  const firstErrorMessage = formErrors[firstErrorField];

                  dispatch(
                    showToast({
                      message: firstErrorMessage,
                      type: "error",
                    })
                  );
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
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Office Reference number"
                            />
                            <FormSection
                              title="Created Date"
                              color="text-xs font-semibold"
                              className="border  border-none"
                              gap="gap-4"
                            ></FormSection>
                            <p className="w-full  rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm  text-gray-900 placeholder-[#949494]outline-none transition-shadow  outline-none placeholder:font-poppins placeholder:text-[10px] placeholder:capitalize">
                              {new Date().toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                            <FormSection
                              title="Due Date"
                              color="text-xs font-semibold"
                              className="border  border-none"
                              gap="gap-4"
                            >
                              <LabeledInput
                                label="Case expected due date"
                                type="date"
                                name="dueDate"
                                min={formattedToday}
                                value={values?.dueDate || ""}
                                onChange={(e) => {
                                  handleChange(e);
                                  handleDueDateChange(e, setFieldValue);
                                }}
                                onBlur={handleBlur}
                              />
                              {errors?.dueDate && touched?.dueDate && (
                                <p className="text-red-800 text-xs capitalize">
                                  {errors?.dueDate}
                                </p>
                              )}
                            </FormSection>
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
                                    <PlusIcon className="h-3 w-3 " />
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
                              value={patient || values?.patientFirstName} // Use Redux patient or Formik value
                              onChange={(patient) => {
                                console.log(patient, "patient");
                                // patient is now the full patient object
                                if (patient) {
                                  const firstName = patient?.firstName?.trim() || "";
                                  const lastName = patient?.lastName?.trim() || "";
                                  setFieldValue("patientFirstName", firstName);
                                  setFieldValue("patientLastName", lastName);
                                } else {
                                  setFieldValue("patientFirstName", "");
                                  setFieldValue("patientLastName", "");
                                }
                              }} // update formik
                              classNameWidth=" w-80"
                            />
                            {errors?.patientFirstName &&
                              touched?.patientFirstName && (
                                <p className="text-red-800 text-xs capitalize">
                                  {errors?.patientFirstName}
                                </p>
                              )}
                          </FormSection>
                          <div className="bg-textField  rounded-md ">
                            <button
                              type="button"
                              onClick={() => setIsModalOpen(true)}
                              className="w-full bg-textField  font-poppins text-secondaryBrand rounded-lg px-4 py-3 text-left cursor-pointer border text-sm font-normal flex justify-between"
                            >
                              Select Smile Design
                              <span>
                                <ChevronDownIcon className="w-3 h-3" />
                              </span>
                            </button>
                            {/*  */}

                            {/*  */}
                            {selected && (
                              <div className="py-2 px-2 text-sm text-secondaryBrand">
                                <p className="font-medium mb-1">
                                  Selected Smile Design:
                                </p>
                                <p className="text-xs">
                                  {selected?.name || selected?.label || "Unknown"}
                                </p>
                              </div>
                            )}
                          </div>
                          <MaterialDropdown
                            className="w-full rounded-md bg-textField px-4 py-3 text-sm text-secondaryBrand outline-none transition-shadow"
                            options={
                              orders?.find((p) => p?.name === "Scanner")
                                ?.children || []
                            }
                            value={globalSelections?.scannerType?.value || ""}
                            onChange={(option) => {
                              handleDropdownChange("scannerType", option);
                              setFieldValue("scannerType", option?.value || "");
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
                              value={values?.note}
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
                            {errors?.note && touched?.note && (
                              <p className="text-red-800 text-xs capitalize">
                                {errors?.note}
                              </p>
                            )}
                          </FormSection>
                        </aside>
                        <section className="col-span-12 md:col-span-6 space-y-4">
                          <div className="h-full min-h-[400px] rounded-2xl border border-gray-200 bg-white p-2">
                            <div className="grid grid-cols-2 gap-4 mt-5 mb-10"></div>
                            <div className="flex flex-wrap gap-2  justify-center flex-col">
                              <p className="text-center">
                                Select the teeth first{" "}
                              </p>
                              <button type="button" className="text-[#949494] text-sm font-normal pb-10 font-poppins h-full">
                                upper Arch
                              </button>
                              {/* <img src='/assets/doctor/image.png' /> */}
                              {/* <div>
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
                              </div> */}

                              <div className="mt-40 ml-56 min-h-[320px] ">
                                <RestorationTeethSvg
                                  selectedTeeth={selectedTeeth}
                                  // onToothClick={handleSvgToothClick}
                                  onToothClick={(tooth) => {
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
                                  fillColor="#94D3DD"
                                  defaultColor="#ffffff"
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
                                      orders?.find((p) => p?.name === "Denture")
                                        ?.children || []
                                    }
                                    value={globalSelections?.digitalOptions?.value || ""}
                                    onChange={(option) => {
                                      handleDropdownChange("digitalOptions", option);
                                      setFieldValue("digitalOptions", option?.value || "");
                                      setTouched((prev) => ({
                                        ...prev,
                                        digitalOptions: false,
                                      }));
                                    }}
                                    label=" Denture"
                                    storageKey="digitalOptions"
                                    disabled={selectedTeeth?.length === 0}
                                  />
                                  <MaterialDropdown
                                    className2="relative z-0"

                                    className="w-full border bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                    options={
                                      orders?.find(
                                        (p) => p?.name === "Surgical Guide"
                                      )?.children?.length > 0
                                        ? orders?.find(
                                          (p) => p?.name === "Surgical Guide"
                                        )?.children
                                        : [
                                          {
                                            label: "Not Available",
                                            value: "",
                                            disabled: true,
                                          },
                                        ]
                                    }
                                    value={globalSelections?.surgical_guide?.value || null}
                                    onChange={(option) => {
                                      console.log("Surgical guide selected:", option);
                                      handleDropdownChange("surgical_guide", option);
                                      setFieldValue("surgical_guide", option?.value || "");
                                    }}
                                    hideCheckForNotAvailable={true}
                                    label="Surgical Guide"
                                    storageKey="surgical_guide"
                                    disabled={selectedTeeth?.length === 0}
                                  />

                                  <MaterialDropdown
                                    className2="relative z-0"
                                    options={
                                      orders?.find((p) => p?.name === "Crown")
                                        ?.children || []
                                    }
                                    value={globalSelections?.crown?.value || ""}
                                    onChange={(option) => {
                                      handleDropdownChange("crown", option);
                                      setFieldValue("crown", option?.value || "");

                                      setTouched((prev) => ({
                                        ...prev,
                                        crown: false,
                                      }));
                                    }}
                                    label="Smart Crown"
                                    storageKey="crown"
                                    className="w-full  bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                    disabled={selectedTeeth?.length === 0}
                                  />
                                  <MaterialDropdown
                                    className2="relative z-0"
                                    options={
                                      orders?.find((p) => p?.name === "Material")
                                        ?.children || []
                                    }
                                    value={globalSelections?.material?.value || ""}
                                    onChange={(val) => {
                                      handleDropdownChange("material", val);
                                      setFieldValue("material", val?.value || "");

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
                                    disabled={selectedTeeth?.length === 0}
                                  />

                                  <ShadeDropdown
                                    className="relative"
                                    shades={shadeGroups}
                                    selectedTooth={selectedTooth}
                                    touched={touched}
                                    setTouched={setTouched}
                                    selectedShades={globalSelections?.shades || {}}
                                    onChange={(groupName, selected) => {
                                      console.log(groupName, selected, "shade selected");
                                      // Dispatch the shade selection to global selections
                                      // selected can be null (deselection) or a shade object
                                      dispatch(
                                        updateShadeSelection({
                                          groupName,
                                          shade: selected,
                                        })
                                      );
                                    }}
                                    disabled={selectedTeeth?.length === 0}
                                  />

                                  <MaterialDropdown
                                    className2="relative z-0"
                                    options={
                                      orders?.find(
                                        (p) => p?.name === "Digital Model Type"
                                      )?.children || []
                                    }
                                    value={globalSelections?.Model_type?.value || ""}
                                    onChange={(val) => {
                                      handleDropdownChange("Model_type", val);
                                      setFieldValue("Model_type", val?.value || "");

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
                                    disabled={selectedTeeth?.length === 0}
                                  />
                                  <MaterialDropdown
                                    className2="relative z-0"
                                    options={
                                      orders?.find(
                                        (p) => p?.name === "Participating Lab"
                                      )?.children || []
                                    }
                                    value={globalSelections?.lab?.value || ""}
                                    onChange={(val) => {
                                      handleDropdownChange("lab", val);
                                      setFieldValue("lab", val?.value || "");

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
                                    disabled={selectedTeeth?.length === 0}
                                  />
                                </DropdownWrapper>
                                <MaterialDropdown
                                  options={
                                    orders?.find(
                                      (p) => p?.name === "Photogrammetry files"
                                    )?.children || []
                                  }
                                  value={globalSelections?.photogrammetryfiles?.value || ""}
                                  onChange={(option) => {
                                    handleDropdownChange(
                                      "photogrammetryfiles",
                                      option
                                    );
                                    setFieldValue("photogrammetryfiles", option?.value || "");

                                    if (option) {
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
                                  disabled={selectedTeeth?.length === 0}
                                />
                              </FormSection>
                            </div>

                            <div className="mt-10">
                              <div className="flex flex-col space-y-3">
                                {/* Selected Teeth */}
                                <div className="flex gap-2 flex-wrap items-center">
                                  <span className="text-xs text-textFieldHeading">Selected Teeth:</span>
                                  {selectedTeeth?.map((toothId) => (
                                    <span key={toothId} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                      #{toothId}
                                    </span>
                                  ))}
                                </div>

                                {/* Items with cost * total teeth */}
                                {globalSelections?.material && (
                                  <div className="flex justify-between items-center py-1">
                                    <p className="text-xs text-textFieldHeading">
                                      {globalSelections?.material?.option?.label || "Material"}
                                    </p>
                                    <p className="text-xs font-medium">
                                      ${globalSelections?.material?.price || 0} × {selectedTeeth?.length || 0} = ${(globalSelections?.material?.price || 0) * (selectedTeeth?.length || 0)}
                                    </p>
                                  </div>
                                )}

                                {/* Crown */}
                                {globalSelections?.crown && (
                                  <div className="flex justify-between items-center py-1">
                                    <p className="text-xs text-textFieldHeading">
                                      {globalSelections?.crown?.option?.label || "Crown"}
                                    </p>
                                    <p className="text-xs font-medium">
                                      ${globalSelections?.crown?.price || 0} × {selectedTeeth?.length || 0} = ${(globalSelections?.crown?.price || 0) * (selectedTeeth?.length || 0)}
                                    </p>
                                  </div>
                                )}

                                {/* Digital Model Type */}
                                {globalSelections?.Model_type && (
                                  <div className="flex justify-between items-center py-1">
                                    <p className="text-xs text-textFieldHeading">
                                      {globalSelections?.Model_type?.option?.label || "Digital Model Type"}
                                    </p>
                                    <p className="text-xs font-medium">
                                      ${globalSelections?.Model_type?.price || 0} × {selectedTeeth?.length || 0} = ${(globalSelections?.Model_type?.price || 0) * (selectedTeeth?.length || 0)}
                                    </p>
                                  </div>
                                )}

                                {/* Digital Denture */}
                                {globalSelections?.digitalOptions && (
                                  <div className="flex justify-between items-center py-1">
                                    <p className="text-xs text-textFieldHeading">
                                      {globalSelections?.digitalOptions?.option?.label || "Digital Denture"}
                                    </p>
                                    <p className="text-xs font-medium">
                                      ${globalSelections?.digitalOptions?.price || 0} × {selectedTeeth?.length || 0} = ${(globalSelections?.digitalOptions?.price || 0) * (selectedTeeth?.length || 0)}
                                    </p>
                                  </div>
                                )}

                                {/* Lab */}
                                {globalSelections?.lab && (
                                  <div className="flex justify-between items-center py-1">
                                    <p className="text-xs text-textFieldHeading">
                                      {globalSelections?.lab?.option?.label || "Participating Lab"}
                                    </p>
                                    <p className="text-xs font-medium">
                                      ${globalSelections?.lab?.price || 0} × {selectedTeeth?.length || 0} = ${(globalSelections?.lab?.price || 0) * (selectedTeeth?.length || 0)}
                                    </p>
                                  </div>
                                )}

                                {/* Scanner Type */}
                                {globalSelections?.scannerType && (
                                  <div className="flex justify-between items-center py-1">
                                    <p className="text-xs text-textFieldHeading">
                                      {globalSelections?.scannerType?.option?.label || "Scanner Type"}
                                    </p>
                                    <p className="text-xs font-medium">
                                      ${globalSelections?.scannerType?.price || 0} × {selectedTeeth?.length || 0} = ${(globalSelections?.scannerType?.price || 0) * (selectedTeeth?.length || 0)}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <> </>

                              <div className="">
                                <div className="flex justify-between items-center py-3">
                                  <p className="text-textFieldHeading text-xs font-poppins">
                                    Subtotal:
                                  </p>
                                  <p className="text-[#1A1A1A] font-medium text-xs font-poppins">
                                    ${totalPrice?.toFixed(2)}
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
                                    ${totalPrice?.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                // Validate form before proceeding
                                const formErrors = await validateForm();

                                // Check if teeth are selected
                                if (selectedTeeth?.length === 0) {
                                  dispatch(
                                    showToast({
                                      message: "Please select at least one tooth first",
                                      type: "error",
                                    })
                                  );
                                  return;
                                }

                                // Check if patient is selected
                                if (!values?.patientFirstName) {
                                  dispatch(
                                    showToast({
                                      message: "Please select a patient first",
                                      type: "error",
                                    })
                                  );
                                  return;
                                }

                                console.log(values, "values");

                                if (Object?.keys(formErrors || {}).length === 0) {
                                  next(); // proceed to next step
                                } else {
                                  // Show the first error message
                                  const firstErrorField = Object?.keys(formErrors || {})[0];
                                  const firstErrorMessage = formErrors?.[firstErrorField];

                                  dispatch(
                                    showToast({
                                      message: firstErrorMessage,
                                      type: "error",
                                    })
                                  );
                                }
                              }}

                              className={`font-poppins w-full px-6 py-3 text-sm font-medium bg-[#0b2b62] text-[#F8F8F8] hover:bg-[#092b58]`}
                            >
                              Checkout
                            </button>

                          </div>
                        </aside>
                      </div>
                    </Form>
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