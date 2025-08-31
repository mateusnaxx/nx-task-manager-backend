const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const TaskRouter = require("./src/routes/task.route");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

connectToDatabase();

app.use("/tasks", TaskRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
