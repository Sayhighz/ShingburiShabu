import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// edit employee function
// input email, password, role
function Edit_employee(props) {
    const {id} = useParams()
    const [employee1, setEmployee1] = useState({
        email: "",
        password: "",
        role: ""
      })
      const navigate = useNavigate()

      useEffect(() =>{
        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result => {
          setEmployee1({
                ...employee1,
                email: result.data.Result[0].email,
                password: result.data.Result[0].password,
                role: result.data.Result[0].role,
            })
        }).catch(err => console.log(err))
      },[])
    
      const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+id, employee1)
        .then(result =>{
            if (result.data.Status){
                navigate('/dashboard/employee')
              }else{
                alert(result.data.Error)
              }
        }).catch(err => console.log(err))
      }

  return (
    <>
    {/* header */}
    <h4 className='text-3xl font-bold text-center text-white p-10'>แก้ไขบัญชีพนักงาน</h4>
    <div className='flex justify-center items-center'>
    {/* content */}
    <div className='p-3 rounded-box w-35 h-50 border'>
      <form className='join join-vertical' onSubmit={handleSubmit}>
        <label htmlFor="inputEmail" className='form-label'>
          Email
        </label>
        <input type="text" className='input input-bordered w-full max-w-xs' 
        id='inputEmail' 
        placeholder='Edit Email'
        value={employee1.email}
          onChange={(e) => setEmployee1({ ...employee1, email: e.target.value })}
        />
        <label htmlFor="inputPassword" className='form-label p-3'>
          Password
        </label>
        <input type="text" className='input input-bordered w-full max-w-xs'
          id='inputPassword'
          placeholder='Edit Password'
          value={employee1.password}
          onChange={(e) => setEmployee1({ ...employee1, password: e.target.value })}
        />
        <label htmlFor="" className='form-label p-3'>
          Role
        </label>
        <select required className="select select-bordered w-full max-w-xs" type='text' id='inputRole'
              onChange={(e) => setEmployee1({ ...employee1, role: e.target.value })}>
              <option></option>
              <option>admin</option>
              <option>visitor</option>
            </select>
            {/* submit btn */}
        <div className='flex justify-center'>
          <button type='submit' className='btn btn-outline btn-warning'>แก้ไข</button>
        </div>
      </form>
    </div>
  </div>
    </>
  )
}

export default Edit_employee