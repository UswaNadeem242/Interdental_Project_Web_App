import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../header";
import { productsOption } from "../../../Constant";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";

function ProductLandingPage({ isLanding }) {
  return (
    <>
      <div className="pb-20">{!isLanding && <Header />} </div>
      <section className="py-16">
        <div className="grid grid-cols-1 gap-12">
          {productsOption.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <NavLink
                key={item.id}
                to={item?.nav || "#"}
                className={`block`} // make NavLink behave like a div
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 items-center p-6 rounded-xl 
              ${!isEven ? "bg-background" : "bg-transparent"}`}
                >
                  {/* Left side */}
                  {isEven ? (
                    <>
                      <div className="flex justify-center items-center p-6 md:ml-20">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-w-[350px] h-auto object-contain "
                        />
                      </div>
                      <div className="flex flex-col justify-center max-w-[509px] mx-auto py-10 md:ml-10">
                        <h3 className="text-base font-bold font-poppins md:text-3xl text-secondaryBrand">
                          {item.title}
                        </h3>
                        <p
                          className={`mt-4 font-poppins md:text-xl text-base text-justify  text-[#808080]  ${
                            item.multiline ? "whitespace-pre-line" : ""
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col justify-center max-w-[509px] mx-auto p-6 py-10 md:ml-60">
                        <h3 className="text-base font-bold font-poppins md:text-3xl text-secondaryBrand">
                          {item.title}
                        </h3>
                        <p
                          className={`mt-4 font-poppins md:text-xl font-normal text-base text-[#808080] text-justify  ${
                            item.multiline ? "whitespace-pre-line" : ""
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                      <div className="flex justify-center items-center p-6 md:mr-52">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-w-[350px] h-auto object-contain "
                        />
                      </div>
                    </>
                  )}
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>
      <UpperFooter />

      <Footer />
    </>
  );
}

export default ProductLandingPage;
