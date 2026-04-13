import { ThirdButtonUI } from "../../Common/Button";
function ImplantInterfeace() { 
  return (
    <div>
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center py-12 md:py-16 bg-textField rounded-2xl px-4 md:px-12">
        <div className="flex-1 flex justify-center lg:justify-start">
          <img
            src="/assets/landing-page/landing 3.png"
            alt="Doctor Enrollment"
            className="w-full max-w-lg h-auto object-cover"
          />
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-black font-bold font-poppins">
            <span className="text-fouthBrand">Implant</span>{" "}
            <span className="text-secondaryBrand">Interface</span>
          </h1>
          <p className="text-base md:text-lg font-normal font-poppins text-black">
            Benefit for dentists:
          </p>
          <ul className="flex flex-col space-y-2">
            <li className="flex items-start gap-3 p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Easy online ordering for parts.
            </li>
            <li className="flex items-start gap-3 p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Eliminates errors in size and brand selection.
            </li>
            <li className="flex items-start gap-3 p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Makes your workflow more efficient.
            </li>
            <li className="flex items-start gap-3 p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Case and parts are bundled and sent together to the lab.
            </li>
          </ul>
          <ThirdButtonUI title="Order Smarter" href="/signup" />
        </div>
      </section>
    </div>
  );
}

export default ImplantInterfeace;
