import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Initial=()=>{
 let navigate = useNavigate()

 useEffect(()=>{
  let p = localStorage.getItem('page')
  if(p && p === 'Login'){
      navigate('/login')
  }else{
     navigate('/register')
  }
  
 },[])
  

return(
  <div>
  
  </div>
   )
}

export default Initial;