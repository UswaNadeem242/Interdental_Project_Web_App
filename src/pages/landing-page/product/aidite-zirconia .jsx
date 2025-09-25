import Header from "../header";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";
import { teethOptionMutiple } from "../../../Constant";
import Shades from "../../../Common/product-landing/shades-product-landing";
import FrequentlyAskedQuestion from "../../../components/frequently-asked-question";

function AiditeZirconia({ isLanding }) {
  const shadesProductMultiPro = [
    { label: "A1", color: "#EFEAD4" },
    { label: "A2", color: "#ECE8D0" },
    { label: "A3", color: "#D2C89B" },
    { label: "A3.5", color: "#E4DDC3" },
    { label: "B1", color: "#EFEAD4" },
    { label: "B2", color: "#EAE3C6" },
    { label: "B3", color: "#E0D7B3" },
    { label: "B4", color: "#E0D7B5" },

    { label: "C1", color: "#E4DDC3" },
    { label: "C2", color: "#E0D7B5" },
    { label: "C3", color: "#E4DBC2" },
    { label: "C4", color: "#D2C89B" },

    { label: "D2", color: "#D2C89B" },
    { label: "D3", color: "#D0C2A2" },
    { label: "D4", color: "#D0C2A2" },

    { label: "OM1", color: "#FFFFFF" },
    { label: "OM2", color: "#FFFFFF" },
    { label: "OM3", color: "#FFFFFF" },
  ];

  return (
    <div>
      <div className="pb-20">{!isLanding && <Header />} </div>
      <section className="container mx-auto    pb-10">
        <div className="w-full pt-10">
          <img
            src="/assets/landing-page/zincornia.png"
            alt="img3"
            className="w-full h-auto object-fit md:px-48"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-2 py-12 px-6 bg-[#F9FAFA] font-poppins mx-12">
          {/* Left Side */}

          <div className="col-span-4 flex justify-center items-center font-poppins    ">
            <div className="flex flex-col p-8">
              <h1 className="text-[#001D58] text-3xl font-bold">
                Aidite zirconia{" "}
              </h1>
              <p className="text-[#949494] text-2xl font-normal mt-4">
                3D Pro zir is fabricated with the most advanced production
                processes at Aidite, producing a layerless,natural shade
                gradient, with optimal strengthand translucency, transitioning
                from Cervical to Incisal areas of the restoration. With a
                maximum flexural strength of 1100 MPa, 3D Pro zirensures
                aesthetic results while being suitable for all indications from
                single crowns to 14- unitbridge structures.
              </p>
            </div>
          </div>
          <div className="col-span-4 flex flex-col justify-center px-6 ">
            <img
              src="/assets/landing-page/ytZincornia.png"
              alt="ytImg"
              className="max-h-80 max-w-xl"
            />
          </div>
        </div>
      </section>

      {/*Recommended Indications */}

      <section className="continer mx-auto md:px-8 px-4  pb-10">
        <div className="flex justify-center">
          <h2 className="font-poppins text-secondaryBrand md:text-4xl text-base pb-10">
            {" "}
            Recommended <span className="text-fouthBrand">Indications</span>
          </h2>
        </div>
        <div className="flex flex-col items-center gap-8">
          {/* Top row → first 5 items */}
          <div className="flex flex-wrap justify-center gap-10">
            {teethOptionMutiple?.slice(0, 6).map((teeth) => (
              <div
                key={teeth.title}
                className="flex flex-col items-center w-20 sm:w-24 md:w-32"
              >
                <img
                  src={teeth.img}
                  alt={teeth.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <span className="mt-2 text-xs sm:text-sm font-poppins text-center">
                  {teeth.title}
                </span>
              </div>
            ))}
          </div>

          <div className="flex  flex-wrap justify-center gap-10">
            {teethOptionMutiple.slice(6, 11).map((teeth) => (
              <div
                key={teeth.title}
                className="flex flex-col items-center w-20 sm:w-24 md:w-32"
              >
                <img
                  src={teeth.img}
                  alt={teeth.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <span className="mt-2 text-xs sm:text-sm font-poppins text-center">
                  {teeth.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto md:px-8 px-4 py-10 md:py-20">
        {/* Strenght and Transluency */}
        <div className="flex flex-col items-center justify-center   p-8 font-sans">
          <div className="">
            {/* Main Title */}
            <div className="text-center mb-16 font-poppins">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#001f40]">
                <span className="text-3xl font-bold text-[#000000]">
                  Strength
                </span>
                <span className="text-3xl font-medium text-[#000000]">
                  {" "}
                  and
                </span>
                <span className="text-3xl font-bold text-fouthBrand">
                  {" "}
                  Translucency
                </span>
              </h1>
            </div>

            {/* Image*/}
            <div className=" flex justify-center items-center mb-20">
              <img
                src="/assets/landing-page/zincorniaStrength.png"
                alt="dental layers and properties"
                className="w-full max-w-xl object-contain rounded-lg"
              />
            </div>

            <div className=" mx-auto space-y-12 font-poppins md:mx-20">
              {/* Bionic Section */}
              <div>
                <h2 className="text-xl sm:text-lg font-semibold mb-2 text-[#000000]">
                  Bionic
                </h2>
                <p className="text-[#949494] text-lg font-normal">
                  3D Pro Zir Is Developed By Aidite Technology And Peking
                  University School Of Stomatology. The Material Comes Closer To
                  Natural Teeth. Not Only From The Esthetic Point Of View, Also
                  Its Abrasion Characteristics Makes It To A Dental Material
                  With Biomimetic Properties.
                </p>
              </div>

              {/* High Strength Section */}
              <div>
                <h2 className="text-base sm:text-lg font-semibold mb-2 text-[#000000]">
                  High Strength
                </h2>
                <p className="text-[#949494] text-lg font-normal">
                  The Flexural Strength Of 3D Pro Zir Is Up To 1100 MPa Which Is
                  Greatly Improved. Long Span Bridges Are Stable And Fully Meet
                  The Strength Requirements Of Laboratories For A Broad Range Of
                  Indications.
                </p>
              </div>

              {/* Layerless Natural Transition Section */}
              <div>
                <h2 className="text-xl sm:text-lg font-semibold mb-2 text-[#000000]">
                  Layerless Natural Transition
                </h2>
                <p className="text-[#949494] text-lg font-normal">
                  Matching The Color Transition Of Natural Teeth From Cervical
                  To Incisal, 3D Pro Zir Has A Smooth Color Gradient Without
                  Visible Layer.
                </p>
              </div>

              {/* Fast Delivery Section */}
              <div>
                <h2 className="text-xl sm:text-lg font-semibold mb-2 text-[#000000]">
                  Fast Delivery
                </h2>
                <p className="text-[#949494] text-lg font-normal">
                  3D Pro Zir Is The Leading Digital Solution In The Field Of
                  Zirconia Materials. The Excellent Characteristics Of The
                  Material Itself, Combined With The 3D Pro Zir Rapid Aesthetic
                  Solution Will Help Laboratories To Finalize And Deliver
                  Zirconia Restorations Within 24 Hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container  mx-auto  px-4 py-10">
        <div className="max-w-7xl mx-auto px-4 bg-[#F9FAFA] mb-6">
          <div className="py-10 pb-20 ">
            <Shades
              shades={shadesProductMultiPro}
              title="Colour"
              description="3D Pro zir is available in 16 shades of the classical VITA shade guide and 3 bleach shades OM1/OM2/OM3. For individual further charac-terisation, Biomic Stain&Glaze can be used. 3D Pro zir simplifies the whole process in achieving highly aesthetic results."
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

export default AiditeZirconia;
