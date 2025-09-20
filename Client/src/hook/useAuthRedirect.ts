import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAccountStore from '../stores/others/AccountStore'

// 현재 계정 상태 확인
export const getAuthStatus = () => {
  const { isGuest } = useAccountStore.getState()
  const isLocal = localStorage.getItem('local-storage') ? true : false

  const isLogin = !!localStorage.getItem('token')

  return { isGuest, isLogin, isLocal }
}

// 로그인, 게스트, 로컬 유저만 접근 가능 (비 로그인 x)
export const useRequireUserOrGuest = (redirectUrl: string = '/', message?: boolean) => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const { isGuest, isLogin, isLocal } = getAuthStatus()

    if (!isLogin && !isGuest && !isLocal) {
      if (message) {
        alert('로그인 해주세요!!')
      }
      navigate(redirectUrl)
    }
    setChecked(true)
  }, [navigate, redirectUrl])

  return checked
}

// 로그인, 로컬 유저만 접근 가능 (게스트,  비 로그인 x)
export const useRequireUser = (redirectUrl: string = '/', message?: boolean) => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const { isGuest, isLogin, isLocal } = getAuthStatus()

    if (isGuest || !isLogin || isLocal) {
      if (message) {
        alert('로그인 해주세요!!')
      }
      navigate(redirectUrl)
    }
    setChecked(true)
  }, [navigate, redirectUrl])

  return checked
}

// 비 로그인 유저만 접근 가능 (로그인, 게스트, 로컬 x)
export const useRequireNoAuth = (redirectUrl: string = '/', message?: boolean) => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const { isGuest, isLogin, isLocal } = getAuthStatus()

    if (isLogin || isGuest || isLocal) {
      if (message) {
        alert('로그아웃 됩니다!!')
      }
      navigate(redirectUrl)
    }
    setChecked(true)
  }, [navigate, redirectUrl])

  return checked
}
