import React, { useEffect } from 'react';
import logo from '../Images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
// import { isTokenExpired } from '../util/checkTokenExpiry';
import { ImSearch } from "react-icons/im";

const Header = () => {
  const navigate = useNavigate();
  const userInfos = JSON.parse(localStorage.getItem('userData')); // parse userData

  const isLogin = !!userInfos;
  const fullname = userInfos?.fullname || 'User';
  const profile = userInfos?.profile || 'https://via.placeholder.com/150'; // fallback image

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/'); 
    window.location.reload();
  };

 

  return (
    <div className="w-full shadow-md absolute z-50 top-0 left-0 h-[70px] py-3 lg:px-25 px-5 flex justify-between items-center">
      <div>
        <Link to='/'>
        <img src={logo} className="w-40 h-10 object-cover" alt="Logo" />
        </Link>
      </div>
       
      <div>
        {!isLogin ? (
          <Link
            to="/login"
            className="text-md text-white py-2 px-4 rounded-[10px] bg-[#fa050d]"
          >
            Sign In
          </Link>
        ) : (
          <div className="flex items-center gap-2  text-white">
            <div className="flex gap-2 items-center">
            <img
              src={profile}
              alt="User"
              className="w-8 h-8 rounded-full border"
            />
            <span className='text-red-500'>{fullname}</span></div>
            <button
              onClick={handleLogout}
              className="ml-3 text-sm px-3 py-1 bg-red-500 rounded cursor-pointer hover:bg-red-600"
            >
              Logout
            </button>
<Link
  to="/search-video"
  className="flex items-center gap-2 px-3 py-1 text-sm rounded shadow border border-[#9d9797] text-red-500 bg-transparent transition-all duration-300 hover:bg-[#bfb3b3] hover:text-black"
>
  {/* Always visible on all screens */}
  <ImSearch className="text-white" />

  {/* Show text on medium and larger screens */}
  <span className="hidden sm:inline">Search Movies</span>
</Link>          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
