import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
