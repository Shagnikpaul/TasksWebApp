import express from "express";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());






app.listen(PORT, () => {
    console.log("Server was started successfully !!");

})