import React from "react";
import { useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';


const Register=()=>{
let[msg , setmsg] = useState();
let dispatch = useDispatch()
let navigate = useNavigate()

async function onRegister(e){
  e.preventDefault();
    const response = await fetch('http://localhost:3001/register', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : e.target.name.value,
            email : e.target.email.value,
            password : e.target.password.value
        })
    })
    const data = await response.json()
   
     if(data.status==='Ok'){
         setmsg('user created successfully')
     }else{
        return setmsg('Provide valid info. And email-id must be unique.')
     }
     setTimeout(()=>{
         setmsg('')
         localStorage.setItem('page' , 'Login');
        localStorage.setItem('token' , data.token)
        navigate('/expenses')
        // getToExpenses(token)
     }, 500)
     
    
 }
 
async function getToExpenses(token){
    let response = await fetch('http://localhost:3001/expenses', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : token
        },
        
    })

    let data = await response.json();
    if(data.status==='Ok'){
        navigate('/expenses');
    }else{
        navigate('/login')
    }
}

    return(
        <div>
         <h1>Register</h1>
         <form onSubmit={onRegister}>
         <input
          type='text'
          placeholder="Your name"
          name = 'name'
          autoFocus 
          required
          
         />
         <br/>
         <input
          type='text'
          placeholder="Your email"
          name='email'
          autoFocus 
          required
         
         />
         <br/>
         <input
          type='password'
          placeholder="password"
          name='password'
          autoFocus 
          required
         /> <br/>
         <button>Register</button>
         </form>

        {msg && msg}

        <h4>Already have an account? <NavLink to ='/login'>Log in</NavLink></h4>
        </div>
    )
}

export default Register;