import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div>
        <Header/>
        <main className='w-full min-h-[90vh] p-4 bg-gray-50 flex justify-center'>
        <Outlet/>
        </main>
         <Footer/>
    </div>
  )
}

export default AppLayout