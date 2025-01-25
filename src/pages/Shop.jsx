import React, { useEffect, useState } from "react";
// import product1 from "../assets/product1.png";
// import product2 from "../assets/product2.png";
// import product3 from "../assets/product3.png";
// import product4 from "../assets/product4.png";
// import product5 from "../assets/product5.png";
// import product6 from "../assets/product6.png";
// import product7 from "../assets/product7.png";
// import product8 from "../assets/product8.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";
import Header from "./landing-page/header";
const featureProducts = [
  {
    id: 1,
    img: "/build/assets/product1.png",
    title: "G Gold Lable 1 Mini",
    price: 233.65,
  },
  {
    id: 2,
    img: "/build/assets/product2.png",
    title: "G Gold Lable 1 Mini",
    price: 739.65,
  },
  {
    id: 3,
    img: "/build/assets/product3.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 4,
    img: "/build/assets/product4.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 5,
    img: "/build/assets/product5.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 6,
    img: "/build/assets/product6.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 7,
    img: "/build/assets/product7.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 8,
    img: "/build/assets/product8.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
];

const Shop = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [checked, setChecked] = useState(null);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const handleProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/interdentallab/api/products/getallproducts?page=0&size=10`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts(response.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/interdentallab/category/getAllCategories`,
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
      const response = await axios.get(
        `${BASE_URL}/interdentallab/api/brands?page=0&size=10`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBrandsList(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllBrands();
  }, []);

  const handleCategoryChange = (id, name) => {
    setSelectedCategory(id);
    setCategoryName(name);
  };

  // Filter products based on the selected price range and category
  const filteredProducts = products.filter((product) => {
    const isInPriceRange =
      product.price >= minPrice && product.price <= maxPrice;
    const isInCategory = selectedCategory
      ? product.categoryId === selectedCategory
      : true; // Filter by category if selectedCategory exists
    return isInPriceRange && isInCategory;
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setChecked(id);
    } else {
      setChecked(null);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-start gap-8 px-28 pt-8 pb-[240px] bg-white">
        <div className="flex flex-col justify-start items-center w-[290px] h-auto py-[16px] px-[32px] gap-[16px] rounded-[12px] bg-[#FFFFFF] top-[143px] left-[109px]">
          <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
            Filter
          </h1>
          <div className="w-[258px] h-[1px] border-[1px] border-[#0000001A]"></div>
          {/* Price filter */}
          <div className="flex flex-col justify-center items-start w-[258px] h-[99.33px] rounded-[17px] pr-[12px] py-[12px] gap-[16px] bg-white">
            <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
              Price Range
            </h1>
            <div className="w-full mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>

              <div className="relative h-2 bg-gray-200 rounded">
                {/* Active Range Bar */}
                <div
                  className="absolute h-2 bg-[#001D58] rounded"
                  style={{
                    left: `${(minPrice / 2000) * 100}%`,
                    right: `${100 - (maxPrice / 2000) * 100}%`,
                  }}></div>

                {/* Min Range Slider */}
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={minPrice}
                  onChange={handleMinChange}
                  className="absolute top-0 w-full h-2 appearance-none bg-transparent pointer-events-auto"
                  style={{
                    accentColor: "#001D58",
                  }}
                />

                {/* Max Range Slider */}
                <input
                  type="range"
                  min="0"
                  max="2000"
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
          {/* Availability filter */}
          <div className="flex flex-col justify-center items-start w-[258px] h-[97px] rounded-[17px] p-[12px] space-y-[16px]">
            <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145] h-[21px]">
              Avalibility
            </h1>
            <div className="flex flex-col justify-start items-start space-y-[8px] h-[44px] w-[142px] ">
              <div className="flex items-center gap-[5px] h-[18px]">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={checked === "inStock"}
                  onChange={handleCheckboxChange}
                  className={`mr-2 cursor-pointer rounded-[4.43px] border-[0.74px] border-[#949494] w-[14.77px] h-[14.77px] ${
                    checked && "accent-secondaryBrand"
                  }`}
                />
                <label
                  htmlFor="inStock"
                  className={`cursor-pointer font-poppins font-normal text-[12px] leading-[18px] ${
                    checked === "inStock"
                      ? "text-secondaryBrand"
                      : "text-[#949494]"
                  }`}>
                  In Stock
                </label>
              </div>
              <div className="flex items-center gap-[5px]">
                <input
                  type="checkbox"
                  id="outOfStock"
                  checked={checked === "outOfStock"}
                  onChange={handleCheckboxChange}
                  className={`mr-2 cursor-pointer rounded-[4.43px] border-[0.74px] border-[#949494] w-[14.77px] h-[14.77px] ${
                    checked && "accent-secondaryBrand"
                  }`}
                />
                <label
                  htmlFor="outOfStock"
                  className={`cursor-pointer font-poppins font-normal text-[12px] leading-[18px] ${
                    checked === "outOfStock"
                      ? "text-secondaryBrand"
                      : "text-[#949494]"
                  }`}>
                  Out of Stock
                </label>
              </div>
            </div>
          </div>
          <div className="w-[258px] h-[1px] border-[1px] border-[#0000001A]"></div>
          <div className="w-[258px] h-auto space-y-[16px]">
            <h1 className="w-[150px] h-[21px] font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
              Categories
            </h1>
            <div className="w-[142px] h-auto space-y-[8px]">
              {categoriesList.map((c) => (
                <h1
                  key={c.categoryId}
                  onClick={() => handleCategoryChange(c.categoryId, c.name)}
                  className={`font-poppins text-[12px] leading-[18px] ${
                    selectedCategory === c.categoryId
                      ? "text-secondaryBrand  font-medium"
                      : "text-secondaryText cursor-pointer font-normal"
                  }`}>
                  {c.name}
                </h1>
              ))}
            </div>
          </div>
          <div className="w-[258px] h-[201px] space-y-[16px]">
            <h1 className="w-[150px] h-[21px] font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
              Brands
            </h1>
            <div className="w-[142px] h-[148px] space-y-[8px]">
              {brandsList.map((b) => (
                <h1
                  key={b.id}
                  className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
                  {b.name}
                </h1>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[1224px] h-[971.44px] gap-[32px] top-[143px] left-[431px]">
          <div className="flex flex-wrap w-full h-[386px] gap-[31px]">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  onClick={() => handleProduct(product)}
                  className="flex flex-col justify-center items-center cursor-pointer bg-white w-[303.15px] h-[386px] p-[20px] space-y-[24px] border-[1px] border-[#0000000D] rounded-[16px]">
                  <img
                    src={product?.img}
                    alt="product"
                    className="w-[263.15px] h-[260.45px]"
                  />
                  <div className="flex flex-col justify-center items-center space-y-[7.55px]">
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
    </>
  );
};

export default Shop;
