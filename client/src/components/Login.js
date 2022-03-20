import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const Login=()=>{
let [msg , setMsg] = useState('')
let navigate = useNavigate();

async function onLogin(e){
    e.preventDefault();
   const response = await fetch('http://localhost:3001/login', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : e.target.email.value,
        password : e.target.password.value
      })
    })

    const data = await response.json();
    if(data.status === 'Ok'){
      setMsg('Successfully logged in');
    }else{
      return setMsg(data.status)
    }
    setTimeout(()=>{
      setMsg(''); 
      navigate('/expenses')
    },1000)
}

    return(
  <div>
  <h1>Login</h1>
  <form onSubmit={onLogin}>
  <input
   type='text'
   placeholder="Your email"
   name = 'email'
   autoFocus 
   required
   autoComplete="off"
  />
  <br/>
  <input
   type='password'
   placeholder="password"
   name = 'password'
   autoFocus 
   required
  /> <br/>
  <button>login</button>
  </form>  
        
  {msg && msg}   
  <h4>Do not have an account ? <NavLink to="/register">Register</NavLink></h4>  
 </div>
    )
}
export default Login;