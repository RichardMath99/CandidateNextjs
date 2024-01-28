'use client'
import React from 'react'
import Image from 'next/image'
import cathoLogo from '../../../../public/assets/images/logo_catho.svg'
import SearchForm from '../../../components/SearchForm'
import '../../global.css'

const Search = () => {
  return (
    <article>
      <Image
        src={cathoLogo}
        alt="Logo Catho"
        width={150}
        height={150}
        className="catho-logo"
      />
      <h1>Buscar candidatos</h1>
      <SearchForm />
    </article>
  )
}

export default Search
