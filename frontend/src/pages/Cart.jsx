import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import CartTotal from "../component/CartTotal";
import { updateQuantity } from "../features/shop/shopSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, currency, cartItem, token } = useSelector((state) => state.shop);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem, products]);

  return (
    <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-4 text-2xl">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="space-y-3">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          return (
            <div
              key={index}
              className="grid items-center gap-4 rounded-[1.25rem] border border-slate-200 bg-white/90 p-4 text-slate-700 shadow-sm sm:grid-cols-[4fr_1.2fr_0.3fr]"
            >
              <div className="flex items-start gap-4">
                <img
                  className="h-20 w-20 rounded-[1rem] object-cover"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-base font-semibold text-slate-800">
                    {productData.name}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <p className="text-amber-600">{currency}{productData.price}</p>
                    <p className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                      Size: {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                value={item.quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) {
                    dispatch(updateQuantity({
                      itemId: item._id,
                      size: item.size,
                      quantity: value,
                      token,
                    }));
                  }
                }}
                className="w-full rounded-[0.8rem] border border-slate-200 px-3 py-2 outline-none focus:border-amber-400"
                type="number"
                min={1}
              />
              <img
                onClick={() => dispatch(updateQuantity({ itemId: item._id, size: item.size, quantity: 0, token }))}
                className="ml-auto w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="delete"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-end">
        <div className="w-full max-w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeorder")}
              className="my-8 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
