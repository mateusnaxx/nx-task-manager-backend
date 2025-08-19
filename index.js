const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
const port = 8000;

connectToDatabase();

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
