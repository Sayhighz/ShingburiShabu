import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HomeModernIcon,
  ChartPieIcon,
  ClipboardDocumentIcon,
  UsersIcon,
  EnvelopeIcon,
  PowerIcon,
} from "@heroicons/react/20/solid";

const Dashboard = () => {
  const menu1 = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HomeModernIcon width={18} className="text-gray-600" />,
      isActive: true,
    },
    {
      name: "Analytics",
      path: "/dashboard/category",
      icon: <ChartPieIcon width={18} className="text-gray-600" />,
    },
  ];

  const menu2 = [
    {
      name: "Menu",
      path: "/dashboard/menu",
      icon: <ClipboardDocumentIcon width={18} className="text-gray-600" />,
    },
    {
      name: "Booking",
      path: "/dashboard/booking",
      icon: <EnvelopeIcon width={18} className="text-gray-600" />,
    },
    {
      name: "Account",
      path: "/dashboard/employee",
      icon: <UsersIcon width={18} className="text-gray-600" />,
    },
  ];

  const anvigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        anvigate("/adminlogin");
      }
    });
  };

  return (
    <>
      <div className="flex h-sceen font-kanit overflow-auto scrollbar-hide">
        <section className="w-28 sm:w-64 bg-slate-100 h-screen">
          <div className="border-b p-5 text-center sm:text-center">
            <span className="hidden sm:block">SHABU ADMIN</span>
            <span className="sm:hidden">SPU</span>
          </div>
          <div className="border-b text-sm">
            <h6 className="mt-3 text-[10px] sm:text-sm text-center sm:text-left sm:px-5 ">
              <span className="sm:hidden">BUSINESS</span>
              <span className="hidden sm:block">BUSINESS</span>
            </h6>
            <ul className="menu rounded-box">
              <li className="py-2 grid cursor-pointer mx-5 place-items-left">
                <Link className="text-gray-700" to="/dashboard">
                  <div className="flex">
                    <HomeModernIcon width={18} className="text-gray-600 mr-3" />
                    <div className="text-gray-700 hidden sm:block hidden sm:block">
                      Dashboard
                    </div>
                  </div>
                </Link>
              </li>
              <li className="py-2 flex cursor-pointer mx-5">
                <Link className="text-gray-700" to="/dashboard/category">
                  <div className="flex">
                    <ChartPieIcon width={18} className="text-gray-600 mr-3" />
                    <div className="text-gray-700 hidden sm:block hidden sm:block">
                      Analysis
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="border-b text-sm">
            <h6 className="mt-3 text-[10px] sm:text-sm text-center sm:text-left sm:px-5 ">
              <span className="sm:hidden">MANAGE</span>
              <span className="hidden sm:block">MANAGEMENT</span>
            </h6>
            <ul className="menu">
              <li className="py-2 flex cursor-pointer mx-5">
                <Link className="text-gray-700" to="/dashboard/menu">
                  <div className="flex">
                    <ClipboardDocumentIcon
                      width={18}
                      className="text-gray-600 mr-3"
                    />
                    <div className="text-gray-700 hidden sm:block hidden sm:block">
                      Menu
                    </div>
                  </div>
                </Link>
              </li>
              <li className="py-2 flex cursor-pointer mx-5">
                <Link className="text-gray-700" to="/dashboard/booking">
                  <div className="flex">
                    <EnvelopeIcon width={18} className="text-gray-600 mr-3" />
                    <div className="text-gray-700 hidden sm:block hidden sm:block">
                      Booking
                    </div>
                  </div>
                </Link>
              </li>
              <li className="py-2 flex cursor-pointer mx-5 mr-5">
                <Link className="text-gray-700 flex" to="/dashboard/employee">
                  <div className="flex">
                    <UsersIcon width={18} className="text-gray-600 mr-3" />
                    <div className="text-gray-700 hidden sm:block hidden sm:block">
                      Account
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="border-b text-sm">
            <ul>
              <li
                onClick={handleLogout}
                className="py-2 flex cursor-pointer mx-5"
              >
                <div className="py-2 flex text-gray-600 ml-3">
                  <Link to="/dashboard">
                    <div className="flex btn btn-ghost">
                      <PowerIcon width={18} className="text-gray-600" />
                      <div className="text-gray-700 hidden sm:block hidden sm:block">
                        Log out
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <div className="flex-grow bg-neutral mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
