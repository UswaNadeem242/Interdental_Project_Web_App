import React from "react";
import Brands from "../components/Brands";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrival from "../components/NewArrival";
import TopRatedProducts from "../components/TopRatedProducts";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="flex flex-col justify-start items-center space-y-8 ">
      <HeroSection />
      {/* <Brands /> */}
      <FeaturedProducts />
      <TopRatedProducts />
      <NewArrival />
    </div>
  );
};

export default Home;
