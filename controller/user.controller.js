const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {user} = require("../models/user");
const redisClient = require('../helper/redis');


const signup = async (req,res) =>{
    try{
        const {name,email,pass,IP} = req.body;
        const isUserPresent = await user.findOne({email});
        if(isUserPresent) return res.send("User already present, Please Login");

        const hash = bcrypt.hashSync(pass,8);
        const newUser = new user({name,email,pass:hash,IP});
        await newUser.save();
        res.send("Registered Successfully");
    }
    catch(err){
        res.send(err.message);
    }
}

const login = async (req,res) =>{
    try{
        const {email,pass} = req.body;
        const isUserPresent = await user.findOne({email});
        if(!isUserPresent) return res.send("User not Found!");

        const isPassword = await bcrypt.compare(pass,isUserPresent.pass);
        if(!isPassword) return res.send("Wrong Password");

        const token = await jwt.sign({userID:isUserPresent._id, IP:isUserPresent.IP}, process.env.JWT);
        res.send({message: "Logged in Successfully",token});
    }
    catch(err){
        res.send(err.message);
    }
}

const logout = async(req,res) =>{
    try{
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token) return res.status(401);
        
        await redisClient.set(token,token);
        res.send("Logout Successfully");
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports={login,signup,logout};