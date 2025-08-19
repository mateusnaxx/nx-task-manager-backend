const TaskModel = require("../models/task.model");
const { notFoundError, idInvalidError } = require("../errors/mongodb.errors");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});

            if (tasks.length === 0) {
                return notFoundError(res);
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
                return notFoundError(this.res);
            }

            this.res.status(200).send(task);
        } catch (error) {
            if (error.name === "CastError") {
                return idInvalidError(this.res);
            }
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
                return notFoundError(this.res);
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
            if (error.name === "CastError") {
                return idInvalidError(this.res);
            }
            this.res.status(500).send({ error: "Error when updating task" });
        }
    }

    async delete() {
        try {
            const taskId = this.req.params.id;
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            if (!deletedTask) {
                return notFoundError(this.res);
            }

            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error.name === "CastError") {
                return idInvalidError(this.res);
            }
            this.res.status(500).send({ error: "Error when deleting task" });
        }
    }
}

module.exports = TaskController;
