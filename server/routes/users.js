require('dotenv').config();
const express = require('express');
const Users = require('../models/user')
const Joi = require('joi')
const router = express.Router()
router.post('/:username', async (req, res) => {
    const bodySchema = Joi.object({
        password : Joi.string().required()
    })
    const paramsSchema = Joi.object({
        username : Joi.string().required()
    })
    const res1 = paramsSchema.validate(req.params)
    const error1 = res1.error
    if(error2) return res.status(400).json(error1.details[0].message)
    const res2 = bodySchema.validate(req.body)
    const error2 = res2.error
    if(error2) return res.status(400).json(error2.details[0].message)
    try{
        const user = await Users.getUser(req.params.username, req.body.password)
        if(!user) return res.status(404).json()
        res.status(200).json(user)
    }
    catch{
        res.status(500).json()
    }
})

router.get('/:userId', async (req, res) => {
    const paramsSchema = Joi.object({
        userId : Joi.string().required()
    })
    const {error} = paramsSchema.validate(req.params)
    if(error) return res.status(400).json(error1.details[0].message)
    try{
        const user = await Users.getUserById(req.params.userId)
        if(!user) return res.status(404).json()
        res.status(200).json(user)
    }
    catch{
        res.status(500).json()
    }
})

router.post('/', async (req, res) => {
    const bodySchema = Joi.object({
        username : Joi.string().required(),
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        password : Joi.string().required()
    })
    const {error} = bodySchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    try{
        const result = await Users.createUser(username, firstName, lastName, password);
        res.status(201).json(result)
    }catch{
        res.status(500)
    }
})

router.delete('/:userId', async (req, res) => {
    const paramsSchema = Joi.object({
        id : Joi.string().required()
    })
    const {error} = paramsSchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const success = await Users.deleteUser(req.params.userId, req.params.taskId)
    if (success){
        res.status(200).json({userId})
    }else{
        res.status(404).json()
    }
    
})

module.exports = router