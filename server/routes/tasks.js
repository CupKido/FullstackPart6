require('dotenv').config();
const express = require('express');
const Tasks = require('../models/task')
const Users = require('../models/user.js')
const Joi = require('joi')
const router = express.Router()
router.get('/:userId', async (req, res) => {
    try{
        // check if user exists
        if (!(await Users.getUserById(req.params.userId))) return res.status(404).json()
        const tasks = await Tasks.getTasks(req.params.userId)
        res.status(200).json(tasks)
    }catch{
        res.status(500).json()
    }
})

router.get('/:userId/:taskId', async (req, res) => {
    try
    {
        const task = await Tasks.getTask(req.params.userId, req.params.taskId)
        if (!task) return res.status(404).json()
        res.status(200).json(task)
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
    // validating data
    const bodySchema = Joi.object({
        title : Joi.string().required(),
        completed : Joi.boolean().required()
    })
    const {error} = bodySchema.validate(req.body)
    // if not valid respond with Bad request
    if(error) return res.status(400).json(error.details[0].message)



    task = {id : req.params.taskId, userId : req.params.userId, title : req.body.title, completed : req.body.completed }
    const result = await Tasks.updateTask(task)
    if (!result) return res.status(404).json()
    res.status(200).json(result)
})


router.delete('/:userId/:taskId', async (req, res) => {
    const result = await Tasks.deleteTask(req.params.userId, req.params.taskId)
    if (!result) return res.status(404).send('task not found')
    res.status(200).json(req.params.userId)
})

module.exports = router