const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

router.post('/register', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const newUser = {
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        }
        await User.create(newUser)
        res.json({status : 'ok'})
    }
    catch(err){
        res.json({status : err})
    }
})

router.post('/login', async(req,res) => {
    try{
        const user = await User.findOne({email : req.body.email})
        const isValidPassword = await bcrypt.compare(req.body.password,user.password)
        if(isValidPassword){
            const token = jwt.sign({
                name : user.name,
                email : user.email
            },process.env.payloadString)
            res.json({status : "ok",message : "Login succesfull !",token : token})
        }
    }
    catch(err){
        res.json({status : "err",message : "Wrong credentials !",token : false})
    }
})

router.post('/api/add', async(req,res) => {
    const token = req.headers.token;
    try{
        const decoded = jwt.verify(token,process.env.payloadString);
        const email = decoded.email
        const user = await User.findOne({email : email})
        const list = user.list;
        list.push(req.body);
        await user.save();
        res.json({status : 'ok'})
    }
    catch(err){
        res.json({status : 'error'})
    }
})

router.get('/api/todo', async(req,res) => {
    const token = req.headers.token;
    try{
        const decoded = jwt.verify(token,process.env.payloadString);
        const email = decoded.email
        const user = await User.findOne({email : email})
        const list = user.list;
        res.json({status : 'ok',list : list})
    }
    catch(err){
        res.json({status : 'error'})
    }
})

router.delete('/api/deleteTodo', async(req,res) => {
    const token = req.headers.token;
    console.log('body = ',req.body.id);
    try{
        const delete_todo = { _id : req.body.id}
        const decoded = jwt.verify(token,process.env.payloadString);
        const email = decoded.email
        const user = await User.findOneAndUpdate({email : email},{ $pull: {list:  delete_todo } },
            {new:true})
        res.json({status : 'ok',list : list})
    }
    catch(err){
        res.json({status : 'error'})
    }
})


module.exports = router;