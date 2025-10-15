import React, { useEffect, useState } from "react";
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

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedbrand, setSelectedbrand] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [checked, setChecked] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [toastVisible, setToastVisible] = useState(false);
  const { fetchWishlistCount, fetchCartCount } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const handleProduct = (product) => {
    navigate(`/shop/${product.productId}`);
  };

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
    setSelectedCategory(id);
    setCategoryName(name);
  };

  const handleBrandChange = (id, name) => {
    setSelectedbrand(id);
    setBrandName(name);
  };

  const filteredProducts = products.filter((product) => {
    // Price filter
    const isInPriceRange =
      !minPrice && !maxPrice
        ? true
        : product.price >= minPrice && product.price <= maxPrice;

    // Category filter
    const isInCategory = selectedCategory
      ? product.categoryId === selectedCategory
      : true;

    // Brand filter
    const isInBrand = selectedbrand ? product.brandId === selectedbrand : true;

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

  const handleAddtoWishlist = async (id, e) => {
    e.stopPropagation();

    // make sure this is declared in your component scope
    const token = localStorage.getItem("token");

    // 🔒 If user not logged in
    if (!token) {
      dispatch(showToast({ message: "Login to access", type: "info" }));
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

    const payload = {
      id: productItem?.productId,
      productId: productItem?.productId,
      productName: productItem?.product?.name,
      price: productItem?.price,
    };
    const url = `${BASE_URL}/api/wishlist/add`;

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist((prev) => [...prev, id]);
      fetchWishlistCount();
      dispatch(showToast({ message: "Added to Wishlist!", type: "success" }));
    } catch (error) {
      console.error("❌ Wishlist API error:", error);
      dispatch(
        showToast({
          message: `Error: ${error.response?.data?.message || error.message}`,
          type: "error",
        })
      );
    }
  };

  const handleAddtoCart = async (id) => {
    console.log("map id", id);
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(showToast({ message: "Login to access", type: "info" }));
      return;
    }
    const filterMethode = filteredProducts?.filter(
      (item) => item?.productId === id
    );
    if (product.stockQuantity <= 0) {
      setToastMessage("This item is currently out of stock.");
      setToastType("error");
      setToastVisible(true);
      return;
    }
    try {
      // setLoading(true);

      const payload = {
        id: filterMethode[0]?.productId,
        productId: filterMethode[0]?.productId,
        productName: filterMethode[0]?.name,
        quantity: 1,
        price: filterMethode[0]?.price,
        totalPrice: product[0]?.price,
      };
      const response = await axios.post(`${BASE_URL}/api/cart/add`, payload, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setToastMessage("Added to Cart !");
      setToastType("success");
      setToastVisible(true);
      fetchCartCount();
      dispatch(showToast({ message: "Added to Cart!", type: "success" }));
      // setLoading(false);
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllBrands();
    fetchCartCount();
  }, []);

  return (
    <div className="bg-background">
      {/* bg-gradient-to-b from-cyan-50 to-emerald-50/0 */}
      <Header />
      <div className="px-4 md:px-10   py-6 ">
        {/* Header */}
        <div className="flex justify-between items-center  mt-24">
          <button
            className="md:hidden flex items-center gap-2 border px-3 py-2 rounded-lg text-sm"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar (desktop static, mobile drawer) */}
          <div
            className={`fixed inset-y-0 left-0 z-0  w-72 rounded-2xl bg-white shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 md:shadow-none
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Mobile header */}
            <div className="flex justify-between items-center p-4 border-b md:hidden">
              <h2 className="font-semibold">Filters</h2>
              <div onClick={() => setIsFilterOpen(false)}>x</div>
            </div>

            {/* Filters content */}
            <div className="p-4 space-y-3 overflow-y-auto h-full">
              <h2 className="font-semibold  border-b-[2px] border-background my-4">
                Filters
              </h2>
              {/* 🔍 Search */}
              <div className="relative flex items-center border rounded-full px-3 py-2">
                <input
                  type="text"
                  placeholder="search "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  className="w-full rounded-full outline-none border-none focus:ring-0 pr-8" // ⬅️ Add right padding
                />
                <div className="bg-secondaryBrand w-7 h-6 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <div className="flex flex-col justify-center items-start w-[258px] h-[99.33px] rounded-[17px] pr-[12px] py-[12px] gap-[16px] bg-white">
                  <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
                    Price Range
                  </h1>
                  <div className="w-full mx-auto">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>${minPrice ? minPrice : 0}</span>
                      <span>{maxPrice && `$${maxPrice}`}</span>
                    </div>

                    <div className="relative h-2 bg-white border-background border rounded">
                      {/* Active Range Bar */}
                      <div
                        className="absolute h-2 bg-blue-950/20 rounded border-background border"
                        style={{
                          left: `${(minPrice / 20000) * 100}%`,
                          right: `${100 - (maxPrice / 20000) * 100}%`,
                        }}
                      ></div>

                      <input
                        type="range"
                        min="0"
                        max="20000"
                        value={maxPrice}
                        onChange={handleMaxChange}
                        className="absolute top-0 w-full h-2 cursor-pointer appearance-none bg-transparent pointer-events-auto"
                        style={{
                          accentColor: "#001D58",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start w-[258px] h-[97px]   p-[12px] space-y-[16px]  border-t-[2px] border-background my-4">
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
                    {filteredProducts.map((c) => (
                      <h1
                        key={c.categoryId}
                        onClick={() =>
                          handleCategoryChange(c.categoryId, c.name)
                        }
                        className={`font-poppins text-[12px] leading-[18px] ${
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
                        className={`font-poppins text-[12px] leading-[18px] ${
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
              className="fixed inset-0 bg-black/40 md:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Products Grid */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {loading ? (
                <div className="w-full flex justify-center items-center h-[400px]">
                  <p className="text-lg text-gray-500">Loading products...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => {
                  const isInWishlist = wishlist.includes(product?.productId); // ✅ Check product in wishlist

                  return (
                    <div
                      key={idx}
                      className="flex flex-col justify-between items-center bg-white rounded-lg shadow-sm p-4 cursor-pointer h-[430px]"
                    >
                      {/* Upper Section */}
                      <div
                        onClick={() => handleProduct(product)}
                        className="flex flex-col items-center flex-grow"
                      >
                        <img
                          src={product.imageUrls[0]}
                          alt="product"
                          className="w-[263px] h-[260px] object-cover"
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
                                5.0
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Lower Section */}
                      <div className="flex items-center gap-3 mt-1">
                        <div
                          onClick={() => handleAddtoCart(product?.productId)}
                          className="flex justify-center items-center cursor-pointer w-[185.27px] h-[48px] text-secondaryBrand hover:text-white bg-background hover:bg-secondaryBrand py-[17px] px-[24px] rounded-[28px]"
                        >
                          <h1 className="font-poppins font-normal text-xs leading-[21px]">
                            Add to Cart
                          </h1>
                        </div>

                        {/* ❤️ Wishlist Button */}
                        <button
                          onClick={(e) =>
                            handleAddtoWishlist(product?.productId, e)
                          }
                          className={`w-[51.28px] h-[51.28px] p-[12.82px] rounded-[55.1px] flex items-center justify-center transition-all duration-300 bg-[#F8F8F8]`}
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
                              stroke={isInWishlist ? "#FF0000" : "#001D58"}
                              strokeWidth="1.92211"
                              fill={isInWishlist ? "#FF0000" : "none"}
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-96 h-full flex justify-center items-center bg-white p-8 rounded-md">
                  <p className="text-2xl">Sorry! No Products Found</p>
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
