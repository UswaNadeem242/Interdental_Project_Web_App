import Header from "../header";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";
import {
  compositionData,
  newDiametersargenzst,
  newThicknessesargenzst,
  shadesproductargenzst,
} from "../../../Constant";
import Shades from "../../../Common/product-landing/shades-product-landing";
import Dimensions from "../../../Common/product-landing/dimensions-product-landing";
// import Contact from "../contact";
import IndicationProductLanding from "../../../components/product-landing/IndicationProductLanding";
import CompositionProductLanding from "../../../components/product-landing/CompositionProductLanding";
import FrequentlyAskedQuestion from "../../../components/frequently-asked-question";
import BackButton from "../../../components/BackButton";

function ArgenzST({ isLanding }) {
  const Indication = [
    { id: "1", title: "Up to 3-unit anterior bridges" },
    { id: "2", title: "Single unit posterior crowns" },
  ];
  return (
    <div>
      <div className="pb-20">{!isLanding && <Header />} </div>
      <section className="container mx-auto    pb-10">
        <div className="mt-4">
          <BackButton variant="rounded" className="" text="Back" />
        </div>
        <div className="w-full pt-10">
          <img
            src="/assets/landing-page/1.3.png"
            className="w-full h-auto object-fit"
            alt="supimg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-2 py-12">
          {/* Left Image */}
          <div className="col-span-4 flex justify-center items-center ">
            <img
              src="/assets/landing-page/image 6.png"
              alt="Argenz ST Multilayer Product"
              className="w-auto  h-auto object-contain  md:block hidden"
            />
          </div>
          <div className="col-span-4 flex flex-col justify-center items-center md:items-start  mx-0 md:mx-0  text-left">
            <div className="max-w-[510px]">
              <h4 className="text-secondaryBrand md:text-3xl text-lg font-bold font-poppins pb-8">
                ARGEN Z ST MULTILAYER
              </h4>
              <p className="mt-2 font-poppins text-base md:text-lg text-[#808080] pb-2">
                ArgenZ ST Multilayer Zirconia features proprietary layer
                blending technology for natural shade transition. Suitable for
                single units anywhere in the mouth and up to three unit anterior
                bridges.
              </p>
            </div>
            <div className="grid   grid-cols-3 gap-2">
              <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">
                  50%
                </h6>
                <p className="text-secondaryText font-poppins text-base font-semibold uppercase">
                  TRANSLUCENCY
                </p>
              </div>

              <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">
                  850 MPa
                </h6>
                <p className="text-secondaryText font-poppins text-base font-semibold uppercase">
                  Strength
                </p>
              </div>

              <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">
                  5Y
                </h6>
                <p className="text-secondaryText font-poppins text-base font-semibold uppercase">
                  MOLE%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="continer mx-auto md:px-8 px-4  pb-10">
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
      </section>
      <section className="container  mx-auto  px-4 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-10">
            <Shades
              shades={shadesproductargenzst}
              title="Shades"
              className="lg:grid-cols-8"
            />
          </div>

          <div className="p-4">
            <Dimensions
              thicknesses={newThicknessesargenzst}
              diameters={newDiametersargenzst}
            />
          </div>
        </div>
      </section>

      <FrequentlyAskedQuestion />

      <UpperFooter />
      <Footer />
    </div>
  );
}

export default ArgenzST;
