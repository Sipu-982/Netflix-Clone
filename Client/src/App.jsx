import React from 'react'
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import AppLayout from './Layouts/AppLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SearchVideo from './Pages/SearchVideo'
import FindShowById from './Pages/FindShowById'
import VerifyOtp from './Pages/VerifyOtp'
import WatchedVideo from './Components/WatchedVideo'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='verify-otp' element={<VerifyOtp/>}/>
        <Route path='search-video' element={<SearchVideo/>}/>
        <Route path='findVideo/:id' element={<FindShowById/>}/>
        <Route path='watch' element={<WatchedVideo/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App