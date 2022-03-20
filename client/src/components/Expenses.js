import React, { useEffect, useState }  from "react";
import { addExpense } from "../Slices/pageSlice";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
const  Expenses=()=>{
let navigate = useNavigate();
let dispatch = useDispatch();
let [value , setValue] = useState()
let [button , setButton] = useState('Add')
let [id , setId] = useState('')
useEffect(()=>{
  let token = localStorage.getItem('token')
   getToExpenses(token)
}, [])

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
    dispatch(addExpense(data.expenses))
      navigate('/expenses');
  }else{
      navigate('/login')
  }
}

const onInputChange=(e)=>{
  setValue(e.target.value)
}

async function onSubmit(e){
     e.preventDefault();
     
     let token = localStorage.getItem('token')
    if(button === 'Add'){
     const response = await fetch('http://localhost:3001/expenses',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : token
        },
        body : JSON.stringify({
          expense : e.target.expense.value
        })
      })
     const data = await response.json();
     
     if(data.status === 'Ok'){
         dispatch(addExpense(data.expenses))
     }
    setValue('') }
 ///////////////////////////////////////////////////////////////////////////////
    else{
      const response = await fetch('http://localhost:3001/expenses', {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : token
        },
        body : JSON.stringify({
             id :id,
             expenseName : value
        })
      })
  
      const data = await response.json();
      console.log(data);
      dispatch(addExpense(data.expenses))
      setValue('')
      setButton('Add')
    }
 }

 async function deleteExpense(e){
   let id = e.target.parentElement.previousSibling.id
   let token = localStorage.getItem('token')
   const response = await fetch('http://localhost:3001/expenses',{
     method : 'DELETE',
     headers : {
          'Content-Type' : 'application/json',
          'Authorization' : token
     },
     body : JSON.stringify({
       id : id,
     
     })
   })
   const data = await response.json()
   if(data.status === 'Ok'){
     dispatch(addExpense(data.expenses))
   }
 }
 const editBtn=(e)=>{
  setValue(e.target.parentElement.previousSibling.innerText);
  setButton('Edit')
  console.log(e.target.parentElement.previousSibling.id)
  setId(e.target.parentElement.previousSibling.id)

 }
//  async function onEdit(e){
//    setValue(e.target.parentElement.previousSibling.innerText);
//    let token = localStorage.getItem('token');
//     const response = await fetch('http://localhost:3001/expenses', {
//       method : 'PUT',
//       headers : {
//         'Content-Type' : 'application/json',
//         'Authorization' : token
//       },
//       body : JSON.stringify({
//            id :e.target.parentElement.previousSibling.id,
//            expenseName : e.target.parentElement.previousSibling.innerText
//       })
//     })

//     const data = response.json();
//     console.log(data);
//  }

 let expenses = useSelector((state)=> state)


    return(
        <div>
          <h1>Expenses</h1>
          <form onSubmit={onSubmit}>
            <input
            type='text'
            value = {value}
            placeholder="Add an expense"
            name = 'expense'
            autoFocus
            autoComplete="off"
            onChange={onInputChange}
            />
            <button>{button}</button>
          </form>

             <h1>Expenses</h1>
             {expenses && expenses.map((expense , index)=>{
               return (<div key = {index}>
               <h4 id={expense._id}>{expense.expenseName}</h4>
               <div>
               <button onClick={editBtn}>Edit</button>
               <button onClick={deleteExpense}>delete</button>
               </div>
               </div>)
             })}
          </div>
      
    )
}

export default Expenses;