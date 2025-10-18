const express = require('express');
const router = express.Router();

router.post('/' , (req , res) => {

    res.json({message : 'review added'})

});

router.get('/' , (req , res) => {
    res.json({message : 'review list working'})
});

module.export = router;