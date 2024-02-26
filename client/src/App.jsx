import { useState } from 'react'
import Login from './components/Other/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Other/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
import Category from './components/Category'
import Profile from './components/Profile'
import AddCategory from './components/AddCategory'
import Addmenu from './components/MenuManage/Addmenu'
import Menu from './components/MenuManage/Menu'
import Bill from './components/BillManage/Bill'
import Edit_menu from './components/MenuManage/Edit_menu'
import Visitor from './components/Visitor'
import Employee from './components/AccountManage/Employee'
import Addemployee from './components/AccountManage/Addemployee'
import Edit_employee from './components/AccountManage/Edit_employee'

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/adminlogin' element={<Login/>}></Route>
        <Route path='/visitor' element={<Visitor/>}></Route>
        <Route path='/dashboard' element={<Sidebar/>}>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/dashboard/menu' element={<Menu/>}></Route>
        <Route path='/dashboard/employee' element={<Employee/>}></Route>
        <Route path='/dashboard/category' element={<Category/>}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/bill' element={<Bill/>}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory/>}></Route>
        <Route path='/dashboard/add_menu' element={<Addmenu/>}></Route>
        <Route path='/dashboard/edit_menu/:id' element={<Edit_menu/>}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<Edit_employee/>}></Route>
        <Route path='/dashboard/add_employee' element={<Addemployee/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
