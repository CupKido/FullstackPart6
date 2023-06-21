require('dotenv').config();
const express = require('express');
const Posts = require('../models/post')
const Comments = require('../models/comment')
const Users = require('../models/user.js')
const Joi = require('joi')
const router = express.Router()

// Posts

router.get('/:userId', async (req, res) =>{
    try{
        const user = await Users.getUserById(req.params.userId)
        if (!user) return res.status(404).json("User not found")
        const {userId } = req.params
        if (!req.params.id){
            const posts = await Posts.getPosts(userId)
            res.status(200).json(posts)
        }
        else{
            const postId = req.params.id
            const post = await Posts.getPost(userId, req.params.postId)
            if (post === null) res.status(404).json("Post not found")
            res.status(200).json(post)
        }
    }catch{
        res.status(500).json()
    }
})

router.post('/:userId/CreatePost', async (req, res) =>{
    const bodySchema = Joi.object({
        title : Joi.string().required(),
        body : Joi.string().required()
    })
    const {error, value } = bodySchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const {title, body} = value
    try{
        const user = await Users.getUserById(req.params.userId)
        if (!user) return res.status(404).json("User not found")
        const post = await Posts.createPost(req.params.userId, title, body)
        res.status(201).json(post)
    }catch{
        res.status(500).json()
    }

});

router.put('/:userId/:postId', async (req, res) =>{
    const bodySchema = Joi.object({
        title : Joi.string().required(),
        body : Joi.string().required()
    })
    const {error, value } = bodySchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const {title, body} = value
    try{
        const user = await Users.getUserById(req.params.userId)
        if (!user) return res.status(404).json("User not found")
        const result = await Posts.updatePost(req.params.userId, req.params.postId, title, body)
        if (!result) return res.status(404).json("Post not found")
        res.status(200).json(post)
    }catch{
        res.status(500).json()
    }
});

router.delete('/:userId/:postId', async (req, res) =>{
    try{
        const { userId, postId } = req.params
        const user = await Users.getUserById(userId)
        if (!user) return res.status(404).json('User not found')
        (await Comments.getComments(postId)).forEach(async (comment) => {
            await Comments.deleteComment(postId, comment._id)
        })
        const result = await Posts.deletePost(userId, postId)
        if (!result) return res.status(404).json('Post not found')
        res.status(200).json(req.params.postId)
    }catch{
        res.status(500).json()
    }
})

// Comments

router.get('/:userId/:postId/comments', async (req, res) =>{
    try{
        const { userId, postId } = req.params
        const user = await Users.getUserById(userId)
        if (!user) return res.status(404).json('User not found')
        const post = await Posts.getPost(userId, postId)
        if (!post) return res.status(404).json('Post not found')
        console.log(post._id.toString())
        if(req.query.id === undefined){
            const comments = await Comments.getComments(postId)
            return res.status(200).json(comments)
        }
        else{
            const commentId = req.query.id;
            const comment = await Comments.getComment(postId, commentId)
            if (!comment) return res.status(404).json('Comment not found')
            return res.status(200).json(comment)
        }
    }catch(error){
        console.log(error)
        res.status(500).json()
    }
});

router.post('/:userId/:postId/CreateComment', async (req, res) => {
    const bodySchema = Joi.object({
        name : Joi.string().required(),
        body : Joi.string().required()
    })
    const {error, value } = bodySchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const {name, body} = value
    const {userId, postId} = req.params
    try{
        const user = await Users.getUserById(userId)
        if (!user) return res.status(404).json('User not found')
        const post = await Posts.getPost(userId, postId)
        if (!post) return res.status(404).json('Post not found')
        const comment = await Comments.createComment(postId, name, body)
        res.status(201).json(comment)
    }catch{
        res.status(500).json()
    }
});

router.put('/:userId/:postId/:commentId', async (req, res) => {
    const bodySchema = Joi.object({
        name : Joi.string().required(),
        body : Joi.string().required()
    })
    const {error, value } = bodySchema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const {name, body} = value
    const {userId, postId, commentId } = req.params
    try{
        const user = await Users.getUserById(userId)
        if (!user) return res.status(404).json('User not found')
        const post = await Posts.getPost(userId, postId)
        if (!post) return res.status(404).json('Post not found')
        const result = await Comments.updateComment(postId, commentId, name, body)
        if (!result) return res.status(404).json('Comment not found')
        res.status(200).json(commentId)
    }catch{
        res.status(500).json()
    }
});

router.delete('/:userId/:postId/:commentId', async (req, res) => {
    const {userId, postId, commentId } = req.params
    try{
        const user = await Users.getUserById(userId)
        if (!user) return res.status(404).json('User not found')
        const post = await Posts.getPost(userId, postId)
        if (!post) return res.status(404).json('Post not found')
        const result = await Comments.deleteComment(postId, commentId)
        if (!result) return res.status(404).json('Comment not found')
        res.status(200).json(commentId)
    }catch{
        res.status(500).json()
    }
});

module.exports = router