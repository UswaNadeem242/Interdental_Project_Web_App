import React, { useEffect, useState, useMemo, memo, useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
import Header from "./landing-page/header";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthContext";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toast-slice"; // adjust path if needed
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { calculateRating } from "../services/utils/calculateRating";

// Memoized ProductCard component to prevent unnecessary re-renders
const ProductCard = memo(
  ({ product, wishlistSet, onProductClick, onAddToCart, onToggleWishlist }) => {
    const isInWishlist = wishlistSet.has(product?.productId);

    return (
      <div
        key={product.productId}
        className="flex flex-col justify-between items-center bg-white rounded-lg shadow-sm p-4 cursor-pointer h-[430px]"
      >
        {/* Upper Section */}
        <div
          onClick={() => onProductClick(product)}
          className="flex flex-col items-center flex-grow"
        >
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-[263px] h-[260px] object-cover"
            loading="lazy"
            decoding="async"
          />

          <div className="text-center mt-3 flex flex-col flex-grow justify-between">
            <h1 className="font-poppins font-semibold text-base text-black leading-snug line-clamp-2">
              {product.name}
            </h1>

            <div className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD] flex gap-2 justify-center items-center">
              ${product.price}
              <span className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-poppins font-normal text-[#585858]">
                  {calculateRating(product)}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="flex items-center gap-3 mt-1">
          <div
            onClick={() => onAddToCart(product?.productId)}
            className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] text-secondaryBrand hover:text-white bg-background hover:bg-secondaryBrand py-[17px] px-[24px] rounded-[28px]"
          >
            <h1 className="font-poppins font-normal text-xs leading-[21px]">
              Add to Cart
            </h1>
          </div>

          {/* ❤️ Wishlist Button */}
          <div
            onClick={(e) => onToggleWishlist(product?.productId, e)}
            className={`flex justify-center items-center cursor-pointer w-[51.28px] h-[51.28px] p-[12.82px] gap-[12.81px] rounded-[55.1px] transition-all duration-300 hover:scale-110 ${
              isInWishlist
                ? "bg-red-50 shadow-md"
                : "bg-[#F8F8F8] hover:bg-red-50"
            }`}
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M13.5738 23.2431C-7.78248 11.4391 7.16722 -1.37494 13.5738 6.72787C19.9813 -1.37494 34.931 11.4391 13.5738 23.2431Z"
                stroke={isInWishlist ? "#FF0000" : "#001D58"}
                strokeWidth="1.92211"
                fill={isInWishlist ? "#FF0000" : "none"}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [priceValue, setPriceValue] = useState(500);
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedbrand, setSelectedbrand] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [checked, setChecked] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { fetchWishlistCount, fetchCartCount } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceValue(value);
  };

  const handleResetAll = () => {
    setPriceValue(500);
    setSelectedCategory(null);
    setCategoryName("");
    setSelectedbrand(null);
    setBrandName("");
    setSearchTerm("");
    setChecked(null);
  };

  const handleProduct = useCallback(
    (product) => {
      navigate(`/shop/${product.productId}`);
    },
    [navigate],
  );

  // const getAllProducts = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/api/product/getAll`, {
  //       headers: {
  //         Accept: "*/*",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     setProducts(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllProducts = async () => {
    try {
      setLoading(true); // start loading
      const response = await axios.get(`${BASE_URL}/api/product/getAll`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading regardless of success or error
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

  const getAllBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/brands/getAll`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBrandsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (id, name) => {
    if (selectedCategory === id) {
      // If same category is clicked, reset the filter
      setSelectedCategory(null);
      setCategoryName("");
    } else {
      // If different category is clicked, set it
      setSelectedCategory(id);
      setCategoryName(name);
    }
  };

  const handleBrandChange = (id, name) => {
    if (selectedbrand === id) {
      // If same brand is clicked, reset the filter
      setSelectedbrand(null);
      setBrandName("");
    } else {
      // If different brand is clicked, set it
      setSelectedbrand(id);
      setBrandName(name);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Price filter - ensure product has valid price
      const productPrice = parseFloat(product.price) || 0;
      const isInPriceRange = productPrice <= priceValue;

      // Category filter
      const isInCategory = selectedCategory
        ? product.categoryId === selectedCategory
        : true;

      // Brand filter
      const isInBrand = selectedbrand
        ? product.brandId === selectedbrand
        : true;

      // Search filter
      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Availability filter
      let matchesAvailability = true;
      if (checked === "inStock") {
        matchesAvailability = product.stockQuantity > 0;
      } else if (checked === "outOfStock") {
        matchesAvailability = product.stockQuantity === 0;
      }

      return (
        isInPriceRange &&
        isInCategory &&
        isInBrand &&
        matchesSearch &&
        matchesAvailability
      );
    });
  }, [
    products,
    priceValue,
    selectedCategory,
    selectedbrand,
    searchTerm,
    checked,
  ]);

  // Memoized wishlist set for faster lookups
  const wishlistSet = useMemo(
    () => new Set(wishlist.map((item) => item.productId)),
    [wishlist],
  );

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setChecked(id);
    } else {
      setChecked(null);
    }
  };

  // const handleCheckboxChange = (e) => {
  //   const { id } = e.target;
  //   setChecked((prev) => (prev === id ? null : id));
  //   // if same clicked again → uncheck
  // };
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get wishlist items on component mount
  const getWishlist = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      const wishlistItems = response.data.items || [];

      setWishlist(wishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, []);

  const handleToggleWishlist = useCallback(
    async (id, e) => {
      e.stopPropagation();

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

      const productItem = filteredProducts?.find(
        (item) => item?.productId === id,
      );

      if (!productItem) {
        console.error("❌ No product matched this ID:", id);
        dispatch(showToast({ message: "Product not found", type: "error" }));
        return;
      }

      const isInWishlist = wishlist.some((item) => item.productId === id);
      console.log(wishlist, "wishlst");
      try {
        if (isInWishlist) {
          // Find the wishlist item to get its ID
          const wishlistItem = wishlist.find((item) => item.productId === id);

          if (!wishlistItem || !wishlistItem.id) {
            console.error(
              "❌ Wishlist item not found or missing ID:",
              wishlistItem,
            );
            dispatch(
              showToast({
                message: "Error removing from wishlist",
                type: "error",
              }),
            );
            return;
          }

          // Remove from wishlist using the wishlist item ID
          const response = await axios.delete(
            `${BASE_URL}/api/wishlist/${wishlistItem.id}/remove`,
            {
              headers: {
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (response.data.responseCode === "1500") {
            dispatch(
              showToast({
                message: "Please try again later.",
                type: "error",
              }),
            );
            return;
          }

          fetchWishlistCount();
          getWishlist(); // Refetch to get accurate data
          dispatch(
            showToast({ message: "Removed from Wishlist!", type: "success" }),
          );
        } else {
          // Add to wishlist
          const payload = {
            id: productItem?.productId,
            productId: productItem?.productId,
            productName: productItem?.name,
            price: productItem?.price,
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
          dispatch(
            showToast({ message: "Added to Wishlist!", type: "success" }),
          );
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
    },
    [dispatch, filteredProducts, wishlist, fetchWishlistCount, getWishlist],
  );

  const handleAddtoCart = useCallback(
    async (id) => {
      console.log("map id", id);
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
      const filterMethode = filteredProducts?.filter(
        (item) => item?.productId === id,
      );

      if (!filterMethode || filterMethode.length === 0) {
        dispatch(
          showToast({
            message: "Product not found.",
            type: "error",
          }),
        );
        return;
      }

      const selectedProduct = filterMethode[0];

      // Check if stock quantity exists and is valid
      if (
        !selectedProduct ||
        selectedProduct.stockQuantity === undefined ||
        selectedProduct.stockQuantity === null
      ) {
        dispatch(
          showToast({
            message: "Unable to check stock availability.",
            type: "error",
          }),
        );
        return;
      }

      if (selectedProduct.stockQuantity <= 0) {
        dispatch(
          showToast({
            message: "Stock is less than the desired quantity",
            type: "error",
          }),
        );
        return;
      }
      try {
        // setLoading(true);

        const payload = {
          id: selectedProduct?.productId,
          productId: selectedProduct?.productId,
          productName: selectedProduct?.name,
          quantity: 1,
          price: selectedProduct?.price,
          totalPrice: selectedProduct?.price,
        };
        const response = await axios.post(`${BASE_URL}/api/cart/add`, payload, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.responseCode === "1500") {
          dispatch(
            showToast({
              message: "Please try again later.",
              type: "error",
            }),
          );
          return;
        }

        fetchCartCount();
        dispatch(showToast({ message: "Added to Cart!", type: "success" }));
        // setLoading(false);
      } catch (error) {
        console.log(error);
        dispatch(
          showToast({
            message: "Failed to add item to cart.",
            type: "error",
          }),
        );
        // setLoading(false);
      }
    },
    [dispatch, filteredProducts, fetchCartCount],
  );

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllBrands();
    fetchCartCount();
    getWishlist();
  }, [getWishlist]);

  return (
    <div className="bg-background">
      {/* bg-gradient-to-b from-cyan-50 to-emerald-50/0 */}
      <Header />
      <div className="px-4 md:px-10 py-6 ">
        {/* Header */}
        <div className="flex justify-between items-center  mt-20">
          <button
            className="md:hidden flex items-center gap-2 border mb-4 px-3 py-2 rounded-lg text-sm"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar (desktop static, mobile drawer) */}
          <div
            className={`fixed top-0 left-0 h-full w-72 rounded-r-2xl bg-white shadow-2xl transform transition-transform duration-300 z-50 md:static md:translate-x-0 md:shadow-none md:rounded-2xl md:z-auto overflow-y-auto
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Mobile header */}
            <div className="flex justify-between items-center p-4 border-b md:hidden sticky top-0 bg-white z-10">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filters content */}
            <div className="p-4 space-y-3 overflow-y-auto h-full">
              {/* Filter Header with Reset All Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h2 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
                  Filter
                </h2>
                <button
                  onClick={handleResetAll}
                  className="px-4 sm:px-6 py-2 border-2 text-[12px] sm:text-[14px] border-[#001D58] text-[#001D58] rounded-full font-medium hover:bg-[#001D58] hover:text-white transition-colors whitespace-nowrap"
                >
                  Reset All
                </button>
              </div>
              {/* 🔍 Search */}
              <div className="relative flex items-center bg-white border-gray-200 border rounded-full px-4 py-3 mb-6">
                <input
                  type="text"
                  placeholder="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  className="w-full bg-transparent bg-white text-gray-500 text-lg outline-none border-none focus:ring-0 pr-12"
                />
                <div className="absolute right-2 bg-[#001D58] w-10 h-10 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </div>
              </div>
              {/* Price Range */}
              <div className="mb-8 mt-3">
                <h3 className="font-poppins font-semibold mb-2 text-[14px] leading-[21px] text-[#404145] h-[21px]">
                  Price Range
                </h3>
                <div className="">
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>$0</span>
                    <span>${priceValue}</span>
                  </div>

                  <div className="relative h-2 bg-gray-300 rounded-full">
                    {/* Active Range Bar */}
                    <div
                      className="absolute h-2 bg-[#001D58] rounded-full"
                      style={{
                        width: `${(priceValue / 1000) * 100}%`,
                      }}
                    ></div>

                    {/* Slider Thumb */}
                    <div
                      className="absolute w-6 h-6 bg-[#001D58] rounded-full transform -translate-y-2 -translate-x-3 cursor-pointer shadow-lg"
                      style={{
                        left: `${(priceValue / 1000) * 100}%`,
                      }}
                    ></div>

                    {/* Range Input */}
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceValue}
                      onChange={handlePriceChange}
                      className="absolute top-0 w-full h-2 cursor-pointer appearance-none bg-transparent pointer-events-auto z-10 opacity-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start w-[258px] h-[97px] py-4 space-y-[16px]  border-t-[2px] border-background my-4">
                  <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145] h-[21px]">
                    Availability
                  </h1>
                  <div className="flex flex-col justify-start items-start space-y-3 h-[44px] w-[142px] ">
                    <div className="flex items-center gap-[5px] h-[18px]">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={checked === "inStock"}
                        onChange={handleCheckboxChange}
                        className="mr-2 cursor-pointer rounded-[4.43px] border-[0.74px] border-[#949494] w-[14.77px] h-[14.77px]"
                      />
                      <label
                        htmlFor="inStock"
                        className={`cursor-pointer font-poppins font-normal text-[12px] leading-[18px] ${
                          checked === "inStock"
                            ? "text-secondaryBrand"
                            : "text-[#949494]"
                        }`}
                      >
                        In Stock
                      </label>
                    </div>

                    <div className="flex items-center gap-[5px]">
                      <input
                        type="checkbox"
                        id="outOfStock"
                        checked={checked === "outOfStock"}
                        onChange={handleCheckboxChange}
                        className="mr-2 cursor-pointer rounded-[4.43px] border-[0.74px] border-[#949494] w-[14.77px] h-[14.77px]"
                      />
                      <label
                        htmlFor="outOfStock"
                        className={`cursor-pointer font-poppins font-normal text-[12px] leading-[18px] ${
                          checked === "outOfStock"
                            ? "text-secondaryBrand"
                            : "text-[#949494]"
                        }`}
                      >
                        Out of Stock
                      </label>
                    </div>
                  </div>
                </div>

                <div className="w-[258px] h-[1px] border-t-[2px] border-background"></div>
                <div className="w-[258px] h-auto space-y-4 pt-3">
                  <h1 className="w-[150px] h-[21px] font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
                    Categories
                  </h1>
                  <div className=" max-h-[200px] overflow-y-auto pr-2 space-y-[8px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {categoriesList.map((c) => (
                      <h1
                        key={c.categoryId}
                        onClick={() =>
                          handleCategoryChange(c.categoryId, c.name)
                        }
                        className={`font-poppins text-[12px] cursor-pointer leading-[18px] ${
                          selectedCategory === c.categoryId
                            ? "text-secondaryBrand  font-medium"
                            : "text-secondaryText cursor-pointer font-normal"
                        }`}
                      >
                        {c.name}
                      </h1>
                    ))}
                  </div>
                </div>
                <div className="w-[258px] h-[201px] space-y-[16px] border-t-[2px] border-background my-4">
                  <h1 className="w-[150px] h-[21px] font-poppins font-semibold text-[14px] leading-[21px] text-[#404145] py-4">
                    Brands
                  </h1>
                  <div className=" max-h-[150px] overflow-y-auto pr-2 space-y-[8px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {brandsList.map((b) => (
                      <h1
                        key={b.id}
                        onClick={() => handleBrandChange(b.id, b.name)}
                        // className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText"
                        className={`font-poppins text-[12px] cursor-pointer leading-[18px] ${
                          selectedbrand === b.id
                            ? "text-secondaryBrand  font-medium"
                            : "text-secondaryText cursor-pointer font-normal"
                        }`}
                      >
                        {b.name}
                      </h1>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay for mobile */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 md:hidden z-40"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Products Grid */}
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {loading ? (
                <>
                  {[...Array(6)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    wishlistSet={wishlistSet}
                    onProductClick={handleProduct}
                    onAddToCart={handleAddtoCart}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))
              ) : (
                <div className="col-span-2 sm:col-span-2 lg:col-span-3 flex justify-center items-center bg-white p-8 rounded-md min-h-[300px]">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-poppins text-gray-600">Sorry! No Products Found</p>
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your filters</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
