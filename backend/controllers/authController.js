const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            phone,
            password,
            role: "passenger"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};



// LOGIN USER
const loginUser = async (req,res)=>{
    try {

        const {email,password}=req.body;


        const user = await User.findOne({email});


        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }


        const isMatch = await bcrypt.compare(password,user.password);


        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            });
        }


        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );


        res.json({
            success:true,
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};




// ADMIN LOGIN
const adminLogin = async (req,res)=>{

    try {

        const { email, password } = req.body;


        if(
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ){

            return res.status(401).json({
                success:false,
                message:"Invalid admin credentials"
            });

        }


        const token = jwt.sign(
            {
                role:"admin",
                email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );


        res.json({
            success:true,
            token
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


module.exports = {
    registerUser,
    loginUser,
    adminLogin
};