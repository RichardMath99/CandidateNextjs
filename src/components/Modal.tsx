import React from 'react'
import { ModalProps } from '../types/index'

const Modal = (props: ModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Cadastro bem-sucedido!</p>
        <button onClick={props.onClose}>Fechar</button>
      </div>
    </div>
  )
}

export default Modal
