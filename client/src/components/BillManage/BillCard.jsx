import React, { useState, useEffect } from "react";
import axios from "axios";

function BillCard(props) {
  const [orderNo] = useState(props.orderNo);
  const [orderkub, setOrder] = useState([]);
  
  // get orderdetail
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/order?orderNo=${orderNo}`
        );
        if (response.data.Status) {
          setOrder(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [orderNo]);
  const totalAmount = orderkub.reduce(
    (total, item) => total + item.price * item.food_amount,
    0
  );
  return (
    // order_detail
    <>
        <div
          className="link link-success"
          onClick={() =>
            document.getElementById(`my_modal_${orderNo}`).showModal()
          }
        >รายละเอียด
        </div>
      <dialog id={`my_modal_${orderNo}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-center">บิลเลขที่ {orderNo}</h3>
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
          </div>
        </div>
      </dialog>
    </>
  );
}

export default BillCard;
