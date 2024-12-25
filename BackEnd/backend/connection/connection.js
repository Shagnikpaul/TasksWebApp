const mongoose = require("mongoose")

const conn = async(req,res) =>{
    try{
        await mongoose.connect("mongodb+srv://paldebjit99:1FBVA13pYAhl1W0u@cluster0.wcy2f.mongodb.net/").then(()=>{
            console.log("Connected")
        })
    }catch(error){
        res.status(400).json({
            message: "Not Corrected"
        });
    }
    
};
conn()