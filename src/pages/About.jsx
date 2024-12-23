import React, { useState } from "react";
// import about from "../assets/about.png";
import AccountRequiredModal from "../modals/AccountRequiredModal";
const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      <div className="flex justify-center items-center w-[1511px] h-[814px] border-t-[1px] border-[#0000001A] bg-[#FFFFFF] py-[132px] px-[100px] gap-[120px]">
        <img
          src="/build/assets/about.png"
          alt="about us image"
          className="w-[550px] h-[550px]"
        />
        <div className="flex flex-col justify-start items-start w-[575px] h-[398.73px] space-y-[16px]">
          <h1 className="font-poppins font-bold text-[24px] leading-[36px] text-[#949494]">
            About Us
          </h1>
          <div className="flex justify-start items-center gap-4 font-poppins font-bold text-[54px] leading-[81px]">
            <h1 className="text-secondaryBrand">interdental</h1>
            <h1 className="text-[#94D3DD]">Lab</h1>
          </div>
          <h1 className="w-[432px] h-[180px] font-poppins font-normal text-[20px] text-[#949494] leading-[30px]">
            With years of expertise, we are dedicated to pushing the boundaries
            of dental restoration. Our team brings precision and passion to
            every case, crafting beautiful, functional smiles with a commitment
            to excellence.
          </h1>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center items-center w-[172.7px] h-[53.73px] rounded-[50.7px] border-[1.81px] border-[#94D3DD] gap-[24px] p-[8px]"
          >
            <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
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

      <div className="flex justify-center items-center w-[1512px] h-[818px] border-t-[1px] border-[#0000001A] bg-[#F8F8F8] py-[124px] px-[100px] gap-[32px]">
        <div className="flex flex-col justify-start items-start w-[1312px] h-[570px] gap-[64px]">
          <div className="flex justify-center items-center gap-4 ">
            <h1 className="font-poppins font-normal text-[48px] leading-[72px]">
              Why
            </h1>
            <h1 className="font-poppins font-bold text-[48px] leading-[72px] text-secondaryBrand">
              Interdental
            </h1>
            <h1 className="font-poppins font-bold text-[48px] leading-[72px] text-[#94D3DD]">
              lab
            </h1>
          </div>
          <div className="flex flex-col justify-start items-start w-[1312px] h-[434px] space-y-[16px]">
            <div className="flex flex-col justify-start items-start w-[1312px] h-[124px] rounded-[16px] border-[1px] border-[#0000001A] space-y-[16px] p-[24px]">
              <h1 className="text-[#434343] font-poppins font-bold text-[20px] leading-[30px]">
                Encourage feedback
              </h1>
              <h1 className="font-poppins font-normal text-[20px] leading-[30px] text-[#949494] w-[1264px] h-auto">
                “We encourage feedback” to ensure even higher standards.
              </h1>
            </div>
            <div className="flex flex-col justify-start items-start w-[1312px] h-[124px] rounded-[16px] border-[1px] border-[#0000001A] space-y-[16px] p-[24px]">
              <h1 className="text-[#434343] font-poppins font-bold text-[20px] leading-[30px]">
                Quality services
              </h1>
              <h1 className="font-poppins font-normal text-[20px] leading-[30px] text-[#949494] w-[1264px] h-auto">
                We are proud to provide quality services, high standard products
                at realistic prices.
              </h1>
            </div>
            <div className="flex flex-col justify-start items-start w-[1312px] h-[154px] rounded-[16px] border-[1px] border-[#0000001A] space-y-[16px] p-[24px]">
              <h1 className="text-[#434343] font-poppins font-bold text-[20px] leading-[30px]">
                Products support
              </h1>
              <h1 className="font-poppins font-normal text-[20px] leading-[30px] text-[#949494] w-[1264px] h-auto">
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
    </div>
  );
};

export default About;
