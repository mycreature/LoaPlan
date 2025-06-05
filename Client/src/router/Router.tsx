import { ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../layouts/Header'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Account from '../pages/Account'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  // const location = useLocation()

  // Header가 안나오는 페이지 설정
  // const excludedPaths: string[] = ['/non-member', '/login']

  return (
    <>
      {<Header />}
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
        <Route
          path='/register'
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path='/login'
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path='/account'
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
