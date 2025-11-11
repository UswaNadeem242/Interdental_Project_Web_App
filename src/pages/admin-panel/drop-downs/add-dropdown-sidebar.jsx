import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Xmark } from "../../../icon/xmark";
import ChevronDownIcon from "../../../icon/ChevronDownIcon";
import Icons from "../../../components/Icons";
import { PlusIcon } from "../../../icon/PlusIcon";

const existingDropdowns = [
  "Scanner Type",
  "Material",
  "Smile Design",
  "Smart Digital Model Type",
  "Denture",
  "Dental Lab Alliance",
];

export default function AddDropDownSidebar({ isOpen, onClose }) {
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [showAddNewInput, setShowAddNewInput] = useState(false);
  const [newDropdownName, setNewDropdownName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, photo: null, name: "", price: "" },
  ]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleAddNewDropdown = () => {
    if (newDropdownName.trim()) {
      setSelectedDropdown(newDropdownName.trim());
      setNewDropdownName("");
      setShowAddNewInput(false);
      setIsDropdownOpen(false);
    }
  };

  const handleAddOption = () => {
    setOptions([
      ...options,
      { id: Date.now(), photo: null, name: "", price: "" },
    ]);
  };

  const handleRemoveOption = (id) => {
    if (options.length > 1) {
      setOptions(options.filter((opt) => opt.id !== id));
    }
  };

  const handleOptionChange = (id, field, value) => {
    setOptions(
      options.map((opt) => (opt.id === id ? { ...opt, [field]: value } : opt))
    );
  };

  const handleSave = () => {
    console.log("Saving dropdown:", { selectedDropdown, options });
    onClose();
    setSelectedDropdown(null);
    setShowAddNewInput(false);
    setNewDropdownName("");
    setOptions([{ id: 1, photo: null, name: "", price: "" }]);
  };

  const handleCancel = () => {
    setSelectedDropdown(null);
    setShowAddNewInput(false);
    setNewDropdownName("");
    setOptions([{ id: 1, photo: null, name: "", price: "" }]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <DialogTitle className="text-xl font-bold text-tertiaryBrand">
                    Add Drop Down
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <Xmark />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-tertiaryBrand mb-2">
                      Select Drop Down
                    </label>

                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-left text-sm hover:border-gray-400 focus:outline-none"
                      >
                        <span className={selectedDropdown ? "text-secondaryText" : "text-secondaryText"}>
                          {selectedDropdown || "Select Drop Down"}
                        </span>
                        <ChevronDownIcon
                          className={`w-4 h-4 text-gray-400 transform transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {!showAddNewInput && (
                            <div className="p-2 border-b border-gray-200">
                              <button
                                type="button"
                                onClick={() => setShowAddNewInput(true)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondaryBrand hover:bg-gray-50 rounded transition"
                              >
                                <PlusIcon />
                                <span>Add New Drop Down</span>
                              </button>
                            </div>
                          )}

                          {showAddNewInput && (
                            <div className="p-2 border-b border-gray-200 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  placeholder="Drop Down name"
                                  value={newDropdownName}
                                  onChange={(e) => setNewDropdownName(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      handleAddNewDropdown();
                                    }
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-secondaryText focus:outline-none focus:ring-2 focus:ring-secondaryBrand focus:border-transparent"
                                  autoFocus
                                />
                                <button
                                  type="button"
                                  onClick={handleAddNewDropdown}
                                  className="px-4 py-2 bg-secondaryBrand text-white rounded-lg text-sm font-semibold hover:bg-secondaryBrand/90 transition"
                                >
                                  Add
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowAddNewInput(false);
                                    setNewDropdownName("");
                                  }}
                                  className="text-gray-400 hover:text-gray-600 transition"
                                >
                                  <Xmark />
                                </button>
                              </div>
                            </div>
                          )}

                          {existingDropdowns.map((dropdown) => (
                            <button
                              key={dropdown}
                              type="button"
                              onClick={() => {
                                setSelectedDropdown(dropdown);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full flex items-center justify-between px-4 py-2 text-left text-sm text-secondaryText hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                            >
                              <span>{dropdown}</span>
                              <input
                                type="radio"
                                checked={selectedDropdown === dropdown}
                                readOnly
                                className="w-4 h-4 text-brand border-gray-300 focus:ring-brand"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDropdown && (
                    <div className="bg-background p-4 rounded-lg">
                      <h3 className="text-sm font-semibold text-tertiaryBrand mb-4">
                        Options
                      </h3>

                      {options.map((option, index) => (
                        <div
                          key={option.id}
                          className="mb-4 p-4 bg-white border border-gray-200 rounded-lg"
                        >
                          <div className="mb-4">
                            <button
                              type="button"
                              onClick={() => {
                                console.log("Upload photo for option", option.id);
                              }}
                              className="w-full flex items-center justify-start gap-2 px-2 py-1 h-16 border-gray-300 rounded-3xl bg-background hover:bg-gray-100 transition text-gray-600 text-sm"
                            >
                              <div className="w-12 h-12 bg-stone-200/50 rounded-full flex items-center justify-center">
                                <Icons.UploadIcon className="w-4 h-4" stroke="#001D58" />
                                </div>
                              <span>Upload Photo</span>
                            </button>
                          </div>

                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Enter Name"
                              value={option.name}
                              onChange={(e) =>
                                handleOptionChange(option.id, "name", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondaryBrand focus:border-transparent"
                            />
                          </div>

                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Enter Price"
                              value={option.price}
                              onChange={(e) =>
                                handleOptionChange(option.id, "price", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondaryBrand focus:border-transparent"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={handleAddOption}
                              className="flex-1 px-4 py-2 bg-secondaryBrand text-white rounded-lg text-sm font-semibold hover:bg-secondaryBrand/90 transition"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveOption(option.id)}
                              className="flex-1 px-4 py-2 bg-gray-100 text-primaryText rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 px-6 py-4 border-t border-gray-200 bg-white">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 bg-gray-100 text-primaryText rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!selectedDropdown}
                    className="flex-1 px-6 py-3 bg-secondaryBrand text-white rounded-lg text-sm font-semibold hover:bg-secondaryBrand/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
