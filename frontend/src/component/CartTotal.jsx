import React from 'react';
import { useSelector } from 'react-redux';
import Title from '../component/Title';
import { getCartAmount } from '../features/shop/shopSlice';

const CartTotal = () => {
  const { currency, delivery_fee } = useSelector((state) => state.shop);
  const cartAmount = useSelector(getCartAmount);

  return (
    <div className='w-full rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-sm'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='mt-4 flex flex-col gap-3 text-sm text-slate-600'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {cartAmount}.00</p>
        </div>
        <div className='h-[1px] w-full bg-slate-200' />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>
        <div className='h-[1px] w-full bg-slate-200' />
        <div className='flex justify-between text-base font-semibold text-slate-800'>
          <b>Total</b>
          <b>{currency} {cartAmount === 0 ? 0 : cartAmount + delivery_fee}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal;