const bcrypt = require('bcrypt')

const encryptPassword = async()=>{
    try {
        const AdminPswd= await bcrypt.hash("AdminNetFlix2025",10)
        console.log("Encrypted password:",AdminPswd);
        
    } catch (error) {
        console.error("Something went wrong!",error);
        
    }
}

encryptPassword();