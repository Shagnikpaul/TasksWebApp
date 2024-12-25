const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
    email: {
        type : String,
        unique : true,
        required : true,
    },
    username: {
        type : String,
        unique : true,
        required: true,
    },
    password: {
        type : String,
        required: true,
    },
    List: [
        {
            type : mongoose.Types.ObjectId,
            ref : "List",
        },
    ],
    
});

module.exports = mongoose.model("User",listSchema);