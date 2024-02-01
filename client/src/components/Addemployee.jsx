import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Addemployee() {
  const [employee1, setEmployee1] = useState({
    email: "",
    password: "",
    role: ""
  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/auth/add_employee", employee1)
      .then(result => {
        if (result.data.Status) {
          navigate("/dashboard/employee")
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
    <h4 className='text-3xl font-bold text-center text-white p-10'>เพิ่มพนักงาน</h4>
    <div className='flex justify-center items-center'>
      <div className='p-3 rounded-box w-35 h-50 shadow-xl'>
        <form className='join join-vertical' onSubmit={handleSubmit}>
          <label for="inputEmail" className='form-label'>
            Email
          </label>
          <input type="text" className='input input-bordered w-full max-w-xs' id='inputEmail' placeholder='Enter Email'
           onChange={(e) => setEmployee1({ ...employee1, email: e.target.value })}
          />
          <label for="inputPassword" className='form-label p-3'>
            Password
          </label>
          <input type="text" className='input input-bordered w-full max-w-xs'
            id='inputPassword'
            placeholder='Enter Password'
            onChange={(e) => setEmployee1({ ...employee1, password: e.target.value })}
          />
          <label for="inputRole" className='form-label p-3'>
            Role
          </label>
          <input type="text" className='input input-bordered w-full max-w-xs'
            id='inputRole'
            placeholder='Enter Type'
            onChange={(e) => setEmployee1({ ...employee1, role: e.target.value })}
          />
          <div className='flex justify-center p-5'>
            <button type='submit' className='btn btn-outline btn-accent'>เพิ่มพนักงาน</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Addemployee