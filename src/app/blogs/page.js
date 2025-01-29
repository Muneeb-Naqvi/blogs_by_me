








'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ShowBlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-red-100 mb-6">All Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(({ _id, title, content }) => (
            <div key={_id} className="bg-black/40 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-red-100 mb-2">{title}</h2>
              <p className="text-red-200 mb-4">{content.substring(0, 100)}...</p>
              <Link href={`/blogs/${_id}`} className="text-red-400 hover:text-red-300">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}













// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function ShowBlogsPage() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const res = await fetch('/api/blogs');
//       const data = await res.json();
//       setBlogs(data);
//     })();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-center text-red-100 mb-6">All Blogs</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map(({ _id, title, content }) => (
//             <div key={_id} className="bg-black/40 p-6 rounded-lg">
//               <h2 className="text-xl font-bold text-red-100 mb-2">{title}</h2>
//               <p className="text-red-200 mb-4">{content.substring(0, 100)}...</p>
//               <Link href={`/blogs/${_id}`} className="text-red-400 hover:text-red-300">
//                 Read more
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
















// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function ShowBlogsPage() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     async function fetchBlogs() {
//       const res = await fetch('/api/blogs');
//       const data = await res.json();
//       setBlogs(data);
//     }
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-center text-red-100 mb-6">All Blogs</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map((blog) => (
//             <div key={blog._id} className="bg-black/40 p-6 rounded-lg">
//               <h2 className="text-xl font-bold text-red-100 mb-2">{blog.title}</h2>
//               <p className="text-red-200 mb-4">{blog.content.substring(0, 100)}...</p>
//               <Link href={`/blogs/${blog._id}`} className="text-red-400 hover:text-red-300">
//                 Read more
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }













// import Link from 'next/link';

// async function getBlogs() {
//   const res = await fetch('http://localhost:3000/api/blogs', { cache: 'no-store' });
//   if (!res.ok) {
//     throw new Error('Failed to fetch blogs');
//   }
//   return res.json();
// }

// export default async function BlogsPage() {
//   const blogs = await getBlogs();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-center text-red-100 mb-6">Blogs</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map((blog) => (
//             <div key={blog._id} className="bg-black/40 p-6 rounded-lg">
//               <h2 className="text-xl font-bold text-red-100 mb-2">{blog.title}</h2>
//               <p className="text-red-200 mb-4">{blog.content.substring(0, 100)}...</p>
//               <Link href={`/blogs/${blog._id}`} className="text-red-400 hover:text-red-300">
//                 Read more
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
