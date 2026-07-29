import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets.js";
import { getCartCount, setCartItem, setShowSearch, setToken } from "../features/shop/shopSlice";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, showSearch } = useSelector((state) => state.shop);
  const cartCount = useSelector(getCartCount);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    dispatch(setCartItem({}));
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-2 font-medium">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-lg font-semibold text-white shadow-lg">
          S
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-[0.2em] text-amber-600 sm:text-3xl">SHOPEASE</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Curated essentials</p>
        </div>
      </Link>

      <ul className="hidden items-center gap-2 rounded-full border border-amber-100 bg-white/70 px-2 py-2 text-sm text-slate-600 shadow-sm sm:flex">
        <NavLink
          to="/"
          className="rounded-full px-4 py-2 transition hover:bg-amber-50 hover:text-amber-700"
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          className="rounded-full px-4 py-2 transition hover:bg-amber-50 hover:text-amber-700"
        >
          Shop
        </NavLink>

        <NavLink
          to="/about"
          className="rounded-full px-4 py-2 transition hover:bg-amber-50 hover:text-amber-700"
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className="rounded-full px-4 py-2 transition hover:bg-amber-50 hover:text-amber-700"
        >
          Contact
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 sm:gap-5">
        <button
          type="button"
          onClick={() => dispatch(setShowSearch(!showSearch))}
          className="rounded-full border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-amber-300 hover:text-amber-600"
        >
          <img src={assets.search_icon} className="w-4" alt="Search" />
        </button>

        <div className="group relative">
          <button
            type="button"
            onClick={() => !token && navigate("/login")}
            className="rounded-full border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-amber-300 hover:text-amber-600"
          >
            <img src={assets.profile_icon} className="w-5" alt="Profile" />
          </button>

          <div className="group-hover:block hidden absolute top-full right-0 z-50 pt-2">
            <div className="flex w-40 flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-xl">
              {token ? (
                <>
                  <p className="cursor-pointer transition hover:text-amber-600">Profile</p>
                  <p
                    className="cursor-pointer transition hover:text-amber-600"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>
                  <hr className="border-slate-200" />
                  <p className="cursor-pointer transition hover:text-amber-600" onClick={logout}>
                    Logout
                  </p>
                </>
              ) : (
                <p className="cursor-pointer transition hover:text-amber-600" onClick={() => navigate("/login")}>
                  Login
                </p>
              )}
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative rounded-full border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-amber-300">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-semibold text-white">
            {cartCount}
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setVisible(true)}
          className="rounded-full border border-slate-200 bg-white p-2.5 shadow-sm sm:hidden"
        >
          <img src={assets.menu_icon} className="w-5" alt="Menu" />
        </button>
      </div>

      <div className={`fixed inset-y-0 right-0 z-50 overflow-hidden bg-white/95 shadow-2xl transition-all ${visible ? "w-full sm:w-80" : "w-0"}`}>
        <div className="flex flex-col text-slate-700">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 border-b border-slate-200 p-4 text-sm font-medium text-slate-600 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="border-b border-slate-100 px-6 py-3 transition hover:bg-amber-50 hover:text-amber-700" to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="border-b border-slate-100 px-6 py-3 transition hover:bg-amber-50 hover:text-amber-700" to="/shop">
            Shop
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="border-b border-slate-100 px-6 py-3 transition hover:bg-amber-50 hover:text-amber-700" to="/about">
            About
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="px-6 py-3 transition hover:bg-amber-50 hover:text-amber-700" to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;