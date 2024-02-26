import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function VisitorHome() {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setEmployeeTotal] = useState(0)
  const [menutotal, setMenuTotal] = useState(0)

  useEffect(() => {
    adminCount();
    employeecount();
    menucount();
  }, [])
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status)
          setAdminTotal(result.data.Result[0].admin)
      })
  }
  const employeecount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status)
          setEmployeeTotal(result.data.Result[0].employee)
      })
  }
  const menucount = () => {
    axios.get('http://localhost:3000/auth/menu_count')
      .then(result => {
        if (result.data.Status)
        setMenuTotal(result.data.Result[0].menu)
      })
  }
  return (
    <>
    <h4 className='text-3xl font-bold text-center text-white p-10'>สรุปผล</h4>
    <div className='flex justify-center mt-'>
      <div className="card w-60 shadow-xl bg-blue-400 text-black m-10">
      <Link to="/visitor/order">
        <figure className="px-10 pt-10">
          <img src="https://cdn.icon-icons.com/icons2/3005/PNG/512/admin_user_icon_188317.png" alt="" className="rounded-2xl" />
        </figure>
        <div className="card-body items-center text-center ">
          <h2 className="card-title rounded-box cursor-pointer link-hover">Order</h2>
          {/* <p>{adminTotal}</p>
          <h3>บัญชี</h3> */}
        </div></Link>
      </div>
       <div className="card w-60 shadow-xl bg-green-400 text-black m-10">
       <Link to="/visitor/order">
        <figure className="px-10 pt-10">
          <img src="https://cdn.icon-icons.com/icons2/3837/PNG/512/employee_line_icon_235348.png" alt="" className="rounded-2xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">เช็คบิล</h2>
          {/* <p>{employeeTotal}</p> */}
          <h3></h3>
        </div></Link>
      </div> 
      {/* <div className="card w-60 shadow-xl bg-orange-400 text-black m-10">
        <figure className="px-10 pt-10">
          <img src="https://cdn.icon-icons.com/icons2/1642/PNG/512/foodmealplaterestaurant_109684.png" alt="" className="rounded-2xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">จำนวนเมนูอาหาร</h2>
          <p>{menutotal}</p>
          <h3 className='link'><Link to="">ดูรายการอาหาร</Link></h3>
        </div>
      </div> */}
    </div>
    </>
  )
}

export default VisitorHome