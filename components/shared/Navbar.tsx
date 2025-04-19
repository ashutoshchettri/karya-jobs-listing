'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

const sectionLinks = [
  { name: 'Home', route: '/' },
  { name: 'Jobs', route: '#jobs' },
  { name: 'About', route: '#about' },
  { name: 'Contact', route: '#contact' }
]

const Navbar = () => {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const profileRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const toggleDropdown = () => setDropdownOpen(prev => !prev)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const roleLinks = session?.user?.role === 'COMPANY'
    ? [{ name: 'Create Job', route: '/create' }]
    : session?.user?.role === 'USER'
    ? [{ name: 'Favorites', route: '/favorites' }]
    : []

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200">
      <nav className="max-w-[1300px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
          Karya<span className="text-black">.</span>
        </Link>

        <ul className="hidden md:flex flex-1 justify-center items-center gap-8 text-gray-700 text-sm font-medium">
          {sectionLinks.map(link => (
            <li key={link.name}>
              <Link href={link.route} className="hover:text-blue-600 transition">
                {link.name}
              </Link>
            </li>
          ))}
          {roleLinks.map(link => (
            <li key={link.name}>
              <Link href={link.route} className="hover:text-blue-600 transition">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {!session ? (
            <>
              <Link href="/signin">
                <button className="px-4 py-2 text-sm bg-black text-white rounded-full font-semibold hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={profileRef}>
              <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                <FaUserCircle size={22} className="text-gray-600" />
                <span className="text-sm text-gray-800">{session.user?.name}</span>
              </div>

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-[-20] mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                >
                  <div className="py-2 px-4">
                    <button
                      onClick={() => {
                        signOut({callbackUrl: '/'})
                        setDropdownOpen(false)
                      }}
                      className="w-full text-left text-sm text-red-600 font-semibold hover:bg-gray-100 rounded-md px-3 py-2 transition ease-in-out"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden text-2xl text-gray-700 cursor-pointer" onClick={toggleMenu}>
          {mobileMenuOpen ? <MdClose /> : <FiMenu />}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-white/90 backdrop-blur-md shadow-xl rounded-b-xl transition-all duration-300 ease-in-out">
          <ul className="flex flex-col gap-5 text-gray-800 text-sm font-medium">
            {sectionLinks.map(link => (
              <li key={link.name}>
                <Link href={link.route} onClick={toggleMenu}>
                  {link.name}
                </Link>
              </li>
            ))}
            {roleLinks.map(link => (
              <li key={link.name}>
                <Link href={link.route} onClick={toggleMenu}>
                  {link.name}
                </Link>
              </li>
            ))}

            {!session ? (
              <li>
                <Link href="/signin" onClick={toggleMenu}>
                  <button className="w-full text-left text-blue-600 font-semibold">
                    Login
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    signOut({callbackUrl: '/'})
                    toggleMenu()
                  }}
                  className="w-full text-left text-red-600"
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
