import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

  useEffect(() => {
    dispatch(fetchProducts());
    if (token) {
      dispatch(getUserCart(token));
    }
  }, [dispatch, token]);

  return (
    <div className="min-h-screen text-slate-800">
      <ToastContainer position="top-right" theme="light" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-40 mt-4 rounded-[2rem] border border-white/70 bg-white/70 px-4 py-3 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:px-6 lg:px-8">
          <Navbar />
        </div>
        <SearchBar />
        <div className="pb-8">
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
