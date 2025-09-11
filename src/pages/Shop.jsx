import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
import Header from "./landing-page/header";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthContext";
const featureProducts = [
  {
    id: 1,
    img: "/assets/product1.png",
    title: "G Gold Lable 1 Mini",
    price: 233.65,
  },
  {
    id: 2,
    img: "/assets/product2.png",
    title: "G Gold Lable 1 Mini",
    price: 739.65,
  },
  {
    id: 3,
    img: "/assets/product3.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 4,
    img: "/assets/product4.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 5,
    img: "/assets/product5.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 6,
    img: "/assets/product6.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 7,
    img: "/assets/product7.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 8,
    img: "/assets/product8.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
];

const Shop = () => {
  const navigate = useNavigate();
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
  const { fetchWishlistCount, fetchCartCount } = useAuth();


  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const handleProduct = (product) => {
    navigate(`/product/${product.productId}`);

    console.log("=--=-=-=-=product-=-=-=-=", product);
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/product/getAll`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(
        "-=-====--=-=-response.data.data==--==-=-==-=--====",
        response.data.data
      );
      setProducts(response.data.data);
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
  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllBrands();
    fetchCartCount()
    fetchWishlistCount()

  }, []);

  const handleCategoryChange = (id, name) => {
    setSelectedCategory(id);
    setCategoryName(name);
  };

  const handleBrandChange = (id, name) => {
    setSelectedbrand(id);
    setBrandName(name);
  };

  // const filteredProducts = products.filter((product) => {
  //   // Price filter
  //   const isInPriceRange =
  //     !minPrice && !maxPrice
  //       ? true // if no price range is selected → show all
  //       : product.price >= minPrice && product.price <= maxPrice;

  //   // Category filter
  //   const isInCategory = selectedCategory
  //     ? product.categoryId === selectedCategory
  //     : true;

  //   // Brand filter
  //   const isInBrand = selectedbrand ? product.brandId === selectedbrand : true;

  //   // Search filter
  //   const matchesSearch = searchTerm
  //     ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     : true;

  //   return isInPriceRange && isInCategory && isInBrand && matchesSearch;
  // });

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

  // const handleCheckboxChange = (e) => {
  //   const { id, checked } = e.target;
  //   if (checked) {
  //     setChecked(id);
  //   } else {
  //     setChecked(null);
  //   }
  // };

  const handleCheckboxChange = (e) => {
    const { id } = e.target;
    setChecked((prev) => (prev === id ? null : id));
    // if same clicked again → uncheck
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-cyan-50 to-emerald-50/0">
      <Header />
      <div className="px-4 md:px-10 lg:px-20 py-6 ">
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
              <div
                onClick={() => setIsFilterOpen(false)}
              >x</div>
            </div>

            {/* Filters content */}
            <div className="p-4 space-y-6 overflow-y-auto h-full">
              {/* 🔍 Search */}
              <div className="flex items-center border rounded-full px-3 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  className="my-auto rounded w-full outline-none border-none focus:ring-0"
                />
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 14.251C11.5637 14.251 14.25 11.5647 14.25 8.25098C14.25 4.93727 11.5637 2.25098 8.25 2.25098C4.93629 2.25098 2.25 4.93727 2.25 8.25098C2.25 11.5647 4.93629 14.251 8.25 14.251Z"
                    stroke="#001D58"
                    stroke-width="1.28571"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.7508 15.7508L12.4883 12.4883"
                    stroke="#001D58"
                    stroke-width="1.28571"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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

                    <div className="relative h-2 bg-gray-200 rounded">
                      {/* Active Range Bar */}
                      <div
                        className="absolute h-2 bg-[#001D58] rounded"
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
                <div className="flex flex-col justify-center items-start w-[258px] h-[97px] rounded-[17px] p-[12px] space-y-[16px]">
                  <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145] h-[21px]">
                    Availability
                  </h1>
                  <div className="flex flex-col justify-start items-start space-y-[8px] h-[44px] w-[142px] ">
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
                        className={`cursor-pointer font-poppins font-normal text-[12px] leading-[18px] ${checked === "inStock"
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
                        className={`cursor-pointer font-poppins font-normal text-[12px] leading-[18px] ${checked === "outOfStock"
                          ? "text-secondaryBrand"
                          : "text-[#949494]"
                          }`}
                      >
                        Out of Stock
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-[258px] h-[1px] border-[1px] border-[#0000001A]"></div>
                <div className="w-[258px] h-auto space-y-[16px] ">
                  <h1 className="w-[150px] h-[21px] font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
                    Categories
                  </h1>
                  <div className=" max-h-[200px] overflow-y-auto pr-2 space-y-[8px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {filteredProducts.map((c) => (
                      <h1
                        key={c.categoryId}
                        onClick={() => handleCategoryChange(c.categoryId, c.name)}
                        className={`font-poppins text-[12px] leading-[18px] ${selectedCategory === c.categoryId
                          ? "text-secondaryBrand  font-medium"
                          : "text-secondaryText cursor-pointer font-normal"
                          }`}
                      >
                        {c.name}
                      </h1>
                    ))}
                  </div>
                </div>



                <div className="w-[258px] h-[201px] space-y-[16px]">
                  <h1 className="w-[150px] h-[21px] font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
                    Brands
                  </h1>
                  <div className=" max-h-[150px] overflow-y-auto pr-2 space-y-[8px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {brandsList.map((b) => (
                      <h1
                        key={b.id}
                        onClick={() => handleBrandChange(b.id, b.name)}
                        // className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText"
                        className={`font-poppins text-[12px] leading-[18px] ${selectedbrand === b.id
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 cursor-pointer"
                  >
                    <img
                      src={product.imageUrls[0]}
                      alt="product"
                      className="w-[263.15px] h-[260.45px]"
                    />

                    <div className="text-center mt-3">
                      <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-black">
                        {product.name}
                      </h1>
                      <h1 className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD]">
                        ${product.price}
                      </h1>
                    </div>
                  </div>
                ))
              ) : (
                <p className="w-full h-full flex justify-center items-center">
                  Sorry ! No products found in{" "}
                  <b className="px-1">{categoryName}</b> category
                </p>
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
