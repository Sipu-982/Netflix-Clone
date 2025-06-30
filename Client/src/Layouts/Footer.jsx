import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='min-h-[50vh] px-25 bg-black'>
    <div className=""><p>Questions? Call <Link>000-800-919-1743</Link></p></div>
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2  gap-x-25 text-white">
      <div className="flex flex-col gap-y-2">
        <Link className='underline'>FAQ</Link>
        <Link className='underline'>Investor Relation</Link>
        <Link className='underline'>Privacy</Link>
        <Link className='underline'>Speed Test</Link>
      </div>
      <div className="flex flex-col gap-y-2">
      <Link className='underline'>Help Centre</Link>
      <Link className='underline'>Jobs</Link>
      <Link className='underline'>Cookie Preference</Link>
      <Link className='underline'>Legal Notices</Link>
      </div>
      <div className="flex flex-col gap-y-2">
        <Link className='underline'>Account</Link>
        <Link className='underline'>Ways to Watch</Link>
        <Link className='underline'>Corporate Information</Link>
        <Link className='underline'>Only on Netflix</Link>
      </div>
      <div className="flex flex-col gap-y-2">
        <Link className='underline'>Media Centre</Link>
        <Link className='underline'>Term of Use</Link>
        <Link className='underline'>Contact Us</Link>
      </div>
    </div>
    </div>
  )
}

export default Footer