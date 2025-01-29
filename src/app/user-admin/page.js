"use client"

import React, { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Edit, Trash2, Eye, Plus, LogOut } from "lucide-react"
import Swal from "sweetalert2"

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const blogsPerPage = 6
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserBlogs()
    } else if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, session, router]) // Added router to dependencies

  const fetchUserBlogs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/blogs?userId=${session?.user?.id}`)
      const result = await response.json()

      if (result.success) {
        setBlogs(result.data)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Failed to fetch blogs. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#1f2937",
        confirmButtonText: "Yes, delete it!",
      })

      if (result.isConfirmed) {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
        })
        const data = await response.json()

        if (data.success) {
          Swal.fire("Deleted!", "Your blog has been deleted.", "success")
          fetchUserBlogs()
        } else {
          throw new Error(data.message)
        }
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to delete the blog.", "error")
    }
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log Out",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#1f2937",
      confirmButtonText: "Yes, log out!",
    })

    if (result.isConfirmed) {
      await signOut({ redirect: false })
      Swal.fire("Logged Out!", "You have successfully logged out.", "success").then(() => {
        router.replace("/login")
      })
    }
  }

  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-red-900 to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-red-100">Welcome, {session.user.name}</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-700 text-white rounded-lg shadow hover:bg-red-800 transition flex items-center space-x-2"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium text-red-100">Your Blogs</h2>
            <Link
              href="/add-blog"
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add New Blog</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-gray-900 p-6 rounded-lg border-2 border-red-700 flex flex-col justify-between"
                >
                  {blog.image && (
                    <img
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-red-400 mb-2">{blog.title}</h2>
                    <p className="text-red-300 mb-4">
                      {blog.content ? `${blog.content.substring(0, 100)}...` : "No content available."}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="text-red-500 hover:text-red-400 flex items-center space-x-1"
                    >
                      <Eye size={18} />
                      <span>View</span>
                    </Link>
                    <Link
                      href={`/editBlog/${blog._id}`}
                      className="text-yellow-500 hover:text-yellow-400 flex items-center space-x-1"
                    >
                      <Edit size={18} />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-500 hover:text-red-400 flex items-center space-x-1"
                    >
                      <Trash2 size={18} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-3 text-center">No blogs available.</p>
            )}
          </div>
          <div className="mt-8 flex justify-center">
            {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 mx-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white"
                } transition`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard






