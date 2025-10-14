import { PrimaryButtonUI } from "../../Common/Button";
export default function UpperFooter() {
  return (
    <div className="">
      <div className="flex justify-center py-12">
        <div className="md:px-0 px-4">
          <h1 className="text-secondaryBrand md:text-5xl text-xl text-center font-poppins">
            Join <span className="text-[#94D3DD] font-bold">InterOral.ai</span>{" "}
            Today – Transform Your
            <br />
            <span className="text-[#94D3DD] font-bold">Dental Experience!</span>
          </h1>

          <p className="font-poppins text-[#949494] py-10 text-center md:w-3/5 mx-auto">
            Sign up now to access top-rated dental professionals, personalized
            treatment plans, and exclusive offers for a healthier smile.
          </p>
          <div className="  flex justify-center">
            <PrimaryButtonUI
              title="Join as a Doctor!"
              className="px-20 py-5 rounded-full font-poppins  font-normal text-xs bg-secondaryBrand text-white  shadow "
              href={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
