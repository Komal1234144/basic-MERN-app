import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Initial from './components/Initial';
import Expenses from './components/Expenses';

const App=()=>{
  return(
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Initial/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/expenses" element={<Expenses/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
