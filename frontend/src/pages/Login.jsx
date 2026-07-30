import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setToken } from "../features/shop/shopSlice";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backendUrl } = useSelector((state) => state.shop);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Account created successfully. Please login.");
          setCurrentState("Login");
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          dispatch(setToken(response.data.token));
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully");
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em]">Welcome Back</p>
              <h2 className="prata-regular mt-4 text-4xl leading-tight">Enjoy a seamless shopping experience.</h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-amber-50">
                Sign in to track orders, save favorites, and discover new arrivals curated just for you.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-white/30 bg-white/10 p-4 text-sm backdrop-blur">
              <p className="font-semibold">Why join ShopEase?</p>
              <ul className="mt-2 space-y-2 text-amber-50">
                <li>• Fast checkout and order tracking</li>
                <li>• Exclusive offers and new releases</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10">
            <div className="mb-2 flex items-center gap-2">
              <p className="prata-regular text-3xl text-slate-800">{currentState}</p>
              <div className="h-[2px] w-10 bg-gradient-to-r from-amber-500 to-orange-500" />
            </div>

            <p className="text-sm leading-7 text-slate-600">
              {currentState === "Login"
                ? "Enter your details to continue your journey."
                : "Create an account and unlock a more personalized shopping experience."}
            </p>

            {currentState === "Sign Up" && (
              <input
                type="text"
                className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-[-4px] flex items-center justify-between text-sm text-slate-600">
              <p className="cursor-pointer transition hover:text-amber-600">Forgot your password?</p>
              {currentState === "Login" ? (
                <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer transition hover:text-amber-600">
                  Create account
                </p>
              ) : (
                <p onClick={() => setCurrentState("Login")} className="cursor-pointer transition hover:text-amber-600">
                  Sign in
                </p>
              )}
            </div>

            <button className="mt-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600">
              {currentState === "Login" ? "Sign In" : "Sign Up"}
            </button>

            {currentState === "Sign Up" && (
              <div className="text-center text-xs leading-6 text-slate-500">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-amber-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-amber-600 hover:underline">
                  Privacy Policy
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;