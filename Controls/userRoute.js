const express=require("express")
const userRouter=express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {userModel}=require("../Models/userModel")



userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    const user=await userModel.findOne({email})
    if(user){
        res.status(400).json({msg:"Already Registered"})
    }else{
        try{
            bcrypt.hash(password, 5, async(err, hash)=> {
              if(hash){
                const data=new userModel({name,email,gender,password:hash})
                await data.save()
                res.status(200).json({"msg":"REGISTERED SUCCESSFULLY"})
              }else{
                res.status(400).json({"msg":err})
              }
            });
        

        }catch(err){
            res.status(400).json({"msg":"Something going Wrong"})
        }
    }
})

userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body
const data=await userModel.findOne({email})
if(data){
    try{
        bcrypt.compare(password, data.password, async(err, result)=> {
         if(result){
            var token = jwt.sign({authorId:data._id }, 'masai');
            res.status(200).json({"msg":"login Successfully","token":token})
         }else{
            res.status(400).json({"msg":err})
         }
        });
    }catch(err){
        res.status(400).send({"msg":err})
    }
}else{
    res.status(400).send({"msg":"Wrong Credentials"})
}




})
module.exports={userRouter}