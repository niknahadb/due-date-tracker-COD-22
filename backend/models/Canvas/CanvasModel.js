const mongoose = require('mongoose')

const CanvasSchema = new mongoose.Schema({
    courses: {
        type: [String],
        minlength: 1,
        maxlength: 100
    },
    id: {
        type: String,
        required: [true, 'Please provide id'],
    },
    isCanvasLinked: {
        type: Boolean,
        required: true,
    },
    dateLastLinked: {
        type: Date,
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model('Canvas', CanvasSchema)