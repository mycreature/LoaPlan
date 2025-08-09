interface LoadingProps {
  width?: number
  height?: number
}

const Loading = ({ width = 40, height = 40 }: LoadingProps) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className='border-t-green animate-spin rounded-full border-8 border-gray-300'
    />
  )
}

export default Loading
