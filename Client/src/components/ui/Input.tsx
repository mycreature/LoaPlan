import React from 'react'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  className = '',
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className} focus:ring-green rounded-lg border p-2 focus:ring-2 focus:outline-none`}
      disabled={disabled}
    />
  )
}

export default Input
