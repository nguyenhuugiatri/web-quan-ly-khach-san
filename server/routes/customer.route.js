const router = require('express').Router();
const customerModel = require('../models/customer.model');
const rentReceiptModel = require('../models/rentReceipt.model');
const moment = require('moment');

router.post('/getByPhone', async (req, res, next) => {
  const { phone } = req.body;
  const customer = await customerModel.singleByPhone(phone);

  if (customer === null)
    return res.status(404).json({
      message: 'Not found',
    });

  return res.status(200).json({ customer, message: 'Successful !' });
});

router.get('/listType', async (req, res, next) => {
  const listCustomerType = await customerModel.getCustomerType();

  if (listCustomerType === null)
    return res.status(404).json({
      message: 'Not found',
    });

  return res.status(200).json({ listCustomerType, message: 'Successful !' });
});

router.post('/checkIn', async (req, res, next) => {
  const { checkInCustomer, checkInRoom, currentUser } = req.body;
  const { phone } = checkInCustomer;
  const { date } = checkInRoom;

  const dateIn = moment(date[0]).format('YYYY-MM-DD hh:mm:ss');
  const dateOut = moment(date[1]).format('YYYY-MM-DD hh:mm:ss');

  const checkExist = await customerModel.singleByPhone(phone);
  if (checkExist === null) {
    await customerModel.addCustomer(checkInCustomer);
  } else {
    await customerModel.updateCustomer(checkInCustomer);
  }
  const customer = await customerModel.singleByPhone(phone);
  await rentReceiptModel.addRentReceipt({
    id: customer.id,
    idUser: currentUser.id,
    dateIn,
    dateOut,
  });

  const billRent = await rentReceiptModel.singleByCustomer(checkInCustomer.id);
  await rentReceiptModel.addRentReceiptDetail({
    id: billRent.id,
    idRoom: checkInRoom.id,
  });
});

module.exports = router;
