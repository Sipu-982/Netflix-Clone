const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.Admin_email;
    const adminPassword = process.env.Admin_password;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (email !== adminEmail){
      return res.status(401).json({ message: "Invalid email!" });
    }
    const isCompare= await bcrypt.compare(password,adminPassword)
    if(!isCompare){
   return res.status(401).json({ message: "Invalid password!" });
    }
    const token = jwt.sign({ email }, process.env.secret_key, { expiresIn: "1d" });

    return res.status(200).json({
      message: "Admin login successfully!",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Login failed. Please try again later." });
  }
};

module.exports = { adminLogin };
