const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs")

//Register new user
router.post("/register", async(req,res) => {
    try{
        const {email,username,password} = req.body;
        const hashpass = bcrypt.hashSync(password);
        const user = new User({email:email,username:username,password:hashpass});
        // const user = new User({email:email,username:username,password});
        await user.save().then(() => res.status(200).json({user:user}));
    }catch(error){
        res.status(400).json({message:"User already exists"});
    }
})

//Signin existing user

router.post("/signin", async(req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(400).json({message:"Sign up first"});
        }else{
            const isCorrectPassword = bcrypt.compareSync(req.body.password,user.password);
            if(!isCorrectPassword){
                res.status(400).json({message:"Password is not correct"});
            }else{
                const{password,...others}= user._doc;
                res.status(200).json({others,message:"Sign in successful"});
            }
        }
    }catch(error){
        res.status(400).json({message:"User already exists"});
    }
})

module.exports = router;