import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDb } from "@/helper/db";

// Generate a secret if one is not provided
const generateSecret = () => {
    if (!process.env.NEXTAUTH_SECRET) {
        const crypto = require('crypto');
        return crypto.randomBytes(32).toString('hex');
    }
    return process.env.NEXTAUTH_SECRET;
};

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectDb();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        image: user.image
                    };
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
            }

            if (account?.provider === "google") {
                try {
                    await connectDb();
                    const dbUser = await User.findOne({ email: token.email });

                    if (!dbUser) {
                        const newUser = await User.create({
                            name: token.name,
                            email: token.email,
                            image: token.picture,
                            password: "",
                        });
                        token.id = newUser._id.toString();
                    } else {
                        token.id = dbUser._id.toString();
                    }
                } catch (error) {
                    console.error("Error in jwt callback:", error);
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
        error: '/auth/error',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: generateSecret(),
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
// import bcrypt from "bcryptjs"
// import User from "@/models/User"
// import { connectDb } from "@/helper/db"

// const generateSecret = () => {
//   if (!process.env.NEXTAUTH_SECRET) {
//     const crypto = require("crypto")
//     return crypto.randomBytes(32).toString("hex")
//   }
//   return process.env.NEXTAUTH_SECRET
// }

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID || "",
//       clientSecret: process.env.GOOGLE_SECRET || "",
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials

//         try {
//           await connectDb()
//           const user = await User.findOne({ email })

//           if (!user) {
//             throw new Error("No user found")
//           }

//           const passwordsMatch = await bcrypt.compare(password, user.password)

//           if (!passwordsMatch) {
//             throw new Error("Incorrect password")
//           }

//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//             image: user.image,
//           }
//         } catch (error) {
//           console.error("Error in authorize:", error)
//           throw error // Re-throw the error for NextAuth to handle
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id
//         token.name = user.name
//         token.email = user.email
//         token.picture = user.image
//       }

//       if (account?.provider === "google") {
//         try {
//           await connectDb()
//           const dbUser = await User.findOne({ email: token.email })

//           if (!dbUser) {
//             const newUser = await User.create({
//               name: token.name,
//               email: token.email,
//               image: token.picture,
//               password: "",
//             })
//             token.id = newUser._id.toString()
//           } else {
//             token.id = dbUser._id.toString()
//           }
//         } catch (error) {
//           console.error("Error in jwt callback:", error)
//           // Consider how to handle this error - maybe set a flag on the token?
//         }
//       }

//       return token
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id
//         session.user.name = token.name
//         session.user.email = token.email
//         session.user.image = token.picture
//       }
//       return session
//     },
//     async redirect({ url, baseUrl }) {
//       // If the url is absolute or starts with a protocol, allow it
//       if (url.startsWith("http") || url.startsWith("https")) {
//         return url
//       }
//       // Otherwise, redirect to the dashboard
//       return `${baseUrl}/dashboard`
//     },
//   },
//   pages: {
//     signIn: "/login",
//     signOut: "/logout",
//     error: "/auth/error",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   secret: generateSecret(),
//   debug: process.env.NODE_ENV === "development",
//   useSecureCookies: process.env.NODE_ENV === "production",
//   cookies: {
//     sessionToken: {
//       name: `__Secure-next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: true,
//       },
//     },
//   },
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }












// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";
// import { connectDb } from "@/helper/db";

// // Generate a secret if one is not provided
// const generateSecret = () => {
//     if (!process.env.NEXTAUTH_SECRET) {
//         const crypto = require('crypto');
//         return crypto.randomBytes(32).toString('hex');
//     }
//     return process.env.NEXTAUTH_SECRET;
// };

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID || '',
//             clientSecret: process.env.GOOGLE_SECRET || '',
//         }),
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {},
//             async authorize(credentials) {
//                 const { email, password } = credentials;

//                 try {
//                     await connectDb();
//                     const user = await User.findOne({ email });

//                     if (!user) {
//                         return null;
//                     }

//                     const passwordsMatch = await bcrypt.compare(password, user.password);

//                     if (!passwordsMatch) {
//                         return null;
//                     }

//                     return {
//                         id: user._id.toString(),
//                         name: user.name,
//                         email: user.email,
//                         image: user.image
//                     };
//                 } catch (error) {
//                     console.log("Error: ", error);
//                     return null;
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user, account }) {
//             if (user) {
//                 token.id = user.id;
//                 token.name = user.name;
//                 token.email = user.email;
//                 token.picture = user.image;
//             }

//             if (account?.provider === "google") {
//                 try {
//                     await connectDb();
//                     const dbUser = await User.findOne({ email: token.email });

//                     if (!dbUser) {
//                         const newUser = await User.create({
//                             name: token.name,
//                             email: token.email,
//                             image: token.picture,
//                             password: "",
//                         });
//                         token.id = newUser._id.toString();
//                     } else {
//                         token.id = dbUser._id.toString();
//                     }
//                 } catch (error) {
//                     console.error("Error in jwt callback:", error);
//                 }
//             }

//             return token;
//         },

//         async session({ session, token }) {
//             if (session.user) {
//                 session.user.id = token.id;
//                 session.user.name = token.name;
//                 session.user.email = token.email;
//                 session.user.image = token.picture;
//             }
//             return session;
//         },
//     },
//     pages: {
//         signIn: "/",
//         error: '/auth/error',
//     },
//     session: {
//         strategy: "jwt",
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//     secret: generateSecret(),
//     debug: process.env.NODE_ENV === 'development',
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


























// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";
// import { connectDb } from "@/helper/db";

// // Generate a secret if one is not provided
// const generateSecret = () => {
//     if (!process.env.NEXTAUTH_SECRET) {
//         const crypto = require('crypto');
//         return crypto.randomBytes(32).toString('hex');
//     }
//     return process.env.NEXTAUTH_SECRET;
// };

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID || '',
//             clientSecret: process.env.GOOGLE_SECRET || '',
//         }),
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {},
//             async authorize(credentials) {
//                 const { email, password } = credentials;

//                 try {
//                     await connectDb();
//                     const user = await User.findOne({ email });

//                     if (!user) {
//                         return null;
//                     }

//                     const passwordsMatch = await bcrypt.compare(password, user.password);

//                     if (!passwordsMatch) {
//                         return null;
//                     }

//                     return {
//                         id: user._id.toString(),
//                         name: user.name,
//                         email: user.email,
//                         image: user.image
//                     };
//                 } catch (error) {
//                     console.log("Error: ", error);
//                     return null;
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user, account }) {
//             if (user) {
//                 token.id = user.id;
//                 token.name = user.name;
//                 token.email = user.email;
//                 token.picture = user.image;
//             }

//             if (account?.provider === "google") {
//                 try {
//                     await connectDb();
//                     const dbUser = await User.findOne({ email: token.email });

//                     if (!dbUser) {
//                         const newUser = await User.create({
//                             name: token.name,
//                             email: token.email,
//                             image: token.picture,
//                             password: "",
//                         });
//                         token.id = newUser._id.toString();
//                     } else {
//                         token.id = dbUser._id.toString();
//                     }
//                 } catch (error) {
//                     console.error("Error in jwt callback:", error);
//                 }
//             }

//             return token;
//         },

//         async session({ session, token }) {
//             if (session.user) {
//                 session.user.id = token.id;
//                 session.user.name = token.name;
//                 session.user.email = token.email;
//                 session.user.image = token.picture;
//             }
//             return session;
//         },
//     },
//     pages: {
//         signIn: "/",
//         error: '/auth/error',
//     },
//     session: {
//         strategy: "jwt",
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//     secret: generateSecret(),
//     debug: process.env.NODE_ENV === 'development',
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };




























