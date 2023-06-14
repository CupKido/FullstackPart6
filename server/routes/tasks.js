require('dotenv').config();
const express = require('express');
const Tasks = require('../models/task')
const Joi = require('joi')
const router = express.Router()
router.get('/:userId', async (req, res) => {
    try{
        const tasks = await Tasks.getTasks(req.params.userId)
        if(tasks === null) res.status(404).json()
        res.status(200).json(tasks)
    }catch{
        res.status(404).json()
    }
})

router.get('/:userId/:taskId', async (req, res) => {
    try
    {
        const task = await Tasks.getTask(req.params.userId, req.params.taskId)
        res.status(200).json(await Tasks.getTask(req.params.userId, req.params.taskId))
    }
    catch
    {
        res.status(404).json()
    }
})

router.post('/:userId', async (req, res) => {
    const bodySchema = Joi.object({
        title : Joi.string().required()
    })
    const {error} = bodySchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const userId = req.params.userId;
    const title = req.body.title;
    const result = await Tasks.createTask(userId, title);
    if (result === null) return res.status(404).json()
    res.status(201).json(result)
})

router.put('/:userId/:taskId', async (req, res) => {
    task = {id : req.params.taskId, userId : req.params.userId, description : req.body.description, completed : req.body.completed }
    //console.log(task)
    const result = await Tasks.updateTask(task)
    if (result === null) return res.status(404).json()
    res.status(200).json(result)
})


router.delete('/:userId/:taskId', async (req, res) => {

    const result = await Tasks.deleteTask(req.params.userId, req.params.taskId)
    if (result === null) return res.status(404).json()
    res.status(200).json(req.params.userId)
})

module.exports = router