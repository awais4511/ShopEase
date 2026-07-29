import React from 'react'

const Navbar = ({ setToken }) => {
  return (
    <header className='w-full border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-xl shadow-[0_18px_60px_-40px_rgba(15,23,42,0.9)] sticky top-0 z-20'>
      <div className='max-w-[1480px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 py-5 md:px-6'>
        <div>
          <p className='text-sm uppercase tracking-[0.35em] text-amber-300/80 mb-2'>Admin dashboard</p>
          <h1 className='text-3xl md:text-4xl font-black text-white'>ShopEase Control</h1>
        </div>

        <button
          onClick={() => setToken('')}
          className='inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/25 transition duration-300 hover:bg-amber-300 hover:-translate-y-0.5'
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar