import React from 'react'
import { assets } from '../assets/assets'
import Title from '../component/Title'
import NewsletterBox from '../component/NewLetterBox'

const About = () => {
  return (
    <div className="mt-6 space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="text-center">
          <Title text1={'ABOUT'} text2={'US'} />
        </div>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <img className="w-full rounded-[1.5rem] object-cover shadow-md md:max-w-[430px]" src={assets.about_img} alt="About ShopEase" />
          <div className="flex flex-col justify-center gap-5 text-base leading-8 text-slate-600 md:w-2/3">
            <p>ShopEase was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p>Since our inception, we have curated a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <div className="rounded-[1.25rem] border border-amber-100 bg-amber-50 p-4">
              <p className="font-semibold text-slate-800">Our Mission</p>
              <p className="mt-1">Our mission at ShopEase is to empower customers with choice, convenience, and confidence through a seamless shopping experience that exceeds expectations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mb-6 text-center">
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6">
            <b className="text-slate-800">Quality Assurance</b>
            <p className="mt-2 text-sm leading-7 text-slate-600">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6">
            <b className="text-slate-800">Convenience</b>
            <p className="mt-2 text-sm leading-7 text-slate-600">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6">
            <b className="text-slate-800">Exceptional Service</b>
            <p className="mt-2 text-sm leading-7 text-slate-600">Our team of dedicated professionals is ready to assist you and ensure your satisfaction.</p>
          </div>
        </div>
      </section>

      <NewsletterBox />
    </div>
  )
}

export default About