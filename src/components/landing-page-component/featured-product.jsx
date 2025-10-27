import ProductCarousel from "../../Common/slider";

const products = [
  {
    title: "ARGEN PMMA",
    image: "/assets/landing-page/teeth.png",
    route: "/product/argen-pmma",
  },
  {
    title: "MULTILAYER PRO",
    image: "/assets/landing-page/product2.png",
    route: "/product/multilayer-pro",
  },
  {
    title: "ARGEN Z ST MULTILAYER",
    image: "/assets/landing-page/product3.png",
    route: "/product/argenz-st",
  },
  {
    title: "ZirCad Ivoclar",
    image: "/assets/landing-page/product4.png",
    route: "/product/zidcard-ivoclar",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="w-full flex justify-center px-4">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal font-poppins">
              Our{" "}
              <span className="text-secondaryBrand font-bold font-poppins">
                Featured
              </span>{" "}
              <span className="text-fouthBrand font-bold font-poppins">
                Products
              </span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-500">
              Explore our top-rated selections crafted just for you!
            </p>
          </div>

          <ProductCarousel
            items={products}
            slidesDesktop={3}
            slidesLaptop={3}
            slidesTablet={2}
            slidesPhone={1}
            autoplay={false}
            dots={true}
            centerMode={false}
          />
        </div>
      </div>
    </section>
  );
}
