import React from "react";
import Shades from "../../../Common/product-landing/shades-product-landing";
import IndicationProductLanding from "../../../components/product-landing/IndicationProductLanding";
import CompositionProductLanding from "../../../components/product-landing/CompositionProductLanding";
import Dimensions from "../../../Common/product-landing/dimensions-product-landing";
import {
  compositionData,
  diameters,
  shadesProductLanding,
  thicknesses,
} from "../../../Constant";
import Header from "../header";

function ArgenZ({ isLanding }) {
  return (
    <>
      <div className='pb-20'>{!isLanding && <Header />} </div>

      <div className="p-6 bg-bgWhite font-poppins">
        <div className="container md:px-8 px-4 mx-auto">
          <img src="/assets/Argen.png" alt="ArgrnImg" className="w-full   h-auto object-full" />
        </div>
        <div className="mt-6 flex justify-around ">
          <span className="">
            <img
              className="h-3/4"
              src="/assets/ArgenSmall.png"
              alt="ArgenPic"

            />
          </span>
          <div className="w-1/3 mt-14">
            <div>
              <h1 className="font-bold text-4xl text-secondaryBrand">
                ARGEN Z HT +
              </h1>
            </div>
            <div>
              <p className="text-xl font-medium text-secondaryText mt-4">
                ArgenZ HT+ Zirconia offers extremely accurate, life-like
                restorations with 4-5% more Translucency and 100-150 MPa higher
                strength over traditional HT zirconia. Available for milling in
                high definition by Argen. TRANSLUCENCY STRENGTH
              </p>
            </div>
            <div className="flex gap-2 mt-6">
              <div className="flex flex-col items-center bg-card p-10 ">
                <span className="text-secondaryBrand font-bold text-2xl">
                  <h1>45%</h1>
                </span>{" "}
                <span className="text-secondaryText font-semibold text-base">
                  <h3>teanslucency</h3>
                </span>
              </div>
              <div className="flex flex-col items-center justify-center bg-card p-10">
                <span className="text-secondaryBrand font-bold text-2xl">
                  <h1>12MPA</h1>
                </span>{" "}
                <span className="text-secondaryText font-semibold text-base">
                  <h3>Strenght</h3>
                </span>
              </div>
              <div className="flex flex-col items-center bg-card p-10">
                <span className="text-secondaryBrand font-bold text-2xl">
                  <h1>4Y</h1>
                </span>{" "}
                <span className="text-secondaryText font-semibold text-base">
                  <h3>mole%</h3>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10 mb-10 justify-center">
          {/* Indication */}
          <IndicationProductLanding />

          {/* Composition*/}
          <CompositionProductLanding data={compositionData} title="Composition" />
        </div>

        {/* Shades */}
        <div className="mx-72  py-10">
          <Shades shades={shadesProductLanding} title="Shades" />
        </div>

        {/* Dimensions*/}

        <div className=" mx-72 p-4">
          <Dimensions thicknesses={thicknesses} diameters={diameters} />
        </div>
      </div>
    </>

  );
}

export default ArgenZ;
