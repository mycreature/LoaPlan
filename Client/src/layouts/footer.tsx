import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='fixed bottom-0 left-0 z-40 flex h-[40px] w-full items-center justify-center bg-black'>
      <div className='flex gap-5 text-sm text-white'>
        <p>© 2025 LOAPLAN. All rights reserved.</p>
        <Link to='/privacy-policy' className='text-white underline'>
          개인정보처리방침
        </Link>
      </div>
    </footer>
  )
}

export default Footer
