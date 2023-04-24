const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    is_completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Tasks', taskSchema)