import React from 'react'
import OrderCard from './OrderCard'

function Order() {
    return (
      <>
      <h4 className='flex justify-center text-3xl font-bold text-center text-white p-10'>จัดการโต๊ะ</h4>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 justify-center'>
          <OrderCard cardText='1' cardColor='bg-gray-300' tableNo='1'/>
          <OrderCard cardText='2' cardColor='bg-blue-500' tableNo='2'/>
          <OrderCard cardText='3' cardColor='bg-blue-500' tableNo='3'/>
          <OrderCard cardText='4' cardColor='bg-blue-500' tableNo='4'/>
          <OrderCard cardText='5' cardColor='bg-blue-500' tableNo='5'/>
          <OrderCard cardText='6' cardColor='bg-blue-500' tableNo='6'/>
        </div>
      </div>
      </> 
    )
}

export default Order