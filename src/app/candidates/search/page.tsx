'use client'
import React from 'react'
import Image from 'next/image'
import cathoLogo from '../../../../public/assets/images/logo_catho.svg'
import SearchForm from '../../../components/SearchForm'
import Title from '../../../components/Title'

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
      <Title text="Buscar candidatos" />
      <SearchForm />
    </article>
  )
}

export default Search
