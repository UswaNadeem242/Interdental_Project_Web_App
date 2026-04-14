import React, { useEffect, useState } from "react";
import Brands from "../components/Brands";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrival from "../components/NewArrival";
import TopRatedProducts from "../components/TopRatedProducts"; 
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../auth/AuthContext";
import Header from "./landing-page/header";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/getallproducts?page=0&size=10`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setProducts(response.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(products);

  return (
    <div className="flex flex-col justify-start items-center space-y-[65px] bg-gray-100 pb-16">
      <HeroSection />
      {/* <Brands /> */}
      <FeaturedProducts products={products} />
      <TopRatedProducts products={products} />
      <NewArrival products={products} />
    </div>
  );
};

export default Home;
