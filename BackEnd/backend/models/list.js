const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
    },
    body: {
        type : String,
        required: true,
    },
    priotity:{
        type : Number,
        required: false,
        default : 0
    },
    color:{
        type: String,
        enum: ['red', 'green', 'blue', 'yellow', 'gray', 'pink', 'black', 'white'],
        require: false,
        default: 'gray'
    },
    isCompleted :{
        type: Boolean,
        default:false
    },
    user: [
        {
            type : mongoose.Types.ObjectId,
            ref : "User",
        },
    ],
    
});

module.exports = mongoose.model("List",listSchema);