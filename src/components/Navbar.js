"use client"

import Link from "next/link"
import { useState } from "react"
import { useSession } from "next-auth/react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-white">Blog</span>
            <span className="text-[#ff4d4d]">World.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#ff4d4d] transition-colors">
              HOME
            </Link>
            <Link href="/showBlog" className="hover:text-[#ff4d4d] transition-colors">
              SHOW BLOG
            </Link>
            {status === "authenticated" ? (
              <>
                <Link href="/add-blog" className="hover:text-[#ff4d4d] transition-colors">
                  ADD BLOG
                </Link>
                <Link href="/user-admin" className="hover:text-[#ff4d4d] transition-colors">
                  DASHBOARD
                </Link>
              </>
            ) : (
              <Link href="/login" className="hover:text-[#ff4d4d] transition-colors">
                LOGIN
              </Link>
            )}
          </div>

          {status === "authenticated" ? (
            <Link
              href="/user-admin"
              className="hidden md:block px-6 py-2 rounded-full border-2 border-[#ff4d4d] text-[#ff4d4d] hover:bg-[#ff4d4d] hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden md:block px-6 py-2 rounded-full border-2 border-[#ff4d4d] text-[#ff4d4d] hover:bg-[#ff4d4d] hover:text-white transition-colors"
            >
              LOGIN
            </Link>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {!isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </nav>

        {isOpen && (
          <div className="md:hidden pt-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-[#ff4d4d] transition-colors">
                HOME
              </Link>
              <Link href="/showBlog" className="hover:text-[#ff4d4d] transition-colors">
                SHOW BLOG
              </Link>
              {status === "authenticated" ? (
                <>
                  <Link href="/add-blog" className="hover:text-[#ff4d4d] transition-colors">
                    ADD BLOG
                  </Link>
                  <Link href="/user-admin" className="hover:text-[#ff4d4d] transition-colors">
                    DASHBOARD
                  </Link>
                </>
              ) : (
                <Link href="/login" className="hover:text-[#ff4d4d] transition-colors">
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar













