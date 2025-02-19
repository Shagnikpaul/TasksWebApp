const express = require("express");
const app = express();
require("./connection/connection");
const auth = require("./routes/auth"); //Authentication check
const crud = require("./routes/list");// CRUD operations
const imageupload = require("./routes/imageupload")
const { default: conn } = require("./connection/connection");
const cors = require("cors");
const settings = require("./routes/settings")
// require("./models/list");

app.use(express.json()); // define the format of data exchange
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v2", crud);
app.use("/api/v3", settings);
app.use("/api/img", imageupload);
// app.get("/" , (req,res) => {
//     res.send("Hello");
// })

// app.listen(8000, () => {
//     console.log("Server started");
// });


if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
    });
}


module.exports = app;