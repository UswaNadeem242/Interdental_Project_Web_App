import React from "react";
import Footer from "../../components/Footer";
import Header from "./header";
import HeroSection from "./hero-section";
import AboutUs from "./about-us";
import Products from "./products";
import Patients from "./patient";
import Doctor from "./doctor";
import Warranty from "./warranty";
import Contact from "./contact";
import ProductLandingPage from "./product";
import ArgebbPmma from "./product/argen-pmma";
import ArgenZ from "./product/argen-z-h";

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="bg-[#e2f7fb]  font-poppins min-h-screen text-gray-800">

        <HeroSection />
        <AboutUs />
        {/* <ProductLandingPage isLanding={true} />
        <ArgebbPmma isLanding={true} />
        <ArgenZ isLanding={true} /> */}
        <Patients isLanding={true} />
        <Doctor isLanding={true} />
        <Warranty />
        <Contact isLanding={true} />
        <Footer />
      </div>
    </>

  );
};

export default LandingPage;
