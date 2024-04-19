const express = require('express');
const router = express.Router();
// const User = require('../models/index.model')
const CommentService = require('../services/comment.service')
const {addNewComment,getComment,updateComment,removeComment} = require('../controllers/comment.controller');
const verifyToken = require('../middlewares/auth-token');
const commentService = new CommentService();


router.get('/',(req,res,next)=>getComment(req,res,commentService))
router.post('/',(req,res,next)=>addNewComment(req,res,commentService))
router.use(verifyToken)
router.get('/:id',(req,res,next)=>getComment(req,res,commentService))
router.put('/',(req,res,next)=>updateComment(req,res,commentService))
router.delete('/',(req,res,next)=>removeComment(req,res,commentService))


module.exports = router;