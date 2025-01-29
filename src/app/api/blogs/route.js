import { connectDb } from "@/helper/db"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

// BLOGS POST IN DATABASE
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 })
    }

    await connectDb()
    const { name, title, description, image } = await request.json()
    if (!name || !title || !description || !Array.isArray(image) || image.length === 0) {
      return NextResponse.json(
        { message: 'All fields are required. "image" must be a non-empty array.', success: false },
        { status: 400 },
      )
    }

    const blog = new Blog({ name, title, description, image, userId: session.user.id })
    const createBlog = await blog.save()
    return NextResponse.json({ message: "Blog created successfully", success: true, data: createBlog }, { status: 201 })
  } catch (error) {
    console.error("Error:", error)
    if (error.code === 11000) {
      return NextResponse.json({ message: "Blog with this name already exists", success: false }, { status: 409 })
    }
    return NextResponse.json({ message: "Failed to create blog", success: false }, { status: 500 })
  }
}

// FIND ALL BLOGS FOR A SPECIFIC USER
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 })
    }

    connectDb()
    const blogs = await Blog.find({ userId: session.user.id })

    return NextResponse.json({
      message: "User blogs fetched successfully",
      success: true,
      data: blogs,
    })
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({
      message: "Failed to fetch blogs",
      success: false,
    })
  }
}














