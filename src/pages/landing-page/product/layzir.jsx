import Header from "../header";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";
import FrequentlyAskedQuestion from "../../../components/frequently-asked-question";
function LayZirPage({ isLanding }) {
  const features = [
    "FDA Cleared",
    "Aesthetics on Par with Lithium Disilicate",
    "Greatly Reduced Sintering Distortion",
    "Excellent Millability Across All Systems",
    "Proprietary 3Y and 5Y Blending",
  ];
  return (
    <div>
      <div className="pb-20">{!isLanding && <Header />} </div>
      <section className="container mx-auto    pb-10">
        <div className="w-full pt-10">
          <img
            src="/assets/landing-page/LayZir.png"
            alt="imgZir"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>
      <section className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-16">
          {/* Left Image */}
          <div className="col-span-6 flex justify-center items-center">
            <img
              src="/assets/landing-page/layZirSmall.png"
              alt="imageZir2"
              className="w-full max-w-[400px] max-h-full h-[100%] object-contain"
            />
          </div>
          {/* Right Content */}
          <div className="col-span-6  font-poppins">
            <div className="flex flex-col items-center justify-center  bg-bgWhite p-8">
              <div className="w-full max-w-2xl px-6 py-8">
                <p className="text-primaryText  text-sm font-semibold mb-2">
                  CAD/CAM Materials
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-secondaryBrand leading-tight mb-2">
                  LayZir All Indication Zirconia Disc
                </h1>
                <p className="text-primaryText uppercase tracking-wide text-sm font-semibold mb-8">
                  BRAND: SMART DENTISTRY SOLUTIONS
                </p>

                <ul className="list-none space-y-4">
                  {features.map((item, key) => (
                    <li
                      key={key}
                      className="flex items-center text-secondaryText text-lg font-medium"
                    >
                      <span className="text-secondaryText text-lg font-medium mr-2">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Never Compromise */}
      <section className="continer mx-auto md:px-8  px-4  pb-10 ">
        <div className="flex justify-center py-12 bg-bgWhite px-20 font-poppins border md:mx-20 rounded-3xl">
          <div className=" text-center ">
            <h1 className="text-2xl sm:text-5xl font-bold text-secondaryBrand px-8 ">
              Never Compromise Performance for Aesthetics!
            </h1>
            <p className="text-base sm:text-base text-secondaryText font-medium leading-relaxed mt-10">
              We Get It.... Dental Technicians Are Constantly Being Asked To
              Suppress Their Own Artistry To Achieve Functional Demands. Thanks
              To LayZir All Indication Zirconia Discs, You'll Never Have To Make
              That Sacrifice Again! LayZir Discs Are FDA-Cleared And
              Manufactured To The Highest Quality Standards Using Premium
              Yttrium–Stabilized Zirconia From Tosoh*. State-Of-The-Art
              Multi-Dimensional Gradation Technology Seamlessly Blends 3Y And 5Y
              Together To Optimize Strength Throughout The Restoration While
              Also Delivering Excellent Aesthetic Characteristics. LayZir
              Provides An Unsurpassed 1,450 MPa Flexural Modulus At Cervical,
              Where It's Needed Most. At The Occlusal Area, Where Excessive
              Strength Can Impact Opposing Dentition, LayZir's 1,030 MPa
              Provides A Durable Restoration With Less Abrasion.
            </p>
          </div>
        </div>
      </section>

      {/* Artistry Shines Through */}
      <section className="continer mx-auto md:px-8  px-4  pb-10 ">
        <div className="flex flex-col items-center justify-center min-h-screen bg-bgWhite p-8">
          <div className="max-w-4xl text-center mb-12">
            <h1 className="text-2xl sm:text-5xl font-bold text-secondaryBrand leading-tight">
              Artistry Shines Through
            </h1>
          </div>
          <div className="w-full space-y-6">
            {/* Enamel Layer */}
            <div className="bg-card p-6 rounded-2xl ">
              <h2 className="text-2xl font-bold mb-2 text-primaryText">
                Enamel Layer
              </h2>
              <p className="text-secondaryText font-semibold text-base mt-4">
                Optimized for unparalleled aesthetics with a stunning 44%
                translucency, LayZir is well-indicated for high-profile anterior
                cases. As an added benefit, with a flexural strength of 1,030
                MPa at the occlusal/incisal area, LayZir was intentionally
                designed to minimize stress to the opposing dentition.
              </p>
            </div>

            {/* Transition Layers */}
            <div className="bg-card p-6 rounded-2xl ">
              <h2 className="text-2xl font-bold mb-2 text-primaryText">
                Transition Layers
              </h2>
              <p className="text-secondaryText font-semibold text-base mt-4">
                Proprietary multi-dimensional gradation micro-structure
                technology provides a natural transition from cervical opacity
                to incisal translucency.
              </p>
            </div>

            {/* Cervical Layer */}
            <div className="bg-card p-6 rounded-2xl ">
              <h2 className="text-2xl font-bold mb-2 text-primaryText">
                Cervical Layer
              </h2>
              <p className="text-secondaryText font-semibold text-base mt-4">
                Industry-leading 1,450 MPa flexural strength provides you with
                that extra assurance that your restoration will withstand the
                constant strain of occlusal forces. Moreover, 63% opacity and
                excellent chroma characteristics allow you to cover those
                challenging anterior aesthetic cases with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LayZir All Indication Layered Zirconia Disc */}
      <section className="continer mx-auto md:px-8  px-4  pb-10 ">
        <div className="flex flex-col items-center">
          <h4 className="text-secondaryBrand text-2xl sm:text-5xl font-bold text-center">
            LayZir All Indication Layered Zirconia Disc
          </h4>
          <span className="mt-20 ">
            <img
              src="/assets/landing-page/layZir4.png"
              alt="imageq"
              className="w-full max-w-[900px] object-contain"
            />
          </span>
        </div>
      </section>

      <FrequentlyAskedQuestion />
      <UpperFooter />
      <Footer />
    </div>
  );
}

export default LayZirPage;
