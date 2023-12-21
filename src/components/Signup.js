import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setcredentials] = useState({name: " ",  email: " ", password: " ", cpassword:" "})
  const navigate = useNavigate();
  const host = "http://localhost:5500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name , email , password ,cpassword} = credentials;
    const response = await fetch('http://localhost:5500/api/auth/createuser', {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'


      },

      body: JSON.stringify({name ,email , password}),

    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/")
    } else {
      alert("Invalid Credentials")
    }

  }

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: [e.target.value] })

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="emailHelp" placeholder="Enter Name" />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"  name="email" onChange={onchange} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" onChange={onchange}   name="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onchange} name="cpassword" placeholder="Confirm Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )

}