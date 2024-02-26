import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// addmenu
// input name, price, type, image
function Addmenu() {
  const [menukub, setMenukub] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", menukub.name);
    formData.append("price", menukub.price);
    formData.append("type", menukub.type);
    formData.append("image", menukub.image);

    //method post data to db
    axios
      .post("http://localhost:3000/auth/add_menu", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/menu");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* header */}
      <h4 className="text-3xl font-bold text-center text-white p-10">
        เพิ่มเมนู
      </h4>
      {/* content */}
      <div className="flex justify-center items-center">
        <div className="p-3 w-35 h-50 text-white">
          <form className="join join-vertical" onSubmit={handleSubmit}>
            <label htmlFor="inputName" className="form-label p-3">
              ชื่อเมนู
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              id="inputName"
              autoComplete="off"
              onChange={(e) => setMenukub({ ...menukub, name: e.target.value })}
            />
            <label htmlFor="inputPrice" className="form-label p-3">
              ราคา
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              id="inputPrice"
              autoComplete="off"
              onChange={(e) =>
                setMenukub({ ...menukub, price: e.target.value })
              }
            />

            <label htmlFor="inputType" className="form-label p-3">
              ประเภท
            </label>

            <select
              required
              className="select select-bordered w-full max-w-xs"
              type="text"
              id="inputType"
              onChange={(e) => setMenukub({ ...menukub, type: e.target.value })}
            >
              <option></option>
              <option>ของหวาน</option>
              <option>ของคาว</option>
            </select>

            <div className="col-12 mb-3 pt-5">
              <label className="form-label" htmlFor="inputGroupFile01"></label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                name="image"
                onChange={(e) =>
                  setMenukub({ ...menukub, image: e.target.files[0] })
                }
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-outline btn-accent">
                เพิ่มเมนู
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addmenu;
