const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userModel = require('./userModel');
const app = express();
const port = process.env.port || 3001
const auth = require('./auth');
const e = require('express');
const { findByIdAndRemove } = require('./userModel');
app.use(cors())
app.use(express.json());

mongoose.connect('mongodb+srv://Komal:spCQcGPodDUkz6W0@cluster0.eckbo.mongodb.net/MERN-app?retryWrites=true&w=majority' , {
    useNewUrlParser : true
})

app.post('/register' , async (req, res)=>{
      
    try{   await userModel.init ()
          const user = await new userModel({
            name : req.body.name,
            email: req.body.email,
            password : req.body.password})
       await  user.save();
       const token = await user.generateAuthToken()
        res.send({status : 'Ok' , token : token })
    }catch(err){
        res.send(err)
    }
     
})

app.post('/login', async(req,res)=>{
   
    try{
       let user = await userModel.findByCredentials(req.body.email , req.body.password);
     // let token = await user.generateAuthToken()
        res.send({status:'Ok'})
    }catch(err){
        res.send({status : 'unable to login'})
    }
})

app.get('/expenses' , auth ,  async(req, res)=>{
   
   try{ 
         res.send({status : 'Ok' , expenses : req.user.expenses})
   }catch(err){
       
       res.send(err)
   }
})

app.post('/expenses' , auth , async(req, res )=>{
   try{ 
      let user = req.user
    user.expenses =  user.expenses.concat({expenseName : req.body.expense})
     
     await user.save()

     res.send({status : 'Ok' , expenses : user.expenses})
    }catch(err){
        console.log(err);
        res.send({status : err})
    }
})

app.delete('/expenses' ,auth , async(req , res)=>{
  try{
      let user = req.user
      let expenses = user.expenses.filter((expense)=>{
          return expense.id !== req.body.id 
      }) 
    
     user.expenses =expenses
    
     await user.save();
   
      res.send({status : 'Ok' , expenses : expenses})
    }catch(err){
        console.log(err);
        res.send({status : err})
    } 
}) 
 
app.put('/expenses', auth , async(req,res)=>{
    try{
       let user = req.user;
       let expenses = user.expenses.map((expense)=>{
           if(expense.id === req.body.id){
               return expense.expenseName = req.body.expenseName
           }
       })
      // console.log(user.expenses)
       //console.log(user)
       await user.save();
       
       res.send({status : 'Ok' , expenses : user.expenses})
    }catch(err){
         console.log(err)
       // res.send({status : err})
    }
})

app.listen(port , ()=>{
    console.log("server.is up!")
})