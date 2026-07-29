import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-base">
        {text1} <span className="font-semibold text-slate-800">{text2}</span>
      </p>
      <p className="h-[2px] w-10 bg-gradient-to-r from-amber-500 to-orange-500 sm:w-14"></p>
    </div>
  );
};

export default Title;