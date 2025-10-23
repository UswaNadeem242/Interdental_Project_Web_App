import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FrequentlyAskedQuestion from "../../../components/frequently-asked-question";
import Contact from "../contact";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";
import BlogNext from "../../../components/landing-page-component/blog-next.jsx";
import BackButton from "../../../components/BackButton";
import api from "../../../api/intercepter";


export default function BlogDetailPage() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch blog data by ID
        const response = await api.get(`/api/blog/${id}`);
        const blog = response.data.data;
        
        // Transform API data to match component structure
        setBlogData({
          id: blog.id,
          title: blog.title,
          category: blog.categoryName,
          image: blog.imageUrl?.[0],
          intro: blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : '',
          content: blog.content ? blog.content.replace(/<img[^>]*>/g, '') : ''
        });
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog content');
        // Set error state if API fails
        setBlogData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogData();
    } else {
      // No ID provided, show error
      setError('No blog ID provided');
      setBlogData(null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bg-blue-300/5 min-h-screen">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="mx-auto py-4 sm:py-8">
            <BackButton text="Back" />
            <div className="animate-pulse py-8 sm:py-10">
              <div className="h-8 sm:h-12 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 sm:h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !blogData) {
    return (
      <div className="bg-blue-300/5 min-h-screen">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="mx-auto py-4 sm:py-8">
            <BackButton text="Back" />
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">Error Loading Blog</h1>
              <p className="text-gray-600 text-sm sm:text-base">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="bg-blue-300/5 min-h-screen">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="mx-auto py-4 sm:py-8">
            <BackButton text="Back" />
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">Blog Not Found</h1>
              <p className="text-gray-600 text-sm sm:text-base">The requested blog could not be loaded.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-300/5 min-h-screen">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="mx-auto py-4 sm:py-8">
          <BackButton text="Back" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-6 sm:mt-8 font-bold text-primaryText max-w-[700px] text-center mx-auto leading-tight">
            {blogData.title}
          </h1>
          <p className="text-sm sm:text-base font-normal font-poppins text-primaryText text-center pt-3 sm:pt-4">
            {blogData.category}
          </p>
        </div>
        
        <section className="text-gray-700 px-2 sm:px-4 pb-4">
          {/* Hero image */}
          <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            <img
              src={blogData.image}
              alt={blogData.title}
              className="w-full h-auto rounded-md shadow-sm"
            />
          </div>

          {/* Content sections rendered via map */}
          <div className="max-w-4xl mx-auto mt-6 sm:mt-8 md:mt-12 space-y-6 sm:space-y-8 md:space-y-10">
            {blogData.content && (
              <div 
                className="blog-content px-2 sm:px-0"
                dangerouslySetInnerHTML={{ __html: blogData.content }}
              />
            )}
          </div>
        </section>
        
        <BlogNext currentBlogId={id} />
        <FrequentlyAskedQuestion />
        <UpperFooter />
        <Footer />
      </div>
    </div>
  );
}
