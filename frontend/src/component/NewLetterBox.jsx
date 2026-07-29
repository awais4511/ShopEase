import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  return (
    <section className="glass-card my-10 overflow-hidden px-6 py-8 text-center sm:px-8 lg:px-10">
      <p className="text-2xl font-semibold text-slate-800 sm:text-3xl">
        Subscribe now and get 20% off
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        Welcome to Shopease! Enjoy the latest deals, fresh arrivals, and handpicked favorites delivered straight to your inbox.
      </p>
      <form onSubmit={onSubmitHandler} className="mx-auto my-6 flex w-full max-w-2xl flex-col gap-3 rounded-full border border-slate-200 bg-white p-2 shadow-sm sm:flex-row">
        <input
          className="w-full flex-1 rounded-full bg-transparent px-4 py-3 text-sm outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterBox;