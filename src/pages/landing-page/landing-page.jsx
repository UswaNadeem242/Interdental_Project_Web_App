
import Header from "./header"; 
import AboutUs from "./about-us";
import DoctorComponent from "../../components/landing-page-component";
import { implantCards } from "../../Constant";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import OurModules from "../../components/landing-page-component/our-modules";
import MakeSmile from "../../components/landing-page-component/make-smile";
import ImplantInterfeace from "../../components/landing-page-component/implant-interface";
import FrequentlyAskedQuestion from "../../components/frequently-asked-question";
import FeaturedProducts from "../../components/landing-page-component/featured-product";
import { ThirdButtonUI } from "../../Common/Button";
import ContactFooter from "../../components/contact-footer";
import { useState, useEffect } from "react";
import api from "../../api/intercepter";
import HeroSection from "./hero-section";

const LandingPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsError, setBlogsError] = useState(null);

  // Fetch blogs for landing page
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setBlogsLoading(true);
        setBlogsError(null);

        const response = await api.get("/api/blog", {
          params: {
            page: 0, // First page
            size: 4, // Get first 4 blogs
          }
        });

        const responseData = response.data?.data;
        const blogData = responseData?.data || [];

        setBlogs(blogData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogsError('Failed to load blogs');
        setBlogs([]);
      } finally {
        setBlogsLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <>
      <div>{<Header />} </div>
      <div className="font-poppins min-h-screen text-gray-800">
        <HeroSection />

        {/* About Us Section */}
        <div className="w-full flex justify-center px-4">
          <div className="max-w-7xl w-full">
            <AboutUs />
          </div>
        </div>

        {/* Our Modules Section Header */}
        <div className="w-full flex justify-center px-4 py-8">
          <div className="max-w-7xl w-full flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-poppins capitalize text-center">
              our
              <span className="text-secondaryBrand font-bold capitalize ml-2">
                Modules
              </span>
            </h1>
            <p className="text-secondaryText text-sm md:text-base font-poppins text-center max-w-xl py-4">
              Explore our top-rated selections crafted just for you!
            </p>
          </div>
        </div>

        {/* MakeSmile Section */}
        <div className="w-full flex justify-center px-4">
          <div className="max-w-7xl w-full">
            <MakeSmile />
          </div>
        </div>

        {/* Our Modules Cards Section */}
        <div className="w-full flex justify-center bg-[#F7FCFC] px-4">
          <div className="max-w-7xl w-full">
            <OurModules />
          </div>
        </div>

        {/* Implant Interface Section */}
        <div className="w-full flex justify-center px-4 bg-textField">
          <div className="max-w-7xl w-full">
            <ImplantInterfeace />
          </div>
        </div>

        {/* Featured Products */}
        <FeaturedProducts />

        {/* InterOral.ai Info Section */}
        <div className="w-full flex justify-center px-4 py-8 bg-blue-300/5">
          <div className="max-w-7xl w-full">
            <div className="flex flex-col lg:flex-row gap-8 items-center  py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 rounded-2xl">
              {/* Text Content */}
              <div className="flex-1 space-y-4 flex flex-col justify-center">
                <h1 className="text-secondaryBrand text-2xl md:text-3xl lg:text-4xl font-poppins font-semibold">
                  InterOral.ai
                </h1>
                <p className="font-poppins font-normal text-sm md:text-base text-[#949494] leading-6 md:leading-7">
                  InterOral.ai is an AI-driven platform that seamlessly connects dentists, dental labs, and patients under one secure system. Dentists can submit digital prescriptions, upload scans, and order implant parts, while labs efficiently receive and manage cases. Patients gain added value through extended warranty coverage, ensuring a smooth, connected, and compliant workflow for all.                </p>
                <button className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
                  <h1
                    className="font-poppins font-semibold text-base text-[#434343]"
                    onClick={() => navigate("/about-us")}
                  >
                    Learn more
                  </h1>
                  <div className="rounded-full bg-secondaryBrand text-white p-2">
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </button>
              </div>
              {/* Image */}
              <div className="flex-1 flex justify-center">
                <img
                  src="/assets/landing-page/about-us-1.png"
                  alt="About us"
                  className="w-full max-w-[500px] h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Component */}
        <DoctorComponent />

        {/* Warranty Section */}
        {/* <div className="w-full flex justify-center px-4 py-12 md:py-16">
          <div className="max-w-7xl w-full flex flex-col items-center">
            <h1 className="text-primaryText text-2xl md:text-3xl lg:text-4xl font-normal font-poppins capitalize text-center">
              THE
              <span className="font-bold font-poppins text-secondaryBrand capitalize ml-2">
                WARRANTY
              </span>
            </h1>
            <p className="text-secondaryText text-sm md:text-base font-poppins text-center max-w-3xl py-4">
              Interoral.ai provides peace of mind and a unique practice growth
              opportunity with a comprehensive Warranty Plans and Referal
              Program
            </p>
            <div className="w-full flex justify-center mt-6">
              {warrantyCard.map((card, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col sm:flex-row max-w-3xl w-full"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full sm:w-[250px] md:w-[300px] h-[200px] sm:h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5 p-6 flex-1">
                    <div>
                      <h3 className="text-primaryText text-sm md:text-base font-semibold">
                        {card.title}
                      </h3>
                      <p className="text-fouthBrand text-lg font-bold mb-4">
                        {card.subtitle}
                      </p>

                      <ul className="space-y-2">
                        {card.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex gap-2 items-center text-sm text-secondaryText"
                          >
                            <CircleIcon className="text-secondaryBrand w-4 h-4 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="text-white bg-secondaryBrand text-sm font-semibold capitalize py-3 px-6 rounded-md self-start hover:bg-secondaryBrand/90 transition">
                      Learn more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Blog & Articles Section */}
        <section className="w-full flex justify-center px-4 py-16 md:py-28">
          <div className="max-w-7xl w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h1 className="text-primaryText text-xl md:text-3xl font-bold font-poppins capitalize">
                Blog &
                <span className="text-xl md:text-3xl font-bold font-poppins text-fouthBrand capitalize ml-2">
                  Articles
                </span>
              </h1>
              <ThirdButtonUI title="View All" href="/blog" />
            </div>
            <p className="text-primaryText text-sm text-center md:text-left font-poppins mb-8">
              Read our interesting blogs
            </p>
            {/* Loading State */}
            {blogsLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="w-full max-w-sm h-[400px] bg-white p-6 rounded-lg shadow-md animate-pulse flex flex-col">
                    <div className="h-48 bg-gray-300 rounded mb-4"></div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded mb-4"></div>
                      </div>
                      <div className="h-10 bg-gray-300 rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {blogsError && !blogsLoading && (
              <div className="text-center py-12">
                <p className="text-red-600 font-poppins text-base mb-4">{blogsError}</p>
                <p className="text-gray-500 font-poppins text-sm">Using fallback content...</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center mt-6">
                  {implantCards?.map((card, index) => (
                    <Link
                      key={index}
                      to={card?.href}
                      className="block w-full max-w-sm h-[400px] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondaryBrand transform hover:-translate-y-1 flex flex-col"
                    >
                      <img
                        src={card.img}
                        alt={card.title || "Implant card"}
                        className="w-full h-48 object-contain rounded mb-4"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-medium font-poppins uppercase text-fouthBrand mb-2">
                            {card.title}
                          </h3>
                          <p className="text-xl font-normal font-poppins capitalize mb-4 line-clamp-2">
                            {card.subtitle}
                          </p>
                        </div>
                        {/* style the Link like a button (avoid nested button-inside-link) */}
                        <span className="inline-flex justify-start items-center w-fit rounded-full border-2 border-fouthBrand gap-4 px-4 py-2 hover:bg-fouthBrand hover:text-white transition-colors duration-200">
                          <span className="font-poppins font-semibold text-base text-[#434343]">
                            {card.button}
                          </span>
                          <span className="rounded-full bg-secondaryBrand text-white p-2">
                            <ArrowRightIcon className="w-4 h-4" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Success State - Real Blog Data */}
            {!blogsLoading && !blogsError && blogs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blogs/${blog.id}`}
                    className=" w-full max-w-sm h-[410px] bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondaryBrand transform hover:-translate-y-1 flex flex-col"
                  >
                    <img
                      src={blog.imageUrl?.[0] || "/assets/landing-page/card 3.png"}
                      alt={blog.title || "Blog card"}
                      className="w-full h-48 object-contain rounded mb-4"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium font-poppins uppercase text-fouthBrand mb-2">
                          {blog.categoryName || "Blog"}
                        </h3>
                        <p className="text-xl font-normal flex-1 font-poppins capitalize mb-4 line-clamp-2">
                          {blog.title}
                        </p>
                      </div>
                      {/* style the Link like a button (avoid nested button-inside-link) */}
                      <span className="inline-flex mt-auto justify-start items-center w-fit rounded-full border-2 border-fouthBrand gap-4 px-4 py-2 hover:bg-fouthBrand hover:text-white transition-colors duration-200">
                        <span className="font-poppins font-semibold text-base text-[#434343]">
                          Read More
                        </span>
                        <span className="rounded-full bg-secondaryBrand text-white p-2">
                          <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Blogs State */}
            {!blogsLoading && !blogsError && blogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 font-poppins text-lg mb-4">No blogs available at the moment.</p>
                <p className="text-gray-400 font-poppins text-sm">Check back later for new content!</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ & Contact */}
        <FrequentlyAskedQuestion />
        <ContactFooter className="bg-background" />
      </div>
    </>
  );
};

export default LandingPage;
