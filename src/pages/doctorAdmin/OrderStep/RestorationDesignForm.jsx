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
import { orderService } from "../../../services/orderService";

const DoctorOrder = () => {
  // form states
  const [doctorName, setDoctorName] = useState("");
  const [officeReg, setOfficeReg] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [note, setNote] = useState("");
  const [patientFirst, setPatientFirst] = useState("");
  const [patientLast, setPatientLast] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
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

    // Find the selected option to get price
    let selectedOption = null;
    let price = 0;

    // Search in orders for the selected option
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

    setToothSelections((prev) => ({
      ...prev,
      [selectedTooth]: {
        ...prev[selectedTooth],
        [field]: value,
        // Store price for material field
        ...(field === "material" ? { materialPrice: price } : {}),
        // Store option details for reference
        [`${field}Option`]: selectedOption,
      },
    }));
  };

  const handleSave = () => {
    const data = {
      doctor: { doctorName, officeReg, createDate, dueDate },
      patient: {
        firstName: patientFirst,
        lastName: patientLast,
        subscriptionId,
      },
      teeth: toothSelections,
      selectedTeeth: selectedTeeth,
      note: note
    };
    try {
      localStorage.setItem("restorationForm", JSON.stringify(data));
      next();
    } catch (e) {
      console.error(e);
    }
    const totalMaterialPrice = Object.values(toothSelections).reduce(
      (sum, tooth) => sum + (tooth.materialPrice || 0),
      0
    );
    console.log("Total material price:", totalMaterialPrice);
  };
  const subtotal = Object.values(toothSelections).reduce(
    (sum, tooth) => sum + (tooth.materialPrice || 0),
    0
  );
  const shipping = subtotal > 100 ? 0 : 0;
  const total = subtotal + shipping;
  const steps = [
    { id: "s1", title: "Restoration Design Form" },
    { id: "s2", title: "Review" },
    { id: "s3", title: "Checkout" },
    { id: "s4", title: "Completion" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  // const next = () => {
  //   if (activeIndex < steps.length - 1) setActiveIndex(activeIndex + 1);
  // };
  const next = () => setActiveIndex((prev) => Math.min(prev + 1, 3))
  const back = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartSize, setChartSize] = useState(480);

  // Update chart size based on window width
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setChartSize(240); // mobile
      } else if (width < 1024) {
        setChartSize(400); // tablet
      } else {
        setChartSize(480); // desktop
      }
    };

    updateSize(); // set initial size
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  ;

  useEffect(() => {
    orderService.getDropDown()
      .then((data) => {
        const raw = data?.data?.data || [];

        const mapped = raw.map((parent) => ({
          id: parent.id,
          name: parent.name,
          type: parent.type,
          price: parent.price,
          discountedPrice: parent.discountedPrice,
          children: parent.name === "Shade"
            ? (parent.children || []) // keep nested structure for Shade
            : (parent.children?.map((child) => ({
              label: child.name,
              value: child.id,
              parentId: parent.id,
              price: child.price,
            })) || [])
        }));

        setOrders(mapped);

        // Extract shade groups with grandchildren (codes)
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
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-screen">
                  {/* Left 3 */}
                  <aside className="col-span-12 md:col-span-3 space-y-4">
                    <FormSection
                      title="Doctor Info"
                      color="text-xs font-semibold"
                      className="border border-gray-200 p-4"
                    >
                      <LabeledInput
                        label="Doctors Name / office Name"
                        value={doctorName}
                        onChange={setDoctorName}
                        placeholder="Doctors Name / office Name"
                      />
                      <LabeledInput
                        label="Office registration number"
                        value={officeReg}
                        onChange={setOfficeReg}
                        placeholder="Office registration number"
                      />
                      <lable className='text-primaryText text-xs font-semibold font-poppins capitalize'>Create Date</lable>
                      <LabeledInput
                        label="Create Date"
                        type="date"
                        value={createDate}
                        onChange={setCreateDate}
                      />
                      <lable className='text-primaryText text-xs font-semibold font-poppins capitalize'>Case expected due date</lable>
                      <LabeledInput
                        label="Case expected due date"
                        type="date"
                        value={dueDate}
                        onChange={setDueDate}
                      />
                    </FormSection>
                    <FormSection
                      title="Patient ID"
                      color="text-xs font-semibold"
                      className="border border-gray-200 p-4"
                    >
                      <LabeledInput
                        placeholder="Name"
                        value={patientFirst}
                        onChange={setPatientFirst}
                      />
                      <LabeledInput
                        placeholder="Last name"
                        value={patientLast}
                        onChange={setPatientLast}
                      />
                      <LabeledInput
                        placeholder="Subscription id"
                        value={subscriptionId}
                        onChange={setSubscriptionId}
                      />
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
                      className=" w-full rounded-md  bg-textField  px-4 py-3 text-sm text-secondaryBrand  outline-none transition-shadow"
                      options={
                        (orders.find((p) => p.name === "Scanner")?.children) || []
                      }
                      value={toothSelections[selectedTooth]?.scannerType || ""}
                      onChange={(val) => {
                        handleDropdownChange("scannerType", val);
                        console.log("Selected Scanner :", val);
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
                    >
                      <textarea
                        rows={2}
                        placeholder="Write here"
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full resize-none rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none  "
                      />
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
                          onChange={(val) =>
                            handleDropdownChange("digitalOptions", val)
                          }
                          label="Digital Denture"
                          storageKey="digitalOptions"
                        />


                        <MaterialDropdown
                          className="w-full rounded-xl bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                          options={
                            (orders.find((p) => p.name === "Surgical Guide")?.children) || []
                          }
                          value={toothSelections[selectedTooth]?.surgical_guide || ""}
                          onChange={(val) => {
                            handleDropdownChange("surgical_guide", val);
                            console.log("Selected Surgical Guide:", val);
                          }}
                          label="Surgical Guide"
                          storageKey="surgical_guide"
                        />

                      </div>
                      <div className="flex flex-wrap gap-2  justify-center flex-col">
                        <button className="text-[#949494] text-sm font-normal  font-poppins">upper Arch</button>
                        {/* <img src='/assets/doctor/image.png' /> */}
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
                        <button className="text-[#949494] text-sm font-normal  font-poppins">Lower Arch</button>
                      </div>
                    </div>
                  </section>
                  {/* Right 3 */}
                  <aside className="col-span-12 md:col-span-3 space-y-4 flex flex-col justify-between">
                    <div className="flex  flex-col justify-between">
                      <div>
                        <FormSection className="p-0">
                          {/* <MaterialDropdown
                            options={
                              (orders.find((p) => p.name === "Material")?.children) || []
                            }
                            value={toothSelections[selectedTooth]?.material || ""}
                            onChange={(val) =>
                              handleDropdownChange("material", val)
                            }
                            label="Material"
                            storageKey="material"
                            className="w-full rounded-xl  bg-white  px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                          /> */}


                          <MaterialDropdown
                            options={materialOptions}
                            value={selectedMaterialValue}
                            onChange={(val) => handleDropdownChange("material", val)}
                            label="Material"
                            storageKey="material"
                            className="w-full rounded-xl bg-white px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
                          />


                          <ShadeDropdown
                            shades={shadeGroups}
                            onChange={(selected) => {
                              console.log("Selected Shades:", selected);
                              // You can persist into state if needed
                            }}
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
                            value={toothSelections[selectedTooth]?.Lab || ""} // ✅ selected value
                            onChange={(val) => {
                              handleDropdownChange("Lab", val); console.log(' Lab:', val);
                            }}
                            label="Select Laboratory"
                            storageKey="Participating Lab"
                            className="w-full rounded-xl  bg-white     px-4 py-3 text-sm text-textFieldHeading outline-none transition-shadow"
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
                              <div
                                key={toothId}
                                className="flex justify-between items-center py-1"
                              >
                                {/* <p className="text-xs text-textFieldHeading">
                                  {values.material || "No Material"} x1
                                </p> */}
                                <p className="text-xs text-textFieldHeading">
                                  {selectedMaterial?.label || "No Material"} x1
                                </p>
                                <p className="text-xs font-medium">
                                  ${values.materialPrice || 0}
                                </p>
                              </div>
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
                          <p className="text-[#1A1A1A] font-medium text-xs font- border border-grey-400">
                            ${total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSave}
                      className="w-full rounded-full bg-[#0b2b62] px-6 py-3 text-sm font-semibold text-white hover:bg-[#092b58]"
                    >
                      Checkout
                    </button>
                  </aside>
                </div>
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
