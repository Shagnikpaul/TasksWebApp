const express = require("express");
const app = express();
require("./connection/connection");
const auth = require("./routes/auth"); //Authentication check
const crud = require("./routes/list");// CRUD operations
const { default: conn } = require("./connection/connection");
const cors = require("cors");
// require("./models/list");

app.use(express.json()); // define the format of data exchange
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v2", crud);

// app.get("/" , (req,res) => {
//     res.send("Hello");
// })

app.listen(8000, () => {
    console.log("Server started");
});