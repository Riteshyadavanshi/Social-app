
 const User=require('../schema/user');

 const route=require('express').Router();
 const bcrypt=require('bcrypt')
  const jwt=require('jsonwebtoken')

 route.post('/user',async(req,res)=>{
  
     

    //   const Isavail= await User.findOne({email:email})

    //   if(Isavail){
    //     return res.status(400).json({
    //         massage:"user is already exist"
    //     })
    //   }
        const password="ritesh"
        const name="ritesh"
        const email="ritesh@gmail.com"

      const hashpassword= await bcrypt.hash(password,10 )
    
      try{
      const Newuser= await new User({
        hashpassword,name,email
      })
      const newdata=await Newuser.save()
      res.status(200).json(newdata)
    }catch(err){
        res.status(400).json(
            err
       )
    }
    

 })
 route.post('/login',async(req,res)=>{

   const{email,password}=req.body
    if(!email||!password){

       return  res.status(400).json({
            massage:"please write all details"
        })
    }
   try{
    const isthere= await User.findOne({email})
     
    if(!isthere){
            return res.status(400).json({
                massage:"user does not exist"
            })
    }
    const confirmation=await bcrypt.compare(password,isthere.hashpassword)
 
    if(!confirmation){

      return res.status(401).json({
        auth:false,massage:"email or passsword not matching"
      })
    }
   
    
    const token =await jwt.sign("ritesh","hththt")

  console.log(token)
    res.status(200).json({
        massage:"successfully login",auth:true,
        token
    })
   }catch(err){
    res.status(400).json(err)
   }
 })

 module.exports=route