import React, { useState } from 'react'

function ItemMenu(props) {
    const { id,name, price, image} = props
    const [showBtn,setShowBtn] = useState(false)
    const orderItem = () => {
        setShowBtn(true)
        const newOrderItem = {
            id:id ,
            name: name ,
            price: Number(price) ,
            amount: 1,
            image: image 
        }
        props.increaseValue(newOrderItem.id)
        props.newItem(newOrderItem)
    }

    return (
                <div className="card w-80 bg-base-100 shadow-xl m-5">
                    <figure>
                        <img src={`http://localhost:3000/Images/`+image} alt="" className='menuimage h-60 w-60 mt-5'/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Name : {name} </h2>
                        <h2>Price : {price}</h2>
                        <div className='flex justify-center'>
                            <button disabled={showBtn} onClick={orderItem} className='text-xl border border-inherit rounded-md p-1 bg-white text-black w-28'>Order</button>
                        </div>
                    </div>
                </div>
    )
}

export default ItemMenu