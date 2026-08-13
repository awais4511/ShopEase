import React from 'react'
import { Moon, Sun } from 'lucide-react'

const Navbar = ({ setToken, theme, setTheme }) => {
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <header className='sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/90'>
      <div className='mx-auto flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.35em] text-amber-600'>Admin dashboard</p>
            <h1 className='text-3xl font-black text-slate-900 dark:text-white'>ShopEase Control</h1>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <button
              onClick={toggleTheme}
              aria-label='Toggle theme'
              className='inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold transition hover:border-amber-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={() => setToken('')}
              className='button-primary'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar