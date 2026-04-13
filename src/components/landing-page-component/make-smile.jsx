 import { ThirdButtonUI } from "../../Common/Button";

function MakeSmile() { 
  return (
    <div>
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center py-10">
        <div className="flex-1 flex justify-center lg:justify-start">
          <img
            src="/assets/landing-page/landing 2.png"
            alt="Doctor Enrollment"
            className="w-full max-w-lg h-auto rounded-lg object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold font-poppins">
            <span className="text-fouthBrand">MakeMeSmile</span>{" "}
            <span className="text-secondaryBrand">Warranty (MMS)</span>
          </h1>
          <p className="text-base md:text-lg font-normal font-poppins text-black">
            Benefit for dentists:
          </p>
          <ul className="flex flex-col space-y-2">
            <li className="flex items-start gap-3 bg-gray-100 p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Provides patients with peace of mind and trust.
            </li>

            <li className="flex items-start gap-3 bg-gray-100 p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Dentist saves money with lab bill discounts.
            </li>

            <li className="flex items-start gap-3 bg-gray-100 p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              No disputes over who pays if a crown or implant breaks.
            </li>

            <li className="flex items-start gap-3 bg-gray-100 p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Builds loyalty and professionalism in the practice.
            </li>
          </ul>

          <ThirdButtonUI
          href="/patient"
          title="Protect Your Smile" />
        </div>
      </section>
    </div>
  );
}

export default MakeSmile;
