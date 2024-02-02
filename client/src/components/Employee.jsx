import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

function Employee() {
  const [employee1, setEmployee1] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee1(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบ!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:3000/auth/delete_employee/' + id)
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
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h4 className='text-3xl font-bold text-center text-white p-10'>จัดการพนักงาน</h4>
      </div>
      <div className='flex items-center overflow-x-auto' >
        <table className='table table-zebra m-5'>
          <thead className='text-white '>
            <th>Email:</th>
            <th>Role:</th>
            <th>Action:</th>
          </thead>
          <tbody className='text-white'>
            {
              employee1.map(e => (
                <tr>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/` + e.id} className='btn btn-info btn-sm'>Edit</Link>
                    <button className='btn btn-warning btn-sm' onClick={() => handleDelete(e.id)} >Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='flex justify-center'>
        <Link to="/dashboard/add_employee" className='btn btn-outline btn-success text-1xl mt-20'>เพิ่มบัญชีพนักงาน</Link>
      </div>
    </div>
  )
}

export default Employee