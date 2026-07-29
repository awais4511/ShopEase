import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className='my-10 grid gap-4 text-center text-sm text-slate-600 sm:grid-cols-3'>
      <div className='rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-sm'>
        <img src={assets.exchange_icon} className='m-auto mb-4 w-12' alt="" />
        <p className='font-semibold text-slate-800'>Easy exchange policy</p>
        <p className='mt-2 text-slate-500'>Hassle-free swaps for your favorite finds.</p>
      </div>

      <div className='rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-sm'>
        <img src={assets.quality_icon} className='m-auto mb-4 w-12' alt="" />
        <p className='font-semibold text-slate-800'>7-day return policy</p>
        <p className='mt-2 text-slate-500'>Buy with confidence and peace of mind.</p>
      </div>

      <div className='rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-sm'>
        <img src={assets.support_img} className='m-auto mb-4 w-12' alt="" />
        <p className='font-semibold text-slate-800'>Best customer support</p>
        <p className='mt-2 text-slate-500'>We are here to help around the clock.</p>
      </div>
    </div>
  )
}

export default OurPolicy