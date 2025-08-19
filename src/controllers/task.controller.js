const TaskModel = require("../models/task.model");
const { notFoundError, idInvalidError } = require("../errors/mongodb.errors");
const {
    notAllowedFieldsToUpdateError,
    GenericServerError,
} = require("../errors/general.errors");

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
            GenericServerError(this.res);
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
            GenericServerError(this.res);
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            GenericServerError(this.res);
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
                    return notAllowedFieldsToUpdateError(this.res);
                }
            }

            const updatedTask = await taskToUpdate.save();

            this.res.status(200).send(updatedTask);
        } catch (error) {
            if (error.name === "CastError") {
                return idInvalidError(this.res);
            }
            GenericServerError(this.res);
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
            GenericServerError(this.res);
        }
    }
}

module.exports = TaskController;
