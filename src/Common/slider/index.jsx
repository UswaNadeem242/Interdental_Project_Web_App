
import Slider from "react-slick";
export default function ProductCarousel({ items = [] }) {
  if (!items || items.length === 0) return null;
  const n = items.length;
  const safeShow = (target) => {
    if (n <= 1) return 1;      // single slide
    if (n <= target) return n - 1; // never show all at once
    return target;
  };
  const showDesktop = safeShow(4);
  const showLaptop = safeShow(3);
  const showTablet = safeShow(2);
  const settings = {
    dots: true,
    arrows: false,
    infinite: n > 1,
    slidesToShow: showDesktop,
    slidesToScroll: 1,
    speed: 500,
    autoplay: n > 1,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    cssEase: "ease",
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: showLaptop, slidesToScroll: 1, dots: true } },
      { breakpoint: 1024, settings: { slidesToShow: showTablet, slidesToScroll: 1, dots: true } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } },
    ],
  };

  return (
    <section className="w-full py-10">
      <style>{`
        .slick-dots { bottom: -28px !important; }
        ..slick-dots li button {margin-top:'30px'}
        .slick-dots li button:before { font-size: 11px; color: #9ca3af; opacity: .6; }
        .slick-dots li.slick-active button:before { color: #001D58; opacity: 1; }
        .slick-slider { overflow: visible; }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index} className="px-2">
              <div className="rounded-2xl bg-white border  transition">
                <div className="p-5">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white">
                    <img
                      src={item.img ?? item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 text-center text-sm font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="mt-1 text-center text-xs text-gray-500">{item.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
