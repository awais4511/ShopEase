import React from 'react'
import { Moon, Sun } from 'lucide-react'

const Navbar = ({ setToken, theme, setTheme }) => {
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <header className='w-full border-b sticky top-0 z-20 theme-border' style={{ background: 'var(--nav-bg)' }}>
      <div className='max-w-[1480px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 py-5 md:px-6'>
        <div>
          <p className='text-sm uppercase tracking-[0.35em] theme-muted mb-2'>Admin dashboard</p>
          <h1 className='text-3xl md:text-4xl font-black theme-text'>ShopEase Control</h1>
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={toggleTheme}
            aria-label='Toggle theme'
            className='inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition duration-200'
            style={{ background: 'transparent', color: 'var(--text)' }}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => setToken('')}
            className='inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition duration-300'
            style={{ background: 'var(--accent)', color: 'var(--button-text)' }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar