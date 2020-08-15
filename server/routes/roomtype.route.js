const router = require('express').Router();
const roomtypeSchema = require('../models/roomtype.model');
router.get('/list', async (req, res) => {
  await roomtypeSchema
    .find()
    .then((result) => {
      if (result) return res.status(200).json({ roomType: result });
      return res.status(404).json({ message: 'Not found!' });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Something went wrong!' });
    });
});
router.patch('/update', async (req, res) => {
  await roomtypeSchema
    .updateById(req.body.id,req.body)
    .then((r) => {
      if (r) return res.status(200).json({ message: 'Update success!' });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Update failed', error: err });
    });
});
router.post('/insert',async(req,res)=>{
  req.body.maxCustomer=parseInt(req.body.maxCustomer)
  req.body.price=parseInt(req.body.price)
  req.body.priceHour=parseInt(req.body.priceHour)
  await roomtypeSchema.insert(req.body).then(r=>{
    if(r) return res.status(200).json({message:'Insert success!'})
    return res.status(404).json({message:'Something went wrong'})
  }).catch(err=>{
    return res.status(400).json({message:'Insert failed! Try again!'})
  })
})
module.exports = router;
