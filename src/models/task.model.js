const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model("Task", taskSchema);

module.exports = TaskModel;
