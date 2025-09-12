import React, { useEffect, useState } from 'react'
import Button from './Button'

interface ModalProps {
  open: boolean
  isButton?: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ open, onClose, children, isButton = false }: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (open) {
      // 모달이 open 상태일시 isAnimating 값 true 변경 (애니메이션)
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      // 아니라면 false
      setIsAnimating(false)
    }
  }, [open])

  // 이미 open 상태라면 반응 x
  if (!open) return null

  const handleOverlayClick = () => {
    onClose()
  }

  // 모달 클릭시 이벤트 버블링을 방지
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-40'
      onClick={handleOverlayClick}
    >
      <div
        className={`transform rounded-lg bg-white shadow-2xl transition-all duration-250 ease-out ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} `}
        onClick={handleModalContentClick}
      >
        {children}
        {isButton && <Button text='닫기' onClick={onClose} />}
      </div>
    </div>
  )
}

export default Modal
