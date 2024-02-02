import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Menu() {
  const [menukub, setMenukub] = useState([])
  const navigate = useNavigate()

  useEffect(() =>{
    axios.get('http://localhost:3000/auth/menu')
    .then(result =>{
      if (result.data.Status){
        setMenukub(result.data.Result)
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }, [])

  // const handleDelete = (id) =>{
  //   axios.delete('http://localhost:3000/auth/delete_menu/'+id)
  //   .then(result => {
  //     if (result.data.Status){
  //         window.location.reload()
  //     }else{
  //       alert(result.data.Error)
  //     }
  //   })
  // }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'คุณต้องการลบเมนูนี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบ!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:3000/auth/delete_menu/'+id)
          .then(result => {
            if (result.data.Status) {
              Swal.fire(
                'ลบข้อมูลเรียบร้อย!',
                '',
                'Success'
              );
              window.location.reload();
            } else {
              Swal.fire(
                'เกิดข้อผิดพลาด!',
                result.data.Error,
                'error'
              );
            }
          })
          .catch(error => {
            console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
          });
      }
    });
  };
  

  return (
    <div className='text-black container mx-auto'>
      <div className='flex justify-center'>
      <h4 className='text-3xl font-bold text-center text-white p-10'>จัดการเมนู</h4>
      </div>
      <div className='flex items-center overflow-x-auto'>
      <table className='table table-zebra m-5'>
            <thead className='text-white'>
              <th>Name:</th>
              <th>Image:</th>
              <th>Type:</th>
              <th>Price:</th>
              <th>Action:</th>
            </thead>
            <tbody className='text-white'>
                {
                  menukub.map(m => (
                    <tr>
                       <td>{m.name}</td>
                       <td><img src={`http://localhost:3000/Images/`+m.image} alt="" className='menuimage'/></td>
                       <td>{m.type}</td>
                       <td>{m.price}</td>
                       <td>
                        <Link to={`/dashboard/edit_menu/`+m.id} className='btn btn-info btn-sm'>Edit</Link>
                        <button className='btn btn-warning btn-sm' onClick={() => handleDelete(m.id)} >Delete</button>
                       </td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
      </div>
      <div className='flex justify-center'>
        <Link to="/dashboard/add_menu" className='btn btn-outline btn-success text-1xl mt-20'>เพิ่มเมนู</Link>
      </div>
    </div>
  )
}

export default Menu