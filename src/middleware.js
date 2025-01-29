
import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  // Define public paths
  const isPublicPath = ['/', '/login', '/register'].includes(path);

  // Redirect authenticated users away from public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/blogs', request.nextUrl));
  }

  // Redirect unauthenticated users away from protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: [
    '/',          // Home
    '/login',     // Login page
    '/register',  // Registration page
    '/blogs',     // Blogs list page
    '/add-blog',  // Add Blog page
  ],
};













