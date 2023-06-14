require('dotenv').config();
const express = require('express');
const Tasks = require('../models/task')
const router = express.Router()
router.get('/:userId', async (req, res) => {
    res.status(200).json(await Tasks.getTasks(req.params.userId))
})

router.get('/:userId/:taskId', async (req, res) => {
    res.status(200).json(await Tasks.getTask(req.params.userId, req.params.taskId))
})

router.post('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const description = req.body.description;
    const result = await Tasks.createTask(userId, description);
    res.status(201).json(result)
})

router.put('/:userId/:taskId', async (req, res) => {
    task = {id : req.params.taskId, userId : req.params.userId, description : req.body.description, completed : req.body.completed }
    //console.log(task)
    res.status(200).json(await Tasks.updateTask(task))
})


router.delete('/:userId/:taskId', async (req, res) => {
    res.json(await Tasks.deleteTask(req.params.userId, req.params.taskId))
})

module.exports = router