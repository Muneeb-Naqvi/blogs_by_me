
'use client';

import React, { useEffect, useState } from "react";
import Link from 'next/link';

const ShowBlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(6);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/blogs");
            const result = await response.json();

            if (result.success) {
                setBlogs(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to fetch blogs. Please try again later.");
        }
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F2E9E4] dark:bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">Our Blog</h1>
                <div className="w-24 h-0.5 bg-gray-800 dark:bg-white mx-auto mb-12"></div>
                
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">No blogs available.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {currentBlogs.map((blog) => (
                                <div key={blog._id} className="bg-white dark:bg-gray-800 p-4 transition duration-300">
                                    <div className="aspect-square mb-4 overflow-hidden">
                                        <img 
                                            src={blog.image[0]} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-300"
                                        />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-center text-sm">
                                        {blog.description.length > 100 
                                            ? `${blog.description.substring(0, 100)}...` 
                                            : blog.description}
                                    </p>
                                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </div>
                                    <div className="text-center">
                                        <Link 
                                            href={`/showBlog/${blog._id}`} 
                                            className="inline-block px-6 py-2 bg-[#C8B6A6] text-white hover:bg-[#A89985] transition duration-300"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-12 gap-2">
                            {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    className={`w-8 h-8 rounded-full ${
                                        currentPage === i + 1 
                                            ? 'bg-[#C8B6A6] text-white' 
                                            : 'bg-white text-gray-800 hover:bg-[#C8B6A6] hover:text-white'
                                    } transition duration-300`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowBlogsPage;





















