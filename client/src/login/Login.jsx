import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus){
                navigate('/dashborad')
            }else{
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }


  return (
    <div className='form-container'>
        <div className='card-form'>
            <form action="" onSubmit={handleSubmit}>
                <div className='head-form'>
                    <h2>Login System</h2>
                </div>
                <div className='input-field'>
                    <label htmlFor="email">Email: </label>
                    <input className="inputja" type="email" name='email' 
                    onChange={(e) => setValues({...values, email : e.target.value})} autoComplete='off' placeholder='Enter Email'/><i className='bx bx-user'></i>
                </div>
                <div className='input-field'>
                    <label htmlFor="password">Password: </label>
                    <input className="inputja" type="password" name='password' autoComplete='off' 
                     onChange={(e) => setValues({...values, password : e.target.value})} placeholder='Enter Password'/><i className='bx bxs-lock'></i>
                </div>
                <button className='input-button mb-2'>Login</button>
                <div className='checklog mb-1'>
                    <input type="checkbox" name="tick" id="tick" className='me-1'/>
                    <label htmlFor="password">Agree with me</label>
                </div>
                <div className="errorwarning">
                    {error && error}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login