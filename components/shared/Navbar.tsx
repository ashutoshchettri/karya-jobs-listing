'use client'

import Link from 'next/link'
import { navLinks } from '@/constants'
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import Button from '../ui/Button'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  
  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu)
  }

  return (
    <nav className="py-5 bg-transparent relative top-0 z-10 w-full">
      <div className="max-w-[1450px] w-[90%] mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center gap-1">
            <h1 className="text-black font-semibold uppercase text-xl">
              Karya
            </h1>
          </div>
        </Link>

        <ul className="flex gap-16 items-center max-md:hidden text-black">
          {navLinks.map((link, index) => (
            <Link href={link.route} key={index}>
              <li>{link.name}</li>
            </Link>
          ))}
          
          {/* Role-based link visibility */}
          {session?.user?.role === 'COMPANY' && (
            <Link href="/create">
              <li>Create</li>
            </Link>
          )}
          {session?.user?.role === 'USER' && (
            <Link href="/favorites">
              <li>Favorites</li>
            </Link>
          )}
        </ul>

        <div className="max-md flex justify-center items-center gap-10 text-black">
          {/* Login/Logout button */}
          {!session ? (
            <Link href="/signin">
              <Button>Login</Button>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-black font-semibold">
                {session.user?.name}
              </span>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </div>
          )}

          <div className="md:hidden text-3xl cursor-pointer text-black" onClick={handleOpenMobileMenu}>
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>

          {/* Mobile Menu */}
          {openMobileMenu && (
            <ul className="bg-white text-black md:hidden absolute top-14 right-5 px-4 py-6 text-center rounded-md flex flex-col gap-3 shadow-md">
              {navLinks.map((link, index) => (
                <Link href={link.route} key={index} onClick={() => setOpenMobileMenu(false)}>
                  <li>{link.name}</li>
                </Link>
              ))}

              {/* Role-based mobile links */}
              {session?.user?.role === 'COMPANY' && (
                <Link href="/create" onClick={() => setOpenMobileMenu(false)}>
                  <li>Create</li>
                </Link>
              )}
              {session?.user?.role === 'USER' && (
                <Link href="/favorites" onClick={() => setOpenMobileMenu(false)}>
                  <li>Favorites</li>
                </Link>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
