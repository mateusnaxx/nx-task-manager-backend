const express = require("express");

const TaskController = require("../controllers/task.controller");
const taskModel = require("../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
    try {
        const newTask = new taskModel(req.body);
        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send({ error: "Error when creating task" });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await taskModel.findById(taskId);

        const allowedUpdates = ["isCompleted"];

        const requestedUpdates = Object.keys(taskData);

        if (!taskToUpdate) {
            return res.status(404).send({ error: "Task not found" });
        }

        for (const update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(400)
                    .send({
                        error: "one or more inserted fields are not editable!",
                    });
            }
        }

        const updatedTask = await taskToUpdate.save();

        res.status(200).send(updatedTask);
    } catch (error) {
        res.status(500).send({ error: "Error when updating task" });
    }
});

router.delete("/:id", async (req, res) => {
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

module.exports = router;
