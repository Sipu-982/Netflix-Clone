const mongoose = require('mongoose')

const AuthSchema= new mongoose.Schema({

 fullname:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 phone:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 },
 
 otp:{
    type:String
  },
  otpExpiry:{
    type:Date
  },
 profile:{
   type:String,
   required:true
 }
},
{timestamps:true})

const AuthModel = mongoose.model('AuthModel',AuthSchema)
module.exports=AuthModel;