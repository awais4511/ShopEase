import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useSelector((state) => state.shop);

  return (
    <Link className='group cursor-pointer rounded-[1.5rem] border border-slate-200 bg-white/90 p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl' to={`/product/${id}`}>
      <div className='overflow-hidden rounded-[1.2rem]'>
        <img
          className='h-44 w-full object-cover transition duration-500 group-hover:scale-110'
          src={image[0]}
          alt={name}
        />
      </div>
      <div className='mt-3'>
        <p className='text-sm font-semibold text-slate-800'>{name}</p>
        <p className='mt-1 text-sm font-medium text-amber-600'>
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
