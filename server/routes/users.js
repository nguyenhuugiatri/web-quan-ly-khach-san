const router = require('express').Router();

router.get('/login',(req,res)=>{
    res.send('this is login');
})

module.exports=router