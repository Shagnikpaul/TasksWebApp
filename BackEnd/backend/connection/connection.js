const mongoose = require("mongoose")
const dotenv = require('dotenv');
const conn = async () => {
    try {
        dotenv.config({ path: '../.env' })
        console.log("mongo connection string : ", process.env.mongo);
        await mongoose.connect("mongodb+srv://kanchon:HthFnJ_F9ihbuU3@cluster0.wcy2f.mongodb.net/").then(() => {
            // console.log("Connected")
            console.log('Mongo Connection successful');

        })
    } catch (error) {

        console.log('Mongo Connection failed and reason : ', error);

    }

};
conn()