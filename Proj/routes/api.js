const express=require('express');
const path = require('path')
const router=express.Router();

router.get('/api', (req,res)=> {
    const data = {
        username: 'voila',
        age: 5
    };
    res.json(data)
});

router.get('/api/name', (req,res) => {
    const data = {
        username: 'stad',
        age:10
    };
    res.json(data);
})

module.exports = router;