import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js";

exports.register = async(req, res) => {
    try{
        const{name, email, password} = req.body;

        if(!name || !email|| !password){
            return res.status(400).json({messsage : "All field are required"});
        }

        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).json({message : "Email already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, 
            email,
            password: hashPassword
        })

        const token= jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.status(201).json({
            message:"User Register Successfully",
            token,
            user : {
                id:user._id,
                name:user.name,
                email: user.email,
            }
        })

    }catch (error){
        res.status(500).json({message: "something went wrong", error})
    }
}