const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});

            if (tasks.length === 0) {
                return this.res.status(404).send({ error: "No tasks found" });
            }

            this.res.status(200).send(tasks);
        } catch (error) {
            this.res
                .status(500)
                .send({ error: "Error when searching for tasks" });
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return this.res.status(404).send({ error: "Task not found" });
            }

            this.res.status(200).send(task);
        } catch (error) {
            this.res
                .status(500)
                .send({ error: "Error when searching for task" });
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send({ error: "Error when creating task" });
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            const allowedUpdates = ["isCompleted"];

            const requestedUpdates = Object.keys(taskData);

            if (!taskToUpdate) {
                return this.res.status(404).send({ error: "Task not found" });
            }

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res.status(400).send({
                        error: "one or more inserted fields are not editable!",
                    });
                }
            }

            const updatedTask = await taskToUpdate.save();

            this.res.status(200).send(updatedTask);
        } catch (error) {
            this.res.status(500).send({ error: "Error when updating task" });
        }
    }

    async delete() {
        try {
            const taskId = this.req.params.id;
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            if (!deletedTask) {
                return this.res.status(404).send({ error: "Task not found" });
            }

            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send({ error: "Error when deleting task" });
        }
    }
}

module.exports = TaskController;
