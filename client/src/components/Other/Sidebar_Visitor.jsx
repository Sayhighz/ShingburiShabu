import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HomeModernIcon,
  Bars4Icon,
  ClipboardDocumentIcon,
  UsersIcon,
  EnvelopeIcon,
  PowerIcon,
} from "@heroicons/react/20/solid";

const Sidebar_Visitor = () => {
  const anvigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [emailVisitor , setemailVisitor] = useState(""); 

  useEffect(() => {
    // ดึงอีเมลจาก localStorage เมื่อคอมโพเนนต์โหลด
    const email = localStorage.getItem("validVisitor");
    setemailVisitor(email); // อัปเดต state สำหรับอีเมล
  }, []);

  // logout
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("validVisitor")
        localStorage.removeItem("visitorId")
        anvigate("/");
      }
    });
  };

  return (
    <>
    {/* sidebar */}
      <div className="drawer font-kanit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
        <div className="flex-grow bg-base mx-auto">
          <label htmlFor="my-drawer" className="btn btn-circle btn-outline m-3 sticky top-3">
          <Bars4Icon width={18} className="text-white" />
          </label>
          <Outlet />
        </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="py-2 grid cursor-pointer mx-5 place-items-left">
              <Link className="text-gray-700" to="/Visitor">
                <div className="flex">
                  <HomeModernIcon width={50} className="text-white mr-3" />
                  <div className="text-white">สวัสดีคุณ <br />{emailVisitor}</div>
                </div>
              </Link>
            </li>
            <li className="py-2 grid cursor-pointer mx-5 place-items-left">
              <Link className="text-gray-700" to="/Visitor">
                <div className="flex">
                  <HomeModernIcon width={18} className="text-white mr-3" />
                  <div className="text-white">Table Manage</div>
                </div>
              </Link>
            </li>
            {/* <li className="py-2 flex cursor-pointer mx-5">
              <Link className="text-gray-700" to="/dashboard/menu">
                <div className="flex">
                  <ClipboardDocumentIcon
                    width={18}
                    className="text-white mr-3"
                  />
                  <div className="text-white">Menu</div>
                </div>
              </Link>
            </li>
            <li className="py-2 flex cursor-pointer mx-5">
              <Link className="text-gray-700" to="/dashboard/bill">
                <div className="flex">
                  <EnvelopeIcon width={18} className="text-white mr-3" />
                  <div className="text-white">Order</div>
                </div>
              </Link>
            </li>
            <li className="py-2 flex cursor-pointer mx-5 mr-5">
              <Link className="text-gray-700 flex" to="/dashboard/employee">
                <div className="flex">
                  <UsersIcon width={18} className="text-white mr-3" />
                  <div className="text-white">Account</div>
                </div>
              </Link>
            </li> */}
            <li
              onClick={handleLogout}
              className="py-2 flex cursor-pointer mx-5 mr-5"
            >
              <div className="flex text-white">
                <div className="flex">
                  <PowerIcon width={18} className="text-white mr-3" />
                  <div className="text-white">Logout</div>
                </div>
              </div>
            </li> 
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar_Visitor;
