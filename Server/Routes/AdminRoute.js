const express = require('express')
const { adminLogin } = require('../Controllers/AdminLogin')
const router = express.Router()

router.post('/admin-login',adminLogin)

module.exports= router