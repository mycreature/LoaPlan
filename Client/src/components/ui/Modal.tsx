import React from 'react'
import Button from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='min-w-[300px] rounded-lg bg-white p-6 shadow-lg'>
        {children}
        <Button text='닫기' onClick={onClose} />
      </div>
    </div>
  )
}

export default Modal
