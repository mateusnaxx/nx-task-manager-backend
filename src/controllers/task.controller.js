const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({});

            if (tasks.length === 0) {
                return this.res.status(404).send({ error: "No tasks found" });
            }

        this.res.status(200).send(tasks);
    } catch (error) {
        this.res.status(500).send({ error: "Error when searching for tasks" });
    }
    }
}

module.exports = TaskController;