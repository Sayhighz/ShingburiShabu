import React from 'react'
import BookingCard from './BookingCard'

function Booking() {
    return (
      <>
      <h4 className='flex justify-center text-3xl font-bold text-center text-white p-10'>จัดการโต๊ะ</h4>
      <div className='flex justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-3 justify-center'>
        <BookingCard cardText='1' cardColor='bg-gray-300' tableNo='1'/>
        <BookingCard cardText='2' cardColor='bg-blue-500' tableNo='2'/>
        <BookingCard cardText='3' cardColor='bg-blue-500' tableNo='3'/>
        <BookingCard cardText='4' cardColor='bg-blue-500' tableNo='4'/>
        <BookingCard cardText='5' cardColor='bg-blue-500' tableNo='5'/>
        <BookingCard cardText='6' cardColor='bg-blue-500' tableNo='6'/>
      </div>
      </div>
      </>
    )
}

export default Booking