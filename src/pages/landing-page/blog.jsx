import React, { useEffect, useState, useCallback } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import FrequentlyAskedQuestion from "../../components/frequently-asked-question";
import UpperFooter from "../../components/upper-footer";
import Footer from "../../components/Footer";
import Header from "./header";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ContributeBlogSection from "../../components/landing-page-component/contribute-blog-section.jsx";
import ContributeBlogModal from "../../modals/ContributeBlogModal.jsx";
import api from "../../api/intercepter";
import { useDebounce } from "../../Hooks/useDebounce";

function Blog({ isLanding }) {
  const [activeTab, setActiveTab] = useState(null); // null means "all"
  const [search, setSearch] = useState("");
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    size: 6,
    totalRecord: 0
  });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/blog/categories");
        const categoryData = response.data?.data || [];
        setCategories(categoryData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Fetch blogs from API with pagination, search, and category filter
  const fetchBlogs = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: page - 1, // API uses 0-based indexing
        size: 6,
      };
      
      // Add search parameter if search is not empty
      if (search) {
        params.search = search;
      }
      
      // Add categoryId parameter if a category is selected
      if (activeTab !== null) {
        params.categoryId = activeTab;
      }

      const response = await api.get("/api/blog", { params });
      const responseData = response.data?.data;
      const content = responseData?.data || [];
      const totalRecord = responseData?.totalRecord || 0;
      const totalPages = responseData?.page || 0;

      setBlogs(content);

      setPagination({
        currentPage: page,
        totalPages: totalPages,
        size: 6,
        totalRecord
      });
      
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [search, activeTab]);

  // Create debounced version of fetchBlogs for search
  const debouncedFetchBlogs = useDebounce(fetchBlogs, 500);

  // Fetch blogs when activeTab changes (immediate)
  useEffect(() => {
    fetchBlogs(1);
  }, [activeTab, fetchBlogs]);

  // Fetch blogs when search changes (debounced)
  useEffect(() => {
    if (search !== "") {
      debouncedFetchBlogs(1);
    } else {
      // If search is empty, fetch immediately
      fetchBlogs(1);
    }
  }, [search]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const { currentPage, totalPages } = pagination;
    const pages = [];
    
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };


  return (
    <div className="">
      {!isLanding && <Header />}
      <div className="bg-blue-300/5">


        <section className="lg:pt-32 pt-24">
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
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                <button
                  onClick={() => setActiveTab(null)}
                  className={`px-6 py-3 rounded-full font-poppins text-sm sm:text-base transition-colors duration-200 ${activeTab === null
                      ? "bg-fouthBrand text-white"
                      : "text-secondaryText border-secondaryText border hover:bg-gray-50"
                    }`}
                >
                  All Topics
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-6 py-3 rounded-full font-poppins text-sm sm:text-base transition-colors duration-200 ${activeTab === category.id
                        ? "bg-fouthBrand text-white"
                        : "text-secondaryText border-secondaryText border hover:bg-gray-50"
                      }`}
                  >
                    {category.name}
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
              </div>
            )}

            {/* Cards */}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                {blogs && blogs.length > 0 ? (
                  blogs.map((blog) => {
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
                      No results found.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && pagination.totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center mt-16 gap-3">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9DD4D3] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8bc4c3] transition-colors duration-200"
                  aria-label="Previous page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400 font-poppins">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full font-poppins text-base transition-all duration-200 ${
                        pagination.currentPage === page
                          ? "bg-[#9DD4D3] text-white font-semibold"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-[#9DD4D3] hover:text-[#9DD4D3]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9DD4D3] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8bc4c3] transition-colors duration-200"
                  aria-label="Next page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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

