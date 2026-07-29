import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 rounded-[2rem] border border-slate-200 bg-white/80 px-6 py-8 shadow-sm sm:px-8 lg:px-10">
      <div className="grid gap-10 text-sm text-slate-600 sm:grid-cols-[2.2fr_1fr_1fr]">
        <div>
          <h1 className='mb-4 text-3xl font-semibold tracking-[0.2em] text-amber-600'>SHOPEASE</h1>
          <p className="max-w-md leading-7">
            Shopease brings you quality products with ease, convenience, and trust — all in one place.
          </p>
        </div>

        <div>
          <p className="mb-4 text-lg font-semibold text-slate-800">Company</p>
          <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-lg font-semibold text-slate-800">Get in touch</p>
          <ul className="flex flex-col gap-2">
            <li>+1-212-456-7890</li>
            <li>contact@shopease.com</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-5">
        <p className="text-center text-sm text-slate-500">Copyright 2024 © shopease.com — All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;