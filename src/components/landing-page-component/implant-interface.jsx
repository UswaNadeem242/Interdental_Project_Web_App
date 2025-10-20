import CircleTrickIcon from "../../icon/circle-trick-icon";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ThirdButtonUI } from "../../Common/Button";
function ImplantInterfeace() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center md:px-16 px-4 py-20 bg-textField">
        <div className="flex justify-center">
          <img
            src="/assets/landing-page/landing 3.png"
            alt="Doctor Enrollment"
            className="w-full max-w-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-sm  text-black md:text-3xl font-bold font-poppins  ">
            <span className="text-fouthBrand">Implant</span>{" "}
            <span className="text-secondaryBrand">Interface</span>
          </h1>
          <p className="text-xl font-normal font-poppins text-black">
            Benefit for dentists:
          </p>
          <ul className="flex flex-col space-y-1">
            <li className="flex items-start gap-3  p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Easy online ordering for parts.
            </li>
            <li className="flex items-start gap-3  p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Eliminates errors in size and brand selection.
            </li>
            <li className="flex items-start gap-3  p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Makes your workflow more efficient.
            </li>
            <li className="flex items-start gap-3  p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
              Case and parts are bundled and sent together to the lab.
            </li>
          </ul>
          <ThirdButtonUI title="Order Smarter" />
        </div>
      </section>
    </div>
  );
}

export default ImplantInterfeace;
