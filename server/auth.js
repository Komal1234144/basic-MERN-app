const jwt = require ('jsonwebtoken');
const userModel = require('./userModel');


async function auth(req , res , next){
   
    try{
    let token = req.header('Authorization')
    let id = jwt.verify(token , 'secretkey' );
    const user = await  userModel.findOne({_id : id});
    if(!user){
        throw new Error('Plese authenticate')
    }
  req.id = id;
  req.user = user
  next()
 }catch(e){
      res.send({status : e})
  }

}

module.exports = auth;