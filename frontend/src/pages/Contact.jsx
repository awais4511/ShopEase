import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../component/Title'
import NewsletterBox from '../component/NewLetterBox'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="mt-6 space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="text-center">
          <Title text1={'CONTACT'} text2={'US'} />
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <img className="w-full rounded-[1.5rem] object-cover shadow-md lg:max-w-[460px]" src={assets.contact_img} alt="Contact ShopEase" />
          <div className="flex flex-1 flex-col justify-center gap-5 text-slate-600">
            <div>
              <p className="text-xl font-semibold text-slate-800">Our Store</p>
              <p className="mt-2 leading-8">54709 Willms Station<br />Suite 350, Washington, USA</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-800">Reach us</p>
              <p className="mt-2 leading-8">Tel: (415) 555-0132<br />Email: admin@shopease.com</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-800">Careers at ShopEase</p>
              <p className="mt-2 leading-8">Learn more about our teams and current openings.</p>
              <button className="mt-4 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-400 hover:text-amber-700">Explore Jobs</button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mb-6 text-center">
          <Title text1={'GET IN'} text2={'TOUCH'} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-400 focus:bg-white"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-400 focus:bg-white"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              rows="6"
              className="w-full resize-none rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-400 focus:bg-white"
              required
            ></textarea>
            <button
              type="submit"
              className="rounded-full bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              Send Message
            </button>
          </form>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-slate-800">Contact Information</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div>
                  <p className="font-semibold text-slate-800">Address</p>
                  <p>54709 Willms Station, Suite 350, Washington, USA</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div>
                  <p className="font-semibold text-slate-800">Phone</p>
                  <p>(415) 555-0132</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div>
                  <p className="font-semibold text-slate-800">Email</p>
                  <p>admin@shopease.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div>
                  <p className="font-semibold text-slate-800">Working Hours</p>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBox />
    </div>
  )
} 

export default Contact