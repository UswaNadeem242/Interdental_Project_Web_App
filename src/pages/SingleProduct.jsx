import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CustomerFeedback from "../components/CustomerFeedback";
import RelatedProducts from "../components/RelatedProducts";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import axios from "axios";
import { BASE_URL } from "../config";

import { useAuth } from "../auth/AuthContext";
import ShoppingCart from "../modals/ShoppingCartModal";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toast-slice";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import StarRating from "../components/StarRating";
import Icons from "../components/Icons";

const SingleProduct = () => {
  const { productId } = useParams();
  const { fetchWishlistCount, wishlistCount, fetchCartCount, cartCount } =
    useAuth();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/product/get/${productId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
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
        },
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
        },
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
    getWishlist();
  }, [productId]);

  // Extract user rating when product data is loaded
  useEffect(() => {
    if (product && product.ratings && product.ratings.length > 0) {
      const userData = localStorage.getItem("users");
      const user = userData ? JSON.parse(userData) : null;

      if (user) {
        setUserRating(product?.ratings[0]?.rating);
      }
    }
  }, [product]);

  const [isOpenCart, setIsOpenCart] = useState(false);

  const handleAddtoCart = async (shouldOpenModal = false) => {
    if (product.stockQuantity <= 0) {
      dispatch(
        showToast({
          message: "Stock is less than the desired quantity.",
          type: "error",
        }),
      );
      return false;
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

      fetchCartCount();
      dispatch(showToast({ message: "Added to Cart!", type: "success" }));
      setLoading(false);

      // Open modal after successful cart operation
      if (shouldOpenModal) {
        setIsModalOpen(true);
      }

      return true;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return false;
    }
  };

  console.log();
  // Get wishlist items on component mount
  const getWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🔍 Wishlist API response:", response.data.items);
      console.log(
        "🔍 Extracted wishlist IDs:",
        response.data.items?.map((item) => item.productId),
      );

      setWishlist(response.data.items);
      const productIds = response.data.items.map((item) => item.productId);
      // Convert productId to number for comparison since API returns numbers
      const currentProductId = parseInt(productId);
      setIsInWishlist(productIds.includes(currentProductId));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleToggleWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(
          showToast({
            message: "Access Denied. Please login first.",
            type: "error",
          }),
        );
        return;
      }

      if (isInWishlist) {
        console.log(wishlist, "ids");
        const getWishlistId = wishlist.find(
          (item) => item.productId === parseInt(productId),
        );

        if (!getWishlistId || !getWishlistId.id) {
          console.error(
            "❌ Wishlist item not found or missing ID:",
            getWishlistId,
          );
          dispatch(
            showToast({
              message: "Error removing from wishlist",
              type: "error",
            }),
          );
          return;
        }

        console.log("🔍 Wishlist ID:", getWishlistId.id);
        // Remove from wishlist
        await axios.delete(
          `${BASE_URL}/api/wishlist/${getWishlistId.id}/remove`,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        fetchWishlistCount();
        getWishlist(); // Refetch to get accurate data
        dispatch(
          showToast({ message: "Removed from Wishlist!", type: "success" }),
        );
      } else {
        // Add to wishlist
        const payload = {
          id: parseInt(productId),
          productId: parseInt(productId),
          productName: product.name,
          price: product.price,
        };

        await axios.post(`${BASE_URL}/api/wishlist/add`, payload, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        fetchWishlistCount();
        getWishlist(); // Refetch to get accurate data with correct IDs
        dispatch(showToast({ message: "Added to Wishlist!", type: "success" }));
      }
    } catch (error) {
      console.error("❌ Wishlist API error:", error);
      dispatch(
        showToast({
          message: `Error: ${error.response?.data?.message || error.message}`,
          type: "error",
        }),
      );
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
    <div className="flex justify-center items-center bg-gradient-to-b from-cyan-50 to-emerald-50/0">
      <div className="flex flex-col justify-start items-center h-auto space-y-[16px] my-8 pt-[8px] mt-20 w-full max-w-[1312px] px-4">
        {/* Back Button */}
        <div className="w-full">
          <BackButton variant="rounded" className="mb-4 mt-4" text="Back" />
        </div>
        {/* Product Details */}
        <div className="flex flex-col lg:flex-row justify-center items-center w-full min-h-[500px] gap-6 lg:gap-8 rounded-2xl bg-white p-4 md:p-6 lg:p-8">
          {product && product.imageUrls && product.imageUrls.length > 0 && (
            <div className="w-full lg:w-[437px] h-[300px] sm:h-[400px] lg:h-[501px] flex-shrink-0">
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
                {product.imageUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="object-cover h-[100%] w-[100%] overflow-hidden rounded-2xl"
                      src={url}
                      alt={`product-${index}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <div className="flex flex-col justify-start items-start flex-1 w-full space-y-4 md:space-y-6">
            <div className="flex flex-col justify-start items-start w-full border-b border-gray-200 pb-4 md:pb-6 space-y-3 md:space-y-4">
              {/* Product Name + Stock */}
              <div className="flex items-center gap-2 md:gap-4 w-full">
                <h1 className="font-poppins font-semibold text-xl sm:text-2xl lg:text-3xl text-[#1A1A1A]">
                  {product?.name}
                </h1>
                {product?.stockQuantity > 0 ? (
                  <div className="bg-[#001D580D] rounded-full py-2 px-3 whitespace-nowrap">
                    <h1 className="font-poppins text-secondaryBrand text-xs">
                      In Stock
                    </h1>
                  </div>
                ) : (
                  <div className="bg-[#FF00000D] rounded-full py-1 px-3 whitespace-nowrap">
                    <h1 className="font-poppins text-red-600 text-xs">
                      Out of Stock
                    </h1>
                  </div>
                )}
              </div>

              {/* Rating - Display Only */}
              {userRating > 0 && (
                <div className="flex items-center gap-2 md:gap-3">
                  <StarRating
                    rating={userRating}
                    readOnly={true}
                    size="w-5 h-5 md:w-6 md:h-6"
                  />
                  <p className="font-poppins font-semibold text-sm md:text-base text-black">
                    {userRating}.0
                  </p>
                </div>
              )}

              {/* Price */}
              <h1 className="font-poppins font-semibold text-xl md:text-2xl text-secondaryBrand">
                ${product?.price}
              </h1>
            </div>

            {/* Description */}
            <div className="w-full">
              <p className="font-poppins text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product && product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full">
              <div
                onClick={async () => {
                  if (user && user?.email) {
                    if (product.stockQuantity <= 0) {
                      dispatch(
                        showToast({
                          message: "Stock is less than the desired quantity",
                          type: "error",
                        }),
                      );
                      return;
                    } else {
                      setIsOpenCart(true);
                      const success = await handleAddtoCart(true);
                      if (!success) {
                        setIsOpenCart(false);
                      }
                    }
                  } else {
                    dispatch(
                      showToast({
                        message: "Access denied! Please log in first",
                        type: "error",
                      }),
                    );
                  }
                }}
                className="flex justify-center items-center cursor-pointer w-full sm:w-auto sm:flex-1 max-w-[200px] h-[48px] border-[1px] border-secondaryBrand py-[17px] px-[24px] rounded-[28px] whitespace-nowrap"
              >
                <h1 className="font-poppins font-semibold text-xs sm:text-[14px] leading-[21px] text-secondaryBrand">
                  {loading ? "Loading..." : "  Buy Now"}
                </h1>
              </div>
              <div
                onClick={() => {
                  if (user && user?.email) {
                    handleAddtoCart(false);
                  } else {
                    dispatch(
                      showToast({
                        message: "Access denied! Please log in first",
                        type: "error",
                      }),
                    );
                  }
                }}
                className="flex justify-center items-center cursor-pointer w-full sm:w-auto sm:flex-1 max-w-[200px] h-[48px] bg-secondaryBrand py-[17px] px-[24px] rounded-[28px] whitespace-nowrap"
              >
                <h1 className="font-poppins font-semibold text-xs sm:text-[14px] leading-[21px] text-white">
                  {loading ? "Adding..." : "Add to Cart"}
                </h1>
              </div>
              <div
                onClick={() => {
                  if (user && user?.email) {
                    handleToggleWishlist();
                  } else {
                    dispatch(
                      showToast({
                        message: "Access denied! Please log in first",
                        type: "error",
                      }),
                    );
                  }
                }}
                className={`flex justify-center items-center cursor-pointer w-[51.28px] h-[51.28px] p-[12.82px] gap-[12.81px] rounded-[55.1px] transition-all duration-300 hover:scale-110 ${
                  isInWishlist
                    ? "bg-red-50 shadow-md"
                    : "bg-[#F8F8F8] hover:bg-red-50"
                }`}
                aria-label="Add to wishlist"
              >
                <Icons.WishlistHeart
                  stroke={isInWishlist ? "#FF0000" : "#001D58"}
                  fill={isInWishlist ? "#FF0000" : "none"}
                  className="cursor-pointer transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 w-full pt-2 md:pt-4">
              <h1 className="font-poppins font-semibold text-xs sm:text-sm text-[#1A1A1A]">
                Category:
              </h1>
              <h1 className="font-poppins text-xs sm:text-sm text-gray-600">
                {product?.categoryId &&
                  categoriesList.find(
                    (category) => category.categoryId === product.categoryId,
                  )?.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Customer Feedback Section */}
        <div
          className={`flex flex-col justify-start items-start w-full py-[20px] px-[24px] space-y-[25.58px] rounded-[16px] bg-white ${product?.ratings && product.ratings.length > 0 ? "h-auto" : "h-auto"}`}
        >
          <h1 className="font-poppins font-semibold text-xl leading-[27px] text-primaryText">
            Customer Feedback
          </h1>
          <div
            className={`w-full space-y-[15.99px] ${product?.ratings && product.ratings.length > 0 ? "h-auto overflow-y-scroll pr-2" : "h-auto"}`}
          >
            {product?.ratings && product.ratings.length > 0 ? (
              product.ratings.map((item, index) => (
                <CustomerFeedback
                  key={item.id}
                  item={item}
                  isLast={index === product.ratings.length - 1}
                  isOnlyItem={product.ratings.length === 1}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="text-center space-y-4 max-w-md">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Icons.NoReviewsIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">
                      No Reviews Yet
                    </h3>
                    <p className="text-gray-600 text-sm font-poppins leading-relaxed">
                      Be the first to share your experience with this product.
                      Your feedback helps other customers make informed
                      decisions.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <RelatedProducts relatedProducts={relatedProducts || []} />
      </div>

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
