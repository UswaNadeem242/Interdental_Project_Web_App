import React from "react";
import Brands from "./Brands";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const HeroSection = () => {
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
          navigation={true}
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
          {/* <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide> */}
        </Swiper>
      </div>
      <Brands />
    </div>
  );
};

export default HeroSection;
