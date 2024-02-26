import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// employee page
function Employee() {
  const [employee1, setEmployee1] = useState([]);
  // get data from db
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee1(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // function delete employee
  const handleDelete = (id) => {
    Swal.fire({
      title: "คุณต้องการลบข้อมูลใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบ!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:3000/auth/delete_employee/" + id)
          .then((result) => {
            if (result.data.Status) {
              Swal.fire("ลบข้อมูลเรียบร้อย!", "", "Success");
              window.location.reload();
            } else {
              Swal.fire("เกิดข้อผิดพลาด!", result.data.Error, "error");
            }
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
          });
      }
    });
  };
  return (
    // header
    <div className="px-5 mt-5 text-black container mx-auto">
      <div className="d-flex justify-content-center">
        <h4 className="text-3xl font-bold text-center text-white p-10">
          จัดการพนักงาน
        </h4>
      </div>
      {/* content */}
      <div className="flex items-center overflow-x-auto">
        <table className="table table-zebra m-5">
          <thead className="text-white ">
            <tr>
              <th>Email:</th>
              <th>Role:</th>
              <th>Action:</th>
            </tr>
          </thead>
          {/* map data in db */}
          <tbody className="text-white">
            {employee1.map((e) => (
              <tr key={e.id}>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e.id}`}
                    className="btn btn-outline btn-warning m-3"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline btn-error m-3"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* to add employee page */}
      <div className="flex justify-center">
        <Link
          className="btn btn-outline btn-success text-1xl mt-20"
          to={"/dashboard/add_employee"}
        >
          เพิ่มพนักงาน
        </Link>
      </div>
    </div>
  );
}

export default Employee;
