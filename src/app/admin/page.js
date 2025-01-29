






'use client';

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Edit, Trash2, Eye } from 'lucide-react';
import Link from "next/link";

const AdminPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;

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

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc2626',
                cancelButtonColor: '#1f2937',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await fetch(`/api/blogs/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();

                if (data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your blog has been deleted.',
                        'success'
                    );
                    fetchBlogs();
                } else {
                    throw new Error(data.message);
                }
            }
        } catch (error) {
            Swal.fire(
                'Error!',
                'Failed to delete the blog.',
                'error'
            );
        }
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8">
                <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 text-red-400 max-w-md mx-auto border border-red-800/30">
                    <strong className="font-bold">Error!</strong>
                    <span className="block"> {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-red-100 mb-8">Admin Dashboard</h1>
                
                <div className="backdrop-blur-md bg-black/40 rounded-xl overflow-hidden shadow-2xl border border-red-800/30">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-red-800/30">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-200">Blog</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-200">Author</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-200">Created At</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-200">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-red-800/30">
                                {currentBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-red-950/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 rounded-full overflow-hidden border border-red-800/30">
                                                    <img 
                                                        src={blog.image[0]} 
                                                        alt={blog.title}
                                                        className="h-full w-full object-cover" 
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-red-100">{blog.title}</p>
                                                    <p className="text-xs text-red-400 truncate max-w-xs">
                                                        {blog.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-red-200">{blog.name}</td>
                                        <td className="px-6 py-4 text-sm text-red-200">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-900/50 text-red-200 border border-red-800/30">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <Link href={`/editBlog/${blog._id}`}>
                                                    <button className="text-red-400 hover:text-red-200">
                                                        <Edit size={18} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="text-red-400 hover:text-red-200"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <Link href={`/admin/${blog._id}`}>
                                                    <button className="text-red-400 hover:text-red-200">
                                                        <Eye size={18} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center p-4 border-t border-red-800/30">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`mx-1 px-3 py-1 rounded-full text-sm border ${
                                    currentPage === i + 1
                                        ? 'bg-red-700 text-white border-red-600'
                                        : 'bg-black/30 text-red-200 border-red-800/30 hover:bg-red-900/50'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;













