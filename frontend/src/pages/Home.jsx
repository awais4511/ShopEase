import React from 'react'
import Header from '../component/Header'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import NewsletterBox from '../component/NewLetterBox'

const Home = () => {
  return (
    <div>
      <Header/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home