const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    
    year:{
        type:Number,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    poster: {
    type: String,
    required: true
  },
  banner: {
    type: String,
    required: true
  },
  category:{
   type:String,
   enum:["Movies","Series","Sports"],
   required:true
  },
  description:{
        type:String,
        required:true
    },
  createdAt:{
    type:Date,
    default:Date.now
  }
},{timestamps:true})

const uploadModel= mongoose.model('UploadModel',uploadSchema)
module.exports=uploadModel;