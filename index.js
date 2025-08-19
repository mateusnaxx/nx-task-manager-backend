const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const taskModel = require("./src/models/task.model");

dotenv.config();

const app = express();
app.use(express.json());
const port = 8000;

connectToDatabase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: "Error when searching for tasks" });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new taskModel(req.body)
        await newTask.save();

        res.status(201).send(newTask)
    } catch (error) {
        res.status(500).send({ error: "Error when creating task" });
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
