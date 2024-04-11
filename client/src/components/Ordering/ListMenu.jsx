import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ItemMenu from './ItemMenu'
import OrderList from './OrderList'
import uuid from 'react-uuid';

function ListMenu() {
    const [menukub, setMenukub] = useState([])
    const [orderItem, setOrderItem] = useState([])
    const [cgyMenu, setCgyMenu] = useState([])
    const [cgyMenuSlice, setCgyMenuSlice] = useState([])
    const [cgyMenuNum, setCgyMenuNum] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [search, setSearch] = useState("")
    const [pages, setPages] = useState(0)
    const [pagesLoop, setPagesLoop] = useState([])
    if (pagesLoop == 1) {
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
    const num = 6
    const itemPerPages = Math.ceil(numMenu / num)

    useEffect(() => {
        setCgyMenu(menukub.slice(0, num))
        setCgyMenuSlice(menukub)
        setCgyMenuNum(menukub.length)

        setFilterMenu(menukub)
    }, [menukub])

    const newOrderItem = (newOrder) => {
        setOrderItem((prevItem) => {
            // const existingItem = prevItem.findIndex(item => item.id === prevItem.id)
            // console.log(existingItem)
            return [...prevItem, newOrder]
        })
    }

    const cgy = (category) => {
        if (category === "ทั้งหมด") {
            setCgyMenu(menukub)
            setCgyMenu(menukub.slice(0, num))
            setCgyMenuSlice(menukub)
            setCgyMenuNum(menukub.length)
        } else {
            const cgy_menu = menukub.filter(type => type.type === category)
            setCgyMenu(cgy_menu.slice(0, num))
            setCgyMenuSlice(cgy_menu)
            setCgyMenuNum(cgy_menu.length)
        }
    }

    useEffect(() => {
        setPages([])
        setPages(itemPerPages)
        const newPagesLoop = Array.from(Array(pages).keys()).map(n => n + 1)
        setPagesLoop(newPagesLoop)
    }, [pages, itemPerPages])

    const goToPages = (value) => {
        const itemPage = ((num * (value - 1)))
        const curPages = cgyMenuSlice.slice(itemPage, itemPage + num)
        setCgyMenu(curPages)
        console.log(curPages)
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        const price = orderItem.map(orderItem => orderItem.price)
        const amount = orderItem.map(orderItem => orderItem.amount)
        const total = price.map((price, index) => price * amount[index])
        const priceTotal = total.filter(element => element > 0).reduce((result, element) => result += element, 0)
        setTotalPrice(priceTotal)
    }, [orderItem])

    const searchMenu = (event) => {
        const nameByChr = event.target.value
        setSearch(nameByChr)
        console.log(nameByChr)
        setCgyMenu(menukub)
        setFilterMenu(menukub)
    }


    const [filterMenu, setFilterMenu] = useState([])
    useEffect(() => {
        const name_menu = cgyMenu.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        setFilterMenu(name_menu)
        console.log(filterMenu)
    }, [cgyMenu, search])

    useEffect(() => {
        if (search.length == 0) {
            setCgyMenu(menukub.slice(0, num))
        }
    }, [search])

    const deleteItem = (id) => {
        setOrderItem(orderItem.filter(order => order.id !== id))
    }

    const increaseValue = (id) => {
        setOrderItem(orderItem.map(menu => {
            if (menu.id === id) {
                return { ...menu, amount: menu.amount + 1 }
            }
            return menu
        }))
    }

    const uniqueMenus = Array.from(new Set(orderItem.map(menu => menu.id))).map(id => {
        return orderItem.find(menu => menu.id === id)
    })

    const goToDB = () => {
        console.log(uniqueMenus) //เมนูตอนสั่ง อยู่ในนี้
        // const orderToDB = uniqueMenus.map(menu => ({
        //     order_no: 1,
        //     table_no: 1, //เอาโต๊ะมาจากไหน?
        //     food_no: menu.id, 
        //     food_amount: menu.amount,
        //     order_status: "not_paying",
        //     create_date: new Date().toISOString(),
        //     create_by: 12 // กายบอกยากกูก็ไม่รู้จะยังไงแล้วครับ
        // }));
        const orderToDB = {
            "order_no": "20",
  "table_no": "15",
  "food_no": "2",
  "food_amount": "6",
  "order_status": "not_paying",
  "create_date": "22-22-2256",
  "create_by": "12"
        }
        console.log(orderToDB)

        axios.post('http://localhost:3000/auth/orderToDB', orderToDB)
        .then(response => {
            console.log(response.data); // แสดงข้อมูลการตอบกลับจากเซิร์ฟเวอร์
            // ดำเนินการตามความเหมาะสม เช่น แสดงข้อความบน UI หรือรีเฟรชข้อมูล
        })
        .catch(error => {
            console.error('Error:', error.response.data); // แสดงข้อความข้อผิดพลาดบนคอนโซล
            // แสดงข้อความข้อผิดพลาดบน UI หรือดำเนินการตามความเหมาะสม
        });
    }

    const increaseByBtn =(amount,id,text)=>{
        console.log(id)
        console.log(amount)
        setOrderItem(orderItem.map(menu => {
            if (menu.id === id && text == "plus") {
                return { ...menu, amount: menu.amount + 1 }
            } else {
                return { ...menu, amount: menu.amount - 1 }
            }
            return menu
        }))
    }

    return (
        <div className='flex p-10'>
            <div>
                <div className='m-5 ml-10'>
                    <input type="text" placeholder='ค้นหาเมนู' value={search} onChange={searchMenu} className="input input-bordered w-full max-w-xs " />
                </div>
                <div className='bg-neutral-700 w-fit ml-10 rounded-3xl'>
                    <span><button className='h-full pl-10 pr-10 pt-5 pb-5' onClick={() => { cgy("ทั้งหมด") }}>ทั้งหมด</button></span>
                    <span><button className='h-full pl-10 pr-10 pt-5 pb-5' onClick={() => { cgy("ของคาว") }}>ของคาว</button></span>
                    <span><button className='h-full pl-10 pr-10 pt-5 pb-5' onClick={() => { cgy("เครื่องดื่ม") }}>เครื่องดื่ม</button></span>
                    <span><button className='h-full pl-10 pr-10 pt-5 pb-5' onClick={() => { cgy("ของหวาน") }}>ของหวาน</button></span>
                </div>
                <div className='m-5 grid gap-4 grid-cols-2 grid-rows-3'>
                    {filterMenu.map((element) => {
                        return <ItemMenu {...element} key={uuid()} newItem={newOrderItem} increaseValue={increaseValue} />
                    })}
                </div>
                <div className='m-5'>
                    {pagesLoop.map((value, index) => {
                        return (
                            <span key={index}>
                                <button className="btn btn-sm m-5 w-20 h-20" onClick={() => { goToPages(value) }}>{value}</button>
                            </span>
                        )
                    })}
                </div>
            </div>
            <div className='mt-60 max-w-fit p-5'>
                <div className='m-5'>
                    {uniqueMenus.map(menu => (
                        <OrderList {...menu} key={uuid()} onDeleteItem={deleteItem} increaseByBtn={increaseByBtn}/>
                    ))}
                </div>
                <div className='m-5 text-center text-4xl w-96'>
                    <button onClick={goToDB} disabled={orderItem.length <= 0} className='btn btn-lg '>Order</button>
                </div>
            </div>
        </div>
    )
}

export default ListMenu