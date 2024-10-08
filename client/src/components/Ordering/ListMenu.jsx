import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import ItemMenu from './ItemMenu'
import OrderList from './OrderList'
import uuid from 'react-uuid';

function ListMenu() {
    const [menukub, setMenukub] = useState([])                  //เมนูที่ดึงมาจาก DB
    const [orderItem, setOrderItem] = useState([])              //เมนูที่สั่ง
    const [cgyMenu, setCgyMenu] = useState([])                  //เอาไว้ใช้อะไรก็ได้ที่เกี่ยวกับเมนู แบ่งหมวดหมู่ slice ต่างๆโดยมาจาก menukub
    const [cgyMenuSlice, setCgyMenuSlice] = useState([])        //เอาไว้ใช้ตอนกดเลขหน้า
    const [cgyMenuNum, setCgyMenuNum] = useState(0)             //จำนวนของ menukub
    const [totalPrice, setTotalPrice] = useState(0)
    const [search, setSearch] = useState("")                    //เกี่ยวกับการค้นหาเมนู
    const [pages, setPages] = useState(0)                       //เกี่ยวกับเลขหน้า
    const [pagesLoop, setPagesLoop] = useState([])              //เกี่ยวกับเลขหน้า
    const [foodAmount, setFoodAmount] = useState(0)             //เมื่อเมนูซ้ำ แต่ส่งได้
    const { tableNo } = useParams()                             // รับค่า tableNo จาก URL
    const location = useLocation();                             //url
    const [testId, settestId] = useState("");                   // เก็บ id create by
    const now = new Date()                                      //วันที่
    if (pagesLoop == 1) {
        setPagesLoop([])
    }
    const regex = /\/visitor\/ordermenu\/\d+\/(\d+)/;
    const match = location.pathname.match(regex);
    const order_no = match ? match[1] : null;
    console.log(order_no)
    // console.log(location.pathname)
    // console.log(order_no)
    const navigate = useNavigate()


    useEffect(() => {
      // ดึง id จาก localStorage เมื่อคอมโพเนนต์โหลด
      const id = localStorage.getItem("visitorId");
      settestId(id); // อัปเดต state สำหรับ id
    }, []);
  

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
        setCgyMenu(menukub)
        setFilterMenu(menukub)
    }


    const [filterMenu, setFilterMenu] = useState([])
    useEffect(() => {
        const name_menu = cgyMenu.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        setFilterMenu(name_menu)
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
        console.log(uniqueMenus); // เมนูที่สั่ง อยู่ในนี้

        uniqueMenus.forEach((menu) => {
            const orderData = {
                "order_no": order_no, // ใช้ uuid สร้าง UUID สำหรับ order_no
                "table_no": tableNo,
                "food_no": menu.id,
                "food_amount": menu.amount,
                "order_status": "not_paying",
                "create_date": new Date(now.getTime() + (7 * 60 * 60 * 1000)),
                "create_by": testId
            };

            console.log("order to db ----", orderData);

            axios.put('http://localhost:3000/auth/orderToDB', orderData)
                .then(response => {
                    console.log(response.data); // แสดงข้อมูลการตอบกลับจากเซิร์ฟเวอร์
                    // ดำเนินการตามความเหมาะสม เช่น แสดงข้อความบน UI หรือรีเฟรชข้อมูล

                    if (response.data.Status == false) {
                        axios.get(`http://localhost:3000/auth/orderRepeat?order_no=${order_no}&table_no=${tableNo}&food_no=${menu.id}`, foodAmount)
                            .then((result) => {
                                if (result.data.status) {
                                    setFoodAmount(result.data);
                                    console.log(result.data)
                                    console.log(menu.amount + result.data.food_amount)
                                    let add_orderRepeat = {
                                        newAmount: Number(menu.amount + result.data.food_amount),
                                        order_no: order_no,
                                        table_no: Number(tableNo),
                                        food_no: menu.id,
                                        order_status: "not_paying"
                                    }
                                    console.log(add_orderRepeat)
                                    axios.post("http://localhost:3000/auth/add_orderRepeat", add_orderRepeat)
                                } else {
                                    alert(result.data.Error);
                                }
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch(error => {
                    console.error('Error:', error.response.data); // แสดงข้อความข้อผิดพลาดบนคอนโซล
                    // แสดงข้อความข้อผิดพลาดบน UI หรือดำเนินการตามความเหมาะสม
                });
        });
    };

    const increaseByBtn = (amount, id, text) => {
        setOrderItem(orderItem.map(menu => {
            if (menu.id === id && text == "plus") {
                return { ...menu, amount: menu.amount + 1 }
            } else if (menu.id === id && text == "minus") {
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
                        <OrderList {...menu} key={uuid()} onDeleteItem={deleteItem} increaseByBtn={increaseByBtn} />
                    ))}
                </div>
                <div className='m-5 text-center text-4xl w-96'>
                    <button onClick={() => document.getElementById('my_modal_4').showModal()} disabled={orderItem.length <= 0} className='btn btn-lg '>Order</button>
                </div>
            </div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-1xl">
                    <h3 className="font-bold text-lg">ORDER!</h3>
                    <p className="py-4">จะทำการส่งออเดอร์เลยไหม?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn mr-5">สั่งอาหารต่อ</button>
                            <Link to={"/visitor"}>
                                <button className="btn" onClick={goToDB}>สั่งออเดอร์</button>
                            </Link>
                            {/* <button className="btn" onClick={goToDB}>สั่งออเดอร์</button> */}
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ListMenu
