'use client'
import React from 'react'
import Link from 'next/link'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  return (
    <header>
      <div className="container">
        <nav className="nav-bar">
          <Link
            href="/candidates/register"
            className={`nav-links ${pathname === '/candidates/register' && 'active'}`}
          >
            <FaPlus /> Cadastrar
          </Link>
          <Link
            href="/candidates/search"
            className={`nav-links ${pathname === '/candidates/search' && 'active'}`}
          >
            <FaSearch /> Buscar
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
