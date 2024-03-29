'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import cathoLogo from '../../../../public/assets/images/logo_catho.svg'

import CandidateForm from '@/components/CandidateForm'
import Modal from '@/components/Modal'
import Title from '@/components/Title'

const Register = () => {
  const [showModal, setShowModal] = useState(false)

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleFormSubmitSuccess = () => {
    setShowModal(true)
  }

  return (
    <article>
      <Image
        src={cathoLogo}
        alt="Logo Catho"
        width={150}
        height={150}
        className="catho-logo"
      />
      <Title text="Cadastro" />
      <CandidateForm onSubmitSuccess={handleFormSubmitSuccess} />
      {showModal && <Modal onClose={handleModalClose} />}
    </article>
  )
}

export default Register
