import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import { assets } from '../assets/assets';
import { clearCart, getCartAmount } from '../features/shop/shopSlice';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backendUrl, token, cartItem, products, delivery_fee } = useSelector((state) => state.shop);
  const cartAmount = useSelector(getCartAmount);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []

      for(const items in cartItem) {
        for(const item in cartItem[items]){
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: cartAmount + delivery_fee
      }

            switch (method) {

        // API Calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
          if (response.data.success) {
            dispatch(clearCart())
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
}

  return (
    <form onSubmit={onSubmitHandler} className='mt-6 grid gap-6 rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-sm sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8'>
      <div className='flex flex-col gap-4'>
        <div className='text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='grid gap-3 sm:grid-cols-2'>
          <input
            required
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
            type="text"
            placeholder='First name'
          />
          <input
            required
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
            type="text"
            placeholder='Last name'
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
          type="email"
          placeholder='Email address'
        />

        <input
          required
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
          type="text"
          placeholder='Street'
        />

        <div className='grid gap-3 sm:grid-cols-2'>
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
            type="text"
            placeholder='City'
          />
          <input
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
            type="text"
            placeholder='State'
          />
        </div>

        <div className='grid gap-3 sm:grid-cols-2'>
          <input
            required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
            type="number"
            placeholder='Zipcode'
          />
          <input
            required
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
            type="text"
            placeholder='Country'
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white'
          type="number"
          placeholder='Phone'
        />
      </div>

      <div className='flex flex-col gap-5'>
        <div>
          <CartTotal />
        </div>

        <div className='rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='mt-4 flex flex-col gap-3'>
            <div onClick={() => setMethod('stripe')} className='flex cursor-pointer items-center gap-3 rounded-[1rem] border border-slate-200 bg-white p-3 transition hover:border-amber-400'>
              <p className={`h-3.5 min-w-3.5 rounded-full border ${method === 'stripe' ? 'bg-amber-500' : 'bg-white'}`}></p>
              <img className='mx-2 h-5' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => setMethod('cod')} className='flex cursor-pointer items-center gap-3 rounded-[1rem] border border-slate-200 bg-white p-3 transition hover:border-amber-400'>
              <p className={`h-3.5 min-w-3.5 rounded-full border ${method === 'cod' ? 'bg-amber-500' : 'bg-white'}`}></p>
              <p className='mx-2 text-sm font-semibold text-slate-600'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='mt-6 text-end'>
            <button type='submit' className='rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-amber-600'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;