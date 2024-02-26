import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Edit_menu() {
    const {id} = useParams()
    const [menukub, setMenukub] = useState({
        name: "",
        price: "",
        type: ""
      })
      const navigate = useNavigate()

      useEffect(() =>{
        axios.get('http://localhost:3000/auth/menu/'+id)
        .then(result => {
            setMenukub({
                ...menukub,
                name: result.data.Result[0].name,
                price: result.data.Result[0].price,
                type: result.data.Result[0].type,
            })
        }).catch(err => console.log(err))
      },[])
    
      const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_menu/'+id, menukub)
        .then(result =>{
            if (result.data.Status){
                navigate('/dashboard/menu')
              }else{
                alert(result.data.Error)
              }
        }).catch(err => console.log(err))
      }

  return (
    <>
    <h4 className='text-3xl font-bold text-center text-white p-10'>แก้ไขเมนู</h4>
    <div className='flex justify-center items-center text-white'>
    <div className='p-10 rounded-box w-35 h-50 border'>
      <form className='join join-vertical' onSubmit={handleSubmit}>
        <label htmlFor="inputName" className='form-label p-3'>
          ชื่อเมนู
        </label>
        <input type="text" className='input input-bordered w-full max-w-xs' 
        id='inputName' 
        value={menukub.name}
          onChange={(e) => setMenukub({ ...menukub, name: e.target.value })}
        />
        <label htmlFor="inputPrice" className='form-label p-3'>
          ราคา
        </label>
        <input type="text" className='input input-bordered w-full max-w-xs'
          id='inputPrice'
          value={menukub.price}
          onChange={(e) => setMenukub({ ...menukub, price: e.target.value })}
        />
        <label htmlFor="inputType" className='form-label p-3'>
          ประเภท
        </label>
          <select required className="select select-bordered w-full max-w-xs" type='text' id='inputType'
            onChange={(e) => setMenukub({ ...menukub, type: e.target.value })}>
              <option></option>
              <option>ของหวาน</option>
              <option>ของคาว</option>
            </select>        
        <div className='flex justify-center'>
          <button type='submit' className='btn btn-outline btn-warning'>แก้ไข</button>
        </div>
      </form>
    </div>
  </div>
    </>
  )
}

export default Edit_menu