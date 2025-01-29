'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const SingleBlogPage = ({ params }) => {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (id) {
            fetchBlog(id);
        }
    }, [id]);

    const fetchBlog = async (id) => {
        try {
            const response = await fetch(`/api/blogs/${id}`);
            const result = await response.json();

            if (result.success) {
                setBlog(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to fetch blog. Please try again later.');
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-[#F2E9E4] dark:bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <div
                        className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative max-w-2xl mx-auto"
                        role="alert"
                    >
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#F2E9E4] dark:bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F2E9E4] dark:bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <article className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            {blog.title}
                        </h1>
                        <div className="w-24 h-0.5 bg-gray-800 dark:bg-white mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric'
                            })}
                        </p>
                    </div>

                    <div className="mb-12">
                        <img
                            src={blog.image[0]}
                            alt={blog.title}
                            className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition duration-300"
                        />
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 mb-12">
                        <div className="prose dark:prose-invert max-w-none">
                            <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p className="mb-4">By {blog.name}</p>
                                <p className="whitespace-pre-line">{blog.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            href="/showBlog"
                            className="inline-block px-8 py-3 bg-[#C8B6A6] text-white hover:bg-[#A89985] transition duration-300"
                        >
                            Back to Blogs
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default SingleBlogPage;











