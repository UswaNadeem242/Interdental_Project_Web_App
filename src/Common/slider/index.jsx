import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function ProductCarousel({ items = [], slidesDesktop = 3, slidesLaptop = 3, slidesTablet = 2, slidesPhone = 1 }) {
  const navigate = useNavigate();

  const handleProductClick = (item) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full">
      <div className="pb-12">
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesPhone}
          slidesPerGroup={slidesPhone}
          centeredSlides={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            dynamicBullets: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: slidesTablet,
              slidesPerGroup: slidesTablet,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: slidesLaptop,
              slidesPerGroup: slidesLaptop,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: slidesDesktop,
              slidesPerGroup: slidesDesktop,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Pagination]}
          className="w-full"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleProductClick(item)}
                className="flex flex-col items-center cursor-pointer border-[1px] border-[#0000000D] rounded-[16px] w-full h-[340px] space-y-4"
              >
                <div className="w-full h-[250px] flex items-center justify-center">
                  <img
                    src={item.img ?? item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-semibold text-gray-800 leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <style jsx>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 20px !important;
        }
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: #E5E7EB !important;
          opacity: 1 !important;
          margin: 0 6px !important;
        }
        .swiper-pagination-bullet-active {
          background: #3B82F6 !important;
        }
      `}</style>
    </section>
  );
}