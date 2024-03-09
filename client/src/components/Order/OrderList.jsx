import React from 'react'

function OrderList(props) {
    const {name,price,amount} = props
    const totalPrice = price * amount
  return (
    <div className='card w-96 bg-base-100 shadow-xl p-5'>
        <p>
            ชื่อ : {name} <br/>
            ราคา : {price} บาท <br/>
            จำนวน : {amount} ชิ้น <br/>
            ราคารวม : {totalPrice} บาท
        </p>
    </div>
  )
}

export default OrderList