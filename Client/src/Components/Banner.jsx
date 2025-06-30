import React, { useState } from 'react'
import '../CSS/Banner.css'
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import axios from 'axios'
const Banner = () => {

  const [email,setEmail] = useState('')
  const navigate = useNavigate()

  const handleForm = async (e)=>{
    try {
      e.preventDefault()
      const response= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/sendOtp`,{
        email
      });
      toast.success(response.data.message)
      console.log(response.data.message);
      navigate('/verify-otp', { state: { email } });

    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed!');
    }
  }

  return (
    <div className='banner w-full  flex justify-center min-h-[90vh]'>
        <div className="overlay-color flex justify-center text-center items-center w-full min-h-[94vh]">
         <div className="layer-content">
            <h2 className='lg:text-7xl md:text-6xl text-4xl'>Unlimited movies, TV</h2>
            <h2 className='lg:text-7xl md:text-4xl text-4xl'>shows and more</h2>
            <p className='font-bold text-[20px]'>Starts at ₹149. Cancel at any time.</p>
            <p className='pt-5 text-[18px]'>Ready to watch? Enter your email to create or restart your membership.</p>
            <form action="" className='flex lg:flex-row md:flex-row px-4 flex-col justify-center  items-center gap-3 pt-4' onSubmit={handleForm}>
            <input type="email" className='lg:w-[400px] md:w-[370px] w-80 outline-none' name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email address' />
            <button type='submit' className='flex h-[50px] justify-center rounded-[5px] bg-[#c6050c] cursor-pointer w-45 text-center items-center gap-x-2 text-lg'>Get Started <FaChevronRight /></button>
           </form>
         </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
/>

    </div>
  )
}

export default Banner