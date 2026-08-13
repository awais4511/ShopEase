import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import SildeBar from './component/SildeBar'
import Login from './component/Login'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://shopease-v8zt.onrender.com'
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ?? '')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className='app-root'>
      <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} position='top-right' />

      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <div className='min-h-screen'>
          <Navbar setToken={setToken} theme={theme} setTheme={setTheme} />
          <div className='mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-6 lg:flex-row'>
              <SildeBar />
              <main className='flex-1 space-y-6'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App