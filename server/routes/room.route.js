const router = require('express').Router();
const query = require('../models/room.model');
router.get('/',async(req,res)=>{
    await query.find().then(result =>{
        res.status(200).json(result)
    }).catch(e=>{
        res.status(400).json(e);
    })
})

module.exports=router