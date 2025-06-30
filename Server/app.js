const express= require('express')
const cors= require('cors')
const dotenv = require('dotenv')
const connectDB= require('./Configs/MongoDB')
const app= express()
const AuthRoutes= require('./Routes/AuthRoutes')
const uploadRoutes= require('./Routes/UploadRoute')
const adminRoute= require('./Routes/AdminRoute')
dotenv.config()
app.use(express.json())
app.use(cors())
connectDB();

const PORT = process.env.PORT || 4000
app.use('/api/auth',AuthRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/admin',adminRoute)
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    
})