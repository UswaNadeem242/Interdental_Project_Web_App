import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import product1 from "../assets/product1.png";
// import product2 from "../assets/product2.png";
// import product3 from "../assets/product3.png";
// import product4 from "../assets/product4.png";
// import product5 from "../assets/product5.png";
// import product6 from "../assets/product6.png";
// import product7 from "../assets/product7.png";
// import product8 from "../assets/product8.png";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ relatedProducts }) => {
  console.log(relatedProducts?.data, "{related}");
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  // const relatedProducts = [
  //   {
  //     id: 1,
  //     img: "/assets/product1.png",
  //     title: "G Gold Lable 1 Mini",
  //     price: 233.65,
  //   },
  //   {
  //     id: 2,
  //     img: "/assets/product2.png",
  //     title: "G Gold Lable 1 Mini",
  //     price: 739.65,
  //   },
  //   {
  //     id: 3,
  //     img: "/assets/product3.png",
  //     title: "G Gold Lable 1 Mini",
  //     price: 634.23,
  //   },
  //   {
  //     id: 4,
  //     img: "/assets/product4.png",
  //     title: "G Gold Lable 1 Mini",
  //     price: 634.23,
  //   },
  //   {
  //     id: 5,
  //     img: "/assets/product5.png",
  //     title: "G Gold Lable 1 Mini",
  //     price: 634.23,
  //   },
  //   {
  //     id: 6,
  //     img: "/assets/product6.png",
  //     title: "G Gold Lable 1 Mini",
  //     price: 634.23,
  //   },
  //   {
  //     id: 7,
  //     img: "/assets/product7.png",
  //     title: "G Gold Lable 1 Mini",
  //     price: 634.23,
  //   },
  //   {
  //     id: 8,
  //     img: "/assets/product8.png",
  //     title: "G Gold Lable 1 Mini",
  //     price: 634.23,
  //   },
  // ];
  return (
    <div className="flex flex-col justify-start items-start w-full py-4 h-auto gap-[40px]">
      <h1 className="font-poppins font-semibold text-2xl text-[#1A1A1A]">
        Related Products
      </h1>
      {relatedProducts?.data && relatedProducts?.data?.length > 0 ? (
        <div className="flex w-full h-[388px] gap-[31px]">
          <div className="flex w-full h-[386px] gap-[31px]">
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
              {relatedProducts?.data?.map((product) => (
                <SwiperSlide key={product?.productId}>
                  <div
                    onClick={() => navigate(`/shop/${product?.productId}`)}
                    onMouseEnter={() =>
                      swiperRef.current.swiper.autoplay.stop()
                    }
                    onMouseLeave={() =>
                      swiperRef.current.swiper.autoplay.start()
                    }
                    className="flex flex-col justify-center items-center cursor-pointer bg-white w-[283.15px] h-[366px]  space-y-[24px] border-[1px] border-[#0000000D] rounded-[16px]"
                  >
                    <img
                      src={product?.imageUrls[0]}
                      alt="product"
                      className="w-[263.15px] h-[260.45px]"
                    />
                    <div className="flex flex-col justify-center items-center space-y-[7.55px]">
                      <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-black">
                        {product?.name}
                      </h1>
                      <h1 className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD]">
                        ${product?.price}
                      </h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 w-full h-[388px]">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">
                No Related Products
              </h3>
              <p className="text-gray-600 text-sm font-poppins leading-relaxed">
                There are no related products available for this item at the
                moment. Check back later for recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
