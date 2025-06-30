import React from 'react'
import icon1 from '../Images/icon1.png'
import icon2 from '../Images/icon2.png'
import icon3 from '../Images/icon3.png'
import icon4 from '../Images/icon4.png'
import './OfferCard.css'

const OfferCard = () => {
  const cards = [
    {
      title: "Enjoy on your TV",
      para: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
      icon: icon1
    },
    {
      title: "Download your shows to watch offline",
      para: "Save your favourites easily and always have something to watch.",
      icon: icon4
    },
    {
      title: "Watch everywhere",
      para: "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
      icon: icon3
    },
    {
      title: "Create profiles for kids",
      para: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
      icon: icon2
    }
  ];

  return (
    <div className='min-h-[65vh] lg:px-25 px-5'>
      <h2 className='text-3xl font-bold text-white mb-8'>More Reasons to Join</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6">
        {cards.map((cardInfos, index) => (
          <div key={index} className="background p-4 rounded-xl relative min-w-[320px]  min-h-[250px] text-white shadow-lg hover:shadow-xl transition duration-300">
            <h2 className='text-2xl font-semibold mb-2'>{cardInfos.title}</h2>
            <p className='text-gray-300 text-lg'>{cardInfos.para}</p>
             <img src={cardInfos.icon} alt="icon" className='w-18 h-18 absolute right-4 bottom-4' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferCard;
