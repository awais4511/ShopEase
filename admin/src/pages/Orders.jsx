import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { backendUrl, currency } from '../App'

const statusColors = {
  'Order Placed': 'bg-amber-500/15 text-amber-300',
  Packing: 'bg-slate-700/60 text-slate-100',
  Shipped: 'bg-sky-500/15 text-sky-300',
  'Out for delivey': 'bg-violet-500/15 text-violet-300',
  Delivered: 'bg-emerald-500/15 text-emerald-300',
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
      <div className='rounded-[32px] border border-slate-800/70 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/20'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.35em] text-amber-300/80'>Orders center</p>
            <h2 className='mt-2 text-2xl font-semibold text-white'>Manage all orders</h2>
          </div>
          <p className='text-sm text-slate-400'>{orders.length} orders</p>
        </div>
      </div>

      <div className='space-y-4'>
        {orders.length === 0 ? (
          <div className='rounded-[28px] border border-slate-800/70 bg-slate-900/85 p-10 text-center text-slate-400'>
            No orders available
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className='group overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-amber-400/40'
            >
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-3'>
                  <img className='h-12 w-12 rounded-2xl bg-slate-800 p-3' src={assets.parcel_icon} alt='' />
                  <div>
                    <p className='text-xl font-semibold text-white'>Order {index + 1}</p>
                    <p className='text-sm text-slate-400'>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${statusColors[order.status] || 'bg-slate-700/60 text-slate-100'}`}>
                  {order.status}
                </span>
              </div>

              <div className='mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr_0.8fr]'>
                <div className='rounded-[24px] border border-slate-800/60 bg-slate-900/80 p-4'>
                  <p className='text-sm uppercase tracking-[0.2em] text-slate-500'>Items</p>
                  <div className='mt-3 space-y-2 text-sm text-slate-300'>
                    {order.items.map((item, idx) => (
                      <p key={idx} className='leading-6'>
                        <span className='font-semibold text-white'>{item.name}</span> x {item.quantity} <span className='text-slate-400'>({item.size})</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className='rounded-[24px] border border-slate-800/60 bg-slate-900/80 p-4'>
                  <p className='text-sm uppercase tracking-[0.2em] text-slate-500'>Shipping</p>
                  <p className='mt-3 text-sm text-slate-300'>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className='text-sm text-slate-400'>
                    {order.address.street}, {order.address.city}, {order.address.state}
                  </p>
                  <p className='text-sm text-slate-400'>
                    {order.address.country} • {order.address.zipcode}
                  </p>
                  <p className='mt-2 text-sm text-slate-400'>{order.address.phone}</p>
                </div>

                <div className='rounded-[24px] border border-slate-800/60 bg-slate-900/80 p-4'>
                  <p className='text-sm uppercase tracking-[0.2em] text-slate-500'>Payment</p>
                  <p className='mt-3 text-xl font-semibold text-white'>
                    {currency}{order.amount}
                  </p>
                  <p className='mt-2 text-sm text-slate-400'>Method: {order.paymentMethod}</p>
                  <p className='mt-2 text-sm text-slate-400'>Status: {order.payment ? 'Paid' : 'Pending'}</p>
                </div>
              </div>

              <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div className='text-sm text-slate-400'>Total items: {order.items.length}</div>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  className='max-w-[240px] rounded-full border border-slate-800/70 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-slate-100 outline-none transition duration-300 hover:border-amber-400'
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