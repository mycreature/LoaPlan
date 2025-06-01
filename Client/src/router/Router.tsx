import { ReactNode } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from '../layouts/Header'
import Home from '../pages/Home'
import Auth from '../pages/Auth'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  // Header가 안나오는 페이지 설정
  const excludedPaths: string[] = ['/non-member', '/login']

  return (
    <>
      {!excludedPaths.includes(location.pathname) && <Header />}
      {children}
    </>
  )
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
      <Routes>
        <Route
          path='/auth'
          element={
            <Layout>
              <Auth />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
