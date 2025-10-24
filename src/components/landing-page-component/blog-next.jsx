import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowRightCircleIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/intercepter'

function BlogNext({ currentBlogId }) {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [prevBlog, setPrevBlog] = useState(null)
    const [nextBlog, setNextBlog] = useState(null)

    useEffect(() => {
        const fetchAdjacentBlogs = async () => {
            try {
                setLoading(true)
                
                // Fetch a small set of blogs around the current one
                // We'll fetch 3 pages worth to find adjacent blogs
                const response = await api.get('/api/blog', {
                    params: { page: 0, size: 100 } // Fetch more blogs to find adjacent ones
                })
                
                const blogData = response.data?.data?.data || []
                
                // Find current blog index
                const currentIndex = blogData.findIndex(blog => blog.id === parseInt(currentBlogId))
                
                if (currentIndex !== -1) {
                    // Set previous blog (if exists)
                    if (currentIndex > 0) {
                        setPrevBlog(blogData[currentIndex - 1])
                    } else {
                        setPrevBlog(null)
                    }
                    
                    // Set next blog (if exists)
                    if (currentIndex < blogData.length - 1) {
                        setNextBlog(blogData[currentIndex + 1])
                    } else {
                        setNextBlog(null)
                    }
                } else {
                    // If current blog not found in first 100, try to find by ID comparison
                    // Assuming newer blogs have higher IDs
                    const currentId = parseInt(currentBlogId)
                    const sortedBlogs = [...blogData].sort((a, b) => b.id - a.id) // Sort by ID descending (newest first)
                    
                    const currentIdx = sortedBlogs.findIndex(blog => blog.id === currentId)
                    if (currentIdx !== -1) {
                        setPrevBlog(currentIdx > 0 ? sortedBlogs[currentIdx - 1] : null)
                        setNextBlog(currentIdx < sortedBlogs.length - 1 ? sortedBlogs[currentIdx + 1] : null)
                    }
                }
            } catch (error) {
                console.error('Error fetching adjacent blogs:', error)
                setPrevBlog(null)
                setNextBlog(null)
            } finally {
                setLoading(false)
            }
        }

        if (currentBlogId) {
            fetchAdjacentBlogs()
        }
    }, [currentBlogId])
    if (loading) {
        return (
            <section className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-full w-full bg-[#eaf4f5] px-6 sm:px-10 py-10 md:py-14">
                        <div className="animate-pulse">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
                                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                            </div>
                            <div className="h-4 w-20 bg-gray-300 rounded mb-3"></div>
                            <div className="h-6 w-48 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                    <div className="h-full w-full bg-[#eceef4] px-6 sm:px-10 py-10 md:py-14">
                        <div className="animate-pulse">
                            <div className="flex items-center justify-end gap-3 mb-6">
                                <div className="h-4 w-12 bg-gray-300 rounded"></div>
                                <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
                            </div>
                            <div className="text-right">
                                <div className="h-4 w-16 bg-gray-300 rounded mb-3 ml-auto"></div>
                                <div className="h-6 w-40 bg-gray-300 rounded ml-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            <section className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left / Previous */}
                    {prevBlog ? (
                        <Link 
                            to={`/blogs/${prevBlog.id}`}
                            className="group relative block w-full h-full bg-[#eaf4f5] px-6 sm:px-10 py-10 md:py-14 hover:bg-[#d4e8ea] transition-colors duration-200"
                        >
                            {/* icon + label - left aligned */}
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondaryBrand text-white group-hover:bg-[#0b2a5b] transition-colors duration-200">
                                    <ArrowLongLeftIcon className='w-4 h-4' />
                                </span>
                                <span className="text-xs tracking-wide text-primaryText">{"Previous"}</span>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm font-semibold text-secondaryBrand">
                                    {prevBlog.categoryName || 'Blog'}
                                </p>
                                <h3 className="mt-3 text-lg leading-7 text-primaryText line-clamp-2">
                                    {prevBlog.title}
                                </h3>
                            </div>

                            {/* subtle hover */}
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
                        </Link>
                    ) : (
                        <div className="h-full w-full bg-[#eaf4f5] px-6 sm:px-10 py-10 md:py-14 opacity-50">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 text-white">
                                    <ArrowLongLeftIcon className='w-4 h-4' />
                                </span>
                                <span className="text-xs tracking-wide text-gray-500">{"Previous"}</span>
                            </div>
                            <div className="mt-6">
                                <p className="text-sm font-semibold text-gray-400">
                                    No Previous Blog
                                </p>
                                <h3 className="mt-3 text-lg leading-7 text-gray-400">
                                    This is the first blog post
                                </h3>
                            </div>
                        </div>
                    )}

                    {/* Right / Next */}
                    {nextBlog ? (
                        <Link 
                            to={`/blogs/${nextBlog.id}`}
                            className="group relative block w-full h-full bg-[#eceef4] px-6 sm:px-10 py-10 md:py-14 hover:bg-[#d8dae5] transition-colors duration-200"
                        >
                            {/* icon + label - right aligned */}
                            <div className="flex items-center justify-end gap-3">
                                <span className="text-xs tracking-wide text-[#0b2a5b]/80">{"Next"}</span>
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0b2a5b] text-white group-hover:bg-[#013764] transition-colors duration-200">
                                    <ArrowLongRightIcon className='w-4 h-4' />
                                </span>
                            </div>

                            <div className="mt-6 text-right">
                                <p className="text-sm font-semibold text-[#2b3a4a]">{nextBlog.categoryName || 'Blog'}</p>
                                <h3 className="mt-3 text-lg leading-7 text-[#1e1e1e] line-clamp-2">
                                    {nextBlog.title}
                                </h3>
                            </div>
                        </Link>
                    ) : (
                        <div className="h-full w-full bg-[#eceef4] px-6 sm:px-10 py-10 md:py-14 opacity-50">
                            <div className="flex items-center justify-end gap-3">
                                <span className="text-xs tracking-wide text-gray-500">{"Next"}</span>
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 text-white">
                                    <ArrowLongRightIcon className='w-4 h-4' />
                                </span>
                            </div>
                            <div className="mt-6 text-right">
                                <p className="text-sm font-semibold text-gray-400">No Next Blog</p>
                                <h3 className="mt-3 text-lg leading-7 text-gray-400">
                                    This is the latest blog post
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default BlogNext