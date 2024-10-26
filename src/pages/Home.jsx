import React from "react";
import Brands from "../components/Brands";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrival from "../components/NewArrival";
import TopRatedProducts from "../components/TopRatedProducts";

const Home = () => {
  return (
    <div className="flex flex-col justify-start items-center mt-12 space-y-8">
      <Brands />
      <FeaturedProducts />
      <TopRatedProducts />
      <NewArrival />
    </div>
  );
};

export default Home;
