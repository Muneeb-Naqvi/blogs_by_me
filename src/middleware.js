
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















// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const path = request.nextUrl.pathname;
//   const token = request.cookies.get('token')?.value || '';

//   // Define public paths
//   const isPublicPath = ['/', '/login', '/register'].includes(path);

//   // Redirect authenticated users away from public paths
//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL('/blogs', request.nextUrl));
//   }

//   // Redirect unauthenticated users away from protected paths
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl));
//   }

//   return NextResponse.next(); // Allow the request to proceed
// }

// export const config = {
//   matcher: [
//     '/',          // Home
//     '/login',     // Login page
//     '/register',  // Registration page
//     '/blogs',     // Blogs list page
//     '/add-blog',  // Add Blog page
//   ],
// };












// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const path = request.nextUrl.pathname;
//   const isPublicPath = path === '/' || path === '/login' || path === '/register';
//   const token = request.cookies.get('token')?.value || '';

//   // Redirect authenticated users away from public paths
//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL('/blogs', request.nextUrl));
//   }

//   // Redirect unauthenticated users away from protected paths
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl));
//   }

//   return NextResponse.next(); // Allow the request to proceed
// }

// export const config = {
//   matcher: [
//     '/',          // Home
//     '/login',     // Login page
//     '/register',  // Registration page
//     '/blogs',     // Blogs list page
//     '/add-blog',  // Add Blog page
//   ],
// };














// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === '/login' || path === '/register' || path === '/';

//   const token = request.cookies.get('token')?.value || '';

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL('/blogs', request.nextUrl));
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl));
//   }
// }

// export const config = {
//   matcher: [
//     '/',
//     '/login',
//     '/register',
//     '/blogs',
//     '/add-blog',
//   ],
// };











// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// export default withAuth(
//     function middleware(req) {
//         return NextResponse.next()
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => !!token
//         },
//     }
// )

// export const config = {
//     matcher: ["/addBlog/:path*"]
// }
