const redisClient = require("../helper/redis");
const axios = require('axios');
const {info} = require("../models/ipinfo");
const {user} = require("../models/user");
const { json } = require("body-parser");

const getcity = async(req,res)=>{
    try{
        const IP = req.params.IP || req.body.IP;

        const isIPincache = await redisClient.get(`${IP}`);
        if(isIPincache) return res.send(200).send({data: isIPincache});

        const response = await axios.get(`https://ipapi.co/${IP}/{city}/`);

        const infoData = response;

        redisClient.set(IP, JSON.stringify(infoData), {EX: 6*60*60});

        await info.findOneAndUpdate({userId: req.body.userId},{
            userId: req.body.userId, $push: {Searches: IP}
        }, {new:true, upsert:true, setDefaultsOnInsert:true})

        return res.send({data: infoData});
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

module.exports={getcity};