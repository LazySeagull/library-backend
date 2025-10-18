const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db_mock');

router.post('/register' , async (req , res) => {

    try{
        const {name , email , password , role} = req.body;
        
        if(!name || !email ||  !password){
            return res.status(400).json({message : 'please enter the required details'});
        }

        const existing = await db.findUserByEmail(email);
        if(existing){
            return res.status(409).json({message : 'The email is already registered'});
        }

        const passwordHash = await bcrypt.hash(password , 10);

        const newUser = await db.createUser({name , email , passwordHash , role : role || 'student'});

        res.status(200).json({
            id : newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        });



    }

    catch(err){
        console.error(err);
        res.status(500).json({message : 'server error'});
    }

});


router.post('/login' , async (req , res) => {

    try {
        const {email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({message : 'email and password is required'});
        }

        const user = await db.findUserByEmail(email);
        if (!user){
            return res.status(401).json({message : 'invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password , user.passwordHash);
        if(!isMatch){
            return res.status(401).json({message : 'invalid credentials'});
        }

        const payload = {id : user.id , role : user.role , name : user.name};

        const token = jwt.sign(payload , process.env.JWT_SECRET , {
            expiresIn : process.env.JWT_EXPIRES_IN || '6h',
        });

        res.json({token , user: payload});
    }

    catch(err){
        console.error(err);
        res.status(500).json({message : 'server error'});
    }

});

module.exports = router;