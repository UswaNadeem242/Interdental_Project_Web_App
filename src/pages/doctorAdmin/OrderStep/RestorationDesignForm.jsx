
import React, { useState } from 'react'
import FormSection from '../../../components/doctorAdmin/CommonLabel/FormSelection';
import LabeledInput from '../../../components/doctorAdmin/CommonLabel/inputLable';
import MaterialDropdown, { LabeledSelect } from '../../../components/doctorAdmin/CommonLabel/selectInputLabel';
import TeethChart from '../../../components/doctorAdmin/TeethComponent';


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
    const [scannerType, setScannerType] = useState("");


    // tooth & dropdown logic
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [toothSelections, setToothSelections] = useState({});
    // { 11: { denture: "Trios", guide: "iTero", material: "emax" } }

    const MATERIAL_OPTIONS = [
        { value: "ivoclar", label: "Ivovlar Prime Cad", price: 95 },
        { value: "argen-ht", label: "Argen HT", price: 45 },
        { value: "argen-st", label: "Argen ST", price: 50 },
        { value: "emax", label: "Emax", price: 95 },
        { value: "aidite", label: "Aidite", price: 85 },
        { value: "pmma", label: "PMMA", price: 35 },
        { value: "multilayer", label: "Multilayer Pro", price: 75 },
    ];

    // helpers
    const currentValues = selectedTooth ? toothSelections[selectedTooth] || {} : {};

    const handleDropdownChange = (field, value) => {
        if (!selectedTooth) return; // optional if you want to require tooth first

        const selectedOption = MATERIAL_OPTIONS.find(opt => opt.value === value);

        setToothSelections(prev => ({
            ...prev,
            [selectedTooth]: {
                ...prev[selectedTooth],
                [field]: value,
                ...(field === "material" && { materialPrice: selectedOption?.price || 0 }),
            }
        }));
    };


    // const handleSave = () => {
    //     const data = {
    //         doctor: { doctorName, officeReg, createDate, dueDate },
    //         patient: { firstName: patientFirst, lastName: patientLast, subscriptionId },
    //         teeth: toothSelections,
    //     };

    //     try {
    //         localStorage.setItem("restorationForm", JSON.stringify(data));
    //     } catch (e) { }

    //     console.log("Restoration form saved:", data);

    //     // Example total calculation
    //     const totalMaterialPrice = Object.values(toothSelections).reduce(
    //         (sum, tooth) => sum + (tooth.materialPrice || 0),
    //         0
    //     );
    //     console.log("Total material price:", totalMaterialPrice);
    // };

    const handleSave = () => {
        const data = {
            doctor: { doctorName, officeReg, createDate, dueDate },
            patient: { firstName: patientFirst, lastName: patientLast, subscriptionId },
            teeth: toothSelections,
        };

        try {
            localStorage.setItem("restorationForm", JSON.stringify(data));
        } catch (e) { console.error(e); }

        console.log("Restoration form saved:", data);

        const totalMaterialPrice = Object.values(toothSelections).reduce(
            (sum, tooth) => sum + (tooth.materialPrice || 0),
            0
        );
        console.log("Total material price:", totalMaterialPrice);
    };

    return (
        <div className="flex flex-col  justify-center items-start">
            <main className=" bg-white rounded-3xl p-4 sm:p-6">
                {/* <StepperTabs steps={steps} /> */}
                {/* <TabStepperComponents/> */}
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-12 gap-4">
                        {/* Left 3 */}
                        <aside className="col-span-12 sm:col-span-3 space-y-2">
                            <FormSection title="Doctor Info" color='text-xs font-semibold' className='shadow-md border border-gray-200'>
                                <LabeledInput label="Doctors Name / office Name" value={doctorName} onChange={setDoctorName} placeholder="Doctors Name / office Name" />
                                <LabeledInput label="Office registration number" value={officeReg} onChange={setOfficeReg} placeholder="Office registration number" />
                                <LabeledInput label="Create Date" type="date" value={createDate} onChange={setCreateDate} />
                                <LabeledInput label="Case expected due date" type="date" value={dueDate} onChange={setDueDate} />
                            </FormSection>

                            <FormSection title="Patient Info" color='text-xs font-semibold' className='shadow-md border border-gray-200'>
                                <LabeledInput placeholder="Name" value={patientFirst} onChange={setPatientFirst} />
                                <LabeledInput placeholder="last name" value={patientLast} onChange={setPatientLast} />
                                <LabeledInput placeholder="subscription id" value={subscriptionId} onChange={setSubscriptionId} />
                            </FormSection>

                            <LabeledSelect
                                design="pill"
                                value={smileDesign}
                                onChange={setSmileDesign}
                                options={[{ value: "a", label: "Pick Your Smile Design" }, { value: "b", label: "Design B" }, { value: "c", label: "Design C" }]}
                                placeholder="Pick Your Smile Design"
                                className='bg-[#F8F8F8] '
                                disabled={true}
                            />

                            <LabeledSelect
                                value={scannerType}
                                onChange={setScannerType}
                                options={["iTero", "Trios", "Medit", "Other"]}
                                placeholder="Select scanner"
                                className='bg-[#F8F8F8]'
                                disabled={true}

                            />
                            <FormSection
                                title={
                                    <div className="flex items-center justify-between gap-3">
                                        <span className='text-xs font-poppins font-normal'>Upload photo and patient picture files</span>
                                        <button disabled className="rounded-full px-3 py-1 text-xs font-semibold text-[#4640FF] cursor-pointer">
                                            +
                                        </button>
                                    </div>
                                }
                            >
                            </FormSection>
                            <FormSection title="Comments / Notes" className='shadow-md border border-gray-200'>
                                <textarea
                                    rows={2}
                                    placeholder="Write here"
                                    className="w-full resize-none rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none  "
                                />
                            </FormSection>
                        </aside>

                        {/* Center 6 (SVG tooth selection + dropdowns) */}
                        <section className="col-span-12 sm:col-span-6">
                            <div className="h-full min-h-[400px] rounded-2xl border border-gray-200 bg-white p-2">
                                {/* Example SVG teeth */}


                                {/* Dropdowns - disabled until tooth selected */}
                                <div className="grid grid-cols-2 gap-4">
                                    <LabeledSelect
                                        value={currentValues.denture || ""}
                                        onChange={val => handleDropdownChange("denture", val)}
                                        options={["iTero", "Trios", "Medit", "Other"]}
                                        placeholder="Digital Denture"
                                        disabled={true}
                                    />
                                    <LabeledSelect
                                        value={currentValues.guide || ""}
                                        onChange={val => handleDropdownChange("guide", val)}
                                        options={["iTero", "Trios", "Medit", "Other"]}
                                        placeholder="Surgical Guide"
                                        disabled={true}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2 mt-20">
                                    <TeethChart
                                        sizePx={480}
                                        initialSelectedIds={[3, 14, 30]}
                                        onSelect={(arr) => {
                                            console.table(arr); // existing logging
                                            // Set the currently selected tooth to the **last clicked one**
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
                            <div className=''>
                                <FormSection>
                                    <MaterialDropdown
                                        options={MATERIAL_OPTIONS}
                                        value={currentValues.material || ""} // stays empty
                                        onChange={(val) => handleDropdownChange("material", val)}
                                        label="Material"
                                    />

                                    <MaterialDropdown
                                        options={[]}
                                        value={currentValues.material || ""}
                                        onChange={(val) => handleDropdownChange("material", val)}
                                        label='color'
                                        disabled={false}
                                    // selectedTooth={selectedTooth}
                                    />
                                    <MaterialDropdown
                                        options={[]}
                                        value={currentValues.material || ""}
                                        onChange={(val) => handleDropdownChange("material", val)}
                                        label=' Digital Model type'

                                    // selectedTooth={selectedTooth}
                                    />
                                    <MaterialDropdown
                                        options={[]}
                                        value={currentValues.material || ""}
                                        onChange={(val) => handleDropdownChange("material", val)}
                                        label='Participating Lab'

                                    // selectedTooth={selectedTooth}
                                    />
                                </FormSection>
                            </div>


                            <div>
                                <div className='flex justify-between items-center py-3'>
                                    <p className='text-[#828386] text-xs font-poppins'>Emax<span className='text-[#1A1A1A] text-xs font-poppins font-normal'>x4</span></p>
                                    <p className='text-[#1A1A1A] font-medium text-xs font-poppins'>$80.00</p>
                                </div>
                                <div className='flex justify-between items-center py-3'>
                                    <p className='text-[#828386] text-xs font-poppins'>Argen ST <span className='text-[#1A1A1A] text-xs font-poppins font-normal'>x3</span></p>
                                    <p className='text-[#1A1A1A] font-medium text-xs font-poppins'>$80.00</p>
                                </div>
                                <div className='flex justify-between items-center py-3'>
                                    <p className='text-[#828386] text-xs font-poppins'>Subtotal:</p>
                                    <p className='text-[#1A1A1A] font-medium text-xs font-poppins'>$80.00</p>
                                </div><div className='flex justify-between items-center py-3'>
                                    <p className='text-[#828386] text-xs font-poppins'>Shipping:</p>
                                    <p className='text-[#1A1A1A] font-medium text-xs font-poppins'>$80.00</p>
                                </div>

                            </div>


                            <button onClick={handleSave} className="w-full rounded-full bg-[#0b2b62] px-6 py-3 text-sm font-semibold text-white hover:bg-[#092b58]">
                                Save & Continue
                            </button>
                        </aside>
                    </div>
                </div>
            </main >
        </div >
    )
}

export default DoctorOrder
