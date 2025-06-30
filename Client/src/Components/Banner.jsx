import React, { useState } from 'react'
import '../CSS/Banner.css'
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Banner = () => {

  const [email,setEmail] = useState('')
  const navigate = useNavigate()

  const handleForm = async (e)=>{
    try {
      e.preventDefault()
      const response= await axios.post("http://localhost:4000/api/auth/sendOtp",{
        email
      });
      alert(response.data.message)
      console.log(response.data.message);
      navigate('/verify-otp', { state: { email } });

    } catch (error) {
      alert(error.response?.data?.message || 'Upload failed!');
    }
  }

  return (
    <div className='banner w-full min-h-[90vh]'>
        <div className="overlay-color flex justify-center text-center items-center w-full min-h-[94vh]">
         <div className="layer-content">
            <h2>Unlimited movies, TV</h2>
            <h2>shows and more</h2>
            <p className='font-bold text-[20px]'>Starts at ₹149. Cancel at any time.</p>
            <p className='pt-5 text-[18px]'>Ready to watch? Enter your email to create or restart your membership.</p>
            <form action="" className='flex items-center gap-x-3 pt-4' onSubmit={handleForm}>
            <input type="email" className='outline-none' name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email address' />
            <button type='submit' className='flex h-[50px] justify-center rounded-[5px] bg-[#c6050c] cursor-pointer w-45 text-center items-center gap-x-2 text-lg'>Get Started <FaChevronRight /></button>
           </form>
         </div>
        </div>
    </div>
  )
}

export default Banner