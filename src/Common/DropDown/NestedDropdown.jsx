// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
// import React, { useState } from "react";
// import { updateToothSelection } from "../../store/slices/restoration-slice/index"; // adjust path
// import { useDispatch, useSelector } from "react-redux";
// // --- SubDropdown Component ---
// const SubDropdown = ({ label, options, selected, onSelect }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <div className="border-b border-gray-200 py-2">
//             {/* Sub-dropdown header */}
//             <button
//                 className="flex items-center justify-between w-full text-sm font-normal text-textFieldHeading font-poppins "
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 {label}
//                 <span>{isOpen ? <ChevronUpIcon className="w-3 h-3 " /> : <ChevronDownIcon className="w-3 h-3" />}</span>
//             </button>

//             {/* Options list */}
//             {isOpen && (
//                 <div className="mt-2 flex flex-wrap gap-2">
//                     {options.map((opt) => {
//                         const optionLabel = opt?.label ?? String(opt);
//                         const optionValue = opt?.value ?? String(opt);
//                         const selectedValue = selected?.value ?? selected;
//                         const isActive = selectedValue === optionValue;
//                         return (
//                             <button
//                                 key={String(optionValue)}
//                                 onClick={() => onSelect(opt)}
//                                 className={`px-3 py-1 rounded-full border text-sm ${isActive ? "bg-secondaryBrand text-white border-blue-600" : " text-gray-700 border border-textField"}`}
//                             >
//                                 {optionLabel}
//                             </button>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// // --- Main Dropdown Component ---
// // export const ShadeDropdown = ({ shades = [], onChange = () => { }, shades = [], selectedTooth, touched, setTouched }) => {
// //     const dispatch = useDispatch();
// //     const toothSelections = useSelector((state) => state.tooth.toothSelections);
// //     // State for each sub-dropdown
// //     const [selectedClassic, setSelectedClassic] = useState(null);
// //     const [selected3D1, setSelected3D1] = useState(null);
// //     const [selected3D2, setSelected3D2] = useState(null);

// //     // Keep track of selections from all groups
// //     const [selectedShades, setSelectedShades] = useState({});

// //     // helper → convert children into dropdown options
// //     // const makeOptions = (parent) =>
// //     //     (parent.children || []).map((child) => ({
// //     //         label: child.name,
// //     //         value: child.id,
// //     //         parent: parent.name,
// //     //     }));

// //     // const handleSelect = (parentName, option) => {
// //     //     const updated = { ...selectedShades, [parentName]: option };
// //     //     setSelectedShades(updated);
// //     //     onChange?.(updated); // ✅ send to parent
// //     // };



// //     const handleSelect = (parentName, option) => {
// //         if (!selectedTooth) {
// //             alert("⚠️ Please select a tooth first");
// //             return;
// //         }

// //         const updated = { ...selectedShades, [parentName]: option };
// //         setSelectedShades(updated);

// //         // ✅ dispatch to Redux
// //         dispatch(
// //             updateToothSelection({
// //                 toothId: selectedTooth,
// //                 field: `shade_${parentName}`, // dynamic field
// //                 value: option.name,
// //                 price: option.price || 0,
// //                 option,
// //                 parentName
// //             })
// //         );

// //         // reset touched for validation
// //         setTouched((prev) => ({ ...prev, [`shade_${parentName}`]: false }));
// //     };

// //     const makeOptions = (group) => group.children || [];
// //     return (
// //         <div className=" border border-gray-300 shadow-sm bg-white rounded-xl">
// //             {/* Main dropdown header */}
// //             <button
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className="w-full flex items-center justify-between p-2   rounded-xl bg-white  px-4 py-3 text-sm   outline-none transition-shadow   text-textFieldHeading font-normal"
// //             >
// //                 Shade
// //                 <span>{isOpen ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}</span>
// //             </button>

// //             {/* {isOpen && (
// //                 <div className="p-3 space-y-3">

// //                     <input
// //                         type="text"
// //                         placeholder="Search here..."
// //                         className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none "
// //                     />

// //                      <SubDropdown
// //                         label="Vita Classic Shades"
// //                         options={["A1", "A2", "A3", "A3.5", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", 'D2', 'D3', 'D4']}
// //                         selected={selectedClassic}
// //                         onSelect={setSelectedClassic}
// //                     />

