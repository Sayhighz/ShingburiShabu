import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'



const Dashboard = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true


  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          anvigate('/adminlogin')
        }
      })
  }

  return (
    <div className="flex h-sceen font-kanit">
      <aside className="bg-base-300 text-white p-4 w-64 flex flex-col items-center">
        <div className="">
          <div className="mt-20 mb-20 text-6xl font-bold">SHABU</div>
        </div>
        <div className="space-y-2 items-center">
        <ul className='menu menu w-56 bg-base-200 rounded-none text-xl text-white font-light'>
        <li className='p-2'>
           <Link to="/dashboard">แดชบอร์ด</Link>
         </li>
         <li className='p-2'>
           <Link to="/dashboard/menu">จัดการเมนู</Link>
         </li>
         <li className='p-2'>
           <Link to="/dashboard/employee">จัดการพนักงาน</Link>
         </li>
         <li className='p-2'>
           <Link to="/dashboard/category">Category</Link>
         </li>
         <li className='p-2'>
           <Link to="/dashboard/profile">Profile</Link>
         </li>
         <li className='p-2'>
           <Link to="/dashboard/booking">จองโต๊ะ</Link>
         </li>
         <li className='p-2 mt-20' onClick={handleLogout}>
           <Link to="/dashboard">Logout</Link>
         </li>
          </ul>
        </div>
      </aside>
      <div className="flex-grow bg-neutral mx-auto">
      <Outlet/>
      </div>
      </div>
    )
  }
  
  export default Dashboard