import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Mail, Lock, Eye, EyeOff, ShoppingBag } from 'lucide-react'
import loginBg from '../assets/shopping.jpg'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/admin`, {
        email,
        password
      })

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error('Login error:', error)
      alert(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/90 lg:grid lg:grid-cols-[0.95fr_1.05fr]'>
        <div className='flex flex-col justify-center gap-8 p-8 lg:p-10'>
          <div>
            <p className='text-sm uppercase tracking-[0.35em] text-amber-600'>Admin access</p>
            <h1 className='mt-2 text-4xl font-black text-slate-900 dark:text-white'>Welcome back</h1>
            <p className='mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400'>Sign in to manage products, approve orders, and keep your admin dashboard aligned with the ShopEase mobile-inspired design.</p>
          </div>

          <div className='rounded-[2rem] border border-slate-200 bg-slate-50/90 p-6 dark:border-slate-700 dark:bg-slate-950/80'>
            <div className='mb-6'>
              <p className='text-sm uppercase tracking-[0.35em] text-amber-600'>ShopEase Admin</p>
              <h2 className='mt-2 text-3xl font-semibold text-slate-900 dark:text-white'>Login to your dashboard</h2>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300'>Email</label>
                <div className='relative'>
                  <Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='your@email.com'
                    className='w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 pl-12 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300'>Password</label>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 pl-12 pr-12 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='button-primary w-full'
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>
          </div>

          <p className='text-center text-sm text-slate-500 dark:text-slate-400'>© {new Date().getFullYear()} ShopEase Admin. All rights reserved.</p>
        </div>

        <div className='hidden lg:flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-orange-100 p-10'>
          <div className='w-full max-w-md space-y-6'>
            <h2 className='text-3xl font-black text-slate-900 dark:text-white'>Admin tools built to feel like mobile.</h2>
            <p className='text-sm leading-7 text-slate-600 dark:text-slate-300'>Keep order approval, catalog control, and admin status updates fast and intuitive with a modern mobile-style interface.</p>
            <div className='rounded-[1.75rem] border border-white/60 bg-white/90 p-6 shadow-sm'>
              <p className='text-sm font-semibold text-amber-700'>Admin quick tips</p>
              <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                <li>• Review pending orders in one tap</li>
                <li>• Keep product data clean and updated</li>
                <li>• Use a layout that scales nicely on phones</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login