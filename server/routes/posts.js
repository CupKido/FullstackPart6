require('dotenv').config();
const express = require('express');
const Posts = require('../models/post')
const Joi = require('joi')
const router = express.Router()

router.get('/posts/:userId', async (req, res) =>{
    try{
        const posts = await Posts.getPosts(req.params.userId)
        if (posts === null) res.status(404).json()
        res.status(200).json(posts)
    }catch{
        res.status(500).json()
    }
})
router.get('/posts/:userId/:postId', async (req, res) =>{
    try{
        const post = await Posts.getPost(req.params.userId, req.params.postId)
        if (post === null) res.status(404).json()
        res.status(200).json(post)
    }catch{
        res.status(500).json()
    }
})





module.exports = router