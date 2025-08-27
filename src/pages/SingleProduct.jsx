import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import product6 from "../assets/product6.png";
// import starFilled from "../assets/star-filled.png";
// import starOutlined from "../assets/star-outlined.png";
// import customer from "../assets/customer.png";
import CustomerFeedback from "../components/CustomerFeedback";
import RelatedProducts from "../components/RelatedProducts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import Toast from "../components/Toast";
import { useAuth } from "../auth/AuthContext";

const SingleProduct = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  console.log("single product", user);

  const [product, setProduct] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const getProduct = async () => {
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
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
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
  const getRelatedProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/${productId}/related`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRelatedProducts(response.data);
      console.log("related products", response.data);
    } catch (error) {
      setRelatedProducts(error.response.data.data);
    }
  };

  useEffect(() => {
    getProduct();
    getAllCategories();
    getRelatedProducts();
  }, [productId]);

  const closeToast = () => {
    setToastVisible(false);
  };

  const handleAddtoCart = async () => {
    try {
      setLoading(true);
      const payload = {
        id: productId,
        productId: productId,
        productName: product.name,
        quantity: 1,
        price: product.price,
        totalPrice: product.price,
      };
      console.log("-=-=-=-=-=payload-=-=-=-=-=-==--=", payload);
      const response = await axios.post(`${BASE_URL}/api/cart/add`, payload, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setToastMessage("Added to Cart !");
      setToastType("success");
      setToastVisible(true);
      // alert("Added to cart");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddtoWishlist = async () => {
    try {
      const payload = {
        id: productId,
        productId: productId,
        productName: product.name,
        price: product.price,
      };
      const response = await axios.post(
        `${BASE_URL}/api/wishlist/add`,
        payload,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setToastMessage("Added to Wishlist !");
      setToastType("success");
      setToastVisible(true);
    } catch (error) {
      setToastMessage(`Error: ${error}`);
      setToastType("success");
      setToastVisible(true);
    }
  };
  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600]">
      {console.log("=-=-=-=productId-==-=-=--=", productId)}
      <div className="flex flex-col justify-start items-center w-[1312px] h-auto space-y-[32px] my-8 pt-[8px] pl-[100px]">
        <div className="flex justify-center items-center w-full h-[603.32px] p-[51.16px] gap-[6.39px] rounded-[16px] bg-white">
          <div className="flex justify-center items-center w-[1131px] h-[501px]">
            {/* <div className="flex flex-col justify-start items-center w-[94px] h-[503px] space-y-[8px]">
              <img
                src="/assets/product6.png"
                alt="product"
                className="w-[94px] h-[95px] rounded-[16px] border-[1px] border-[#0000000D] "
              />
              <img
                src="/assets/product6.png"
                alt="product"
                className="w-[94px] h-[95px] rounded-[16px] border-[1px] border-[#0000000D] "
              />
              <img
                src="/assets/product6.png"
                alt="product"
                className="w-[94px] h-[95px] rounded-[16px] border-[1px] border-[#0000000D] "
              />
              <img
                src="/assets/product6.png"
                alt="product"
                className="w-[94px] h-[95px] rounded-[16px] border-[1px] border-[#0000000D] "
              />
              <img
                src="/assets/product6.png"
                alt="product"
                className="w-[94px] h-[95px] rounded-[16px] border-[1px] border-[#0000000D] "
              />
            </div> */}
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
                className="w-[100%] h-[100%] flex justify-center items-center text-center"
              >
                {product &&
                product.imageUrls &&
                product.imageUrls.length > 0 ? (
                  product.imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="object-cover h-[100%] w-[100%] overflow-hidden rounded-[16px]"
                        src={url}
                        alt={`product-${index}`}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img
                      className="object-cover h-[100%] w-[100%] overflow-hidden rounded-[16px]"
                      src="/assets/product6.png" // fallback
                      alt="default product"
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className="flex flex-col justify-start items-center w-[454.03px] h-[307.4px] space-y-[19.18px]">
              <div className="flex flex-col justify-center items-center w-[454px] h-[129.57px] border-b-[1px] border-[##E6E6E6] space-y-[15.99px]">
                <div className="flex flex-col justify-center items-start w-[440.97px] h-[68.59px] space-y-[9.59px]">
                  <div className="flex justify-start items-center w-[440.97px] h-[35px] gap-[6.39px]">
                    <h1 className="font-poppins font-semibold text-[28.78px] w-[365px] h-[35px] leading-[34.53px] text-[#1A1A1A]">
                      {product && product.name}
                    </h1>
                    <div className="w-[69.58px] h-[33px] rounded-[34.37px] py-[8px] px-[12.79px] gap-[7.99px] bg-[#001D580D]">
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
                      <img src="/assets/star-filled.png" alt="star outlined" />
                      <img src="/assets/star-filled.png" alt="star outlined" />
                    </div>
                    <h1 className="font-poppins font-semibold text-[15.99px] text-black leading-[23.98px]">
                      5.0
                    </h1>
                  </div>
                  <h1 className="font-poppins font-semibold text-[19.18px] leading-[28.78px] text-secondaryBrand">
                    ${product && product.price}
                  </h1>
                </div>

                {/* <div className="w-[454px] h-[1px] border-[1px] border-[##E6E6E6]"></div> */}
              </div>
              <div className="w-[454.03px] h-[51px]">
                <h1 className="font-poppins font-normal text-[11.19px] leading-[16.79px] text-[#808080]">
                  {product && product.description}
                </h1>
              </div>
              <div className="flex justify-center items-center w-[441px] h-[51.28px] gap-[9.59px]">
                <div className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] border-[1px] border-secondaryBrand py-[17px] px-[24px] rounded-[28px]">
                  <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-secondaryBrand">
                    Buy Now
                  </h1>
                </div>
                <div
                  onClick={() => handleAddtoCart()}
                  className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] bg-secondaryBrand py-[17px] px-[24px] rounded-[28px]"
                >
                  <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-white">
                    {loading ? "Adding..." : "Add to Cart"}
                  </h1>
                </div>
                <div
                  onClick={() => handleAddtoWishlist()}
                  className="w-[51.28px] h-[51.28px] bg-[#F8F8F8] p-[12.82px] gap-[12.81px] rounded-[55.1px]"
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                  >
                    <path
                      d="M13.5738 23.2431C-7.78248 11.4391 7.16722 -1.37494 13.5738 6.72787C19.9813 -1.37494 34.931 11.4391 13.5738 23.2431Z"
                      stroke="#001D58"
                      stroke-width="1.92211"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-start items-center w-full h-[18px] gap-[4.8px]">
                <h1 className="font-poppins font-semibold text-[12px] leading-[18px] text-[#1A1A1A]">
                  Category:
                </h1>
                <h1 className="font-poppins font-normal text-[12px] leading-[18px] text-[#808080]">
                  {
                    categoriesList.find(
                      (category) =>
                        category.categoryId === product && product.categoryId
                    )?.name
                  }
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start w-full h-[430.25px] py-[20px] px-[24px] space-y-[25.58px] rounded-[16px] bg-white">
          <h1 className="font-poppins font-semibold text-[18px] leading-[27px] text-[#434343]">
            Customer Feedback
          </h1>
          <div className="w-[1264px] h-[276.71px] space-y-[15.99px]">
            <CustomerFeedback />
            <CustomerFeedback />
            <CustomerFeedback />
            <div className="w-[110.16px] h-[35.38px] py-[11.19px] px-[25.58px] gap-[9.59px] rounded-[34.37px] bg-[#001D580D]">
              <h1 className="font-poppins font-semibold text-[11.19px] leading-[13.43px] text-secondaryBrand">
                Load More
              </h1>
            </div>
          </div>
        </div>
        {relatedProducts?.length > 0 ? (
          <RelatedProducts relatedProducts={relatedProducts} />
        ) : (
          <p>No Related Products Found.</p>
        )}
      </div>
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={closeToast}
        type={toastType}
      />
    </div>
  );
};

export default SingleProduct;
