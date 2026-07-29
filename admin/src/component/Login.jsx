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
    <div className='min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100'>

      {/* LEFT SIDE - Login Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6'>
        <div className='w-full max-w-md'>

          {/* Logo / Brand */}
          <div className='flex items-center justify-center gap-3 mb-10'>
            <div className='rounded-3xl bg-amber-400/15 p-3 ring-1 ring-amber-400/30'>
              <ShoppingBag className='text-amber-300' size={28} />
            </div>
            <div>
              <p className='text-xs uppercase tracking-[0.35em] text-amber-300/80'>Premium admin</p>
              <h1 className='text-3xl font-extrabold text-white'>ShopEase</h1>
            </div>
          </div>

          <div className='rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-8 shadow-[0_40px_100px_-50px_rgba(15,23,42,0.9)]'>
            <h2 className='text-2xl font-semibold text-white mb-2'>Welcome back</h2>
            <p className='text-sm text-slate-400 mb-8'>Sign in to access the admin dashboard</p>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-500' size={18} />
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='your@email.com'
                    className='w-full rounded-3xl border border-slate-700 bg-slate-950/90 py-3 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-amber-400/80 focus:ring-2 focus:ring-amber-400/20'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-500' size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='w-full rounded-3xl border border-slate-700 bg-slate-950/90 py-3 pl-12 pr-12 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-amber-400/80 focus:ring-2 focus:ring-amber-400/20'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100 transition'
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full rounded-3xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-3'
              >
                {loading ? (
                  <>
                    <span className='h-4 w-4 animate-spin rounded-full border-2 border-slate-950/25 border-t-slate-950'></span>
                    Signing in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>

          <p className='text-center text-xs text-slate-500 mt-6'>
            © {new Date().getFullYear()} ShopEase Admin. All rights reserved.
          </p>
        </div>
      </div>

      <div className='hidden md:flex w-1/2 items-center justify-center relative overflow-hidden rounded-[48px] border border-slate-800/70 bg-slate-950 p-10'>
        <img
          src={loginBg}
          alt='Admin dashboard'
          className='absolute inset-0 h-full w-full object-cover opacity-90'
        />
        <div className='absolute inset-0 bg-slate-950/75'></div>
        <div className='relative z-10 text-center max-w-md'>
          <h1 className='text-5xl font-extrabold text-white tracking-tight mb-4'>SHOPEASE</h1>
          <p className='text-base text-slate-300 leading-8'>Manage products, orders & customers with a bold admin experience built for speed and clarity.</p>
          <div className='mt-10 rounded-[32px] border border-amber-400/15 bg-white/5 p-6 text-left text-sm text-slate-300'>
            <p className='mb-3 text-amber-300 font-semibold'>Admin quick tips</p>
            <ul className='space-y-2'>
              <li>• Fast access to orders and products</li>
              <li>• Elegant dashboard layout</li>
              <li>• Designed for modern admin workflows</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login