import React, { useState } from "react";
import FormSection from "../../../components/doctorAdmin/CommonLabel/FormSelection";
import LabeledInput from "../../../components/doctorAdmin/CommonLabel/inputLable";
import MaterialDropdown, {
    LabeledSelect,
} from "../../../components/doctorAdmin/CommonLabel/selectInputLabel";
import TeethChart from "../../../components/doctorAdmin/TeethComponent";
import StepperTabs from "../../../components/doctorAdmin/StepperTab";
import ReviewOrder from "./Review";
import DoctorHeader from "../../../components/doctorAdmin/doctorHeader";
import CheckoutForm from "./Checkout";
import { DIGITAL_DENTURE, LAB_OPTIONS, MATERIAL_OPTIONS, PHOTOGRAMMETRY_FILES, SCANNER_TYPE, SURGICAL_GUIDE } from "../../../Constant";
import SmileDesignPicker from "../../../components/doctorAdmin/DoctorModel/smile";

const DoctorOrder = () => {
    // form states
    const [doctorName, setDoctorName] = useState("");
    const [officeReg, setOfficeReg] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [patientFirst, setPatientFirst] = useState("");
    const [patientLast, setPatientLast] = useState("");
    const [subscriptionId, setSubscriptionId] = useState("");
    const [smileDesign, setSmileDesign] = useState("");
    const [showSmilePicker, setShowSmilePicker] = useState(false);

    // tooth & dropdown logic
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [toothSelections, setToothSelections] = useState({});


    const currentValues = selectedTooth
        ? toothSelections[selectedTooth] || {}
        : {};
    // const handleDropdownChange = (field, value) => {
    //     if (!selectedTooth) return; // require a tooth to be selected first

    //     // handle both material & lab with one handler
    //     const selectedOption =
    //         field === "material"
    //             ? MATERIAL_OPTIONS.find(opt => opt.value === value)
    //             : field === "lab"
    //                 ? LAB_OPTIONS.find(opt => opt.value === value)
    //                 : field === "digital_denture"
    //                     ? DIGITAL_DENTURE.find(opt => opt.value === value)
    //                     : null;

    //     setToothSelections((prev) => ({
    //         ...prev,
    //         [selectedTooth]: {
    //             ...prev[selectedTooth],
    //             [field]: value,
    //             ...(field === "material" || field === "digital_denture"
    //                 ? { materialPrice: selectedOption?.price || 0 }
    //                 : {}),
    //         },
    //     }));
    // };
    const handleDropdownChange = (field, value) => {
        if (!selectedTooth) return;

        // Map field to the corresponding options array
        const OPTIONS_MAP = {
            material: MATERIAL_OPTIONS,
            lab: LAB_OPTIONS,
            digital_denture: DIGITAL_DENTURE,
            surgical_guide: SURGICAL_GUIDE,
            Photogrammetry_files: PHOTOGRAMMETRY_FILES,
            scannerType: SCANNER_TYPE
        };

        const selectedOption = OPTIONS_MAP[field]?.find(opt => opt.value === value) || null;

        setToothSelections(prev => ({
            ...prev,
            [selectedTooth]: {
                ...prev[selectedTooth],
                [field]: value,
                // Only material and digital denture have price (optional)
                ...(field === "material" || field === "digital_denture"
                    ? { materialPrice: selectedOption?.price || 0 }
                    : {}),
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
        };

        try {
            localStorage.setItem("restorationForm", JSON.stringify(data));
            next();
        } catch (e) {
            console.error(e);
        }

        console.log("Restoration form saved:", data);

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

    // Define shipping (example: free if subtotal > 100, otherwise 20)
    const shipping = subtotal > 100 ? 0 : 0;

    // Total
    const total = subtotal + shipping;
    const steps = [
        { id: "s1", title: "Restoration Design Form" },
        { id: "s2", title: "Review" },
        { id: "s3", title: "Checkout" },
        { id: "s4", title: "Done" },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const next = () => {
        if (activeIndex < steps.length - 1) setActiveIndex(activeIndex + 1);
    };

    const back = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    };


    return (
        <>
            <div className="flex flex-col  rounded-3xl bg-white justify-center items-start min-h-screen">
                <DoctorHeader />
                <main className="flex-1 bg-white  p-4 sm:p-6">
                    <div className="mx-auto max-w-7xl h-full">
                        <div className="w-[100%]">
                            <StepperTabs
                                steps={steps}
                                setActiveIndex={setActiveIndex}
                                activeIndex={activeIndex}
                                back={back}
                                next={next}
                            />

                            {activeIndex === 0 && (
                                <div className="grid grid-cols-12 gap-4 min-h-screen">
                                    {/* Left 3 */}
                                    <aside className="col-span-12 sm:col-span-3 space-y-2">
                                        <FormSection
                                            title="Doctor Info"
                                            color="text-xs font-semibold"
                                            className="shadow-md border border-gray-200"
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
                                            <LabeledInput
                                                label="Create Date"
                                                type="date"
                                                value={createDate}
                                                onChange={setCreateDate}
                                            />
                                            <LabeledInput
                                                label="Case expected due date"
                                                type="date"
                                                value={dueDate}
                                                onChange={setDueDate}
                                            />
                                        </FormSection>
                                        <FormSection
                                            title="Patient Info"
                                            color="text-xs font-semibold"
                                            className="shadow-md border border-gray-200"
                                        >
                                            <LabeledInput
                                                placeholder="Name"
                                                value={patientFirst}
                                                onChange={setPatientFirst}
                                            />
                                            <LabeledInput
                                                placeholder="last name"
                                                value={patientLast}
                                                onChange={setPatientLast}
                                            />
                                            <LabeledInput
                                                placeholder="subscription id"
                                                value={subscriptionId}
                                                onChange={setSubscriptionId}
                                            />
                                        </FormSection>
                                        <LabeledSelect
                                            onClick={() => setShowSmilePicker(true)}
                                            design="pill"
                                            value={smileDesign}
                                            onChange={setSmileDesign}
                                            options={[
                                                { value: "a", label: "Pick Your Smile Design" },
                                                { value: "b", label: "Design B" },
                                                { value: "c", label: "Design C" },
                                            ]}
                                            placeholder="Pick Your Smile Design"
                                            className="bg-[#F8F8F8] "
                                            // disabled={true}
                                        />
                                        <MaterialDropdown className=' w-full rounded-xl bg-white border border-gray-200   px-4 py-3 text-sm text-[#828386] outline-none transition-shadow'
                                            options={SCANNER_TYPE}
                                            value={toothSelections[selectedTooth]?.scannerType || ""}
                                            onChange={(val) => handleDropdownChange("scannerType", val)}
                                            label="Scanner Type" storageKey="scannerType"
                                        />
                                        <FormSection
                                            title={
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-xs font-poppins font-normal">
                                                        Upload photo and patient picture files
                                                    </span>
                                                    <button
                                                        disabled
                                                        className="rounded-full px-3 py-1 text-xs font-semibold text-[#4640FF] cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            }
                                        ></FormSection>
                                        <FormSection
                                            title="Comments / Notes"
                                            className="shadow-md border border-gray-200"
                                        >
                                            <textarea
                                                rows={2}
                                                placeholder="Write here"
                                                className="w-full resize-none rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none  "
                                            />
                                        </FormSection>
                                    </aside>
                                    <section className="col-span-12 sm:col-span-6">
                                        <div className="h-full min-h-[400px] rounded-2xl border border-gray-200 bg-white p-2">
                                            <div className="grid grid-cols-2 gap-4 mb-10">
                                                <MaterialDropdown className=' w-full rounded-xl bg-white border border-gray-200   px-4 py-3 text-sm text-[#828386] outline-none transition-shadow'
                                                    options={DIGITAL_DENTURE}
                                                    value={toothSelections[selectedTooth]?.digital_denture || ""}
                                                    onChange={(val) => handleDropdownChange("digital_denture", val)}
                                                    label="Digital Denture" storageKey="digital_denture"
                                                />

                                                <MaterialDropdown className='w-full rounded-xl border bg-white border-gray-200   px-4 py-3 text-sm text-[#828386] outline-none transition-shadow'
                                                    options={SURGICAL_GUIDE}
                                                    value={toothSelections[selectedTooth]?.surgical_guide || ""}
                                                    onChange={(val) => handleDropdownChange("surgical_guide", val)}
                                                    label="Surgical guide" storageKey="surgical_guide"
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-2  justify-center">
                                                <TeethChart
                                                    sizePx={480}
                                                    initialSelectedIds={[3, 14, 30]}
                                                    onSelect={(arr) => {
                                                        console.table(arr);
                                                        if (arr.length > 0) {
                                                            setSelectedTooth(arr[arr.length - 1].id);
                                                        } else {
                                                            setSelectedTooth(null);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                    {/* Right 3 */}
                                    <aside className="col-span-12 sm:col-span-3 space-y-4">
                                        <div className="flex  flex-col justify-between">
                                            <div>
                                                <FormSection className='p-0'>
                                                    <MaterialDropdown
                                                        options={MATERIAL_OPTIONS}
                                                        value={toothSelections[selectedTooth]?.material || ""}
                                                        onChange={(val) => handleDropdownChange("material", val)}
                                                        label="Material" storageKey="material"
                                                    />

                                                    <MaterialDropdown
                                                        options={[]}
                                                        value={currentValues.material || ""}
                                                        onChange={(val) =>
                                                            handleDropdownChange("material", val)
                                                        }
                                                        label="Color"
                                                        disabled={false}

                                                    />
                                                    <MaterialDropdown
                                                        options={[]}
                                                        value={currentValues.material || ""}
                                                        onChange={(val) =>
                                                            handleDropdownChange("material", val)
                                                        }
                                                        label=" Digital Model type"

                                                    />


                                                    <MaterialDropdown
                                                        options={LAB_OPTIONS}
                                                        value={toothSelections[selectedTooth]?.lab || ""}
                                                        onChange={(val) => handleDropdownChange("lab", val)}
                                                        label="Participating Lab"
                                                        storageKey="Participating Lab"
                                                    />
                                                    <MaterialDropdown
                                                        options={PHOTOGRAMMETRY_FILES}
                                                        value={toothSelections[selectedTooth]?.Photogrammetry_files || ""}
                                                        onChange={(val) => handleDropdownChange("Photogrammetry_files", val)}
                                                        label="Photogrammetry files"
                                                        storageKey="Photogrammetry files"
                                                    />
                                                </FormSection>
                                            </div>

                                            <div className="mt-96">

                                                <div className="flex flex-col space-y-3">
                                                    {Object.entries(toothSelections).map(([toothId, values]) => (
                                                        <div key={toothId} className="flex justify-between items-center py-1">
                                                            <p className="text-xs text-[#828386]">
                                                                {values.material || "No Material"} x1
                                                            </p>
                                                            <p className="text-xs font-medium">
                                                                ${values.materialPrice || 0}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center py-3">
                                                    <p className="text-[#828386] text-xs font-poppins">
                                                        Subtotal:
                                                    </p>
                                                    <p className="text-[#1A1A1A] font-medium text-xs font-poppins">
                                                        ${subtotal.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center py-3">
                                                    <p className="text-[#828386] text-xs font-poppins">
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
                                            onClick={handleSave}
                                            className="w-full rounded-full bg-[#0b2b62] px-6 py-3 text-sm font-semibold text-white hover:bg-[#092b58]"
                                        >
                                            Checkout
                                        </button>
                                    </aside>


                                    {/* Conditionally render the Smile Picker */}
                                    {showSmilePicker && (
                                        <SmileDesignPicker onClose={() => setShowSmilePicker(false)} />
                                    )}
                                </div>



                            )}
                            {activeIndex === 1 && (
                                <ReviewOrder next={next} />
                            )}
                            {activeIndex === 2 && (
                                <CheckoutForm next={next} />
                            )}

                        </div>
                    </div>
                </main>
            </div>
        </>

    );
};

export default DoctorOrder;
