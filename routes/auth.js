const express = require('express');
const router = express.Router();

router.post('/register' , (req , res) => {
    res.json({message : 'register endpoint working'})
});

router.post('/login' , (req , res) => {
    res.json({'message' : 'login working'})
});

module.exports = router;