import React from 'react'
import Banner from '../Components/Banner'
import Faqs from '../Components/Faqs'
import OfferCard from '../Components/OfferCard'
import CarouselVideos from '../Components/CarouselVideos'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div className='bg-black'>
        <Banner/>
        <CarouselVideos/>
        <OfferCard/>
        <Faqs/>
        <NewsLetter/>
    </div>
  )
}

export default Home