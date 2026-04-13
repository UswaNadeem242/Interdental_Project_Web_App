import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SecondaryButton } from "../../../Common/Button";
import TextInput from "../../../Common/Input";
import DropDownOptions from "../../../Common/drop-down-options";
import UploadPlusIcon from "../../../icon/UploadPlusIcon";
import { Xmark } from "../../../icon/xmark";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";
import Toast from "../../../components/Toast";
import AddBrandModal from "../../../modals/AddBrandModal";
import AddCategoryModal from "../../../modals/AddCategoryModal";
import AddCategoryDropDown from "./add-category-dropdown";
import EditIconTwo from "../../../icon/EditIconTwo";
import EditCategoriesModal from "../../../modals/EditCategoriesModal";
import EditBrandsModal from "../../../modals/EditBrandsModal";

function ListProduct() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([""]);
  const [images, setImages] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [isAddBrandModal, setIsAddBrandModal] = useState(false);
  const [isAddCategoryModal, setIsAddCategoryModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [editBrandModal, setEditBrandModal] = useState(false);

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const closeToast = () => setToastVisible(false);

  //API Fetch Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/category/getAllCategories`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategoriesList(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      showToast("Failed to load categories.", "error");
    }
  };

  //API Fetch Brands
  const getAllBrands = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/brands/getAll`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBrandsList(data.data || []);
    } catch (err) {
      console.error("Failed to fetch brands:", err);
      showToast("Failed to load brands.", "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllCategories(), getAllBrands()]);
    };
    fetchData();
  }, [getAllCategories, getAllBrands]);

  //Dynamic Inputs
  const handleAddInput = () => setInputs([...inputs, ""]);
  const handleInputChange = (value, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };
  const handleRemove = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  //Image Upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newPreviews]);
    formik.setFieldValue("image", [...formik.values.image, ...files]);
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = images.filter((_, i) => i !== index);
    const updatedFiles = formik.values.image.filter((_, i) => i !== index);

    setImages(updatedPreviews);
    formik.setFieldValue("image", updatedFiles);
  };

  //API Save Product
  const handleSave = async () => {
    const {
      title: name,
      description,
      pricing: price,
      totalStock: stockQuantity,
      category,
      brand,
      image,
    } = formik.values;

    try {
      const formData = new FormData();
      const productPayload = {
        name,
        description,
        price: Number(price),
        stockQuantity: Number(stockQuantity),
        categoryId: category,
        brandId: brand,
        sku: `SKU-${Math.floor(Math.random() * 100000000)}`,
      };

      formData.append("product", JSON.stringify(productPayload));
      image.forEach((file) => formData.append("images", file));

      const { data } = await axios.post(
        `${BASE_URL}/api/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.responseCode === "0000") {
        showToast("Product added successfully!", "success");
        setTimeout(() => navigate("/admin-panel/products"), 2000);
      } else if (data.responseCode === "1500") {
        showToast("Product already exists.", "error");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      showToast("Error while adding product!", "error");
    }
  };

  //
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      pricing: "",
      totalStock: "",
      category: "",
      brand: "",
      image: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      pricing: Yup.number()
        .required("Pricing is required")
        .positive("Pricing must be greater than 0")
        .max(9999999999, "Pricing cannot exceed 10 digits")
        .typeError("Pricing must be a number"),
      totalStock: Yup.number()
        .required("Total Stock is required")
        .positive("Stock must be greater than 0")
        .integer("Stock must be a whole number")
        .max(9999999999, "Stock cannot exceed 10 digits")
        .typeError("Total Stock must be a number"),
      category: Yup.string().required("Category is required"),
      brand: Yup.string().required("Brand is required"),
      image: Yup.array()
        .of(Yup.mixed())
        .min(1, "At least one image is required")
        .required("Image upload is required"),
    }),
    onSubmit: () => handleSave(),
  });

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
                  onBlur={formik.handleBlur}
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
                  rows="4"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                onBlur={formik.handleBlur}
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
                onBlur={formik.handleBlur}
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
                {/* Category */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-[#000000] mb-2">
                      Category
                    </label>
                    <button
                      type="button"
                      className="mr-1"
                      onClick={() => setEditCategoryModal(true)}
                    >
                      <EditIconTwo />
                    </button>
                  </div>
                  <div className="relative mt-2">
                    <AddCategoryDropDown
                      options={categoriesList.map((c) => c.name)}
                      placeholder="Select Category"
                      buttonText="Add Category"
                      className={"border-2"}
                      onSelect={(name) => {
                        const cat = categoriesList.find((c) => c.name === name);
                        formik.setFieldValue(
                          "category",
                          cat ? cat.categoryId : ""
                        );
                      }}
                      onButtonClick={() => setIsAddCategoryModal(true)}
                    />
                    {formik.touched.category && formik.errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-[#000000] mb-2">
                      Brand
                    </label>
                    <button
                      type="button"
                      className="mr-1"
                      onClick={() => setEditBrandModal(true)}
                    >
                      <EditIconTwo />
                    </button>
                  </div>
                  <div className="relative mt-2">
                    <DropDownOptions
                      options={brandsList.map((b) => b.name)}
                      placeholder="Select Brand"
                      buttonText="Add Brand"
                      className={"border-2"}
                      onSelect={(name) => {
                        const brand = brandsList.find((b) => b.name === name);
                        formik.setFieldValue("brand", brand ? brand.id : "");
                      }}
                      onButtonClick={() => setIsAddBrandModal(true)}
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
                        placeholder={`Option ${index + 1}`}
                        value={value}
                        onChange={(e) =>
                          handleInputChange(e.target.value, index)
                        }
                        className="w-[95%] outline-none"
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

      {isAddBrandModal && (
        <AddBrandModal
          isModalOpen={isAddBrandModal}
          setIsModalOpen={setIsAddBrandModal}
          getAllBrands={getAllBrands}
        />
      )}
      {isAddCategoryModal && (
        <AddCategoryModal
          isModalOpen={isAddCategoryModal}
          setIsModalOpen={setIsAddCategoryModal}
          getAllCategories={getAllCategories}
        />
      )}

      {editBrandModal && (
        <EditBrandsModal onClose={() => setEditBrandModal(false)} />
      )}
      {editCategoryModal && (
        <EditCategoriesModal onClose={() => setEditCategoryModal(false)} />
      )}

      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={closeToast}
        type={toastType}
      />
    </form>
  );
}

export default ListProduct;
