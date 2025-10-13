import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CustomerFeedback from "../components/CustomerFeedback";
import RelatedProducts from "../components/RelatedProducts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import Toast from "../components/Toast";
import { useAuth } from "../auth/AuthContext";
import ShoppingCart from "../modals/ShoppingCartModal";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon, StarIcon

} from "@heroicons/react/24/solid";

const SingleProduct = () => {
  const { productId } = useParams();
  const { fetchWishlistCount, wishlistCount, fetchCartCount, cartCount } =
    useAuth();

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

  const [isOpenCart, setIsOpenCart] = useState(false);

  const handleAddtoCart = async () => {
    if (product.stockQuantity <= 0) {
      setToastMessage("This item is currently out of stock.");
      setToastType("error");
      setToastVisible(true);
      return;
    }
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
      const response = await axios.post(`${BASE_URL}/api/cart/add`, payload, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (isOpenCart === true) {
        setIsModalOpen(true);
      }
      setToastMessage("Added to Cart !");
      setToastType("success");
      setToastVisible(true);
      fetchCartCount();
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
      fetchWishlistCount();
      setToastMessage("Added to Wishlist !");
      setToastType("success");
      setToastVisible(true);
    } catch (error) {
      setToastMessage(`Error: ${error}`);
      setToastType("success");
      setToastVisible(true);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Retrieve user data from localStorage
  const userData = localStorage.getItem("users");
  const user = userData ? JSON.parse(userData) : null;

  // Debugging logs

  // Safely log firstName only if user exists
  if (user && user.firstName) {
  }


  return (
    <div className="flex justify-center  items-center bg-gradient-to-b from-cyan-50 to-emerald-50/0 ">
      {/* justify-center  */}
      <div className="flex flex-col justify-start items-center h-auto space-y-[32px] my-8 pt-[8px] mt-20">
        {/*  w-[1312px]  pl-[100px]*/}
        <div className="flex justify-center items-center w-full h-[603.32px]  gap-[6.39px] rounded-2xl bg-white ">
          {/* p-[51.16px] */}
          <div className="flex justify-center items-center w-[1131px] h-[501px] gap-5">
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
                        className="object-cover h-[100%] w-[100%] overflow-hidden rounded-2xl"
                        src={url}
                        alt={`product-${index}`}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img
                      className="object-cover h-[100%] w-[100%] overflow-hidden rounded-2xl"
                      src="/assets/product6.png" // fallback
                      alt="default product"
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className="flex flex-col justify-start items-center w-[454.03px] h-[307.4px] space-y-[19.18px]">
              <div className="flex flex-col justify-center items-center w-[454px] h-[129.57px] border-b-[1px] border-[##E6E6E6] space-y-[15.99px]">
               

                <div className="flex flex-col justify-between w-[440.97px]  space-y-2">
                  {/* Product Name + Stock */}
                  <div className="flex justify-between items-center">
                    <h1 className="font-poppins font-semibold text-[28.78px] leading-[34.53px] text-[#1A1A1A] w-[70%] ">
                      {product?.name}
                    </h1>

                    {product?.stockQuantity > 0 && (
                      <div className="bg-[#001D580D] rounded-full py-1 px-3">
                        <h1 className="font-poppins text-secondaryBrand text-[11.19px] leading-[16.79px]">
                          In Stock
                        </h1>
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((_, id) => (
                        <StarIcon key={id} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                    <p className="font-poppins font-semibold text-[15.99px] text-black leading-[23.98px]">
                      5.0
                    </p>
                  </div>

                  {/* Price */}
                  <h1 className="font-poppins font-semibold text-[19.18px] leading-[28.78px] text-secondaryBrand pb-10">
                    ${product?.price}
                  </h1>
                </div>
 
                {/* <div className="w-[454px] h-[1px] border-[1px] border-[##E6E6E6]"></div> */}
              </div>
              <div className="w-[454.03px] h-[51px]">
                <h1 className="font-poppins font-normal text-[11.19px] leading-[16.79px] text-[#808080]">
                  {product && product.description}
                </h1>
              </div>
              <div className="flex justify-center items-center w-[441px] h-[51.28px] gap-5 pt-10">
                <div
                  onClick={() => {
                    if (user && user?.email) {
                      if (product.stockQuantity <= 0) {
                        setToastMessage("This item is currently out of stock.");
                        setToastType("error");
                        setToastVisible(true);
                        return;
                      } else {
                        setIsOpenCart(true);
                        setLoading(true);
                        setTimeout(() => {
                          handleAddtoCart();
                        }, [3000]);
                      }
                    } else {
                      setToastMessage("Access denied! Please log in first");

                      setToastType("error");
                      setToastVisible(true);

                    }
                  }}
                  className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] border-[1px] border-secondaryBrand py-[17px] px-[24px] rounded-[28px]"
                >
                  <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-secondaryBrand">
                    {loading ? "Loading..." : "  Buy Now"}
                  </h1>
                </div>
                <div
                  onClick={() => {
                    if (user && user?.email) {
                      handleAddtoCart();
                    } else {
                      setToastMessage("Access denied! Please log in first");

                      setToastType("error");
                      setToastVisible(true);

                    }
                  }}
                  className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] bg-secondaryBrand py-[17px] px-[24px] rounded-[28px]"
                >
                  <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-white">
                    {loading ? "Adding..." : "Add to Cart"}
                  </h1>
                </div>
                <div
                  onClick={() => {
                    if (user && user?.email) {
                      handleAddtoWishlist();
                    } else {
                      setToastMessage("Access denied! Please log in first");

                      setToastType("error");
                      setToastVisible(true);

                    }
                  }}
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
              <div className="flex justify-start items-center w-full h-[18px] gap-[4.8px] pt-8">
                <h1 className="font-poppins font-semibold text-[12px] leading-[18px] text-[#1A1A1A]">
                  Category:
                </h1>
                <h1 className="font-poppins font-normal text-[12px] leading-[18px] text-[#808080]">
                  {product?.categoryId &&
                    categoriesList.find(
                      (category) => category.categoryId === product.categoryId
                    )?.name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start w-full h-[430.25px] py-[20px]  space-y-[25.58px] rounded-[16px] bg-white">
          <h1 className="font-poppins font-semibold text-[18px] leading-[27px] text-primaryText p-4">
            Customer Feedback
          </h1>
          <div className="w-[1264px] h-[276.71px] space-y-[15.99px] overflow-y-scroll hidden ">
            {product &&
              product?.ratings &&
              product?.ratings.length > 0 &&
              product?.ratings.map((item) => <CustomerFeedback item={item} />)}


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
      {isModalOpen && (
        <ShoppingCart
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default SingleProduct;
