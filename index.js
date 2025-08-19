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
        
        if (tasks.length === 0) {
            return res.status(404).send({ error: "No tasks found" });
        }

        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: "Error when searching for tasks" });
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).send({ error: "Task not found" });
        }

        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ error: "Error when searching for task" });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new taskModel(req.body);
        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send({ error: "Error when creating task" });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await taskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).send({ error: "Task not found" });
        }

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send({ error: "Error when deleting task" });
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
