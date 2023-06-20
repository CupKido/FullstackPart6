require('dotenv').config();
const express = require('express');
const Users = require('../models/user')
const Tasks = require('../models/task')
const Posts = require('../models/post')
const Comments = require('../models/comment')
const Joi = require('joi')
const router = express.Router()

router.post('/login', async (req, res) => {
    const bodySchema = Joi.object({
        password : Joi.string().required(),
        username : Joi.string().required()
    })
    const {error} = bodySchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    try{
        const user = await Users.getUser(req.body.username, req.body.password)
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

router.post('/CreateUser', async (req, res) => {
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
        if (await Users.getUser(username, password)) return res.status(409).json();
        const result = await Users.createUser(username, firstName, lastName, password);
        res.status(201).json(result)
    }catch{
        res.status(500)
    }
})

router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const tasks = await Tasks.getTasks(userId);
    console.log(tasks);
    tasks.forEach(async (task) => {
        await Tasks.deleteTask(userId, task._id)
        console.log("task", task._id);
    });
    const posts  = await Posts.getPosts(userId);
    console.log(posts);
    posts.forEach(async (post) => {
        const comments = await Comments.getComments(post._id);
        console.log(comments);
        comments.forEach(async (comment) => {
            await Comments.deleteComment(post._id, comment._id);
            console.log("comment", comment._id);
        })
        await Posts.deletePost(userId, post._id);
        console.log("post", post._id);
    });
    const success = await Users.deleteUser(req.params.userId);
    if (success){
        res.status(200).json({userId})
    }else{
        res.status(404).json()
    }
    
})

module.exports = router