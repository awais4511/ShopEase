import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { setSearch, setShowSearch } from '../features/shop/shopSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { search, showSearch } = useSelector((state) => state.shop);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/shop') {
      dispatch(setShowSearch(false));
    }
  }, [dispatch, location.pathname]);

  if (location.pathname !== '/shop') {
    return null;
  }

  return (
    <div className={`overflow-hidden transition-all duration-300 ease-out ${showSearch ? 'mt-4 max-h-24 opacity-100' : 'mt-0 max-h-0 opacity-0'}`}>
      <div className='rounded-[1.5rem] border border-slate-200 bg-white/90 px-3 py-3 shadow-[0_10px_35px_-18px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80'>
        <div className='mx-auto flex w-full max-w-2xl items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-inner transition focus-within:border-amber-400 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:focus-within:border-amber-500 dark:focus-within:bg-slate-900'>
          <Search className='mr-2 h-4 w-4 text-slate-400' />
          <input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className='flex-1 bg-transparent text-sm outline-none dark:text-slate-100'
            type='text'
            placeholder='Search products'
          />
          <button type='button' onClick={() => dispatch(setShowSearch(false))} className='ml-2 rounded-full p-1.5 transition hover:bg-slate-200 dark:hover:bg-slate-700'>
            <X className='h-4 w-4 text-slate-500' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;