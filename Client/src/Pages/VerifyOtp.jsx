import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcLeft } from "react-icons/fc";
import '../CSS/VerifyOtp.css'

const VerifyOtp = () => {
    const [otp,setOtp]= useState('')
    const location=useLocation()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate() 
    const email = location.state?.email || '';
    const [message, setMessage] = useState('');
    
            
    const handleVerify= async (e)=>{
        e.preventDefault()
       setLoading(true)
      setMessage('')
        try {
            const response = await axios.post("http://localhost:4000/api/auth/verifyOtp",{
               email,otp
            })
            setMessage(response.data.message)
            console.log(response.data.Data);
            const {token,Data}= response.data;
            localStorage.setItem("authenticateUser", token)

       const userData = {
        fullname: Data.fullname,
        email: Data.email,
        phone: Data.phone,
        profile: Data.profile
      };
      localStorage.setItem("userData", JSON.stringify(userData))
    
            console.log(token);
            console.log(Data);
            setOtp('');
         setTimeout(()=>{navigate('/')},2000)
        } catch (error) {
           setMessage(error.response?.data?.message || "Something went wrong!")
        }
        finally{
            setLoading(false)
        }
    }

  return (
   <div className="flex justify-center bg-white items-center w-full pt-[100px] min-h-[90vh]">
          <div className="form-content text-white w-full max-w-[450px] min-h-[40vh] p-6 rounded-lg mx-5 border border-black">
            <form className="flex flex-col gap-4" onSubmit={handleVerify}>
                <h2 className="text-2xl font-bold mb-2 text-black">OTP Verification</h2>
    <p className="text-sm text-black mb-4 text-left">
      Please enter the 6-digit OTP sent to your email <span className='text-blue-700'>{email}</span>. This is to verify your identity and ensure secure login.
    </p>
    {message && (
  <div className={`flex items-center p-4 mb-4 text-sm border rounded-lg ${message.toLowerCase().includes('success')
        ? 'text-green-800 border-[#08d337] bg-transparent'
        : 'text-red-800 border-red-300 bg-[rgba(110,31,31,0.2)]'
    }`}
    role="alert"
  >
    {message.toLowerCase().includes('success') ? (
      <svg
        className="shrink-0 inline w-5 h-5 me-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
    )}

    <div>
      <span className="font-medium">{message}</span>
    </div>
  </div>
)}
               
                <div className="mb-4">
                  <label htmlFor="otp">Enter OTP:</label>
                  <input

                    type="password"
                    placeholder="Enter 6 digits OTP" id='otp' name='otp'
                    value={otp} onChange={(e) => setOtp(e.target.value)}
                    className="p-2 otp-field rounded text-black"
                  />
                </div>
              <button type="submit" disabled={loading} className={`w-full flex justify-center items-center gap-2 bg-[#e50914] hover:bg-[#f6121d] text-white font-semibold py-2 rounded ${
    loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
  }`} >
  {loading && (
  <svg
    className="inline w-4 h-4 mr-2 text-white animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    ></path>
  </svg>
)}

  {loading ? 'Verifying...' : 'Verify OTP'}
</button>                 <div className="flex justify-center">
                    <p className="text-sm text-black">Didn't receive the OTP? &nbsp;<Link to='/loginOtp' className='text-blue-800'>Resend OTP</Link></p>
                    </div>  
                               <div className="flex justify-start"><Link to='/' className='flex items-center gap-x-2 text-black p-2 text-[18px] text-center'><span><FcLeft size={20}/></span><span>Back</span></Link></div>
                    
            </form>
          </div>
        </div>
  )
}

export default VerifyOtp