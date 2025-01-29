'use client';

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { ArrowLeft } from 'lucide-react';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                console.error("Login error:", res.error);
                return;
            }

            router.replace("/addBlog");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/addBlog" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative">
            {/* Background Image */}
            <div
                className="fixed inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1651573090348-4ccf3924ef82?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                    backgroundSize: 'cover'
                }}
            />

            {/* Login Form */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 backdrop-blur-md bg-black/30 rounded-3xl text-white">
                {/* Back Button */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-4"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <h1 className="text-3xl font-light text-center mb-8">LOGIN</h1>

                <div className="space-y-4">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <FaGoogle className="text-red-500" />
                        Continue with Google
                    </button>

                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                        <div className="relative border-b border-orange-500/50 focus-within:border-red-500">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Username"
                                required
                                className="w-full bg-transparent border-none outline-none py-2 px-1 text-white placeholder-gray-400"
                            />
                        </div>

                        <div className="relative border-b border-orange-500/50 focus-within:border-red-500">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full bg-transparent border-none outline-none py-2 px-1 text-white placeholder-gray-400"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="rounded border-red-500 text-red-500 focus:ring-red-500"
                                />
                                <span>Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-gray-300 hover:text-red-500">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-500 text-white py-3 rounded-full font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "LOGIN"}
                        </button>

                        <p className="text-center text-gray-300">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-red-500 hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}











