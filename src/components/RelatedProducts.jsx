import React, { useRef, useState } from "react";
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
import Icons from "./Icons";

const RelatedProducts = ({ relatedProducts }) => {
   const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className="flex flex-col justify-start items-start w-full py-4 h-auto gap-6 md:gap-10">
      <h1 className="font-poppins font-semibold text-xl md:text-2xl text-[#1A1A1A] px-4 md:px-0">
        Related Products
      </h1>
      {relatedProducts?.data && relatedProducts?.data?.length > 0 ? (
        <div className="flex w-full min-h-[350px] md:min-h-[388px]">
          <div className="relative flex w-full px-4 md:px-0">
            <Swiper
              ref={swiperRef}
              spaceBetween={16}
              slidesPerView={1}
              centeredSlides={false}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSwiper={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="w-full h-full flex justify-center items-center text-center"
            >
              {[...relatedProducts?.data]?.map((product) => (
                <SwiperSlide key={product?.productId}>
                  <div
                    onClick={() => navigate(`/shop/${product?.productId}`)}
                    onMouseEnter={() =>
                      swiperRef.current.swiper.autoplay.stop()
                    }
                    onMouseLeave={() =>
                      swiperRef.current.swiper.autoplay.start()
                    }
                    className="flex flex-col justify-center items-center cursor-pointer bg-white w-full max-w-[283.15px] mx-auto h-[340px] sm:h-[366px] p-4 space-y-4 sm:space-y-6 border-[1px] border-[#0000000D] rounded-[16px] hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={product?.imageUrls[0]}
                      alt={product?.name}
                      className="w-full max-w-[263.15px] h-[200px] sm:h-[260.45px] object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <h1 className="font-poppins font-semibold text-sm sm:text-[16px] leading-tight text-black text-center line-clamp-2 px-2">
                        {product?.name}
                      </h1>
                      <h1 className="font-poppins font-bold text-lg sm:text-[20px] leading-[30px] text-[#94D3DD]">
                        ${product?.price}
                      </h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons - Hidden on mobile */}
            <button 
              className={`swiper-button-prev-custom hidden md:flex absolute -left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 lg:w-16 lg:h-16 rounded-full shadow-lg items-center justify-center transition-colors ${
                isBeginning 
                  ? 'bg-gray-100 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-50 cursor-pointer'
              }`}
              disabled={isBeginning}
            >
              <Icons.Arrow.Left className={`w-6 h-6 lg:w-8 lg:h-8 ${isBeginning ? 'text-gray-400' : 'text-gray-700'}`} />
            </button>
            
             <button 
               className={`swiper-button-next-custom hidden md:flex absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 lg:w-16 lg:h-16 rounded-full shadow-lg items-center justify-center transition-colors ${
                 isEnd 
                   ? 'bg-gray-100 cursor-not-allowed' 
                   : 'bg-white hover:bg-gray-50 cursor-pointer'
               }`}
               disabled={isEnd}
             >
               <Icons.Arrow.Right className={`w-6 h-6 lg:w-8 lg:h-8 ${isEnd ? 'text-gray-400' : 'text-gray-700'}`} />
             </button>
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
