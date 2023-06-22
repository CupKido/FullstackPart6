require('dotenv').config();
const express = require('express');
const Tasks = require('../models/task')
const Users = require('../models/user.js')
const Joi = require('joi')
const router = express.Router()

router.get('/:userId', async (req, res) => {
    try{
        // check if user exists
        if (!(await Users.getUserById(req.params.userId))) return res.status(404).json('User not found')
        if (req.query.id === undefined){
            const tasks = await Tasks.getTasks(req.params.userId)
            res.status(200).json(tasks)
        }else{
            taskId = req.query.id
            const task = await Tasks.getTask(req.params.userId, taskId)
            if (!task) return res.status(404).json('Task not found')
            res.status(200).json(task)
        }
    }catch{
        res.status(500).json()
    }
})

router.post('/:userId/CreateTask', async (req, res) => {
    const bodySchema = Joi.object({
        title : Joi.string().required()
    })
    const {error, value} = bodySchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const { userId } = req.params
    if (!(await Users.getUserById(userId))) return res.status(404).json()
    const { title } = value;
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
    const {error, value } = bodySchema.validate(req.body)
    // if not valid respond with Bad request
    if(error) return res.status(400).json(error.details[0].message)
    const {title, completed }= value
    const { userId, taskId } = req.params
    if (!(await Users.getUserById(userId))) return res.status(404).json("User not found")
    const result = await Tasks.updateTask(userId,  taskId, title, completed)
    if (!result) return res.status(404).json("Task not found")
    res.status(200).json(taskId)
})


router.delete('/:userId/:taskId', async (req, res) => {
    if (!(await Users.getUserById(req.params.userId))) return res.status(404).json()
    const result = await Tasks.deleteTask(req.params.userId, req.params.taskId)
    if (!result) return res.status(404).send('Task not found')
    res.status(200).json(req.params.taskId)
})

module.exports = router