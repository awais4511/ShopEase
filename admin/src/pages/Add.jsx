import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const form = new FormData()

      form.append('name', name)
      form.append('description', description)
      form.append('price', price)
      form.append('category', category)
      form.append('subCategory', subCategory)
      form.append('bestseller', bestseller)
      form.append('sizes', JSON.stringify(sizes))

      image1 && form.append('image1', image1)
      image2 && form.append('image2', image2)
      image3 && form.append('image3', image3)
      image4 && form.append('image4', image4)

      const response = await axios.post(backendUrl + '/api/product/add', form, {
        headers: { token },
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const sizeOption = (label) => {
    const active = sizes.includes(label)
    return (
      <button
        type='button'
        onClick={() =>
          setSizes((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
          )
        }
        style={
          active
            ? { borderRadius: 9999, padding: '6px 12px', background: 'var(--accent)', color: 'var(--button-text)', boxShadow: '0 10px 30px -20px rgba(0,0,0,0.6)' }
            : { borderRadius: 9999, padding: '6px 12px', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }
        }
        className='text-sm transition duration-300'
      >
        {label}
      </button>
    )
  }

  return (
    <div className='rounded-[32px] p-6 shadow-2xl' style={{ border: '1px solid var(--border)', background: 'var(--nav-bg)' }}>
      <div className='mb-8'>
        <p className='text-sm uppercase tracking-[0.35em]' style={{ color: 'var(--accent)', opacity: 0.9 }}>Product manager</p>
        <h2 className='mt-3 text-3xl font-semibold' style={{ color: 'var(--text)' }}>Add New Item</h2>
        <p className='mt-2 max-w-2xl text-sm' style={{ color: 'var(--muted)' }}>Upload product images, select properties, and publish new catalog items in one elegant form.</p>
      </div>

      <form onSubmit={onSubmitHandler} className='space-y-8'>
        <div>
          <p className='mb-3 text-sm font-semibold' style={{ color: 'var(--text)' }}>Upload Images</p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[
              { value: image1, setter: setImage1, id: 'image1' },
              { value: image2, setter: setImage2, id: 'image2' },
              { value: image3, setter: setImage3, id: 'image3' },
              { value: image4, setter: setImage4, id: 'image4' },
            ].map((item, idx) => (
              <label
                key={idx}
                htmlFor={item.id}
                className='group relative flex h-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl text-center transition duration-300'
                style={{ border: '2px dashed var(--border)', background: 'transparent', color: 'var(--muted)' }}
              >
                {item.value ? (
                  <img
                    className='h-full w-full object-cover'
                    src={URL.createObjectURL(item.value)}
                    alt='Product upload preview'
                  />
                ) : (
                  <>
                    <img className='mb-3 h-10 w-10 opacity-80' src={assets.upload_area} alt='Upload placeholder' />
                    <span className='text-sm transition' style={{ color: 'var(--muted)' }}>Click to upload</span>
                  </>
                )}
                <input
                  onChange={(e) => item.setter(e.target.files[0])}
                  type='file'
                  id={item.id}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        <div className='grid gap-6'>
          <div>
            <label className='mb-2 block text-sm font-semibold' style={{ color: 'var(--text)' }}>Product name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='w-full rounded-3xl px-4 py-3 outline-none transition duration-300'
              style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
              type='text'
              placeholder='Type product name here'
              required
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-semibold' style={{ color: 'var(--text)' }}>Product description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className='min-h-[146px] w-full rounded-3xl px-4 py-4 outline-none transition duration-300'
              style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
              placeholder='Describe the product features and details'
              required
            />
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          <div>
            <label className='mb-2 block text-sm font-semibold' style={{ color: 'var(--text)' }}>Product category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full rounded-3xl px-4 py-3 outline-none transition duration-300'
              style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
            >
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>

          <div>
            <label className='mb-2 block text-sm font-semibold' style={{ color: 'var(--text)' }}>Sub category</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className='w-full rounded-3xl px-4 py-3 outline-none transition duration-300'
              style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
            >
              <option value='Topwear'>Topwear</option>
              <option value='Bottomwear'>Bottomwear</option>
              <option value='Winterwear'>Winterwear</option>
            </select>
          </div>

          <div>
            <label className='mb-2 block text-sm font-semibold' style={{ color: 'var(--text)' }}>Product price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className='w-full rounded-3xl px-4 py-3 outline-none transition duration-300'
              style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
              type='number'
              placeholder='25'
              required
            />
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold' style={{ color: 'var(--text)' }}>Product Sizes</p>
            <span className='text-sm' style={{ color: 'var(--muted)' }}>{sizes.length} selected</span>
          </div>
          <div className='flex flex-wrap gap-3'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => sizeOption(size))}
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type='checkbox'
            id='bestseller'
            className='h-4 w-4 rounded'
            style={{ accentColor: 'var(--accent)' }}
          />
          <label className='cursor-pointer text-sm' htmlFor='bestseller' style={{ color: 'var(--text)' }}>
            Add to bestseller
          </label>
        </div>

        <button
          type='submit'
          className='inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition duration-300'
          style={{ background: 'var(--accent)', color: 'var(--button-text)' }}
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default Add
