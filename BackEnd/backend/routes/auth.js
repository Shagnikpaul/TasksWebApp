const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Settings = require("../models/settings");

//Register new user
// router.post("/register", async(req,res) => {
//     try{
//         const {email,username,password} = req.body;
//         const hashpass = bcrypt.hashSync(password);
//         const user = new User({email:email,username:username,password:hashpass});
//         // const user = new User({email:email,username:username,password});
//         await user.save().then(() => res.status(200).json({user:user}));
//     }catch(error){
//         res.status(400).json({message:"User already exists"});
//     }
// })
router.post("/register", async(req,res) => {
    try{
        const {email,username,password} = req.body;
        const hashpass = bcrypt.hashSync(password);
        
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            
            const user  = new User({email,username,password:hashpass});
            await user.save({session});
            
            const settings  = new Settings({
                user_id : user._id,
                user_name : username
            })
            
            await settings.save({session});
            user.settings_id = settings._id;
            await user.save({session});

            await session.commitTransaction();
            session.endSession();

            console.log("User and Settings created successfully");
            res.status(200).json({user: user, settings: settings, message:"User and settings created"});    
        }catch(error){
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating User and Settings:", error);
            res.status(200).json({error:error, message:"some error occured"});
        }
    }catch(error){
        res.status(200).json({message:"some error occured"});
    }
})

//Signin existing user

router.post("/signin", async(req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(200).json({message:"no users found by this email"});
        }else{
            const isCorrectPassword = bcrypt.compareSync(req.body.password,user.password);
            if(!isCorrectPassword){
                // res.status(400).json({message:"Password is not correct"});
                res.status(200).json({message:"Password is not correct"});
            }else{
                const{password,settings_id,...others}= user._doc;
                const settings = await Settings.findById(settings_id);
                res.status(200).json({others,settings:settings,message:"Sign in successful"});
            }
        }
    }catch(error){
        res.status(400).json({message:"User already exists"});
    }
})



module.exports = router;