import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropDownOptions from "../Common/drop-down-options";
import TagInput from "../Common/tag-input";
import AreYouSureModel from "./AreYouSureModel";
import { useEffect, useRef, useState } from "react";
import CategoryDropdown from "../Common/CategoryDropDown";

const AddBlogModal = ({ onClose, data }) => {
  //
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([
    "Dental",
    "Health",
    "Teeth Treatment",
    "Facecare",
  ]);
  const [selected, setSelected] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };
  //
  const [formData, setFormData] = useState(null);
  const [showSureModal, setShowSureModal] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.array().min(1, "At least one tag is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const initialValues = {
    title: "",
    category: "",
    tags: [],
    description: "",
    image: null,
  };

  // ✅ Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    setFormData(values);
    console.log("Form Data:", values);

    resetForm();
    onClose(); // Close main modal after publishing
  };

  // ✅ Confirm close action
  const handleConfirmClose = () => {
    setShowSureModal(false); // hide confirmation modal
    onClose(); // close main modal
  };
  const handleSelect = (cat) => {
    setSelected(cat);
    setIsOpen(false);
  };

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={() => setShowSureModal(true)} // if background is clicked
      >
        <div
          className="bg-white shadow-xl w-[90%] h-[100%] ml-40 p-8"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Header */}
          <div className="flex md:flex-row flex-col justify-between items-center mb-6 font-poppins">
            <h2 className="md:text-xl text-base font-semibold text-[#0F153E] md:mb-0 mb-6">
              Add New Article or Blog
            </h2>
            <div className="flex gap-2">
              {/* When Cancel is clicked, open confirmation modal */}
              <button
                type="button"
                onClick={() => onClose()}
                className="px-6 py-3 rounded-full bg-[#F8F8F8] text-[#434343] text-xs font-normal"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="blogForm"
                className="px-6 py-3 rounded-full bg-[#001D58] text-[#F8F8F8] text-xs font-medium"
              >
                Save & Publish
              </button>
            </div>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form id="blogForm" className="space-y-4">
                {/* Upload Section */}
                <div className="flex flex-col items-center max-w-80 border-2 border-[#00000014] rounded-lg p-6 text-center font-poppins">
                  {values.image ? (
                    <div className="relative ">
                      <img
                        src={URL.createObjectURL(values.image)}
                        alt="Preview"
                        className="w-32 h-[120px] object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setFieldValue("image", null)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center py-10">
                      <span className="text-[#001D58] font-normal">
                        <span className=" bg-[#1FA4EF1A] rounded-md px-1">
                          +
                        </span>{" "}
                        Upload File / URL
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        Accept Image, 3D & JPG
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFieldValue("image", e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
                <ErrorMessage
                  name="image"
                  component="p"
                  className="text-red-500 text-xs"
                />

                {/* Title and Category */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-[#434343] font-poppins font-semibold mb-1">
                      Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Write Title"
                      className="w-full border-2 text-black rounded-md px-3 py-2 focus:outline-none  font-poppins"
                    />
                    <ErrorMessage
                      name="title"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <label className="block text-sm text-[#434343] font-poppins font-semibold mb-1">
                        Select Category
                      </label>
                      <div className="relative w-full" ref={dropdownRef}>
                        {/* Select Field */}
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className="w-full border-2 rounded-lg px-4 py-2 text-gray-500 text-left flex justify-between items-center"
                        >
                          <span className="font-poppins text-gray-400">
                            {selected || "Select"}
                          </span>
                          <svg
                            className={`w-4 h-4 transform transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* Attach Dropdown */}
                        {isOpen && (
                          <CategoryDropdown
                            className={"w-full"}
                            onSelect={handleSelect}
                            selected={selected}
                          />
                        )}
                      </div>

                      {/* <DropDownOptions
                        options={["Health", "Fitness", "Nutrition"]}
                        placeholder="Select"
                        buttonClassName="hidden"
                        className={"border-2"}
                        onSelect={(option) => setFieldValue("category", option)}
                      />

                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-500 text-xs "
                      /> */}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {/* <div>
                  <label className="block text-sm text-[#434343] font-poppins font-semibold mb-1">
                    Tags
                  </label>
                  <Field name="tags">
                    {({ field, form }) => (
                      <TagInput
                        value={field.value || []}
                        onChange={(newTags) =>
                          form.setFieldValue("tags", newTags)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="tags"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div> */}

                {/* Description */}
                <div className="font-poppins">
                  <label className="block text-sm text-[#434343] font-poppins font-semibold mb-1">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows="8"
                    placeholder="Write Here"
                    className="w-full border-2 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/*AreYouSure Modal */}
      {/* {showSureModal && (
        <AreYouSureModel
          title="Are You Sure?"
          desc="You can not undo the action"
          handleUpdateStatus={handleConfirmClose}
          setIsModalOpen={setShowSureModal}
        />
      )} */}
    </>
  );
};

export default AddBlogModal;
