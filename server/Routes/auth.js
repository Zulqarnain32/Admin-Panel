const express = require('express')
const router = express.Router()
const UserModel = require('../Model/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
// router.use(cookieParser())

//register the user
router.post('/register', async (req,res) => {
   const { name,email,password } = req.body;

   if(!name || !email || !password){
    return res.json({message:"please fill all fields"})
   }

   const user = await UserModel.findOne({email})
   if(user){
      return res.json({message:"email already exist"})
   }
   const hashPassword = await bcrypt.hash(password,10)
   const newuser = new UserModel({name,email,password:hashPassword})
   await newuser.save();
   return res.json({message:"registered"})

})

//login the user
router.post('/login', async (req,res) => {
    const { email,password } = req.body;
 
    if( !email || !password){
     return res.json({message:"please fill all fields"})
    }
 
    const user = await UserModel.findOne({email})
    if(!user){
       return res.json({message:"invalid email"})
    }
     
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.json({message:"incorrect password"})
    }
    const token = jwt.sign({id:user._id, role:user.role}, "Secret Key")
    res.cookie('token',token)
      
    return res.json({message:"logined",id:user._id, role:user.role})
 
 })


 
//? admin panel 
  
//Dashboard
const verifyUser = (req,res,next) => {
   const token = req.cookies.token;
   if(!token){
      console.log("token is mising");
      return res.json("token is missing")
   } else {
      jwt.verify(token,"Secret Key", (err,decoded) => {
       if(err){
         console.log("token error");

         return res.json("error with token")
       } else{
           if(decoded.role == "admin"){
            console.log("this is admin");

               next();
           } else {
            console.log("you not admin");
               return res.json("not admin")
           }
       }
      })
       
   }
 }
 
 router.get('/dashboard', verifyUser, (req,res) => {
   res.json("succeed")
 })

 router.get('/logout', async (req,res) => {
    res.clearCookie('token')
    return res.json({message:"logout"})
 })

module.exports = router