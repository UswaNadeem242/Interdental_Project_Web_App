import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { tabs } from "../../Constant";
import FrequentlyAskedQuestion from "../../components/frequently-asked-question";
import UpperFooter from "../../components/upper-footer";
import Footer from "../../components/Footer";
import Header from "./header";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ContributeBlogSection from "../../components/landing-page-component/contribute-blog-section.jsx";
import ContributeBlogModal from "../../modals/ContributeBlogModal.jsx";
import api from "../../api/intercepter";

function Blog({ isLanding }) {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dynamicTabs, setDynamicTabs] = useState([]);
  const cardsPerPage = 6;

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/api/blog");
        const blogData = response.data?.data || [];
        setBlogs(blogData);

        // Generate dynamic tabs from blog categories
        const categories = [...new Set(blogData.map(blog => blog.categoryName).filter(Boolean))];
        const tabs = [
          { id: "all", label: "All Topics" },
          ...categories.map(category => ({
            id: category.toLowerCase().replace(/\s+/g, '-'),
            label: category
          }))
        ];
        setDynamicTabs(tabs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
        setBlogs([]);
        setDynamicTabs([{ id: "all", label: "All Topics" }]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search and active tab
  const filteredCards = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.content?.toLowerCase().includes(search.toLowerCase()) ||
      blog.categoryName?.toLowerCase().includes(search.toLowerCase());

    // If "All Topics" is selected, show all blogs
    if (activeTab === "all") {
      return matchesSearch;
    }

    // Filter by category if not "All Topics"
    const matchesCategory = blog.categoryName?.toLowerCase() === activeTab.replace(/-/g, ' ');
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);


  return (
    <div className="">
      {!isLanding && <Header />}
      <div className="bg-blue-300/5">


        <section className="lg:pt-32 pt-20">
          <div className="max-w-7xl mx-auto px-4 ">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondaryBrand font-bold font-poppins mb-6">
                Blog{""}{" "}<span className="text-primaryText">&</span>{" "}
                <span className="text-fouthBrand">Articles</span>
              </h1>
              <p className="text-base sm:text-lg text-primaryText font-normal font-poppins mb-8">
                Read our interesting blog
              </p>
            </div>
            {/* Dynamic Tabs */}
            {!loading && dynamicTabs.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                {dynamicTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full font-poppins text-sm sm:text-base transition-colors duration-200 ${activeTab === tab.id
                        ? "bg-fouthBrand text-white"
                        : "text-secondaryText border-secondaryText border hover:bg-gray-50"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Search bar */}
            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-md">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-full pl-12 pr-6 py-4 text-base outline-none placeholder:font-poppins font-poppins focus:ring-2 focus:ring-fouthBrand focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="max-w-7xl mx-auto px-4 pb-20">
            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md animate-pulse">
                    <div className="h-48 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded w-32"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-12 sm:py-16">
                <p className="text-red-600 font-poppins text-base sm:text-lg mb-4">{error}</p>
                <p className="text-gray-500 font-poppins text-sm sm:text-base">Using fallback content...</p>
              </div>
            )}

            {/* Cards */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                {filteredCards && filteredCards.length > 0 ? (
                  filteredCards
                    .slice(startIndex, startIndex + cardsPerPage)
                    .map((blog, index) => {
                      return (
                        <Link
                          key={blog.id}
                          to={`/blogs/${blog.id}`}
                          className="block w-full max-w-sm bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondaryBrand transform hover:-translate-y-1"
                        >
                          <img
                            src={blog.imageUrl?.[0] || "/assets/landing-page/card 3.png"}
                            alt={blog.title || "Blog card"}
                            className="w-full h-48 object-contain rounded mb-4"
                          />
                          <h3 className="text-sm font-medium font-poppins uppercase text-fouthBrand mb-2">
                            {blog.categoryName || "Blog"}
                          </h3>
                          <p className="text-xl font-normal font-poppins capitalize mb-4 line-clamp-2">
                            {blog.title}
                          </p>

                          {/* style the Link like a button (avoid nested button-inside-link) */}
                          <span className="inline-flex justify-start items-center w-fit rounded-full border-2 border-fouthBrand gap-4  px-4 py-2 hover:bg-fouthBrand hover:text-white transition-colors duration-200">
                            <span className="font-poppins font-semibold text-base text-[#434343]">
                              Read More
                            </span>
                            <span className="rounded-full bg-secondaryBrand text-white p-2">
                              <ArrowRightIcon className="w-4 h-4" />
                            </span>
                          </span>
                        </Link>
                      );
                    })
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 font-poppins text-lg">
                      {loading ? "Loading blogs..." : "No results found."}
                    </p>
                  </div>
                )}
              </div>
            )}
            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center mt-16 gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-3 rounded-full bg-fouthBrand disabled:opacity-50 hover:bg-opacity-80 transition-colors duration-200"
                >
                  <ArrowLeftIcon className="w-5 h-5 text-white stroke-current" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-3 border-fouthBrand border rounded-full text-base font-poppins transition-colors duration-200 ${currentPage === i + 1
                        ? "bg-fouthBrand text-white"
                        : "hover:bg-fouthBrand hover:text-white"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-3 rounded-full bg-fouthBrand disabled:opacity-50 hover:bg-opacity-80 transition-colors duration-200"
                >
                  <ArrowRightIcon className="w-5 h-5 text-white stroke-current" />
                </button>
              </div>
            )}
          </div>
        </section>
        <ContributeBlogSection
          onOpenModal={() => setIsContributeModalOpen(true)}
        />
        <FrequentlyAskedQuestion />
        <UpperFooter />
        <Footer />

        {/* Contribute Blog Modal */}
        {isContributeModalOpen && (
          <ContributeBlogModal
            isModalOpen={isContributeModalOpen}
            setIsModalOpen={setIsContributeModalOpen}
          />
        )}
      </div>
    </div>
  );
}

export default Blog;
