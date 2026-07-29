import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useSelector((state) => state.shop);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="glass-card my-10 px-4 py-8 sm:px-8 lg:px-10">
      <div className="text-center">
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className="mx-auto w-full max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          Shopease combines effortless browsing with polished shopping — bringing you fresh arrivals and timeless favorites in one refined experience.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={item._id || index}
            id={item._id}
            image={item.image || []}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;