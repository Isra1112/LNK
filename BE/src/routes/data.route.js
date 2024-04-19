const express = require('express');
const router = express.Router();
// const User = require('../models/index.model')
const DataService = require('../services/data.service')
const {addNewData,getDataByUserId} = require('../controllers/data.controller');
const verifyToken = require('../middlewares/auth-token');
const dataService = new DataService();


router.use(verifyToken)
router.get('/',(req,res,next)=>getDataByUserId(req,res,dataService))
router.post('/',(req,res,next)=>addNewData(req,res,dataService))
// router.get('/:id',(req,res,next)=>getComment(req,res,dataService))
// router.put('/',(req,res,next)=>updateComment(req,res,dataService))
// router.delete('/',(req,res,next)=>removeComment(req,res,dataService))


module.exports = router;