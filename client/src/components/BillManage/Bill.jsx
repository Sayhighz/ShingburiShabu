import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BillCard from './BillCard' // get billdetail from billcard

function Bill() {
  const [bill, bill_detail] = useState([]);
  // get bill data
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth//bill_detail")
      .then((result) => {
        if (result.data.Status) {
          bill_detail(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
    return (
      // header
      <div className="text-black container mx-auto">
      <h4 className='flex justify-center text-3xl font-bold text-center text-white p-10'>บิลทั้งหมด</h4>
      <div className="flex items-center overflow-x-auto">
        <table className="table table-zebra m-5">
          <thead className="text-white ">
            <tr>
              <th>เลขที่บิล</th>
              <th>โต๊ะ</th>
              <th>สถานะ</th>
              <th>วันที่ทำรายการ</th>
              <th>แคชเชียร์</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          {/* map all order */}
          <tbody className="text-white">
            {bill.map((b) => (
              <tr key={b.order_no}>
                <td>{b.order_no}</td>
                <td>{b.table_no}</td>
                <td>{b.status}</td>
                <td>{b.date}</td>
                <td>{b.create_by}</td>
                <td><div><BillCard orderNo={b.order_no}/></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    )
};

export default Bill