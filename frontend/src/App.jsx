import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Footer from "./component/Footer";
import SearchBar from "./component/SearchBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchProducts, getUserCart } from "./features/shop/shopSlice";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.shop.token);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchProducts());
    if (token) {
      dispatch(getUserCart(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  const showShopSearch = location.pathname === "/shop";

  return (
    <div className="min-h-screen bg-transparent text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <ToastContainer position="top-right" theme="light" />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="sticky top-0 z-40 mt-2 rounded-[2rem] border border-white/70 bg-white/70 px-4 py-3 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:px-6 lg:px-8 dark:border-slate-700/60 dark:bg-slate-900/70">
          <Navbar />
        </div>
        {showShopSearch && <SearchBar />}
        <div className="pb-6 pt-4 sm:pb-8 sm:pt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
