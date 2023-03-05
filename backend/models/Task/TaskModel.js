const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        auto: true,
    },
    course: {
        type: String,
        required: true,
    },
    assignment_name: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Task", TaskShcema)