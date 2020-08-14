const router = require('express').Router();
const serviceModel = require('../models/service.model');
const serviceReceiptModel = require('../models/serviceReceipt.model');
const rentReceiptDetailModel = require('../models/rentReceiptDetail.model');

router.post('/getListByRentReceiptId', async (req, res, next) => {
  try {
    const { rentReceiptId } = req.body;
    const serviceList = await serviceModel.getServiceByRentReceiptId(
      rentReceiptId
    );

    const getTotalCharges = await serviceModel.getTotalCharges(rentReceiptId);
    let serviceCharge = 0;
    if (getTotalCharges) serviceCharge = getTotalCharges.total;
    return res
      .status(200)
      .json({ serviceList, serviceCharge, message: 'Successful !' });
  } catch (err) {
    res.status(400).json({ message: 'Failed !' });
  }
});

router.get('/getList', async (req, res, next) => {
  const serviceList = await serviceModel.getList();
  if (serviceList === null)
    return res.status(200).json({
      message: 'Not found',
    });
  return res.status(200).json({ serviceList, message: 'Successful !' });
});

router.post('/add', async (req, res, next) => {
  try {
    const { idService, amount, idRoom, idRentReceipt } = req.body;
    const getPrice = await serviceModel.getPriceByServiceId(idService);
    const total = getPrice.price * amount;
    await serviceModel.addNewService({ idService, amount, total });
    const getLastServiceReceipt = await serviceReceiptModel.getLastServiceReceipt();
    const idServiceReceipt = getLastServiceReceipt.id;
    await rentReceiptDetailModel.addNewRentReceiptDetail({
      idRentReceipt,
      idRoom,
      idServiceReceipt,
    });
    return res.status(200).json({ message: 'Successful !' });
  } catch (err) {
    return res.status(400).json({
      message: 'Failed !',
    });
  }
});

router.post('/total', async (req, res, next) => {
  try {
    const { idRentReceipt } = req.body;
    const getTotalCharges = await serviceModel.getTotalCharges(idRentReceipt);
    let serviceCharge = 0;
    if (getTotalCharges) serviceCharge = getTotalCharges.total;
    console.log('serviceCharge', getTotalCharges);
    return res.status(200).json({ serviceCharge, message: 'Successful !' });
  } catch (err) {
    return res.status(400).json({
      message: 'Failed !',
    });
  }
});

module.exports = router;
