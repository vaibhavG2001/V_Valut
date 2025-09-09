import React, { useState } from 'react'
import axios from "axios";
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import AdminArea from './components/AdminArea';
import EachUser from './components/EachUser';

export default function App() {











  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/adminarea' element={<AdminArea/>}/>
        <Route path='/eachuser' element={<EachUser/>}/>
      </Routes>
    </div>
  )
}
