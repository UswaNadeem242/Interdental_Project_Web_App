import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";
import product6 from "../assets/product6.png";
import product7 from "../assets/product7.png";
import product8 from "../assets/product8.png";
import { useNavigate } from "react-router-dom";

const RelatedProducts = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const relatedProducts = [
    {
      id: 1,
      img: product1,
      title: "G Gold Lable 1 Mini",
      price: 233.65,
    },
    {
      id: 2,
      img: product2,
      title: "G Gold Lable 1 Mini",
      price: 739.65,
    },
    {
      id: 3,
      img: product3,
      title: "G Gold Lable 1 Mini",
      price: 634.23,
    },
    {
      id: 4,
      img: product4,
      title: "G Gold Lable 1 Mini",
      price: 634.23,
    },
    {
      id: 5,
      img: product5,
      title: "G Gold Lable 1 Mini",
      price: 634.23,
    },
    {
      id: 6,
      img: product6,
      title: "G Gold Lable 1 Mini",
      price: 634.23,
    },
    {
      id: 7,
      img: product7,
      title: "G Gold Lable 1 Mini",
      price: 634.23,
    },
    {
      id: 8,
      img: product8,
      title: "G Gold Lable 1 Mini",
      price: 634.23,
    },
  ];
  return (
    <div className="flex flex-col justify-start items-start w-full h-[464.17px] gap-[40px]">
      <h1 className="font-poppins font-semibold text-[30.46px] text-[#1A1A1A]">
        Related Products
      </h1>
      <div className="flex w-[1312px] h-[388px] gap-[31px]">
        <div className="flex w-[92%] h-[386px] gap-[31px]">
          <Swiper
            ref={swiperRef}
            spaceBetween={24}
            slidesPerView={4}
            centeredSlides={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-[100%] h-[100%] flex justify-center items-center text-center"
          >
            {relatedProducts.map((product) => (
              <SwiperSlide>
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
                  onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
                  className="flex flex-col justify-center items-center cursor-pointer bg-white w-[283.15px] h-[366px]  space-y-[24px] border-[1px] border-[#0000000D] rounded-[16px]"
                >
                  <img
                    src={product.img}
                    alt="product"
                    className="w-[263.15px] h-[260.45px]"
                  />
                  <div className="flex flex-col justify-center items-center space-y-[7.55px]">
                    <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-black">
                      {product.title}
                    </h1>
                    <h1 className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD]">
                      ${product.price}
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
