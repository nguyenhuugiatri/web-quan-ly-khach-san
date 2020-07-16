const router = require('express').Router();
const customerModel = require('../models/customer.model');

router.post('/getByPhone', async (req, res, next) => {
  const { phone } = req.body;
  const customer = await customerModel.singleByPhone(phone);

  if (customer === null)
    return res.status(404).json({
      message: 'Not found',
    });

  return res.status(200).json({ customer, message: 'Successful !' });
});

router.post('/checkIn', async (req, res, next) => {
  console.log(req.body);
  // const { phone } = req.body;
  // const customer = await customerModel.singleByPhone(phone);

  // if (customer === null)
  //   return res.status(404).json({
  //     message: 'Not found',
  //   });

  // return res.status(200).json({ customer, message: 'Successful !' });
});

module.exports = router;
