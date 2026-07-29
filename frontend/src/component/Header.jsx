import React from 'react';
import { useNavigate } from 'react-router-dom';
import {assets} from '../assets/assets.js';

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="glass-card mt-6 overflow-hidden">
      <div className="grid items-center gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            Elevated everyday shopping
          </div>

          <div className="space-y-3">
            <h1 className="prata-regular text-4xl leading-tight text-slate-800 sm:text-5xl lg:text-6xl">
              Effortless <span className="text-amber-600">style</span>
              <br />
              for modern living
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover premium essentials, timeless favorites, and curated deals designed to make every order feel special.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/shop')}
              className="rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-amber-700"
            >
              Shop now
            </button>
            <button
              onClick={() => navigate('/about')}
              className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-amber-300 hover:text-amber-700"
            >
              Explore more
            </button>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
              <p className="font-semibold text-slate-800">Free express shipping</p>
              <p>On orders above $80</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
              <p className="font-semibold text-slate-800">24/7 support</p>
              <p>Friendly guidance anytime</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-orange-100 p-3 shadow-inner">
          <img className="h-full w-full rounded-[1.5rem] object-cover" src={assets.hero_img} alt="Featured products" />
        </div>
      </div>
    </section>
  );
};

export default Header;
