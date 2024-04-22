import React, { useEffect, useState } from "react";
import axios from "axios";
import BillCard from "./BillCard";

function Bill() {
  const [bill, setBill] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("order_no");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/bill_detail")
      .then((result) => {
        if (result.data.Status) {
          setBill(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const results = bill.filter((b) =>
      b[searchType].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [bill, searchTerm, searchType]);

  return (
    <div className="text-black container mx-auto">
      <h4 className="flex justify-center text-3xl font-bold text-center text-white p-10">
        บิลทั้งหมด
      </h4>
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="ค้นหา..."
          className="input input-bordered w-full max-w-xs text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
        className="select select-bordered w-30 max-w-xs text-white"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="order_no">เลขที่บิล</option>
          <option value="table_no">โต๊ะ</option>
          <option value="date">วันที่ทำรายการ</option>
          <option value="create_by">แคชเชียร์</option>
        </select>
      </div>
      <div className="flex items-center overflow-x-auto">
        <table className="table table-zebra m-5">
          <thead className="text-white">
            <tr>
              <th>เลขที่บิล</th>
              <th>โต๊ะ</th>
              <th>สถานะ</th>
              <th>วันที่ทำรายการ</th>
              <th>แคชเชียร์</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {searchResults.map((b) => (
              <tr key={b.order_no}>
                <td>{b.order_no}</td>
                <td>{b.table_no}</td>
                <td>{b.order_status}</td>
                <td>{b.date}</td>
                <td>{b.create_by}</td>
                <td>
                  <div>
                    <BillCard orderNo={b.order_no} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bill;
