import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div className=''>
        <Header/>
        <main className='min-h-[90vh]'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default AppLayout