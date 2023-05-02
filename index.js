const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();

const {connection} = require("./config/db");
const redisClient = require("./helper/redis");
const {UserRouter} = require("./routes/user.route");
const {infoRouter} = require("./routes/info.route");
const logger = require("./middlewares/logger");

app.use("/info/user", UserRouter);
app.use("/IP",infoRouter);

app.get("/", async(req,res)=>{
    res.send("Home");
});

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to Atlas");
        logger.logs("error", "database connected");
    }catch(err){
        console.log(err.message);
        // logger.logs("error", "database connection failed");
    }
    console.log(`Server is running on port ${process.env.port}`)
});