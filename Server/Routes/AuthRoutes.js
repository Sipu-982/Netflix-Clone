const express=require('express')
const router = express.Router()
const multer = require('multer')
const { createUser, loginUser, SendOtp, verifyOTP } = require('../Controllers/AuthContoller')
const storage= multer.memoryStorage()
const upload= multer({storage})

router.post('/register',upload.single('profile'),createUser);
router.post('/login',loginUser)
router.post('/sendOtp',SendOtp)
router.post('/verifyOtp',verifyOTP)

module.exports=router;