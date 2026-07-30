import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const navClass = 'group flex items-center gap-3 rounded-3xl px-4 py-3 transition duration-300'

  return (
    <aside className='w-full max-w-[320px] flex-shrink-0 rounded-[32px] p-5 shadow-2xl' style={{ border: '1px solid var(--border)', background: 'var(--nav-bg)' }}>
      <div className='mb-8 rounded-[28px] p-5 text-center' style={{ border: '1px solid var(--border)', background: 'rgba(0,0,0,0.06)' }}>
        <p className='text-xs uppercase tracking-[0.35em] theme-accent-bg' style={{ padding: '6px 10px', borderRadius: 6, display: 'inline-block', color: 'var(--button-text)' }}>Control</p>
        <h2 className='mt-2 text-xl font-semibold theme-text'>ShopEase Admin</h2>
        <p className='mt-2 text-sm theme-muted'>Fast access to your admin tools</p>
      </div>

      <nav className='flex flex-col gap-3'>
        <NavLink to='/add' className={navClass} style={({ isActive }) => (isActive ? { background: 'var(--accent)', color: 'var(--button-text)' } : { color: 'var(--text)' })}>
          <img className='w-5 h-5' src={assets.add_icon} alt='' />
          <span className='font-medium'>Add Items</span>
        </NavLink>

        <NavLink to='/list' className={navClass} style={({ isActive }) => (isActive ? { background: 'var(--accent)', color: 'var(--button-text)' } : { color: 'var(--text)' })}>
          <img className='w-5 h-5' src={assets.order_icon} alt='' />
          <span className='font-medium'>List Products</span>
        </NavLink>

        <NavLink to='/orders' className={navClass} style={({ isActive }) => (isActive ? { background: 'var(--accent)', color: 'var(--button-text)' } : { color: 'var(--text)' })}>
          <img className='w-5 h-5' src={assets.order_icon} alt='' />
          <span className='font-medium'>Orders</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar