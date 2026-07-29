import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='space-y-6'>
      <div className='rounded-[32px] border border-slate-800/70 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/20'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.35em] text-amber-300/80'>Product catalog</p>
            <h2 className='mt-2 text-2xl font-semibold text-white'>All Products</h2>
          </div>
          <p className='text-sm text-slate-400'>{list.length} items available</p>
        </div>
      </div>

      <div className='space-y-3'>
        {list && list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_0.8fr] items-center gap-4 rounded-[28px] border border-slate-800/60 bg-slate-950/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-slate-900'
            >
              <img className='h-20 w-20 rounded-3xl object-cover' src={item.image[0]} alt='' />
              <div className='space-y-1'>
                <p className='font-semibold text-white'>{item.name}</p>
                <p className='text-sm text-slate-400'>{item.description?.slice(0, 70) ?? 'No details available'}</p>
              </div>
              <p className='text-sm text-amber-300'>{item.category}</p>
              <p className='text-sm font-semibold text-white'>{currency}{item.price}</p>
              <button
                onClick={() => removeProduct(item._id)}
                className='rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-amber-300'
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className='rounded-[28px] border border-slate-800/70 bg-slate-900/85 p-10 text-center text-slate-400'>No products found</div>
        )}
      </div>
    </div>
  )
}

export default List