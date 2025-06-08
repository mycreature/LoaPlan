interface ErrorTextProps {
  message?: string
}

const ErrorText = ({ message }: ErrorTextProps) => {
  if (!message) return null

  return (
    <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
      {message}
    </span>
  )
}

export default ErrorText
