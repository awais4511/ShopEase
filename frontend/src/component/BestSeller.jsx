import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useSelector((state) => state.shop);
  const [bestSeller, setBestSeller] = useState([]);
  
  useEffect(()=>{
    const bestProduct = products.filter((item)=>(item.bestseller));
    setBestSeller(bestProduct.slice(0,5))
  },[products])
  
  return (
    <section className='glass-card my-10 px-4 py-8 sm:px-8 lg:px-10'>
      <div className='text-center'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='mx-auto w-full max-w-3xl text-sm leading-7 text-slate-600 sm:text-base'>
          SHOPEASE favorites are loved for their quality, comfort, and everyday versatility — the perfect blend of style and practicality.
        </p>
      </div>
       <div className='mt-8 grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {
          bestSeller.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
          ))
        }
      </div>
    </section>
  )
}

export default BestSeller