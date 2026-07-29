import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { setSearch, setShowSearch } from '../features/shop/shopSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { search, showSearch } = useSelector((state) => state.shop);
  const location = useLocation();

  useEffect(() => {
    dispatch(setShowSearch(false));
  }, [location]);

  return showSearch ? (
    <div className='my-4 rounded-[1.5rem] border border-slate-200 bg-white/90 px-3 py-2 text-center shadow-sm'>
      <div className='mx-auto inline-flex w-full max-w-2xl items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2'>
        <input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className='flex-1 bg-transparent text-sm outline-none'
          type="text"
          placeholder='Search products'
        />
        <img
          onClick={() => dispatch(setShowSearch(false))}
          className='ml-2 inline w-3 cursor-pointer'
          src={assets.cross_icon}
          alt=""
        />
      </div>
    </div>
  ) : null
};

export default SearchBar;