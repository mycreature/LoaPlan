import React from 'react'
import Button from './Button'

interface ModalProps {
  open: boolean
  isButton?: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ open, onClose, children, isButton = false }: ModalProps) => {
  if (!open) return null

  const handleOverlayClick = () => {
    onClose()
  }

  // 이벤트 버블링 차단 함수
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={handleOverlayClick}
    >
      <div
        className='min-w-[300px] rounded-lg bg-white p-6 shadow-lg'
        onClick={handleModalContentClick}
      >
        {children}
        {isButton && <Button text='닫기' onClick={onClose} />}
      </div>
    </div>
  )
}

export default Modal
