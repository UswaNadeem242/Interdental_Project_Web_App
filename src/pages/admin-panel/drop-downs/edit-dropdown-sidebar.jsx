import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Xmark2 } from "../../../icon/xmark";

import Icons from "../../../components/Icons";

import EditIcon from "../../../icon/EditIcon";
import DeleteLogo from "../../../icon/DeleteLogo";

export default function EditDropDownSidebar({ isOpen, onClose }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [showAddNewInput, setShowAddNewInput] = useState(false);
  const [newDropdownName, setNewDropdownName] = useState("");

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

  const handleAddOption = () => {
    setOptions([
      ...options,
      { id: Date.now(), photo: null, name: "", price: "" },
    ]);
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
                <div className="flex items-center justify-between px-6 py-4  border-gray-200">
                  <DialogTitle className="text-xl font-bold text-[#0F153E]">
                    Edit Drop Down
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <Xmark2 />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="px-4 py-4 text-[#949494] text-sm font-normal font-poppins border rounded-lg">
                    DropDown Name
                  </div>
                  <div className="bg-[#F8F8F8] p-4 mt-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-[#0F153E] font-normal text-sm font-poppins">
                        Options
                      </span>
                      <button onClick={() => setIsModalOpen(!isModalOpen)}>
                        <span className="text-[#4640FF] text-xl">+</span>
                      </button>
                    </div>
                    <div className="border-2 flex justify-between items-center p-2 rounded-xl mt-5">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#828386] text-xs font-normal font-poppins">
                          Argen ST
                        </span>
                        <span className="text-[#001D58] font-semibold text-xs font-poppins">
                          $50.00
                        </span>
                      </div>
                      <div className="flex gap-2 ">
                        <button>
                          <span>
                            <EditIcon />
                          </span>
                        </button>
                        <button>
                          <span>
                            <DeleteLogo />
                          </span>
                        </button>
                      </div>
                    </div>
                    {isModalOpen && (
                      <div className="mt-8">
                        <div
                          //   key={option.id}
                          className="mb-4 p-4 bg-white border border-gray-200 rounded-lg"
                        >
                          <div className="mb-4">
                            <button
                              type="button"
                              //   onClick={() => {
                              //     console.log("Upload photo for option", option.id);
                              //   }}
                              className="w-full flex items-center justify-start gap-2 px-2 py-1 h-16 border-gray-300 rounded-3xl bg-background hover:bg-gray-100 transition text-gray-600 text-sm"
                            >
                              <div className="w-12 h-12 bg-stone-200/50 rounded-full flex items-center justify-center">
                                <Icons.UploadIcon
                                  className="w-4 h-4"
                                  stroke="#001D58"
                                />
                              </div>
                              <span>Upload Photo</span>
                            </button>
                          </div>

                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Enter Name"
                              //   value={option.name}
                              //   onChange={(e) =>
                              //     handleOptionChange(
                              //       option.id,
                              //       "name",
                              //       e.target.value
                              //     )
                              //   }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondaryBrand focus:border-transparent"
                            />
                          </div>

                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Enter Price"
                              //   value={option.price}
                              //   onChange={(e) =>
                              //     handleOptionChange(
                              //       option.id,
                              //       "price",
                              //       e.target.value
                              //     )
                              //   }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondaryBrand focus:border-transparent"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              //   onClick={() => handleRemoveOption(option.id)}
                              onClick={() => setIsModalOpen(false)}
                              className="flex-1 px-4 py-3 bg-[#0137641A] text-[#013764] rounded-full text-xs font-medium font-poppins hover:bg-gray-200 transition"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAddOption}
                              className="flex-1 px-4 py-3 bg-secondaryBrand text-[#FFFFFF] rounded-full text-xs font-medium font-poppins hover:bg-secondaryBrand/90 transition"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 px-6 py-4  border-gray-200 bg-white">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 bg-gray-100 text-[#013764] font-semibold text-base rounded-full font-poppins hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    // onClick={handleSave}
                    // disabled={!selectedDropdown}
                    className="flex-1 px-6 py-3 text-[#FFFFFF] bg-secondaryBrand font-semibold text-base rounded-full font-poppins hover:bg-secondaryBrand/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
