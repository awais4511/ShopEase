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
      <div className='rounded-[32px] p-6 shadow-2xl' style={{ border: '1px solid var(--border)', background: 'var(--nav-bg)' }}>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.35em]' style={{ color: 'var(--accent)', opacity: 0.9 }}>Orders center</p>
            <h2 className='mt-2 text-2xl font-semibold' style={{ color: 'var(--text)' }}>Manage all orders</h2>
          </div>
          <p className='text-sm' style={{ color: 'var(--muted)' }}>{orders.length} orders</p>
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
              className='group overflow-hidden rounded-[32px] p-6 shadow-2xl transition duration-300'
              style={{ border: '1px solid var(--border)', background: 'transparent' }}
            >
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-3'>
                  <img className='h-12 w-12 rounded-2xl p-3' src={assets.parcel_icon} alt='' style={{ background: 'var(--nav-bg)' }} />
                  <div>
                    <p className='text-xl font-semibold' style={{ color: 'var(--text)' }}>Order {index + 1}</p>
                    <p className='text-sm' style={{ color: 'var(--muted)' }}>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className='inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold' style={statusColors[order.status] || { background: 'rgba(148,163,184,0.12)', color: 'var(--text)' }}>
                  {order.status}
                </span>
              </div>

              <div className='mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr_0.8fr]'>
                <div className='rounded-[24px] p-4' style={{ border: '1px solid var(--border)', background: 'transparent' }}>
                  <p className='text-sm uppercase tracking-[0.2em]' style={{ color: 'var(--muted)' }}>Items</p>
                  <div className='mt-3 space-y-2 text-sm' style={{ color: 'var(--muted)' }}>
                    {order.items.map((item, idx) => (
                      <p key={idx} className='leading-6'>
                        <span className='font-semibold' style={{ color: 'var(--text)' }}>{item.name}</span> x {item.quantity} <span style={{ color: 'var(--muted)' }}>({item.size})</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className='rounded-[24px] p-4' style={{ border: '1px solid var(--border)', background: 'transparent' }}>
                  <p className='text-sm uppercase tracking-[0.2em]' style={{ color: 'var(--muted)' }}>Shipping</p>
                  <p className='mt-3 text-sm' style={{ color: 'var(--text)' }}>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className='text-sm' style={{ color: 'var(--muted)' }}>
                    {order.address.street}, {order.address.city}, {order.address.state}
                  </p>
                  <p className='text-sm' style={{ color: 'var(--muted)' }}>
                    {order.address.country} • {order.address.zipcode}
                  </p>
                  <p className='mt-2 text-sm' style={{ color: 'var(--muted)' }}>{order.address.phone}</p>
                </div>

                <div className='rounded-[24px] p-4' style={{ border: '1px solid var(--border)', background: 'transparent' }}>
                  <p className='text-sm uppercase tracking-[0.2em]' style={{ color: 'var(--muted)' }}>Payment</p>
                  <p className='mt-3 text-xl font-semibold' style={{ color: 'var(--text)' }}>
                    {currency}{order.amount}
                  </p>
                  <p className='mt-2 text-sm' style={{ color: 'var(--muted)' }}>Method: {order.paymentMethod}</p>
                  <p className='mt-2 text-sm' style={{ color: 'var(--muted)' }}>Status: {order.payment ? 'Paid' : 'Pending'}</p>
                </div>
              </div>

              <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div className='text-sm' style={{ color: 'var(--muted)' }}>Total items: {order.items.length}</div>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  className='max-w-[240px] rounded-full px-4 py-2 text-sm font-semibold outline-none transition duration-300'
                  style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
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