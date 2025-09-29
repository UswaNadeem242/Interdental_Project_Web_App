import Header from "../header";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";
import {
  insideContent,
  shadesProductMultiPro,
  teethOptionMutiple,
} from "../../../Constant";
import Shades from "../../../Common/product-landing/shades-product-landing";
import FrequentlyAskedQuestion from "../../../components/frequently-asked-question";

function Multilayerpro({ isLanding }) {
  return (
    <div>
      <div className="pb-20">{!isLanding && <Header />} </div>
      <section className="container mx-auto  pb-10">
        <div className="w-full pt-10">
          <img
            src="/assets/landing-page/multiPro.png"
            alt="img3"
            className="w-full h-auto object-fit md:px-48"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-2 py-12 px-6 bg-bgWhite font-poppins">
          {/* Left Image */}

          <div className="col-span-4 flex justify-center items-center  ">
            <img
              src="/assets/landing-page/multi2.png"
              alt="imagemulti"
              className="w-auto h-[80%] object-contain  md:block hidden"
            />
          </div>
          <div className="col-span-4 flex flex-col justify-center px-6 ">
            <h3 className="text-secondaryBrand font-bold  font-poppins text-2xl md:text-4xl ">
              Multilayer 4D pro
            </h3>

            <p className="text-secondaryText text-lg md:text-2xl font-medium mt-10">
              Our advanced 4D Pro Zirconia disc features an unparalleled
              four-dimensional gradient that seamlessly integrates color,
              translucency, strength, and hardness, making it an optimal choice
              for any dental laboratory. 4D Pro Zirconia not only elevates the
              quality of all-ceramic dentures but also ensures a streamlined,
              efficient, and precise workflow for dental professionals.
            </p>
          </div>
        </div>
      </section>

      {/* */}
      <section className="continer mx-auto md:px-8 px-4  pb-10">
        <div className="flex items-center justify-center  p-8 md:mx-16">
          <div className="w-full  px-6 py-8  rounded-2xl border">
            <div className="space-y-8 font-poppins">
              {/* Bionic Section */}
              {
                insideContent?.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <h2 className="text-xl sm:text-lg font-semibold text-black pb-5">
                        {item?.title}
                      </h2>
                      <p className="text-secondaryText text-lg font-normal leading-relaxed">
                        {item?.description}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>
      <section className="continer mx-auto md:px-8 px-4  pb-10">
        <div className="flex flex-col items-center justify-center min-h-screen bg-bgWhite p-8 font-poppins">
          <div className="space-y-8 md:mx-16">
            {/* Advanced Multilayer Technology Section */}
            <div className="p-6 rounded-2xl bg-card">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#434343]">
                ADVANCED MULTILAYER TECHNOLOGY
              </h2>
              <p className="text-secondaryText leading-relaxed mb-4 text-lg font-normal">
                Developed With The Concept Of "Natural As Real Teeth", 4D Pro
                Zirconia Accurately Reflects The Color And Translucency Of
                Natural Teeth. The Translucency Decreases From The Incisal Edge
                To The Cervical Area (57%-43%), While The Hardness And Strength
                Increase Progressively From The Incisal Edge To The Cervical
                Area (700-1200 MPa).
              </p>
              <ul className="list-disc list-inside space-y-2 text-secondaryText text-lg font-normal leading-relaxed">
                <li>
                  Enamel Layer: The Lower Hardness And Strength At The Incisal
                  Edge Protect Opposing Teeth During Occlusion, While
                  Maintaining The Realistic Translucency Of Natural Enamel.
                </li>
                <li>
                  Middle Layer: A Seamless Transition Of Color, Translucency,
                  Strength, And Hardness From The Incisal Edge To The Cervical
                  Area Ensures Excellent Aesthetic Outcomes.
                </li>
                <li>
                  Cervical Layer: The Higher Hardness And Strength At The
                  Cervical Area Guarantee Long-Term Durability, Preventing
                  Chipping Or Cracking, While The Lower Translucency Effectively
                  Masks Any Underlying Color.
                </li>
              </ul>
            </div>

            {/* Exceptional Aesthetics Section */}
            <div className="p-6 rounded-2xl bg-card">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#434343]">
                EXCEPTIONAL AESTHETICS
              </h2>
              <p className="text-secondaryText leading-relaxed text-lg font-normal">
                The Translucency Gradually Decreases From The Incisal Edge To
                The Cervical Area (57%-43%), Achieving A Natural-Looking
                Transparency At The Incisal Edge While Effectively Masking
                Underlying Colors At The Cervical Area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="continer mx-auto md:px-8 px-4 ">
        <div className="flex justify-center">
          <h2 className="font-poppins text-black md:text-4xl text-base pb-10">
            {" "}
            Recommended <span className="text-fouthBrand font-bold">Indications</span>
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

      {/* <section className="container mx-auto md:px-8 px-4 py-10 md:py-20"></section> */}

      <section className="container  mx-auto  px-4 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-10">
            <Shades
              shades={shadesProductMultiPro}
              title="Shades"
              className='lg:grid-cols-8'
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

export default Multilayerpro;
