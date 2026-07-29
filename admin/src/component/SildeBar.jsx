import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const navClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-3xl px-4 py-3 transition duration-300 ${
      isActive
        ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
        : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
    }`

  return (
    <aside className='w-full max-w-[320px] flex-shrink-0 rounded-[32px] border border-slate-800/70 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20'>
      <div className='mb-8 rounded-[28px] border border-slate-800/70 bg-slate-950/80 p-5 text-center'>
        <p className='text-xs uppercase tracking-[0.35em] text-amber-300/80'>Control</p>
        <h2 className='mt-2 text-xl font-semibold text-white'>ShopEase Admin</h2>
        <p className='mt-2 text-sm text-slate-400'>Fast access to your admin tools</p>
      </div>

      <nav className='flex flex-col gap-3'>
        <NavLink to='/add' className={navClass}>
          <img className='w-5 h-5' src={assets.add_icon} alt='' />
          <span className='font-medium'>Add Items</span>
        </NavLink>

        <NavLink to='/list' className={navClass}>
          <img className='w-5 h-5' src={assets.order_icon} alt='' />
          <span className='font-medium'>List Products</span>
        </NavLink>

        <NavLink to='/orders' className={navClass}>
          <img className='w-5 h-5' src={assets.order_icon} alt='' />
          <span className='font-medium'>Orders</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar