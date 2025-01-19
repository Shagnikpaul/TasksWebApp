const router = require("express").Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const Settings = require("../models/settings");

//Pass username in params

router.put("/changeUsername/:id", async(req,res) => {
    try{
        const {new_username} = req.body;
        const settings = await Settings.findOneAndUpdate({user_id:req.params.id}, {
            user_name : new_username
        },{new:true});
        if(!settings){
            res.status(200).json({message: "no users found"});
            return;
        }
        await User.findByIdAndUpdate(req.params.id, {
            username: new_username
        })
        res.status(200).json({message: "username updated successfully"});
    }catch(error){
        console.log(error);
        res.status(200).json({error:error,message:"error occured in changing username"})
    }
});
router.put("/changeAvatar/:id", async(req,res) => {
    try{
        const {new_avatar} = req.body;
        const settings = await Settings.findOneAndUpdate({user_id:req.params.id}, {
            avatar_link : new_avatar
        },{new:true});
        if(!settings){
            res.status(200).json({message: "no users found"});
            return;
        }
        res.status(200).json({settings:settings,message: "avatar updated successfully"});
    }catch(error){
        console.log(error);
        res.status(200).json({error:error,message:"error occured in changing avatar"})
    }
});

//Signin existing user

router.put("/changeTheme/:id", async(req,res) => {
    try{
        const {new_theme} = req.body;
        const settings = await Settings
        .findOneAndUpdate({user_id:req.params.id},{theme: new_theme},{new:true});
        
        if(!settings){
            res.status(200).json({message: "no users found"});
            return;
        }
        
        res.status(200).json({settings:settings,message: "theme updated successfully"});
    }catch(error){
        console.log(error);
        res.status(200).json({error:error,message:"error occured in changing theme"})
    }
});

router.get("/getSettings/:id", async(req,res) => {
    try{
        const settings = await Settings
        .findOne({user_id:req.params.id});
        
        if(!settings){
            res.status(200).json({message: "no users found"});
            return;
        }
        
        res.status(200).json({settings:settings,message: "settings"});
    }catch(error){
        console.log(error);
        res.status(200).json({error:error,message:"error occured in changing theme"})
    }
});



module.exports = router;