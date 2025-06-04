import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
// import brand1 from "../assets/brand1.png";
// import brand2 from "../assets/brand2.png";
// import brand3 from "../assets/brand3.png";
// import brand4 from "../assets/brand4.png";
// import brand5 from "../assets/brand5.png";
// import brand6 from "../assets/brand6.png";

const Brands = () => {
  const [brandsList, setBrandsList] = useState([]);
  const brands = [
    {
      logo: "/build/assets/brand1.png",
    },
    {
      logo: "/build/assets/brand2.png",
    },
    {
      logo: "/build/assets/brand3.png",
    },
    {
      logo: "/build/assets/brand4.png",
    },
    {
      logo: "/build/assets/brand5.png",
    },
    {
      logo: "/build/assets/brand6.png",
    },
  ];

  const getAllBrands = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/brands?page=0&size=10`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBrandsList(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center w-[1306px] h-[205px] space-y-[24px]">
        <h1 className="font-workSans font-semibold text-[20px] leading-[23.46px] text-black">
          BRANDS
        </h1>
        <div className="flex justify-center items-center w-[1282px] h-[158px] gap-[21.72px]">
          {brandsList.map((brand) => (
            <div
              key={brand.id}
              className="flex justify-center items-center overflow-hidden bg-white rounded-[28.97px] gap-[21.72px] p-[10.86px] w-[195.56px] h-[158px] shadow-[0_4px_8px_0_rgba(0,0,0,0.05)]"
            >
              <img src={brand.logoUrl} alt="brands" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
