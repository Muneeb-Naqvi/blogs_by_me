'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2";

const EditBlog = ({ params }) => {
    const router = useRouter();
    const [id, setId] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        description: "",
        image: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Unwrap the params
    useEffect(() => {
        const fetchParams = async () => {
            const unwrappedParams = await params;
            setId(unwrappedParams.id);
        };
        fetchParams();
    }, [params]);

    // Fetch blog details for pre-filling the form
    useEffect(() => {
        if (!id) return;

        const fetchBlogDetails = async () => {
            try {
                const response = await fetch(`/api/blogs/${id}`);
                const data = await response.json();
                if (data.success) {
                    setFormData({
                        name: data.data.name,
                        title: data.data.title,
                        description: data.data.description,
                        image: data.data.image || [],
                    });
                } else {
                    setError("Failed to load blog details.");
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
                setError("Error fetching blog details.");
            } finally {
                setLoading(false); // Set loading to false after data fetch
            }
        };

        fetchBlogDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.title || !formData.description) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                Swal.fire({
                    icon: "success",
                    title: "Blog Updated Successfully!",
                    text: "The blog has been updated.",
                    confirmButtonText: "Okay",
                }).then(() => {
                    router.push("/admin"); // Redirect to admin dashboard
                });
            } else {
                setError(result.message || "Error updating the blog.");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            setError("Error updating the blog.");
        }
    };

    const handleBackToAdmin = (e) => {
        e.preventDefault(); // Prevent form submission when going back to admin
        router.push("/user-admin"); // Navigate to admin dashboard
    };

    

    return (
        <div className="min-h-screen w-full bg-gray-800 flex items-center justify-center relative m-0">
            <div className="max-w-3xl w-full bg-gray-900 p-8 rounded-lg shadow-lg mx-0 mt-5">
                <h1 className="text-3xl text-yellow-500 mb-6 text-center">Edit Blog</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-4 gap-4">
                        <div className="w-1/2">
                            <label htmlFor="name" className="block text-white font-bold mb-2">
                                Author Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 text-white rounded-lg"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="title" className="block text-white font-bold mb-2">
                                Blog Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 text-white rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white font-bold mb-2">Blog Image</label>
                        <CldUploadWidget
                            uploadPreset="hwlqikvn"
                            onSuccess={(result) => {
                                if (result.info?.secure_url && result.event === "success") {
                                    setFormData((prev) => ({
                                        ...prev,
                                        image: [...prev.image, result.info.secure_url],
                                    }));
                                }
                            }}
                            options={{
                                cloudName: "dpuw5wqyp",
                                multiple: true,
                                maxFiles: 5,
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={open}
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                                >
                                    Upload Images
                                </button>
                            )}
                        </CldUploadWidget>
                        <div className="flex flex-wrap mt-4 gap-4">
                            {formData.image.map((img, index) => (
                                <div key={index} className="relative w-20 h-20">
                                    <img
                                        src={img}
                                        alt="Blog"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                image: prev.image.filter((_, i) => i !== index),
                                            }))
                                        }
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-white font-bold mb-2"
                        >
                            Blog Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 bg-gray-700 text-white rounded-lg"
                            required
                        ></textarea>
                    </div>
                    <div className=" flex gap-5 align-center justify-center">
                        <button
                            type="submit"
                            className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-400"
                        >
                            Update Blog
                        </button>
                        <button
                            onClick={handleBackToAdmin}
                            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500"
                        >
                            Back to User Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditBlog;













