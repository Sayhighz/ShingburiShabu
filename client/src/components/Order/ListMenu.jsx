import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ItemMenu from './ItemMenu'
import OrderList from './OrderList'

function ListMenu() {
    const [menukub, setMenukub] = useState([])
    const [orderItem, setOrderItem] = useState([])
    const [cgyMenu,setCgyMenu] = useState([])
    const [cgyMenuSlice,setCgyMenuSlice] = useState([])
    const [cgyMenuNum,setCgyMenuNum] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const [search,setSearch] = useState("")
    const [pages,setPages] = useState(0)
    const [pagesLoop,setPagesLoop] = useState([])
    const [showAll,setShowAll] = useState([])
    if(pagesLoop == 1) {
        setPagesLoop([])
    }

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/menu')
            .then(result => {
                if (result.data.Status) {
                    setMenukub(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])


    const numMenu = Number(cgyMenuNum)
    const num = 3
    const itemPerPages = Math.ceil(numMenu / num)

    useEffect(()=>{
        setCgyMenu(menukub.slice(0,num))
        setCgyMenuSlice(menukub)
        setCgyMenuNum(menukub.length)

        setFilterMenu(menukub)
    },[menukub])

    const newOrderItem = (newOrder) => {
        setOrderItem((prevItem) => {
            return [...prevItem, newOrder]
        })
    }

    const cgy = (category) => {
        if(category === "ทั้งหมด"){
            setCgyMenu(menukub)
            setCgyMenu(menukub.slice(0,num))
            setCgyMenuSlice(menukub)
            setCgyMenuNum(menukub.length)
        } else {
            const cgy_menu = menukub.filter(type=>type.type===category)
            setCgyMenu(cgy_menu.slice(0,num))
            setCgyMenuSlice(cgy_menu)
            setCgyMenuNum(cgy_menu.length)
        }
    }

    useEffect(()=>{
        setPages([])
        setPages(itemPerPages)
        const newPagesLoop = Array.from(Array(pages).keys()).map(n => n + 1)
        setPagesLoop(newPagesLoop)
    },[pages,itemPerPages])

    const goToPages = (value) => {
        const itemPage = ((num*(value-1)))
        const curPages = cgyMenuSlice.slice(itemPage,itemPage+num)
        setCgyMenu(curPages)
        console.log(curPages)
        window.scrollTo(0,0)
    }

    useEffect(()=>{
        const price = orderItem.map(orderItem=>orderItem.price)
        const amount = orderItem.map(orderItem=>orderItem.amount)
        const total = price.map((price,index)=>price * amount[index])
        const priceTotal = total.filter(element=>element>0).reduce((result,element)=>result += element,0)
        setTotalPrice(priceTotal)
    },[orderItem])


    const searchMenu = (event) => {
        const nameByChr = event.target.value
        setSearch(nameByChr)
        console.log(nameByChr)
        setCgyMenu(menukub)
        setFilterMenu(menukub)
    }


    const [filterMenu,setFilterMenu] = useState([])
    useEffect(()=>{
        const name_menu = cgyMenu.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        setFilterMenu(name_menu)

    },[cgyMenu,search])

    useEffect(()=>{
        if(search.length == 0){
            setCgyMenu(menukub.slice(0,num))
        }
    },[search])

    return (
        <div>
            <div className='m-5'>
                <input type="text" placeholder='ค้นหาเมนู' value={search} onChange={searchMenu} className="input input-bordered w-full max-w-xs " />
            </div>
            <div className='p-5'>
                <span><button className='m-5' onClick={() => { cgy("ทั้งหมด") }}>ทั้งหมด</button></span>
                <span><button className='m-5' onClick={() => { cgy("ของคาว") }}>ของคาว</button></span>
                <span><button className='m-5' onClick={() => { cgy("เครื่องดื่ม") }}>เครื่องดื่ม</button></span>
                <span><button className='m-5' onClick={() => { cgy("ของหวาน") }}>ของหวาน</button></span>
            </div>
            <div className='m-5'>
                {filterMenu.map((element) => {
                    return <ItemMenu {...element} key={element.id} newItem={newOrderItem} />
                })}
            </div>
            <div className='m-5'>
                {pagesLoop.map((value,index)=>{
                    return(
                            <span key={index}>
                                <button className="btn btn-sm m-5 w-20 h-20" onClick={()=>{goToPages(value)}}>{value}</button>
                            </span>
                    )
                })}
            </div>
            <div>
                {orderItem.map((element) => {
                    return <OrderList {...element} key={element.id} />
                })}
            </div>
            <div className='m-5'>
                ราคารวม : <span className='font-bold text-lg'>{totalPrice}</span>
            </div>
        </div>
    )
}

export default ListMenu