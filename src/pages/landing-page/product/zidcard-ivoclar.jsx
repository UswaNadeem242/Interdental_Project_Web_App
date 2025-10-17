import Header from "../header";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";

import {
  cardsecondZidCard,
  CardZidcard,
  compositionData,
  newDiameterszidCard,
  newThicknesseszidCard,
  shadesproductzidCard,
  zidCardComponent,
} from "../../../Constant";

import Shades from "../../../Common/product-landing/shades-product-landing";
import Dimensions from "../../../Common/product-landing/dimensions-product-landing";
import { NavLink } from "react-router-dom";
import FrequentlyAskedQuestion from "../../../components/frequently-asked-question";
import BackButton from "../../../components/BackButton";

function ZidcardIvoclar({ isLanding }) {
  const application = [
    { id: 1, text: "Crowns and crown copings" },
    { id: 2, text: "3-unit bridges and bridge frameworks" },
    {
      id: 3,
      text: "C4-unit and multi-unit bridges and bridge frameworks with max. 2 pontics",
    },
    {
      id: 4,
      text: "Crowns and bridges on natural teeth and on implant systems",
    },
  ];
  return (
    <div>
      <div className="pb-20">{!isLanding && <Header />}</div>

      <section className="container mx-auto px-4 pb-10">
        <div className="mt-4">
          <BackButton variant="rounded" className="mb-4" text="Back" />
        </div>
        <div className="w-full md:pt-10">
          <img
            src="/assets/landing-page/1.4.png"
            className="md:w-full h-auto min-w-[384px] object-fit"
          />
        </div>
      </section>

      <section className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-2 py-12">
          {/* Left Image */}
          <div className="col-span-4 flex justify-center items-center">
            <img
              src="/assets/landing-page/product4.png"
              alt="image"
              className="w-auto h-auto object-contain md:block hidden"
            />
          </div>
          {/* Right Content */}
          <div className="col-span-4 flex flex-col justify-center items-center md:items-start mx-0 md:mx-0 text-left">
            <div className="max-w-[510px]">
              <h4 className="text-secondaryBrand md:text-3xl text-lg font-bold font-poppins pb-8">
                ZirCad Ivoclar
              </h4>
              <p className="mt-2 font-poppins text-base md:text-lg text-[#808080] pb-2">
                IPS e.max ZirCAD provides a versatile range of zirconium oxide
                materials for labside CAD/CAM applications. It is used for the
                fabrication of frameworks and full-contour crowns and bridges.
                High strength, thin wall thickness and high esthetics are among
                its hallmarks. IPS e.max ZirCAD Prime is redefining
                all-ceramics. This revolutionary material is characterized by
                exceptional quality and{" "}
                <NavLink to="#" className="text-fouthBrand">
                  Read more...
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-8">
        <div className="grid md:grid-cols-12 grid-col-6 gap-4">
          {CardZidcard?.map((item, id) => (
            <div
              key={id}
              className="md:col-span-4 col-span-6 bg-background p-8 text-center"
            >
              <h3 className="text-secondaryText font-semibold text-base font-poppins pb-6">
                {item?.title}
              </h3>
              <div className="pb-3">
                <p className="text-primaryText font-poppins   text-base">
                  {item?.label1}{" "}
                  <span className="text-secondaryBrand text-base font-semibold">
                    {item?.value1}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-primaryText font-poppins font-semibold text-base">
                  {item?.label2}{" "}
                  <span className="text-secondaryBrand">{item?.value2}</span>
                </p>
              </div>
            </div>
          ))}

          {cardsecondZidCard?.map((item, id) => (
            <div key={id} className="col-span-6 bg-gray-100 p-8 text-center">
              <h3 className="text-secondaryText  font-semibold text-base font-poppins pb-6">
                {item?.title}
              </h3>
              <div className="pb-3">
                <p className="text-primaryText font-poppins  text-base">
                  {item?.label1}{" "}
                  <span className="text-secondaryBrand font-semibold">
                    {item?.value1}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-primaryText font-poppins font-semibold text-base">
                  {item?.label2}{" "}
                  <span className="text-secondaryBrand font-semibold">
                    {item?.value2}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-10">
            <Shades
              shades={shadesproductzidCard}
              title="Shades"
              className="lg:grid-cols-9"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-8 py-10">
        <div className="border border-background p-10 rounded-2xl">
          <div className="pb-4">
            <h1 className="text-2xl font-bold  font-poppins capitalize text-secondaryBrand">
              Applications
            </h1>
          </div>
          <ul className="flex flex-col  list-disc list-inside text-gray-600 text-sm md:text-sm font-poppins space-y-4 ">
            <li className=" bg-background p-3 rounded-md font-poppins font-semibold text-lg text-black">
              Crowns and crown copings
            </li>
            <li className=" bg-background p-3 rounded-md font-poppins font-semibold text-lg text-black">
              3-unit bridges and bridge frameworks
            </li>
            <li className=" bg-background p-3 rounded-md font-poppins font-semibold text-lg text-black">
              4-unit and multi-unit bridges and bridge frameworks with max. 2
              pontics
            </li>
            <li className=" bg-background p-3 rounded-md font-poppins font-semibold text-lg text-black">
              Crowns and bridges on natural teeth and on implant systems
            </li>
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-8 py-10">
        <div className="border border-background p-10 rounded-2xl">
          <div className="pb-4">
            <h1 className="text-2xl font-bold  font-poppins capitalize text-secondaryBrand">
              Recommended fabrication techniques
            </h1>
          </div>
          <ul className="flex flex-col  list-disc list-inside text-gray-600 text-sm md:text-sm font-poppins space-y-4 ">
            <li className=" bg-background p-3 rounded-md font-poppins font-semibold text-lg text-black">
              Staining and glazing
            </li>
            <li className=" bg-background p-3 rounded-md font-poppins font-semibold text-lg text-black">
              Brush infiltration with LT Colouring and Effect liquids
            </li>
            <li className=" bg-background p-3 rounded-md font-poppins font-semibold text-lg text-black">
              Cut-back
            </li>
            <li className=" bg-background p-3 rounded-md font-poppins font-semibold text-lg text-black">
              Layering
            </li>
          </ul>
        </div>
      </section>

      {/* --- Rest of your sections continue here... --- */}

      <FrequentlyAskedQuestion />
      <UpperFooter />
      <Footer />
    </div>
  );
}

export default ZidcardIvoclar;
