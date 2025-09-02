import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import product6 from "../../assets/product6.png";
// import starFilled from "../../assets/star-filled.png";
// import starOutlined from "../../assets/star-outlined.png";
// import customer from "../../assets/customer.png";
import CustomerFeedback from "../../components/CustomerFeedback";
import RelatedProducts from "../../components/RelatedProducts";
import AdminHeader from "../../components/admin/AdminHeader";
import { BASE_URL } from "../../config";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AddQuantityModal from "../../modals/AddQuantityModal";
import AreYouSureModel from "../../modals/AreYouSureModel";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [isModelShow, setIsmodelShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/product/get/${productId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("=--=-=-==-=response-=-=-=-==-=-", response);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading after request finishes
    }
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

  useEffect(() => {
    getProductDetails();
    getAllCategories();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/product/delete/${productId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      alert("Product deleted successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-start items-start w-[1108px] h-auto space-y-[32px] mt-0 pt-2 ">
        <AdminHeader title="Product Detail" />
        <div className="flex justify-center items-center w-full h-[603.32px] p-[51.16px] gap-[6.39px] rounded-2xl bg-white">
          <div className="flex justify-center items-center w-[1108px] h-[501px] gap-8">
            <div className="w-[437px] h-[501px] top-[-0.16px] left-[150.71px]">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full flex justify-center items-center text-center"
              >
                {loading ? (
                  <SwiperSlide>
                    <div className="h-[300px] w-full animate-pulse rounded-2xl flex items-center justify-center">
                      <p className="text-secondaryBrand text-lg font-medium">Loading...</p>
                    </div>
                  </SwiperSlide>
                ) : product && product.imageUrls && product.imageUrls.length > 0 ? (
                  product.imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="object-cover h-[90%]  w-full overflow-hidden rounded-2xl "
                        src={url}
                        alt={`product-${index}`}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img
                      className="object-cover h-[90%] w-full overflow-hidden rounded-2xl"
                      src="/assets/product6.png"
                      alt="default product"
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className="flex flex-col justify-start items-start w-[454.03px] h-auto space-y-[19.18px]">
              <div className="flex flex-col justify-start items-start w-[454px] h-auto  space-y-[19.18px]">
                <div className="flex flex-col justify-center items-start w-[440.97px] h-auto space-y-[19.18px]">
                  <div className="flex justify-start items-center w-[440.97px] h-[35px] gap-[6.39px]">
                    <h1 className="font-poppins font-semibold text-[28.78px] w-[365px] h-[35px] leading-[34.53px] text-[#1A1A1A]">
                      {product?.name}
                    </h1>
                    <div className="w-[69.58px] h-[33px] rounded-[34.37px] py-2 px-[12.79px] gap-[7.99px] bg-[#001D580D]">
                      <h1 className="font-poppins font-normal text-secondaryBrand text-[11.19px] leading-[16.79px] w-[44px] h-[17px]">
                        In Stock
                      </h1>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-[129.03px] h-[24px] gap-[6.39px]">
                    <div className="flex w-[97.64px] h-[15.19px] gap-[5.42px]">
                      <img src="/assets/star-filled.png" alt="star filled" />
                      <img src="/assets/star-filled.png" alt="star filled" />
                      <img src="/assets/star-filled.png" alt="star filled" />
                      <img
                        src="/assets/star-outlined.png"
                        alt="star outlined"
                      />
                      <img
                        src="/assets/star-outlined.png"
                        alt="star outlined"
                      />
                    </div>
                    <h1 className="font-poppins font-semibold text-[15.99px] text-black leading-[23.98px]">
                      5.0
                    </h1>
                  </div>
                  <h1 className="font-poppins font-semibold text-[19.18px] leading-[28.78px] text-secondaryBrand">
                    ${product?.price}
                  </h1>
                </div>

                <div className="w-[454.03px] h-auto">
                  <h1 className="font-poppins font-normal text-[11.19px] leading-[16.79px] text-[#808080]">
                    {product?.description}
                  </h1>
                </div>
              </div>
              <div className="w-[182px] h-[56px] flex justify-start items-start gap-[32px]">
                <div className="flex flex-col justify-start items-start space-y-[8px] w-auto">
                  <p className="font-poppins font-normal text-sm leading-[21px] text-[#434343]">
                    Sold
                  </p>
                  <p className="font-poppins font-semibold text-lg leading-[27px] text-[#434343]">
                    200
                  </p>
                </div>
                <div className="h-full border-[1px] border-[#0000000D]"></div>
                <div className="flex flex-col justify-start items-start space-y-[8px] w-[58px]">
                  <p className="font-poppins font-normal text-sm leading-[21px] text-[#434343]">
                    In Stock
                  </p>
                  <p className="font-poppins font-semibold text-lg leading-[27px] text-[#434343]">
                    {product?.stockQuantity}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center w-[441px] h-[48px] gap-[9.59px]">
                <div
                  onClick={() => setIsmodelShow(true)}
                  className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] bg-[#E134341A]  py-[17px] px-[24px] rounded-[28px]"
                >
                  <h1 className="font-poppins font-semibold text-sm leading-[21px] text-[#E13434]">
                    Delete
                  </h1>
                </div>
                <div
                  onClick={() => navigate(`/admin/update-product/${productId}`)}
                  className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] border-[1px] border-secondaryBrand py-[17px] px-[24px] rounded-[28px]"
                >
                  <h1 className="font-poppins font-semibold text-sm leading-[21px] text-secondaryBrand">
                    Edit
                  </h1>
                </div>
                <div
                  onClick={() => setIsQuantityModalOpen(true)}
                  className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] bg-secondaryBrand py-[17px] px-[24px] rounded-[28px]"
                >
                  <h1 className="font-poppins font-semibold text-sm leading-[21px] text-white">
                    Add Stock
                  </h1>
                </div>
              </div>
              <div className="flex justify-start items-center w-full h-[18px] gap-[4.8px]">
                <h1 className="font-poppins font-semibold text-xs leading-[18px] text-[#1A1A1A]">
                  Category:
                </h1>
                <h1 className="font-poppins font-normal text-xs leading-[18px] text-[#808080]">
                  {
                    categoriesList.find(
                      (category) => category.categoryId === product.categoryId
                    )?.name
                  }
                </h1>
              </div>
            </div>
          </div>
        </div>
        {product && (
          <div className="flex flex-col justify-start items-start w-full h-auto py-[20px] px-[24px] space-y-[25.58px] rounded-[16px] bg-white">
            <h1 className="font-poppins font-semibold text-lg leading-[27px] text-[#434343]">
              Customer Feedback
            </h1>
            <div className="w-[1108px] h-[276.71px] space-y-[15.99px] overflow-y-scroll">
              {product &&
                product?.ratings &&
                product?.ratings.length > 0 &&
                product?.ratings.map((item) => (
                  <CustomerFeedback item={item} />
                ))}
            </div>
          </div>
        )}
      </div>
      {isQuantityModalOpen && (
        <AddQuantityModal
          isModalOpen={isQuantityModalOpen}
          setIsModalOpen={setIsQuantityModalOpen}
          selectedProducts={[product]}
        />
      )}

      {isModelShow && (
        <AreYouSureModel
          title=" Are You Sure"
          desc="All data related to the employee will be deleted from the web. You won't be able to undo these changes."
          setIsModalOpen={setIsmodelShow}
          handleUpdateStatus={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductDetails;
