const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
    avatar_link : {
        type: String,
        required: false        
    },
    user_name: {
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    theme:{
        type: String,
        enum: ['dark','light','easteregg'],
        require: false,
        default: 'dark'
    },

});

module.exports = mongoose.model("Settings", listSchema);