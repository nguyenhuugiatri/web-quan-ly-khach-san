const router = require('express').Router();
const serviceModel = require('../models/service.model');

router.post('/getListByRentReceiptId', async (req, res, next) => {
  const { rentReceiptId } = req.body;
  const serviceList = await serviceModel.getServiceByRentReceiptId(
    rentReceiptId
  );
  if (serviceList === null)
    return res.status(200).json({
      message: 'Not found',
    });
  return res.status(200).json({ serviceList, message: 'Successful !' });
});

router.get('/getList', async (req, res, next) => {
  const serviceList = await serviceModel.getList();
  if (serviceList === null)
    return res.status(200).json({
      message: 'Not found',
    });
  return res.status(200).json({ serviceList, message: 'Successful !' });
});

module.exports = router;
