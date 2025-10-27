import { ThirdButtonUI } from "../../Common/Button";

function OurModules() {

  return (
    <div className="">
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center py-12 md:py-16 bg-[#F7FCFC] rounded-2xl px-4 md:px-12">
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-poppins">
            <span className="text-fouthBrand"> Dental Lab</span>{" "}
            <span className="text-secondaryBrand">Alliance (DLA)</span>
          </h1>
          <p className="text-base md:text-lg font-normal font-poppins text-primaryText">
            Benefit for dentists:
          </p>
          <ul className="flex flex-col space-y-2">
            <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Access to a nationwide lab network.
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Freedom to choose labs by quality, cost, or speed.
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Transparent pricing and profiles with no hidden surprises.
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Centralized communication with no more phone calls.
            </li>
          </ul>
          <ThirdButtonUI title=" Explore Labs Now" href="/signup" />
        </div>
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/assets/landing-page/landing 1.png"
            alt="Doctor Enrollment"
            className="w-full max-w-lg h-auto object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default OurModules;
