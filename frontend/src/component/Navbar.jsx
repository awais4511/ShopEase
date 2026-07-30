import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets.js";
import { getCartCount, setCartItem, setShowSearch, setToken } from "../features/shop/shopSlice";
import { ChevronDown, CircleUserRound, LogOut, Menu, MoonStar, PackageOpen, Search, SunMedium } from "lucide-react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, showSearch } = useSelector((state) => state.shop);
  const cartCount = useSelector(getCartCount);
  const isShopPage = location.pathname === "/shop";

  useEffect(() => {
    dispatch(setShowSearch(false));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = themeMode === "dark";
    root.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (!userMenuOpen) return;

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    dispatch(setCartItem({}));
    setUserMenuOpen(false);
    navigate("/login");
  };

  const setTheme = (mode) => {
    setThemeMode(mode);
    setUserMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between py-2 font-medium">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-lg font-semibold text-white shadow-lg">
          S
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-[0.2em] text-amber-600 sm:text-3xl">SHOPEASE</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Curated essentials</p>
        </div>
      </Link>

      <ul className="hidden items-center gap-2 rounded-full border border-amber-100 bg-white/70 px-2 py-2 text-sm text-slate-600 shadow-sm sm:flex dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
        <NavLink to="/" className="rounded-full px-4 py-2 transition hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-slate-800 dark:hover:text-amber-400">
          Home
        </NavLink>
        <NavLink to="/shop" className="rounded-full px-4 py-2 transition hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-slate-800 dark:hover:text-amber-400">
          Shop
        </NavLink>
        <NavLink to="/about" className="rounded-full px-4 py-2 transition hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-slate-800 dark:hover:text-amber-400">
          About
        </NavLink>
        <NavLink to="/contact" className="rounded-full px-4 py-2 transition hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-slate-800 dark:hover:text-amber-400">
          Contact
        </NavLink>
      </ul>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm sm:flex dark:border-slate-700 dark:bg-slate-900/90">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`rounded-full p-2 transition ${themeMode === "light" ? "bg-amber-50 text-amber-700 shadow-sm dark:bg-amber-950/40 dark:text-amber-400" : "text-slate-500 hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-400"}`}
          >
            <SunMedium className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`rounded-full p-2 transition ${themeMode === "dark" ? "bg-slate-900 text-white shadow-sm dark:bg-slate-700" : "text-slate-500 hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-400"}`}
          >
            <MoonStar className="h-4 w-4" />
          </button>
        </div>

        {isShopPage && (
          <button
            type="button"
            onClick={() => dispatch(setShowSearch(!showSearch))}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-amber-300 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-amber-500 dark:hover:text-amber-400"
          >
            <Search className="h-4 w-4" />
          </button>
        )}

        <div ref={userMenuRef} className="relative">
          <button
            type="button"
            onClick={() => {
              if (!token) {
                navigate("/login");
                return;
              }
              setUserMenuOpen((prev) => !prev);
            }}
            className="rounded-full border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-amber-300 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-amber-500 dark:hover:text-amber-400"
          >
            <CircleUserRound className="h-5 w-5" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-35 rounded-2xl border border-slate-200 bg-white p-2 text-sm text-slate-600 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              {token ? (
                <>
                  <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-800 dark:hover:text-amber-400">
                    <CircleUserRound className="h-4 w-4" />
                    Profile
                  </button>
                  <button type="button" onClick={() => { setUserMenuOpen(false); navigate("/orders"); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-800 dark:hover:text-amber-400">
                    <PackageOpen className="h-4 w-4" />
                    Orders
                  </button>
                  <button type="button" onClick={logout} className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-950/40">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => navigate("/login")} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-800 dark:hover:text-amber-400">
                  <CircleUserRound className="h-4 w-4" />
                  Sign in
                </button>
              )}
            </div>
          )}
        </div>

        <Link to="/cart" className="relative rounded-full border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-amber-300 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-amber-500 dark:hover:text-amber-400">
          <img src={assets.cart_icon} className="w-5 brightness-100 contrast-100 dark:brightness-0 dark:invert" alt="Cart" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-semibold text-white shadow-sm">
            {cartCount}
          </span>
        </Link>

        <button type="button" onClick={() => setVisible(true)} className="rounded-full border border-slate-200 bg-white p-2.5 shadow-sm sm:hidden dark:border-slate-700 dark:bg-slate-900">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className={`fixed inset-y-0 right-0 z-50 overflow-hidden bg-white/95 shadow-2xl transition-all dark:bg-slate-950/95 ${visible ? "w-full sm:w-80" : "w-0"}`}>
        <div className="flex flex-col text-slate-700 dark:text-slate-200">
          <div onClick={() => setVisible(false)} className="flex cursor-pointer items-center gap-4 border-b border-slate-200 p-4 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <ChevronDown className="h-4 rotate-90" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="border-b border-slate-100 px-6 py-3 transition hover:bg-amber-50 hover:text-amber-700 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-amber-400" to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="border-b border-slate-100 px-6 py-3 transition hover:bg-amber-50 hover:text-amber-700 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-amber-400" to="/shop">
            Shop
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="border-b border-slate-100 px-6 py-3 transition hover:bg-amber-50 hover:text-amber-700 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-amber-400" to="/about">
            About
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="px-6 py-3 transition hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-slate-900 dark:hover:text-amber-400" to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;