// //                     <SubDropdown
// //                         label="Vita 3D-Master Shades"
// //                         options={["1m1", "1m2", "2L1.5", "2L2.5", "2R 1.5", "2R 2.5 ", "2m1", "2m2", "2m3", "3L 1.5", "3L 2.5", "3R1.5", '3R2.5', '3L1.5', '3L2.5', '3M1', '3M2', '3M3', '4L1.5', '4L2.5', '4M1', '4M2', '4M3', '4R1.5', '4R2.5', '5M1', '5M2', '5M3']}
// //                         selected={selected3D1}
// //                         onSelect={setSelected3D1}
// //                     />

// //                     <SubDropdown
// //                         label="Vita 3D-Master Shades (Extra)"
// //                         options={["0M1", "0M2", "0M3", "0.5m1", "1m1", "1m2", "1.5m2", "2m2", '2.5m2', '3.5m2', '4m2', '4.5m2', '5m2', '5m2.5', '5m3']}
// //                         selected={selected3D2}
// //                         onSelect={setSelected3D2}
// //                     />
// //                 </div>
// //             )} */}
// //             {isOpen && (
// //                 <div className="p-3 space-y-3">
// //                     {/* Search (optional) */}
// //                     {/* <input
// //                         type="text"
// //                         placeholder="Search here..."
// //                         className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none"
// //                     /> */}

// //                     {/* Dynamically render sub-groups from API */}
// //                     {/* {Array.isArray(shades) && shades.map((group) => (
// //                         <SubDropdown
// //                             key={group.id}
// //                             label={group.name}
// //                             options={makeOptions(group)}
// //                             selected={selectedShades[group.name] || null}
// //                             onSelect={(opt) => handleSelect(group.name, opt)}
// //                         />
// //                     ))} */}


// //                     {Array.isArray(shades) &&
// //                         shades.map((group) => (
// //                             <SubDropdown
// //                                 key={group.id}
// //                                 label={group.name}
// //                                 options={makeOptions(group)}
// //                                 selected={
// //                                     selectedShades[group.name] ||
// //                                     toothSelections.find((t) => t.toothId === selectedTooth)?.[`shade_${group.name}`] ||
// //                                     null
// //                                 }
// //                                 onSelect={(opt) => handleSelect(group.name, opt)}
// //                             />
// //                         ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };




// export const ShadeDropdown = ({ shades = [], onChange = () => { }, touched, setTouched }) => {
//     const dispatch = useDispatch();

//     const [isOpen, setIsOpen] = useState(false);
//     const { selectedTeeth, selectedTooth, toothSelections, totalPrice, doctorOrderItems } = useSelector(state => state.restoration);

//     const [selectedShades, setSelectedShades] = useState({});

//     const handleSelect = (parentName, option) => {
//         if (!selectedTooth) {
//             alert("⚠️ Please select a tooth first");
//             return;
//         }

//         const updated = { ...selectedShades, [parentName]: option };
//         setSelectedShades(updated);

//         dispatch(
//             updateToothSelection({
//                 toothId: selectedTooth,
//                 field: `shade_${parentName}`,
//                 value: option.name,
//                 price: option.price || 0,
//                 option,
//                 parentName
//             })
//         );

//         setTouched((prev) => ({ ...prev, [`shade_${parentName}`]: false }));
//     };

//     const makeOptions = (group) => group.children || [];

//     return (
//         <div className="border border-gray-300 shadow-sm bg-white rounded-xl">
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-full flex items-center justify-between p-2 rounded-xl bg-white px-4 py-3 text-sm outline-none transition-shadow text-textFieldHeading font-normal"
//             >
//                 Shade
//                 <span>{isOpen ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}</span>
//             </button>

//             {isOpen && (
//                 <div className="p-3 space-y-3">
//                     {Array.isArray(shades) &&
//                         shades.map((group) => (
//                             <SubDropdown
//                                 key={group.id}
//                                 label={group.name}
//                                 options={makeOptions(group)}
//                                 selected={
//                                     selectedShades[group.name] ||
//                                     toothSelections.find((t) => t.toothId === selectedTooth)?.[`shade_${group.name}`] ||
//                                     null
//                                 }
//                                 onSelect={(opt) => handleSelect(group.name, opt)}
//                             />
//                         ))}
//                 </div>
//             )}
//         </div>
//     );
// };




