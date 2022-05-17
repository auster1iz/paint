import React from 'react'
import { createPortal } from 'react-dom'
import '../styles/modal.scss'

export const Modal = ({ isOpen, closeModal, children }) => {
    const container = document.getElementById('portal')

    if (!isOpen) return null
    return container
        ? createPortal(
              <div className="modal__container" onClick={closeModal}>
                  <div
                      className="modal__window"
                      onClick={(e) => e.stopPropagation()}
                  >
                      <div className="modal__window__close">
                          <i onClick={closeModal}>x</i>
                      </div>
                      {children}
                  </div>
              </div>,
              container
          )
        : null
}
