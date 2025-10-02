import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { updateToothSelection } from "../../store/slices/restoration-slice/index"; // adjust path
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../store/toast-slice";

// --- SubDropdown Component ---
const SubDropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-background py-2">
      <button
        className="flex items-center justify-between w-full text-sm font-normal text-textFieldHeading font-poppins"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <span>
          {isOpen ? (
            <ChevronUpIcon className="w-3 h-3" />
          ) : (
            <ChevronDownIcon className="w-3 h-3" />
          )}
        </span>
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
                onClick={() => {
                  onSelect(opt); // ✅ valid here
                  setIsOpen(false); // ✅ close dropdown after select
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  isActive
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
export const ShadeDropdown = ({
  shades = [],
  touched,
  setTouched = () => {},
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShades, setSelectedShades] = useState({});
  const {
    selectedTeeth,
    selectedTooth,
    toothSelections,
    totalPrice,
    doctorOrderItems,
  } = useSelector((state) => state.restoration);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (groupName, option) => {
    if (!selectedTooth) {
      dispatch(
        showToast({ message: `Please select a tooth first`, type: "error" })
      );
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

    // ✅ Close after selecting
    setIsOpen(false);
  };

  // ✅ Build label from selected shades
  const selectedLabel = Object.values(selectedShades)
    .map((s) => s?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="border border-background shadow-sm bg-white ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-xl bg-white px-4 py-3 text-sm outline-none transition-shadow text-textFieldHeading font-normal"
      >
        {selectedLabel || "Shade"} {/* ✅ Show selected */}
        <span>
          {isOpen ? (
            <ChevronUpIcon className="w-3 h-3" />
          ) : (
            <ChevronDownIcon className="w-3 h-3" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="p-3 space-y-3">
          <input
            type="text"
            placeholder="Search shades..."
            value={searchTerm} // ⚡ bind search term
            onChange={(e) => setSearchTerm(e.target.value)} // ⚡ update search term
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none"
          />
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
                  options={filteredOptions} // ⚡ pass filtered options
                  selected={
                    selectedShades[group.name] ||
                    toothSelections.find((t) => t.toothId === selectedTooth)?.[
                      `shade_${group.name}`
                    ] ||
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
