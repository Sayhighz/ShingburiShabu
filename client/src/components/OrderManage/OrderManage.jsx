import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'

function OrderManage() {
  const [allTables, showTables] = useState([]);
  // method get show all tables
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/alltables")
      .then((result) => {
        console.log(result)
        if (result.data.Status) {
          showTables(result.data.Result);
        } else {
          alert("asdmo",result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <h4 className='flex justify-center text-3xl font-bold text-center text-white p-10'>จัดการโต๊ะ</h4>
    <div className='flex justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-4 justify-center'>
      {allTables.map((item) => (
        <OrderCard key={item.table_no} tableNo={item.table_no}/>
      ))}
      </div>
    </div>
    </> 
  )
}

export default OrderManage