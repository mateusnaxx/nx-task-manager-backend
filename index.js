const express = require("express");
const dotenv = require("dotenv");
const TaskRouter = require("./src/routes/task.route")

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
app.use(express.json());
const port = 8000;

connectToDatabase();

app.use("/tasks", TaskRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
