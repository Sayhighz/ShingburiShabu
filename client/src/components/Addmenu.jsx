import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Addmenu() {
  const [menukub, setMenukub] = useState({
    name: "",
    price: "",
    type: "",
    image: ""
  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()  
    const formData = new FormData();
    formData.append('name', menukub.name)
    formData.append('price', menukub.price)
    formData.append('type', menukub.type)
    formData.append('image', menukub.image)

    axios.post("http://localhost:3000/auth/add_menu", formData)
      .then(result => {
        if (result.data.Status) {
          navigate("/dashboard/menu")
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
    <h4 className='text-3xl font-bold text-center text-white p-10'>เพิ่มเมนู</h4>
    <div className='flex justify-center items-center'>
      <div className='p-3 rounded-box w-35 h-50 shadow-xl'>
        <form className='join join-vertical' onSubmit={handleSubmit}>
          <label for="inputName" className='form-label p-3'>
            ชื่อเมนู
          </label>
          <input type="text" className='input input-bordered w-full max-w-xs' id='inputName'
            onChange={(e) => setMenukub({ ...menukub, name: e.target.value })}
          />
          <label for="inputPrice" className='form-label p-3'>
            ราคา
          </label>
          <input type="text" className='input input-bordered w-full max-w-xs'
            id='inputPrice'
            onChange={(e) => setMenukub({ ...menukub, price: e.target.value })}
          />
          <label for="inputType" className='form-label p-3'>
            ประเภท
          </label>
          <input type="text" className='input input-bordered w-full max-w-xs'
            id='inputType'
            onChange={(e) => setMenukub({ ...menukub, type: e.target.value })}
          />
          <div className='col-12 mb-3 pt-5'>
            <label className='form-label' for="inputGroupFile01">
            </label>
            <input type="file"
              className='file-input file-input-bordered w-full max-w-xs'
              name='image'
              onChange={(e) => setMenukub({ ...menukub, image: e.target.files[0] })}
            />
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='btn btn-outline btn-accent'>เพิ่มเมนู</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Addmenu