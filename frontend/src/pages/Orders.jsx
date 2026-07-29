import React from 'react';
import Title from '../component/Title';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Orders = () => {
  const { backendUrl, token, currency } = useSelector((state) => state.shop);

  const [orders, setOrders] = useState([]);

    const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      console.log(response.data)
           if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrders(allOrdersItem.reverse())
      }


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-sm sm:p-6 lg:p-8">
      <Title text1={'MY'} text2={'ORDERS'} />

      <div className="mt-8 space-y-4">
        {orders.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-4 rounded-[1.25rem] border border-slate-200 bg-white/90 p-4 shadow-sm md:flex-row md:items-center"
          >
            <div className="flex items-start gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="h-20 w-20 rounded-[1rem] object-cover"
              />
              <div>
                <p className="text-base font-semibold text-slate-800">{item.name}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {currency}{item.price} • Qty: {item.quantity} • Size: {item.size}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Date: <span className="text-slate-400">{new Date(item.date).toLocaleDateString()}</span>
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Payment: <span className="text-slate-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-end">
              <div className="flex items-center gap-2">
                <p className="h-2.5 w-2.5 rounded-full bg-emerald-500"></p>
                <p className="text-sm font-medium text-slate-700">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-400 hover:text-amber-700">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
