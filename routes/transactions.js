const express = require('express');
const router = express.Router();

router.post('/' , (req , res) => {
    res.json({message : 'book issued successfully'});
});

router.post('/return' , (req , res) => {
    res.json({message : 'book returned successfully'});
});

module.exports = router;

