

"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";

const AddBlogPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tempImages, setTempImages] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
  });

  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your blog description here...",
      theme: "dark",
      colors: {
        background: "#0f0f0f",
        text: "#f1f1f1",
        border: "#dc2626",
      },
    }),
    []
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData((prevState) => ({
      ...prevState,
      description: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.title || !formData.description || tempImages.length === 0) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title,
          description: formData.description,
          image: tempImages,
          userId: session.user.id, // Add the user ID to the blog post
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ name: "", title: "", description: "" });
        setTempImages([]);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your blog post has been submitted.",
          confirmButtonColor: "#dc2626",
          background: "#0f0f0f",
          color: "#f1f1f1",
        }).then(() => {
          router.push("/user-admin"); // Redirect to user dashboard after successful submission
        });
      } else {
        setError(result.error || "Error submitting the blog.");
      }
    } catch (error) {
      setError("Error submitting the blog. Please try again.");
      console.error("Error:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto backdrop-blur-md bg-black/40 shadow-2xl rounded-xl p-8 border border-red-800/30">
          <h1 className="text-3xl font-bold text-center text-red-100 mb-6">Add Your Blog Here</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-bold text-red-200">Author Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-black/50 text-red-100 border border-red-800/30 rounded-lg focus:outline-none focus:border-red-500 placeholder-red-400/50"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-bold text-red-200">Blog Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 bg-black/50 text-red-100 border border-red-800/30 rounded-lg focus:outline-none focus:border-red-500 placeholder-red-400/50"
                placeholder="Enter Your Blog Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-red-200">Blog Image</label>
              <CldUploadWidget
                uploadPreset="iegdmzs0"
                onSuccess={(results) => {
                  if (results.info?.secure_url && results.event === "success") {
                    setTempImages((prevImages) => [...prevImages, results.info.secure_url]);
                  }
                }}
                options={{
                  cloudName: "dj1hec7wx",
                  multiple: true,
                  maxFiles: 5,
                  styles: {
                    palette: {
                      window: "#0f0f0f",
                      windowBorder: "#dc2626",
                      tabIcon: "#dc2626",
                      menuIcons: "#dc2626",
                      textDark: "#f1f1f1",
                      textLight: "#f1f1f1",
                      link: "#dc2626",
                      action: "#dc2626",
                      inactiveTabIcon: "#666666",
                      error: "#dc2626",
                      inProgress: "#dc2626",
                      complete: "#dc2626",
                      sourceBg: "#0f0f0f",
                    },
                  },
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={open}
                    className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 shadow-lg hover:shadow-red-900/50"
                  >
                    Upload Images
                  </button>
                )}
              </CldUploadWidget>

              {tempImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {tempImages.map((img, index) => (
                    <div key={index} className="relative w-32 h-32">
                      <img
                        src={img}
                        alt={`Uploaded ${index}`}
                        className="w-full h-full object-cover rounded-lg border border-red-800/30"
                      />
                      <button
                        onClick={() => setTempImages((prevImages) => prevImages.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-bold text-red-200">Blog Description</label>
              <JoditEditor
                ref={editor}
                value={formData.description}
                config={config}
                onBlur={handleDescriptionChange}
                className="jodit-container-dark"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 shadow-lg hover:shadow-red-900/50"
              >
                Add Blog
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: "", title: "", description: "" });
                  setTempImages([]);
                  setError("");
                }}
                className="flex-1 px-6 py-3 bg-black/50 text-red-200 rounded-lg border border-red-800/30 hover:bg-red-950/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
              >
                Clear All
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage;
















