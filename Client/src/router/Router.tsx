import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Userinfo from '../pages/Userinfo'
import FindPassword from '../pages/FindPassword'
import WeeklyGold from '../pages/WeeklyGold'
import Layout from '../layouts/DefaultLayout'
import TimeEfficiency from '../pages/TimeEfficiency'
import PrivacyPolicy from '../pages/PrivacyPolicy'

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
          path='/Userinfo'
          element={
            <Layout>
              <Userinfo />
            </Layout>
          }
        />
        <Route
          path='/find-password'
          element={
            <Layout>
              <FindPassword />
            </Layout>
          }
        />
        <Route
          path='/weekly-Gold'
          element={
            <Layout>
              <WeeklyGold />
            </Layout>
          }
        />
        <Route
          path='/time-efficiency'
          element={
            <Layout>
              <TimeEfficiency />
            </Layout>
          }
        />
        <Route
          path='/privacy-policy'
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
