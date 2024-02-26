import axios from "axios";
import React, { useEffect, useState } from "react";
import AnnualSales from "./chart/AnnualSales";
import Monthlysales from "./chart/MonthlySales";
import PoppularMenu from "./chart/PoppularMenu";
import { Link } from "react-router-dom";
import {
  IdentificationIcon,
  NewspaperIcon,
  ClipboardIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";

function Dashboard() {
  const [adminTotal, setAdminTotal] = useState(0);
  const [menutotal, setMenuTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    adminCount();
    menucount();
    incomeCount();
    orderCount();
  }, []);
  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      if (result.data.Status) setAdminTotal(result.data.Result[0].admin);
    });
  };
  const menucount = () => {
    axios.get("http://localhost:3000/auth/menu_count").then((result) => {
      if (result.data.Status) setMenuTotal(result.data.Result[0].menu);
    });
  };
  const incomeCount = () => {
    axios.get("http://localhost:3000/auth/income_count").then((result) => {
      if (result.data.Status) setIncomeTotal(result.data.Result[0].total_revenue);
    });
  };
  const orderCount = () => {
    axios.get("http://localhost:3000/auth/order_count").then((result) => {
      if (result.data.Status) setOrderTotal(result.data.Result[0].total_orders);
    });
  };
  return (
    <>
      <div className="md:container md:mx-auto">
        <h4 className="flex justify-center text-3xl font-bold text-center text-white p-10">
          ShingburiShabu Dashboard
        </h4>
        <div className="flex justify-center">
          <div className="bg-gray-100 w-full p-10 m-3">
            <h2 className="text-2xl text-black mb-5">สรุปยอดขายรายปี</h2>
            <AnnualSales />
          </div>
          <div className="bg-gray-100 w-full p-10 m-3">
            <h2 className="text-2xl text-black mb-5">สรุปยอดขายรายเดือน</h2>
            <Monthlysales years="2024" />
          </div>
        </div>
        <div className="flex justify-normal">
          <div className="bg-gray-100 w-2/5 p-10 m-3">
            <h2 className="text-2xl text-black mb-5">เมนูยอดนิยม</h2>
            <PoppularMenu />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 bg-gray-100 w-full m-3 text-primary-content">
            <div className="stat place-items-center">
              <div className="stat-title text-primary-content">
                จำนวนพนักงาน
              </div>
              <IdentificationIcon width={100} className="text-gray-500" />
              <div className="stat-value">{adminTotal} บัญชี</div>
              <div className="stat-desc text-primary-content">
                <Link to="/dashboard/employee">จัดการบัญชี</Link>
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title text-primary-content">
                จำนวนเมนูอาหาร
              </div>
              <ClipboardIcon width={100} className="text-gray-500" />
              <div className="stat-value">{menutotal} เมนู</div>
              <div className="stat-desc text-primary-content">
                <Link to="/dashboard/menu">จัดการเมนู</Link>
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title text-primary-content">จำนวนบิล</div>
              <NewspaperIcon width={100} className="text-gray-500" />
              <div className="stat-value">{orderTotal} บิล</div>
              <div className="stat-desc text-primary-content">
                <Link to="/dashboard/menu">จัดการบิล</Link>
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title text-primary-content">รายได้</div>
              <CurrencyDollarIcon width={100} className="text-gray-500" />
              <div className="stat-value">{incomeTotal}฿</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
