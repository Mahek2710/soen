import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/login.jsx'
import Register from '../screens/Register.jsx'
import Home from '../screens/Home.jsx'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Add more routes as needed */}
                
            </Routes>
        </BrowserRouter>
  )
}

export default AppRoutes
