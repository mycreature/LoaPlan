import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 로그인 or 게스트 유저만 접근 가능 (비 로그인 x)
export const useRequireUserOrGuest = (redirectUrl: string = '/') => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogin = !!localStorage.getItem('token')
    const isGuest = !!localStorage.getItem('account-storage')

    if (!isLogin && !isGuest) {
      navigate(redirectUrl)
    }
  }, [navigate, redirectUrl])
}

// 로그인 유저만 접근 가능 (게스트, 비 로그인 x)
export const useRequireUser = (redirectUrl: string = '/') => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogin = !!localStorage.getItem('token')
    const isGuest = !!sessionStorage.getItem('guest-storage')

    if (isGuest || !isLogin) {
      navigate(redirectUrl)
    }
  }, [navigate, redirectUrl])
}

// 비 로그인 유저만 접근 가능 (로그인, 게스트 x)
export const useRequireNoAuth = (redirectUrl: string = '/') => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogin = !!localStorage.getItem('token')
    const isGuest = !!sessionStorage.getItem('guest-token')

    if (isLogin || isGuest) {
      navigate(redirectUrl)
    }
  }, [navigate, redirectUrl])
}
