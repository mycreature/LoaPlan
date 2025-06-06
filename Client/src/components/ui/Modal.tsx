import React from 'react'

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
        <button className='bg-green mt-4 rounded px-4 py-2 text-white' onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default Modal
