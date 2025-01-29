import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";

// Find Single BLOG By Blog_ID
export async function GET(request, { params }) {
    connectDb();
    const { id } = params;
    try {
        if (!id) {
            return NextResponse.json(
                { message: "Blog ID is required", success: false },
                { status: 400 }
            );
        }
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { message: "Blog not found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Single Blog Fetched BY ID Successfully Called", success: true, data: blog },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}

// Upadate The User By Blog_IG
export async function PUT(request, { params }) {
    connectDb();
    const { id } = params;

    try {
        const { name, title, description, image } = await request.json();
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { message: "Blog not found", success: false },
                { status: 404 }
            );
        }
        blog.name = name || blog.name;
        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.image = image || blog.image;

        const updatedBlog = await blog.save();

        return NextResponse.json(
            {
                message: "Blog updated successfully",
                success: true,
                data: updatedBlog,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json(
            {
                message: "Error updating blog",
                success: false,
            },
            { status: 500 }
        );
    }
}

// Delete Single User By Blog_ID
export async function DELETE(request, { params }) {
    connectDb();
    const { id } = params;
    try {
        await Blog.deleteOne({
            _id: id,
        })
        return NextResponse.json({
            message: "User Deleted Successfully..!!",
            success: true,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Delete Fail..!!",
            success: false,
        }, console.log(error))

    }
}
