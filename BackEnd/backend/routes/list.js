// All CRUD ops routes
const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//CREATE task
router.post("/addTask" , async(req,res) => {
    try {
        const {title,body,email,priority,color} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            var priority2,color2;
            
            if(!priority) priority2=0;
            else priority2 = priority;
            
            if(!color) color2='gray';
            else color2 = color;
            
            const list= new List({title,body, user:existingUser, priotity:priority2,color:color2});
            await list.save().then(() => {
                res.status(200).json({list});
                existingUser.List.push(list);
                existingUser.save();
            })
        }
    } catch (error) {
        console.log(error);
    }
});

//Update Task id of task required

router.put("/updateTask/:id" , async(req,res) => {
    try {
        const {title,body,email} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const list=await List.findByIdAndUpdate(req.params.id,{title:title,
                body:body});
            list.save().then(() => res.status(200).json({message:"Task updated"}));
        }
    } catch (error) {
        console.log(error);
    }
});

//Complete Task id of task required

router.put("/completeTask/:id" , async(req,res) => {
    try {
        const {title,email} = req.body;
        const existingUser = await User.findOne(
            { email }
        );
        if(existingUser){
            await List.findByIdAndUpdate(req.params.id,{isCompleted:true})
            .then(() => res.status(200).json({message:"Task Completed"}));
        }
    } catch (error) {
        console.log(error);
    }
});

//Delete Task id of task required

router.delete("/deleteTask/:id" , async(req,res) => {
    try {
        const {title,email} = req.body;
        const existingUser = await User.findOneAndUpdate(
            { email }, 
            { $pull: {List: req.params.id} }
        );
        if(existingUser){
            await List.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({message:"Task Deleted"}));
        }
    } catch (error) {
        console.log(error);
    }
});

//GET Tasks id of user required

router.get("/getTasks/:id" , async(req,res) => {
    try {
        const list= await ( List.find({user:req.params.id}).sort({priority:-1}));
        if(list.length!=0)
            res.status(200).json({list});
        else
            res.status(200).json({"message":"no tasks"});
        //use .sort({createdAt: -1}) opposite to created At id use priority number
    } catch (error) {
        console.log(error);
    }
});

router.get("/getDoneTasks/:id" , async(req,res) => {
    try {
        const list= await ( List.find({user:req.params.id}).find({isCompleted:true}).sort({priority:-1}));
        if(list.length!=0)
            res.status(200).json({list});
        else
            res.status(200).json({"message":"no tasks"});
        //use .sort({createdAt: -1}) opposite to created At id use priority number
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;