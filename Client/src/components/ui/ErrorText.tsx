interface ErrorTextProps {
  message?: string
}

const ErrorText = ({ message }: ErrorTextProps) => {
  if (!message) return <div className='my-1 h-5' /> // 빈 공간 유지

  return (
    <span style={{ color: 'red', fontSize: '14px', height: '20px' }} className='my-1'>
      {message}
    </span>
  )
}

export default ErrorText
