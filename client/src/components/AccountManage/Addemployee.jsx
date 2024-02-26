import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



function Addemployee() {
  const [employee1, setEmployee1] = useState({
    email: "",
    password: "",
    role: ""
  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/auth/add_employee", employee1)
      .then(result => {
        if (result.data.Status) {
          Swal.fire(
            'เพิ่มข้อมูลเรียบร้อย!',
            '',
            'success'
          ).then(() => {
            navigate("/dashboard/employee");
          });
        } else {
          Swal.fire(
            'เกิดข้อผิดพลาด!',
            result.data.Error,
            'error'
          );
        }
      })
      .catch(err => {
        console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูลพนักงาน:", err);
        Swal.fire(
          'เกิดข้อผิดพลาด!',
          'เกิดข้อผิดพลาดในการเพิ่มข้อมูลพนักงาน',
          'error'
        );
      });
  };



  return (
    <>
      <h4 className='text-3xl font-bold text-center text-white p-10'>เพิ่มพนักงาน</h4>
      <div className='flex justify-center items-center text-white'>
        <div className='p-3 w-35 h-50'>
          <form className='join join-vertical' onSubmit={handleSubmit}>
            <label htmlFor="inputEmail" className='form-label'>
              Email
            </label>
            <input type="email" className='input input-bordered w-full max-w-xs' id='inputEmail'
              autoComplete='off'
              placeholder='Enter Email'
              onChange={(e) => setEmployee1({ ...employee1, email: e.target.value })}
            />
            <label htmlFor="inputPassword" className='form-label p-3'>
              Password
            </label>
            <input type="text" className='input input-bordered w-full max-w-xs'
              id='inputPassword'
              placeholder='Enter Password'
              autoComplete='off'
              onChange={(e) => setEmployee1({ ...employee1, password: e.target.value })}
            />
            <label htmlFor="inputRole" className='form-label p-3'>
              Role
            </label>
            <select required className="select select-bordered w-full max-w-xs" type='text' id='inputRole'
              onChange={(e) => setEmployee1({ ...employee1, role: e.target.value })}>
              <option></option>
              <option>admin</option>
              <option>visitor</option>
            </select>
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