const mongoose = require("mongoose")

const conn = async(req,res) =>{
    try{
        await mongoose.connect("").then(()=>{
            console.log("Connected")
        })
    }catch(error){
        res.status(400).json({
            message: "Not Corrected"
        });
    }
    
};
conn()