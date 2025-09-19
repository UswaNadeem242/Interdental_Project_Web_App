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

  PHOTOGRAMMETRY_FILES,

} from "../../../Constant";
import { SmileDesignPicker } from "../../../components/doctorAdmin/DoctorModel/smile";
import DonePage from "./DonePage";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FileUploadSection } from "../../../components/doctorAdmin/OrderFileSelection";
import { ShadeDropdown } from "../../../Common/DropDown/NestedDropdown";
import { orderService } from "../../../services/order-service/index";
import { Form, Formik } from "formik";
import { OrderValidationSchema } from "../../../Common/FormsValidation/order-validation";

const DoctorOrder = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [note, setNote] = useState("");
  const [selected, setSelected] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shadeGroups, setShadeGroups] = useState([]);

  const [teethData, setTeethData] = useState([]);       // API ka data
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [selectedTeeth, setSelectedTeeth] = useState([]); // Array of all selected teeth
  const [toothSelections, setToothSelections] = useState({});

  const currentValues = selectedTooth
    ? toothSelections[selectedTooth] || {}
    : {};

  const handleDropdownChange = (field, value) => {
    if (!selectedTooth) return;

    // Find option and price from orders
    let selectedOption = null;
    let price = 0;
    for (const order of orders) {
      if (order.children) {
        const option = order.children.find(child => child.value === value);
        if (option) {
          selectedOption = option;
          price = option.price || 0;
          break;
        }
      }
    }

    setToothSelections(prev => ({
      ...prev,
      [selectedTooth]: {
        ...prev[selectedTooth],
        [field]: value,
        [`${field}Price`]: price,
        [`${field}Option`]: selectedOption,
      },
    }));

    if (value) {
      setErrors(prev => ({
        ...prev,
        [`tooth_${selectedTooth}_${field}`]: "",
      }));
      setTouched(prev => ({
        ...prev,
        [`tooth_${selectedTooth}_${field}`]: false,
      }));
    }
  };
  // const handleSave = async (validateForm, values, next) => {
  //   // Merge current selectedTeeth and toothSelections into form values
  //   const currentValues = {
  //     ...values,
  //     selectedTeeth: selectedTeeth,
  //     toothSelections: toothSelections,
  //   };
  //   const errors = await validateForm(currentValues);
  //   const newErrors = {};
  //   const touchedUpdate = {};
  //   // Validate selected teeth
  //   if (!currentValues.selectedTeeth || currentValues.selectedTeeth.length === 0) {
  //     newErrors.selectedTeeth = "At least one tooth must be selected.";
  //     touchedUpdate.selectedTeeth = true;
  //   }
  //   let totalPrice = 0;
  //   // Validate dropdowns for each selected tooth & calculate price
  //   currentValues.selectedTeeth.forEach((toothId) => {
  //     const tooth = currentValues.toothSelections[toothId];

  //     ["scannerType", "digitalOptions", "surgical_guide", "material", "lab"].forEach(
  //       (field) => {
  //         const value = tooth?.[field];
  //         if (!value) {
  //           newErrors[`tooth_${toothId}_${field}`] = `${field.replace(/([A-Z])/g, " $1")} is required`;
  //           touchedUpdate[field] = true;
  //         } else {
  //           // Sum price if option has a price
  //           const optionPrice = tooth[`${field}Price`] || 0; // ensure you store price when selecting dropdown
  //           totalPrice += optionPrice;
  //         }
  //       }
  //     );
  //   });
  //   setErrors(newErrors);
  //   setTouched((prev) => ({ ...prev, ...touchedUpdate }));
  //   // Stop if validation failed
  //   if (Object.keys(newErrors).length > 0) {
  //     console.log("Validation failed:", newErrors);
  //     return;
  //   }
  //   // ✅ Save data and go next

  //   const data = {
  //     ...currentValues,
  //     totalPrice, // store the total price
  //   };
  //   console.log('reso:', data);

  //   localStorage.setItem("restorationForm", JSON.stringify(data));

  //   next();

  // };

  // const handleSave = async (validateForm, values, next) => {
  //   // Merge current selectedTeeth and toothSelections into form values
  //   const currentValues = {
  //     ...values,
  //     selectedTeeth,
  //     toothSelections,
  //   };

  //   const errors = await validateForm(currentValues);
  //   const newErrors = {};
  //   const touchedUpdate = {};

  //   // Validate selected teeth
  //   if (!currentValues.selectedTeeth || currentValues.selectedTeeth.length === 0) {
  //     newErrors.selectedTeeth = "At least one tooth must be selected.";
  //     touchedUpdate.selectedTeeth = true;
  //   }

  //   let totalPrice = 0;
  //   const doctorOrderItems = [];

  //   // Validate dropdowns for each selected tooth & calculate price
  //   currentValues.selectedTeeth.forEach((toothId) => {
  //     const tooth = currentValues.toothSelections[toothId];

  //     ["scannerType", "digitalOptions", "surgical_guide", "material", "lab"].forEach(
  //       (field) => {
  //         const value = tooth?.[field];
  //         if (!value) {
  //           newErrors[`tooth_${toothId}_${field}`] = `${field.replace(/([A-Z])/g, " $1")} is required`;
  //           touchedUpdate[field] = true;
  //         } else {
  //           const optionPrice = tooth[`${field}Price`] || 0;
  //           totalPrice += optionPrice;

  //           // Add to doctorOrderItems array
  //           doctorOrderItems.push({
  //             id:1,
  //             doctorOrderId: 1, // will be set by backend
  //             dropdownMasterId: value,
  //             quantity: 1,
  //             unitPrice: optionPrice,
  //           });
  //         }
  //       }
  //     );
  //   });

  //   setErrors(newErrors);
  //   setTouched((prev) => ({ ...prev, ...touchedUpdate }));

  //   // Stop if validation failed
  //   if (Object.keys(newErrors).length > 0) {
  //     console.log("Validation failed:", newErrors);
  //     return;
  //   }

  //   // ✅ Prepare final API payload
  //   const data = {
  //     ...currentValues,
  //     totalAmount: totalPrice,
  //     doctorOrderItems, // flattened array
  //   };

  //   console.log("API Payload:", data);

  //   localStorage.setItem("restorationForm", JSON.stringify(data));

  //   next();
  // };





  // const handleSave = async (validateForm, values, next) => {
  //   const currentValues = {
  //     ...values,
  //     selectedTeeth,
  //     toothSelections,
  //   };

  //   const errors = await validateForm(currentValues);
  //   const newErrors = {};
  //   const touchedUpdate = {};

  //   if (!currentValues.selectedTeeth || currentValues.selectedTeeth.length === 0) {
  //     newErrors.selectedTeeth = "At least one tooth must be selected.";
  //     touchedUpdate.selectedTeeth = true;
  //   }

  //   let totalPrice = 0;
  //   const doctorOrderItems = [];

  //   currentValues.selectedTeeth.forEach((toothId) => {
  //     const tooth = currentValues.toothSelections[toothId];

  //     ["scannerType", "digitalOptions", "surgical_guide", "material", "lab"].forEach(
  //       (field) => {
  //         const selectedValue = tooth?.[field];
  //         if (!selectedValue) {
  //           newErrors[`tooth_${toothId}_${field}`] = `${field.replace(/([A-Z])/g, " $1")} is required`;
  //           touchedUpdate[field] = true;
  //         } else {
  //           const optionPrice = tooth[`${field}Price`] || 0;
  //           totalPrice += optionPrice;

  //           // ✅ Find the actual API item from orders or shadeGroups
  //           let apiItem;
  //           // if (field === "shade") {
  //           //   apiItem = shadeGroups.find((s) => s.id === selectedValue);
  //           // } else {
  //           //   apiItem = orders.flatMap(p => p.children || []).find(c => c.id === selectedValue);
  //           // }

  //           doctorOrderItems.push({
  //             id: apiItem?.id || null,       // dynamic API-provided ID
  //             doctorOrderId: null,           // backend assigns if creating
  //             dropdownMasterId: selectedValue, // user selection
  //             quantity: 1,
  //             unitPrice: optionPrice,
  //           });
  //         }
  //       }
  //     );
  //   });

  //   setErrors(newErrors);
  //   setTouched(prev => ({ ...prev, ...touchedUpdate }));

  //   if (Object.keys(newErrors).length > 0) {
  //     console.log("Validation failed:", newErrors);
  //     return;
  //   }

  //   const data = {
  //     ...currentValues,
  //     totalAmount: totalPrice,
  //     doctorOrderItems, // dynamic, API-ready
  //   };

  //   console.log("API Payload:", data);

  //   localStorage.setItem("restorationForm", JSON.stringify(data));

  //   next();
  // };




  // const handleSave = async (validateForm, values, next) => {
  //   const currentValues = {
  //     ...values,
  //     selectedTeeth,
  //     toothSelections,
  //   };

  //   const errors = await validateForm(currentValues);
  //   const newErrors = {};
  //   const touchedUpdate = {};

  //   if (!currentValues.selectedTeeth || currentValues.selectedTeeth.length === 0) {
  //     newErrors.selectedTeeth = "At least one tooth must be selected.";
  //     touchedUpdate.selectedTeeth = true;
  //   }

  //   let totalPrice = 0;
  //   const doctorOrderItems = [];

  //   currentValues.selectedTeeth.forEach((toothId) => {
  //     const tooth = currentValues.toothSelections[toothId];

  //     ["scannerType", "digitalOptions", "surgical_guide", "material", "lab", "shade"].forEach(
  //       (field) => {
  //         const selectedValue = tooth?.[field];
  //         if (!selectedValue) {
  //           newErrors[`tooth_${toothId}_${field}`] = `${field.replace(/([A-Z])/g, " $1")} is required`;
  //           touchedUpdate[field] = true;
  //         } else {
  //           const optionPrice = tooth[`${field}Price`] || 0;
  //           totalPrice += optionPrice;

  //           // ✅ Get actual item from orders or shadeGroups
  //           let apiItem;
  //           if (field === "shade") {
  //             apiItem = shadeGroups.find((s) => s.id === selectedValue);
  //           } else {
  //             apiItem = orders.flatMap((p) => p.children || []).find((c) => c.value === selectedValue);
  //           }

  //           doctorOrderItems.push({
  //             id: null,                                  // keep null for new creation
  //             doctorOrderId: apiItem?.id || selectedValue, // ✅ store child id here
  //             dropdownMasterId: selectedValue,             // original selection
  //             quantity: 1,
  //             unitPrice: optionPrice,
  //           });
  //         }
  //       }
  //     );
  //   });

  //   setErrors(newErrors);
  //   setTouched((prev) => ({ ...prev, ...touchedUpdate }));

  //   if (Object.keys(newErrors).length > 0) {
  //     console.log("Validation failed:", newErrors);
  //     return;
  //   }

  //   const data = {
  //     ...currentValues,
  //     totalAmount: totalPrice,
  //     doctorOrderItems, // dynamic, API-ready
  //   };

  //   console.log("API Payload:", data);

  //   localStorage.setItem("restorationForm", JSON.stringify(data));

  //   next();
  // };




  const handleSave = async (validateForm, values, next) => {
    const currentValues = {
      ...values,
      selectedTeeth,
      toothSelections,
      note
    };

    const errors = await validateForm(currentValues);
    const newErrors = {};
    const touchedUpdate = {};

    if (!currentValues.selectedTeeth || currentValues.selectedTeeth.length === 0) {
      newErrors.selectedTeeth = "At least one tooth must be selected.";
      touchedUpdate.selectedTeeth = true;
    }

    let totalPrice = 0;
    const doctorOrderItems = [];

    currentValues.selectedTeeth.forEach((toothId) => {
      const tooth = currentValues.toothSelections[toothId];

      ["scannerType", "digitalOptions", "surgical_guide", "material", "lab", "crown"].forEach(
        (field) => {
          const selectedValue = tooth?.[field];
          if (!selectedValue) {
            newErrors[`tooth_${toothId}_${field}`] = `${field.replace(/([A-Z])/g, " $1")} is required`;
            touchedUpdate[field] = true;
          } else {
            const optionPrice = tooth[`${field}Price`] || 0;
            totalPrice += optionPrice;


            // ✅ Find matching item
            // let apiItem;
            // if (field === "shade") {
            //   apiItem = shadeGroups.find((s) => s.id === selectedValue);
            // } else {
            //   apiItem = orders.flatMap((p) => p.children || []).find((c) => c.value === selectedValue);
            // }

            const apiItem = orders
              .flatMap((p) => p.children || [])
              .find((c) => c.value === selectedValue);
            doctorOrderItems.push({
              id: 1,          // ✅ same logic as doctorOrderId
              doctorOrderId: 1,
              dropdownMasterId: apiItem?.value || selectedValue,
              quantity: 1,
              unitPrice: optionPrice,
            });
          }
        }
      );
    });

    setErrors(newErrors);
    setTouched((prev) => ({ ...prev, ...touchedUpdate }));

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed:", newErrors);
      return;
    }

    const data = {
      ...currentValues,
      totalAmount: totalPrice,
      doctorOrderItems,
    };

    console.log("API Payload:", data);

    localStorage.setItem("restorationForm", JSON.stringify(data));

    next();
  };
  // const subtotal = Object.values(toothSelections).reduce((sum, tooth) => {
  //   return (
  //     sum +
  //     (tooth.materialPrice || 0) +
  //     (tooth.digitalOptionsOption?.price || 0) +
  //     (tooth.surgical_guideOption?.price || 0) +
  //     (tooth.lab?.price || 0)
  //   );
  // }, 0);



  const subtotal = Object.values(toothSelections).reduce((sum, tooth) => {
    return (
      sum +
      (tooth.materialPrice || tooth.materialOption?.price || 0) +
      (tooth.digitalOptionsPrice || tooth.digitalOptionsOption?.price || 0) +
      (tooth.surgical_guidePrice || tooth.surgical_guideOption?.price || 0) +
      (tooth.labPrice || tooth.labOption?.price || tooth.lab?.price || 0)
      // (tooth.crownPrice || tooth.crownOption?.price || 0) // if you also have Crown
    );
  }, 0);

  const shipping = subtotal > 100 ? 0 : 0;
  const total = subtotal + shipping;
  const steps = [
    { id: "s1", title: "Restoration Design Form" },
    { id: "s2", title: "Review" },
    { id: "s3", title: "Checkout" },
    { id: "s4", title: "Completion" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const next = () => setActiveIndex((prev) => Math.min(prev + 1, 3))
  const back = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [chartSize, setChartSize] = useState(380);
  // // Update chart size based on window width
  // useEffect(() => {
  //   const updateSize = () => {
  //     const width = window.innerWidth;
  //     if (width < 640) {
  //       setChartSize(100); // mobile
  //     } else if (width < 1024) {
  //       setChartSize(200); // tablet
  //     } else {
  //       setChartSize(480); // desktop
  //     }
  //   };
  //   updateSize(); // set initial size
  //   window.addEventListener("resize", updateSize);

  //   return () => window.removeEventListener("resize", updateSize);
  // }, []);




  const [chartSize, setChartSize] = useState(480); // default desktop

  useEffect(() => {
    const small = window.matchMedia("(max-width: 639px)");
    const medium = window.matchMedia("(min-width: 640px) and (max-width: 1023px)");
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

    updateSize(); // set initial

    // Add listeners
    [small, medium, large].forEach(mq => mq.addEventListener("change", updateSize));

    return () => {
      [small, medium, large].forEach(mq => mq.removeEventListener("change", updateSize));
    };
  }, []);













  useEffect(() => {
    orderService.getDropDown()
      .then((data) => {
        const raw = data?.data?.data || [];
        console.log('data:', data);

        const mapped = raw.map((parent) => ({
          id: parent.id,
          name: parent.name,
          type: parent.type,
          price: parent.price,
          discountedPrice: parent.discountedPrice,
          children: parent.name === "Shade"
            ? (parent.children || [])
            : (parent.children?.map((child) => ({
              label: child.name,
              value: child.id,
              parentId: parent.id,
              price: child.price,
            })) || [])
        }));

        setOrders(mapped);
        const shadeRoot = raw.find((p) => p.name === "Shade");
        if (shadeRoot && Array.isArray(shadeRoot.children)) {
          setShadeGroups(shadeRoot.children);
        } else {
          setShadeGroups([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    orderService.getTooth()
      .then((res) => {
        const raw = res?.data?.data || res?.data || [];
        const mapped = Array.isArray(raw)
          ? raw.map((t, idx) => ({
            id: Number(t.toothNumber) || t.id || (idx + 1),
            name: t.toothName || `Tooth ${idx + 1}`,
            fdiNumber: t.fdiNumber,
            quadrant: t.quadrant,
            type: t.type,
            isPermanent: t.isPermanent,
          }))
          : [];
        setTeethData(mapped);
      })
      .catch((err) => {
        console.error("❌ Error fetching teeth:", err);
      })
      .finally(() => setLoading(false));
  }, []);
  const materialOptions =
    orders.find((p) => p.name === "Material")?.children || [];
  const selectedMaterialValue = toothSelections[selectedTooth]?.material || "";
  // find the label of the selected material
  const selectedMaterial = materialOptions.find(
    (opt) => opt.value === selectedMaterialValue
  );


  return (
    <>
      <div className="flex flex-col rounded-3xl justify-center items-start">
        <main className="flex-1 bg-white  rounded-3xl p-4 sm:p-6 w-full">
          {/* md:max-w-7xl md:mx-auto */}
          <div className="">
            {/* md:mx-auto */}
            <StepperTabs
              steps={steps}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              back={back}
              next={next}
            />
            <div className="">
              {/* md:max-w-7xl md:mx-auto */}
              {activeIndex === 0 && (
                <Formik
                  initialValues={{
                    doctorName: "",
                    officeReg: "",
                    createDate: "",
                    dueDate: "",
                    patientFirstName: "",
                    patientLastName: "",
                    subscriptionId: "",
                    scannerType: "",
                    digitalOptions: "",
                    surgical_guide: "",
                    material: "",
                    lab: "",
                    selectedTeeth: [], // 🟢 track selected teeth
                    toothSelections: {},
                    note: '',
                    crown: ''
                  }}
                  validationSchema={OrderValidationSchema}
                  validateOnChange={true}  // 🚫 Validation har change pe na chale
                  validateOnBlur={true}
                  onSubmit={(values) => {
                  }}
                >
                  {({ values, errors, touched, handleChange, handleSubmit, validateForm, setFieldValue, handleBlur }) => (
                    <Form onSubmit={handleSubmit} className="space-y-4">

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-screen">
                        {/* Left 3 */}
                        <aside className="col-span-12 md:col-span-3 space-y-4">
                          <FormSection
                            title="Doctor Info"
                            color="text-xs font-semibold"
                            className="border border-gray-200 p-4"
                          >

                            <LabeledInput
                              type="text"
                              label="Doctor Name / Office Name"
                              placeholder='Doctor Name / Office Name'
                              name="doctorName"
                              value={values.doctorName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.doctorName && (
                              <p className="text-red-800 text-xs capitalize">{errors.doctorName}</p>
                            )}
                            <LabeledInput
                              type="text"
                              label="Office registration number"
                              value={values?.officeReg}
                              name='officeReg'
                              placeholder="Office registration number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.officeReg && (
                              <p className="text-red-800 text-xs capitalize">{errors.officeReg}</p>
                            )}
                            <lable className='text-primaryText text-xs font-semibold font-poppins capitalize'>Create Date</lable>
                            <LabeledInput
                              label="Create Date"
                              type="date"
                              name='createDate'
                              value={values?.createDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.createDate && (
                              <p className="text-red-800 text-xs capitalize">{errors.createDate}</p>
                            )}
                            <lable className='text-primaryText text-xs font-semibold font-poppins capitalize'>Case expected due date</lable>
                            <LabeledInput
                              label="Case expected due date"
                              type="date"
                              name='dueDate'
                              value={values?.dueDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.dueDate && (
                              <p className="text-red-800 text-xs capitalize">{errors.dueDate}</p>
                            )}
                          </FormSection>
                          <FormSection
                            title="Patient ID"
                            color="text-xs font-semibold"
                            className="border border-gray-200 p-4"
                          >
                            <LabeledInput
                              type="text"
                              placeholder="Name"
                              name='patientFirstName'
                              value={values?.patientFirstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.patientFirstName && (
                              <p className="text-red-800 text-xs capitalize">{errors.patientFirstName}</p>
                            )}
                            <LabeledInput
                              type="text"
                              placeholder="Last Name"
                              name='patientLastName'
                              value={values?.patientLastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.patientLastName && (
                              <p className="text-red-800 text-xs capitalize">{errors.patientLastName}</p>
                            )}
                            <LabeledInput
                              type="number"
                              placeholder="Subscription id"
                              name='subscriptionId'
                              value={values?.subscriptionId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.subscriptionId && (
                              <p className="text-red-800 text-xs capitalize">{errors.subscriptionId}</p>
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
                                {selected.length > 0 ? selected.join(", ") : ""}
                              </p>
                            )}
                          </div>
                          <MaterialDropdown
                            className="w-full rounded-md bg-textField px-4 py-3 text-sm text-secondaryBrand outline-none transition-shadow"
                            options={(orders.find((p) => p.name === "Scanner")?.children) || []}
                            value={toothSelections[selectedTooth]?.scannerType || ""}
                            onChange={(val) => {
                              handleDropdownChange("scannerType", val);
                              if (val) {
                                setTouched(prev => ({ ...prev, scannerType: false }));
                              }
                            }}
                            label="Scanner Type"
                            storageKey="scannerType"
                            dropdownClass="text-secondaryBrand"
                            error={touched.scannerType && !toothSelections[selectedTooth]?.scannerType ? "Scanner Type is Required Select the Teeth" : ""}

                          />
                          <div>
                            <FileUploadSection />
                          </div>
                          <FormSection
                            title="Additional Notes"
                            className="border border-gray-200 p-4"
                          >
                            <textarea
                              typeof="text"
                              rows={2}
                              name='note'
                              value={values.note}
                              placeholder="Write here"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              maxLength={500}
                              className="w-full resize-none rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none  "
                            />
                            {errors.note && (
                              <p className="text-red-800 text-xs capitalize">{errors.note}</p>
                            )}
                          </FormSection>
                        </aside>
                        <section className="col-span-12 md:col-span-6 space-y-4">
                          <div className="h-full min-h-[400px] rounded-2xl border border-gray-200 bg-white p-2">
                            <div className="grid grid-cols-2 gap-4 mt-5 mb-10">
                              <MaterialDropdown
                                className=" w-full rounded-xl bg-white border border-gray-200   px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                options={
                                  (orders.find((p) => p.name === "Digital Denture")?.children) || []
                                }
                                value={
                                  toothSelections[selectedTooth]?.digitalOptions || ""}
                                onChange={(val) => {
                                  handleDropdownChange("digitalOptions", val);
                                  // Clear error when user selects a value
                                  if (val) {
                                    setTouched(prev => ({ ...prev, digitalOptions: false }));
                                  }
                                }}
                                label="Digital Denture"
                                storageKey="digitalOptions"
                                error={touched.digitalOptions && !toothSelections[selectedTooth]?.digitalOptions ? "Digital Denture is Required Select the teeth" : ""}

                              />


                              <MaterialDropdown
                                className="w-full rounded-xl bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                options={
                                  (orders.find((p) => p.name === "Surgical Guide")?.children) || []
                                }
                                value={toothSelections[selectedTooth]?.surgical_guide || ""}


                                onChange={(val) => {
                                  handleDropdownChange("surgical_guide", val);

                                  if (val) {
                                    setTouched(prev => ({ ...prev, surgical_guide: false }));
                                  }
                                }}
                                label="Surgical Guide"
                                storageKey="surgical_guide"
                                error={touched.surgical_guide && !toothSelections[selectedTooth]?.surgical_guide ? "Surgical Guide is Required Select the teeth" : ""}

                              />

                            </div>
                            <div className="flex flex-wrap gap-2  justify-center flex-col">
                              <button className="text-[#949494] text-sm font-normal pb-10 font-poppins h-full">upper Arch</button>
                              {/* <img src='/assets/doctor/image.png' /> */}
                              <div>
                                <TeethChart
                                  teeth={teethData && teethData.length ? teethData : undefined}
                                  sizePx={chartSize}
                                  initialSelectedIds={selectedTeeth}
                                  currentToothId={selectedTooth}
                                  onSelect={(arr) => {
                                    console.table(arr);
                                    const toothIds = arr.map(t => t.id);
                                    setSelectedTeeth(toothIds);

                                    if (arr.length > 0) {
                                      setSelectedTooth(arr[arr.length - 1].id);
                                    } else {
                                      setSelectedTooth(null);
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
                          <div className="flex  flex-col justify-between">
                            <div>
                              <FormSection className="p-0">
                                <MaterialDropdown
                                  options={(orders.find((p) => p.name === "Crown")?.children) || []}
                                  value={toothSelections[selectedTooth]?.crown || ""}   // use lowercase consistently
                                  // onChange={(val) => {
                                  //   handleDropdownChange("crown", val);                 // also lowercase here
                                  //   if (val) {
                                  //     setTouched((prev) => ({ ...prev, crown: false }));
                                  //   }
                                  // }}


                                  onChange={(val) => {
                                    const option = (orders.find((p) => p.name === "Crown")?.children || [])
                                      .find(c => c.value === val);

                                    handleDropdownChange("crown", {
                                      value: val,
                                      label: option?.label || "",
                                      price: option?.price || 0,
                                    });

                                    if (val) {
                                      setTouched(prev => ({ ...prev, crown: false }));
                                    }
                                  }}
                                  label="Crown"
                                  storageKey="crown"
                                  className="w-full rounded-xl bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                  error={
                                    touched.crown && !toothSelections[selectedTooth]?.crown
                                      ? "Crown is required. Please select a value."
                                      : ""
                                  }
                                />
                                <MaterialDropdown
                                  options={materialOptions}
                                  value={selectedMaterialValue}
                                  onChange={(val) => {

                                    handleDropdownChange("material", val)
                                    if (val) {
                                      setTouched(prev => ({ ...prev, material: false }));
                                    }
                                  }
                                  }
                                  label="Material"
                                  storageKey="material"
                                  className="w-full rounded-xl bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                  error={touched.material && !toothSelections[selectedTooth]?.material ? "Material is Required Select the teeth" : ""}
                                />


                                <ShadeDropdown
                                  shades={shadeGroups}
                                  onChange={(selected) => { }}
                                />
                                <MaterialDropdown
                                  options={Digital_Option}
                                  value={
                                    toothSelections[selectedTooth]?.digital_option || ""
                                  }
                                  onChange={(val) =>
                                    handleDropdownChange("digital_option", val)
                                  }
                                  label=" Digital Model type"
                                  className="w-full rounded-xl  bg-white  px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                />

                                <MaterialDropdown
                                  options={
                                    (orders.find((p) => p.name === "Participating Lab")?.children) || []
                                  }
                                  value={toothSelections[selectedTooth]?.lab || ""} // ✅ selected value
                                  onChange={(val) => {

                                    // handleDropdownChange("Lab", val)
                                    handleDropdownChange("lab", val)
                                    if (val) {
                                      setTouched(prev => ({ ...prev, lab: false }));
                                    }
                                  }}
                                  label="Select Laboratory"
                                  storageKey="Select Laboratory"
                                  className="w-full rounded-xl  bg-white     px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                                  error={touched.material && !toothSelections[selectedTooth]?.material ? "Participating Lab is Required Select the teeth" : ""}
                                />
                                <MaterialDropdown
                                  options={PHOTOGRAMMETRY_FILES}
                                  value={
                                    toothSelections[selectedTooth]
                                      ?.Photogrammetry_files || ""
                                  }
                                  onChange={(val) =>
                                    handleDropdownChange("Photogrammetry_files", val)
                                  }
                                  label="Photogrammetry files"
                                  storageKey="Photogrammetry files"
                                  className="w-full rounded-xl  bg-[#F8F8F8] border-none    px-4 py-3 text-sm text-secondaryBrand outline-none transition-shadow"
                                  dropdownClass=' text-secondaryBrand'
                                />
                              </FormSection>
                            </div>

                            <div className="mt-96">
                              <div className="flex flex-col space-y-3">
                                {Object.entries(toothSelections).map(
                                  ([toothId, values]) => (

                                    <>

                                      <div
                                        key={toothId}
                                        className="flex justify-between items-center py-1"
                                      >

                                        <p className="text-xs text-textFieldHeading">
                                          {selectedMaterial?.label || "No Material"} x1
                                        </p>
                                        <p className="text-xs font-medium">
                                          ${values.materialPrice || 0}
                                        </p>
                                      </div>




                                      {/* <div className="flex justify-between items-center py-1">
                                        <p className="text-xs text-textFieldHeading">
                                          {toothSelections[selectedTooth]?.crown?.label || "No Crown"}
                                        </p>
                                        <p className="text-xs font-medium">
                                          ${toothSelections[selectedTooth]?.crown?.price || 0}
                                        </p>
                                      </div> */}

                                      <div

                                        className="flex justify-between items-center py-1"
                                      >
                                        <p className="text-xs text-textFieldHeading">
                                          {toothSelections[selectedTooth]?.surgical_guideOption?.label || "No Surgical Guide"}                                        </p>
                                        <p className="text-xs font-medium">
                                          {toothSelections[selectedTooth]?.surgical_guideOption?.price
                                            ? ` $${toothSelections[selectedTooth].surgical_guideOption.price}`
                                            : ""}
                                        </p>
                                      </div>
                                      <div

                                        className="flex justify-between items-center py-1"
                                      >
                                        <p className="text-xs text-textFieldHeading">
                                          {toothSelections[selectedTooth]?.digitalOptionsOption ? toothSelections[selectedTooth]?.digitalOptionsOption.label : "No Digital Denture selected"}
                                        </p>
                                        <p className="text-xs font-medium">
                                          {toothSelections[selectedTooth]?.digitalOptionsOption ? `$${toothSelections[selectedTooth]?.digitalOptionsOption.price || 0}` : ""}
                                        </p>
                                      </div>





                                      <div className="flex justify-between items-center py-1">
                                        {/* Lab Name */}
                                        <p className="text-xs text-textFieldHeading">
                                          {toothSelections[selectedTooth]?.labOption?.label || "Participating Lab"}
                                        </p>

                                        {/* Lab Price */}
                                        <p className="text-xs font-medium">
                                          {toothSelections[selectedTooth]?.labOption
                                            ? `$${toothSelections[selectedTooth].labOption.price}`
                                            : ""}
                                        </p>
                                      </div>



                                    </>
                                  )
                                )}
                              </div>
                              <div className="flex justify-between items-center py-3">
                                <p className="text-textFieldHeading text-xs font-poppins">
                                  Subtotal:
                                </p>
                                <p className="text-[#1A1A1A] font-medium text-xs font-poppins">
                                  ${subtotal.toFixed(2)}
                                </p>
                              </div>
                              <div className="flex justify-between items-center py-3">
                                <p className="text-textFieldHeading text-xs font-poppins">
                                  Shipping:
                                </p>
                                <p className="text-[#1A1A1A] font-medium text-xs font-poppins">
                                  ${shipping.toFixed(2)}
                                </p>
                              </div>
                              <div className="flex justify-between items-center py-3">
                                <p className="text-[#4D4D4D] text-base font-normal   leading-normal">
                                  Total:
                                </p>
                                <p className="text-[#1A1A1A] font-medium text-xs font-poppins">
                                  ${total.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            // onClick={handleSave}
                            onClick={() => handleSave(validateForm, values, next)}
                            className="w-full rounded-full bg-[#0b2b62] px-6 py-3 text-sm font-semibold text-white hover:bg-[#092b58]"
                          >
                            Checkout
                          </button>
                        </aside>
                      </div>

                    </Form>
                  )}



                </Formik>
              )}
              {activeIndex === 1 && <ReviewOrder next={next} />}
              {activeIndex === 2 && <CheckoutForm next={next} />}
              {activeIndex === 3 && <DonePage next={next} />}
            </div>
          </div>
        </main>
        {isModalOpen && (
          <SmileDesignPicker
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
    </>
  );
};

export default DoctorOrder;
