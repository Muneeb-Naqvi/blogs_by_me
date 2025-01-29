import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import { connectDb } from "@/helper/db"

const generateSecret = () => {
  if (!process.env.NEXTAUTH_SECRET) {
    const crypto = require("crypto")
    return crypto.randomBytes(32).toString("hex")
  }
  return process.env.NEXTAUTH_SECRET
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials

        try {
          await connectDb()
          const user = await User.findOne({ email })

          if (!user) {
            throw new Error("No user found")
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            throw new Error("Incorrect password")
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          }
        } catch (error) {
          console.error("Error in authorize:", error)
          throw error // Re-throw the error for NextAuth to handle
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }

      if (account?.provider === "google") {
        try {
          await connectDb()
          const dbUser = await User.findOne({ email: token.email })

          if (!dbUser) {
            const newUser = await User.create({
              name: token.name,
              email: token.email,
              image: token.picture,
              password: "",
            })
            token.id = newUser._id.toString()
          } else {
            token.id = dbUser._id.toString()
          }
        } catch (error) {
          console.error("Error in jwt callback:", error)
          // Consider how to handle this error - maybe set a flag on the token?
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // If the url is absolute or starts with a protocol, allow it
      if (url.startsWith("http") || url.startsWith("https")) {
        return url
      }
      // Otherwise, redirect to the dashboard
      return `${baseUrl}/dashboard`
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: generateSecret(),
  debug: process.env.NODE_ENV === "development",
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }












// 'use client'

// import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import Swal from 'sweetalert2'

// export default function Dashboard() {
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.replace('/')
//     }
//   }, [status, router])

//   const handleLogout = async () => {
//     try {
//       await signOut({ redirect: false });

//       Swal.fire({
//         icon: 'success',
//         title: 'Logged Out Successfully',
//         text: `Goodbye, ${session?.user?.name}!`,
//         confirmButtonText: 'OK'
//       }).then(() => {
//         router.push('/');
//       });
//     } catch (error) {
//       console.error('Logout error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong during logout!'
//       });
//     }
//   };

//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
//       </div>
//     )
//   }

//   if (!session) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="h-12 w-12 rounded-full overflow-hidden">
//                 <img
//                   src={session.user?.image || '/placeholder.svg'}
//                   alt={session.user?.name || 'Profile'}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold">Welcome, {session.user?.name}!</h1>
//                 <p className="text-gray-500">{session.user?.email}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11.707 4.707a1 1 0 0 0-1.414-1.414L10 9.586 6.707 6.293a1 1 0 0 0-1.414 1.414L8.586 11l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 12.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 11l3.293-3.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-lg font-medium mb-4">Dashboard Content</h2>
//           <p className="text-gray-600">You are successfully logged in!</p>
//           <div className="mt-4">
//             <h3 className="font-medium">Your Profile Information:</h3>
//             <ul className="mt-2 space-y-2">
//               <li>User ID: {session.user?.id}</li>
//               <li>Name: {session.user?.name}</li>
//               <li>Email: {session.user?.email}</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }









