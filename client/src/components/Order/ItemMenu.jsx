import React, { useState } from 'react'

function ItemMenu(props) {
    const { id,name, price, image } = props
    const [countValue,setCountValue] = useState(0)
    const [showBtn,setShowBtn] = useState(true)
    const plus = () => {
        setCountValue(countValue+1)
        setShowBtn(false)
    }
    const minus = () => {
        if(countValue<=1){
            setCountValue(0)
            setShowBtn(true)
        } else {
            setCountValue(countValue-1)
        }
    }
    const orderItem = () => {
        setCountValue(0)
        setShowBtn(true)
        const newOrderItem = {
            id:id ,
            name: name ,
            price: Number(price) ,
            amount: Number(countValue) 
        }
        props.newItem(newOrderItem)
    }
    return (
                <div className="card w-80 bg-base-100 shadow-xl m-5">
                    <figure>
                        <img src={`http://localhost:3000/Images/`+image} alt="" className='menuimage'/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Name : {name} Price : {price}</h2>
                        <div className="card-actions">
                            <button className="btn" onClick={minus}>-</button>
                            <p className='items-center text-center'>
                                {countValue}
                            </p>
                            <button className="btn" onClick={plus}>+</button>
                            <button onClick={orderItem} disabled={showBtn}>Order</button>
                        </div>
                    </div>
                </div>
    )
}

export default ItemMenu