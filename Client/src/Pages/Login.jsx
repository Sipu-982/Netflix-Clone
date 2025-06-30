import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [message, setMessage] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading]= useState(false)
    const navigate= useNavigate()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, userInfo);
      setMessage(response.data.message);
      const { token, data } = response.data;
      localStorage.setItem("authenticateUser", token);
      const userData = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        profile: data.profile
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserInfo({ email: '', password: '' });
      setTimeout(()=>{navigate('/')},3000)
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="login-banner w-full min-h-[95vh] flex justify-center items-center ">
      <div className="flex overlay-bg justify-center items-center w-full min-h-[95vh]">
        <div className="w-full max-w-[480px] mt-[100px] flex justify-center rounded-[5px] overlay-color p-6">
          <form onSubmit={handleSubmit} className='px-7'>
            <h2 className="text-4xl mb-4 font-bold text-white">Sign In</h2>

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
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={userInfo.email}
                onChange={handleChange}
                className="w-full p-2 rounded text-white bg-transparent placeholder-gray-300 outline-none"
              />
            </div>

            <div className="mb-4 relative">
               <input type="password" name="password" value={userInfo.password} className="w-full p-2 rounded text-white bg-transparent placeholder-gray-300 outline-none"
 onChange={handleChange}  placeholder='Enter password' id="" />
            </div>

            <button type="submit" disabled={loading} className={`w-full flex justify-center items-center gap-2 bg-[#e50914] hover:bg-[#f6121d] text-white font-semibold py-2 rounded ${
    loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
  }`}
>
  {loading && (
    <svg
      aria-hidden="true"
      role="status"
      className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none"  xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..." fill="#E5E7EB"
      />
      <path d="M93.9676 39.0409C96.393..." fill="currentColor"/>
    </svg>
  )}
  {loading ? 'Processing...' : 'Sign In'}
</button>

            <div className="flex justify-center text-center my-3">
              <span className='text-gray-300'>OR</span>
            </div>
            <div className="my-4">
            <button type='button' className='p-2 w-full bg-[rgb(131,128,128,0.5)] rounded text-white cursor-pointer'>
              Use a sign-in code
            </button>
            </div>
            <div className="w-full flex items-center gap-x-2">
              <div className=""><input type="checkbox"  id="check" name="check" /></div>
              <div className=""><span className='text-white'>Remember me</span></div>
            </div>
            <div className="py-4">
              <p className='flex items-center gap-x-0.5'><span className='text-gray-400'>New to Netflix?</span><Link to='/register' className='text-white'>Sign up now</Link></p>
            </div>
            <div className=""><span className='text-gray-500'>This page is protected by Google reCAPTCHA to ensure you're not a bot.</span></div>
            <Link className='underline text-blue-500 text-sm'>Learn More</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
