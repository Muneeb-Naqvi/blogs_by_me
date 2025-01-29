import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center">
        <p className="text-[#ff4d4d] text-lg mb-4">Prepare For New Future</p>
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-center">
          Welcome to Our Blog World
        </h1>
        <p className="text-red-200 text-xl mb-8 text-center">
          Explore, Create, and Share Your Thoughts
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
          >
            <span className="mr-2">✏️</span>
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
          >
            <span className="mr-2">🔑</span>
            Register
          </Link>
          <Link
            href="/blogs"
            className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors"
          >
            <span className="mr-2">📚</span>
            View Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}













// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8 relative">
//       {/* Background Image with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/70"></div>
//       </div>

//       {/* Content */}
//       <div className="relative container mx-auto px-4 py-20 flex flex-col items-center">
//         <p className="text-[#ff4d4d] text-lg mb-4">Prepare For New Future</p>
//         <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-center">
//           Welcome to Our Blog World
//         </h1>
//         <p className="text-red-200 text-xl mb-8 text-center">
//           Explore, Create, and Share Your Thoughts
//         </p>

//         <div className="flex flex-wrap justify-center gap-4">
//           <Link
//             href="/login"
//             className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
//           >
//             <span className="mr-2">✏️</span>
//             Login
//           </Link>
//           <Link
//             href="/register"
//             className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
//           >
//             <span className="mr-2">🔑</span>
//             Register
//           </Link>
//           <Link
//             href="/blogs"
//             className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors"
//           >
//             <span className="mr-2">📚</span>
//             View Blogs
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }




















// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8 relative">
//       {/* Background Image with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/70"></div>
//       </div>

//       {/* Content */}
//       <div className="relative container mx-auto px-4 py-20 flex flex-col items-center">
//         <p className="text-[#ff4d4d] text-lg mb-4">Prepare For New Future</p>
//         <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-center">
//           Welcome to Our Blog World
//         </h1>
//         <p className="text-red-200 text-xl mb-8 text-center">
//           Explore, Create, and Share Your Thoughts
//         </p>

//         <div className="flex flex-wrap justify-center gap-4">
//           <Link
//             href="/login"
//             className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
//           >
//             <span className="mr-2">✏️</span>
//             Login
//           </Link>
//           <Link
//             href="/register"
//             className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
//           >
//             <span className="mr-2">🔑</span>
//             Register
//           </Link>
//           <Link
//             href="/blogs"
//             className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors"
//           >
//             <span className="mr-2">📚</span>
//             View Blogs
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
















// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black p-8 relative">
//       {/* Background Image with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/70"></div>
//       </div>

//       {/* Content */}
//       <div className="relative container mx-auto px-4 py-20 flex flex-col items-center">
//         <p className="text-[#ff4d4d] text-lg mb-4">Prepare For New Future</p>
//         <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-center">
//           Welcome to Our Blog World
//         </h1>
//         <p className="text-red-200 text-xl mb-8 text-center">
//           Explore, Create, and Share Your Thoughts
//         </p>

//         <div className="flex flex-wrap justify-center space-x-4">
//           <Link
//             href="/login"
//             className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
//           >
//             <span className="mr-2">✏️</span>
//             Login
//           </Link>
//           <Link
//             href="/register"
//             className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
//           >
//             <span className="mr-2">🔑</span>
//             Register
//           </Link>
//           <Link
//             href="/blogs"
//             className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors"
//           >
//             <span className="mr-2">📚</span>
//             View Blogs
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



















// import Link from 'next/link';


// const HomePage = () => {
//   return (
//     <div className="min-h-screen">

//       <main className="relative min-h-[calc(100vh-0px)]">
//         {/* Background Image with Overlay */}
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: 'url("https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
//           }}
//         >
//           <div className="absolute inset-0 bg-black/70"></div>
//         </div>

//         {/* Content */}
//         <div className="relative container mx-auto px-4 py-20 min-h-full flex items-center">
//           <div className="max-w-3xl">
//             <p className="text-[#ff4d4d] text-lg mb-4">Prepare For New Future</p>
//             <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
//               Welcome to Our Blog World
//             </h1>
//             <p className="text-white text-xl md:text-2xl mb-8">
//               Explore, Create, and Share Your Thoughts
//             </p>

//             <div className="space-y-4 md:space-y-0 md:space-x-6">
//               <Link
//                 href="/login"
//                 className="inline-flex items-center px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-colors"
//               >
//                 <span className="mr-2">✏️</span>
//                 Add Blog
//               </Link>
//               <Link
//                 href="/showBlog"
//                 className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors"
//               >
//                 <span className="mr-2">📚</span>
//                 Show Blogs
//               </Link>
//             </div>
//           </div>
//         </div>
//       </main>


//     </div>
//   );
// };

// export default HomePage;











// import Link from 'next/link';

// const HomePage = () => {
//   return (
//     <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
//       <div className="text-center text-white">
//         <h1 className="text-6xl font-bold mb-4">Welcome to Our Blog World</h1>
//         <p className="text-2xl mb-8">Explore, Create, and Share Your Thoughts</p>
//         <div className="space-x-6">
//           <Link href="/addBlog" className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300 inline-flex items-center">
//             <span className="mr-2">✏️</span>
//             Add Blog
//           </Link>
//           <Link href="/showBlog" className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 inline-flex items-center">
//             <span className="mr-2">📚</span>
//             Show Blogs
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;














// import Link from 'next/link'
// import React from 'react'

// const page = () => {
//   return (
//     <>
//       <div className=' flex space-between gap-5'>
//         <button className='border rounded-5 text-white bg-black'> <Link href='/addBlog'>Add Blogs From Here</Link></button>
//         <button className='border rounded-5 text-white bg-black'><Link href='/showBlog'>Show Blogs From There</Link></button>
//       </div>

//     </>
//   )
// }

// export default page
