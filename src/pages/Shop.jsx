import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
import Header from "./landing-page/header";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthContext";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toast-slice"; // adjust path if needed
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductCard from "../components/ProductCard";
import useOutsideClick from "../Hooks/useOutsideClick";

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
    [navigate]
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
        }
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
    [wishlist]
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

  // Use the updated useOutsideClick hook with data attribute support
  const outsideClickRef = useOutsideClick(
    () => {
      // Only close on mobile/tablet (when sidebar is fixed positioned)
      if (window.innerWidth < 1024) {
        setIsFilterOpen(false);
      }
    },
    isFilterOpen, // Only active when filter is open
    "data-filter-sidebar" // Data attribute selector
  );

  // Prevent body scroll when filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

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
          })
        );
        return;
      }

      const productItem = filteredProducts?.find(
        (item) => item?.productId === id
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
              wishlistItem
            );
            dispatch(
              showToast({
                message: "Error removing from wishlist",
                type: "error",
              })
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
            }
          );

          if (response.data.responseCode === "1500") {
            dispatch(
              showToast({
                message: "Please try again later.",
                type: "error",
              })
            );
            return;
          }

          fetchWishlistCount();
          getWishlist(); // Refetch to get accurate data
          dispatch(
            showToast({ message: "Removed from Wishlist!", type: "success" })
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
            showToast({ message: "Added to Wishlist!", type: "success" })
          );
        }
      } catch (error) {
        console.error("❌ Wishlist API error:", error);
        dispatch(
          showToast({
            message: `Error: ${error.response?.data?.message || error.message}`,
            type: "error",
          })
        );
      }
    },
    [dispatch, filteredProducts, wishlist, fetchWishlistCount, getWishlist]
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
          })
        );
        return;
      }
      const filterMethode = filteredProducts?.filter(
        (item) => item?.productId === id
      );

      if (!filterMethode || filterMethode.length === 0) {
        dispatch(
          showToast({
            message: "Product not found.",
            type: "error",
          })
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
          })
        );
        return;
      }

      if (selectedProduct.stockQuantity <= 0) {
        dispatch(
          showToast({
            message: "Stock is less than the desired quantity",
            type: "error",
          })
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
            })
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
          })
        );
        // setLoading(false);
      }
    },
    [dispatch, filteredProducts, fetchCartCount]
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
      <div className="px-4 md:px-10 py-6">
        {/* Header */}
        <div className="mt-20 mb-6">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Mobile Search Bar */}
            <div className="relative mb-4 md:hidden px-4">
              <input
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                className="w-full px-4 py-4 pr-12 border border-gray-200 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#001D58] w-8 h-8 rounded-full flex items-center justify-center mr-4">
                <MagnifyingGlassIcon className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Mobile Shop Title and Filter Button */}
            <div className="flex justify-between items-center mb-4 px-4">
              <h1 className="text-2xl font-bold text-gray-800 font-poppins">
                Shop
              </h1>
              <button
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                onClick={() => setIsFilterOpen(true)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:flex lg:hidden justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 font-poppins">
              Shop
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  className="w-80 px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsFilterOpen(true)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar (desktop/tablet static, mobile drawer) */}
          <div
            data-filter-sidebar
            className={`fixed top-0 left-0 h-full w-80 sm:w-72 rounded-r-2xl bg-white shadow-2xl transform transition-transform duration-300 z-[999999] lg:static lg:translate-x-0 lg:shadow-none lg:rounded-2xl lg:z-auto overflow-y-auto
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Filters content */}
            <div className="md:pt-0 px-4 space-y-6 overflow-y-auto h-full">
              {/* Mobile Filter Header */}
              <div className="flex items-center gap-3 py-4 sticky top-0 bg-white z-10 shadow-sm md:hidden">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="font-semibold text-lg text-gray-800">Filter</h2>
              </div>

              {/* Desktop Filter Header */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg text-gray-800">Filter</h2>
                <button
                  onClick={handleResetAll}
                  className="px-4 py-2 border-2 border-[#001D58] text-[#001D58] rounded-full font-medium hover:bg-[#001D58] hover:text-white transition-colors text-sm"
                >
                  Reset All
                </button>
              </div>

              {/* 🔍 Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#001D58] w-8 h-8 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                </div>
              </div>
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                  Price Range
                </h3>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  {/* Active Range Bar */}
                  <div
                    className="absolute h-2 bg-[#001D58] rounded-full"
                    style={{
                      width: `${(priceValue / 1000) * 100}%`,
                    }}
                  ></div>

                  {/* Slider Thumb */}
                  <div
                    className="absolute w-5 h-5 bg-[#001D58] rounded-full transform -translate-y-1.5 -translate-x-2.5 cursor-pointer shadow-lg"
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

              {/* Availability */}
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Availability
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={checked === "inStock"}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded border-gray-300 text-[#001D58] focus:ring-[#001D58]"
                    />
                    <label
                      htmlFor="inStock"
                      className={`text-sm cursor-pointer ${
                        checked === "inStock"
                          ? "text-[#001D58] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      in stock
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="outOfStock"
                      checked={checked === "outOfStock"}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded border-gray-300 text-[#001D58] focus:ring-[#001D58]"
                    />
                    <label
                      htmlFor="outOfStock"
                      className={`text-sm cursor-pointer ${
                        checked === "outOfStock"
                          ? "text-[#001D58] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      out of stock
                    </label>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-semibold text-gray-800 mb-2">Categories</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {categoriesList.map((c) => (
                    <div
                      key={c.categoryId}
                      onClick={() => handleCategoryChange(c.categoryId, c.name)}
                      className={`text-sm cursor-pointer py-1 ${
                        selectedCategory === c.categoryId
                          ? "text-[#001D58] font-medium"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              </div>
              {/* Brands */}
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-semibold text-gray-800 mb-2">Brand</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {brandsList.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handleBrandChange(b.id, b.name)}
                      className={`text-sm cursor-pointer py-1 ${
                        selectedbrand === b.id
                          ? "text-[#001D58] font-medium"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {b.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset All Button - Mobile Only */}
              <div className="border-t border-gray-200 py-3 md:hidden sticky bottom-0 bg-white">
                <button
                  onClick={handleResetAll}
                  className="w-full px-4 py-3 border-2 border-[#001D58] text-[#001D58] rounded-lg font-medium hover:bg-[#001D58] hover:text-white transition-colors"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>

          {/* Overlay for mobile */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 md:hidden z-[9999]"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Products Grid */}
          <div className="md:ml-0 lg:ml-0 py-6 px-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 flex justify-center items-center bg-white p-6 sm:p-8 rounded-md min-h-[250px] sm:min-h-[300px]">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl font-poppins text-gray-600 mb-2">
                      No Products Found
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                      Try adjusting your search or filters
                    </p>
                    <button
                      onClick={handleResetAll}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Clear Filters
                    </button>
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
