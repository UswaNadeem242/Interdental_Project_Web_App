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
      <div className="pb-20 md:pb-36">{!isLanding && <Header />} </div>

      <div className="bg-bgWhite font-poppins w-11/12 flex flex-col gap-2 md:gap-10 mx-auto">
        <div className="w-full">
          <img src="/assets/Argen.png" alt="ArgrnImg" className="min-w-full" />
        </div>
        <div className=" flex gap-6 ">
          {/* Left image */}
          <div className=" ">
            <img
              className="hidden md:block "
              src="/assets/ArgenSmall.png"
              alt="ArgenPic"
            />
          </div>
          <div className="flex flex-col justify-center items-start max-w-[509px] mx-auto  text-left ">
            <div className="mt-16 mb-8">
              <h1 className="font-bold text-4xl text-secondaryBrand text-left ">
                ARGEN Z HT +
              </h1>
            </div>
            <div className="">
              <p className="text-xl font-medium text-secondaryText mt-4 ">
                ArgenZ HT+ Zirconia offers extremely accurate, life-like
                restorations with 4-5% more Translucency and 100-150 MPa higher
                strength over traditional HT zirconia. Available for milling in
                high definition by Argen. TRANSLUCENCY STRENGTH
              </p>
            </div>
            <div className="flex gap-2 mt-12 w-full">
              <div className="flex flex-col items-center w-full py-6 bg-card ">
                <span className="text-secondaryBrand font-bold text-2xl">
                  <h1>45%</h1>
                </span>{" "}
                <span className="text-secondaryText font-semibold text-base">
                  <h3>teanslucency</h3>
                </span>
              </div>
              <div className="flex flex-col items-center w-full py-6 justify-center bg-card">
                <span className="text-secondaryBrand font-bold text-2xl">
                  <h1>12MPA</h1>
                </span>
                <span className="text-secondaryText font-semibold text-base">
                  <h3>Strenght</h3>
                </span>
              </div>
              <div className="flex flex-col items-center w-full py-6 bg-card ">
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

        <div
          className="flex flex-col my-10 lg:flex-row gap-6 items-center justify-center
"
        >
          {/* Indication */}
          <div className=" w-full h-full">
            <IndicationProductLanding />
          </div>

          {/* Composition*/}
          <div className=" w-full h-full">
            <CompositionProductLanding
              data={compositionData}
              title="Composition"
            />
          </div>
        </div>

        {/* Shades */}
        <div className="mt-12">
          <Shades shades={shadesProductLanding} title="Shades" />
        </div>

        {/* Dimensions*/}

        <div className="mb-16 mt-12">
          <Dimensions thicknesses={thicknesses} diameters={diameters} />
        </div>
      </div>
    </>
  );
}

export default ArgenZ;
