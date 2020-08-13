const router = require('express').Router();
const customerModel = require('../models/customer.model');
const rentReceiptModel = require('../models/rentReceipt.model');
const serviceModel = require('../models/service.model');
const roomModel = require('../models/room.model');
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
  try {
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
      price: checkInRoom.price,
      dateIn,
      dateOut,
    });
    const rentReceiptCurrent = await rentReceiptModel.singleByCustomer(
      customer.id
    );
    await serviceModel.addServiceReceipt();
    const serviceReceipt = await serviceModel.getNewServiceReceipt();

    await rentReceiptModel.addRentReceiptDetail({
      id: rentReceiptCurrent.id,
      idRoom: checkInRoom.id,
      idServiceReceipt: serviceReceipt.id,
    });
    await rentReceiptModel.setStatusToRent(checkInRoom.id);
    return res.status(200).json({ message: 'Check-in was successful !' });
  } catch (err) {
    return res.status(400).json({ message: 'Check-in was failed !' });
  }
});

router.post('/getCheckOutCustomerByPhone', async (req, res, next) => {
  const { idRoom } = req.body;
  const checkOutCustomer = await customerModel.singleByCheckOutRoom(idRoom);
  if (checkOutCustomer === null)
    return res.status(404).json({
      message: 'Not found',
    });
  return res.status(200).json({ checkOutCustomer, message: 'Successful !' });
});

module.exports = router;
