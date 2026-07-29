import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { assets } from '../assets/assets';
import ProductItem from '../component/ProductItem';

const Shop = () => {
  const { products, search, showSearch } = useSelector((state) => state.shop);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
        productsCopy = productsCopy.filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let filterProductsCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filterProductsCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(filterProductsCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  };


  useEffect(() => {
    applyFilter(); 
  }, [category, subCategory, search, showSearch, products]); 

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="mt-6 flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-sm sm:flex-row sm:gap-8 sm:p-6 lg:p-8">
      <aside className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 sm:w-72 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-slate-800">Filters</p>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 sm:hidden"
            onClick={() => setShowFilter(!showFilter)}
          >
            <span>Refine</span>
            <img className={`h-3 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </button>
        </div>

        <div className={`${showFilter ? '' : 'hidden'} mt-4 space-y-4 sm:block`}>
          <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Categories</p>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <input className="h-4 w-4 rounded border-slate-300" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
              </label>
              <label className="flex items-center gap-2">
                <input className="h-4 w-4 rounded border-slate-300" type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
              </label>
              <label className="flex items-center gap-2">
                <input className="h-4 w-4 rounded border-slate-300" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
              </label>
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Type</p>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <input className="h-4 w-4 rounded border-slate-300" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
              </label>
              <label className="flex items-center gap-2">
                <input className="h-4 w-4 rounded border-slate-300" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
              </label>
              <label className="flex items-center gap-2">
                <input className="h-4 w-4 rounded border-slate-300" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
              </label>
            </div>
          </div>
        </div>
      </aside>

      <section className="flex-1">
        <div className="mb-4 flex flex-col gap-3 rounded-[1.25rem] border border-slate-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">All collections</p>
            <p className="text-2xl font-semibold text-slate-800">Curated for every style</p>
          </div>

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;