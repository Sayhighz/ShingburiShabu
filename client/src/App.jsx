import { useState } from 'react'
import Login from './components/Login'
import { BrowserRouter, Routes, Route , } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Category from './components/Category'
import Profile from './components/Profile'
import AddCategory from './components/AddCategory'
import Addmenu from './components/Addmenu'
import Menu from './components/Menu'
import Booking from './components/Booking'
import Edit_menu from './components/Edit_menu'
import Employee from './components/Employee'
import Addemployee from './components/Addemployee'
import Edit_employee from './components/Edit_employee'
import VisitorDashBoard from './components/VisitorDashBoard' 
import VisitorHome from './components/VisitorHome'
import Order from './components/Order'
import Test from './components/test'

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/adminlogin' element={<Login/>}></Route>
        {/* <Route path='/visitor' element={<Visitor/>}></Route> */}
        <Route path='/visitor' element={<VisitorDashBoard/>}>
            <Route path='' element={<VisitorHome/>}></Route>
            <Route path='/visitor/order' element={<Order/>}></Route>
            <Route path='/visitor/test' element={<Test/>}></Route>
            </Route>
        <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='' element={<Home/>}></Route>
        <Route path='/dashboard/menu' element={<Menu/>}></Route>
        <Route path='/dashboard/employee' element={<Employee/>}></Route>
        <Route path='/dashboard/category' element={<Category/>}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/booking' element={<Booking/>}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory/>}></Route>
        <Route path='/dashboard/add_menu' element={<Addmenu/>}></Route>
        <Route path='/dashboard/edit_menu/:id' element={<Edit_menu/>}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<Edit_employee/>}></Route>
        <Route path='/dashboard/add_employee' element={<Addemployee/>}></Route>
        </Route>
        
        {/* <Route path='/visitor' element={<VisitorDashBoard/>}>
            <Route path='' element={<VisitorHome/>}></Route>
            <Route path='/visitor/order' element={<Order/>}></Route>
            </Route> */}
            
        </Routes>  
    </BrowserRouter>
   
  )
}

export default App
