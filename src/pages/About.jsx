import React, { useState } from "react";
import AccountRequiredModal from "../modals/AccountRequiredModal";
import Header from "./landing-page/header";
import Footer from "../components/Footer";

const About = ({ isLanding }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-[1511px] h-auto sm:h-[814px] border-t-[1px] border-[#0000001A] bg-[#FFFFFF] py-8 sm:py-12 md:py-16 lg:py-[132px] px-4 sm:px-6 md:px-8 lg:px-[100px] gap-4 sm:gap-8 lg:gap-[120px]">

          <img
            src="/assets/landing-page/about-us-1.png"
            alt="about us image"
            className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[550px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]"
          />
          <div className="flex flex-col justify-start items-start w-full max-w-[575px] h-auto sm:h-[398.73px] space-y-4 sm:space-y-[16px] px-4 sm:px-0">
            <h1 className="font-poppins font-bold text-lg sm:text-xl md:text-sm lg:text-lg leading-6 sm:leading-7 md:leading-8 lg:leading-[36px] text-[#949494]">
              About Us
            </h1>
            <div className="flex justify-start items-center gap-2 sm:gap-4 font-poppins font-bold  sm:text-sm md:text-3xl leading-8 sm:leading-9 md:leading-10 lg:leading-[81px]">
              <h1 className="text-secondaryBrand">interdental</h1>
              <h1 className="text-[#94D3DD]">Lab</h1>
            </div>
            <h1 className="w-full max-w-[432px] h-auto sm:h-[180px] font-poppins font-normal  text-sm md:text-lg text-[#949494] leading-5 sm:leading-6 md:leading-7 lg:leading-[30px]">
              With years of expertise, we are dedicated to pushing the
              boundaries of dental restoration. Our team brings precision and
              passion to every case, crafting beautiful, functional smiles with
              a commitment to excellence.
            </h1>
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-[1.81px] border-[#94D3DD] gap-4 sm:gap-[24px] p-2 sm:p-[8px]"
            >
              <h1 className="font-poppins font-semibold text-sm md:text-lg leading-4 sm:leading-5 lg:leading-[21px] text-[#434343]">
                View More
              </h1>
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.970703"
                  y="0.63623"
                  width="37.7273"
                  height="37.7273"
                  rx="18.8636"
                  fill="#001D58"
                />
                <path
                  d="M21.1644 16.3588C20.8993 16.0936 20.8993 15.6637 21.1644 15.3986C21.4296 15.1334 21.8595 15.1334 22.1246 15.3986L25.7459 19.0198C26.011 19.2849 26.011 19.7148 25.7459 19.98L22.1246 23.6012C21.8595 23.8664 21.4296 23.8664 21.1644 23.6012C20.8993 23.3361 20.8993 22.9062 21.1644 22.641L23.6265 20.1789H14.8548C14.4798 20.1789 14.1758 19.8749 14.1758 19.4999C14.1758 19.1249 14.4798 18.8209 14.8548 18.8209H23.6265L21.1644 16.3588Z"
                  fill="white"
                />
              </svg>
            </div>

          </div>
        </div>

        <div className="flex justify-center items-center w-full max-w-[1512px] h-auto sm:h-[818px] border-t-[1px] border-[#0000001A] bg-[#F8F8F8] py-8 sm:py-12 md:py-16 lg:py-[124px] px-4 sm:px-6 md:px-8 lg:px-[100px] gap-4 sm:gap-6 lg:gap-[32px]">
          <div className="flex flex-col justify-start items-start w-full max-w-[1312px] h-auto sm:h-[570px] gap-6 sm:gap-8 lg:gap-[64px]">
            <div className="flex justify-center items-center gap-2 sm:gap-4">
              <h1 className="font-poppins font-normal text-sm md:text-base leading-8 sm:leading-9 md:leading-10 lg:leading-[72px]">
                Why
              </h1>
              <h1 className="font-poppins font-bold text-sm md:text-base leading-8 sm:leading-9 md:leading-10 lg:leading-[72px] text-secondaryBrand">
                Interdental
              </h1>
              <h1 className="font-poppins font-bold text-sm md:text-base leading-8 sm:leading-9 md:leading-10 lg:leading-[72px] text-[#94D3DD]">
                lab
              </h1>
            </div>
            <div className="flex flex-col justify-start items-start w-full max-w-[1312px] h-auto space-y-4 sm:space-y-[16px]">
              <div className="flex flex-col justify-start items-start w-full max-w-[1312px] h-auto sm:h-[124px] rounded-[16px] border-[1px] border-[#0000001A] space-y-4 sm:space-y-[16px] p-4 sm:p-6 lg:p-[24px]">
                <h1 className="text-[#434343] font-poppins font-bold text-sm md:text-lg leading-5 sm:leading-6 md:leading-7 lg:leading-[30px]">
                  Encourage feedback
                </h1>
                <h1 className="font-poppins font-normal text-sm md:text-lg leading-5 sm:leading-6 md:leading-7 lg:leading-[30px] text-[#949494] w-full max-w-[1264px] h-auto">
                  “We encourage feedback” to ensure even higher standards.
                </h1>
              </div>
              <div className="flex flex-col justify-start items-start w-full max-w-[1312px] h-auto sm:h-[124px] rounded-[16px] border-[1px] border-[#0000001A] space-y-4 sm:space-y-[16px] p-4 sm:p-6 lg:p-[24px]">
                <h1 className="text-[#434343] font-poppins font-bold text-sm md:text-lg leading-5 sm:leading-6 md:leading-7 lg:leading-[30px]">
                  Quality services
                </h1>
                <h1 className="font-poppins font-normal text-sm md:text-lg leading-5 sm:leading-6 md:leading-7 lg:leading-[30px] text-[#949494] w-full max-w-[1264px] h-auto">
                  We are proud to provide quality services, high standard
                  products at realistic prices.
                </h1>
              </div>
              <div className="flex flex-col justify-start items-start w-full max-w-[1312px] h-auto sm:h-[154px] rounded-[16px] border-[1px] border-[#0000001A] space-y-4 sm:space-y-[16px] p-4 sm:p-6 lg:p-[24px]">
                <h1 className="text-[#434343] font-poppins font-bold  text-sm md:text-base leading-5 sm:leading-6 md:leading-7 lg:leading-[30px]">
                  Products support
                </h1>
                <h1 className="font-poppins font-normal  text-sm md:text-base leading-5 sm:leading-6 md:leading-7 lg:leading-[30px] text-[#949494] w-full max-w-[1264px] h-auto">
                  We always provide support to our products for customer’s
                  convenience by giving them a complete technical knowledge and
                  practical information.
                </h1>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <AccountRequiredModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {/* {isModalPassword && (
          <ChangePasswordModel
            isModalPassword={isModalPassword}
            setIsModalPassword={setIsModalPassword}
          />
        )} */}
      </div>
      <Footer />
    </>
  );
};

export default About;
