import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { assets } from "../assets/assets";
import RelatedProducts from "../component/RelatedProducts";
import { addToCart } from "../features/shop/shopSlice";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { products, currency, token } = useSelector((state) => state.shop);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      setSize((currentSize) => currentSize || product.sizes?.[0] || "");
    }
  }, [productId, products]);

  return productData ? (
    <div className="opacity-100 pt-2 transition-opacity duration-500 ease-in">
      <div className="flex flex-col gap-8 rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] sm:flex-row sm:gap-10 sm:p-6 lg:p-8 dark:border-slate-700 dark:bg-slate-900/80">
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex w-full justify-between overflow-x-auto sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-auto">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`mr-2 w-[24%] flex-shrink-0 cursor-pointer rounded-2xl border object-cover transition sm:mr-0 sm:mb-3 sm:w-full ${image === item ? 'border-amber-500 shadow-md' : 'border-slate-200'}`}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="h-auto w-full rounded-[1.5rem] object-cover" src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            Premium pick
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-slate-800 dark:text-slate-100">{productData.name}</h1>
          <div className="mt-2 flex items-center gap-1">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2 text-sm text-slate-500">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-semibold text-slate-900 dark:text-slate-50">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300 md:w-4/5">
            {productData.description}
          </p>

          <div className="my-8 flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${item === size ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => dispatch(addToCart({ itemId: productData._id, size, token }))} className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 hover:shadow-lg">
            Add to Cart
          </button>

          <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
            <p>✅ 100% Original product.</p>
            <p>✅ Cash on delivery is available on this product.</p>
            <p>✅ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-[0_18px_50px_-20px_rgba(15,23,42,0.18)] sm:p-6 dark:border-slate-700 dark:bg-slate-900/80">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-700">
          <button type='button' onClick={() => setActiveTab('description')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === 'description' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}>
            Description
          </button>
          <button type='button' onClick={() => setActiveTab('reviews')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === 'reviews' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}>
            Reviews (122)
          </button>
        </div>
        <div className="mt-5 rounded-[1.25rem] border border-slate-100 bg-slate-50 p-5 text-sm leading-7 text-slate-600 shadow-inner dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300">
          {activeTab === 'description' ? (
            <div className="space-y-3">
              <p>{productData.description}</p>
              <p>Crafted for comfort and versatility, this piece blends timeless style with everyday ease. The polished finishing and refined detailing make it a dependable choice for workdays, weekends, and everything in between.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-[1rem] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="font-semibold text-slate-800 dark:text-slate-100">Ava • Verified Buyer</p>
                <p className="mt-2">Beautiful fit and very comfortable. The quality feels premium and the delivery was fast.</p>
              </div>
              <div className="rounded-[1rem] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="font-semibold text-slate-800 dark:text-slate-100">Noah • Verified Buyer</p>
                <p className="mt-2">The color and detailing are exactly what I expected. It looks even better in person.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;