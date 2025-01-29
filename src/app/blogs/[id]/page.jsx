// import Blog from "@/models/blog";
// import { NextResponse } from "next/server";
// import { connectDb } from "@/helper/db";

// // Find Single BLOG By Blog_ID
// export async function GET(request, { params }) {
//     await connectDb();
//     const { id } = params;
//     try {
//         if (!id) {
//             return NextResponse.json(
//                 { message: "Blog ID is required", success: false },
//                 { status: 400 }
//             );
//         }
//         const blog = await Blog.findById(id);
//         if (!blog) {
//             return NextResponse.json(
//                 { message: "Blog not found", success: false },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(
//             { message: "Single Blog Fetched BY ID Successfully", success: true, data: blog },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error fetching blog:", error);
//         return NextResponse.json(
//             { message: "Internal server error", success: false },
//             { status: 500 }
//         );
//     }
// }

// // Update The Blog By Blog_ID
// export async function PUT(request, { params }) {
//     await connectDb();
//     const { id } = params;

//     try {
//         const { name, title, description, image } = await request.json();
//         const blog = await Blog.findById(id);
//         if (!blog) {
//             return NextResponse.json(
//                 { message: "Blog not found", success: false },
//                 { status: 404 }
//             );
//         }
//         blog.name = name || blog.name;
//         blog.title = title || blog.title;
//         blog.description = description || blog.description;
//         blog.image = image || blog.image;

//         const updatedBlog = await blog.save();

//         return NextResponse.json(
//             {
//                 message: "Blog updated successfully",
//                 success: true,
//                 data: updatedBlog,
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error updating blog:", error);
//         return NextResponse.json(
//             {
//                 message: "Error updating blog",
//                 success: false,
//             },
//             { status: 500 }
//         );
//     }
// }

// // Delete Single Blog By Blog_ID
// export async function DELETE(request, { params }) {
//     await connectDb();
//     const { id } = params;
//     try {
//         await Blog.deleteOne({
//             _id: id,
//         })
//         return NextResponse.json({
//             message: "Blog Deleted Successfully",
//             success: true,
//         })
//     } catch (error) {
//         return NextResponse.json({
//             message: "Delete Failed",
//             success: false,
//         }, { status: 500 })
//     }
// }









'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react'; // Import React.use
import Link from 'next/link';

const AdminViewSingleBlogPage = ({ params: paramsPromise }) => {
    const params = use(paramsPromise); // Unwrap the params promise
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (params?.id) {
            fetchBlog(params.id);
        }
    }, [params?.id]);

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
            <div className="container mx-auto px-4 py-8">
                <div
                    className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <img
                    src={blog.image[0]}
                    alt={blog.title}
                    className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{blog.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">By {blog.name}</p>
                    <p className="text-gray-700 dark:text-gray-300">{blog.description}</p>
                </div>
            </div>
            <div className="mt-8 text-center">
                <Link
                    href="/user-admin"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Back to user Admin Panel
                </Link>
            </div>
        </div>
    );
};

export default AdminViewSingleBlogPage;













