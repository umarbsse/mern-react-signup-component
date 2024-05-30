import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

export default function Signup(props) {
  const host = "http://localhost:5000"
  const [credentials, seCredentials] = useState({name: "",email: "",password:"",cpassword:""})
  let navigate  = useNavigate ();
  const handleSubmit = async (e) =>{
      e.preventDefault();
      const {name, email, password} = credentials;
     // console.log("form submit")


      //API CALL
      const response = await fetch(`${host}/api/auth/createuser/`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email, password}), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      //console.log(json)
      if(json.success===true){
          // Save the auth token and redirect
          localStorage.setItem('token',json.authToken);
          navigate("/");
          props.showAlert("Account created successfully","success")

      }else{
          props.showAlert("Invalid Credentials","danger")
      }
  }
  const onChange = (e) =>{
      seCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className='mt-2'>
      <h2 className='my-2'>Create an account to use iNoteBook</h2>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}