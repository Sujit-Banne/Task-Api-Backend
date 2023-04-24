const express = require('express')
const router = express.Router()
const taskModel = require('../models/task')

//create single task and bulk task
router.post('/', async (req, res) => {
    const { tasks } = req.body
    try {
        if (Array.isArray(tasks)) {
            //add bulk task
            const createdTasks = await taskModel.create(tasks)
            const id = createdTasks.map(task => ({ id: task._id }))
            res.status(201).json({ tasks: id })
        } else {
            //add single task
            const { title, is_completed } = req.body
            const newTask = await taskModel.create({ title, is_completed })
            res.status(201).json({ _id: newTask._id })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'failed to create task' })
    }
})

//list all task created
router.get('/', async (req, res) => {
    try {
        const tasks = await taskModel.find({})
        res.status(200).json({ tasks })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'failed to get task' })
    }
})

//get a specific task 
router.get('/:id', async (req, res) => {
    const taskId = req.params.id
    try {
        const task = await taskModel.findById(taskId)
        if (!task) {
            return res.status(404).json({ error: "There is no task at that id" })
        }
        res.status(200).json(task)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'failed to get task' })
    }
})

//delete a specific task
router.delete('/:id', async (req, res) => {
    const taskId = req.params.id
    try {
        const task = await taskModel.findByIdAndDelete(taskId)
        if (!task) {
            return res.status(404).json({ error: "There is no task at that id" })
        }
        res.status(204).send()

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'failed to delete task' })
    }
})

//edit task
router.put('/:id', async (req, res) => {
    const taskId = req.params.id
    const { title, is_completed } = req.body
    try {
        const update = await taskModel.findByIdAndUpdate(taskId, { title, is_completed }, { new: true })
        if (!update) {
            return res.status(404).json({ error: "There is no task at that id" })
        }
        res.status(204).send()
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'failed to update task' })

    }
})

//bulk delete
router.delete('/', async (req, res) => {
    const { tasks } = req.body
    const id = tasks.map(task => task.id)
    try {
        const bulkTasks = await taskModel.deleteMany({ _id: id })
        res.status(204).json()
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to add delete tasks" })
    }
})

module.exports = router


/**
 testcases
 1 & 6- done [create single and bulk task]
 2 - done [//list all task created]
 3 - done [get a specific task]
 4 - done [delete a specific task]
 5 - done [ edit a specific task]
 7 - done [bulk delete]
 */

