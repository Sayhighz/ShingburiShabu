import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// login func
//check role
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          // Assuming your JWT token has a 'role' claim
          const role = result.data.role;
          const email = result.data.email; // Added line to retrieve email from response
          if (role === "admin") {
            localStorage.setItem("validAdmin", email); // Store email in localStorage
            navigate("/dashboard");
          } else if (role === "visitor") {
            localStorage.setItem("validVisitor", email); // Store email in localStorage
            navigate("/visitor");
          } else {
            navigate("/");
            alert("You don't have permission");
          }
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center m-60">
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-left text-left shadow-xl">
            {/* form */}
          <form action="" onSubmit={handleSubmit}>
            <div className="card-title m-5 flex justify-center m-5">
              <h2>SHABU LOGIN</h2>
            </div>
            <div className="input-field m-5">
              <label htmlFor="email">Email: </label>
              <input
                className="input input-bordered w-full max-w-xs"
                type="email"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                autoComplete="off"
                placeholder="Enter Email"
              />
            </div>
            <div className="input-field m-5">
              <label htmlFor="password">Password: </label>
              <input
                className="input input-bordered w-full max-w-xs"
                type="password"
                name="password"
                autoComplete="off"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                placeholder="Enter Password"
              />
            </div>
            <div className="flex justify-center m-5">
              <button className="btn btn-outline btn-accent">Login</button>
            </div>
            <div className="errorwarning">{error && error}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
