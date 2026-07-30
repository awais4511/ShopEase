import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, LoaderCircle, SlidersHorizontal } from 'lucide-react';
import ProductItem from '../component/ProductItem';

const Shop = () => {
  const { products, search, showSearch, loading } = useSelector((state) => state.shop);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sortType, setSortType] = useState('relevant');
  const [sortOpen, setSortOpen] = useState(false);

  const selectCategory = (value) => {
    setCategory(value);
  };

  const selectSubCategory = (value) => {
    setSubCategory(value);
  };

  useEffect(() => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category) {
      productsCopy = productsCopy.filter((item) => item.category === category);
    }

    if (subCategory) {
      productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);
    }

    if (sortType === 'low-high') {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  }, [category, products, search, showSearch, sortType, subCategory]);

  return (
    <div className='flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white/85 p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] sm:flex-row sm:gap-8 sm:p-6 lg:p-8 dark:border-slate-700 dark:bg-slate-900/70'>
      <aside className='w-full rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 shadow-sm sm:w-72 sm:p-5 dark:border-slate-700 dark:bg-slate-800/70'>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold text-slate-800 dark:text-slate-100'>Filters</p>
          <button
            type='button'
            className='flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 sm:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <SlidersHorizontal className='h-3.5 w-3.5' />
            <span>Refine</span>
          </button>
        </div>

        <div className={`${showFilter ? '' : 'hidden'} mt-4 space-y-4 sm:block`}>
          <div className='rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900'>
            <p className='mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400'>Categories</p>
            <div className='flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300'>
              <label className='flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 dark:border-slate-700'>
                <input className='h-4 w-4 appearance-none rounded-full border border-slate-300 bg-white checked:border-[#EA7427] checked:bg-[#EA7427] dark:border-slate-600 dark:bg-slate-900' type='radio' name='category' checked={!category} onChange={() => selectCategory('')} />
                <span>All</span>
              </label>
              {['Men', 'Women', 'Kids'].map((item) => (
                <label key={item} className='flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 dark:border-slate-700'>
                  <input className='h-4 w-4 appearance-none rounded-full border border-slate-300 bg-white checked:border-[#EA7427] checked:bg-[#EA7427] dark:border-slate-600 dark:bg-slate-900' type='radio' name='category' value={item} checked={category === item} onChange={() => selectCategory(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900'>
            <p className='mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400'>Type</p>
            <div className='flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300'>
              <label className='flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 dark:border-slate-700'>
                <input className='h-4 w-4 appearance-none rounded-full border border-slate-300 bg-white checked:border-[#EA7427] checked:bg-[#EA7427] dark:border-slate-600 dark:bg-slate-900' type='radio' name='subCategory' checked={!subCategory} onChange={() => selectSubCategory('')} />
                <span>All</span>
              </label>
              {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
                <label key={item} className='flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 dark:border-slate-700'>
                  <input className='h-4 w-4 appearance-none rounded-full border border-slate-300 bg-white checked:border-[#EA7427] checked:bg-[#EA7427] dark:border-slate-600 dark:bg-slate-900' type='radio' name='subCategory' value={item} checked={subCategory === item} onChange={() => selectSubCategory(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <section className='flex-1'>
        <div className='mb-4 flex flex-col gap-3 rounded-[1.35rem] border border-slate-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900/80'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400'>All collections</p>
            <p className='text-2xl font-semibold text-slate-800 dark:text-slate-100'>Curated for every style</p>
          </div>

          <div className='relative'>
            <button
              type='button'
              onClick={() => setSortOpen((prev) => !prev)}
              className='flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-400 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
            >
              <span>Sort by: {sortType === 'relevant' ? 'Relevant' : sortType === 'low-high' ? 'Low to High' : 'High to Low'}</span>
              <ChevronDown className={`h-4 w-4 transition ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className='absolute right-0 top-full z-20 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900'>
                {[
                  { value: 'relevant', label: 'Relevant' },
                  { value: 'low-high', label: 'Low to High' },
                  { value: 'high-low', label: 'High to Low' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type='button'
                    onClick={() => {
                      setSortType(option.value);
                      setSortOpen(false);
                    }}
                    className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition ${sortType === option.value ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading && products.length === 0 ? (
          <div className='flex min-h-[260px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/70'>
            <div className='flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300'>
              <LoaderCircle className='h-5 w-5 animate-spin text-amber-500' />
              Loading curated picks...
            </div>
          </div>
        ) : filterProducts.length === 0 ? (
          <div className='flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50/80 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-400'>
            No products match your filters yet.
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4'>
            {filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;