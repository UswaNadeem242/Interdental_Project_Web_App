import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

export function LabeledSelect({
  label,
  options = [],
  value,
  onChange,
  required,
  name,
  placeholder = "Select",
  className,
  disabled,
}) {
  return (
    <div className="space-y-2">
      {/* {label && (
                <label className="block text-xs font-semibold text-secondaryBrand">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )} */}
      <select
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${className} w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-red-700 outline-none transition-shadow`}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
export default function MaterialDropdown({
  options = [],
  value, // primitive value (e.g., option.value)
  onChange, // function to update Redux
  label = "Select",
  className,
  dropdownClass,
  error,
  className2,
  hideCheckForNotAvailable = false, // ✅ new prop

}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options?.find((o) => o.value === value);

  const handleSelect = (option) => {
    onChange?.(option); // send whole object to Redux
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative font-poppins">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${className || ""
          } flex w-full items-center justify-between bg-grey-500 border border-background px-2 py-3 text-left text-sm font-normal`}
      >
        <span>{selected?.label ?? label}</span>
        <ChevronDownIcon
          className={`h-3 w-3 text-[#949494] ${dropdownClass || ""}`}
        />
      </button>

      {/* Panel (removed: absolute z-20) */}
      {open && (
        <div
          className={` w-full  border border-background bg-white shadow-lg absolute z-20 ${className2}`}
        >
          <div className="space-y-1">
            {options.map((opt, idx) => {
              const active = opt.value === value;
              const isLast = idx === options.length - 1;
              const isNotAvailable = opt.label?.toLowerCase() === "not available"; // ✅ detect

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt)} // pass full object
                  className={`flex w-full items-center justify-between px-3 py-3 text-sm transition-colors
                    ${active ? "bg-indigo-50" : "hover:bg-gray-50"} 
                    ${!isLast ? "border-b-2 border-background" : ""}`}
                >
                  {/* <span className="flex justify-between items-center gap-1">
                    <span
                      className={`grid h-4 w-4 place-items-center rounded-full border ${
                        active ? "text-[#4640FF]" : "border-gray-300"
                      }`}
                    >
                      {active && (
                        <span className="h-2 w-2 rounded-full bg-secondaryBrand" />
                      )}
                    </span>
                    <span className="text-textFieldHeading text-[10px] font-normal">
                      {opt.label}
                    </span>
                  </span> */}
                  <span className="flex justify-between items-center gap-1">
                    {/* ✅ Hide circle if "Not available" and prop is true */}
                    {!(
                      hideCheckForNotAvailable && isNotAvailable
                    ) && (
                        <span
                          className={`grid h-4 w-4 place-items-center rounded-full border ${active ? "text-[#4640FF]" : "border-gray-300"
                            }`}
                        >
                          {active && (
                            <span className="h-2 w-2 rounded-full bg-secondaryBrand" />
                          )}
                        </span>
                      )}

                    <span className="text-textFieldHeading text-[10px] font-normal">
                      {opt.label}
                    </span>
                  </span>
                  {opt.price != null && (
                    <span className="font-semibold text-[#001D58] text-[10px]">
                      ${Number(opt.price).toFixed(2)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-800">{error}</p>}
    </div>
  );
}
