import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

function OrderCard(props) {
  const [cardColor, setCardColor] = useState("bg-green-500");
  const [tableNo] = useState(props.tableNo);
  const [orderkub, setOrder] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [orderNO, setOrderNo] = useState(0);
  const [oldOrderNo, setOldOrderNo] = useState(0);
  const navigate = useNavigate();
  const componentRef = useRef();
  const now = new Date();
  const thailandTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const formattedDate = thailandTime
    .toISOString()
    .replace("T", " ")
    .slice(0, -5);

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

  const isButtonDisabled =
    amountPaid === 0 || isNaN(amountPaid) || amountPaid < totalAmount;

  const handleClick2 = () => {
    if (isButtonDisabled) {
      if (amountPaid === 0 || isNaN(amountPaid)) {
        alert("Please enter the correct amount paid by the customer");
      }
      return;
    }
    handleCheckBill();
    const modal = document.getElementById(`my_modal_${tableNo}`);
    if (modal) {
      modal.showModal();
    }
  };

  axios
    .get("http://localhost:3000/auth/newOrderNo")
    .then((result) => {
      if (result.data.Status) {
        setOrderNo(result.data.orderNo);
      } else {
        alert(result.data.Error);
      }
    })
    .catch((err) => console.log(err));

  const oldOrderNoFun = () => {
    axios
      .get(`http://localhost:3000/auth/oldOrderNo?table_no=${tableNo}`)
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.order_no);
          setOldOrderNo(result.data.order_no);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    if (orderkub.length === 0) {
      navigate(`/visitor/ordermenu/${tableNo}/${orderNO + 1}`);
    } else {
      oldOrderNoFun();
      document.getElementById(`my_modal_${tableNo}`).showModal();
    }
  };

  const handleCheckBill = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/auth/ordering_update/`,
        {
          payment_date: formattedDate,
          order_status: "paymented",
          table_no: tableNo,
        }
      );

      if (response.data.Status) {
        alert("การชำระเงินเสร็จเรียบร้อยแล้ว");
        window.location.reload();
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการอัพเดทสถานะบิล");
    }
  };

  const PrintContent = React.forwardRef((props, ref) => (
    <div ref={ref}>
              <div className="text-center">
                <div>โต๊ะ: {tableNo}</div>
                <div>เลขที่บิล: {oldOrderNo}</div>
              </div>
      <table className="table table-zebra m-5 text-center">
        <thead className="bg-base-100">
          <tr>
            <th>รายการอาหาร</th>
            <th>จำนวน</th>
            <th>ราคา(ต่อชิ้น)</th>
            <th>ยอดรวม</th>
          </tr>
        </thead>
        <tbody>
          {orderkub.length > 0 ? (
            orderkub.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.food_amount}</td>
                <td>{item.price}</td>
                <td>
                  {item.price * item.food_amount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items ordered</td>
            </tr>
          )}
          {orderkub.length > 0 && (
            <>
              <tr>
                <td>ราคาทั้งหมด</td>
                <td></td>
                <td></td>
                <td>{totalAmount}</td>
                <td></td>
              </tr>
              <tr>
                <td>จ่าย</td>
                <td></td>
                <td></td>
                <td>{amountPaid}</td>
                <td></td>
              </tr>
              <tr>
                <td>เงินทอน</td>
                <td></td>
                <td></td>
                <td>{changeAmount}</td>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  ));

  return (
    <>
      <div
        className={`card w-60 shadow-xl ${cardColor} text-white m-10`}
        onClick={handleClick}
      >
        <div className="card-body items-center text-center btn btn-ghost">
          <h1 className="card-title">Table {tableNo}</h1>
        </div>
      </div>
      <dialog id={`my_modal_${tableNo}`} className="modal">
        <div className="modal-box">
          <form>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-center">โต๊ะ {tableNo}</h3>
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-outline btn-success m-2">
                พิมพ์ใบเสร็จ
              </button>
            )}
            content={() => componentRef.current}
          />
          <div className="grid content-center">
            <div>
              <div className="flex items-center overflow-y-auto">
                <PrintContent ref={componentRef} />
              </div>
            </div>
            <form className="">
              <div className="flex justify-center">
                <div className="join join-vertical">
                  <label htmlFor="">ราคาทั้งหมด (บาท)</label>
                  <input
                    type="text"
                    placeholder={totalAmount}
                    className="input input-bordered w-full max-w-xs m-2"
                    disabled
                  />
                  <input
                    type="number"
                    value={String(amountPaid)}
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
                  className={`btn btn-outline btn-success m-2 ${
                    isButtonDisabled ? "disabled" : ""
                  }`}
                  onClick={handleClick2}
                  disabled={isButtonDisabled}
                >
                  เช็คบิล
                </button>

                <Link to={`/visitor/ordermenu/${tableNo}/${oldOrderNo}`}>
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
