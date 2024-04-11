import React, { useEffect, useState } from 'react'

function OrderList(props) {

  // if(typeof onDeleteItem === 'function'){
  //   console.log('fun')
  // } else {
  //   console.log('not')
  // }

  const { id,image, name, price, amount } = props
  const [totalPrice, setTotalPrice] = useState(price * amount)
  const [itemOrder, setItemOrder] = useState(amount)

  useEffect(() => {
    setTotalPrice(itemOrder * price)
  }, [itemOrder])

  const plusOrder = () => {
    setItemOrder(itemOrder + 1)
    props.increaseByBtn(itemOrder+1,id,"plus")
  }
  const minusOrder = () => {
    setItemOrder(itemOrder - 1)
    props.increaseByBtn(itemOrder-1,id,"minus")
  }
  
  useEffect(() => {
    if (itemOrder <= 0) {
      setItemOrder(0)   //ลบได้
    }
  }, [itemOrder])

  const onDeleteItem =(name)=>{
    const newOrderItem = {
      id:id ,
      // name: name ,
      // price: Number(price) ,
      // amount: 1,
      // image: image 
  }
    props.onDeleteItem(newOrderItem.id)
  }

  return (
    <div className='card w-96 bg-base-100 shadow-xl p-5 m-5 flex'>
      <div className='flex'>
        <div className='mr-5'>
          <figure>
            <img src={`http://localhost:3000/Images/` + image} className='h-20 w-20' />
          </figure>
        </div>
        <div className='mr-5'>
          <p>ชื่อ : {name} </p>
          <p>ราคา : {price} บาท </p>
          <p>จำนวน : {itemOrder} ชิ้น </p>
        </div>
        <div className='flex items-center'>
          {itemOrder > 1 &&
          <span><button onClick={minusOrder} className='w-12 h-8 bg-red-600 mr-5 rounded-3xl'>-</button></span>
          }
          {itemOrder <= 1 && (
            <button className='w-12 h-8 bg-red-600 mr-5 rounded-3xl text-2xl' onClick={()=>onDeleteItem(name)}>&#x1F5D1;</button>
          )}
          <span><button onClick={plusOrder} className='w-12 h-8 bg-green-600 rounded-3xl'>+</button></span>
        </div>
      </div>
      <div className='mt-5'>
        <p>ราคารวม : {totalPrice} บาท</p>
      </div>
    </div>
  )
}

export default OrderList



//1.แสดงราคารวมตามจริง (ตอนนี้ยังเป็นราคาของเมนูนั้นแบบ 1 ชิ้น)

//2.เมื่อลบถึง 0 จะมีข้อความถามว่าจะลบทิ้งมั้ย

//3.ปุ่มกดสั่ง order
//รอข้อ1.แล้วทำเสร็จ object จะอัพเดตตามจำนวนที่สั่ง แล้วเอาทั้งหมดไป post ที่ DB