import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { updateToothSelection } from "../../store/slices/restoration-slice/index"; // adjust path
import { useDispatch, useSelector } from "react-redux";

// --- SubDropdown Component ---
const SubDropdown = ({ label, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-2">

            <button
                className="flex items-center justify-between w-full text-sm font-normal text-textFieldHeading font-poppins"
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}
                <span>{isOpen ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}</span>
            </button>

            {isOpen && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {options.map((opt) => {
                        const optionLabel = opt?.name ?? String(opt);
                        const optionValue = opt?.id ?? String(opt);
                        const selectedValue = selected?.id ?? selected;
                        const isActive = selectedValue === optionValue;

                        return (
                            <button
                                key={optionValue}
                                onClick={() => onSelect(opt)}
                                className={`px-3 py-1 rounded-full text-sm ${isActive
                                    ? "bg-secondaryBrand text-white border-blue-600"
                                    : "text-gray-700 border border-textField"
                                    }`}
                            >
                                {optionLabel}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// --- Main ShadeDropdown ---
export const ShadeDropdown = ({ shades = [], touched, setTouched = () => { } }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedShades, setSelectedShades] = useState({});
    const { selectedTeeth, selectedTooth, toothSelections, totalPrice, doctorOrderItems } = useSelector(state => state.restoration);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelect = (groupName, option) => {
        if (!selectedTooth) {
            alert("⚠️ Please select a tooth first");
            return;
        }

        const updated = { ...selectedShades, [groupName]: option };
        setSelectedShades(updated);


        dispatch(
            updateToothSelection({
                toothId: selectedTooth,
                field: `shade_${groupName}`,
                value: option.name,
                price: option.price || 0,
                option,
                parentName: groupName,
            })
        );

        setTouched((prev) => ({ ...prev, [`shade_${groupName}`]: false }));
    };

    return (
        <div className="border border-gray-300 shadow-sm bg-white rounded-xl">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-white px-4 py-3 text-sm outline-none transition-shadow text-textFieldHeading font-normal"
            >
                Shade
                <span>{isOpen ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}</span>
            </button>

            {isOpen && (
                <div className="p-3 space-y-3">
                    <input
                        type="text"
                        placeholder="Search shades..."
                        value={searchTerm}                   // ⚡ bind search term
                        onChange={(e) => setSearchTerm(e.target.value)}  // ⚡ update search term
                        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none"
                    />
                    {/* {Array.isArray(shades) &&
                        shades.map((group) => {
                            // ⚡ ADDED: filter children based on search term
                            const filteredOptions = (group.children || []).filter((child) =>
                                child.name.toLowerCase().includes(searchTerm.toLowerCase())
                            );
                            shades.map((group) => (
                                <SubDropdown
                                    key={group.id}
                                    label={group.name}
                                    options={group.children || []} // ⚡ flatten to first-level children
                                    selected={
                                        selectedShades[group.name] ||
                                        toothSelections.find((t) => t.toothId === selectedTooth)?.[`shade_${group.name}`] ||
                                        null
                                    }
                                    onSelect={(opt) => handleSelect(group.name, opt)}
                                />
                            ))
                        } */}


                    {Array.isArray(shades) &&
                        shades.map((group) => {
                            // ⚡ ADDED: filter children based on search term
                            const filteredOptions = (group.children || []).filter((child) =>
                                child.name.toLowerCase().includes(searchTerm.toLowerCase())
                            );

                            return (
                                <SubDropdown
                                    key={group.id}
                                    label={group.name}
                                    options={filteredOptions}    // ⚡ pass filtered options
                                    selected={
                                        selectedShades[group.name] ||
                                        toothSelections.find((t) => t.toothId === selectedTooth)?.[`shade_${group.name}`] ||
                                        null
                                    }
                                    onSelect={(opt) => handleSelect(group.name, opt)}
                                />
                            );
                        })}
                </div>
            )}
        </div>
    );
};
