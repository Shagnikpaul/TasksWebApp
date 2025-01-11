const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    Category: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
    ]

});

module.exports = mongoose.model("List", listSchema);