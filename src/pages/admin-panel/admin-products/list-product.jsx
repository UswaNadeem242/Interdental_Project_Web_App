import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SecondaryButton } from "../../../Common/Button";
import TextInput from "../../../Common/Input";
import DropDownOptions from "../../../Common/drop-down-options";
import { dropDownOpts } from "../../../Constant";
import UploadPlusIcon from "../../../icon/UploadPlusIcon";
import { Xmark } from "../../../icon/xmark";
import { useNavigate } from "react-router-dom";

function ListProduct() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([""]);
  const [images, setImages] = useState([]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      pricing: "",
      totalStock: "",
      category: "",
      brand: "",
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      pricing: Yup.string()
        .required("Pricing is required")
        .test("is-number", "Pricing must be a number", (value) =>
          /^\d+(\.\d+)?$/.test(value)
        ),
      totalStock: Yup.string()
        .required("Total Stock is required")
        .test("is-number", "Total Stock must be a number", (value) =>
          /^\d+$/.test(value)
        ),
      category: Yup.string().required("Category is required"),
      brand: Yup.string().required("Brand is required"),
      image: Yup.mixed().required("Image upload is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form Submitted with values:", values);
      console.log("Uploaded Images:", images);
      //  Reset all form fields and state after successful submit
      resetForm();
      setImages([]);
      setInputs([""]);
    },
  });

  // Handle file selection
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const updatedImages = [...images, ...newPreviews];
    setImages(updatedImages);
    formik.setFieldValue("image", updatedImages); // Sync with Formik
  };

  //  Remove a specific image
  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    formik.setFieldValue("image", updated.length > 0 ? updated : null); // Update formik on remove
  };

  //  Dropdown select handlers
  const handleCategorySelect = (option) => {
    formik.setFieldValue("category", option);
  };

  const handleBrandSelect = (option) => {
    formik.setFieldValue("brand", option);
  };

  //  Dynamic options
  const handleAddInput = () => setInputs([...inputs, ""]);
  const handleInputChange = (value, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };
  const handleRemove = (index) => {
    const updatedSizes = inputs.filter((_, i) => i !== index);
    setInputs(updatedSizes);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Header */}
      <div className="flex justify-between font-poppins items-center">
        <span></span>
        {/* <h3 className="text-[#1A2D33] text-3xl font-semibold">List Product</h3> */}
        <span className="flex gap-6">
          <div>
            <SecondaryButton
              href={"/admin-panel/products"}
              title="Discard"
              className=" text-[#013764] border border-[#013764] px-8 py-3 rounded-3xl text-sm font-semibold"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#001D58] border border-[#001D58] text-[#F8F8F8] px-8 py-3 rounded-3xl text-sm font-normal"
            >
              Save
            </button>
          </div>
        </span>
      </div>

      {/* Main */}
      <div className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
          <div className="col-span-1 md:col-span-6 ">
            {/* Left Section */}
            <div className="bg-bgWhite rounded-xl  p-6 font-poppins">
              {/* Title */}
              <div className="mb-6 ">
                <label className=" text-primaryText text-base font-semibold mb-2">
                  Title
                </label>
                <TextInput
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Brainsm"
                  className2="border-2 mt-2 p-2"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className=" text-primaryText text-base font-semibold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Bransim"
                  className="w-full p-3 text-primaryText text-sm font-normal  rounded-lg border-2 border-borderPrimary mt-2 resize-none"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="bg-bgWhite rounded-xl  p-6 mt-4 font-poppins">
              <h2 className="text-base font-semibold text-primaryText mb-4">
                Media
              </h2>
              <div className="border-2  border-borderPrimary rounded-lg py-6 text-center flex flex-col items-center justify-center relative">
                {images.length > 0 ? (
                  <div className="flex flex-wrap gap-4 justify-center">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300"
                      >
                        <img
                          src={img.preview}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-white rounded-full shadow-md p-1 hover:bg-gray-100"
                        >
                          <Xmark />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <input
                      id="productImageUpload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="productImageUpload"
                      className="cursor-pointer flex flex-col justify-center items-center"
                    >
                      <div className="flex flex-col justify-start items-center w-full h-[74px] gap-[4px] mt-8">
                        <div className="flex flex-row">
                          <div className="flex justify-center items-center mb-1 rounded-[4px] w-[20px] h-[20px] bg-[#1FA4EF1A] mr-2 ">
                            <UploadPlusIcon />
                          </div>
                          <p className="text-[#001D58] font-normal text-sm mb-1">
                            Upload File / URL
                          </p>
                        </div>
                        <p className="text-secondaryText text-xs font-normal ">
                          Accept Image, 3D & JPG
                        </p>
                      </div>
                    </label>
                  </>
                )}
              </div>

              {/* Image validation error */}
              {formik.touched.image && formik.errors.image && (
                <p className="text-red-500 text-xs mt-2">
                  {formik.errors.image}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-bgWhite rounded-xl  p-6 mt-4 font-poppins">
              <label className=" text-primaryText text-base font-semibold mb-2">
                Pricing
              </label>
              <TextInput
                type="text"
                id="pricing"
                name="pricing"
                placeholder="000"
                className2="border-2 mt-2"
                value={formik.values.pricing}
                onChange={formik.handleChange}
              />
              {formik.touched.pricing && formik.errors.pricing && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.pricing}
                </p>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-1 md:col-span-6">
            {/* Total Stock */}
            <div className="bg-bgWhite rounded-xl  p-6  font-poppins">
              <label className=" text-primaryText text-base font-semibold mb-2">
                Total Stock
              </label>
              <TextInput
                type="text"
                id="totalStock"
                name="totalStock"
                placeholder="000"
                className2="border-2 mt-2"
                value={formik.values.totalStock}
                onChange={formik.handleChange}
              />
              {formik.touched.totalStock && formik.errors.totalStock && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.totalStock}
                </p>
              )}
            </div>

            {/* Category and Brand */}
            <div className=" bg-bgWhite p-6 font-poppins mt-4 rounded-xl">
              <div className="w-full  space-y-6">
                <div>
                  <label className="text-sm font-semibold text-[#000000] mb-2">
                    Category
                  </label>
                  <div className="relative mt-2">
                    <DropDownOptions
                      options={dropDownOpts}
                      placeholder="Select Category"
                      buttonText="Add Category"
                      buttonClassName="hidden"
                      className={"border-2"}
                      onSelect={handleCategorySelect}
                    />
                    {formik.touched.category && formik.errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.category}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#000000] mb-2">
                    Brand
                  </label>
                  <div className="relative mt-2">
                    <DropDownOptions
                      options={dropDownOpts}
                      placeholder="Select Brand"
                      buttonText="Add Brand"
                      className={"border-2"}
                      onSelect={handleBrandSelect}
                    />
                    {formik.touched.brand && formik.errors.brand && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.brand}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="bg-bgWhite rounded-xl  p-6 font-poppins mt-4">
              <div className="mb-6 ">
                <label className=" text-[#000000] text-base font-semibold mb-2">
                  Options
                </label>
                <div className="my-2 flex gap-2 items-center">
                  <input type="checkbox" name="agree" className="w-4 h-4" />
                  <span className="text-[#000000] text-sm font-normal">
                    Does this product include size or colour
                  </span>
                </div>

                {/* Dynamic Inputs */}
                <div className="mt-4">
                  {inputs.map((value, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-row h-[50px] rounded-lg border-2 items-center px-[16px] gap-[8px] border-[#E5E5E5] mb-4 "
                    >
                      <input
                        type="text"
                        placeholder={`Size 1`}
                        value={value}
                        onChange={(e) =>
                          handleInputChange(e.target.value, index)
                        }
                        className="w-[95%]"
                      />
                      <span
                        onClick={() => handleRemove(index)}
                        className="hover:cursor-pointer"
                      >
                        <Xmark />
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Another */}
                <div
                  onClick={handleAddInput}
                  className="flex justify-start items-center gap-[4px] cursor-pointer mt-2"
                >
                  <div className="w-[24px] h-[24px] flex justify-center items-center">
                    <div className="flex justify-center items-center w-[20px] h-[20px] rounded-[4px] p-[4px] bg-[#F5FBFC]">
                      <UploadPlusIcon />
                    </div>
                  </div>
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#001D58]">
                    Add another
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ListProduct;
