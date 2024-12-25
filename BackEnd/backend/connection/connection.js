const mongoose = require("mongoose")
const dotenv = require('dotenv');
const conn = async (req, res) => {
    try {
        dotenv.config()
        console.log("mongo connection string : ", process.env.mongo);
        await mongoose.connect(process.env.mongo).then(() => {
            // console.log("Connected")
            res.status(200).json({"message":"Connected"});
        })
    } catch (error) {
        res.status(400).json({
            message: "Not Connected"
        });


    }

};
conn()