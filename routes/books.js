const express = require('express');
const router = express.Router();

router.get('/' , (req , res) => {

    req.json({message : 'book stuff is working'})
});

router.get('/:id' , (req , res) => {

    const {id} = req.params;
    req.json({message : `Books ${id} detail working `})
});

module.exports = router;