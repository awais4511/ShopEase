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
    <div className='min-h-screen flex flex-col md:flex-row'>

      {/* LEFT SIDE - Login Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6'>
        <div className='w-full max-w-md'>

          {/* Logo / Brand */}
          <div className='flex items-center justify-center gap-3 mb-10'>
            <div style={{ borderRadius: 12, padding: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.12)' }}>
              <ShoppingBag size={28} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className='text-xs uppercase tracking-[0.35em]' style={{ color: 'var(--accent)' }}>Premium admin</p>
              <h1 className='text-3xl font-extrabold' style={{ color: 'var(--text)' }}>ShopEase</h1>
            </div>
          </div>

          <div className='rounded-[32px] p-8' style={{ border: '1px solid var(--border)', background: 'var(--nav-bg)', boxShadow: '0 40px 100px -50px rgba(0,0,0,0.6)' }}>
            <h2 className='text-2xl font-semibold mb-2' style={{ color: 'var(--text)' }}>Welcome back</h2>
            <p className='text-sm mb-8' style={{ color: 'var(--muted)' }}>Sign in to access the admin dashboard</p>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='block text-sm font-medium mb-2' style={{ color: 'var(--muted)' }}>
                  Email Address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-4 top-1/2 -translate-y-1/2' size={18} style={{ color: 'var(--muted)' }} />
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='your@email.com'
                    className='w-full rounded-3xl py-3 pl-12 pr-4 outline-none transition'
                    style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium mb-2' style={{ color: 'var(--muted)' }}>
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 -translate-y-1/2' size={18} style={{ color: 'var(--muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='w-full rounded-3xl py-3 pl-12 pr-12 outline-none transition'
                    style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 transition'
                    style={{ color: 'var(--muted)' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full rounded-3xl px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-3'
                style={{ background: 'var(--accent)', color: 'var(--button-text)' }}
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

          <p className='text-center text-xs mt-6' style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} ShopEase Admin. All rights reserved.
          </p>
        </div>
      </div>

      <div className='hidden md:flex w-1/2 items-center justify-center relative overflow-hidden rounded-[48px] p-10' style={{ border: '1px solid var(--border)' }}>
        <img
          src={loginBg}
          alt='Admin dashboard'
          className='absolute inset-0 h-full w-full object-cover opacity-90'
        />
        <div className='absolute inset-0' style={{ background: 'var(--nav-bg)', opacity: 0.75 }}></div>
        <div className='relative z-10 text-center max-w-md'>
          <h1 className='text-5xl font-extrabold tracking-tight mb-4' style={{ color: 'var(--text)' }}>SHOPEASE</h1>
          <p className='text-base leading-8' style={{ color: 'var(--muted)' }}>Manage products, orders & customers with a bold admin experience built for speed and clarity.</p>
          <div className='mt-10 rounded-[32px] p-6 text-left text-sm' style={{ border: '1px solid rgba(245,158,11,0.08)', background: 'rgba(255,255,255,0.02)', color: 'var(--muted)' }}>
            <p className='mb-3 font-semibold' style={{ color: 'var(--accent)' }}>Admin quick tips</p>
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