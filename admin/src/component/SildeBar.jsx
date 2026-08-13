import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const navClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition ${
      isActive
        ? 'bg-amber-600 text-white shadow-sm'
        : 'text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800'
    }`

  return (
    <aside className='w-full max-w-[320px] flex-shrink-0 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80'>
      <div className='mb-8 rounded-[2rem] border border-slate-200 bg-slate-50/80 p-5 text-center dark:border-slate-700 dark:bg-slate-950/80'>
        <p className='text-xs uppercase tracking-[0.35em] text-amber-600'>Control</p>
        <h2 className='mt-2 text-xl font-semibold text-slate-900 dark:text-white'>ShopEase Admin</h2>
        <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>Fast access to your admin tools</p>
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