import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddBrandModal from "../../modals/AddBrandModal";
import AddCategoryModal from "../../modals/AddCategoryModal";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [brandId, setBrandId] = useState(0);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAddBrandModal, setIsAddBrandModal] = useState(false);
  const [isAddCategoryModal, setIsAddCategoryModal] = useState(false);
  const [images, setImages] = useState([]);
  const [sku, setSku] = useState(
    () => `SKU-${Math.floor(Math.random() * 1000000)}`
  );

  const getProductDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/get/${productId}`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("-=-=-=-=");

      setProduct(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setStockQuantity(response.data.stockQuantity);
      setPrice(response.data.price);
      setCategoryId(response.data.categoryId);
      setBrandId(response.data.brandId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => {
      const imageUrl = URL.createObjectURL(file);
      return { imageUrl, altText: file.name || "Product Image" };
    });
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/category/getAllCategories`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategoriesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/brands`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("-=-=-=-=--=response.data=--==-=-=", response.data);
      setBrandsList(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllBrands();
  }, []);

  const handleUpdate = async () => {
    if (
      !name ||
      !description ||
      !price ||
      !stockQuantity ||
      !categoryId ||
      !brandId ||
      !sku
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const payload = {
        name,
        description,
        price,
        stockQuantity,
        categoryId,
        images,
        brandId,
        sku,
      };
      const response = await axios.put(
        `${BASE_URL}/api/product/update/${productId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      alert("Product Updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start">
      {/* <AdminHeader title="List Product" /> */}
      <div className="w-[1108px] h-[60px] flex justify-between items-center">
        <div className="w-[344px] h-[60px] flex flex-col justify-start items-start">
          <h1 className="font-poppins font-bold text-[26px] leading-[39px] text-[#434343]">
            Update Product
          </h1>
        </div>
        <div className="flex justify-start items-center gap-[24px]">
          <button
            onClick={() => navigate("/admin/products")}
            className="flex justify-center items-center w-[145px] h-[53px] rounded-[32px] border-[1px] border-[#013764] py-[16px] px-[45px] gap-[8px]"
          >
            <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#013764]">
              Discard
            </p>
          </button>
          <button
            onClick={() => handleUpdate()}
            className="flex justify-center items-center w-[145px] h-[53px] rounded-[32px] bg-[#001D58] border-[1px] border-[#013764] py-[16px] px-[45px] gap-[8px]"
          >
            <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#F8F8F8]">
              Update
            </p>
          </button>
        </div>
      </div>

      <div className="w-[1108px] h-[725px] gap-[32px] flex justify-start items-start mt-8">
        <div className="w-[566px] h-auto flex flex-col justify-start items-center space-y-[20px]">
          <div className="w-[566px] h-[270px] bg-white flex flex-col space-y-[16px] p-[32px] rounded-[16px]">
            <div className="w-[502px] h-[82px] flex flex-col space-y-[8px]">
              <label
                htmlFor=""
                className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Brainsim"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[502px] h-[53px] rounded-[8px] border-[1px] p-[16px] gap-[8px] border-[#E5E5E5]"
              />
            </div>
            <div className="w-[502px] h-[82px] flex flex-col space-y-[8px]">
              <label
                htmlFor=""
                className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
              >
                Description
              </label>
              <input
                type="text"
                placeholder="Brainsim"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-[502px] h-[53px] rounded-[8px] border-[1px] p-[16px] gap-[8px] border-[#E5E5E5]"
              />
            </div>
          </div>
          {/* <div className="w-[566px] h-[231px] flex flex-col justify-start items-start bg-white rounded-[16px] p-[32px] space-y-[16px]">
            <label
              htmlFor=""
              className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
            >
              Media
            </label>
            <div className="flex justify-center items-center w-[502px] h-[130px] rounded-[8px] border-[1px] gap-[4px] border-[#00000014] bg-white">
              <div className="flex flex-col justify-start items-center space-y-[2px] w-[140px] h-[44px]">
                <div className="flex justify-start items-center w-full h-[24px] gap-[4px]">
                  <div className="flex justify-center items-center p-[4px] rounded-[4px] w-[20px] h-[20px] bg-[#1FA4EF1A]">
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 0.25C4.4142 0.25 4.75 0.58579 4.75 1V3.25H7C7.4142 3.25 7.75 3.5858 7.75 4C7.75 4.4142 7.4142 4.75 7 4.75H4.75V7C4.75 7.4142 4.4142 7.75 4 7.75C3.5858 7.75 3.25 7.4142 3.25 7V4.75H1C0.58579 4.75 0.25 4.4142 0.25 4C0.25 3.5858 0.58579 3.25 1 3.25H3.25V1C3.25 0.58579 3.5858 0.25 4 0.25Z"
                        fill="#001D58"
                      />
                    </svg>
                  </div>
                  <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#001D58]">
                    upload file / uRL
                  </p>
                </div>
                <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
                  accept image,3d, JPG
                </p>
              </div>
            </div>
          </div> */}
          <div className="w-[566px] flex flex-col justify-start items-start bg-white rounded-[16px] p-[32px] space-y-[16px]">
            <label
              htmlFor="productImageUpload"
              className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
            >
              Media
            </label>

            {/* Upload Box */}
            <div className="flex justify-center items-center w-[502px] h-[130px] rounded-[8px] border-[1px] gap-[4px] border-[#00000014] bg-white">
              <div className="flex flex-col justify-start items-center space-y-[2px] w-[140px] h-[44px]">
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
                  <div className="flex justify-start items-center w-full h-[24px] gap-[4px]">
                    <div className="flex justify-center items-center p-[4px] rounded-[4px] w-[20px] h-[20px] bg-[#1FA4EF1A]">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 0.25C4.4142 0.25 4.75 0.58579 4.75 1V3.25H7C7.4142 3.25 7.75 3.5858 7.75 4C7.75 4.4142 7.4142 4.75 7 4.75H4.75V7C4.75 7.4142 4.4142 7.75 4 7.75C3.5858 7.75 3.25 7.4142 3.25 7V4.75H1C0.58579 4.75 0.25 4.4142 0.25 4C0.25 3.5858 0.58579 3.25 1 3.25H3.25V1C3.25 0.58579 3.5858 0.25 4 0.25Z"
                          fill="#001D58"
                        />
                      </svg>
                    </div>
                    <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#001D58]">
                      Upload File / URL
                    </p>
                  </div>
                  <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
                    Accept images, JPG
                  </p>
                </label>
              </div>
            </div>

            {/* Uploaded Images */}
            <div className="flex flex-wrap gap-[16px] mt-[16px]">
              {images.map((image, index) => (
                <div key={index} className="relative w-[120px] h-[120px]">
                  <img
                    src={image.imageUrl}
                    alt={image.altText}
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                  <button
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full w-6 h-6 flex justify-center items-center shadow-md"
                    onClick={() => removeImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center w-[566px] h-[146px] rounded-[16px] bg-white">
            <div className="w-[502px] h-[82px] flex flex-col space-y-[8px]">
              <label
                htmlFor=""
                className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
              >
                Pricing
              </label>
              <input
                type="text"
                placeholder="000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-[502px] h-[53px] rounded-[8px] border-[1px] p-[16px] gap-[8px] border-[#E5E5E5]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-[20px] w-[507px] h-[725px]">
          <div className="flex flex-col space-y-[8px] justify-center items-start w-[507px] h-[146px] p-[32px] bg-white rounded-[16px]">
            <label
              htmlFor=""
              className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
            >
              Total Stock
            </label>
            <input
              type="text"
              placeholder="000"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="w-[443px] h-[53px] rounded-[8px] border-[1px] p-[16px] gap-[8px] border-[#E5E5E5]"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-[507px] h-[244px] bg-white rounded-[16px] p-[32px] space-y-[16px]">
            <div className="w-[443px] h-[82px] flex flex-col space-y-[8px]">
              <label
                htmlFor=""
                className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
              >
                Category
              </label>
              <div className="relative w-full">
                <div
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsBrandOpen(false);
                  }}
                  className="flex justify-start items-center w-[443px] h-[53px] cursor-pointer outline-none rounded-[8px] border-[1px] px-[16px] gap-[8px] border-[#E5E5E5]"
                >
                  <p className="w-[389.56px] h-[21px] font-poppins font-normal text-[14px] leading-[21px] text-[#949494]">
                    {categoriesList?.find(
                      (category) => category.categoryId === categoryId
                    )?.name || "Select Brand"}
                  </p>
                  <svg
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7061 0.862378C12.2309 0.337599 13.0816 0.337599 13.6064 0.862378C14.1311 1.38716 14.1311 2.23784 13.6064 2.76262L8.23137 8.13767C7.97946 8.38967 7.63761 8.53125 7.28124 8.53125C6.92488 8.53125 6.58303 8.38967 6.33112 8.13767L0.956071 2.76262C0.431309 2.23784 0.431309 1.38716 0.956071 0.862379C1.48083 0.3376 2.33166 0.3376 2.85642 0.862378L7.28124 5.28708L11.7061 0.862378Z"
                      fill="#434343"
                    />
                  </svg>
                </div>
                {isCategoryOpen && (
                  <div className="absolute w-[443px] h-auto bg-white rounded-[8px] p-[16px] flex flex-col justify-start items-start space-y-[16px] z-50 shadow-[0_4px_4px_0_#00000017]">
                    <div
                      onClick={() => setIsAddCategoryModal(true)}
                      className="w-[132px] h-[24px] flex justify-start items-center gap-[4px] cursor-pointer"
                    >
                      <div className="w-[24px] h-[24px] flex justify-center items-center">
                        <div className="w-[20px] h-[20px] flex justify-center items-center bg-[#F5FBFC">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 0.25C4.4142 0.25 4.75 0.58579 4.75 1V3.25H7C7.4142 3.25 7.75 3.5858 7.75 4C7.75 4.4142 7.4142 4.75 7 4.75H4.75V7C4.75 7.4142 4.4142 7.75 4 7.75C3.5858 7.75 3.25 7.4142 3.25 7V4.75H1C0.58579 4.75 0.25 4.4142 0.25 4C0.25 3.5858 0.58579 3.25 1 3.25H3.25V1C3.25 0.58579 3.5858 0.25 4 0.25Z"
                              fill="#001D58"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#001D58]">
                        Add Category
                      </p>
                    </div>
                    {categoriesList?.map((category) => (
                      <div className="w-[411px] h-auto flex flex-col justify-start items-start space-y-[8px]">
                        <div
                          onClick={() => {
                            setCategoryId(category.categoryId);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full h-[38px] py-[10px] flex justify-start items-center gap-[8px] bg-white cursor-pointer ${
                            categoriesList.indexOf(category) ===
                            categoriesList.length - 1
                              ? ""
                              : "border-b-[1px] border-[#0000000D]"
                          }`}
                        >
                          <p className="w-[387px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#828386]">
                            {category.name}
                          </p>
                          <input
                            type="radio"
                            name=""
                            id=""
                            className="w-[16px] h-[16px] accent-[#D2D4DA]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-[443px] h-[82px] flex flex-col space-y-[8px]">
              <label
                htmlFor=""
                className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]"
              >
                Brand
              </label>
              <div className="relative w-full">
                <div
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  className="flex justify-start items-center w-[443px] h-[53px] cursor-pointer outline-none rounded-[8px] border-[1px] px-[16px] gap-[8px] border-[#E5E5E5]"
                >
                  <p className="w-[389.56px] h-[21px] font-poppins font-normal text-[14px] leading-[21px] text-[#949494]">
                    {brandsList?.find((brand) => brand.id === brandId)?.name ||
                      "Select Brand"}
                  </p>
                  <svg
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7061 0.862378C12.2309 0.337599 13.0816 0.337599 13.6064 0.862378C14.1311 1.38716 14.1311 2.23784 13.6064 2.76262L8.23137 8.13767C7.97946 8.38967 7.63761 8.53125 7.28124 8.53125C6.92488 8.53125 6.58303 8.38967 6.33112 8.13767L0.956071 2.76262C0.431309 2.23784 0.431309 1.38716 0.956071 0.862379C1.48083 0.3376 2.33166 0.3376 2.85642 0.862378L7.28124 5.28708L11.7061 0.862378Z"
                      fill="#434343"
                    />
                  </svg>
                </div>
                {isBrandOpen && (
                  <div className="absolute w-[443px] h-auto bg-white rounded-[8px] p-[16px] flex flex-col justify-start items-start space-y-[16px] z-50 shadow-[0_4px_4px_0_#00000017]">
                    <div
                      onClick={() => setIsAddBrandModal(true)}
                      className="w-[102px] h-[24px] flex justify-start items-center gap-[4px] cursor-pointer"
                    >
                      <div className="w-[24px] h-[24px] flex justify-center items-center">
                        <div className="w-[20px] h-[20px] flex justify-center items-center bg-[#F5FBFC">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 0.25C4.4142 0.25 4.75 0.58579 4.75 1V3.25H7C7.4142 3.25 7.75 3.5858 7.75 4C7.75 4.4142 7.4142 4.75 7 4.75H4.75V7C4.75 7.4142 4.4142 7.75 4 7.75C3.5858 7.75 3.25 7.4142 3.25 7V4.75H1C0.58579 4.75 0.25 4.4142 0.25 4C0.25 3.5858 0.58579 3.25 1 3.25H3.25V1C3.25 0.58579 3.5858 0.25 4 0.25Z"
                              fill="#001D58"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#001D58]">
                        Add Brand
                      </p>
                    </div>
                    {brandsList?.map((brand) => (
                      <div className="w-[411px] h-auto flex flex-col justify-start items-start space-y-[8px]">
                        <div
                          onClick={() => {
                            setBrandId(brand.id);
                            setIsBrandOpen(false);
                          }}
                          className={`w-full h-[38px] py-[10px] flex justify-start items-center gap-[8px] bg-white cursor-pointer ${
                            brandsList.indexOf(brand) === brandsList.length - 1
                              ? ""
                              : "border-b-[1px] border-[#0000000D]"
                          }`}
                        >
                          <p className="w-[387px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#828386]">
                            {brand.name}
                          </p>
                          <input
                            type="radio"
                            name=""
                            id=""
                            className="w-[16px] h-[16px] accent-[#D2D4DA]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start p-[32px] space-y-[16px] w-[507px] h-[295px] bg-white rounded-[16px]">
            <div className="w-[282px] h-[53px] flex flex-col justify-start items-start space-y-[10px]">
              <label
                htmlFor=""
                className="font-poppins font-semibold text-[14px] leading-[21px] text-black"
              >
                Options
              </label>
              <div className="flex justify-start items-center w-[282px] h-[24px] gap-[8px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-[20px] h-[20px] border-[1px] border-[#001D58]"
                />
                <p className="font-poppins font-normal text-[14px] leading-[21px] text-black">
                  is this product include size or colour
                </p>
              </div>
            </div>
            <input
              type="text"
              placeholder="Total Stock"
              className="w-[443px] h-[53px] rounded-[8px] border-[1px] p-[16px] gap-[8px] border-[#E5E5E5]"
            />
            <input
              type="text"
              placeholder="Total Stock"
              className="w-[443px] h-[53px] rounded-[8px] border-[1px] p-[16px] gap-[8px] border-[#E5E5E5]"
            />
            <div className="flex justify-start items-center gap-[4px]">
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                <div className="flex justify-center items-center w-[20px] h-[20px] rounded-[4px] p-[4px] bg-[#F5FBFC]">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 0.25C4.4142 0.25 4.75 0.58579 4.75 1V3.25H7C7.4142 3.25 7.75 3.5858 7.75 4C7.75 4.4142 7.4142 4.75 7 4.75H4.75V7C4.75 7.4142 4.4142 7.75 4 7.75C3.5858 7.75 3.25 7.4142 3.25 7V4.75H1C0.58579 4.75 0.25 4.4142 0.25 4C0.25 3.5858 0.58579 3.25 1 3.25H3.25V1C3.25 0.58579 3.5858 0.25 4 0.25Z"
                      fill="#001D58"
                    />
                  </svg>
                </div>
              </div>
              <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#001D58]">
                Add another
              </p>
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
          categoriesList={categoriesList}
          getAllCategories={getAllCategories}
        />
      )}
    </div>
  );
};

export default UpdateProduct;
