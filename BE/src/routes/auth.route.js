const express = require('express');
const router = express.Router();

const AuthService = require('../services/auth.service');
const authService = new AuthService()
const {login,logout} = require("../controllers/auth.controller")
const verifyToken = require('../middlewares/auth-token');


router.post('/login',(req,res,next)=>login(req,res,authService));
router.use(verifyToken)
router.post('/logout',(req,res,next)=>logout(req,res,authService));

module.exports = router;