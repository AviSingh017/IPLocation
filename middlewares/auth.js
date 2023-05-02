const jwt = require('jsonwebtoken');
const redisClient = require("../helper/redis");

require("dotenv").config();

const authenticator = async(req,res,next)=>{
    try{
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token) return res.status(404).send("Login again");

        const isTokenvalid = await jwt.verify(token,process.env.JWT); 
        if(!isTokenvalid) return res.send("Login Again");

        const isTokenBlacklisted = await redisClient.get(token);
        if(isTokenBlacklisted) return res.send("Not Authorised");

        req.body.userId = isTokenvalid.userId;
        req.body.IP = isTokenvalid.IP;

        next();
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports={authenticator};