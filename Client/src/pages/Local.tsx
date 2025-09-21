import Block from '../components/ui/Block'
import { useState } from 'react'
import { LocalUserFormData } from '../types/Types'

import { useRequireNoAuth } from '../hook/useAuthRedirect'

import { useNavigate } from 'react-router-dom'
import LocalLoginForm from '../components/form/LocalLoginForm'
import { requestLocalLogin } from '../api/userApi'

const Local = () => {
  const [loadingLocal, setLoadingLocal] = useState(false)
  const navigate = useNavigate()

  // 비로그인시만 접근가능 (로그인, 게스트시 메인페이지 리다이렉트)
  const checked = useRequireNoAuth()

  if (!checked) return null

  const handleLoginSubmit = async (data: LocalUserFormData) => {
    // 로컬 모드 경고 안내
    const proceed = window.confirm(
      '다른 기기나 브라우저에서는 데이터가 연동되지 않습니다.\n계속 진행하시겠습니까?',
    )
    if (!proceed) return

    setLoadingLocal(true)
    try {
      await requestLocalLogin(data)
      navigate('/')
    } catch (error: any) {
      alert(error.response?.data?.message || '로컬 로그인 중 오류 발생')
    } finally {
      setLoadingLocal(false)
    }
  }

  return (
    <main className='flex h-full w-full grid-cols-1 justify-center'>
      <Block height={262} title='로컬 로그인' auth={true}>
        <div className='flex'>
          <LocalLoginForm onSubmit={handleLoginSubmit} isLoading={loadingLocal} />
        </div>
      </Block>
    </main>
  )
}

export default Local
