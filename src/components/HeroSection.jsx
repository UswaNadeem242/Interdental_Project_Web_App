import React, { useEffect, useState } from "react";
import Brands from "./Brands";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { BASE_URL } from "../config";

const HeroSection = () => {
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners/getallBanners`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBanners(response.data.banners);
     } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center w-[1512px] h-[740px] bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600]">
      <div className="w-[1312px] h-[424.49px] relative overflow-hidden top-[60px] gap-[64px] rounded-[16px] bg-green-300">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-[100%] h-[100%] flex justify-center items-center text-center"
        >
          <SwiperSlide>
            <img
              className="object-cover h-[100%] w-[100%] overflow-hidden rounded-[16px]"
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
              alt="img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover h-[100%] w-[100%] overflow-hidden rounded-[16px]"
              src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"
              alt="img"
            />
          </SwiperSlide>
          {/* Navigation Buttons */}
          <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black p-2 rounded-full w-[82px] h-[82px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-[44px] h-[44px] text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black p-2 rounded-full w-[82px] h-[82px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-[44px] h-[44px] text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Swiper>
      </div>
      <Brands />
    </div>
  );
};

export default HeroSection;
