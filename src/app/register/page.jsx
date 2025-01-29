"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaCamera } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUploadSuccess = (results) => {
        if (results.info?.secure_url && results.event === "success") {
            setImage(results.info.secure_url);
            setImagePreview(results.info.secure_url);
        }
    };

    const handleImageUploadError = () => {
        setError("Error uploading the image. Please try again.");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword || !image) {
            setError("All fields are necessary.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();
            if (user) {
                setError("User already exists.");
                setLoading(false);
                return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, image }),
            });

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "You have been successfully registered!",
                }).then(() => router.push("/login"));
            } else {
                setError("Registration failed.");
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-950 py-6">
            <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-lg shadow-lg border border-red-700">
                <h1 className="text-3xl font-bold text-center text-red-500">Register</h1>

                <div className="flex justify-center">
                    <div className="relative">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Profile preview"
                                className="w-24 h-24 rounded-full object-cover border-4 border-red-500"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-4 border-red-500">
                                <FaUser className="w-12 h-12 text-gray-500" />
                            </div>
                        )}
                        <CldUploadWidget
                            uploadPreset="iegdmzs0"
                            onSuccess={handleImageUploadSuccess}
                            onError={handleImageUploadError}
                            options={{ cloudName: "dj1hec7wx", multiple: false }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    className="absolute bottom-0 right-0 bg-red-700 rounded-full p-2 hover:bg-red-800"
                                    onClick={open}
                                >
                                    <FaCamera className="text-white" />
                                </button>
                            )}
                        </CldUploadWidget>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { name: "name", icon: <FaUser className="absolute top-3 right-3 text-gray-400" /> },
                        { name: "email", icon: <MdEmail className="absolute top-3 right-3 text-gray-400" /> },
                        { name: "password", icon: <RiLockPasswordFill className="absolute top-3 right-3 text-gray-400" /> },
                        { name: "confirmPassword", icon: <RiLockPasswordFill className="absolute top-3 right-3 text-gray-400" /> },
                    ].map(({ name, icon }, idx) => (
                        <div className="relative" key={idx}>
                            <input
                                type={name.includes("password") ? "password" : "text"}
                                name={name}
                                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-red-400 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                required
                            />
                            {icon}
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {error && <div className="text-sm text-red-500 bg-red-100 p-2 rounded-md">{error}</div>}

                <p className="text-sm text-gray-400 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-red-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;

















