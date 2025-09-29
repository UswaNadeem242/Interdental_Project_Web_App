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
import FrequentlyAskedQuestion from "../../../components/frequently-asked-question";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";

function ArgenZ({ isLanding }) {
  const Indication = [
    { id: '1', title: 'Up to 14 Units  couple mispelled words' },
    { id: '2', title: 'Full contour' },
  ]
  return (
    <>
      <div className="pb-20 md:pb-36">{!isLanding && <Header />} </div>

      <div className="bg-bgWhite font-poppins w-11/12 flex flex-col gap-2 md:gap-10 mx-auto">
        <div className="w-full">
          <img src="/assets/Argen.png" alt="ArgrnImg" className="min-w-full" />
        </div>




        <div className="grid grid-cols-1 md:grid-cols-8 gap-8 py-12">
          {/* Left Image */}
          <div className="col-span-4 flex justify-center items-center ">
            <img
              className="hidden md:block "
              src="/assets/ArgenSmall.png"
              alt="ArgenPic"
            />
          </div>
          <div className="col-span-4 flex flex-col justify-center items-center md:items-start  mx-0 md:mx-0  text-left">
            <div className="max-w-[510px]">
              <h4 className="text-secondaryBrand md:text-3xl text-lg font-bold font-poppins pb-8">
                ARGEN Z HT +
              </h4>
              <p className="text-xl font-medium text-secondaryText mt-4 ">
                ArgenZ HT+ Zirconia offers extremely accurate, life-like
                restorations with 4-5% more Translucency and 100-150 MPa higher
                strength over traditional HT zirconia. Available for milling in
                high definition by Argen. TRANSLUCENCY STRENGTH
              </p>
            </div>
            <div className="grid   grid-cols-3 gap-2">
              <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">
                  45%
                </h6>
                <p className="text-secondaryText font-poppins text-base font-semibold uppercase">
                  teanslucency
                </p>
              </div>

              <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">
                  12MPA
                </h6>
                <p className="text-secondaryText font-poppins text-base font-semibold uppercase">
                  Strength
                </p>
              </div>

              <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">
                  4Y
                </h6>
                <p className="text-secondaryText font-poppins text-base font-semibold uppercase">
                  MOLE%
                </p>
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
            <IndicationProductLanding Indication={Indication} />
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
          <Shades shades={shadesProductLanding} title="Shades" className='lg:grid-cols-6' />
        </div>

        {/* Dimensions*/}

        <div className="mb-16 mt-12">
          <Dimensions thicknesses={thicknesses} diameters={diameters} />
        </div>
      </div>

      <FrequentlyAskedQuestion />
      <UpperFooter />
      <Footer />
    </>
  );
}

export default ArgenZ;
