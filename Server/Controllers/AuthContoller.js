const AuthModel =require('../Models/AuthModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const streamifier = require('streamifier')
const cloudinary = require('../Configs/Cloudinary')
const { sendEmail } = require('../Configs/NodeMailer')

const createUser = async (req,res)=>{
    try {
        const {fullname,email,phone,password}= req.body;
        if(!fullname || !email || !phone || !password){
            return res.status(400).json({message:"All fields are required!"})
        }
        const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if(!validatePassword.test(password)){
        return res.status(400).json({message:"Invalid password!"})

        }
        const hashPassword= await bcrypt.hash(password,10)
        const findUser = await AuthModel.findOne({email})
        if(findUser){
         return res.status(409).json({message:"User already exist!"})
        }
        const emailFormat=  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailFormat.test(email)){
            return res.status(400).json({message:"Invalid email address!"})
        }
        const phoneFormat= /^[0-9]{10}$/;
        if(!phoneFormat.test(phone)){
            return res.status(400).json({message:"Invalid Phone number!"})
        }
     
              if (!req.file) {
      return res.status(400).json({ message: "Profile is required!" });
    }
        console.log("File",req.file);
     const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: process.env.CLOUDINARY_PROFILE_FOLDER},
        (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });
    const userRegister= new AuthModel({fullname,email,phone,password:hashPassword,profile:result.secure_url})
    await userRegister.save()
        sendEmail(email,"Netflix India",`Hii,${fullname} <br> Welcome to Netflix India. Thank you for registered with us.We are heartly appreciating your interest. Let's explore the india's  trending entertainment TV shows online and watch movies online`)
  return res.status(201).json({message:"User registered successfully!",data:userRegister})

   } catch (error) {
     console.error(error);
    return res.status(500).json({ error: "Account registration failed!" });

    }
}


const SendOtp= async(req,res)=>{

    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const {email}= req.body
        if(!email){
              if (!email) return res.status(400).json({ message: "Email is required!" });  
        }
        const findUser= await AuthModel.findOne({email})
        if(!findUser){
            return res.status(404).json({ message: "User not found!" });
        }
        const otpGenerate= generateOTP();
        const expiry= new Date(Date.now()+10*60*1000)
        findUser.otp=otpGenerate,
        findUser.otpExpiry=expiry
        await findUser.save()

        const html=`
        <h3>Hello, ${findUser.fullname},</h3>
         <p>Your OTP for login is:</p>
      <h1 style="color: #0d6efd">${otpGenerate}</h1>
      <p>This OTP will expire in 10 minutes.</p>
        `;
        await sendEmail(findUser.email,"NETFLIX India",`Welcome To world's most popular entertainment TV Show.Hello [${findUser.fullname}]<br> Your verify OTP is:${otpGenerate}`,html)
            return res.status(200).json({ message: "OTP sent to registered email successfully"});

    } catch (error) {
            console.error(error);
    return res.status(500).json({ error: "OTP request failed!" });
  
    }
}

const verifyOTP = async (req, res) => {
  try {
    const {email,otp } = req.body

    if (!otp) {
      return res.status(400).json({ message: "OTP is required!" });
    }

    const user = await AuthModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.secret_key,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ message: "Login successful!", token, Data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "OTP verification failed!" });
  }
};

const loginUser = async (req,res)=>{
    try {
        const {email,password}= req.body;
      if(!email || !password){
        return res.status(400).json({message:"All fields are required!"})
      }
        const findUser=await AuthModel.findOne({email})
        if(!findUser){
           return res.status(404).json({message:"User not found!"})
        }
        const isCompare = await bcrypt.compare(password,findUser.password)
        if(!isCompare){
            return res.status(409).json({message:"Password doesn't matched!"})
        }
        const token= jwt.sign({id:findUser._id,email:findUser.email},process.env.secret_key,{expiresIn:'1d'})
        return res.status(201).json({message:"User sign in successfully!",token,data:findUser})
    } catch (error) {
            console.error(error);
    return res.status(500).json({error: "User sign in failed!",error: error.message});
 
    }
}

module.exports={createUser,loginUser,SendOtp,verifyOTP}
