const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
    category_name: {
        type : String,
        required : true,
    },
    category_emoji: {
        type : String,
        required: true,
    },
    category_color:{
        type: String,
        enum: ['red', 'green', 'blue', 'yellow', 'gray', 'purple', 'black', 'white'],
        require: false,
        default: 'gray'
    },
    tasks: [
        {
            type : mongoose.Types.ObjectId,
            ref : "List",
        },
    ],
    user: [
        {
            type : mongoose.Types.ObjectId,
            ref : "User",
        },
    ],
    priority: {
        type : Number,
        require : true,
    }
    
});

module.exports = mongoose.model("Category",listSchema);