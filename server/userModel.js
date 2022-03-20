const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        
        trim : true
    },
    email : {
        type : String,
        required : true,
        index : true,
        trim : true,
        unique : true,
        validate(value){
           if(!validator.isEmail(value)){
               throw new Error('email is invalid')
           }
        }
    },
    password : {
        type : String,
        required : true,
       
        trim : true,
    },
    expenses : [{
        expenseName : {
            type : String
        }
    }],
    tokens : [{
        token : {
            type : String,
            
        }
    }]
})

userSchema.methods.generateAuthToken= async function(){
   const user = this;
   const token = await jwt.sign({_id : user._id.toString()} , 'secretkey' )   
   user.tokens = user.tokens.concat({token});
   await user.save()
   return token;
}

userSchema.statics.findByCredentials = async(email, password)=>{
   const user = await userModel.findOne({email});
   if(!user){
       throw new Error('unable to login')
   }
      const isMatch = await bcrypt.compare(password , user.password)
      if(!isMatch){
         throw new Error('unable to login')
      }
   return user;
}

userSchema.pre('save' , async function(next){
    const user = this ;
    if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password , 8);
   }
     next();
})

const userModel = mongoose.model('users' , userSchema );

module.exports = userModel;