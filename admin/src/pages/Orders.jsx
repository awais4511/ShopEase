import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { backendUrl, currency } from '../App'

const statusColors = {
  'Order Placed': { background: 'rgba(245,158,11,0.12)', color: 'var(--accent)' },
  Packing: { background: 'rgba(148,163,184,0.12)', color: 'var(--text)' },
  Shipped: { background: 'rgba(56,189,248,0.08)', color: '#60a5fa' },
  'Out for delivey': { background: 'rgba(139,92,246,0.08)', color: '#c084fc' },
  Delivered: { background: 'rgba(16,185,129,0.08)', color: '#34d399' },
}

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className='space-y-6'>
      <div className='glass-card p-6'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.35em] text-amber-600'>Orders center</p>
            <h2 className='mt-2 text-2xl font-semibold text-slate-900 dark:text-white'>Manage all orders</h2>
          </div>
          <p className='text-sm text-slate-500 dark:text-slate-400'>{orders.length} orders</p>
        </div>
      </div>

      <div className='space-y-4'>
        {orders.length === 0 ? (
          <div className='rounded-[2rem] border border-slate-200 bg-white/80 p-10 text-center text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300'>
            No orders available
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className='rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-sm transition duration-300 dark:border-slate-700 dark:bg-slate-900/80'
            >
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-3'>
                  <img className='h-12 w-12 rounded-2xl p-3 bg-slate-100 dark:bg-slate-800' src={assets.parcel_icon} alt='' />
                  <div>
                    <p className='text-xl font-semibold text-slate-900 dark:text-white'>Order {index + 1}</p>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : order.status === 'Shipped' ? 'bg-sky-100 text-sky-700' : order.status === 'Packing' ? 'bg-slate-100 text-slate-700' : order.status === 'Out for delivey' ? 'bg-violet-100 text-violet-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className='mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr_0.8fr]'>
                <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/80'>
                  <p className='text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400'>Items</p>
                  <div className='mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400'>
                    {order.items.map((item, idx) => (
                      <p key={idx} className='leading-6'>
                        <span className='font-semibold text-slate-900 dark:text-white'>{item.name}</span> x {item.quantity} <span className='text-slate-500 dark:text-slate-400'>({item.size})</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/80'>
                  <p className='text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400'>Shipping</p>
                  <p className='mt-3 text-sm text-slate-900 dark:text-white'>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    {order.address.street}, {order.address.city}, {order.address.state}
                  </p>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    {order.address.country} • {order.address.zipcode}
                  </p>
                  <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>{order.address.phone}</p>
                </div>

                <div className='rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/80'>
                  <p className='text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400'>Payment</p>
                  <p className='mt-3 text-xl font-semibold text-slate-900 dark:text-white'>
                    {currency}{order.amount}
                  </p>
                  <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>Method: {order.paymentMethod}</p>
                  <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>Status: {order.payment ? 'Paid' : 'Pending'}</p>
                </div>
              </div>

              <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div className='text-sm text-slate-500 dark:text-slate-400'>Total items: {order.items.length}</div>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  className='max-w-[240px] rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-amber-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                  value={order.status}
                >
                  <option value='Order Placed'>Order Placed</option>
                  <option value='Packing'>Packing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Out for delivey'>Out for delivey</option>
                  <option value='Delivered'>Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
};

export default Orders;