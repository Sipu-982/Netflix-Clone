import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-full min-h-[50px] bg-[#f90424] text-white flex justify-center items-center  p-4'>
        <nav className='space-x-7'>
            <Link to='/'>Login</Link>
            <Link to='/Upload'>Upload Video</Link>
            <Link to='/view-videos'>View Video</Link>
        </nav>
    </div>
  )
}

export default Header