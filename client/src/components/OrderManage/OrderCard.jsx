import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactToPrint from 'react-to-print';

function OrderCard(props) {
  const [cardColor, setCardColor] = useState("bg-green-500");
  const [tableNo] = useState(props.tableNo);
  const [orderkub, setOrder] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const navigate = useNavigate();
  const componentRef = useRef(); // 1. เพิ่ม Ref สำหรับ Component

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/table?tableNo=${tableNo}`
        );
        if (response.data.Status) {
          setOrder(response.data.Result);
          setCardColor(
            response.data.Result.length > 0 ? "bg-yellow-500" : "bg-green-500"
          );
        } else {
          alert(response.data.Error);
          setCardColor("bg-green-500");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [tableNo]);

  const totalAmount = orderkub.reduce(
    (total, item) => total + item.price * item.food_amount,
    0
  );

  const changeAmount = amountPaid - totalAmount;

  const isButtonDisabled = amountPaid === 0 || isNaN(amountPaid) || amountPaid < totalAmount;

  const handleClick2 = () => {
    if (isButtonDisabled) {
      if (amountPaid === 0 || isNaN(amountPaid)) {
        alert("กรุณากรอกจำนวนเงินที่ลูกค้าจ่ายให้ถูกต้อง");
      }
      return;
    }

    const modal = document.getElementById(`my_modal_${tableNo}`);
    if (modal) {
      modal.showModal();
      if (componentRef.current) { // 3. เรียกใช้ ReactToPrint เมื่อกดเช็คบิล
        componentRef.current.handlePrint();
      }
    }
  };

  const handleClick = () => {
    if (orderkub.length === 0) {
      navigate("/visitor/ordermenu");
    } else {
      document.getElementById(`my_modal_${tableNo}`).showModal();
    }
  };

  return (
    <>
      <div
        className={`card w-60 shadow-xl ${cardColor} text-white m-10`}
        onClick={handleClick}
      >
        <div className="card-body items-center text-center btn btn-ghost">
          <h1 className="card-title">โต๊ะที่ {tableNo}</h1>
        </div>
      </div>
      <dialog id={`my_modal_${tableNo}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-center">โต๊ะที่ {tableNo}</h3>
          <div className="grid content-center">
            <div>
              <div className="flex items-center overflow-y-auto">
                <table className="table table-zebra m-5 text-center">
                  <thead className="text-white bg-base-100">
                    <tr>
                      <th>รายการอาหาร</th>
                      <th>จำนวน</th>
                      <th>ราคาต่อชิ้น</th>
                      <th>ราคา</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {orderkub.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.food_amount}</td>
                        <td>{item.price}</td>
                        <td>{item.price * item.food_amount}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>ยอดสุทธิ</td>
                      <td></td>
                      <td></td>
                      <td>{totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <form className="">
              <div className="flex justify-center">
                <div className="join join-vertical">
                  <label htmlFor="">รวมทั้งสิ้น (บาท)</label>
                  <input
                    type="text"
                    placeholder={totalAmount}
                    className="input input-bordered w-full max-w-xs m-2"
                    disabled
                  />
                  <input
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
                    className="input input-bordered w-full max-w-xs m-2"
                  />
                  <label htmlFor="">เงินทอน (บาท)</label>
                  <input
                    type="text"
                    value={changeAmount >= 0 ? changeAmount : ""}
                    className="input input-bordered w-full max-w-xs m-2"
                    disabled
                  />
                </div>
              </div>
              <span className="flex justify-center">
                <button
                  className={`btn btn-outline btn-success m-2 ${isButtonDisabled ? 'disabled' : ''}`}
                  onClick={handleClick2}
                  disabled={isButtonDisabled}
                >
                  เช็คบิล
                </button>
                <Link to="/visitor/ordermenu">
                  <button className="btn btn-outline btn-success m-2">
                    สั่งอาหารเพิ่ม
                  </button>
                </Link>
              </span>
            </form>
          </div>
        </div>
      </dialog>

    </>
  );
}

export default OrderCard;
